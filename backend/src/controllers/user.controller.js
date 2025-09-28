import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const generateAccessandRefreshTokens =async(userId)=>{
    try {
       const user= await User.findById(userId)
       const accessToken = user.generateAccessToken()
       const refreshToken = user.generateRefreshToken()
       
       user.refreshToken = refreshToken
       await user.save({validateBeforeSave:false})

       return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"something went wrong while generating Access and refresh tokens")
    }
}

const signupUser = asyncHandler(async(req,res)=>{
    
    const{username,email,password} = req.body
    

    if([username,email,password].some((field)=>field?.trim()==="")){ 
        throw new ApiError(400,"All field are required")
    }


    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })
    

    if(existedUser){
        throw new ApiError(409,"email or username already exists")
    }

    //6-creating user object
   const user = await User.create({
        email,
        password,
        username:username.toLowerCase()
    })

    //7-remove password and refreshtoken from recieved values
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"something went wrong while registering user")
    }

    //Now,send confirmation msg
    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered successfully")
    )
})

const loginUser= asyncHandler(async(req,res)=>{
    
    const {email,password}=req.body

    if(!email){
        throw new ApiError(400,"email required")
    }

    const user = await User.findOne({ email });

    if(!user){
        throw new ApiError(404,"user doesn't exist ")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,'password entered is wrong')
    }

    const {accessToken,refreshToken} = await generateAccessandRefreshTokens(user._id)
     
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure: false
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{
            user:loggedInUser,accessToken,refreshToken
        },
        "user loggedin successfully"
    ))
})

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }
    )

    const options={
        httpOnly:true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out"))

})

export {signupUser,loginUser,logoutUser}
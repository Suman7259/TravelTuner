import { Router } from "express";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

const router = Router();

const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db("your-db-name"); // replace with your DB name
const users = db.collection("users");

// ---- LOGIN ----
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Missing email or password" });

    const user = await users.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ error: "Invalid email or password" });

    return res.json({
      user_id: user._id.toString(),
      email: user.email,
      name: user.username || user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---- SIGNUP ----
router.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Missing email or password" });

    const existing = await users.findOne({ email });
    if (existing) return res.status(409).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await users.insertOne({
      email,
      username: username || email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.json({
      user_id: newUser.insertedId.toString(),
      email,
      name: username || email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

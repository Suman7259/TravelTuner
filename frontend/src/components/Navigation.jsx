import React from "react";
// import { LogOut } from 'lucide-react';
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from "react-router-dom"
import ReviewsSection from "./ReviewsSection";

const Navigation = ({
  currentPage,
  setCurrentPage,
  currentUser,
  setActiveModal,
}) => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  return (
    <header className="fixed top-0 w-full bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-20 z-40">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white bg-gradient-to-r from-red-400 to-teal-400 bg-clip-text text-transparent">
          TravelTuner
        </div>

        <div className="hidden md:flex space-x-8">
          {["home", "features", "feedback", "about"].map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`text-white font-medium transition-all px-4 py-2 rounded-full hover:bg-white hover:bg-opacity-20 hover:-translate-y-1 ${
                  currentPage === page ? "bg-white bg-opacity-20" : ""
                }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            )
          )}
        </div>

          {/* <Link to="./ReviewsSection">FEEDBACK</Link> */}

        {isAuthenticated && (
          <li className="list-none px-2 py-1">
            <p className="text-gray-700 font-medium">
              Welcome, {user.given_name || user.nickname || user.name}!
            </p>
          </li>
        )}

        {isAuthenticated ? (
          <li className="list-none">
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="bg-blue-500 text-white font-medium px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              Log Out
            </button>
          </li>
        ) : (
          <li className="list-none">
            <button
              onClick={() => loginWithRedirect()}
              className="bg-blue-500 text-white font-medium px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              Log In
            </button>
          </li>
        )}
      </nav>
    </header>
  );
};

export default Navigation;

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Navigation = ({
  currentPage,
  setCurrentPage,
  currentUser,
  setActiveModal,
}) => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  
  const handleFeedbackClick = () => {
    setCurrentPage('feedback');
    // Scroll to reviews section after a short delay
    setTimeout(() => {
      const reviewsSection = document.getElementById('reviews-section');
      if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handlePageClick = (page) => {
    if (page === 'feedback') {
      handleFeedbackClick();
    } else if (page === 'home') {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-20 z-40">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white bg-gradient-to-r from-red-400 to-teal-400 bg-clip-text text-transparent">
          TravelTuner
        </div>
        
        <div className="hidden md:flex space-x-8">
          {["home", "features", "feedback", "about"].map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`text-white font-medium transition-all px-4 py-2 rounded-full hover:bg-white hover:bg-opacity-20 hover:-translate-y-1 ${
                currentPage === page ? "bg-white bg-opacity-20" : ""
              }`}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <>
              <p className="text-white font-medium">
                Welcome, {user.given_name || user.nickname || user.name}!
              </p>
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                className="bg-blue-500 text-white font-medium px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                Log Out
              </button>
            </>
          )}
          
          {!isAuthenticated && (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-blue-500 text-white font-medium px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              Log In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
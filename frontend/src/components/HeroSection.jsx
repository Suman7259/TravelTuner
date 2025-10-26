import React from "react";
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";

const HeroSection = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const handleExplore = async () => {
    if (!isAuthenticated) {
      await loginWithRedirect({
        appState: { returnTo: "/home" }
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-blue-600/20 to-purple-600/20 animate-pulse"></div>
      
      {/* Background image with parallax effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/background/20210711/original/pngtree-simple-travel-travel-creative-background-synthesis-picture-image_1116278.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-gray-900/60 to-black"></div>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-center px-6 py-20">
        {/* Decorative element */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6"
        >
          <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
            Discover Your
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
            Next Journey
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed font-light">
            Let AI craft your{" "}
            <span className="text-teal-400 font-semibold">personalized travel itinerary with Travel Tuner</span>
            <br className="hidden md:block" />
            Explore destinations that match your soul
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(20, 184, 166, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExplore}
            disabled={isLoading}
            className="relative group bg-gradient-to-r from-teal-500 to-blue-600 px-12 py-5 rounded-full text-lg font-bold shadow-2xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-2xl"></span>
              {isLoading ? "Loading..." : "Explore Now"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>

        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-gray-400 font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-gray-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-24"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
            className="text-gray-900 opacity-50"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
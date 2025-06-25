import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from './utils/auth';
import { motion } from 'framer-motion';
import heroImage from './assets/jackal-hero.jpg'; 

function LandingPage() {
  const navigate = useNavigate();

  const handleViewClick = () => {
    console.log('View Gallery button clicked');
    if (isAuthenticated()) {
      console.log('User is authenticated, navigating to gallery');
      navigate('/gallery');
    } else {
      console.log('User not authenticated, navigating to login');
      navigate('/login');
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})`, zIndex: 0 }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-6">
        <motion.div
          className="text-center max-w-2xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to the <span className="text-indigo-500">Jackal Gallery</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-10 drop-shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Explore stunning visuals from the edge of imagination.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewClick}
            className="bg-indigo-600 hover:bg-indigo-700 transition px-8 py-4 rounded-full text-white text-lg shadow-lg"
          >
            View Gallery
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default LandingPage;

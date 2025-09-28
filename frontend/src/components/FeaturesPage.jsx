import React from 'react';
import Navigation from './Navigation';

const FeaturesPage = ({ 
  currentUser,
  currentPage,
  setCurrentPage,
  logout,
  setActiveModal
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 pt-20">
      <Navigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        logout={logout}
        setActiveModal={setActiveModal}
      />
      
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold text-center text-white mb-16">
          Powerful Features for Perfect Travel
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: '🤖',
              title: 'AI-Powered Planning',
              desc: 'Advanced machine learning algorithms analyze your preferences to create perfectly tailored itineraries.'
            },
            {
              icon: '⚡',
              title: 'Instant Generation',
              desc: 'Get comprehensive travel plans in seconds, not hours. Our AI processes millions of data points instantly.'
            },
            {
              icon: '🎯',
              title: 'Personalization',
              desc: 'Every recommendation is customized to your unique travel style, budget, and interests.'
            },
            {
              icon: '🕉️',
              title: 'Spiritual Tourism',
              desc: 'Specialized expertise in sacred journeys and pilgrimage planning with cultural sensitivity.'
            },
            {
              icon: '📱',
              title: 'Mobile Optimized',
              desc: 'Access your travel plans anywhere with our responsive design that works on all devices.'
            },
            {
              icon: '💰',
              title: 'Budget Smart',
              desc: 'Intelligent budget optimization ensures you get maximum value from every travel dollar spent.'
            },
            {
              icon: '🔒',
              title: 'Privacy First',
              desc: 'Your travel preferences and personal data are protected with enterprise-grade security.'
            },
            {
              icon: '🌐',
              title: 'Global Coverage',
              desc: 'Comprehensive destination database covering 1000+ locations worldwide with local insights.'
            },
            {
              icon: '⭐',
              title: 'Community Reviews',
              desc: 'Real traveler feedback and ratings help you make informed decisions about your journey.'
            }
          ].map((feature) => (
            <div key={feature.title} className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 hover:-translate-y-2 hover:bg-opacity-15 transition-all duration-300">
              <div className="text-5xl mb-6 text-center">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-center text-white">{feature.title}</h3>
              <p className="text-white text-opacity-90 leading-relaxed text-center">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
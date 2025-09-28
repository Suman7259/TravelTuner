import React from 'react';
import Navigation from './Navigation';
import CharDhamSection from './CharDhamSection';
import ItinerarySection from './ItinerarySection';
import ReviewsSection from './ReviewsSection';

const HomePage = ({ 
  currentUser,
  currentPage,
  setCurrentPage,
  logout,
  setActiveModal,
  generateItinerary,
  itinerary,
  selectCharDhamPackage,
  reviews,
  setFeedbackType
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700">
      <Navigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        logout={logout}
        setActiveModal={setActiveModal}
      />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Plan Your Perfect Journey with AI
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            Discover personalized travel experiences tailored just for you. Let our AI create unforgettable itineraries in seconds.
          </p>
        </div>
      </section>

      {/* Travel Planning Form */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="bg-white bg-opacity-95 backdrop-blur rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Where would you like to go?
            </h2>
            
            <form onSubmit={generateItinerary} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Destination</label>
                <input
                  type="text"
                  name="destination"
                  placeholder="e.g., Paris, Tokyo, New York"
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:-translate-y-1 focus:shadow-lg transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Duration</label>
                <select
                  name="duration"
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:-translate-y-1 focus:shadow-lg transition-all"
                >
                  <option value="">Select duration</option>
                  <option value="1-2">1-2 days</option>
                  <option value="3-5">3-5 days</option>
                  <option value="1-week">1 week</option>
                  <option value="2-weeks">2 weeks</option>
                  <option value="1-month">1 month</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Budget Range</label>
                <select
                  name="budget"
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:-translate-y-1 focus:shadow-lg transition-all"
                >
                  <option value="">Select budget</option>
                  <option value="budget">Budget ($0-50/day)</option>
                  <option value="mid-range">Mid-range ($50-150/day)</option>
                  <option value="luxury">Luxury ($150+/day)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Travel Style</label>
                <select
                  name="travelStyle"
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:-translate-y-1 focus:shadow-lg transition-all"
                >
                  <option value="">Select style</option>
                  <option value="adventure">Adventure</option>
                  <option value="relaxation">Relaxation</option>
                  <option value="cultural">Cultural</option>
                  <option value="spiritual">Spiritual</option>
                  <option value="foodie">Foodie</option>
                  <option value="nightlife">Nightlife</option>
                  <option value="family">Family</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:-translate-y-1 focus:shadow-lg transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Number of Travelers</label>
                <select
                  name="travelers"
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:-translate-y-1 focus:shadow-lg transition-all"
                >
                  <option value="">Select travelers</option>
                  <option value="1">Solo</option>
                  <option value="2">Couple</option>
                  <option value="3-4">Small group (3-4)</option>
                  <option value="5+">Large group (5+)</option>
                </select>
              </div>
              
              <div className="md:col-span-2 lg:col-span-3 space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Additional Preferences</label>
                <textarea
                  name="preferences"
                  placeholder="Tell us about your interests, dietary restrictions, accessibility needs, or anything else we should know..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:-translate-y-1 focus:shadow-lg transition-all resize-none"
                  rows="3"
                />
              </div>
              
              <div className="md:col-span-2 lg:col-span-3 text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                >
                  🚀 Generate My Dream Itinerary
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <CharDhamSection selectCharDhamPackage={selectCharDhamPackage} />

      <ItinerarySection itinerary={itinerary} setActiveModal={setActiveModal} />

      {/* Features Section */}
      <section className="pb-20 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose TravelTuner?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Planning',
                desc: 'Our advanced AI analyzes millions of travel data points to create personalized itineraries that match your preferences perfectly.'
              },
              {
                icon: '⚡',
                title: 'Instant Results',
                desc: 'Get a complete travel plan in seconds. No more hours of research - just input your preferences and let AI do the work.'
              },
              {
                icon: '🎯',
                title: 'Personalized Experience',
                desc: 'Every itinerary is tailored to your budget, interests, and travel style. No generic recommendations - just plans made for you.'
              },
              {
                icon: '🕉️',
                title: 'Spiritual Journeys',
                desc: 'Specialized packages for sacred destinations like Char Dham Yatra, ensuring a divine and comfortable pilgrimage experience.'
              },
              {
                icon: '📱',
                title: 'Mobile Friendly',
                desc: 'Access your itinerary anywhere, anytime. Our platform works seamlessly across all devices.'
              },
              {
                icon: '💰',
                title: 'Budget Optimization',
                desc: 'Get the most value from your travel budget with smart recommendations for activities, dining, and accommodations.'
              }
            ].map((feature) => (
              <div key={feature.title} className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 hover:-translate-y-2 hover:bg-opacity-15 transition-all duration-300">
                <div className="text-5xl mb-6 text-center">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-center">{feature.title}</h3>
                <p className="text-white text-opacity-90 leading-relaxed text-center">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection 
        reviews={reviews}
        setFeedbackType={setFeedbackType}
        setActiveModal={setActiveModal}
      />
    </div>
  );
};

export default HomePage;
import React from 'react';
import Navigation from './Navigation';
import CharDhamSection from './CharDhamSection';
import ItinerarySection from './ItinerarySection';
import ReviewsSection from './ReviewsSection';

// Helper for professional icons
const FeatureIcon = ({ path, className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

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

  const features = [
    {
      icon: <FeatureIcon path="M9.75 3.104l-2.29 2.29h-3.06c-1.14 0-2.08.94-2.08 2.08v1.82h1.82L10.5 15.5V18a1.5 1.5 0 003 0v-2.5l6.19-6.19h1.82v-1.82c0-1.14-.94-2.08-2.08-2.08h-3.06l-2.29-2.29A1.5 1.5 0 009.75 3.104zM4.5 9.75v-1.82a.26.26 0 01.26-.26h3.06l2.29 2.29H4.5z" />,
      title: 'AI-Powered Planning',
      desc: 'Our advanced AI analyzes millions of travel data points to create personalized itineraries that match your preferences perfectly.'
    },
    {
      icon: <FeatureIcon path="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />,
      title: 'Instant Results',
      desc: 'Get a complete travel plan in seconds. No more hours of research - just input your preferences and let our AI do the work.'
    },
    {
      icon: <FeatureIcon path="M10.5 6h9.75M10.5 12h9.75M10.5 18h9.75M3.75 6h.008v.008H3.75V6zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.008v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 18h.008v.008H3.75V18zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
      title: 'Personalized Experience',
      desc: 'Every itinerary is tailored to your budget, interests, and travel style. No generic recommendations - just plans made for you.'
    },
    {
      icon: <FeatureIcon path="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364L6.236 7.236" />,
      title: 'Spiritual Journeys',
      desc: 'Specialized packages for sacred destinations like Char Dham Yatra, ensuring a divine and comfortable pilgrimage experience.'
    },
    {
      icon: <FeatureIcon path="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />,
      title: 'Mobile Friendly',
      desc: 'Access your itinerary anywhere, anytime. Our platform works seamlessly across all devices.'
    },
    {
      icon: <FeatureIcon path="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6H2.25m0 0v-.75A.75.75 0 013 4.5H3.75m0 0v.75A.75.75 0 013 6H2.25m9-1.5V5.25A.75.75 0 0012 6h-.75m0 0V5.25A.75.75 0 0010.5 4.5h.75M15 11.25a3 3 0 11-6 0 3 3 0 016 0z" />,
      title: 'Budget Optimization',
      desc: 'Get the most value from your travel budget with smart recommendations for activities, dining, and accommodations.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Background Image & Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://i.pinimg.com/736x/c3/d8/3a/c3d83a9fc71ccc18b1a23e3921aa6b67.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-blue-900/70 to-gray-900/90"></div>
      </div>
      
      <div className="relative z-10">
        <Navigation 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentUser={currentUser}
          logout={logout}
          setActiveModal={setActiveModal}
        />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 text-center">
          <div className="container max-w-5xl mx-auto px-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
              Your Journey, Reimagined by AI
            </h1>
            <p className="text-lg md:text-xl mb-10 text-blue-100/90 max-w-3xl mx-auto">
              Discover hyper-personalized travel experiences. Let our AI craft your unforgettable itinerary in seconds.
            </p>
          </div>
        </section>

        {/* Travel Planning Form */}
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
              <h2 className="text-3xl font-bold text-center mb-6 text-white">
                Craft Your Next Adventure
              </h2>
              
              <form onSubmit={generateItinerary} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { name: 'destination', type: 'text', placeholder: 'e.g., Kyoto, Japan', label: 'Destination' },
                  { name: 'duration', type: 'select', label: 'Duration', options: ['1-2 days', '3-5 days', '1 week', '2 weeks', '1 month'] },
                  { name: 'budget', type: 'select', label: 'Budget Range', options: ['Budget (2000Rs/day)', 'Mid-range (5000rs/day)', 'Luxury (1000Rs/day)'] },
                  { name: 'travelStyle', type: 'select', label: 'Travel Style', options: ['Adventure', 'Relaxation', 'Cultural', 'Spiritual', 'Foodie', 'Nightlife', 'Family'] },
                  { name: 'startDate', type: 'date', label: 'Start Date' },
                  { name: 'travelers', type: 'select', label: 'Number of Travelers', options: ['Solo', 'Couple', 'Small group (3-4)', 'Large group (5+)'] }
                ].map(field => (
                  <div className="space-y-2" key={field.name}>
                    <label className="block text-sm font-semibold text-blue-100/80">{field.label}</label>
                    {field.type === 'select' ? (
                      <select name={field.name} required className="form-input">
                        <option value="">Select...</option>
                        {field.options.map(opt => <option key={opt} value={opt.split(' ')[0].toLowerCase()}>{opt}</option>)}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        required
                        min={field.type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                        className="form-input"
                      />
                    )}
                  </div>
                ))}

                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-semibold text-blue-100/80">Additional Preferences</label>
                  <textarea
                    name="preferences"
                    placeholder="e.g., vegan food, museums, hiking trails, wheelchair accessibility..."
                    className="form-input resize-none"
                    rows="3"
                  />
                </div>

                <div className="md:col-span-2 text-center pt-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-10 py-3 rounded-full text-lg font-semibold transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/40 transition-all duration-300"
                  >
                    <span className="mr-2">🚀</span> Generate Itinerary
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

       <section className="pb-20 bg-gray-900/50">
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
      <h2 className="text-3xl font-bold text-center mb-10 text-white">
        Book Flights, Hotels, Trains & Rentals
      </h2>

      {/* Flights Card */}
      <div className="bg-gradient-to-r from-teal-600/20 via-blue-700/20 to-indigo-700/20 rounded-2xl p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l9 6 9-6-9-6-9 6zM12 13v8m0 0h6m-6 0H6" />
            </svg>
            <div>
              <h3 className="text-xl font-bold text-white">Flights</h3>
              <p className="text-sm text-blue-100/80">Find and book your perfect flight instantly.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.open('https://www.skyscanner.co.in/flights', '_blank')}
            className="mt-4 md:mt-0 bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/40 transition-all duration-300"
          >
            Book Flight
          </button>
        </div>
      </div>

      {/* Hotels Card */}
      <div className="bg-gradient-to-r from-pink-600/20 via-red-700/20 to-purple-700/20 rounded-2xl p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6M5 10v10h14V10H5z" />
            </svg>
            <div>
              <h3 className="text-xl font-bold text-white">Hotels</h3>
              <p className="text-sm text-blue-100/80">Search and book hotels that fit your travel plans.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.open('https://www.booking.com/', '_blank')}
            className="mt-4 md:mt-0 bg-gradient-to-r from-pink-400 to-red-500 text-white px-8 py-3 rounded-full text-lg font-semibold transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300"
          >
            Book Hotel
          </button>
        </div>
      </div>

      {/* Trains Card */}
      <div className="bg-gradient-to-r from-green-600/20 via-lime-700/20 to-emerald-700/20 rounded-2xl p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <div>
              <h3 className="text-xl font-bold text-white">Trains</h3>
              <p className="text-sm text-blue-100/80">Book train tickets across India quickly and safely.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.open('https://www.irctc.co.in/', '_blank')}
            className="mt-4 md:mt-0 bg-gradient-to-r from-green-400 to-lime-500 text-white px-8 py-3 rounded-full text-lg font-semibold transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300"
          >
            Book Train
          </button>
        </div>
      </div>

      {/* Rentals Card */}
      <div className="bg-gradient-to-r from-yellow-600/20 via-orange-700/20 to-red-700/20 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7M5 7h14v14H5V7z" />
            </svg>
            <div>
              <h3 className="text-xl font-bold text-white">Rentals</h3>
              <p className="text-sm text-blue-100/80">Book car rentals for your trip easily.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.open('https://www.skyscanner.co.in/carhire', '_blank')}
            className="mt-4 md:mt-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-500/40 transition-all duration-300"
          >
            Book Rental
          </button>
        </div>
      </div>

    </div>
  </div>
</section>


        <CharDhamSection selectCharDhamPackage={selectCharDhamPackage} />
        <ItinerarySection itinerary={itinerary} setActiveModal={setActiveModal} />

        {/* Features Section */}
        <section className="py-16 bg-gray-900/30">
          <div className="container max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Why Choose TravelTuner?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-teal-400/50 hover:-translate-y-2 transition-all duration-300 group">
                  <div className="text-4xl mb-4 text-teal-400 group-hover:text-white transition-colors duration-300 w-12 h-12 flex items-center justify-center mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center text-white">{feature.title}</h3>
                  <p className="text-sm text-blue-100/80 leading-relaxed text-center">{feature.desc}</p>
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
    </div>
  );
};

export default HomePage;

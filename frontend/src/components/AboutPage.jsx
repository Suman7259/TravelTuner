import React from 'react';
import Navigation from './Navigation';

const AboutPage = ({ 
  currentUser,
  currentPage,
  setCurrentPage,
  logout,
  setActiveModal
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
      
      <section className="pt-32 pb-20 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            About TravelTuner
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto">
            Revolutionizing travel planning with artificial intelligence and spiritual wisdom
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { number: '50000+', label: 'Happy Travelers' },
              { number: '1000+', label: 'Destinations Covered' },
              { number: '99%', label: 'Satisfaction Rate' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat) => (
              <div key={stat.label} className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20">
                <div className="text-4xl font-bold text-teal-400 mb-2">{stat.number}</div>
                <div className="text-white opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="bg-white bg-opacity-95 backdrop-blur rounded-3xl p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Our Story
                </h2>
                <p className="text-xl text-gray-600 mb-6 font-medium leading-relaxed">
                  Born from a passion for travel and powered by cutting-edge AI technology, TravelTuner was founded in 2025 with a simple yet ambitious mission: to make personalized travel planning accessible to everyone.
                </p>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Our journey began when our founders, experienced travelers and technology enthusiasts, realized the challenges faced by modern travelers. Planning a perfect trip required countless hours of research, comparing options, and often led to generic, one-size-fits-all itineraries.
                  </p>
                  <p>
                    We envisioned a world where artificial intelligence could understand individual preferences, cultural interests, budget constraints, and spiritual aspirations to craft truly personalized travel experiences.
                  </p>
                  <p>
                    Today, TravelTuner has helped over 50,000 travelers discover their perfect journeys, from adventure-packed expeditions to soul-stirring spiritual pilgrimages like the sacred Char Dham Yatra.
                  </p>
                </div>
                
                <div className="mt-8 space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-6 border-l-4 border-indigo-500">
                    <h4 className="text-lg font-bold mb-2 text-gray-800">🎯 Our Mission</h4>
                    <p className="text-gray-700">To democratize travel planning through AI-powered personalization, making dream journeys accessible to every traveler.</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 border-l-4 border-teal-400">
                    <h4 className="text-lg font-bold mb-2 text-gray-800">👁️ Our Vision</h4>
                    <p className="text-gray-700">To become the world's most trusted AI travel companion, connecting people with transformative travel experiences.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="w-full max-w-md h-96 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🗺️</div>
                    <p className="text-2xl font-bold">AI-Powered Travel Planning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="bg-white bg-opacity-95 backdrop-blur rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Meet Our Team</h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              The passionate minds behind TravelTuner's revolutionary travel planning platform
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: 'Arjun Rajesh',
                  role: 'CEO & Co-Founder',
                  avatar: 'AR',
                  bio: 'Former Google AI researcher with 10+ years in machine learning. Passionate about using AI to solve real-world problems and making travel accessible to all.',
                  expertise: ['AI/ML', 'Travel Tech', 'Strategy']
                },
                {
                  name: 'Priya Sharma',
                  role: 'CTO & Co-Founder',
                  avatar: 'PS',
                  bio: 'Ex-Microsoft engineer and travel enthusiast. Expert in scalable systems and AI architecture. Has personally traveled to 45+ countries and understands traveler needs.',
                  expertise: ['System Architecture', 'AI Engineering', 'Product']
                }
              ].map((member) => (
                <div key={member.name} className="bg-white rounded-3xl p-8 text-center shadow-lg border-2 border-transparent hover:border-teal-400 hover:-translate-y-2 transition-all duration-300">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-400 to-teal-400 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-lg">
                    {member.avatar}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{member.name}</h3>
                  <p className="text-lg text-indigo-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-700 leading-relaxed mb-6">{member.bio}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.expertise.map((skill) => (
                      <span key={skill} className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience AI-Powered Travel Planning?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join thousands of satisfied travelers who have discovered their perfect journeys with TravelTuner
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-gradient-to-r from-red-400 to-teal-400 text-white px-8 py-4 rounded-full font-semibold hover:-translate-y-2 hover:shadow-xl transition-all text-lg"
            >
              Start Planning Your Trip
            </button>
            <button
              onClick={() => setActiveModal('signup')}
              className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-indigo-600 hover:-translate-y-2 transition-all font-semibold text-lg"
            >
              Join TravelTuner Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
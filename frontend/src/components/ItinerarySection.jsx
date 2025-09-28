import React from 'react';

const ItinerarySection = ({ itinerary, setActiveModal }) => {
  if (!itinerary) return null;

  return (
    <section className="pb-20">
      <div className="container mx-auto px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Your AI-Generated Itinerary
          </h2>
          <div className="space-y-6">
            {itinerary.map((day) => (
              <div key={day.day} className="bg-gray-50 rounded-2xl p-6 border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold mb-4 text-gray-800">{day.title}</h3>
                <div className="space-y-4">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 border-l-3 border-teal-400">
                      <div className="font-bold text-gray-800">{activity.time} - {activity.name}</div>
                      <p className="text-gray-600 mt-2">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={() => setActiveModal('feedback')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              Rate This Itinerary
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;
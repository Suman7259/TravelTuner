import React from 'react';
import StarRating from './StarRating';

const ReviewsSection = ({ reviews, setFeedbackType, setActiveModal }) => {
  return (
    <section className="pb-20">
      <div className="container mx-auto px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur rounded-3xl p-8 shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            ⭐ Traveler Reviews & Feedback
          </h2>
          <p className="text-xl text-center text-gray-600 mb-8">
            See what our travelers are saying about their experiences
          </p>
          
          <div className="text-center mb-8">
            <button
              onClick={() => {
                setFeedbackType('general');
                setActiveModal('feedback');
              }}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              ✍️ Share Your Travel Experience
            </button>
          </div>
          
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-400 to-teal-400 flex items-center justify-center text-white font-bold text-lg">
                      {review.reviewer.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{review.reviewer.name}</h4>
                      <span className="text-sm text-gray-500">{review.destination} - {review.date}</span>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{review.reviewText}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {review.destination}
                  </span>
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {review.travelType}
                  </span>
                  {review.feedbackType === 'itinerary' && (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                      AI Generated
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
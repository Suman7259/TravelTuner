import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component imports
import Modal from './components/Modal';
import StarRating from './components/StarRating';
import HomePage from './components/HomePage';
import FeaturesPage from './components/FeaturesPage';
import AboutPage from './components/AboutPage';
import ChatBox from './components/ChatBox';

const App = () => {
  // State management
  const [currentUser, setCurrentUser] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState('general');
  const [itinerary, setItinerary] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [notification, setNotification] = useState(null);

  // API call effect
  useEffect(() => {
    axios.get("/api/v1/users")
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  // Initialize reviews
  useEffect(() => {
    loadInitialReviews();
  }, []);

  // Utility functions
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const resetFeedbackForm = () => {
    setSelectedRating(0);
    setActiveModal(null);
  };

  // Authentication handlers
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    if (!email || !password) {
      showNotification('Please fill in all fields!', 'error');
      return;
    }
    
    const name = email.split('@')[0];
    setCurrentUser({ 
      name, 
      email, 
      joinDate: new Date().toISOString().split('T')[0] 
    });
    setActiveModal(null);
    showNotification(`Login successful! Welcome back, ${name}!`);
    e.target.reset();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      showNotification('Please fill in all fields!', 'error');
      return;
    }
    
    if (password !== confirmPassword) {
      showNotification('Passwords do not match!', 'error');
      return;
    }
    
    if (password.length < 6) {
      showNotification('Password must be at least 6 characters long!', 'error');
      return;
    }
    
    setCurrentUser({ 
      name, 
      email, 
      joinDate: new Date().toISOString().split('T')[0] 
    });
    setActiveModal(null);
    showNotification(`Account created successfully! Welcome to TravelTuner, ${name}!`);
    e.target.reset();
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setItinerary(null);
    showNotification('Logged out successfully!');
  };

  // Travel planning functions
  const generateItinerary = (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      showNotification('Please login or create an account to generate itineraries!', 'error');
      setActiveModal('login');
      return;
    }
    
    const formData = new FormData(e.target);
    const destination = formData.get('destination');
    const duration = formData.get('duration');
    const budget = formData.get('budget');
    const style = formData.get('travelStyle');
    
    if (!destination || !duration || !budget || !style) {
      showNotification('Please fill in all required fields!', 'error');
      return;
    }
    
    // Simulate AI processing delay
    setTimeout(() => {
      const generatedItinerary = createSampleItinerary(destination, duration, budget, style);
      setItinerary(generatedItinerary);
      showNotification('Your dream itinerary is ready!');
    }, 2000);
  };

  const createSampleItinerary = (destination, duration, budget, style) => {
    const durationMap = {
      '1-2': 2,
      '3-5': 4,
      '1-week': 7,
      '2-weeks': 14,
      '1-month': 30
    };
    
    const days = durationMap[duration] || 5;
    
    const activityTypes = {
      adventure: [
        'Hiking expedition', 'Rock climbing', 'White water rafting', 
        'Zip lining', 'Mountain biking', 'Paragliding'
      ],
      cultural: [
        'Museum visit', 'Historical site tour', 'Local market exploration', 
        'Traditional performance', 'Architecture walk', 'Heritage site'
      ],
      relaxation: [
        'Spa treatment', 'Beach time', 'Sunset viewing', 
        'Yoga session', 'Garden stroll', 'Meditation center'
      ],
      foodie: [
        'Street food tour', 'Cooking class', 'Wine tasting', 
        'Local restaurant', 'Food market visit', 'Traditional feast'
      ],
      nightlife: [
        'Rooftop bar', 'Live music venue', 'Night market', 
        'Dance club', 'Comedy show', 'Night cruise'
      ],
      family: [
        'Theme park', 'Zoo visit', 'Interactive museum', 
        'Playground', 'Family restaurant', 'Children\'s activities'
      ],
      spiritual: [
        'Temple visit', 'Meditation session', 'Spiritual guide tour', 
        'Sacred site pilgrimage', 'Prayer ceremony', 'Ashram visit'
      ]
    };
    
    const selectedActivities = activityTypes[style] || activityTypes.cultural;
    const itinerary = [];
    
    for (let day = 1; day <= days; day++) {
      const dailyActivities = [...selectedActivities]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      itinerary.push({
        day,
        title: `Day ${day} in ${destination}`,
        activities: dailyActivities.map((activity, index) => ({
          time: ['9:00 AM', '1:00 PM', '6:00 PM'][index],
          name: activity,
          description: `Experience the best of ${destination} with this amazing ${activity.toLowerCase()}. Perfect for ${style} travelers!`
        }))
      });
    }
    
    return itinerary;
  };

  const selectCharDhamPackage = (packageType) => {
    if (!currentUser) {
      showNotification('Please login to select a Char Dham package!', 'error');
      setActiveModal('login');
      return;
    }
    
    const packageDetails = {
      express: { name: 'Express Package', price: '₹25,000', duration: '10 Days / 9 Nights' },
      premium: { name: 'Premium Package', price: '₹40,000', duration: '12 Days / 11 Nights' },
      luxury: { name: 'Luxury Package', price: '₹65,000', duration: '14 Days / 13 Nights' }
    };
    
    const selectedPackage = packageDetails[packageType];
    if (selectedPackage) {
      showNotification(`${selectedPackage.name} selected! Our team will contact you soon for booking details.`);
    }
  };

  // Review and feedback functions
  const handleFeedback = (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      showNotification('Please login to submit feedback!', 'error');
      setActiveModal('login');
      return;
    }
    
    if (selectedRating === 0) {
      showNotification('Please select a rating!', 'error');
      return;
    }
    
    const formData = new FormData(e.target);
    const destination = formData.get('destination');
    const travelType = formData.get('travelType');
    const reviewText = formData.get('reviewText');
    const consent = formData.get('consent');
    
    if (!destination || !travelType || !reviewText || !consent) {
      showNotification('Please fill in all fields and agree to share your review!', 'error');
      return;
    }
    
    const newReview = {
      id: Date.now(),
      reviewer: {
        name: currentUser.name,
        avatar: currentUser.name.charAt(0).toUpperCase()
      },
      destination,
      travelType,
      rating: selectedRating,
      reviewText,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      feedbackType
    };
    
    setReviews(prevReviews => [newReview, ...prevReviews]);
    resetFeedbackForm();
    showNotification('Thank you for your feedback! Your review has been shared successfully.');
    e.target.reset();
  };

  const loadInitialReviews = () => {
    const initialReviews = [
      {
        id: 1,
        reviewer: { name: 'Suresh Kumar', avatar: 'S' },
        destination: 'Char Dham Yatra',
        travelType: 'Spiritual',
        rating: 5,
        reviewText: 'TravelTuner made our Char Dham Yatra absolutely divine! The helicopter service was smooth, accommodations were perfect, and the spiritual experience was life-changing. Highly recommend their premium package!',
        date: 'October 2024'
      },
      {
        id: 2,
        reviewer: { name: 'Priya Sharma', avatar: 'P' },
        destination: 'Kerala Backwaters',
        travelType: 'Family',
        rating: 5,
        reviewText: 'The AI-generated itinerary for Kerala was spot-on! Every recommendation was perfect for our family. Kids loved the backwater cruise and we enjoyed the authentic food experiences.',
        date: 'September 2024'
      },
      {
        id: 3,
        reviewer: { name: 'Rajesh Patel', avatar: 'R' },
        destination: 'Rajasthan Heritage Tour',
        travelType: 'Cultural',
        rating: 4,
        reviewText: 'Amazing experience! The AI perfectly understood our love for history and architecture. Every palace and fort visit was well-timed. Only wish we had more time in Udaipur!',
        date: 'August 2024'
      },
      {
        id: 4,
        reviewer: { name: 'Meena Joshi', avatar: 'M' },
        destination: 'Himachal Adventure',
        travelType: 'Adventure',
        rating: 5,
        reviewText: 'Solo female traveler here! TravelTuner\'s recommendations were not just amazing but also very safe. The adventure activities in Manali were thrilling and the local guides were fantastic.',
        date: 'July 2024'
      }
    ];
    setReviews(initialReviews);
  };

  // Page rendering logic
  const renderCurrentPage = () => {
    const commonProps = {
      currentUser,
      currentPage,
      setCurrentPage,
      logout: handleLogout,
      setActiveModal
    };

    switch (currentPage) {
      case 'home':
      case 'feedback':
        return (
          <HomePage 
            {...commonProps}
            generateItinerary={generateItinerary}
            itinerary={itinerary}
            selectCharDhamPackage={selectCharDhamPackage}
            reviews={reviews}
            setFeedbackType={setFeedbackType}
          />
        );
      case 'about':
        return <AboutPage {...commonProps} />;
      case 'features':
        return <FeaturesPage {...commonProps} />;
      default:
        return (
          <HomePage 
            {...commonProps}
            generateItinerary={generateItinerary}
            itinerary={itinerary}
            selectCharDhamPackage={selectCharDhamPackage}
            reviews={reviews}
            setFeedbackType={setFeedbackType}
          />
        );
    }
  };

  return (
    <div className="font-sans">
      {renderCurrentPage()}
      
      {/* Notification System */}
      {notification && (
        <div className={`fixed top-20 right-6 px-6 py-4 rounded-xl text-white font-semibold z-50 shadow-2xl transform transition-all duration-300 ${
          notification.type === 'error' 
            ? 'bg-red-500' 
            : 'bg-gradient-to-r from-teal-400 to-green-500'
        }`}>
          {notification.message}
        </div>
      )}
      
      {/* Login Modal */}
      <Modal
        id="login"
        title="Welcome Back!"
        onClose={() => setActiveModal(null)}
        activeModal={activeModal}
      >
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => setActiveModal('signup')}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign up here
          </button>
        </div>
      </Modal>
      
      {/* Signup Modal */}
      <Modal
        id="signup"
        title="Join TravelTuner"
        onClose={() => setActiveModal(null)}
        activeModal={activeModal}
      >
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all"
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            required
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            Create Account
          </button>
        </form>
        <div className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => setActiveModal('login')}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login here
          </button>
        </div>
      </Modal>
      
      {/* Feedback Modal */}
      <Modal
        id="feedback"
        title="Share Your Experience"
        onClose={resetFeedbackForm}
        activeModal={activeModal}
      >
        <form onSubmit={handleFeedback} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rate Your Experience:
            </label>
            <div className="flex justify-center">
              <StarRating 
                rating={selectedRating} 
                onRatingChange={setSelectedRating}
                interactive={true}
              />
            </div>
          </div>
          <input
            type="text"
            name="destination"
            placeholder="Trip Destination"
            required
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all"
          />
          <select
            name="travelType"
            required
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all"
          >
            <option value="">Select Travel Type</option>
            <option value="Adventure">Adventure</option>
            <option value="Cultural">Cultural</option>
            <option value="Spiritual">Spiritual</option>
            <option value="Family">Family</option>
            <option value="Char Dham">Char Dham Yatra</option>
            <option value="Business">Business</option>
            <option value="Solo">Solo Travel</option>
          </select>
          <textarea
            name="reviewText"
            placeholder="Share your detailed experience, what you loved, and any suggestions for improvement..."
            rows="5"
            required
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all resize-none"
          />
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="consent"
              required
              className="w-5 h-5 text-indigo-600"
            />
            <span className="text-sm text-gray-700">
              I agree to share this review publicly to help other travelers
            </span>
          </label>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            Submit Review
          </button>
        </form>
      </Modal>
     <ChatBox />
    </div>
  );
};

export default App;
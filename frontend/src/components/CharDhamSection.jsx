import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CharDhamSection = ({ selectCharDhamPackage }) => {
  const navigate = useNavigate();
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customPackage, setCustomPackage] = useState({
    destination: "",
    durationValue: "",
    durationUnit: "",
    budget: "",
    accommodation: "",
    transportation: "",
    specialRequests: "",
    numberOfPeople: "1",
  });

  // Handle standard package selection and route to payment
  const handleStandardPackageSelect = (pkg) => {
    // Call parent function if provided
    if (selectCharDhamPackage) {
      selectCharDhamPackage(pkg.type);
    }
    
    // Navigate to payment page with package data
    navigate('/payment', { 
      state: pkg 
    });
  };

  const handleCustomPackageSubmit = (e) => {
    e.preventDefault();
    
    // Combine duration value and unit
    const finalDuration = `${customPackage.durationValue} ${customPackage.durationUnit}`;
    
    // Create the custom package data object
    const customPackageData = {
      type: "custom",
      name: "Custom Char Dham Package",
      duration: finalDuration,
      price: customPackage.budget === "20000-30000" ? "₹20,000 - ₹30,000" :
             customPackage.budget === "30000-45000" ? "₹30,000 - ₹45,000" :
             customPackage.budget === "45000-60000" ? "₹45,000 - ₹60,000" :
             "₹60,000+",
      destination: customPackage.destination,
      accommodation: customPackage.accommodation,
      transportation: customPackage.transportation,
      numberOfPeople: customPackage.numberOfPeople,
      specialRequests: customPackage.specialRequests,
      budget: customPackage.budget
    };

    // Call parent function if provided
    if (selectCharDhamPackage) {
      selectCharDhamPackage("custom", customPackageData);
    }

    // Navigate to payment page with custom package data
    navigate('/payment', { 
      state: customPackageData 
    });

    // Reset form
    setCustomPackage({
      destination: "",
      durationValue: "",
      durationUnit: "",
      budget: "",
      accommodation: "",
      transportation: "",
      specialRequests: "",
      numberOfPeople: "1",
    });
    
    setShowCustomForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomPackage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const packages = [
    {
      type: "express",
      name: "Express Package",
      duration: "10 Days / 9 Nights",
      price: "₹25,000 per person",
      features: [
        "Helicopter services to Kedarnath",
        "3-star accommodation",
        "All meals included",
        "Professional guide",
      ],
      featured: false,
    },
    {
      type: "premium",
      name: "Premium Package",
      duration: "12 Days / 11 Nights",
      price: "₹40,000 per person",
      features: [
        "Helicopter for Kedarnath & Badrinath",
        "4-star accommodation",
        "All meals & snacks",
        "VIP darshan arrangements",
        "Medical support",
      ],
      featured: true,
    },
    {
      type: "luxury",
      name: "Luxury Package",
      duration: "14 Days / 13 Nights",
      price: "₹65,000 per person",
      features: [
        "Private helicopter services",
        "5-star accommodation",
        "Personal butler service",
        "Special VIP darshan",
        "Ayurvedic spa treatments",
      ],
      featured: false,
    },
  ];

  return (
    <section className="pb-20">
      <div className="container mx-auto px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur rounded-3xl p-8 shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
            🕉️ Char Dham Yatra - Sacred Journey
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-4xl mx-auto">
            Embark on a spiritual journey to the four sacred shrines of
            Uttarakhand. Experience divine bliss and inner peace with our
            specially curated Char Dham Yatra packages.
          </p>

          {/* Dham Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                name: "Yamunotri",
                icon: "🏔️",
                alt: "3,293m",
                time: "May-Oct",
                desc: "Source of River Yamuna. Dedicated to Goddess Yamuna, offering purification from sins.",
              },
              {
                name: "Gangotri",
                icon: "🌊",
                alt: "3,100m",
                time: "May-Oct",
                desc: "Origin of River Ganga. Sacred temple dedicated to Goddess Ganga for spiritual cleansing.",
              },
              {
                name: "Kedarnath",
                icon: "⛰️",
                alt: "3,583m",
                time: "May-Oct",
                desc: "One of 12 Jyotirlingas of Lord Shiva. Offers liberation from the cycle of birth and death.",
              },
              {
                name: "Badrinath",
                icon: "🏛️",
                alt: "3,133m",
                time: "May-Oct",
                desc: "Dedicated to Lord Vishnu. One of the 108 Divya Desams and Char Dham pilgrimage sites.",
              },
            ].map((dham) => (
              <div
                key={dham.name}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center border-3 border-transparent bg-clip-padding hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-teal-400 rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                <div className="text-6xl mb-4">{dham.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {dham.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {dham.desc}
                </p>
                <div className="flex justify-between text-sm">
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-semibold">
                    Altitude: {dham.alt}
                  </span>
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-semibold">
                    Best: {dham.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Packages */}
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Choose Your Char Dham Package
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {packages.map((pkg) => (
              <div
                key={pkg.type}
                className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative ${
                  pkg.featured
                    ? "border-red-400 transform scale-105 shadow-lg"
                    : "border-gray-200"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-400 to-teal-400 text-white px-6 py-2 rounded-full font-semibold">
                    Most Popular
                  </div>
                )}
                <h4 className="text-2xl font-bold mb-4 text-gray-800">
                  {pkg.name}
                </h4>
                <div className="text-lg text-gray-600 mb-2">{pkg.duration}</div>
                <div className="text-3xl font-bold text-red-500 mb-6">
                  {pkg.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-teal-500 font-bold mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleStandardPackageSelect(pkg)}
                  className="w-full bg-gradient-to-r from-red-400 to-teal-400 text-white py-3 rounded-xl font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  Select Package
                </button>
              </div>
            ))}
          </div>

          {/* Custom Package Button */}
          <div className="text-center mb-8">
            <button
              type="button"
              onClick={() => setShowCustomForm((prev) => !prev)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:-translate-y-1 hover:shadow-lg transition-all inline-flex items-center space-x-2"
            >
              <span>✨</span>
              <span>
                {showCustomForm
                  ? "Hide Custom Package Form"
                  : "Create Your Own Custom Package"}
              </span>
            </button>
          </div>

          {/* Custom Package Form - show only when toggled */}
          {showCustomForm && (
            <form
              onSubmit={handleCustomPackageSubmit}
              className="space-y-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 transition-all duration-300"
            >
              <h4 className="text-2xl font-bold text-center text-gray-800 mb-2">
                🎯 Customize Your Char Dham Experience
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Destination */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={customPackage.destination}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter destination (e.g., Kedarnath, Badrinath...)"
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-300 bg-purple-100 text-purple-900 focus:bg-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
                  />
                </div>

                {/* Duration with number + unit */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Trip Duration
                  </label>
                  <div className="flex space-x-3">
                    <input
                      type="number"
                      name="durationValue"
                      value={customPackage.durationValue || ""}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-1/2 px-4 py-3 rounded-xl border-2 border-purple-300 bg-purple-100 text-purple-900 focus:bg-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
                      placeholder="Enter number"
                    />
                    <select
                      name="durationUnit"
                      value={customPackage.durationUnit || ""}
                      onChange={handleInputChange}
                      required
                      className="w-1/2 px-4 py-3 rounded-xl border-2 border-purple-300 bg-purple-100 text-purple-900 focus:bg-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
                    >
                      <option value="">Unit</option>
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Budget per Person
                  </label>
                  <select
                    name="budget"
                    value={customPackage.budget}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-300 bg-purple-100 text-purple-900 focus:bg-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
                  >
                    <option value="">Select budget</option>
                    <option value="20000-30000">₹20,000 - ₹30,000</option>
                    <option value="30000-45000">₹30,000 - ₹45,000</option>
                    <option value="45000-60000">₹45,000 - ₹60,000</option>
                    <option value="60000+">₹60,000+</option>
                  </select>
                </div>

                {/* Accommodation */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Accommodation Preference
                  </label>
                  <select
                    name="accommodation"
                    value={customPackage.accommodation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-300 bg-purple-100 text-purple-900 focus:bg-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
                  >
                    <option value="">Select accommodation</option>
                    <option value="budget">
                      Budget (Guesthouses/Dharamshalas)
                    </option>
                    <option value="3-star">3-Star Hotels</option>
                    <option value="4-star">4-Star Hotels</option>
                    <option value="5-star">5-Star Hotels/Resorts</option>
                    <option value="mixed">Mixed (Budget + Premium)</option>
                  </select>
                </div>

                {/* Transportation */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Transportation Preference
                  </label>
                  <select
                    name="transportation"
                    value={customPackage.transportation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-300 bg-purple-100 text-purple-900 focus:bg-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
                  >
                    <option value="">Select transportation</option>
                    <option value="road-only">
                      Road Only (SUV/Tempo Traveller)
                    </option>
                    <option value="heli-kedarnath">
                      Helicopter for Kedarnath
                    </option>
                    <option value="heli-both">
                      Helicopter for Kedarnath & Badrinath
                    </option>
                    <option value="private-heli">
                      Private Helicopter Services
                    </option>
                  </select>
                </div>

                {/* Number of People */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    name="numberOfPeople"
                    value={customPackage.numberOfPeople}
                    onChange={handleInputChange}
                    min="1"
                    max="50"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-300 bg-purple-100 text-purple-900 focus:bg-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
                    placeholder="Enter number of travelers"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Special Requests / Requirements
                </label>
                <textarea
                  name="specialRequests"
                  value={customPackage.specialRequests}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-300 bg-purple-100 text-purple-900 focus:bg-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all resize-none"
                  placeholder="E.g., dietary restrictions, medical needs, preferred dates..."
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:-translate-y-1 hover:shadow-lg transition-all inline-flex items-center space-x-2"
                >
                  <span>🚀</span>
                  <span>Proceed to Payment</span>
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  Review your custom package details on the next page
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CharDhamSection;
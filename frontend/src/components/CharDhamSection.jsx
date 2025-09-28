import React from 'react';

const CharDhamSection = ({ selectCharDhamPackage }) => {
  return (
    <section className="pb-20">
      <div className="container mx-auto px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur rounded-3xl p-8 shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
            🕉️ Char Dham Yatra - Sacred Journey
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-4xl mx-auto">
            Embark on a spiritual journey to the four sacred shrines of Uttarakhand. Experience divine bliss and inner peace with our specially curated Char Dham Yatra packages.
          </p>
          
          {/* Dham Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { name: 'Yamunotri', icon: '🏔️', alt: '3,293m', time: 'May-Oct', desc: 'Source of River Yamuna. Dedicated to Goddess Yamuna, offering purification from sins.' },
              { name: 'Gangotri', icon: '🌊', alt: '3,100m', time: 'May-Oct', desc: 'Origin of River Ganga. Sacred temple dedicated to Goddess Ganga for spiritual cleansing.' },
              { name: 'Kedarnath', icon: '⛰️', alt: '3,583m', time: 'May-Oct', desc: 'One of 12 Jyotirlingas of Lord Shiva. Offers liberation from the cycle of birth and death.' },
              { name: 'Badrinath', icon: '🏛️', alt: '3,133m', time: 'May-Oct', desc: 'Dedicated to Lord Vishnu. One of the 108 Divya Desams and Char Dham pilgrimage sites.' }
            ].map((dham) => (
              <div key={dham.name} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center border-3 border-transparent bg-clip-padding hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-teal-400 rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                <div className="text-6xl mb-4">{dham.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{dham.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{dham.desc}</p>
                <div className="flex justify-between text-sm">
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-semibold">Altitude: {dham.alt}</span>
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-semibold">Best: {dham.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Packages */}
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Choose Your Char Dham Package</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                type: 'express',
                name: 'Express Package',
                duration: '10 Days / 9 Nights',
                price: '₹25,000 per person',
                features: ['Helicopter services to Kedarnath', '3-star accommodation', 'All meals included', 'Professional guide'],
                featured: false
              },
              {
                type: 'premium',
                name: 'Premium Package',
                duration: '12 Days / 11 Nights',
                price: '₹40,000 per person',
                features: ['Helicopter for Kedarnath & Badrinath', '4-star accommodation', 'All meals & snacks', 'VIP darshan arrangements', 'Medical support'],
                featured: true
              },
              {
                type: 'luxury',
                name: 'Luxury Package',
                duration: '14 Days / 13 Nights',
                price: '₹65,000 per person',
                features: ['Private helicopter services', '5-star accommodation', 'Personal butler service', 'Special VIP darshan', 'Ayurvedic spa treatments'],
                featured: false
              }
            ].map((pkg) => (
              <div key={pkg.type} className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative ${pkg.featured ? 'border-red-400 transform scale-105 shadow-lg' : 'border-gray-200'}`}>
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-400 to-teal-400 text-white px-6 py-2 rounded-full font-semibold">
                    Most Popular
                  </div>
                )}
                <h4 className="text-2xl font-bold mb-4 text-gray-800">{pkg.name}</h4>
                <div className="text-lg text-gray-600 mb-2">{pkg.duration}</div>
                <div className="text-3xl font-bold text-red-500 mb-6">{pkg.price}</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-teal-500 font-bold mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => selectCharDhamPackage(pkg.type)}
                  className="w-full bg-gradient-to-r from-red-400 to-teal-400 text-white py-3 rounded-xl font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharDhamSection;
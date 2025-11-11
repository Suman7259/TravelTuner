import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const packageData = location.state;

  if (!packageData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            No Package Selected
          </h2>
          <p className="text-gray-600 mb-6">
            Please select a package before proceeding to payment.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-red-400 to-teal-400 text-white px-8 py-3 rounded-xl font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            ← Go Back to Packages
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            💳 Secure Payment
          </h1>
          <p className="text-gray-600">
            Complete your booking in a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Package Summary Card */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3">📦</span>
              Package Summary
            </h2>

            <div className="space-y-4">
              {/* Package Name */}
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 font-semibold">Package Name:</span>
                <span className="text-gray-800 font-bold">{packageData.name}</span>
              </div>

              {/* Package Type */}
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 font-semibold">Package Type:</span>
                <span className="bg-gradient-to-r from-red-400 to-teal-400 bg-clip-text text-transparent font-bold capitalize">
                  {packageData.type}
                </span>
              </div>

              {/* Duration */}
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 font-semibold">Duration:</span>
                <span className="text-gray-800 font-bold">{packageData.duration}</span>
              </div>

              {/* Price */}
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 font-semibold">Price:</span>
                <span className="text-2xl font-bold text-red-500">{packageData.price}</span>
              </div>

              {/* Custom Package Details */}
              {packageData.type === "custom" && (
                <>
                  {packageData.destination && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-semibold">Destination:</span>
                      <span className="text-gray-800 font-bold">{packageData.destination}</span>
                    </div>
                  )}
                  
                  {packageData.accommodation && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-semibold">Accommodation:</span>
                      <span className="text-gray-800 font-bold capitalize">{packageData.accommodation}</span>
                    </div>
                  )}
                  
                  {packageData.transportation && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-semibold">Transportation:</span>
                      <span className="text-gray-800 font-bold capitalize">{packageData.transportation.replace(/-/g, ' ')}</span>
                    </div>
                  )}
                  
                  {packageData.numberOfPeople && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-semibold">Number of Travelers:</span>
                      <span className="text-gray-800 font-bold">{packageData.numberOfPeople}</span>
                    </div>
                  )}
                  
                  {packageData.specialRequests && (
                    <div className="py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-semibold block mb-2">Special Requests:</span>
                      <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                        {packageData.specialRequests}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Standard Package Features */}
              {packageData.features && packageData.features.length > 0 && (
                <div className="py-3">
                  <span className="text-gray-600 font-semibold block mb-3">Package Includes:</span>
                  <ul className="space-y-2">
                    {packageData.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="text-teal-500 font-bold mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Payment Action Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Payment Details
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{packageData.price}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (5%):</span>
                  <span className="font-semibold">Included</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-4 flex justify-between">
                  <span className="text-lg font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-red-500">{packageData.price}</span>
                </div>
              </div>

              <button
                onClick={() => alert("🪙 Payment Gateway Coming Soon! You will be redirected to our secure payment partner.")}
                className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white py-4 rounded-xl font-semibold text-lg hover:-translate-y-1 hover:shadow-lg transition-all mb-4"
              >
                Proceed to Pay 💰
              </button>

              <button
                onClick={() => navigate(-1)}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                ← Back to Packages
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center mb-3">
                  🔒 Secure Payment Gateway
                </p>
                <div className="flex justify-center space-x-3">
                  <div className="text-2xl">💳</div>
                  <div className="text-2xl">🏦</div>
                  <div className="text-2xl">📱</div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">
                  We accept all major payment methods
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Secure Payment Guarantee</h4>
              <p className="text-sm text-gray-600">
                Your payment information is encrypted and secure. We use industry-standard SSL 
                encryption to protect your data. All transactions are processed through our 
                secure payment gateway partners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
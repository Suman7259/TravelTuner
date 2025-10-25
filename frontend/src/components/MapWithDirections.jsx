import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapWithDirections = ({ origin, destination }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!origin || !destination) {
      setError("Origin and destination are required");
      setLoading(false);
      return;
    }

    // Initialize map
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
    }

    const fetchRoute = async () => {
      setLoading(true);
      setError(null);

      try {
        // Geocode origin
        const originResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(origin)}`
        );
        const originData = await originResponse.json();

        if (!originData || originData.length === 0) {
          throw new Error(`Could not find location: ${origin}`);
        }

        // Geocode destination
        const destResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`
        );
        const destData = await destResponse.json();

        if (!destData || destData.length === 0) {
          throw new Error(`Could not find location: ${destination}`);
        }

        const originCoords = [parseFloat(originData[0].lat), parseFloat(originData[0].lon)];
        const destCoords = [parseFloat(destData[0].lat), parseFloat(destData[0].lon)];

        // Get route from OSRM (Open Source Routing Machine)
        const routeResponse = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${originCoords[1]},${originCoords[0]};${destCoords[1]},${destCoords[0]}?overview=full&geometries=geojson`
        );
        const routeData = await routeResponse.json();

        if (routeData.code !== "Ok" || !routeData.routes || routeData.routes.length === 0) {
          throw new Error("Could not calculate route between these locations");
        }

        const route = routeData.routes[0];
        const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);

        // Clear previous layers
        mapInstanceRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            mapInstanceRef.current.removeLayer(layer);
          }
        });

        // Add markers
        const startIcon = L.divIcon({
          html: '<div style="background-color: #14B8A6; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">A</div>',
          className: '',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        const endIcon = L.divIcon({
          html: '<div style="background-color: #EF4444; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">B</div>',
          className: '',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        L.marker(originCoords, { icon: startIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`<b>Start:</b> ${origin}`);

        L.marker(destCoords, { icon: endIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`<b>Destination:</b> ${destination}`);

        // Draw route
        L.polyline(coordinates, {
          color: "#14B8A6",
          weight: 5,
          opacity: 0.8,
        }).addTo(mapInstanceRef.current);

        // Fit bounds to show entire route
        const bounds = L.latLngBounds(coordinates);
        mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });

        // Set route info
        const distanceKm = (route.distance / 1000).toFixed(1);
        const durationHours = Math.floor(route.duration / 3600);
        const durationMinutes = Math.round((route.duration % 3600) / 60);

        setRouteInfo({
          distance: `${distanceKm} km`,
          duration: durationHours > 0 
            ? `${durationHours}h ${durationMinutes}min` 
            : `${durationMinutes} min`,
          startAddress: originData[0].display_name,
          endAddress: destData[0].display_name,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching route:", err);
        setError(err.message || "Could not load route. Please try again.");
        setLoading(false);
      }
    };

    fetchRoute();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [origin, destination]);

  return (
    <div className="w-full space-y-4">
      {/* Route Information Card */}
      {routeInfo && !loading && (
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-teal-500/20 rounded-full p-2">
                <svg
                  className="w-6 h-6 text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-blue-100/60">Distance</p>
                <p className="text-lg font-bold text-white">{routeInfo.distance}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500/20 rounded-full p-2">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-blue-100/60">Est. Duration</p>
                <p className="text-lg font-bold text-white">{routeInfo.duration}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <svg
              className="w-6 h-6 text-red-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && !error && (
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-400"></div>
            <p className="text-white font-semibold">Loading route...</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "500px",
            borderRadius: "16px",
          }}
        />
      </div>

      {/* Legend */}
      {!error && (
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
              <span className="text-sm text-blue-100/80">Starting Point</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                B
              </div>
              <span className="text-sm text-blue-100/80">Destination</span>
            </div>
          </div>
        </div>
      )}

      {/* Travel Tips */}
      {!error && (
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Pro Tip
          </h4>
          <p className="text-sm text-blue-100/80">
            Consider weather conditions, road closures, and peak travel times when planning your journey. Always check for real-time traffic updates before departure.
          </p>
        </div>
      )}
    </div>
  );
};

export default MapWithDirections;
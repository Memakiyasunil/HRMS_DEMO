// src/api/locationApi.js
import { showSwal } from '../utils/swal';

// === Get user location ===
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Reverse geocoding (OpenStreetMap)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            { headers: { 'User-Agent': 'HRIS-System/1.0' } }
          );

          const data = await response.json();
          const address = data.display_name || 'Unknown location';

          resolve({
            latitude,
            longitude,
            address,
            coordinates: `${latitude}, ${longitude}`,
          });
        } catch (error) {
          showSwal('Location Failed', 'Failed to get address: ' + error.message, 'error');
          reject(error);
        }
      },
      (error) => {
        let message = '';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location permission denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out.';
            break;
          default:
            message = 'An unknown error occurred.';
        }
        showSwal('Location Failed', `Failed to get location: ${message}`, 'error');
        reject(new Error(message));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
};

// ==== Calculate distance (meters) ====
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371e3;
  const φ1 = toRad(parseFloat(lat1));
  const φ2 = toRad(parseFloat(lat2));
  const Δφ = toRad(parseFloat(lat2) - parseFloat(lat1));
  const Δλ = toRad(parseFloat(lon2) - parseFloat(lon1));

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

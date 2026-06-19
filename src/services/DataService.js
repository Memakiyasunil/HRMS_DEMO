// src/services/DataService.js
import { showSwal } from '../utils/swal'; 
import axios from 'axios';

// Function to get user location (getCurrentLocation)
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
                    // Using Nominatim API from OpenStreetMap for reverse geocoding
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
                        {
                            headers: {
                                'User-Agent': 'HRIS-System/1.0'
                            }
                        }
                    );
                    
                    if (!response.ok) {
                        throw new Error('Failed to get address from location');
                    }
                    
                    const data = await response.json();
                    const address = data.display_name || 'Unknown location';
                    
                    resolve({
                        coordinates: `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`,
                        address: address
                    });
                } catch (error) {
                    // This block handles failed reverse geocoding
                    console.error('Error getting address:', error);
                    
                    // Fallback logic (use coordinates and estimate location name)
                    let locationName = 'Unknown location (Reverse Geocoding Failed)';
                    
                    if (latitude > -6.3 && latitude < -6.1 && longitude > 106.7 && longitude < 106.9) {
                        locationName = 'Central Jakarta, Indonesia (Estimated)';
                    } else if (latitude > -6.4 && latitude < -6.2 && longitude > 106.8 && longitude < 107.0) {
                        locationName = 'South Jakarta, Indonesia (Estimated)';
                    } else if (latitude > -6.1 && latitude < -5.9 && longitude > 106.7 && longitude < 106.9) {
                        locationName = 'North Jakarta, Indonesia (Estimated)';
                    }
                    
                    // Location is still obtained (only the address is estimated)
                    resolve({
                        coordinates: `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`,
                        address: locationName
                    });
                }
            },
            (error) => {
                let errorMessage = 'Unable to get location';
                let alertMessage = 'Your location cannot be accessed. Please allow location access to record attendance.';
                
                switch(error.code) {
                    case error.PERMISSION_DENIED: 
                        errorMessage = 'Location permission denied by user'; 
                        alertMessage = 'Location permission denied. Please allow location access in your browser/phone settings. Attendance cancelled.';
                        break;
                    case error.POSITION_UNAVAILABLE: 
                        errorMessage = 'Location information unavailable (Try enabling GPS)'; 
                        alertMessage = 'Location information unavailable. Make sure **GPS** is active or try in an open area. Attendance cancelled.';
                        break;
                    case error.TIMEOUT: 
                        errorMessage = 'Location request timed out'; 
                        alertMessage = 'Location request **timed out**. Slow connection or unstable GPS. Please try again. Attendance cancelled.';
                        break;
                    default: 
                        errorMessage = 'Unknown error'; 
                        break;
                }
                
                showSwal(
                    'Attendance Failed!',
                    alertMessage,
                    'error',
                    5000 
                );
                
                reject(new Error(errorMessage));
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
    });
};

// Function to handle attendance (logic from handleCameraCapture/handleClockIn/Out)
export const handleAttendanceClock = async (user, photoData, type) => {
    const action = type === 'Clock In' ? 'In' : 'Out';
    
    try {
        const location = await getCurrentLocation(); 
        
        const now = new Date();
        const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const dateString = now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const isLate = type === 'Clock In' && (now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() > 0));
        
        const newRecord = { 
            id: Date.now(), 
            date: dateString, 
            type: type, 
            time: timeString, 
            location: `${location.coordinates} (${location.address})`, 
            late: isLate, 
            photo: photoData 
        };
        
        const newPhotoRecord = { 
            id: Date.now(), 
            date: dateString, 
            time: timeString, 
            type: type, 
            photo: photoData, 
            location: `${location.coordinates} (${location.address})`, 
            employeeId: user.id, 
            employeeName: user.name, 
            divisionon: user.divisionon || 'N/A', 
            employeeEmail: user.email || 'N/A', 
            employeePhone: user.phone || 'N/A', 
        };
        
        showSwal( 
            'Attendance Successful!', 
            `You have successfully <strong>Clock ${action}</strong> at <strong>${timeString}</strong>.<br/> Location: ${location.address}<br/> Selfie photo has been sent to manager. ${isLate ? '<span class="text-red-600 font-bold">Late!</span>' : ''}`, 
            'success', 
            4000 
        );

        return { success: true, newRecord, newPhotoRecord };

    } catch (error) {
        // This block handles total location failure (PERMISSION_DENIED, TIMEOUT, etc.)
        // SweetAlert has already been called in getCurrentLocation.
        console.error('Attendance cancelled due to Location Failure:', error.message);
        
        // Stop attendance process. Don't create a record.
        return { success: false, error: error.message };
    }
};

// Additional functions like updateEmployeeProfile, approveLeave, etc. can be added here.
export default {
    getCurrentLocation,
    handleAttendanceClock,
};

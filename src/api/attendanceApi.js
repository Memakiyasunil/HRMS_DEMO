// src/api/attendanceApi.js
import { showSwal } from '../utils/swal';

export const fetchAttendanceHistory = async (apiFetch) => {
    try {
        const response = await apiFetch('/api/my-attendance');
        return response?.data || response || [];
    } catch (error) {
        console.error('Error fetching attendance history:', error);
        return [];
    }
};

export const fetchAllAttendanceHistory = async (apiFetch) => {
    try {
        const response = await apiFetch('/api/all-attendance');
        return response?.data || response || [];
    } catch (error) {
        console.error('Error fetching all attendance history:', error);
        return [];
    }
};

export const approveAttendance = async (apiFetch, recordId) => {
    try {
        await apiFetch(`/api/approve-attendance/${recordId}`, { method: 'POST' });
        showSwal('Success', 'Attendance approved successfully', 'success');
        return true;
    } catch (error) {
        console.error('Error approving attendance:', error);
        showSwal('Error', 'Failed to approve attendance', 'error');
        return false;
    }
};

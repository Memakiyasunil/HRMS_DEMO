// src/api/dataApi.js
import { showSwal } from '../utils/swal';

// Company Location Coordinates
const COMPANY_LOCATION = {
  latitude: 3.6206229,
  longitude: 98.7294571,
  name: 'PT. DOODLE INDONESIA'
};

// Calculate time difference in minutes
const calculateTimeDifference = (time1, time2) => {
  const [hour1, minute1] = time1.split(':').map(Number);
  const [hour2, minute2] = time2.split(':').map(Number);
  const totalMinutes1 = hour1 * 60 + minute1;
  const totalMinutes2 = hour2 * 60 + minute2;
  return Math.abs(totalMinutes1 - totalMinutes2);
};

// Main employee attendance handler
export const handleAttendanceClock = async (user, type, photoData, workSettings, permissionData = null) => {
  try {
    const now = new Date();
    const date = now.toLocaleDateString('en-US');
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    const startTime = workSettings?.startTime || '08:00';
    const endTime = workSettings?.endTime || '17:00';
    
    let isLate = false;
    let isEarlyLeave = false;
    let reason = '';
    let permissionNote = '';
    let permissionFile = '';
    let lateDuration = 0;

    // Detect late for Clock In (after start time)
    if (type === 'In') {
      if (time > startTime) {
        isLate = true;
        lateDuration = calculateTimeDifference(time, startTime);
      }
    }

    // Detect early leave for Clock Out (before end time)
    if (type === 'Out') {
      if (time < endTime) {
        isEarlyLeave = true;
      }
    }

    // If permission data exists, use it
    if (permissionData) {
      permissionNote = permissionData.note || '';
      permissionFile = permissionData.file || '';
      reason = permissionData.note || '';
    }

    // Create attendance record
    const newRecord = {
      id: Date.now(),
      userId: user.id,
      name: user.name,
      date,
      time,
      type: type === 'In' ? 'Clock In' : 'Clock Out',
      isLate,
      isEarlyLeave,
      lateDuration,
      reason,
      permissionNote,
      permissionFile,
      location: 'PT. DOODLE INDONESIA',
      coordinates: `${COMPANY_LOCATION.latitude}, ${COMPANY_LOCATION.longitude}`,
      divisionon: user.divisionon,
      hasPermission: !!permissionData
    };

    // Save attendance photo
    const newPhotoRecord = {
      id: Date.now(),
      userId: user.id,
      date,
      type: type === 'In' ? 'clock_in' : 'clock_out',
      image: photoData,
      timestamp: now.toISOString()
    };

    // Success notification
    let successMessage = `Successfully performed ${type === 'In' ? 'Clock In' : 'Clock Out'}!`;
    
    if (isLate) {
      successMessage += ` (Late by ${lateDuration} minutes)`;
    }
    if (isEarlyLeave) {
      successMessage += ' (Early Leave)';
    }
    if (permissionData) {
      successMessage += ' - With Permission';
    }

    showSwal('Success', successMessage, 'success');

    return { 
      success: true, 
      newRecord, 
      newPhotoRecord,
      isLate,
      isEarlyLeave,
      lateDuration
    };

  } catch (error) {
    console.error('Error in handleAttendanceClock:', error);
    showSwal('Error', 'Failed to record attendance: ' + error.message, 'error');
    return { success: false, error: error.message };
  }
};

// Submit permission request
export const submitPermissionRequest = async (user, type, permissionData, workSettings) => {
  try {
    const now = new Date();
    const date = now.toLocaleDateString('en-US');
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    const permissionRecord = {
      id: Date.now(),
      userId: user.id,
      name: user.name,
      date,
      time,
      type: type === 'In' ? 'Late Permission' : 'Early Leave Permission',
      permissionType: type === 'In' ? 'late' : 'early_out',
      note: permissionData.note,
      file: permissionData.file,
      status: 'approved',
      approvedBy: 'System Auto',
      approvedAt: now.toISOString(),
      divisionon: user.divisionon
    };

    const userPermissionHistory = user.permissionHistory || [];
    userPermissionHistory.push(permissionRecord);

    let additionalInfo = '';
    if (type === 'In' && permissionData.lateDuration) {
      additionalInfo = ` (${permissionData.lateDuration} minutes)`;
    }

    showSwal(
      'Permission Approved', 
      `Your ${type === 'In' ? 'late' : 'early leave'} permission has been approved${additionalInfo}. ${type === 'Out' ? 'Automatic clock out has been recorded.' : 'Please proceed with attendance.'}`, 
      'success'
    );

    return {
      success: true,
      permissionRecord,
      message: 'Permission successfully submitted and approved'
    };

  } catch (error) {
    console.error('Error in submitPermissionRequest:', error);
    showSwal('Error', 'Failed to submit permission request: ' + error.message, 'error');
    return { success: false, error: error.message };
  }
};

// Get performance data
export const getPerformanceData = (user) => {
  return {
    score: user.performanceScore || 85,
    completedTasks: user.tasks ? user.tasks.filter(task => task.status === 'Completed').length : 0,
    pendingTasks: user.tasks ? user.tasks.filter(task => task.status === 'Pending' || task.status === 'In Progress').length : 0,
    totalTasks: user.tasks ? user.tasks.length : 0,
    targetAchievement: Math.min(100, Math.floor((user.performanceScore || 85) / 85 * 100))
  };
};

// Get leave history
export const getLeaveHistory = (user) => {
  return user.leaveHistory || [];
};

// Update employee profile
export const updateEmployeeProfile = async (employeeId, changes) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Profile change request submitted successfully',
      requestId: Date.now()
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to submit profile change request'
    };
  }
};
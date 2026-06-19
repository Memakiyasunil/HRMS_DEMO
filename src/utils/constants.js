// src/utils/constants.js
// This file contains only static dummy data and constants.
// All utility functions (showSwal, formattedCurrency) have been moved to separate files.

// --- Color Definitions ---
export const COLORS = {
  Primary: '#6366F1',
  Secondary: '#8B5CF6',
  Success: '#22C55E',
  Warning: '#F59E0B',
  Error: '#EF4444',
  Dark: '#0F172A',
  Light: '#F1F5F9'
};

// --- Dummy Data for Login Simulation (DUMMY_AUTH) ---
export const DUMMY_AUTH = {
  employee: { 
      id: 101, 
      username: 'employee', 
      password: 'password', 
      role: 'employee', 
      name: 'Asep Suryana', 
      divisionon: 'Tech',
      profileImage: 'https://picsum.photos/seed/asep/200/200.jpg',
      email: 'asep@company.com',
      phone: '081211112222',
      joinDate: '2023-01-15',
      cutiBalance: 12,
      performanceScore: 4.2,
      loginHistory: [
          { time: '2024-10-14 08:00', method: 'Face ID' },
          { time: '2024-10-13 08:05', method: 'Password' },
      ],
      currentMonthAttendance: [
          { id: 1001, date: '2024-10-13', time: '08:05', type: 'Clock In', status: 'Completed', location: 'Office Jln. Sudirman', isLate: false, isEarlyLeave: false },
          { id: 1002, date: '2024-10-13', time: '17:00', type: 'Clock Out', status: 'Completed', location: 'Office Jln. Sudirman', isLate: false, isEarlyLeave: false },
      ],
      attendancePhotos: [],
      salaryDetails: { basic: 8000000, allowance: 2000000, overtimeHours: 5, overtimeRate: 50000, bonus: 500000, deductions: 100000 },
  },
  manager: { id: 201, username: 'manager', password: 'password', role: 'manager', name: 'Sarah Manager', divisionon: 'HR & GA', cutiBalance: 15 },
  owner: { id: 301, username: 'owner', password: 'password', role: 'owner', name: 'Company Owner' },
  supervisor: { id: 401, username: 'supervisor', password: 'password', role: 'supervisor', name: 'Sari Supervisor', divisionon: 'Tech Support', cutiBalance: 14 }
};

// --- Employee Dummy Data (INITIAL_EMPLOYEES) ---
export const INITIAL_EMPLOYEES = [
    {
        id: 1,
        name: 'John Doe',
        divisionon: 'Tech',
        email: 'john@company.com',
        phone: '08123456789',
        status: 'Active',
        joinDate: '2023-01-15',
        cutiBalance: 12,
        role: 'employee',
        currentMonthAttendance: [
            { id: 101, date: '2024-10-14', time: '08:30', type: 'Clock In', status: 'Completed', location: 'Office Jln. Mawar', isLate: true, isEarlyLeave: false },
            { id: 102, date: '2024-10-13', time: '08:00', type: 'Clock In', status: 'Completed', location: 'Office Jln. Mawar', isLate: false, isEarlyLeave: false },
            { id: 103, date: '2024-10-13', time: '16:45', type: 'Clock Out', status: 'Completed', location: 'Office Jln. Mawar', isLate: false, isEarlyLeave: true },
        ],
        attendancePhotos: [],
        salaryDetails: { basic: 8000000, allowance: 2000000, overtimeHours: 5, overtimeRate: 50000, bonus: 500000, deductions: 100000 },
        performanceScore: 4.2,
        managerId: 201,
        supervisorId: 401,
    },
    {
        id: 2,
        name: 'Jane Smith',
        divisionon: 'Marketing',
        email: 'jane@company.com',
        phone: '081300004444',
        status: 'Active',
        joinDate: '2024-03-20',
        cutiBalance: 10,
        role: 'employee',
        currentMonthAttendance: [
            { id: 201, date: '2024-10-14', time: '07:55', type: 'Clock In', status: 'Completed', location: 'Office Jln. Mawar', isLate: false, isEarlyLeave: false },
        ],
        attendancePhotos: [],
        salaryDetails: { basic: 6500000, allowance: 1500000, overtimeHours: 0, overtimeRate: 40000, bonus: 200000, deductions: 50000 },
        performanceScore: 4.8,
        managerId: 201,
        supervisorId: 401,
    },
    {
        id: 3,
        name: 'Mark Benson',
        divisionon: 'Tech',
        email: 'mark@company.com',
        phone: '081255556666',
        status: 'Active',
        joinDate: '2022-09-01',
        cutiBalance: 15,
        role: 'employee',
        currentMonthAttendance: [],
        attendancePhotos: [],
        salaryDetails: { basic: 9500000, allowance: 2500000, overtimeHours: 10, overtimeRate: 60000, bonus: 800000, deductions: 150000 },
        performanceScore: 4.0,
        managerId: 201,
        supervisorId: 401,
    }
];

// --- Manager Dummy Data (INITIAL_MANAGERS) ---
export const INITIAL_MANAGERS = [
    {
        id: 201,
        name: 'Sarah Manager',
        divisionon: 'HR & GA',
        email: 'manager@company.com',
        phone: '081111112222',
        status: 'Active',
        joinDate: '2021-05-10',
        cutiBalance: 15,
        role: 'manager',
    },
];

// --- Pending Leave Dummy Data (INITIAL_PENDING_LEAVE) ---
export const INITIAL_PENDING_LEAVE = [
    {
        id: 101,
        employeeId: 1,
        employeeName: 'John Doe',
        employeeDivisionon: 'Tech',
        type: 'Sick Leave',
        title: 'Fever',
        startDate: '2024-08-05',
        endDate: '2024-08-05',
        days: 1,
        reason: 'High fever, unable to come to office.',
        status: 'Pending',
        medicalCertificate: null
    },
];

// --- Manager Salary Report Dummy Data (DUMMY_MANAGER_REPORTS) ---
export const DUMMY_MANAGER_REPORTS = [
    { id: 1, name: 'Bambang Sudarsono', role: 'Manager', salary: 15000000, deductions: 1200000, net: 13800000, status: 'Completed' },
    { id: 2, name: 'Siti Nurhaliza', role: 'Staff Marketing', salary: 7500000, deductions: 500000, net: 7000000, status: 'Pending' },
    { id: 3, name: 'Joko Widodo', role: 'Staff IT Support', salary: 8200000, deductions: 650000, net: 7550000, status: 'Completed' },
];

// --- Dummy Data for Supervisor Task Approval ---
export const INITIAL_PENDING_TASKS = [
    {
        id: 1,
        employeeId: 101,
        employeeName: 'Asep Suryana',
        divisionon: 'Tech',
        taskTitle: 'API Geolocation Integration',
        description: 'Complete the API Geolocation integration into DataService.',
        submittedAt: '2024-10-10',
        status: 'Pending',
        type: 'Submission',
        attachment: { name: 'geolocation_report.pdf' }
    },
    {
        id: 2,
        employeeId: 102,
        employeeName: 'Siti Nurhaliza',
        divisionon: 'Marketing',
        taskTitle: 'Q3 Campaign Report',
        description: 'Final review of Q3 digital campaign metric data.',
        submittedAt: '2024-10-11',
        status: 'Pending',
        type: 'Review',
        attachment: { name: 'campaign_q3.xlsx' }
    },
];

// --- Dummy Data for Supervisor Attendance Approval ---
export const INITIAL_PENDING_ATTENDANCE = [
    {
        id: 1,
        employeeId: 101,
        employeeName: 'Asep Suryana',
        divisionon: 'Tech',
        requestType: 'Missed Clock-Out',
        requestedDate: '2024-10-09',
        reason: 'Forgot to clock-out due to emergency meeting outside office until late night.',
        status: 'Pending',
        correctionData: { type: 'Clock Out', time: '17:30', location: 'Manual Correction' }
    },
    {
        id: 2,
        employeeId: 103,
        employeeName: 'Ahmad Budi',
        divisionon: 'Finance',
        requestType: 'Location Mismatch',
        requestedDate: '2024-10-12',
        reason: 'Office GPS server error, location detected 100 meters from office.',
        status: 'Pending',
        correctionData: { type: 'Clock In', time: '07:55', location: 'HQ Office (Correction)' }
    },
];
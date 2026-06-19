// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { 
    DUMMY_AUTH, 
    INITIAL_EMPLOYEES, 
    INITIAL_MANAGERS, 
    INITIAL_PENDING_LEAVE,
} from '../utils/constants'; 
import { showSwal } from '../utils/swal';

// Helper function for lazy state initialization
// Retrieves data from localStorage or uses initial data (INITIAL_...)
const getInitialState = (key, initialData) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialData;
};

export const useAuth = () => {
    const [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem('authUser'))
    );
    const [isLoading, setIsLoading] = useState(false);
    
    // Using lazy initializer function for data initialization
    const [employees, setEmployees] = useState(() => getInitialState('employees', INITIAL_EMPLOYEES));
    const [managers, setManagers] = useState(() => getInitialState('managers', INITIAL_MANAGERS));
    const [pendingLeave, setPendingLeave] = useState(() => getInitialState('pendingLeave', INITIAL_PENDING_LEAVE));
    
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    // Sync state to localStorage
    useEffect(() => {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        localStorage.setItem('employees', JSON.stringify(employees));
        localStorage.setItem('managers', JSON.stringify(managers));
        localStorage.setItem('pendingLeave', JSON.stringify(pendingLeave));
    }, [authUser, employees, managers, pendingLeave]);

    // Dynamic login handler
    const handleLogin = (username, password) => {
        setIsLoading(true);

        setTimeout(() => {
            let foundUser = null;

            // Loop through all roles to find the user
            for (const key in DUMMY_AUTH) {
                const user = DUMMY_AUTH[key];
                if (user.username === username && user.password === password) {
                    // Find full employee/manager data from main state
                    if (user.role === 'employee') {
                        foundUser = employees.find(e => e.id === user.id) || user;
                    } else if (user.role === 'manager') {
                        foundUser = managers.find(m => m.id === user.id) || user;
                    } else {
                        // Owner/Supervisor: Use data from DUMMY_AUTH
                        foundUser = user;
                    }
                    
                    // Add login history record
                    const loginRecord = { time: new Date().toISOString(), method: 'Username/Password' };
                    const currentHistory = foundUser.loginHistory || [];
                    foundUser.loginHistory = [loginRecord, ...currentHistory.slice(0, 4)]; 
                    
                    // Update employee/manager in main state
                    if (user.role === 'employee') {
                        setEmployees(prev => prev.map(e => e.id === foundUser.id ? foundUser : e));
                    } else if (user.role === 'manager') {
                        setManagers(prev => prev.map(m => m.id === foundUser.id ? foundUser : m));
                    }

                    break;
                }
            }

            if (foundUser) {
                setAuthUser(foundUser);
                showSwal('Login Successful!', `Welcome, ${foundUser.name} (${foundUser.role.toUpperCase()})!`, 'success', 2000);
            } else {
                showSwal('Login Failed', 'Incorrect username or password.', 'error');
            }

            setIsLoading(false);
        }, 1000);
    };

    const handleLogout = () => {
        localStorage.removeItem('authUser');
        setAuthUser(null);
        setIsLogoutModalOpen(false);
        showSwal('Logout Successful', 'You have been successfully logged out.', 'success', 1500);
    };

    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    };

    return {
        authUser,
        setAuthUser,
        isLoading,
        employees,
        setEmployees,
        managers,
        setManagers,
        pendingLeave,
        setPendingLeave,
        isLogoutModalOpen,
        setIsLogoutModalOpen,
        handleLogin,
        handleLogout,
        handleLogoutClick,
    };
};
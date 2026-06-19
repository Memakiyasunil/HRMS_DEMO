// src/components/Shared/Header.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'motion/react';
import { COLORS } from '../../utils/constants';

const Header = ({ user, handleLogoutClick }) => {
    useEffect(() => {
        AOS.init({
            duration: 400,
            once: true
        });
    }, []);

    if (!user) {
        return (
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                <div className="container mx-auto px-3 sm:px-4" data-aos="fade-down">
                    <header className="bg-white/90 backdrop-blur-2xl border-b border-l border-r border-slate-200/60 rounded-bl-3xl rounded-br-3xl px-6 sm:px-8 py-4 shadow-sm">
                        <div className="flex items-center">
                            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full p-3 mr-4 border border-slate-200/60">
                                <i className="fas fa-building text-blue-500 text-xl"></i>
                            </div>
                            <h1 className="text-xl font-bold text-slate-800 tracking-tight">HRMS System</h1>
                        </div>
                    </header>
                </div>
            </motion.div>
        );
    }

    const roleText = user?.role?.toUpperCase() || "UNKNOWN";

    return (
        <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md"
        >
            <div className="container mx-auto px-3 sm:px-4" data-aos="fade-down">
                <header className="bg-white/95 backdrop-blur-2xl border-b border-l border-r border-slate-200/60 rounded-bl-3xl rounded-br-3xl px-6 sm:px-8 py-4 transition-all duration-300 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                                HRMS
                            </h1>
                            <motion.span 
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className={`text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 border border-blue-200/60 mt-2 sm:mt-0 transition-all duration-200`}
                            >
                                {roleText}
                            </motion.span>
                        </div>

                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="hidden sm:flex items-center space-x-3">
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-slate-700">{user?.name || 'Guest'}</p>
                                    <p className="text-xs text-slate-500 capitalize">
                                        {user?.role === 'employee'
                                            ? (user?.divisionon || 'Employee')
                                            : user?.role === 'manager'
                                            ? 'Manager'
                                            : user?.role === 'owner'
                                            ? 'Owner'
                                            : user?.role === 'supervisor'
                                            ? 'Supervisor'
                                            : 'User'}
                                    </p>
                                </div>
                                <div className="relative">
                                    <img
                                        src={user?.profileImage || 'https://picsum.photos/seed/employee/40/40.jpg'}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-200/60"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                                </div>
                            </div>

                            <div className="sm:hidden relative">
                                <img
                                    src={user?.profileImage || 'https://picsum.photos/seed/employee/36/36.jpg'}
                                    alt="Profile"
                                    className="w-9 h-9 rounded-full object-cover border-2 border-blue-200/60"
                                />
                                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleLogoutClick}
                                className="flex items-center bg-red-500 text-white text-sm font-medium py-2.5 px-4 rounded-full 
                                       hover:bg-red-600 transition-all duration-200 focus:outline-none focus:ring-0 active:outline-none shadow-sm hover:shadow-md"
                                title="Logout"
                            >
                                <i className="fas fa-sign-out-alt mr-2"></i>
                                <span className="hidden sm:inline">Logout</span>
                            </motion.button>
                        </div>
                    </div>
                </header>
            </div>
        </motion.div>
    );
};

export default Header;
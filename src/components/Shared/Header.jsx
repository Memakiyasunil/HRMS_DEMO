// src/components/Shared/Header.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
            <div className="fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto px-3 sm:px-4" data-aos="fade-down">
                    <header className="bg-slate-800/50 backdrop-blur-2xl border-b border-l border-r border-indigo-500/10 rounded-bl-3xl rounded-br-3xl px-6 sm:px-8 py-4">
                        <div className="flex items-center">
                            <div className="bg-gradient-to-br from-indigo-500/20 to-violet-600/20 backdrop-blur-xl rounded-full p-3 mr-4 border border-indigo-500/20">
                                <i className="fas fa-building text-indigo-400 text-xl"></i>
                            </div>
                            <h1 className="text-xl font-bold text-slate-100 tracking-tight">HRMS System</h1>
                        </div>
                    </header>
                </div>
            </div>
        );
    }

    const roleText = user?.role?.toUpperCase() || "UNKNOWN";

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]">
            <div className="container mx-auto px-3 sm:px-4" data-aos="fade-down">
                <header className="bg-slate-800/50 backdrop-blur-2xl border-b border-l border-r border-indigo-500/10 rounded-bl-3xl rounded-br-3xl px-6 sm:px-8 py-4 transition-all duration-300">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                            <h1 className="text-xl font-bold text-slate-100 tracking-tight">
                                HRMS
                            </h1>
                            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/30 to-violet-600/30 backdrop-blur-xl text-indigo-300 border border-indigo-500/20 mt-2 sm:mt-0 transition-all duration-200`}>
                                {roleText}
                            </span>
                        </div>

                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="hidden sm:flex items-center space-x-3">
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-slate-200">{user?.name || 'Guest'}</p>
                                    <p className="text-xs text-slate-400 capitalize">
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
                                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/30"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-800"></div>
                                </div>
                            </div>

                            <div className="sm:hidden relative">
                                <img
                                    src={user?.profileImage || 'https://picsum.photos/seed/employee/36/36.jpg'}
                                    alt="Profile"
                                    className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500/30"
                                />
                                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-800"></div>
                            </div>

                            <button
                                onClick={handleLogoutClick}
                                className="flex items-center bg-red-500/80 text-white text-sm font-medium py-2.5 px-4 rounded-full 
                                       hover:bg-red-600 transition-all duration-200 focus:outline-none focus:ring-0 active:outline-none"
                                title="Logout"
                            >
                                <i className="fas fa-sign-out-alt mr-2"></i>
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
};

export default Header;
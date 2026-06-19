// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PrimaryButton2 } from '../components/UI/Buttons';

const LoginPage = ({ handleLogin, isLoading }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('password');
    const [showPassword, setShowPassword] = useState(false);
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const isPasswordValid = password.length >= 8;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            console.error("Password must be at least 8 characters.");
            return;
        }
        handleLogin(username, password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="p-8 rounded-[30px] border border-slate-200 bg-white shadow-lg shadow-slate-200/50 w-full max-w-sm text-center"
            >
                {/* Logo Section */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-col items-center mb-8"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user mb-4">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    
                    <h1 className="text-2xl font-bold text-slate-800">HRMS</h1>
                    <p className="text-slate-500 text-sm mt-1">Human Resource Management System</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username Field */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                    >
                        <div className="relative">
                            <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"></i>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setIsUsernameFocused(true)}
                                onBlur={() => setIsUsernameFocused(false)}
                                required
                                className={`
                                    w-full pl-10 pr-4 py-3 border rounded-2xl 
                                    bg-slate-50 shadow-sm 
                                    placeholder-slate-400 text-slate-700 focus:outline-none 
                                    transition-all duration-200
                                    ${!isUsernameFocused ? 'border-slate-200' : ''} 
                                    ${isUsernameFocused ? 'border-blue-500 ring-2 ring-blue-500/20' : ''}
                                `}
                            />
                        </div>
                    </motion.div>

                    {/* Password Field */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                    >
                        <div className="relative">
                            <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"></i>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                                required
                                className={`
                                    w-full pl-10 pr-12 py-3 border rounded-2xl 
                                    bg-slate-50 shadow-sm 
                                    placeholder-slate-400 text-slate-700 focus:outline-none 
                                    transition-all duration-200
                                    ${!isPasswordFocused ? 'border-slate-200' : ''}
                                    ${isPasswordFocused && !isPasswordValid ? 'border-red-500 ring-2 ring-red-500/20' : ''}
                                    ${isPasswordFocused && isPasswordValid ? 'border-emerald-500 ring-2 ring-emerald-500/20' : ''}
                                `}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-600 transition-colors duration-200 bg-transparent focus:outline-none border-none"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        {isPasswordFocused && password.length > 0 && (
                            <motion.p 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className={`mt-1 text-xs text-left ${isPasswordValid ? 'text-emerald-500' : 'text-red-500'}`}
                            >
                                {isPasswordValid ? '' : `Minimum 8 characters. ${8 - password.length} more needed.`}
                            </motion.p>
                        )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                    >
                        <PrimaryButton2 type="submit" className="w-full mt-6" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin mr-2"></i> Processing...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-sign-in-alt mr-2"></i> Sign In
                                </>
                            )}
                        </PrimaryButton2>
                    </motion.div>
                </form>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-200"
                >
                    <p className="text-xs text-slate-500 font-medium mb-2">Try logging in as:</p>
                    <div className="space-y-1 text-xs text-left">
                        <p className="text-slate-600">
                            <span className="font-medium">Employee:</span> <code className="bg-white px-2 py-1 rounded text-blue-600 border border-slate-200">employee/password</code>
                        </p>
                        <p className="text-slate-600">
                            <span className="font-medium">Manager:</span> <code className="bg-white px-2 py-1 rounded text-blue-600 border border-slate-200">manager/password</code>
                        </p>
                        <p className="text-slate-600">
                            <span className="font-medium">Supervisor:</span> <code className="bg-white px-2 py-1 rounded text-blue-600 border border-slate-200">supervisor/password</code>
                        </p>
                        <p className="text-slate-600">
                            <span className="font-medium">Owner:</span> <code className="bg-white px-2 py-1 rounded text-blue-600 border border-slate-200">owner/password</code>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
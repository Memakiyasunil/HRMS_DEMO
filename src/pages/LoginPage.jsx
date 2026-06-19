// src/pages/LoginPage.jsx
import React, { useState } from 'react';
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
        <div className="flex items-center justify-center min-h-screen bg-[#0F172A] p-4">
            <div className="p-8 rounded-[30px] border border-indigo-500/20 bg-slate-800/60 backdrop-blur-md shadow-xl w-full max-w-sm text-center transform transition-all duration-500">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user mb-4">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    
                    <h1 className="text-2xl font-bold text-slate-100">HRMS</h1>
                    <p className="text-slate-400 text-sm mt-1">Human Resource Management System</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username Field */}
                    <div>
                        <div className="relative">
                            <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
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
                                    bg-slate-700/50 backdrop-blur-sm shadow-sm 
                                    placeholder-slate-400 text-slate-100 focus:outline-none 
                                    ${!isUsernameFocused ? 'border-slate-600/50' : ''} 
                                    ${isUsernameFocused ? 'border-indigo-500' : ''}
                                `}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="relative">
                            <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
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
                                    bg-slate-700/50 backdrop-blur-sm shadow-sm 
                                    placeholder-slate-400 text-slate-100 focus:outline-none 
                                    ${!isPasswordFocused ? 'border-slate-600/50' : ''}
                                    ${isPasswordFocused && !isPasswordValid ? 'border-red-500' : ''}
                                    ${isPasswordFocused && isPasswordValid ? 'border-emerald-500' : ''}
                                `}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors duration-200 bg-transparent focus:outline-none border-none"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        {isPasswordFocused && password.length > 0 && (
                            <p className={`mt-1 text-xs text-left ${isPasswordValid ? 'text-emerald-400' : 'text-red-400'}`}>
                                {isPasswordValid ? '' : `Minimum 8 characters. ${8 - password.length} more needed.`}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
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
                </form>

                <div className="mt-8 p-4 bg-slate-700/30 backdrop-blur-sm rounded-2xl border border-slate-600/30">
                    <p className="text-xs text-slate-400 font-medium mb-2">Try logging in as:</p>
                    <div className="space-y-1 text-xs text-left">
                        <p className="text-slate-300">
                            <span className="font-medium">Employee:</span> <code className="bg-slate-700/50 px-2 py-1 rounded text-indigo-300">employee/password</code>
                        </p>
                        <p className="text-slate-300">
                            <span className="font-medium">Manager:</span> <code className="bg-slate-700/50 px-2 py-1 rounded text-indigo-300">manager/password</code>
                        </p>
                        <p className="text-slate-300">
                            <span className="font-medium">Supervisor:</span> <code className="bg-slate-700/50 px-2 py-1 rounded text-indigo-300">supervisor/password</code>
                        </p>
                        <p className="text-slate-300">
                            <span className="font-medium">Owner:</span> <code className="bg-slate-700/50 px-2 py-1 rounded text-indigo-300">owner/password</code>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

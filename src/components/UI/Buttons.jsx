// src/components/UI/Buttons.jsx
import React from 'react';

// --- Primary Button Component ---
export const PrimaryButton = ({ onClick, children, className = '', type = 'button', disabled = false }) => (
    <button 
        onClick={onClick} 
        type={type}
        disabled={disabled}
        className={`${className} bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-lg smooth-transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
    >
        {children}
    </button>
);

export const PrimaryButton2 = ({ onClick, children, className = '', type = 'button', disabled = false }) => (
    <button 
        onClick={onClick} 
        type={type}
        disabled={disabled}
        className={`${className} bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-lg smooth-transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
    >
        {children}
    </button>
);

// --- Tab Button Component ---
export const TabButton = ({ isActive, onClick, children }) => (
    <button
        onClick={onClick}
        className={`${isActive ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600'} px-5 py-3 font-medium text-sm md:text-base smooth-transition rounded-lg focus:outline-none`}
    >
        {children}
    </button>
);

// NOTE: GlassCard, StatCard, and Cell are NOT in this file.
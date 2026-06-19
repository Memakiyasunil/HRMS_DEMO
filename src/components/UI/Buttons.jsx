// src/components/UI/Buttons.jsx
import React from 'react';
import { motion } from 'motion/react';

// --- Primary Button Component ---
export const PrimaryButton = ({ onClick, children, className = '', type = 'button', disabled = false }) => (
    <motion.button
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        onClick={onClick} 
        type={type}
        disabled={disabled}
        className={`${className} bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-lg smooth-transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
    >
        {children}
    </motion.button>
);

export const PrimaryButton2 = ({ onClick, children, className = '', type = 'button', disabled = false }) => (
    <motion.button
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        onClick={onClick} 
        type={type}
        disabled={disabled}
        className={`${className} bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-lg smooth-transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
    >
        {children}
    </motion.button>
);

// --- Tab Button Component ---
export const TabButton = ({ isActive, onClick, children }) => (
    <motion.button
        whileHover={!isActive ? { scale: 1.02 } : {}}
        whileTap={!isActive ? { scale: 0.98 } : {}}
        onClick={onClick}
        className={`${isActive ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'} px-5 py-3 font-medium text-sm md:text-base smooth-transition rounded-lg focus:outline-none`}
    >
        {children}
    </motion.button>
);

// NOTE: GlassCard, StatCard, and Cell are NOT in this file.
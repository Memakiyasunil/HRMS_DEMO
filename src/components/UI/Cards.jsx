// src/components/UI/Cards.jsx
import React from 'react';
import { COLORS } from '../../utils/constants';
import { formattedCurrency } from '../../utils/formatters';

// --- GlassCard Component ---
export const GlassCard = ({ children, className = '' }) => (
  <div className={`${className} p-6 glass-card rounded-xl smooth-transition`}>
    {children}
  </div>
);

// --- StatCard Component ---
export const StatCard = ({ title, value, icon, color = 'blue' }) => (
  <GlassCard className={`p-4`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-3xl font-bold text-slate-800">
          {typeof value === 'number' ? formattedCurrency(value) : value}
        </p>
        <p className="text-sm font-medium text-slate-500 mt-1">{title}</p>
      </div>

      {/* Icon Container */}
      <div
        className={`p-3 rounded-full ${
          COLORS[color.charAt(0).toUpperCase() + color.slice(1)]
            ? `bg-${color}-100 text-${color}-600`
            : 'bg-slate-100 text-slate-500'
        }`}
      >
        <i className={`${icon} text-xl`}></i>
      </div>
    </div>
  </GlassCard>
);

// NOTE:
// - This file only has GlassCard and StatCard.
// - PrimaryButton, TabButton, and Cell are NOT in this file.
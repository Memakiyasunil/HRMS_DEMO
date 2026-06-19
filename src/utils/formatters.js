// src/utils/formatters.js

/**
 * Format a number as Indonesian Rupiah currency
 */
export const formattedCurrency = (amount) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

/**
 * Format a number as Rupiah (alternate version)
 */
export const formatRupiah = (number) => {
    if (number === undefined || number === null) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

/**
 * Calculate Net Salary
 */
export const calculateTotalSalary = (details) => {
    if (!details) return 0;
    const grossSalary = details.basic + details.allowance + (details.overtimeHours * details.overtimeRate) + details.bonus;
    return grossSalary - details.deductions;
};
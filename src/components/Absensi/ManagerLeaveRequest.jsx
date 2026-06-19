// src/components/Manager/ManagerLeaveRequest.jsx
import React, { useState } from 'react';
import { GlassCard } from '../UI/Cards'; 
import { PrimaryButton, TabButton } from '../UI/Buttons';
import { showSwal } from '../../utils/swal';

const ManagerLeaveRequest = ({ user, setPendingLeave }) => {
    const [activeLeaveTab, setActiveLeaveTab] = useState('request');
    const [leaveType, setLeaveType] = useState('Annual Leave');
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [medicalCertificate, setMedicalCertificate] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    // Sample leave history data for manager
    const [leaveHistory, setLeaveHistory] = useState([
        {
            id: 1,
            title: 'Rapat Direksi',
            type: 'Annual Leave',
            startDate: '2024-01-15',
            endDate: '2024-01-16',
            days: 2,
            reason: 'Menghadiri rapat direksi di kantor pusat',
            status: 'Approved',
            approvedBy: 'Owner'
        },
        {
            id: 2,
            title: 'Sick Leave',
            type: 'Sick Leave',
            startDate: '2024-02-10',
            endDate: '2024-02-10',
            days: 1,
            reason: 'Medical checkup rutin',
            status: 'Approved',
            approvedBy: 'Owner'
        },
        {
            id: 3,
            title: 'Training Leadership',
            type: 'Annual Leave',
            startDate: '2024-03-20',
            endDate: '2024-03-22',
            days: 3,
            reason: 'Mengikuti training leadership development',
            status: 'Pending',
            approvedBy: 'Pending Owner'
        }
    ]);

    const calculateDays = (start, end) => {
        if (!start || !end) return 0;
        const startDay = new Date(start);
        const endDay = new Date(end);
        
        if (startDay > endDay) return 0;

        let totalDays = 0;
        let currentDate = new Date(startDay);

        while (currentDate <= endDay) {
            // Skip weekends (optional)
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0 = Sunday, 6 = Saturday
                totalDays++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return totalDays;
    };

    const daysRequested = calculateDays(startDate, endDate);
    const pendingRequests = leaveHistory.filter(leave => leave.status === 'Pending').length;

    const handleFileChange = (e) => {
        setMedicalCertificate(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validasi untuk izin sakit
        if (leaveType === 'Sick Leave' && !medicalCertificate) {
            showSwal('Failed', 'Untuk Sick Leave, surat dokter wajib diunggah.', 'error');
            setIsSubmitting(false);
            return;
        }

        // Validasi cuti tahunan
        if (leaveType === 'Annual Leave' && daysRequested > user.cutiBalance) {
             showSwal('Failed', `Jatah cuti Anda tersisa ${user.cutiBalance} hari. Tidak cukup untuk ${daysRequested} hari.`, 'error');
             setIsSubmitting(false);
             return;
        }

        const newRequestId = Date.now();

        const newRequest = {
            id: newRequestId,
            employeeId: user.id,
            employeeName: user.name,
            employeeRole: 'manager', // Menandakan ini dari manager
            title: title,
            type: leaveType,
            startDate: startDate,
            endDate: endDate,
            days: daysRequested,
            reason: reason,
            status: 'Pending',
            medicalCertificate: medicalCertificate ? { 
                name: medicalCertificate.name, 
                type: medicalCertificate.type 
            } : null,
            requestedAt: new Date().toISOString().split('T')[0],
            divisionon: user.divisionon,
            approvalLevel: 'owner', // Langsung ke Owner
            approvedBy: 'Pending Owner'
        };

        // Add to pending leave (global state)
        setPendingLeave(prev => [...prev, newRequest]);
        
        // Add to local history
        setLeaveHistory(prev => [newRequest, ...prev]);
        
        // Reset form
        setTitle('');
        setStartDate('');
        setEndDate('');
        setReason('');
        setMedicalCertificate(null);
        setIsSubmitting(false);

        showSwal(
            'Pengajuan Terkirim!',
            `Permintaan ${leaveType} (${daysRequested} hari) telah dikirim untuk perapprovean Owner.`,
            'success'
        );
    };

    // Filter leave history based on search
    const filteredLeaveHistory = leaveHistory.filter(leave => 
        leave.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        leave.reason.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        leave.type.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const getStatusBadge = (status, approvedBy) => {
        const baseClasses = "px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full";
        
        if (status === 'Approved') {
            return (
                <span className={`${baseClasses} bg-green-100 text-green-800`}>
                    <i className="fas fa-check mr-1"></i> Diapprovei oleh {approvedBy}
                </span>
            );
        } else if (status === 'Rejected') {
            return (
                <span className={`${baseClasses} bg-red-100 text-red-800`}>
                    <i className="fas fa-times mr-1"></i> Direject
                </span>
            );
        } else {
            return (
                <span className={`${baseClasses} bg-amber-100 text-amber-800`}>
                    <i className="fas fa-clock mr-1"></i> Pending Owner
                </span>
            );
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center">
                    <i className="fas fa-calendar-alt mr-3 text-[#6366F1]"></i> Leave Request & Izin Manager
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1">
                    <span className="text-sm font-medium text-blue-700">
                        <i className="fas fa-crown mr-1"></i> Perapprovean oleh Owner
                    </span>
                </div>
            </div>

            {/* Leave Balance Info */}
            <div className="mb-6 p-4 bg-slate-900 border border-slate-200 rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="text-center flex-1">
                        <p className="text-xs text-slate-500 font-medium mb-1">Sisa Annual Leave</p>
                        <p className="text-2xl font-bold text-[#6366F1]">{user.cutiBalance || 18} <span className="text-sm font-normal text-slate-600">hari</span></p>
                    </div>
                    <div className="h-8 border-r border-gray-300"></div>
                    <div className="text-center flex-1">
                        <p className="text-xs text-slate-500 font-medium mb-1">Pending Permintaan</p>
                        <p className="text-2xl font-bold text-amber-600">{pendingRequests} <span className="text-sm font-normal text-slate-600">pengajuan</span></p>
                    </div>
                    <div className="h-8 border-r border-gray-300"></div>
                    <div className="text-center flex-1">
                        <p className="text-xs text-slate-500 font-medium mb-1">Level Perapprovean</p>
                        <p className="text-lg font-bold text-purple-600">Owner</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6">
                <TabButton
                    active={activeLeaveTab === 'request'}
                    onClick={() => setActiveLeaveTab('request')}
                    className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                        activeLeaveTab === 'request' 
                            ? 'border-[#6366F1] text-[#6366F1]' 
                            : 'border-transparent text-slate-500 hover:text-slate-700 border-none focus:outline-none'
                    }`}
                >
                    Ajukan Cuti/Izin
                </TabButton>
                <TabButton
                    active={activeLeaveTab === 'history'}
                    onClick={() => setActiveLeaveTab('history')}
                    className={`px-4 py-2 font-medium text-sm border-b-2${
                        activeLeaveTab === 'history' 
                            ? 'border-[#6366F1] text-[#6366F1]' 
                            : 'border-transparent text-slate-500 hover:text-slate-700 border-none focus:outline-none'
                    }`}
                >
                    History Cuti
                </TabButton>
            </div>

            {/* Request Form */}
            {activeLeaveTab === 'request' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Approval Notice */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center">
                            <i className="fas fa-info-circle text-blue-500 mr-3 text-lg"></i>
                            <div>
                                <p className="font-medium text-blue-800">Perapprovean oleh Owner</p>
                                <p className="text-sm text-blue-600 mt-1">
                                    Pengajuan cuti/izin Anda sebagai Manager akan diapprovei langsung oleh Owner.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="leaveType" className="block text-sm font-medium text-slate-700 mb-2">
                                Tipe Pengajuan
                            </label>
                            <select
                                id="leaveType"
                                value={leaveType}
                                onChange={(e) => {
                                    setLeaveType(e.target.value);
                                    setMedicalCertificate(null);
                                }}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 bg-white text-black"
                                required
                            >
                                <option value="Annual Leave">Annual Leave</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Izin Pribadi">Izin Pribadi (Keperluan Mendesak)</option>
                                <option value="Cuti Khusus">Cuti Khusus</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                                Judul Pengajuan
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 bg-white text-black"
                                placeholder="Contoh: Rapat Direksi, Training, Sick Leave, dll."
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-2">
                                Date Mulai
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 bg-white text-black"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-2">
                                Date Berakhir
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                min={startDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 bg-white text-black"
                                required
                            />
                        </div>
                    </div>

                    {/* Days Calculation */}
                    <div className="p-3 bg-slate-900 border border-slate-200 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Total Hari Diminta:</span>
                            <span className="font-bold text-[#6366F1] text-lg">{daysRequested} hari</span>
                        </div>
                        {leaveType === 'Annual Leave' && (
                            <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200">
                                <span className="text-sm text-slate-600">Sisa setelah pengajuan:</span>
                                <span className={`font-bold text-lg ${
                                    user.cutiBalance - daysRequested >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {user.cutiBalance - daysRequested} hari
                                </span>
                            </div>
                        )}
                    </div>
                    
                    {/* Reason */}
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-2">
                            Reason Pengajuan
                        </label>
                        <textarea
                            id="reason"
                            rows="3"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 bg-white text-black"
                            placeholder="Jelaskan reason pengajuan cuti/izin secara detail..."
                            required
                        ></textarea>
                    </div>

                    {/* Medical Certificate (for sick leave) */}
                    {leaveType === 'Sick Leave' && (
                        <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                            <label htmlFor="medicalCertificate" className="block text-sm font-bold text-amber-800 mb-2">
                                <i className="fas fa-file-medical mr-2"></i> Surat Dokter (Wajib)
                            </label>
                            <input
                                type="file"
                                id="medicalCertificate"
                                onChange={handleFileChange}
                                accept=".pdf, .jpg, .png"
                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-[#5a727a]"
                                required={leaveType === 'Sick Leave'}
                            />
                            {medicalCertificate && (
                                <p className="mt-2 text-xs text-amber-700">
                                    <i className="fas fa-check-circle mr-1"></i>
                                    File terselect: {medicalCertificate.name}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full mt-6 bg-indigo-600 hover:bg-[#5a727a] text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting || !startDate || !endDate || !reason || !title || daysRequested === 0}
                    >
                        {isSubmitting ? (
                            <>
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                Mengirim ke Owner...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-paper-plane mr-2"></i>
                                Kirim ke Owner untuk Perapprovean
                            </>
                        )}
                    </button>
                </form>
            )}

            {/* Leave History */}
            {activeLeaveTab === 'history' && (
                <div>
                    {/* Search Box */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search history cuti (berdasarkan judul/reason/jenis)..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 bg-white text-black focus:outline-none"
                        />
                    </div>

                    {/* Leave History Table */}
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-slate-900">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Judul
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Tipe
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Periode
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Hari
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Status & Diapprovei Oleh
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredLeaveHistory.map((leave) => (
                                    <tr key={leave.id} className="hover:bg-slate-900 transition-colors">
                                        <td className="px-4 py-4">
                                            <div>
                                                <p className="text-sm font-medium text-slate-800">{leave.title}</p>
                                                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{leave.reason}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className="text-sm text-slate-700">{leave.type}</span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {leave.startDate} <br className="md:hidden" />
                                            s/d {leave.endDate}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {leave.days} hari
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                                            {getStatusBadge(leave.status, leave.approvedBy)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredLeaveHistory.length === 0 && (
                        <div className="text-center py-8">
                            <i className="fas fa-inbox text-gray-300 text-4xl mb-3"></i>
                            <p className="text-slate-500">
                                {searchKeyword ? 'No history cuti yang sesuai dengan pensearchan.' : 'Belum ada history cuti.'}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ManagerLeaveRequest;
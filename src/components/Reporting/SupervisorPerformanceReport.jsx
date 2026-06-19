// src/components/Reporting/SupervisorPerformanceReport.jsx
import React, { useState, useMemo } from 'react';
import { GlassCard } from '../UI/Cards.jsx';
import { PrimaryButton } from '../UI/Buttons.jsx';
import { showSwal } from '../../utils/swal.js';

// --- D4. Report Performance Employee Supervisor ---
const SupervisorPerformanceReport = ({ employees = [], setEmployees = () => {} }) => {
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [performanceScore, setPerformanceScore] = useState(0);
    const [notes, setNotes] = useState('');

    // Data dummy untuk employee
    const dummyEmployees = useMemo(() => [
        {
            id: 'emp1',
            name: 'Ahmad Rizki',
            divisionon: 'Development Team',
            position: 'Senior Developer',
            performanceScore: 85,
            performanceNotes: 'Employee dengan performance sangat baik dalam pengembangan fitur baru.',
            lastReviewedAt: '2024-01-15',
            status: 'Active',
            avatar: '👨‍💻'
        },
        {
            id: 'emp2',
            name: 'Sari Dewi',
            divisionon: 'Design Team',
            position: 'UI/UX Designer',
            performanceScore: 78,
            performanceNotes: 'Desain yang kreatif namun perlu improvement pada ketepatan time.',
            lastReviewedAt: '2024-01-10',
            status: 'Active',
            avatar: '👩‍🎨'
        },
        {
            id: 'emp3',
            name: 'Budi Santoso',
            divisionon: 'Development Team',
            position: 'Frontend Developer',
            performanceScore: 92,
            performanceNotes: 'Sangat produktif dan memiliki problem solving skill yang excellent.',
            lastReviewedAt: '2024-01-18',
            status: 'Active',
            avatar: '👨‍💼'
        },
        {
            id: 'emp4',
            name: 'Maya Sari',
            divisionon: 'QA Team',
            position: 'Quality Assurance',
            performanceScore: 70,
            performanceNotes: 'Perlu peningkatan dalam detail testing dan reporting.',
            lastReviewedAt: '2024-01-08',
            status: 'Active',
            avatar: '👩‍🔬'
        },
        {
            id: 'emp5',
            name: 'Rizki Pratama',
            divisionon: 'Development Team',
            position: 'Backend Developer',
            performanceScore: 88,
            performanceNotes: 'Kode yang clean dan maintainable, komunikasi team baik.',
            lastReviewedAt: '2024-01-20',
            status: 'Active',
            avatar: '👨‍🔧'
        }
    ], []);

    // Gunakan employees props jika ada, jika tidak gunakan dummy
    const safeEmployees = employees.length > 0 ? employees : dummyEmployees;

    const selectedEmployee = useMemo(() => 
        safeEmployees.find(emp => emp.id === selectedEmployeeId) || safeEmployees[0]
    , [safeEmployees, selectedEmployeeId]);

    // Update state form saat employee yang diselect berubah
    React.useEffect(() => {
        if (selectedEmployee) {
            setSelectedEmployeeId(selectedEmployee.id);
            setPerformanceScore(selectedEmployee.performanceScore || 0);
            setNotes(selectedEmployee.performanceNotes || '');
        }
    }, [selectedEmployee]);

    // Handler untuk menyimpan penilaian
    const handleSavePerformance = () => {
        if (!selectedEmployee) {
            showSwal('Failed', 'Select employee terlebih dahulu.', 'error');
            return;
        }

        const score = parseInt(performanceScore);
        if (isNaN(score) || score < 0 || score > 100) {
            showSwal('Error', 'Nilai performance harus antara 0 sampai 100.', 'error');
            return;
        }

        // Update employees
        const updatedEmployees = safeEmployees.map(emp => {
            if (emp.id === selectedEmployee.id) {
                return {
                    ...emp,
                    performanceScore: score,
                    performanceNotes: notes,
                    lastReviewedBy: 'Supervisor',
                    lastReviewedAt: new Date().toISOString().split('T')[0]
                };
            }
            return emp;
        });

        setEmployees(updatedEmployees);

        showSwal(
            'Sukses!', 
            `Penilaian performance untuk **${selectedEmployee.name}** (${score} poin) successfully disave.`, 
            'success'
        );
    };

    // Warna utama #6366F1 dengan variasi
    const primaryColor = '#6366F1';
    const primaryLight = '#8fa3ab';
    const primaryDark = '#5a717a';
    const primaryBg = 'rgba(112, 137, 147, 0.1)';
    const primaryBorder = 'rgba(112, 137, 147, 0.3)';

    // Function for mendapatkan warna berdasarkan score
    const getScoreColor = (score) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 80) return 'text-blue-600';
        if (score >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBgColor = (score) => {
        if (score >= 90) return 'bg-green-100';
        if (score >= 80) return 'bg-blue-100';
        if (score >= 70) return 'bg-yellow-100';
        return 'bg-red-100';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-slate-50/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/30 shadow-[0_4px_16px_0_rgba(31,38,135,0.1)]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="bg-gray-100 p-3 rounded-xl mr-4" style={{ backgroundColor: primaryBg }}>
                            <i className="fas fa-chart-line text-lg" style={{ color: primaryColor }}></i>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 text-left">Penilaian Performance Employee</h2>
                            <p className="text-slate-600 mt-1">Kelola dan berikan penilaian performance untuk anggota tim Anda</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-slate-600">Total Anggota Tim</div>
                        <div className="text-2xl font-bold" style={{ color: primaryColor }}>{safeEmployees.length}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Kolom Kiri: Daftar Employee dengan warna #6366F1 */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-50/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/30 shadow-[0_4px_16px_0_rgba(31,38,135,0.1)]">
                        <h3 className="text-lg font-bold text-black mb-4 flex items-center">
                            <i className="fas fa-users mr-2"></i>
                            Daftar Tim
                        </h3>
                        
                        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                            {safeEmployees.map(emp => (
                                <button
                                    key={emp.id}
                                    onClick={() => setSelectedEmployeeId(emp.id)}
                                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 focus:outline-none ${
                                        selectedEmployeeId === emp.id 
                                            ? 'shadow-lg transform scale-[1.02] bg-white bg-opacity-20' 
                                            : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                                    }`}
                                    style={{ 
                                        backgroundColor: selectedEmployeeId === emp.id ? 
                                            'rgba(112, 137, 147, 0.8)' : 
                                            'rgba(112, 137, 147, 0.6)'
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-2xl">{emp.avatar}</div>
                                            <div>
                                                <p className="font-semibold text-sm text-white">{emp.name}</p>
                                                <p className="text-xs text-white text-opacity-80">{emp.position}</p>
                                            </div>
                                        </div>
                                        <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                                            selectedEmployeeId === emp.id ? 'bg-white bg-opacity-20 text-white' : 'bg-white bg-opacity-20 text-white'
                                        }`}>
                                            {emp.performanceScore}
                                        </div>
                                    </div>
                                    <div className="text-xs mt-2 text-white text-opacity-90">
                                        {emp.divisionon}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Kolom Kanan: Form Penilaian dengan input putih */}
                <div className="lg:col-span-3">
                    <div className="bg-slate-50/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/30 shadow-[0_4px_16px_0_rgba(31,38,135,0.1)]">
                        {selectedEmployee ? (
                            <div className="space-y-6">
                                {/* Employee Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-4xl">{selectedEmployee.avatar}</div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-800">{selectedEmployee.name}</h3>
                                            <p className="text-slate-600">{selectedEmployee.position} • {selectedEmployee.divisionon}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-slate-600">Status</div>
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                            {selectedEmployee.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Performance Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white rounded-xl p-4 border border-slate-200 text-center shadow-sm">
                                        <div className="text-2xl font-bold mb-1" style={{ color: primaryColor }}>
                                            {selectedEmployee.performanceScore || 0}
                                        </div>
                                        <p className="text-sm text-slate-600">Skor Saat Ini</p>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 border border-slate-200 text-center shadow-sm">
                                        <div className="text-2xl font-bold mb-1 text-blue-600">
                                            {Math.round((selectedEmployee.performanceScore || 0) / 10)}
                                        </div>
                                        <p className="text-sm text-slate-600">Rating (1-10)</p>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 border border-slate-200 text-center shadow-sm">
                                        <div className="text-2xl font-bold mb-1 text-green-600">
                                            {selectedEmployee.lastReviewedAt ? '✓' : '—'}
                                        </div>
                                        <p className="text-sm text-slate-600">Terakhir Dinilai</p>
                                    </div>
                                </div>

                                {/* Performance Score Input - PUTIH */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
                                            <i className="fas fa-star mr-2" style={{ color: primaryColor }}></i>
                                            Nilai Performance (0-100)
                                        </label>
                                        <div className="flex items-center space-x-4">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={performanceScore}
                                                onChange={(e) => setPerformanceScore(e.target.value)}
                                                className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                style={{
                                                    background: `linear-gradient(to right, ${primaryColor} 0%, ${primaryColor} ${performanceScore}%, #e5e7eb ${performanceScore}%, #e5e7eb 100%)`
                                                }}
                                            />
                                            <div className="w-20 text-center bg-white border border-gray-300 rounded-lg p-2 shadow-sm">
                                                <span className="text-2xl font-bold text-slate-800">
                                                    {performanceScore}
                                                </span>
                                                <span className="text-sm text-slate-500">/100</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                                            <span>Perlu Improvement</span>
                                            <span>Excellent</span>
                                        </div>
                                    </div>

                                    {/* Score Indicators */}
                                    <div className="flex justify-between text-xs">
                                        <span className={`px-2 py-1 rounded ${performanceScore >= 90 ? 'bg-green-100 text-green-800 font-bold' : 'text-slate-500'}`}>Excellent (90-100)</span>
                                        <span className={`px-2 py-1 rounded ${performanceScore >= 80 && performanceScore < 90 ? 'bg-blue-100 text-blue-800 font-bold' : 'text-slate-500'}`}>Good (80-89)</span>
                                        <span className={`px-2 py-1 rounded ${performanceScore >= 70 && performanceScore < 80 ? 'bg-yellow-100 text-yellow-800 font-bold' : 'text-slate-500'}`}>Average (70-79)</span>
                                        <span className={`px-2 py-1 rounded ${performanceScore < 70 ? 'bg-red-100 text-red-800 font-bold' : 'text-slate-500'}`}>Needs Improvement</span>
                                    </div>

                                    {/* Notes - INPUT PUTIH */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
                                            <i className="fas fa-edit mr-2" style={{ color: primaryColor }}></i>
                                            Notes & Feedback
                                        </label>
                                        <textarea
                                            rows="6"
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-white text-slate-800 shadow-sm"
                                            placeholder="Berikan feedback konstruktif tentang performance employee. Fokus pada achievement, area improvement, dan saran untuk pengembangan..."
                                        />
                                        <p className="text-xs text-slate-500 mt-2">
                                            Notes sebelumnya: {selectedEmployee.performanceNotes || 'No notes'}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-end space-x-4 pt-4">
                                        <button
                                            onClick={() => {
                                                setPerformanceScore(selectedEmployee.performanceScore || 0);
                                                setNotes(selectedEmployee.performanceNotes || '');
                                            }}
                                            className="px-6 py-3 bg-slate-9000 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center shadow-sm"
                                        >
                                            <i className="fas fa-undo mr-2"></i> Reset
                                        </button>
                                        <button
                                            onClick={handleSavePerformance}
                                            className="px-6 py-3 text-white rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-xl"
                                            style={{ backgroundColor: primaryColor }}
                                        >
                                            <i className="fas fa-save mr-2"></i> Save Penilaian
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: primaryBg }}>
                                    <i className="fas fa-user text-2xl" style={{ color: primaryColor }}></i>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Select Employee</h3>
                                <p className="text-slate-600">Silakan select employee dari daftar di sebelah kiri untuk mulai memberikan penilaian.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupervisorPerformanceReport;
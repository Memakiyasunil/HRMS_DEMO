// src/components/Approvals/ManagerProfileApproval.jsx
import React from 'react';
import { showSwal } from '../../utils/swal';

// Glass Card component with iOS 26 liquid glass design
const GlassCard = ({ children, className = '' }) => (
    <div className={`backdrop-blur-2xl bg-white/50 border border-[#6366F1]/20 rounded-3xl shadow-sm ${className}`}>
        {children}
    </div>
);

// Modern button with rounded design
const ActionButton = ({ onClick, children, variant = 'primary', disabled = false, ...props }) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-200";
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95",
        secondary: "bg-white/40 text-[#6366F1] border border-[#6366F1]/30 hover:bg-slate-50/60",
        success: "bg-emerald-500/90 text-white hover:bg-emerald-600 active:scale-95",
        danger: "bg-red-500/90 text-white hover:bg-red-600 active:scale-95",
        ghost: "bg-transparent text-[#6366F1] hover:bg-white/40"
    };
    
    const disabledClasses = "opacity-50 cursor-not-allowed";
    
    return (
        <button 
            onClick={onClick} 
            disabled={disabled}
            className={`${baseClasses} ${variants[variant]} ${disabled ? disabledClasses : ''}`} 
            {...props}
        >
            {children}
        </button>
    );
};

// Change type badge with consistent styling
const ChangeTypeBadge = ({ type }) => {
    const typeConfig = {
        'profile': { color: 'bg-blue-100 text-blue-700', icon: 'fa-user' },
        'document': { color: 'bg-purple-100 text-purple-700', icon: 'fa-file' },
        'contact': { color: 'bg-green-100 text-green-700', icon: 'fa-phone' },
        'personal': { color: 'bg-orange-100 text-orange-700', icon: 'fa-id-card' }
    };
    
    const config = typeConfig[type] || { color: 'bg-gray-100 text-slate-700', icon: 'fa-edit' };
    
    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
            <i className={`fas ${config.icon}`}></i>
            {type}
        </span>
    );
};

// Change item component for individual changes
const ChangeItem = ({ field, oldValue, newValue, type = 'text' }) => {
    const getFieldIcon = (fieldName) => {
        const icons = {
            name: 'fa-user',
            email: 'fa-envelope',
            phone: 'fa-phone',
            address: 'fa-map-marker-alt',
            divisionon: 'fa-briefcase',
            profileImage: 'fa-camera',
            cvFile: 'fa-file-pdf',
            diplomaFile: 'fa-file-certificate'
        };
        return icons[field] || 'fa-edit';
    };

    const formatValue = (value) => {
        if (!value || value === 'N/A') return <span className="text-gray-400">Tidak diisi</span>;
        if (type === 'file') return <span className="text-blue-600 font-medium">File baru diupload</span>;
        return value;
    };

    return (
        <div className="flex items-start gap-3 p-3 bg-white/40 rounded-2xl">
            <div className="bg-indigo-600/10 p-2 rounded-2xl">
                <i className={`fas ${getFieldIcon(field)} text-[#6366F1] text-sm`}></i>
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium text-slate-700 capitalize">
                    {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="text-red-500 line-through">{formatValue(oldValue)}</span>
                    <i className="fas fa-arrow-right text-gray-400 text-xs"></i>
                    <span className="text-emerald-600 font-medium">{formatValue(newValue)}</span>
                </div>
            </div>
        </div>
    );
};

// Profile change request card component
const ProfileChangeCard = ({ request, employee, onApprove, onReject }) => {
    const getChangeType = (changes) => {
        if (changes.profileImage) return 'profile';
        if (changes.cvFile || changes.diplomaFile) return 'document';
        if (changes.phone || changes.email) return 'contact';
        return 'personal';
    };

    const changeType = getChangeType(request.requestedChanges);
    const changeCount = Object.keys(request.requestedChanges).length;

    return (
        <GlassCard className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Section - Change Details */}
                <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-semibold text-slate-800">{request.employeeName}</h3>
                                <ChangeTypeBadge type={changeType} />
                            </div>
                            <p className="text-sm text-slate-600">
                                {changeCount} perubahan • Diajukan {request.requestedAt}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-500">Division</p>
                            <p className="text-sm font-medium text-[#6366F1]">{employee?.divisionon || 'N/A'}</p>
                        </div>
                    </div>

                    {/* Changes List */}
                    <div className="space-y-2">
                        {Object.entries(request.requestedChanges).map(([field, newValue]) => {
                            const oldValue = employee?.[field] || 'N/A';
                            const isFile = field.includes('File') || field === 'profileImage';
                            
                            return (
                                <ChangeItem
                                    key={field}
                                    field={field}
                                    oldValue={oldValue}
                                    newValue={newValue}
                                    type={isFile ? 'file' : 'text'}
                                />
                            );
                        })}
                    </div>
                </div>
                {/* Right Section - Action Buttons */}
                <div className="flex lg:flex-col gap-3 lg:w-40 text-slate-700">
                    <ActionButton 
                        onClick={() => onApprove(request)}
                        variant="success"
                        className="lg:w-full justify-center"
                    >
                        <i className="fas fa-check-circle text-green-600 mr-2"></i>
                        Approvei
                    </ActionButton>
                    <ActionButton 
                        onClick={() => onReject(request.id, request.employeeName)}
                        variant="danger"
                        className="lg:w-full justify-center"
                    >
                        <i className="fas fa-times-circle text-red-500 mr-2"></i>
                        Reject
                    </ActionButton>
                </div>
            </div>
        </GlassCard>
    );
};

// Stats Card Component
const StatsCard = ({ value, label, color = '[#6366F1]', icon }) => (
    <GlassCard className="p-4 flex items-center gap-4">
        <div className={`bg-${color}/10 p-3 rounded-2xl`}>
            <i className={`fas ${icon} text-${color} text-lg`}></i>
        </div>
        <div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-sm text-slate-600">{label}</p>
        </div>
    </GlassCard>
);

// Empty state component
const EmptyState = () => (
    <div className="text-center py-16">
        <div className="bg-indigo-600/10 p-8 rounded-3xl inline-block mb-6">
            <i className="fas fa-check-circle text-4xl text-[#6366F1]"></i>
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-3">Tidak Ada Perubahan Profile</h3>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
            All permintaan perubahan profile telah diproses. No perubahan yang pending perapprovean.
        </p>
    </div>
);

// --- B3. Perapprovean Perubahan Profile ---
const ManagerProfileApproval = ({ employees, setEmployees, pendingProfileChanges, setPendingProfileChanges, setAuthUser }) => {
    
    // Handler untuk menyetujui (Approve) perubahan profile
    const handleApprove = (request) => {
        // 1. Terapkan perubahan ke data employee
        const updatedEmployees = employees.map(emp => {
            if (emp.id === request.employeeId) {
                // Terapkan all perubahan
                const updated = { ...emp, ...request.requestedChanges };

                // Khusus file: Save metadata file (simulasi)
                if (request.requestedChanges.cvFile) updated.cvFile = request.requestedChanges.cvFile;
                if (request.requestedChanges.diplomaFile) updated.diplomaFile = request.requestedChanges.diplomaFile;
                
                return updated;
            }
            return emp;
        });

        // 2. Update state global
        setEmployees(updatedEmployees);
        
        // 3. Jika yang diupdate adalah user yang sedang login, update authUser juga
        if (request.employeeId === employees.find(e => e.role === 'manager')?.id) {
             const updatedManager = updatedEmployees.find(e => e.id === request.employeeId);
             setAuthUser(updatedManager);
        }

        // 4. Delete dari daftar pending
        const updatedPending = pendingProfileChanges.filter(p => p.id !== request.id);
        setPendingProfileChanges(updatedPending);

        showSwal('Diapprovei!', `Perubahan profile ${request.employeeName} telah diapprovei dan diterapkan.`, 'success');
    };

    // Handler untuk menolak (Reject) perubahan profile
    const handleReject = (requestId, employeeName) => {
        const updatedPending = pendingProfileChanges.filter(p => p.id !== requestId);
        setPendingProfileChanges(updatedPending);

        showSwal('Direject!', `Permintaan perubahan profile ${employeeName} telah direject.`, 'error');
    };

    // Calculate statistics
    const pendingCount = pendingProfileChanges.length;
    const profileChanges = pendingProfileChanges.filter(req => 
        req.requestedChanges.profileImage
    ).length;
    const documentChanges = pendingProfileChanges.filter(req => 
        req.requestedChanges.cvFile || req.requestedChanges.diplomaFile
    ).length;
    const contactChanges = pendingProfileChanges.filter(req => 
        req.requestedChanges.phone || req.requestedChanges.email
    ).length;

    return (
        <div className="p-6 min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#eef2f6] rounded-xl">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-indigo-600 p-3 rounded-2xl">
                        <i className="fas fa-user-check text-white text-xl"></i>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 text-left">Perapprovean Perubahan Profile</h2>
                        <p className="text-slate-600 text-sm text-left">Kelola permintaan perubahan data employee</p>
                    </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <StatsCard 
                        value={pendingCount}
                        label="Total Pending"
                        color="[#6366F1]"
                        icon="fa-clock"
                    />
                    <StatsCard 
                        value={profileChanges}
                        label="Foto Profile"
                        color="blue"
                        icon="fa-camera"
                    />
                    <StatsCard 
                        value={documentChanges}
                        label="Dokumen"
                        color="purple"
                        icon="fa-file"
                    />
                    <StatsCard 
                        value={contactChanges}
                        label="Kontak"
                        color="green"
                        icon="fa-phone"
                    />
                </div>
            </div>

            {/* Main Content */}
            <GlassCard className="p-6">
                {pendingProfileChanges.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="space-y-4 text-left">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">Permintaan Perubahan</h3>
                                <p className="text-slate-600 text-sm">{pendingCount} perubahan perlu ditinjau</p>
                            </div>
                            
                            {/* Bulk Actions */}
                            <div className="flex gap-2">
                                <ActionButton 
                                    onClick={() => {
                                        if (pendingProfileChanges.length === 0) return;
                                        pendingProfileChanges.forEach(request => handleApprove(request));
                                    }}
                                    variant="success"
                                >
                                    <i className="fas fa-check-circle"></i>
                                    Approvei All
                                </ActionButton>
                                <ActionButton 
                                    onClick={() => {
                                        if (pendingProfileChanges.length === 0) return;
                                        showSwal({
                                            title: 'Reject All?',
                                            text: `Anda akan menolak all ${pendingProfileChanges.length} permintaan perubahan.`,
                                            icon: 'warning',
                                            buttons: {
                                                cancel: "Cancel",
                                                confirm: {
                                                    text: "Ya, Reject All",
                                                    value: true,
                                                    className: "bg-red-500"
                                                }
                                            }
                                        }).then((willReject) => {
                                            if (willReject) {
                                                const updatedPending = [];
                                                setPendingProfileChanges(updatedPending);
                                                showSwal('Success!', 'All permintaan perubahan telah direject.', 'success');
                                            }
                                        });
                                    }}
                                    variant="danger"
                                >
                                    <i className="fas fa-times-circle"></i>
                                    Reject All
                                </ActionButton>
                            </div>
                        </div>
                        
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            {pendingProfileChanges.map(request => {
                                const employee = employees.find(e => e.id === request.employeeId) || {};
                                
                                return (
                                    <ProfileChangeCard
                                        key={request.id}
                                        request={request}
                                        employee={employee}
                                        onApprove={handleApprove}
                                        onReject={handleReject}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </GlassCard>
        </div>
    );
};

export default ManagerProfileApproval;
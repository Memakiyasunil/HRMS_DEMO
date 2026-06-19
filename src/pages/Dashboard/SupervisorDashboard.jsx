// src/pages/dashboard/SupervisorDashboard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import SupervisorSummary from '../../components/Summary/SupervisorSummary.jsx';
import SupervisorTaskApproval from '../../components/Approvals/SupervisorTaskApproval.jsx';
import SupervisorAttendanceApproval from '../../components/Approvals/SupervisorAttendanceApproval.jsx';
import SupervisorPerformanceReport from '../../components/Reporting/SupervisorPerformanceReport.jsx';
import SupervisorAttendance from '../../components/Absensi/SupervisorAttendance.jsx';
import SupervisorProfile from '../../components/Profiles/SupervisorProfile.jsx';

const SupervisorDashboard = (props) => {
  const {
    user,
    employees = [],
    setEmployees = () => {},
    workSettings,
    pendingProfileChanges = [],
    setPendingProfileChanges = () => {},
    setAuthUser = () => {},
    pendingTasks = [],
    setPendingTasks = () => {},
    pendingAttendance = [],
    setPendingAttendance = () => {}
  } = props;

  const [activeTab, setActiveTab] = useState('summary');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const safeWorkSettings = workSettings || {};

  const tabs = [
    { id: 'summary', label: 'Summary', icon: 'fa-chart-pie' },
    { id: 'taskApproval', label: 'Task Approval', icon: 'fa-tasks' },
    { id: 'attendanceApproval', label: 'Attendance Approval', icon: 'fa-user-check' },
    { id: 'performance', label: 'Team Performance', icon: 'fa-chart-line' },
    { id: 'attendance', label: 'My Attendance', icon: 'fa-clock' },
    { id: 'profile', label: 'Profile', icon: 'fa-user' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <SupervisorSummary 
            employees={employees} 
            pendingTasks={pendingTasks}
            pendingAttendance={pendingAttendance}
          />
        );
      case 'taskApproval':
        return (
          <SupervisorTaskApproval 
            employees={employees}
            setEmployees={setEmployees}
            pendingTasks={pendingTasks}
            setPendingTasks={setPendingTasks} 
          />
        );
      case 'attendanceApproval':
        return (
          <SupervisorAttendanceApproval 
            employees={employees}
            setEmployees={setEmployees}
            pendingAttendance={pendingAttendance}
            setPendingAttendance={setPendingAttendance}
          />
        );
      case 'performance':
        return (
          <SupervisorPerformanceReport 
            employees={employees}
            setEmployees={setEmployees} 
          />
        );
      case 'attendance':
        return (
          <SupervisorAttendance 
            user={user}
            employees={employees}
            setEmployees={setEmployees}
            workSettings={safeWorkSettings}
          />
        );
      case 'profile':
        return (
          <SupervisorProfile 
            user={user} 
            employees={employees} 
            setEmployees={setEmployees}
            setAuthUser={setAuthUser}
            pendingProfileChanges={pendingProfileChanges}
            setPendingProfileChanges={setPendingProfileChanges}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16 md:pt-22 lg:pt-22">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="md:hidden fixed top-20 left-4 z-50"
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200/60 hover:shadow-md transition-all duration-300"
        >
          <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'} text-slate-600`}></i>
        </button>
      </motion.div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/10 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-3 sm:px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`
              md:w-64 lg:w-64 transform transition-all duration-300 ease-in-out
              ${sidebarOpen 
                ? 'translate-x-0 opacity-100' 
                : '-translate-x-full opacity-0 md:translate-x-0 md:opacity-100 lg:translate-x-0 lg:opacity-100'
              }
              fixed md:static left-0 top-20 h-full md:h-auto z-40 w-64 md:w-auto
            `}
          >
            <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-sm border border-slate-200/60 p-4 md:sticky md:top-24 lg:sticky lg:top-24 h-full lg:h-auto overflow-y-auto">
              <div className="flex justify-between items-center mb-6 md:hidden">
                <h3 className="text-lg font-semibold text-slate-800">Menu</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-2xl hover:bg-slate-100 transition-all duration-200"
                >
                  <i className="fas fa-times text-slate-500"></i>
                </button>
              </div>

              <div className="flex items-center mb-6 p-3 bg-slate-50/80 rounded-2xl border border-slate-200/60 shadow-sm text-left">
                <div className="relative">
                  <img
                    src={user?.profileImage || 'https://picsum.photos/seed/supervisor/48/48.jpg'}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-200/60 shadow-sm"
                  />                
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-slate-700 truncate max-w-[120px]">{user?.name || 'Supervisor'}</p>
                  <p className="text-xs text-slate-500 capitalize">Supervisor</p>
                </div>
              </div>

              <div className="space-y-2">
                {tabs.map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 md:py-3 rounded-xl min-h-[44px] focus:outline-none transition-all duration-200 hover-lift ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <i className={`fas ${tab.icon} mr-3 text-sm ${activeTab === tab.id ? 'text-white' : 'text-slate-500'}`}></i>
                    <span className={`text-sm font-medium ${activeTab === tab.id ? 'text-white' : 'text-slate-700'}`}>{tab.label}</span>
                    {activeTab === tab.id && (
                      <i className="fas fa-chevron-right ml-auto text-xs text-white"></i>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
                  <div className="bg-emerald-50 rounded-2xl p-2 border border-slate-200/60 shadow-sm">
                    <i className="fas fa-users text-emerald-500 text-sm"></i>
                    <p className="text-xs text-slate-600 mt-1">Team: {employees.filter(e => e.role === 'employee').length}</p>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-2 border border-slate-200/60 shadow-sm">
                    <i className="fas fa-tasks text-blue-500 text-sm"></i>
                    <p className="text-xs text-slate-600 mt-1">Tasks: {pendingTasks?.length || 0}</p>
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-2 border border-slate-200/60 shadow-sm">
                    <i className="fas fa-user-check text-amber-500 text-sm"></i>
                    <p className="text-xs text-slate-600 mt-1">Attendance: {pendingAttendance?.length || 0}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-50/80 rounded-2xl border border-slate-200/60 shadow-sm">
                <p className="text-xs text-slate-500 text-center">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 md:ml-0"
          >
            <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-sm border border-slate-200/60 p-4 sm:p-6 min-h-[calc(100vh-6rem)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight text-left">
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1 text-left">
                    {activeTab === 'summary' && 'Team overview and quick statistics'}
                    {activeTab === 'taskApproval' && 'Review and approve team task submissions'}
                    {activeTab === 'attendanceApproval' && 'Approve team attendance and corrections'}
                    {activeTab === 'performance' && 'Monitor team performance and productivity'}
                    {activeTab === 'attendance' && 'Track your personal attendance records'}
                    {activeTab === 'profile' && 'Manage your supervisor profile information'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-indigo-50 rounded-2xl px-3 py-2 border border-slate-200/60 shadow-sm">
                    <span className="text-xs font-medium text-indigo-600">
                      PT. DOODLE INDONESIA
                    </span>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
// src/App.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth.js';
import Header from './components/Shared/Header.jsx';
import LogoutModal from './components/Shared/Modals/LogoutModal.jsx';
import LoginPage from './pages/LoginPage.jsx';
import EmployeeDashboard from './pages/Dashboard/EmployeeDashboard.jsx';
import ManagerDashboard from './pages/Dashboard/ManagerDashboard.jsx';
import OwnerDashboard from './pages/Dashboard/OwnerDashboard/OwnerDashboard.jsx';
import SupervisorDashboard from './pages/Dashboard/SupervisorDashboard.jsx';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const App = () => {
  const { 
    authUser, 
    isLoading, 
    employees, 
    setEmployees, 
    managers, 
    setManagers, 
    pendingLeave, 
    setPendingLeave, 
    isLogoutModalOpen, 
    setIsLogoutModalOpen, 
    handleLogin, 
    handleLogout, 
    handleLogoutClick,
    setAuthUser
  } = useAuth();

  const [workSettings, setWorkSettings] = useState(() => {
    const saved = localStorage.getItem("workSettings");
    return saved
      ? JSON.parse(saved)
      : { startTime: "08:00", endTime: "17:00", lateDeduction: 50000, earlyLeaveDeduction: 75000 };
  });

  const [pendingProfileChanges, setPendingProfileChanges] = useState(() => {
    const saved = localStorage.getItem("pendingProfileChanges");
    return saved ? JSON.parse(saved) : [];
  });

  const [pendingTasks, setPendingTasks] = useState(() => {
    const saved = localStorage.getItem("pendingTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [pendingAttendance, setPendingAttendance] = useState(() => {
    const saved = localStorage.getItem("pendingAttendance");
    return saved ? JSON.parse(saved) : [];
  });
    
  useEffect(() => {
    if (workSettings) {
      localStorage.setItem("workSettings", JSON.stringify(workSettings));
    }
  }, [workSettings]);
    
  useEffect(() => {
    localStorage.setItem("pendingProfileChanges", JSON.stringify(pendingProfileChanges));
  }, [pendingProfileChanges]);

  useEffect(() => {
    localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));
  }, [pendingTasks]);

  useEffect(() => {
    localStorage.setItem("pendingAttendance", JSON.stringify(pendingAttendance));
  }, [pendingAttendance]);


 return (
    <div className="min-h-screen bg-slate-50">
        {isLoading && (
            <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
                <div className="flex flex-col items-center justify-center"> 
                    <div className="h-48 w-48 mb-4 animate-scale-in">
                        <DotLottieReact
                            src="https://lottie.host/9581a0e7-e2e2-4ac9-afbd-7d4cface4c28/O3EfZ0vhqK.lottie"
                            loop
                            autoplay
                        />
                    </div>
                    
                    <p className="mt-2 text-lg font-bold text-blue-500 tracking-wider animate-pulse-soft">
                        LOADING...
                    </p>
                </div>
            </div>
        )}
      {!authUser ? (
        <LoginPage handleLogin={handleLogin} isLoading={isLoading} />
      ) : (
        <>
          <Header user={authUser} handleLogoutClick={handleLogoutClick} />
          <main className="pt-4 ">
            {authUser.role === "employee" && (
              <EmployeeDashboard
                user={authUser}
                employees={employees}
                setEmployees={setEmployees}
                pendingLeave={pendingLeave}
                workSettings={workSettings}
                setAuthUser={setAuthUser}
                pendingProfileChanges={pendingProfileChanges}
                setPendingProfileChanges={setPendingProfileChanges}
              />
            )}

            {authUser.role === "manager" && (
              <ManagerDashboard
                user={authUser}
                employees={employees}
                setEmployees={setEmployees}
                pendingLeave={pendingLeave}
                setPendingLeave={setPendingLeave}
                workSettings={workSettings}
                pendingProfileChanges={pendingProfileChanges}
                setPendingProfileChanges={setPendingProfileChanges}
              />
            )}

            {authUser.role === "owner" && (
              <OwnerDashboard
                user={authUser}
                managers={managers}
                setManagers={setManagers}
                employees={employees}
                setEmployees={setEmployees}
                workSettings={workSettings}
                setWorkSettings={setWorkSettings}
              />
            )}

            {authUser.role === "supervisor" && (
              <SupervisorDashboard
                user={authUser}
                employees={employees}
                setEmployees={setEmployees}
                workSettings={workSettings}
                pendingTasks={pendingTasks}
                setPendingTasks={setPendingTasks}
                pendingAttendance={pendingAttendance}
                setPendingAttendance={setPendingAttendance}
                pendingProfileChanges={pendingProfileChanges}
                setPendingProfileChanges={setPendingProfileChanges}
                setAuthUser={setAuthUser}
              />
            )}
          </main>
        </>
      )}

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default App;

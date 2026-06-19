// src/hooks/usePermission.js

export const hasPermission = (role, action) => {
    const permissions = {
        owner: [
            'approve_leave', 
            'view_team_leave',
            'approve_permission',
            'view_team_attendance',
            'manage_employees',
            'manage_managers',
            'manage_supervisors',
            'all'
        ],
        manager: [
            'approve_leave', 
            'view_team_leave',
            'approve_permission',
            'view_team_attendance',
            'manage_employees'
        ],
        supervisor: [
            'view_team_leave',
            'view_team_attendance',
            'approve_task'
        ],
        employee: []
    };

    const rolePerms = permissions[role] || [];
    return rolePerms.includes(action) || rolePerms.includes('all');
};

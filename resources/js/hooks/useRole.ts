import { usePage } from '@inertiajs/react';

export function useRole() {
    const { props } = usePage<any>();
    const user = props.auth?.user;
    const userRoles: string[] = user?.roles || [];
    const userPermissions: string[] = user?.permissions || [];

    /**
     * Check if user has a specific role or any of the roles in an array.
     * Returns true if user is super_admin.
     */
    const hasRole = (role: string | string[]) => {
        if (!user) return false;
        if (userRoles.includes('super_admin')) return true;

        if (Array.isArray(role)) {
            return role.some(r => userRoles.includes(r));
        }
        return userRoles.includes(role);
    };

    /**
     * Check if user has a specific permission or any of the permissions in an array.
     * Returns true if user is super_admin.
     */
    const hasPermission = (permission: string | string[]) => {
        if (!user) return false;
        if (userRoles.includes('super_admin')) return true;

        if (Array.isArray(permission)) {
            return permission.some(p => userPermissions.includes(p));
        }
        return userPermissions.includes(permission);
    };

    return { hasRole, hasPermission, user };
}

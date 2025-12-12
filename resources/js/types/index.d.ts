import { LucideIcon } from 'lucide-react';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    roles: string[];
    permissions: string[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User | null;
    };
};

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
    variant?: 'default' | 'ghost';
    items?: NavItem[]; // Added for nested menus
    target?: string;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

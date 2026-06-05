import { LucideIcon } from 'lucide-react';

export interface Tenant {
    id: number;
    full_name: string;
    email: string;
    company_name?: string;
    [key: string]: unknown;
}

export type AuthSubject = User | Tenant;

export interface Auth {
    user: User;
    tenant?: Tenant;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

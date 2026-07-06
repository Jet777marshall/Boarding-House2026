import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { 
    Home, 
    User, 
    Users, 
    Building2, 
    Calendar, 
    TrendingUp, 
    Wallet, 
    Bell,
    ChevronRight,
    Activity,
    Clock,
    CheckCircle,
    AlertCircle,
    FileText,
    Settings,
    HelpCircle,
    LogOut,
    Receipt,
    Mail
} from 'lucide-react';

// Import the CSS
import '../../css/dashboard.css';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const page = usePage<SharedData>();
    const user = page.props.auth?.user;
    const tenant = page.props.auth?.tenant;
    
    // Determine if user is a tenant (has tenant data) or admin
    const isTenantView = Boolean(tenant?.id);
    const greetingName = tenant?.full_name?.split(' ')[0] ?? user?.name ?? 'Guest';
    const totalBalance = tenant?.total_balance ?? 0;

    // Admin stats - only visible to admin users
    const adminStats = {
        totalTenants: 24,
        activeTenants: 18,
        pendingPayments: 3,
        totalRooms: 12,
        occupiedRooms: 9,
        vacancyRate: '25%',
        monthlyRevenue: 45600,
        pendingAmount: 12500,
    };

    // Recent activities - different for tenant vs admin
    const recentActivities = isTenantView 
        ? [
            { id: 1, action: 'Payment received', amount: '₱8,500', time: '2 days ago', type: 'payment' },
            { id: 2, action: 'Lease renewed', time: '1 week ago', type: 'renewal' },
            { id: 3, action: 'Maintenance request completed', time: '2 weeks ago', type: 'maintenance' },
        ]
        : [
            { id: 1, action: 'New tenant moved in', user: 'Maria Santos', time: '2 hours ago', type: 'move-in' },
            { id: 2, action: 'Payment received', user: 'John Doe', time: '5 hours ago', type: 'payment' },
            { id: 3, action: 'Maintenance request', user: 'Anna Reyes', time: '1 day ago', type: 'maintenance' },
            { id: 4, action: 'Lease renewed', user: 'James Rodriguez', time: '2 days ago', type: 'renewal' },
        ];

    // Quick actions - different for tenant vs admin
    const quickActions = isTenantView
        ? [
            { icon: Receipt, label: 'View Bills', href: '/billings', color: 'bg-blue-500' },
            { icon: Settings, label: 'My Account', href: '/settings', color: 'bg-amber-500' },
            { icon: HelpCircle, label: 'Request Help', href: '/support', color: 'bg-purple-500' },
            { icon: Mail, label: 'Contact Admin', href: '/contact', color: 'bg-emerald-500' },
        ]
        : [
            { icon: Users, label: 'Add Tenant', href: '/tenants/create', color: 'bg-emerald-500' },
            { icon: Wallet, label: 'Record Payment', href: '/payments/create', color: 'bg-blue-500' },
            { icon: Building2, label: 'Manage Rooms', href: '/rooms', color: 'bg-amber-500' },
            { icon: Bell, label: 'Send Notice', href: '/notices', color: 'bg-purple-500' },
        ];

    const getGreetingTime = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - The Dorm Hub" />

            <div className="dashboard-page">
                {/* Welcome Section */}
                <div className="dashboard-welcome">
                    <div className="dashboard-welcome-content">
                        <div className="dashboard-welcome-text">
                            <div className="dashboard-welcome-greeting">
                                <span className="dashboard-welcome-icon">👋</span>
                                <span className="dashboard-welcome-time">{getGreetingTime()}</span>
                            </div>
                            <h1 className="dashboard-welcome-title">
                                Welcome back, <span className="text-amber-600">{greetingName}</span>
                            </h1>
                            <p className="dashboard-welcome-subtitle">
                                {isTenantView 
                                    ? 'Here\'s an overview of your account and payment status' 
                                    : 'Here\'s what\'s happening with your boarding house today'}
                            </p>
                        </div>
                        <div className="dashboard-welcome-date">
                            <Calendar className="dashboard-welcome-calendar" />
                            <span>{new Date().toLocaleDateString('en-PH', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid - Different for Tenant vs Admin */}
                <div className="dashboard-stats">
                    {isTenantView ? (
                        // ═══════════════════════════════════════
                        // TENANT STATS - Only shows tenant's balance
                        // ═══════════════════════════════════════
                        <>
                            <div className="dashboard-stat-card dashboard-stat-balance">
                                <div className="dashboard-stat-icon dashboard-stat-icon-balance">
                                    <Wallet className="h-6 w-6" />
                                </div>
                                <div className="dashboard-stat-info">
                                    <p className="dashboard-stat-label">Total Balance</p>
                                    <p className="dashboard-stat-value">₱{totalBalance.toLocaleString()}</p>
                                    <p className="dashboard-stat-change text-emerald-600">Current balance</p>
                                </div>
                            </div>
                            <div className="dashboard-stat-card">
                                <div className="dashboard-stat-icon dashboard-stat-icon-payments">
                                    <CheckCircle className="h-6 w-6" />
                                </div>
                                <div className="dashboard-stat-info">
                                    <p className="dashboard-stat-label">Payments Made</p>
                                    <p className="dashboard-stat-value">12</p>
                                    <p className="dashboard-stat-change text-emerald-600">This month</p>
                                </div>
                            </div>
                            <div className="dashboard-stat-card">
                                <div className="dashboard-stat-icon dashboard-stat-icon-status">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <div className="dashboard-stat-info">
                                    <p className="dashboard-stat-label">Account Status</p>
                                    <p className="dashboard-stat-value text-emerald-600">Active</p>
                                    <p className="dashboard-stat-change text-emerald-600">In good standing</p>
                                </div>
                            </div>
                            <div className="dashboard-stat-card">
                                <div className="dashboard-stat-icon dashboard-stat-icon-tenant">
                                    <Building2 className="h-6 w-6" />
                                </div>
                                <div className="dashboard-stat-info">
                                    <p className="dashboard-stat-label">Room</p>
                                    <p className="dashboard-stat-value">#201</p>
                                    <p className="dashboard-stat-change text-stone-500">Standard Single</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        // ═══════════════════════════════════════
                        // ADMIN STATS - Shows overall boarding house data
                        // ═══════════════════════════════════════
                        <>
                            <div className="dashboard-stat-card">
                                <div className="dashboard-stat-icon dashboard-stat-icon-total">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div className="dashboard-stat-info">
                                    <p className="dashboard-stat-label">Total Tenants</p>
                                    <p className="dashboard-stat-value">{adminStats.totalTenants}</p>
                                    <p className="dashboard-stat-change text-emerald-600">↑ 12% from last month</p>
                                </div>
                            </div>
                            <div className="dashboard-stat-card">
                                <div className="dashboard-stat-icon dashboard-stat-icon-active">
                                    <User className="h-6 w-6" />
                                </div>
                                <div className="dashboard-stat-info">
                                    <p className="dashboard-stat-label">Active Tenants</p>
                                    <p className="dashboard-stat-value">{adminStats.activeTenants}</p>
                                    <p className="dashboard-stat-change text-emerald-600">{adminStats.activeTenants} currently active</p>
                                </div>
                            </div>
                            <div className="dashboard-stat-card">
                                <div className="dashboard-stat-icon dashboard-stat-icon-pending">
                                    <AlertCircle className="h-6 w-6" />
                                </div>
                                <div className="dashboard-stat-info">
                                    <p className="dashboard-stat-label">Pending Payments</p>
                                    <p className="dashboard-stat-value">{adminStats.pendingPayments}</p>
                                    <p className="dashboard-stat-change text-amber-600">₱{adminStats.pendingAmount.toLocaleString()} total</p>
                                </div>
                            </div>
                            <div className="dashboard-stat-card">
                                <div className="dashboard-stat-icon dashboard-stat-icon-revenue">
                                    <TrendingUp className="h-6 w-6" />
                                </div>
                                <div className="dashboard-stat-info">
                                    <p className="dashboard-stat-label">Monthly Revenue</p>
                                    <p className="dashboard-stat-value">₱{adminStats.monthlyRevenue.toLocaleString()}</p>
                                    <p className="dashboard-stat-change text-emerald-600">↑ 5% from last month</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Two Column Layout */}
                <div className="dashboard-grid">
                    {/* Recent Activity */}
                    <div className="dashboard-card dashboard-activity">
                        <div className="dashboard-card-header">
                            <h2 className="dashboard-card-title">
                                <Clock className="h-5 w-5" />
                                Recent Activity
                            </h2>
                            <button className="dashboard-card-action">
                                View all
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="dashboard-activity-list">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="dashboard-activity-item">
                                    <div className={`dashboard-activity-dot dashboard-activity-dot-${activity.type}`} />
                                    <div className="dashboard-activity-content">
                                        <p className="dashboard-activity-action">
                                            {activity.action}
                                            {activity.amount && (
                                                <span className="dashboard-activity-amount">{activity.amount}</span>
                                            )}
                                        </p>
                                        <p className="dashboard-activity-user">
                                            {activity.user || (isTenantView ? 'You' : '')}
                                        </p>
                                    </div>
                                    <span className="dashboard-activity-time">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="dashboard-card dashboard-actions">
                        <div className="dashboard-card-header">
                            <h2 className="dashboard-card-title">
                                <Zap className="h-5 w-5" />
                                Quick Actions
                            </h2>
                        </div>
                        <div className="dashboard-actions-grid">
                            {quickActions.map((action, index) => (
                                <a 
                                    key={index}
                                    href={action.href}
                                    className="dashboard-action-btn"
                                >
                                    <div className={`dashboard-action-icon ${action.color}`}>
                                        <action.icon className="h-5 w-5" />
                                    </div>
                                    <span className="dashboard-action-label">{action.label}</span>
                                </a>
                            ))}
                        </div>

                        {/* Tenant Info - Only shown for tenant view */}
                        {isTenantView && tenant && (
                            <div className="dashboard-tenant-info">
                                <div className="dashboard-tenant-info-header">
                                    <User className="h-5 w-5 text-amber-600" />
                                    <h3 className="dashboard-tenant-info-title">Your Details</h3>
                                </div>
                                <div className="dashboard-tenant-info-grid">
                                    <div className="dashboard-tenant-info-item">
                                        <span className="dashboard-tenant-info-label">Full Name</span>
                                        <span className="dashboard-tenant-info-value">{tenant.full_name}</span>
                                    </div>
                                    <div className="dashboard-tenant-info-item">
                                        <span className="dashboard-tenant-info-label">Email</span>
                                        <span className="dashboard-tenant-info-value">{tenant.email}</span>
                                    </div>
                                    <div className="dashboard-tenant-info-item">
                                        <span className="dashboard-tenant-info-label">Phone</span>
                                        <span className="dashboard-tenant-info-value">{tenant.personal_number || 'N/A'}</span>
                                    </div>
                                    <div className="dashboard-tenant-info-item">
                                        <span className="dashboard-tenant-info-label">Status</span>
                                        <span className="dashboard-tenant-info-value status-active">Active</span>
                                    </div>
                                    <div className="dashboard-tenant-info-item">
                                        <span className="dashboard-tenant-info-label">Room</span>
                                        <span className="dashboard-tenant-info-value">#201</span>
                                    </div>
                                    <div className="dashboard-tenant-info-item">
                                        <span className="dashboard-tenant-info-label">Balance</span>
                                        <span className="dashboard-tenant-info-value">₱{totalBalance.toLocaleString()}</span>
                                    </div>
                                </div>
                                
                                {/* Payment Instructions for Tenants */}
                                <div className="dashboard-payment-instructions">
                                    <div className="dashboard-payment-instructions-header">
                                        <Wallet className="h-4 w-4 text-amber-600" />
                                        <span className="dashboard-payment-instructions-title">How to Pay</span>
                                    </div>
                                    <div className="dashboard-payment-instructions-content">
                                        <p className="dashboard-payment-instructions-text">
                                            Please coordinate with the admin for your payment details.
                                            Contact the admin directly for bank account information or payment arrangements.
                                        </p>
                                        <div className="dashboard-payment-instructions-contact">
                                            <Mail className="h-3 w-3" />
                                            <span>admin@thedormhub.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Admin Quick Stats - Only shown for admin */}
                        {!isTenantView && (
                            <div className="dashboard-admin-quick-stats">
                                <div className="dashboard-admin-quick-stat">
                                    <span className="dashboard-admin-quick-stat-label">Total Rooms</span>
                                    <span className="dashboard-admin-quick-stat-value">{adminStats.totalRooms}</span>
                                </div>
                                <div className="dashboard-admin-quick-stat">
                                    <span className="dashboard-admin-quick-stat-label">Occupied</span>
                                    <span className="dashboard-admin-quick-stat-value">{adminStats.occupiedRooms}</span>
                                </div>
                                <div className="dashboard-admin-quick-stat">
                                    <span className="dashboard-admin-quick-stat-label">Vacancy</span>
                                    <span className="dashboard-admin-quick-stat-value">{adminStats.vacancyRate}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer: Show different info based on role */}
                <div className="dashboard-footer">
                    {isTenantView ? (
                        <div className="dashboard-footer-tenant">
                            <p className="dashboard-footer-text">
                                Need help? Contact the admin at <strong>admin@thedormhub.com</strong>
                            </p>
                            <p className="dashboard-footer-text text-sm text-stone-500">
                                © {new Date().getFullYear()} The Dorm Hub. All rights reserved.
                            </p>
                        </div>
                    ) : (
                        <div className="dashboard-footer-admin">
                            <p className="dashboard-footer-text">
                                <span className="font-semibold">The Dorm Hub</span> — Manage your boarding house efficiently
                            </p>
                            <p className="dashboard-footer-text text-sm text-stone-500">
                                © {new Date().getFullYear()} The Dorm Hub. All rights reserved.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

// Zap icon component
function Zap({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    );
}
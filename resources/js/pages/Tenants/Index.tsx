import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { 
    Edit2, 
    Trash2, 
    Megaphone, 
    Search, 
    UserPlus, 
    Users,
    Building2,
    Calendar,
    Mail,
    Phone,
    MapPin,
    User,
    ChevronDown,
    Filter,
    Download,
    MoreVertical
} from 'lucide-react';
import { useState } from 'react';
import '../../../css/tenants.css';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tenants',
        href: '/tenants',
    },
];

interface Tenant {
    id: number;
    user_id: number;
    full_name: string;
    company_name: string;
    emergency_contact_number: string;
    email: string;
    personal_number: string;
    address: string;
    birthdate: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    flash: { message?: string };
    tenants: Tenant[];
}

const formatDate = (dateString: string, includeTime: boolean = false) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    if (includeTime) {
        return date.toLocaleString('en-PH', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: true,
        });
    }
    return date.toLocaleDateString('en-PH', {
        month: 'short', day: 'numeric', year: 'numeric',
    });
};

const statusColor = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'active':   return { badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' };
        case 'inactive': return { badge: 'bg-amber-100 text-amber-700',     dot: 'bg-amber-500'   };
        default:         return { badge: 'bg-gray-100 text-gray-600',   dot: 'bg-gray-400'  };
    }
};

export default function Index() {
    const { flash, tenants } = usePage().props as PageProps;
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    const handleRemove = (id: number, full_name: string) => {
        if (confirm(`Are you sure you want to remove tenant ${full_name}?`)) {
            router.patch(route('tenants.removed', { tenant: id }));
        }
    };

    // Filter tenants
    const filteredTenants = tenants.filter(tenant => {
        const matchesSearch = tenant.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             tenant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             tenant.company_name?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || tenant.status?.toLowerCase() === statusFilter.toLowerCase();
        
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: tenants.length,
        active: tenants.filter(t => t.status?.toLowerCase() === 'active').length,
        inactive: tenants.filter(t => t.status?.toLowerCase() === 'inactive').length,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tenants - The Dorm Hub" />

            <div className="tenants-page">
                {/* Flash Message */}
                {flash.message && (
                    <Alert className="tenants-alert">
                        <Megaphone className="tenants-alert-icon" />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}

                {/* Header Section */}
                <div className="tenants-header">
                    <div className="tenants-header-left">
                        <div className="tenants-brand">
                            <div className="tenants-brand-icon">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="tenants-title">Tenant Management</h1>
                                <p className="tenants-subtitle">Manage all your boarding house tenants</p>
                            </div>
                        </div>
                    </div>
                    <div className="tenants-header-right">
                        <Button className="tenants-add-btn">
                            <UserPlus className="h-4 w-4" />
                            <Link href={route('tenants.create')} className="text-white hover:text-white">
                                Register Tenant
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="tenants-stats">
                    <div className="tenants-stat-card">
                        <div className="tenants-stat-icon tenants-stat-total">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="tenants-stat-label">Total Tenants</p>
                            <p className="tenants-stat-value">{stats.total}</p>
                        </div>
                    </div>
                    <div className="tenants-stat-card">
                        <div className="tenants-stat-icon tenants-stat-active">
                            <User className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="tenants-stat-label">Active</p>
                            <p className="tenants-stat-value text-emerald-600">{stats.active}</p>
                        </div>
                    </div>
                    <div className="tenants-stat-card">
                        <div className="tenants-stat-icon tenants-stat-inactive">
                            <User className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="tenants-stat-label">Inactive</p>
                            <p className="tenants-stat-value text-amber-600">{stats.inactive}</p>
                        </div>
                    </div>
                    <div className="tenants-stat-card">
                        <div className="tenants-stat-icon tenants-stat-building">
                            <Building2 className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="tenants-stat-label">Rooms Occupied</p>
                            <p className="tenants-stat-value">{stats.active}</p>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="tenants-toolbar">
                    <div className="tenants-search-wrapper">
                        <Search className="tenants-search-icon" />
                        <Input
                            type="text"
                            placeholder="Search tenants by name, email, or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="tenants-search-input"
                        />
                    </div>
                    <div className="tenants-toolbar-actions">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="tenants-filter-btn"
                        >
                            <Filter className="h-4 w-4" />
                            Filters
                            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                        <button className="tenants-export-btn">
                            <Download className="h-4 w-4" />
                            Export
                        </button>
                    </div>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="tenants-filters-panel">
                        <div className="tenants-filter-group">
                            <label className="tenants-filter-label">Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="tenants-filter-select"
                            >
                                <option value="all">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="tenants-filter-group">
                            <label className="tenants-filter-label">Sort By</label>
                            <select className="tenants-filter-select">
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="name">Name A-Z</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="tenants-table-wrapper">
                    <div className="tenants-table-container">
                        <table className="tenants-table">
                            <thead>
                                <tr>
                                    <th className="tenants-table-header">ID</th>
                                    <th className="tenants-table-header">Tenant</th>
                                    <th className="tenants-table-header">Contact</th>
                                    <th className="tenants-table-header">Company</th>
                                    <th className="tenants-table-header">Status</th>
                                    <th className="tenants-table-header">Joined</th>
                                    <th className="tenants-table-header text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTenants.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="tenants-empty-state">
                                            <div className="tenants-empty-content">
                                                <Users className="h-12 w-12 text-gray-300" />
                                                <p className="tenants-empty-text">No tenants found</p>
                                                <p className="tenants-empty-subtext">
                                                    {searchTerm ? 'Try adjusting your search or filters' : 'Start by registering your first tenant'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTenants.map((tenant) => {
                                        const colors = statusColor(tenant.status);
                                        return (
                                            <tr key={tenant.id} className="tenants-table-row">
                                                <td className="tenants-table-cell">
                                                    <span className="tenants-id-badge">#{tenant.id}</span>
                                                </td>
                                                <td className="tenants-table-cell">
                                                    <div className="tenants-tenant-info">
                                                        <div className="tenants-avatar">
                                                            {tenant.full_name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="tenants-tenant-name">{tenant.full_name}</p>
                                                            <p className="tenants-tenant-email">
                                                                <Mail className="h-3 w-3" />
                                                                {tenant.email || 'No email'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="tenants-table-cell">
                                                    <div className="tenants-contact-info">
                                                        <p className="tenants-phone">
                                                            <Phone className="h-3 w-3" />
                                                            {tenant.personal_number || '—'}
                                                        </p>
                                                        <p className="tenants-address">
                                                            <MapPin className="h-3 w-3" />
                                                            {tenant.address ? 
                                                                tenant.address.length > 30 ? 
                                                                    tenant.address.substring(0, 30) + '...' : 
                                                                    tenant.address 
                                                                : '—'}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="tenants-table-cell">
                                                    <div className="tenants-company">
                                                        <Building2 className="h-3 w-3" />
                                                        <span>{tenant.company_name || '—'}</span>
                                                    </div>
                                                </td>
                                                <td className="tenants-table-cell">
                                                    <span className={`tenants-status-badge ${colors.badge}`}>
                                                        <span className={`tenants-status-dot ${colors.dot}`} />
                                                        {tenant.status || 'Unknown'}
                                                    </span>
                                                </td>
                                                <td className="tenants-table-cell">
                                                    <div className="tenants-date">
                                                        <Calendar className="h-3 w-3" />
                                                        <span>{formatDate(tenant.created_at)}</span>
                                                    </div>
                                                </td>
                                                <td className="tenants-table-cell text-right">
                                                    <div className="tenants-actions">
                                                        <Link href={route('tenants.edit', tenant.id)}>
                                                            <Button 
                                                                size="sm" 
                                                                variant="outline" 
                                                                className="tenants-action-btn tenants-action-edit"
                                                            >
                                                                <Edit2 className="h-3.5 w-3.5" />
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            onClick={() => handleRemove(tenant.id, tenant.full_name)}
                                                            size="sm"
                                                            variant="destructive"
                                                            className="tenants-action-btn tenants-action-remove"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="tenants-table-footer">
                        <p className="tenants-table-footer-text">
                            Showing <span className="font-semibold">{filteredTenants.length}</span> of{' '}
                            <span className="font-semibold">{tenants.length}</span> tenants
                        </p>
                        <div className="tenants-table-footer-actions">
                            <Button variant="outline" size="sm" disabled>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm">
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
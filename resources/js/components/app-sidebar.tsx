import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    Users,
    FileText,
    NotebookPen,
    CreditCard,
    X,
} from 'lucide-react';
import AppLogo from './app-logo';
import { useEffect } from 'react';

// ────────────────────────────────────────────────────────────────
// Navigation Items Configuration
// ────────────────────────────────────────────────────────────────

const adminNavItems: NavItem[] = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutGrid },
    { title: 'Tenants', url: '/tenants', icon: Users },
    { title: 'Billings', url: '/billings', icon: FileText },
    { title: 'Balance Entry', url: '/balance_entries', icon: NotebookPen },
    { title: 'Payments', url: '/payments', icon: CreditCard },
];

const tenantNavItems: NavItem[] = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutGrid },
    { title: 'My Bills', url: '/billings', icon: FileText },
    { title: 'Payments', url: '/payments', icon: CreditCard },
];

// ────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────

export function AppSidebar() {
    const page = usePage<SharedData>();
    const tenant = page.props.auth?.tenant;

    // Pull real collapse/mobile state from the Sidebar's own context
    // instead of re-implementing it. This is what was missing —
    // the component had no idea what state the library was in.
    const { state, isMobile, openMobile, setOpenMobile } = useSidebar();
    const isCollapsed = state === 'collapsed';

    const isTenantView = Boolean(tenant?.id);
    const mainNavItems = isTenantView ? tenantNavItems : adminNavItems;

    // Close the mobile sheet automatically on route change
    useEffect(() => {
        if (isMobile) setOpenMobile(false);
    }, [page.url]);

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && openMobile && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setOpenMobile(false)}
                />
            )}

            <Sidebar
                collapsible="icon"
                variant="inset"
                className="
                    bg-[#f7efe8] border-r border-stone-200/50
                    flex flex-col
                "
            >
                {/* ── Sidebar Header ── */}
                <SidebarHeader
                    className="
                        p-3 pb-2 border-b border-stone-200/50
                        flex flex-col items-center gap-1
                        bg-gradient-to-br from-amber-50 to-[#f7efe8]
                        relative
                    "
                >
                    {isMobile && (
                        <button
                            className="absolute top-2 right-2 p-1 rounded-lg hover:bg-amber-100 transition-colors z-10"
                            onClick={() => setOpenMobile(false)}
                        >
                            <X className="h-5 w-5 text-stone-600" />
                        </button>
                    )}

                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                asChild
                                className="
                                    p-1 px-2 rounded-xl transition-all duration-300
                                    w-full justify-start flex items-center
                                    h-auto min-h-[56px]
                                    hover:bg-amber-100/50
                                "
                            >
                                <Link href="/dashboard" prefetch>
                                    <AppLogo />
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>

                    {/* User Role Badge — shrinks to a dot in icon mode */}
                    <div
                        className="
                            flex items-center justify-center gap-1.5
                            mx-2 mt-1 px-2.5 py-1
                            rounded-full
                            bg-amber-100/50 border border-amber-200/50
                            min-h-[28px]
                            transition-all duration-300
                            w-[calc(100%-1rem)]
                            group-data-[collapsible=icon]:w-8
                            group-data-[collapsible=icon]:h-8
                            group-data-[collapsible=icon]:p-0
                            group-data-[collapsible=icon]:mx-auto
                        "
                    >
                        <span className="text-sm shrink-0">
                            {isTenantView ? '👤' : '👑'}
                        </span>
                        <span
                            className="
                                text-[10px] font-semibold uppercase tracking-[0.05em]
                                text-amber-700
                                whitespace-nowrap overflow-hidden text-ellipsis
                                group-data-[collapsible=icon]:hidden
                            "
                        >
                            {isTenantView ? 'Tenant' : 'Admin'}
                        </span>
                    </div>
                </SidebarHeader>

                {/* ── Sidebar Content ── */}
                <SidebarContent className="flex-1 overflow-y-auto overflow-x-hidden p-2">
                    <NavMain items={mainNavItems} />
                </SidebarContent>

                {/* ── Sidebar Footer ── */}
                <SidebarFooter className="p-2 pt-3 border-t border-stone-200/50">
                    <NavUser />
                </SidebarFooter>
            </Sidebar>
        </>
    );
}
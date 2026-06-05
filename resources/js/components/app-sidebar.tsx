import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, UserPlus } from 'lucide-react';
import AppLogo from './app-logo';
import { Receipt, NotebookPen, CreditCard } from 'lucide-react';


const allNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Tenants',
        url: '/tenants',
        icon: UserPlus,
    },
    {
        title: 'Billings',
        url: '/billings',
        icon: Receipt,
    },
    {
        title: 'Balance Entry',
        url: '/balance_entries',
        icon: NotebookPen,
    },
    {
        title: 'Payments',
        url: '/payments',
        icon: CreditCard,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const page = usePage<SharedData>();
    const tenant = page.props.auth?.tenant;
    const mainNavItems = tenant ? allNavItems.filter((item) => item.url === '/dashboard') : allNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

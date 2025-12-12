import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { 
    LayoutDashboard, 
    Database,
    Globe,
    Settings,
    UserPlus,
    ExternalLink,
} from 'lucide-react';
import AppLogo from './app-logo';

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Master Data',
        href: '#',
        icon: Database,
        items: [
            {
                title: 'Profil Sekolah',
                href: '/admin/school-profile',
            },
            {
                title: 'Program Unggulan',
                href: '/admin/school-programs',
            },
            {
                title: 'Guru & Staff',
                href: '/admin/teachers',
            },
            {
                title: 'Jurusan',
                href: '/admin/majors',
            },
            {
                title: 'Program Keahlian',
                href: '/admin/major-programs',
            },
            {
                title: 'Project Siswa',
                href: '/admin/student-projects',
            },
        ],
    },
    {
        title: 'Konten Website',
        href: '#',
        icon: Globe,
        items: [
            {
                title: 'Kegiatan & Prestasi',
                href: '/admin/activities',
            },
            {
                title: 'Artikel & Berita',
                href: '/admin/articles',
            },
            {
                title: 'Galeri Foto',
                href: '/admin/gallery',
            },
            {
                title: 'Download Center',
                href: '/admin/downloads',
            },
            {
                title: 'Testimoni',
                href: '/admin/testimonials',
            },
        ],
    },
    {
        title: 'PPDB',
        href: '#',
        icon: UserPlus,
        items: [
            {
                title: 'Pengaturan PPDB',
                href: '/admin/ppdb/settings',
            },
        ],
    },
    {
        title: 'Pengaturan Home',
        href: '/admin/home-settings',
        icon: Settings,
    },
    {
        title: 'Lihat Website',
        href: '/',
        icon: ExternalLink,
        target: '_blank',
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" variant="inset" {...props}>
            <SidebarHeader>
                <AppLogo />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}

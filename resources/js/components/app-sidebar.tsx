
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
    Shield,
    Users,
    BookCheck,
} from 'lucide-react';
import AppLogo from './app-logo';
import { useRole } from '@/hooks/useRole';

export function AppSidebar() {
    const { hasRole, hasPermission } = useRole();

    // Define base items
    const dashboardItem: NavItem = {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    };

    const navItems: NavItem[] = [dashboardItem];

    // 1. RBAC & User Management (Super Admin)
    if (hasRole('super_admin')) {
        navItems.push({
            title: 'User Management',
            href: '#',
            icon: Shield,
            items: [
                { title: 'Roles', href: '/admin/roles' },
                { title: 'Permissions', href: '/admin/permissions' },
                { title: 'Tugaskan Role', href: '/admin/users' },
            ]
        });
        
        navItems.push({
            title: 'Penugasan (Assignment)',
            href: '#',
            icon: BookCheck,
            items: [
                { title: 'Wali Kelas', href: '/admin/assignments/class-teachers' },
                { title: 'Guru Mapel', href: '/admin/assignments/subject-teachers' },
            ]
        });
    }

    // 2. Master Data (Admin Sekolah & Super Admin)
    if (hasRole(['super_admin', 'admin_sekolah']) || hasPermission(['manage_classes', 'manage_subjects'])) {
        navItems.push({
            title: 'Master Data',
            href: '#',
            icon: Database,
            items: [
                { title: 'Profil Sekolah', href: '/admin/school-profile' }, // Permission check needed?
                { title: 'Program Unggulan', href: '/admin/school-programs' },
                { title: 'Guru & Staff', href: '/admin/teachers' },
                { title: 'Jurusan', href: '/admin/majors' },
                { title: 'Program Keahlian', href: '/admin/major-programs' },
                { title: 'Project Siswa', href: '/admin/student-projects' },
                // New Master Data for Specs
                { title: 'Data Kelas', href: '/admin/classes' },
                { title: 'Data Mapel', href: '/admin/subjects' },
            ],
        });
    }

    // 3. Konten Website (Admin Konten & Super Admin & Admin Sekolah)
    if (hasRole(['super_admin', 'admin_sekolah', 'admin_konten']) || hasPermission('manage_articles')) {
        navItems.push({
            title: 'Konten Website',
            href: '#',
            icon: Globe,
            items: [
                { title: 'Kegiatan & Prestasi', href: '/admin/activities' },
                { title: 'Artikel & Berita', href: '/admin/articles' },
                { title: 'Galeri Foto', href: '/admin/gallery' },
                { title: 'Download Center', href: '/admin/downloads' },
                { title: 'Testimoni', href: '/admin/testimonials' },
            ],
        });
    }

    // 4. PPDB (Admin PPDB & Super Admin)
    if (hasRole(['super_admin', 'admin_ppdb']) || hasPermission('manage_ppdb')) {
        navItems.push({
            title: 'PPDB',
            href: '#',
            icon: UserPlus,
            items: [
                { title: 'Pengaturan PPDB', href: '/admin/ppdb/settings' },
            ],
        });
    }

    // 5. Settings (Admin Sekolah & Super Admin)
    if (hasRole(['super_admin', 'admin_sekolah'])) {
        navItems.push({
            title: 'Pengaturan Home',
            href: '/admin/home-settings',
            icon: Settings,
        });
        navItems.push({
            title: 'Pengaturan Website',
            href: '/admin/site-settings',
            icon: Settings,
        });
    }

    // 6. Guru / Academic Menu (Wali Kelas / Guru Mapel)
    if (hasRole(['wali_kelas', 'guru_mapel'])) {
        const academicItems = [];
        if (hasRole('wali_kelas')) {
             academicItems.push({ title: 'Data Siswa Kelas', href: '/teacher/my-class' });
             academicItems.push({ title: 'Rekap Absensi', href: '/teacher/attendance' });
             academicItems.push({ title: 'Rekap Nilai', href: '/teacher/grades' });
        }
        if (hasRole('guru_mapel')) {
             academicItems.push({ title: 'Input Nilai', href: '/teacher/input-grades' });
        }
        
        if (academicItems.length > 0) {
            navItems.push({
                title: 'Akademik',
                href: '#',
                icon: Users,
                items: academicItems
            });
        }
    }

    // Always show link to implementation website
    navItems.push({
        title: 'Lihat Website',
        href: '/',
        icon: ExternalLink,
        external: true,
    });

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <AppLogo />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}

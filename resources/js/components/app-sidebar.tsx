
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
    GraduationCap,
    CalendarCheck,
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

    // 1. RBAC & User Management
    const userManagementItems = [];
    if (hasRole('super_admin')) {
        userManagementItems.push({ title: 'Roles', href: '/admin/roles' });
        userManagementItems.push({ title: 'Permissions', href: '/admin/permissions' });
    }
    if (hasRole('super_admin') || hasPermission('manage_user_accounts')) {
        userManagementItems.push({ title: 'Users / Akun', href: '/admin/users' });
    }

    if (userManagementItems.length > 0) {
        navItems.push({
            title: 'User Management',
            href: '#',
            icon: Shield,
            items: userManagementItems
        });
    }

    // Assignment menu for super_admin and operator
    if (hasRole(['super_admin', 'operator']) || hasPermission(['manage_class_assignments', 'manage_subject_assignments'])) {
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

    // Admin Grade Management
    if (hasRole(['super_admin', 'operator'])) {
        navItems.push({
            title: 'Manajemen Nilai',
            href: '/admin/grades',
            icon: GraduationCap,
        });
        navItems.push({
            title: 'Absensi',
            href: '/admin/attendance',
            icon: CalendarCheck,
        });
    }

    // 2. Master Data
    const masterDataItems: NavItem[] = [];
    if (hasRole(['super_admin', 'admin_sekolah', 'tata_usaha']) || hasPermission('manage_school_profile')) 
        masterDataItems.push({ title: 'Profil Sekolah', href: '/admin/school-profile' });
    if (hasRole(['super_admin', 'admin_sekolah', 'tata_usaha']) || hasPermission('manage_school_programs')) 
        masterDataItems.push({ title: 'Program Unggulan', href: '/admin/school-programs' });
    if (hasRole(['super_admin', 'admin_sekolah', 'tata_usaha', 'operator']) || hasPermission('manage_teachers')) 
        masterDataItems.push({ title: 'Guru & Staff', href: '/admin/teachers' });
    if (hasRole(['super_admin', 'admin_sekolah', 'tata_usaha', 'operator']) || hasPermission('manage_students')) 
        masterDataItems.push({ title: 'Data Siswa', href: '/admin/students' });
    if (hasRole(['super_admin', 'admin_sekolah', 'tata_usaha']) || hasPermission('manage_majors')) 
        masterDataItems.push({ title: 'Jurusan', href: '/admin/majors' });
    if (hasRole(['super_admin', 'admin_sekolah', 'tata_usaha']) || hasPermission('manage_major_programs')) 
        masterDataItems.push({ title: 'Program Keahlian', href: '/admin/major-programs' });
    if (hasRole(['super_admin', 'admin_sekolah', 'tata_usaha']) || hasPermission('manage_student_projects')) 
        masterDataItems.push({ title: 'Project Siswa', href: '/admin/student-projects' });
    if (hasRole(['super_admin', 'admin_sekolah', 'tata_usaha', 'operator']) || hasPermission('manage_classes')) 
        masterDataItems.push({ title: 'Data Kelas', href: '/admin/classes' });
    if (hasRole(['super_admin', 'admin_sekolah', 'tata_usaha', 'operator']) || hasPermission('manage_subjects')) 
        masterDataItems.push({ title: 'Data Mapel', href: '/admin/subjects' });
    if (hasRole(['super_admin', 'admin_sekolah', 'tata_usaha', 'operator']) || hasPermission('manage_academic_years')) 
        masterDataItems.push({ title: 'Tahun Ajaran', href: '/admin/academic-years' });

    if (masterDataItems.length > 0) {
        navItems.push({
            title: 'Master Data',
            href: '#',
            icon: Database,
            items: masterDataItems,
        });
    }

    // 2.5 CBT / Ujian (Operator & Super Admin)
    if (hasRole('super_admin') || hasPermission('manage_cbt')) {
        navItems.push({
            title: 'CBT / Ujian',
            href: '/portal/cbt', // Point to portal or specific admin CBT dashboard if exists
            icon: BookCheck, // Using BookCheck as proxy for exam icon
        });
    }

    // 3. Konten Website (Admin Konten & Super Admin & Admin Sekolah)
    // 3. Konten Website
    const contentItems: NavItem[] = [];
    if (hasRole(['super_admin', 'admin_sekolah', 'admin_konten']) || hasPermission('manage_activities'))
        contentItems.push({ title: 'Kegiatan & Prestasi', href: '/admin/activities' });
    if (hasRole(['super_admin', 'admin_sekolah', 'admin_konten']) || hasPermission('manage_articles'))
        contentItems.push({ title: 'Artikel & Berita', href: '/admin/articles' });
    if (hasRole(['super_admin', 'admin_sekolah', 'admin_konten']) || hasPermission('manage_gallery'))
        contentItems.push({ title: 'Galeri Foto', href: '/admin/gallery' });
    if (hasRole(['super_admin', 'admin_sekolah', 'admin_konten']) || hasPermission('manage_downloads'))
        contentItems.push({ title: 'Download Center', href: '/admin/downloads' });
    if (hasRole(['super_admin', 'admin_sekolah', 'admin_konten']) || hasPermission('manage_testimonials'))
        contentItems.push({ title: 'Testimoni', href: '/admin/testimonials' });

    if (contentItems.length > 0) {
        navItems.push({
            title: 'Konten Website',
            href: '#',
            icon: Globe,
            items: contentItems,
        });
    }

    // 4. PPDB (Admin PPDB & Super Admin & Operator)
    if (hasRole(['super_admin', 'admin_ppdb', 'operator']) || hasPermission('manage_ppdb')) {
        navItems.push({
            title: 'PPDB',
            href: '#',
            icon: UserPlus,
            items: [
                { title: 'Pengaturan PPDB', href: '/admin/ppdb/settings' },
            ],
        });
    }

    // 5. Settings (Admin Sekolah & Super Admin & Tata Usaha)
    // 5. Settings
    if (hasRole(['super_admin', 'admin_sekolah', 'tata_usaha']) || hasPermission('manage_home_settings')) {
        navItems.push({
            title: 'Pengaturan Home',
            href: '/admin/home-settings',
            icon: Settings,
        });
    }
    if (hasRole(['super_admin', 'admin_sekolah', 'tata_usaha']) || hasPermission('manage_site_settings')) {
        navItems.push({
            title: 'Pengaturan Website',
            href: '/admin/site-settings',
            icon: Settings,
        });
    }
    if (hasRole(['super_admin', 'operator'])) {
        navItems.push({
            title: 'Pengaturan Rapot',
            href: '/admin/report-card-settings',
            icon: Settings,
        });
    }

    // 6. Guru / Academic Menu (Wali Kelas / Guru Mapel)
    if (hasRole(['wali_kelas', 'guru_mapel'])) {
        const academicItems = [];
        if (hasRole('wali_kelas')) {
             academicItems.push({ title: 'Absensi Kelas', href: '/teacher/attendance/my-class' });
             academicItems.push({ title: 'Nilai Sikap', href: '/teacher/attitude-grades/my-class' });
             academicItems.push({ title: 'Cetak Rapot', href: '/teacher/report-card/my-class' });
        }
        if (hasRole('guru_mapel')) {
             academicItems.push({ title: 'Mata Pelajaran Saya', href: '/teacher/grades/my-subjects' });
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

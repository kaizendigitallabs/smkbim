import { Link, usePage } from '@inertiajs/react';
import { GraduationCap, Menu, X, Facebook, Instagram, Youtube, Search, ArrowRight, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { PageProps } from '@/types';

interface Props {
    children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
    const { props } = usePage<PageProps>();
    const schoolProfile = (props as any).schoolProfile;
    const siteSetting = (props as any).siteSetting;
    const ppdbSetting = (props as any).ppdbSetting; // Retrieve ppdbSetting
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm border-b border-gray-100 dark:border-slate-800">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            {siteSetting?.site_logo ? (
                                <img src={`/storage/${siteSetting.site_logo}`} alt="Logo" className="h-12 w-12 object-contain" />
                            ) : schoolProfile?.logo ? (
                                <img src={`/storage/${schoolProfile.logo}`} alt="Logo" className="h-12 w-12 object-contain" />
                            ) : (
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <GraduationCap className="h-7 w-7 text-primary" />
                                </div>
                            )}
                        </Link>
                        
                        {/* Desktop Menu & Actions */}
                        <div className="hidden lg:flex items-center gap-6 ml-auto">
                            <div className="flex items-center gap-8">
                                <NavLink href="/" label="Beranda" />
                                <NavDropdown label="Profil">
                                    <DropdownLink href="/profil">Tentang Sekolah</DropdownLink>
                                    <DropdownLink href="/profil">Struktur Organisasi</DropdownLink>
                                    <DropdownLink href="/guru">Guru & Tenaga Pendidik</DropdownLink>
                                    <DropdownLink href="/program-unggulan">Program Unggulan</DropdownLink>
                                </NavDropdown>
                                <NavDropdown label="Jurusan">
                                    <DropdownLink href="/jurusan">Kompetensi Keahlian</DropdownLink>
                                    <DropdownLink href="/jurusan">Kurikulum & Fasilitas</DropdownLink>
                                    <DropdownLink href="/karya-siswa">Portofolio Siswa</DropdownLink>
                                </NavDropdown>
                                <NavDropdown label="Kegiatan">
                                    <DropdownLink href="/kegiatan">Kegiatan Sekolah</DropdownLink>
                                    <DropdownLink href="/ekstrakurikuler">Ekstrakurikuler</DropdownLink>
                                    <DropdownLink href="/prestasi">Prestasi Siswa</DropdownLink>
                                    <DropdownLink href="/galeri/foto">Galeri Sekolah</DropdownLink>
                                </NavDropdown>
                                <NavDropdown label="Informasi">
                                    <DropdownLink href="/artikel">Berita & Artikel</DropdownLink>
                                    <DropdownLink href="/download">Download Center</DropdownLink>
                                </NavDropdown>
                                <NavLink href="/kontak" label="Kontak" />
                            </div>

                            {/* Separator */}
                            <div className="h-6 w-px bg-gray-200"></div>

                            {/* Actions */}
                            <div className="flex items-center gap-4">
                                <Link href="/ppdb">
                                    <Button 
                                        className={`rounded-full px-6 shadow-sm transition-all ${
                                            ppdbSetting?.is_open 
                                            ? 'bg-primary hover:bg-primary/90 text-white shadow-primary/30' 
                                            : 'bg-slate-100 hover:bg-slate-200 text-slate-500 shadow-none dark:bg-slate-800 dark:text-slate-400'
                                        }`}
                                    >
                                        {ppdbSetting?.is_open ? 'PPDB' : 'PPDB Ditutup'}
                                    </Button>
                                </Link>
                                {props.auth?.user ? (
                                    <Link href={route('dashboard')}>
                                        <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white px-6 font-bold shadow-sm transition-all bg-white dark:bg-slate-950 dark:border-primary dark:text-primary">
                                            Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href="/portal">
                                        <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white px-6 font-bold shadow-sm transition-all bg-white dark:bg-slate-950 dark:border-primary dark:text-primary">
                                            Login Portal
                                        </Button>
                                    </Link>
                                )}
                                <ModeToggle />
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            className="lg:hidden p-2 text-gray-600"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t bg-white dark:bg-slate-900 dark:border-slate-800 absolute w-full left-0 top-20 shadow-lg p-4 animate-in slide-in-from-top-2 overflow-y-auto max-h-[80vh]">
                        <div className="space-y-2">
                            <MobileNavLink href="/">Beranda</MobileNavLink>
                            
                            <MobileNavDropdown label="Profil">
                                <MobileNavLink href="/profil" inset>Tentang Sekolah</MobileNavLink>
                                <MobileNavLink href="/profil" inset>Struktur Organisasi</MobileNavLink>
                                <MobileNavLink href="/guru" inset>Guru & Staff</MobileNavLink>
                                <MobileNavLink href="/program-unggulan" inset>Program Unggulan</MobileNavLink>
                            </MobileNavDropdown>

                            <MobileNavDropdown label="Jurusan">
                                <MobileNavLink href="/jurusan" inset>Kompetensi Keahlian</MobileNavLink>
                                <MobileNavLink href="/jurusan" inset>Kurikulum</MobileNavLink>
                                <MobileNavLink href="/karya-siswa" inset>Portofolio Siswa</MobileNavLink>
                            </MobileNavDropdown>

                            <MobileNavDropdown label="Kegiatan">
                                <MobileNavLink href="/kegiatan" inset>Agenda Sekolah</MobileNavLink>
                                <MobileNavLink href="/ekstrakurikuler" inset>Ekstrakurikuler</MobileNavLink>
                                <MobileNavLink href="/prestasi" inset>Prestasi</MobileNavLink>
                                <MobileNavLink href="/galeri/foto" inset>Galeri Sekolah</MobileNavLink>
                            </MobileNavDropdown>

                            <MobileNavDropdown label="Informasi">
                                <MobileNavLink href="/artikel" inset>Berita</MobileNavLink>
                                <MobileNavLink href="/download" inset>Download</MobileNavLink>
                            </MobileNavDropdown>

                            <MobileNavLink href="/kontak">Kontak</MobileNavLink>
                            
                            <div className="pt-4 border-t border-gray-100 dark:border-slate-800 space-y-3">
                                <div className="flex justify-center">
                                    <ModeToggle />
                                </div>
                                <div className="space-y-3">
                                    <Link href="/ppdb" className="block w-full">
                                        <Button 
                                            className={`w-full shadow-sm ${
                                                ppdbSetting?.is_open 
                                                ? 'bg-primary text-white' 
                                                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                            }`}
                                        >
                                            {ppdbSetting?.is_open ? 'PPDB' : 'PPDB Ditutup'}
                                        </Button>
                                    </Link>
                                    {props.auth?.user ? (
                                        <Link href={route('dashboard')} className="block w-full">
                                            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white dark:border-primary dark:text-primary">Dashboard</Button>
                                        </Link>
                                    ) : (
                                        <Link href="/portal" className="block w-full">
                                            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white dark:border-primary dark:text-primary">Portal</Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-900 pt-16 pb-12 font-sans relative overflow-hidden">
                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
                
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    {/* Top Section: Brand + Links */}
                    <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
                        {/* Brand Section */}
                        <div className="lg:w-1/3 space-y-6">
                            <div className="flex items-center gap-3">
                                {schoolProfile?.logo ? (
                                    <img src={`/storage/${schoolProfile.logo}`} alt="Logo" className="h-10 w-10 object-contain" />
                                ) : (
                                    <GraduationCap className="h-10 w-10 text-primary" />
                                )}
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-sm">
                                {schoolProfile?.description || 'Mempersiapkan generasi unggul yang siap kerja dan berdaya saing global dengan kurikulum berbasis industri.'}
                            </p>
                        </div>

                        {/* Links Sections */}
                        <div className="lg:w-auto grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 lg:ml-auto">
                            <div>
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-6">Halaman</h4>
                                <ul className="space-y-4 text-gray-500 font-medium">
                                    <li><Link href="/" className="hover:text-primary transition-colors">Beranda</Link></li>
                                    <li><Link href="/jurusan" className="hover:text-primary transition-colors">Jurusan</Link></li>
                                    <li><Link href="/kegiatan" className="hover:text-primary transition-colors">Kegiatan</Link></li>
                                    <li><Link href="/artikel" className="hover:text-primary transition-colors">Berita</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-6">Informasi</h4>
                                <ul className="space-y-4 text-gray-500 font-medium">
                                    <li><Link href="/profil" className="hover:text-primary transition-colors">Tentang Kami</Link></li>
                                    <li><Link href="/program-unggulan" className="hover:text-primary transition-colors">Program Unggulan</Link></li>
                                    <li><Link href="/download" className="hover:text-primary transition-colors">Download</Link></li>
                                    <li><Link href="/ppdb" className="hover:text-primary transition-colors">Info PPDB</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-6">Kontak</h4>
                                <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                                    <li className="flex gap-3 items-start">
                                        <Phone className="h-6 w-6 text-secondary shrink-0" />
                                        <span className="leading-tight">{siteSetting?.footer_contact_phone || schoolProfile?.phone || '+62 xxx xxxx xxxx'}</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Mail className="h-6 w-6 text-secondary shrink-0" />
                                        <span className="leading-tight">{siteSetting?.footer_contact_email || schoolProfile?.email || 'info@smkbim.sch.id'}</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <MapPin className="h-6 w-6 text-secondary shrink-0" />
                                        <span className="leading-tight max-w-[200px]">{siteSetting?.footer_contact_address || schoolProfile?.address || 'Jl. Raya Pendidikan No. 1'}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Social Media Bar */}
                    <div className="bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-100 dark:border-slate-700 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                        <span className="text-lg font-bold text-gray-700 dark:text-gray-200">Ikuti Sosial Media Kami :</span>
                        <div className="flex items-center gap-4">
                            <SocialIcon href={siteSetting?.footer_social_facebook || schoolProfile?.facebook} icon={<Facebook className="h-5 w-5" />} className="bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200" />
                            <SocialIcon href={siteSetting?.footer_social_instagram || schoolProfile?.instagram} icon={<Instagram className="h-5 w-5" />} className="bg-pink-600 text-white hover:bg-pink-700 shadow-md shadow-pink-200" />
                            <SocialIcon href={siteSetting?.footer_social_youtube || schoolProfile?.youtube} icon={<Youtube className="h-5 w-5" />} className="bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-200" />
                        </div>
                    </div>
                    
                    <div className="mt-12 text-center text-gray-400 dark:text-gray-500 text-sm">
                         <p>
                            &copy; {new Date().getFullYear()} <span className="text-primary font-bold">{siteSetting?.site_name || schoolProfile?.name || 'SMK Bina Insan Mulia'}</span>. All rights reserved | Developed by <a href="https://kaizendigilabs.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Kaizen Digital Labs</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Components matching the reference style
function NavLink({ href, label }: { href: string; label: string }) {
    return (
        <Link href={href} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            {label}
        </Link>
    );
}

function NavDropdown({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="relative group">
            <button className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex items-center gap-1 group-hover:text-primary py-2">
                {label}
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full left-0 w-56 pt-2 hidden group-hover:block animate-in fade-in zoom-in-95 duration-200 z-50">
                <div className="bg-white dark:bg-slate-900 shadow-xl rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 p-2">
                    {children}
                </div>
            </div>
        </div>
    );
}

function DropdownLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg transition-colors">
            {children}
        </Link>
    );
}

function MobileNavLink({ href, children, inset }: { href: string; children: React.ReactNode; inset?: boolean }) {
    return (
        <Link href={href} className={`block px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg ${inset ? 'pl-8' : ''}`}>
            {children}
        </Link>
    );
}

function SocialIcon({ href, icon, className }: { href?: string; icon: React.ReactNode, className?: string }) {
    if (!href) return null;
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`h-12 w-12 flex items-center justify-center rounded-full transition-transform hover:-translate-y-1 shadow-sm ${className || 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white'}`}
        >
            {icon}
        </a>
    );
}

function MobileNavDropdown({ label, children }: { label: string; children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="space-y-1">
             <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
                {label}
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="space-y-1 animate-in slide-in-from-top-1 fade-in duration-200">
                    {children}
                </div>
            )}
        </div>
    );
}

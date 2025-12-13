import { Head, Link } from '@inertiajs/react';
import { GraduationCap, Briefcase, Laptop, ArrowRight, UserCheck, Users, MonitorPlay } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

export default function PortalSelection() {
    const portals = [
        {
            title: 'Manajemen & Guru',
            description: 'Portal khusus untuk Admin, Guru, dan Staff Pegawai.',
            icon: <Briefcase className="h-8 w-8 text-primary" />,
            href: '/login',
            color: 'bg-primary/10',
            buttonText: 'Masuk Sebagai Staff',
            active: true
        },
        {
            title: 'Siswa & Orang Tua',
            description: 'Akses nilai, jadwal, dan informasi akademik siswa.',
            icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
            href: '/portal/siswa',
            color: 'bg-blue-100 dark:bg-blue-900/20',
            buttonText: 'Masuk Sebagai Siswa',
            active: false
        },
        {
            title: 'CBT / Ujian Online',
            description: 'Portal pelaksanaan ujian berbasis komputer (CBT).',
            icon: <MonitorPlay className="h-8 w-8 text-orange-600" />,
            href: '/portal/cbt',
            color: 'bg-orange-100 dark:bg-orange-900/20',
            buttonText: 'Masuk Portal Ujian',
            active: false
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <Head title="Pilih Portal" />

            {/* Background Decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-30"></div>
                <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Navbar Actions */}
            <div className="absolute top-4 right-4 z-50 flex gap-2">
                <Link href="/">
                    <Button variant="ghost" className="text-gray-600 dark:text-gray-300">Beranda Depan</Button>
                </Link>
                <ModeToggle />
            </div>

            <div className="w-full max-w-6xl z-10 space-y-12">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center mb-6">
                        <img src="/images/logo.png" alt="Logo" className="h-12 w-12 object-contain" onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '<svg class="h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10v6"/><path d="M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2"/><path d="M22 17v1a2 2 0 0 1-2 2h-1"/><path d="M22 8l-10-5-10 5"/><path d="M12 12v10"/><path d="M5 20h14"/></svg>';
                        }} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Portal Akademik Digital
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        Silakan pilih portal masuk sesuai dengan peran dan kebutuhan akses Anda di SMK Bina Insan Mulia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
                    {portals.map((portal, index) => (
                        <Link href={portal.href} key={index} className="group h-full">
                            <Card className="h-full border-2 border-transparent hover:border-primary/50 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden group-hover:-translate-y-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                                <div className={`absolute top-0 right-0 w-32 h-32 ${portal.color} rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 opacity-50`}></div>
                                
                                <CardHeader className="relative z-10">
                                    <div className={`w-16 h-16 ${portal.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                        {portal.icon}
                                    </div>
                                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                        {portal.title}
                                    </CardTitle>
                                    <CardDescription className="text-base pt-2">
                                        {portal.description}
                                    </CardDescription>
                                </CardHeader>
                                
                                <CardContent>
                                    {!portal.active && (
                                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                            Segera Hadir
                                        </div>
                                    )}
                                </CardContent>

                                <CardFooter className="relative z-10">
                                    <Button className={`w-full gap-2 group-hover:gap-3 transition-all ${portal.active ? 'bg-primary hover:bg-primary/90' : 'bg-gray-200 text-gray-500 hover:bg-gray-200 cursor-not-allowed dark:bg-slate-700 dark:text-gray-400'}`}>
                                        {portal.buttonText}
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="text-center pt-8">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} SMK Bina Insan Mulia. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

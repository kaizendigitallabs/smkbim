import AppLayout from '@/Layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, ClipboardList, GraduationCap, Trophy, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Student {
    name: string;
    nisn: string;
    gender: string;
}

export default function StudentDashboard({ student }: { student: Student }) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
            ]}
        >
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
                 {/* Student Banner */}
                 <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-sky-400 to-blue-500 p-8 text-white shadow-lg">
                    <div className="relative z-10 flex gap-6 items-center">
                        <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30 text-3xl font-bold">
                            {student?.name?.charAt(0) || 'S'}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-1">Halo, {student?.name?.split(' ')[0] || 'Siswa'}!</h2>
                            <p className="text-sky-100">
                                NISN: {student?.nisn || '-'} • Siswa Aktif
                            </p>
                        </div>
                    </div>
                     <div className="absolute right-0 bottom-0 -mb-10 -mr-10 h-64 w-64 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                </div>

                 <div className="grid gap-4 md:grid-cols-3">
                    <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Kehadiran Semester Ini</CardTitle>
                             <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mb-2">90%</div>
                            <Progress value={90} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-2">Cukup baik, tingkatkan!</p>
                        </CardContent>
                    </Card>
                     <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-500">85.5</div>
                            <p className="text-xs text-muted-foreground">Predikat: Baik</p>
                        </CardContent>
                    </Card>
                     <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Prestasi</CardTitle>
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">-</div>
                            <p className="text-xs text-muted-foreground">Belum ada data prestasi.</p>
                        </CardContent>
                    </Card>
                </div>
                
                <h3 className="text-lg font-semibold mt-2">Pengumuman Terbaru</h3>
                <div className="grid gap-4">
                    <div className="flex items-start gap-4 p-4 rounded-xl border bg-white dark:bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
                            <Trophy className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-base mb-1">Lomba Kompetensi Siswa (LKS) 2024</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                Pendaftaran seleksi tingkat sekolah dibuka mulai tanggal 20 Desember. Segera daftarkan diri Anda di ruang Tata Usaha.
                            </p>
                            <span className="text-xs text-slate-400 mt-2 block">2 jam yang lalu</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-300 self-center" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

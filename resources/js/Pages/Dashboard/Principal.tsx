import AppLayout from '@/Layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, Users, School, TrendingUp, Calendar, BookOpen } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Stats {
    studentsCount: number;
    teachersCount: number;
    classesCount: number;
    ppdbCount: number;
}

export default function PrincipalDashboard({ stats }: { stats: Stats }) {
    // Dummy trend data simulating student growth or attendance
    const trendData = [
        { month: 'Jan', students: stats.studentsCount - 10 },
        { month: 'Feb', students: stats.studentsCount - 5 },
        { month: 'Mar', students: stats.studentsCount - 2 },
        { month: 'Apr', students: stats.studentsCount },
        { month: 'Mei', students: stats.studentsCount + 2 },
        { month: 'Jun', students: stats.studentsCount + 5 },
    ];

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
            ]}
        >
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
                {/* Elegant Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-white shadow-xl">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-light mb-1 text-slate-300">Selamat Datang,</h2>
                        <h1 className="text-3xl font-bold tracking-tight mb-4">Kepala Sekolah</h1>
                        <p className="max-w-xl text-slate-400">
                            Ringkasan eksekutif kinerja sekolah dan statistik akademik.
                        </p>
                    </div>
                     <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent skew-x-12 transform origin-bottom-right" />
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="hover:border-blue-500/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Siswa</CardTitle>
                            <GraduationCap className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.studentsCount}</div>
                            <p className="text-xs text-muted-foreground mt-1">Siswa aktif</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:border-emerald-500/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Staf Pengajar</CardTitle>
                            <Users className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.teachersCount}</div>
                            <p className="text-xs text-muted-foreground mt-1">Guru & Tendik</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:border-indigo-500/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Rombongan Belajar</CardTitle>
                            <School className="h-4 w-4 text-indigo-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.classesCount}</div>
                            <p className="text-xs text-muted-foreground mt-1">Kelas aktif</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:border-rose-500/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Minat PPDB</CardTitle>
                            <TrendingUp className="h-4 w-4 text-rose-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.ppdbCount}</div>
                            <p className="text-xs text-muted-foreground mt-1">Pendaftar baru</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="col-span-1 shadow-sm">
                        <CardHeader>
                            <CardTitle>Tren Siswa</CardTitle>
                            <CardDescription>Pertumbuhan jumlah siswa per bulan (simulasi).</CardDescription>
                        </CardHeader>
                        <CardContent >
                             <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trendData}>
                                        <defs>
                                            <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="students" stroke="#3b82f6" fillOpacity={1} fill="url(#colorStudents)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-1 shadow-sm">
                        <CardHeader>
                            <CardTitle>Agenda Sekolah</CardTitle>
                             <CardDescription>Kegiatan akademik mendatang.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md">
                                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm">Rapat Evaluasi Kurikulum</h4>
                                        <p className="text-xs text-muted-foreground">Senin, 20 Desember 2024</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-md">
                                        <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm">Ujian Akhir Semester</h4>
                                        <p className="text-xs text-muted-foreground">Mulai 5 Januari 2025</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

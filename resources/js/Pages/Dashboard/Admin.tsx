import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, GraduationCap, School, FileText, ArrowUpRight, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Button } from '@/components/ui/button';

interface Stats {
    studentsCount: number;
    teachersCount: number;
    classesCount: number;
    articlesCount: number;
}

export default function AdminDashboard({ stats }: { stats: Stats }) {
    const data = [
        { name: 'Siswa', count: stats.studentsCount, color: '#3b82f6' },
        { name: 'Guru', count: stats.teachersCount, color: '#10b981' },
        { name: 'Kelas', count: stats.classesCount, color: '#f59e0b' },
        { name: 'Artikel', count: stats.articlesCount, color: '#6366f1' },
    ];

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
            ]}
        >
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
                {/* Welcome Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 p-8 text-white shadow-xl">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Selamat Datang, Admin!</h2>
                        <p className="max-w-xl text-violet-100 mb-6">
                            Anda memiliki akses penuh untuk mengelola data sekolah. Pantau statistik dan aktivitas terbaru langsung dari dashboard.
                        </p>
                        <div className="flex gap-3">
                            <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0" asChild>
                                <Link href={route('admin.students.index')}>Kelola Siswa</Link>
                            </Button>
                            <Button variant="secondary" className="bg-white text-violet-600 hover:bg-violet-50" asChild>
                                <Link href={route('admin.site-settings.index')}>Pengaturan</Link>
                            </Button>
                        </div>
                    </div>
                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute bottom-0 right-20 -mb-20 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.studentsCount}</div>
                            <p className="text-xs text-muted-foreground">+2 minggu ini</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.teachersCount}</div>
                            <p className="text-xs text-muted-foreground">Aktif mengajar</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Kelas</CardTitle>
                            <School className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.classesCount}</div>
                            <p className="text-xs text-muted-foreground">Tahun ajaran aktif</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Artikel</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.articlesCount}</div>
                            <p className="text-xs text-muted-foreground">Berita dipublikasi</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts & Quick Actions Row */}
                <div className="grid gap-6 md:grid-cols-7">
                    {/* Chart Section */}
                    <Card className="col-span-4 shadow-sm">
                        <CardHeader>
                            <CardTitle>Statistik Data Sekolah</CardTitle>
                            <CardDescription>Ringkasan jumlah data master dalam sistem.</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                        <XAxis 
                                            dataKey="name" 
                                            stroke="#888888" 
                                            fontSize={12} 
                                            tickLine={false} 
                                            axisLine={false} 
                                        />
                                        <YAxis
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `${value}`}
                                        />
                                        <Tooltip 
                                            cursor={{ fill: 'transparent' }}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                    
                    {/* Right Side / Quick Actions */}
                    <Card className="col-span-3 shadow-sm">
                        <CardHeader>
                            <CardTitle>Akses Cepat</CardTitle>
                            <CardDescription>Shortcut menu pengelolaan utama.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3" asChild>
                                <Link href={route('admin.students.index')}>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                                        <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="font-semibold text-sm">Data Siswa</span>
                                        <span className="text-xs text-muted-foreground">Kelola data siswa aktif</span>
                                    </div>
                                </Link>
                            </Button>
                            
                            <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3" asChild>
                                <Link href={route('admin.teachers.index')}>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                                        <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="font-semibold text-sm">Data Guru</span>
                                        <span className="text-xs text-muted-foreground">Kelola staf pengajar</span>
                                    </div>
                                </Link>
                            </Button>

                            <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3" asChild>
                                <Link href={route('admin.articles.index')}>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                                        <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="font-semibold text-sm">Tulis Berita</span>
                                        <span className="text-xs text-muted-foreground">Publikasi artikel baru</span>
                                    </div>
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, UserPlus, ClipboardList, Database, Bell, Settings } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Button } from '@/components/ui/button';

interface Stats {
    usersCount: number;
    ppdbCount: number;
    studentsCount: number;
    teachersCount: number;
}

export default function OperatorDashboard({ stats }: { stats: Stats }) {
    const pieData = [
        { name: 'Siswa', value: stats.studentsCount, color: '#3b82f6' },
        { name: 'Guru', value: stats.teachersCount, color: '#10b981' },
        { name: 'User Lain', value: stats.usersCount - (stats.studentsCount + stats.teachersCount), color: '#94a3b8' },
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
                 <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white shadow-xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-2">Halo, Operator!</h2>
                            <p className="max-w-md text-emerald-50 opacity-90">
                                Sistem berjalan lancar. Ada <span className="font-semibold">{stats.ppdbCount} pendaftar baru</span> PPDB yang perlu ditinjau.
                            </p>
                        </div>
                        <div className="flex gap-3">
                             <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0" asChild>
                                <Link href={route('admin.ppdb.settings.index')}>Cek PPDB</Link>
                            </Button>
                             <Button variant="secondary" className="bg-white text-teal-700 hover:bg-teal-50" asChild>
                                <Link href={route('admin.users.index')}>Kelola User</Link>
                            </Button>
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 -ml-16 -mt-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute bottom-0 right-10 -mb-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total User System</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.usersCount}</div>
                            <p className="text-xs text-muted-foreground">Akun aktif</p>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pendaftar PPDB</CardTitle>
                            <UserPlus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.ppdbCount}</div>
                            <p className="text-xs text-muted-foreground">Calon siswa</p>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Data Siswa</CardTitle>
                            <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.studentsCount}</div>
                            <p className="text-xs text-muted-foreground">Terdata di Dapodik</p>
                        </CardContent>
                    </Card>
                   <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Data Guru</CardTitle>
                            <Database className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.teachersCount}</div>
                            <p className="text-xs text-muted-foreground">Terdata</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2 shadow-sm">
                        <CardHeader>
                            <CardTitle>Distribusi Pengguna</CardTitle>
                            <CardDescription>Komposisi pengguna sistem berdasarkan peran.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="h-[300px] w-full flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip />
                                        <Legend verticalAlign="bottom" height={36}/>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                    
                     <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Quick Links</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <Button variant="outline" className="w-full justify-start gap-2" asChild>
                                <Link href={route('admin.ppdb.settings.index')}>
                                    <Settings className="h-4 w-4" />
                                    Pengaturan PPDB
                                </Link>
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-2" asChild>
                                <Link href={route('admin.site-settings.index')}>
                                    <Settings className="h-4 w-4" />
                                    Pengaturan Website
                                </Link>
                            </Button>
                             <div className="relative rounded-lg border p-4 bg-muted/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <Bell className="h-4 w-4 text-amber-500" />
                                    <span className="font-semibold text-sm">System Notice</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Backup database otomatis dijadwalkan setiap hari pukul 02:00 WIB.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, ClipboardCheck, Calendar, BookOpen, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

interface Stats {
    className: string;
    studentsCount: number;
}

export default function HomeroomDashboard({ stats, myClass }: { stats: Stats, myClass: any }) {

    // Dummy attendance data
    const attendanceData = [
        { name: 'Hadir', count: stats.studentsCount - 3, fill: '#10b981' },
        { name: 'Izin', count: 2, fill: '#f59e0b' },
        { name: 'Sakit', count: 1, fill: '#3b82f6' },
        { name: 'Alpha', count: 0, fill: '#ef4444' },
    ];

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
            ]}
        >
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
                {/* Personal Banner */}
                 <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white shadow-lg">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                             <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm">
                                 Wali Kelas
                             </span>
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight mb-2">{stats.className}</h2>
                        <p className="max-w-xl text-indigo-50 opacity-90">
                            Halo Bapak/Ibu Guru. Semangat mendampingi siswa-siswi kelas {stats.className}.
                        </p>
                        <div className="mt-6 flex gap-3">
                             <Button variant="secondary" className="bg-white text-purple-600 hover:bg-purple-50 shadow-sm" asChild>
                                <Link href={route('teacher.attendance.my-class')}>Input Absensi</Link>
                            </Button>
                             <Button variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10" asChild>
                                <Link href={route('teacher.report-card.my-class')}>Cek Raport</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Jumlah Siswa</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.studentsCount}</div>
                            <p className="text-xs text-muted-foreground">Anak didik</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-all">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Kehadiran Hari Ini</CardTitle>
                            <ClipboardCheck className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-emerald-600">95%</div>
                            <p className="text-xs text-muted-foreground">3 Siswa berhalangan</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Jadwal Kelas</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-semibold">Senin</div>
                            <p className="text-xs text-muted-foreground">Upacara, Matematika, B.Indo</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Rekap Absensi Pekan Ini</CardTitle>
                             <CardDescription>Komposisi kehadiran siswa.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                             <div className="h-[250px] w-full max-w-xs">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadialBarChart innerRadius="30%" outerRadius="100%" data={attendanceData} startAngle={180} endAngle={0} cy="70%">
                                        <RadialBar
                                            label={{ position: 'insideStart', fill: '#fff' }}
                                            background
                                            dataKey="count"
                                            cornerRadius={8}
                                        />
                                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{top: 0, left: 0}} />
                                    </RadialBarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Notifikasi Kelas</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-4">
                                <div className="flex gap-3 items-start p-3 bg-red-50 text-red-700 rounded-lg border border-red-100">
                                    <AlertCircle className="h-5 w-5 shrink-0" />
                                    <div>
                                        <p className="font-semibold text-sm">3 Siswa Belum Melengkapi Biodata</p>
                                        <p className="text-xs opacity-90">Mohon ingatkan siswa untuk update data profil.</p>
                                    </div>
                                </div>
                                 <div className="flex gap-3 items-start p-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
                                    <BookOpen className="h-5 w-5 shrink-0" />
                                    <div>
                                        <p className="font-semibold text-sm">Jadwal UTS Segera Tiba</p>
                                        <p className="text-xs opacity-90">Persiapkan lembar nilai sikap semester ini.</p>
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

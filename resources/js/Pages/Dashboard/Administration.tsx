import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckSquare, BookOpen, Users, Download, FileText, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Stats {
    classesCount: number;
    subjectsCount: number;
    studentsCount: number;
    downloadsCount: number;
}

export default function AdministrationDashboard({ stats }: { stats: Stats }) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
            ]}
        >
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
                {/* Clean Professional Banner */}
                <div className="rounded-3xl bg-slate-100 dark:bg-slate-800 p-8 shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Administrasi & Tata Usaha</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                Kelola data master akademik dan arsip sekolah.
                            </p>
                        </div>
                        <div className="flex gap-2">
                             <Button size="sm" variant="outline" className="gap-2">
                                <Printer className="h-4 w-4" />
                                Laporan
                            </Button>
                            <Button size="sm" className="gap-2 bg-slate-900 text-white hover:bg-slate-800">
                                <FileText className="h-4 w-4" />
                                Surat Baru
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-white dark:bg-card border-l-4 border-l-orange-500 shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Data Kelas</CardTitle>
                            <CheckSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.classesCount}</div>
                            <p className="text-xs text-muted-foreground">Rombel Aktif</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-card border-l-4 border-l-cyan-500 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Mata Pelajaran</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.subjectsCount}</div>
                            <p className="text-xs text-muted-foreground">Kurikulum Merdeka</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-card border-l-4 border-l-blue-500 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Data Siswa</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.studentsCount}</div>
                            <p className="text-xs text-muted-foreground">Total Siswa</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-card border-l-4 border-l-green-500 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Arsip Download</CardTitle>
                            <Download className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.downloadsCount}</div>
                            <p className="text-xs text-muted-foreground">File tersedia</p>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="grid gap-6 md:grid-cols-3">
                     <Card className="md:col-span-2 shadow-sm">
                         <CardHeader>
                             <CardTitle>Daftar Tugas Administrasi</CardTitle>
                             <CardDescription>Status kelengkapan data semester ini.</CardDescription>
                         </CardHeader>
                         <CardContent>
                             <div className="space-y-4">
                                 <div className="flex items-center justify-between p-3 border rounded-lg">
                                     <div className="flex items-center gap-3">
                                         <div className="h-2 w-2 rounded-full bg-green-500" />
                                         <span className="text-sm font-medium">Data Siswa Baru</span>
                                     </div>
                                     <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Lengkap</span>
                                 </div>
                                 <div className="flex items-center justify-between p-3 border rounded-lg">
                                     <div className="flex items-center gap-3">
                                         <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                         <span className="text-sm font-medium">Jadwal Pelajaran</span>
                                     </div>
                                     <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Proses</span>
                                 </div>
                                 <div className="flex items-center justify-between p-3 border rounded-lg">
                                     <div className="flex items-center gap-3">
                                         <div className="h-2 w-2 rounded-full bg-red-500" />
                                         <span className="text-sm font-medium">Sinkronisasi Data</span>
                                     </div>
                                     <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">Belum</span>
                                 </div>
                             </div>
                         </CardContent>
                     </Card>
                     
                     <Card className="shadow-sm bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900">
                         <CardHeader>
                             <CardTitle className="text-blue-700 dark:text-blue-300">Pusat Bantuan</CardTitle>
                         </CardHeader>
                         <CardContent>
                             <p className="text-sm text-blue-600/80 dark:text-blue-400/80 mb-4">
                                 Jika mengalami kendala teknis dalam pengelolaan data, silakan hubungi tim IT.
                             </p>
                             <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-100">
                                 Hubungi IT Support
                             </Button>
                         </CardContent>
                     </Card>
                </div>
            </div>
        </AppLayout>
    );
}

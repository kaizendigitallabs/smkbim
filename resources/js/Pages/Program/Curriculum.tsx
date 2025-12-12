import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Target, CheckCircle2, GraduationCap, Users } from 'lucide-react';

export default function Curriculum() {
    return (
        <PublicLayout>
            <Head title="Kurikulum" />
            
            {/* Hero */}
            <div className="bg-[#F8FDF9] py-20 border-b border-green-50">
                <div className="container mx-auto px-4 text-center">
                    <Badge className="bg-white text-primary border-primary/20 mb-4 px-4 py-1">Program Pendidikan</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Kurikulum Sekolah</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        SMK Bina Insan Mulia menerapkan Kurikulum Merdeka yang berfokus pada pengembangan kompetensi dan karakter siswa.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-7xl mx-auto">
                    {/* Kurikulum Overview */}
                    <div className="mb-16">
                        <Card className="border-0 shadow-xl overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-[#21AD00] to-[#E7974D]"></div>
                            <CardContent className="p-10">
                                <div className="flex items-start gap-6">
                                    <div className="w-16 h-16 bg-[#21AD00]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <BookOpen className="w-8 h-8 text-[#21AD00]" />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Kurikulum Merdeka</h2>
                                        <p className="text-gray-600 leading-relaxed mb-6">
                                            Kurikulum Merdeka memberikan keleluasaan kepada satuan pendidikan dan guru untuk mengembangkan potensi serta 
                                            kreativitas siswa. Pembelajaran dirancang lebih fleksibel, berfokus pada materi esensial, dan pengembangan 
                                            karakter serta kompetensi siswa.
                                        </p>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <p className="text-sm text-gray-500 mb-1">Durasi Pendidikan</p>
                                                <p className="text-2xl font-bold text-[#21AD00]">3 Tahun</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <p className="text-sm text-gray-500 mb-1">Jam Pelajaran/Minggu</p>
                                                <p className="text-2xl font-bold text-[#21AD00]">48 JP</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <p className="text-sm text-gray-500 mb-1">Praktik Kerja Lapangan</p>
                                                <p className="text-2xl font-bold text-[#21AD00]">6 Bulan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Struktur Kurikulum */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Struktur Kurikulum</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Mata Pelajaran Umum */}
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                            <BookOpen className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Mata Pelajaran Umum</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {[
                                            'Pendidikan Agama dan Budi Pekerti',
                                            'Pendidikan Pancasila',
                                            'Bahasa Indonesia',
                                            'Matematika',
                                            'Bahasa Inggris',
                                            'Pendidikan Jasmani & Olahraga',
                                            'Sejarah',
                                            'Seni Budaya'
                                        ].map((subject, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-[#21AD00] flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{subject}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Mata Pelajaran Kejuruan */}
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-[#21AD00]/10 rounded-xl flex items-center justify-center">
                                            <GraduationCap className="w-6 h-6 text-[#21AD00]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Mata Pelajaran Kejuruan</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {[
                                            'Dasar-dasar Teknik Komputer',
                                            'Pemrograman Dasar',
                                            'Basis Data',
                                            'Pemrograman Berorientasi Objek',
                                            'Pemrograman Web & Mobile',
                                            'Administrasi Sistem Jaringan',
                                            'Produk Kreatif dan Kewirausahaan',
                                            'Projek Kreatif dan Kewirausahaan'
                                        ].map((subject, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-[#21AD00] flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{subject}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Tujuan Kurikulum */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tujuan Kurikulum</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Target,
                                    title: 'Kompetensi Teknis',
                                    desc: 'Mengembangkan keterampilan teknis yang sesuai dengan kebutuhan industri dan dunia kerja.'
                                },
                                {
                                    icon: Users,
                                    title: 'Karakter Unggul',
                                    desc: 'Membentuk karakter siswa yang berakhlak mulia, disiplin, dan bertanggung jawab.'
                                },
                                {
                                    icon: GraduationCap,
                                    title: 'Siap Kerja & Kuliah',
                                    desc: 'Mempersiapkan lulusan yang siap bekerja atau melanjutkan pendidikan ke jenjang lebih tinggi.'
                                }
                            ].map((item, index) => (
                                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all group">
                                    <CardContent className="p-8 text-center">
                                        <div className="w-16 h-16 bg-[#21AD00]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#21AD00] transition-colors">
                                            <item.icon className="w-8 h-8 text-[#21AD00] group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

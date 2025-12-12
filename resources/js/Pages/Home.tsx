import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PopupBanner } from '@/components/popup-banner';
import { 
    CheckCircle2, 
    Target, 
    Users, 
    TrendingUp, 
    Calendar, 
    ArrowRight,
    MapPin,
    BookOpen,
    Award,
    Lightbulb,
    Heart,
    Star,
    Quote,
    Sparkles
} from 'lucide-react';

interface HomeProps {
    schoolProfile: any;
    activities: any[];
    achievements: any[];
    articles: any[];
    galleries: any[];
    ppdbIsOpen: boolean;
    majors: any[];
    schoolPrograms: any[];
    homeSettings: any;
    testimonials: any[];
}

export default function Home({ 
    schoolProfile, 
    activities, 
    achievements, 
    articles, 
    galleries, 
    ppdbIsOpen, 
    majors, 
    schoolPrograms,
    testimonials 
}: HomeProps) {
    // Merge activities and achievements
    const allActivities = [...activities, ...achievements].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <PublicLayout>
            <Head title="Beranda" />
            <PopupBanner />

            {/* 1. HERO UTAMA - Emerald to White Gradient */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 py-16 lg:py-24">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#21AD00]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-100/40 rounded-full blur-3xl"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                        {/* Left: Text Content */}
                        <div className="space-y-6">
                            <Badge className="bg-[#21AD00]/10 text-[#21AD00] border-[#21AD00]/20 font-semibold">
                                Sekolah Pusat Keunggulan
                            </Badge>
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
                                SMK Bina Insan Mulia – <span className="text-[#21AD00]">Mempersiapkan Generasi</span> Siap Kerja dan Berakhlak
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                                Sekolah kejuruan yang fokus membekali siswa dengan keterampilan praktis, karakter kuat, 
                                dan kesiapan menghadapi dunia industri maupun perguruan tinggi.
                            </p>
                            
                            {/* Bullet Points */}
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-[#21AD00] flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700 font-medium">Kurikulum selaras dengan kebutuhan industri</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-[#21AD00] flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700 font-medium">Pembinaan karakter dan keagamaan yang intensif</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-[#21AD00] flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700 font-medium">Pendampingan karir dan studi lanjut</span>
                                </li>
                            </ul>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link href="/ppdb/register">
                                    <Button size="lg" className="bg-[#21AD00] hover:bg-[#1a8a00] text-white shadow-xl shadow-[#21AD00]/20 h-14 px-8 text-lg font-bold">
                                        Daftar PPDB
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link href="/profil">
                                    <Button size="lg" variant="outline" className="border-2 border-[#21AD00] text-[#21AD00] hover:bg-[#21AD00]/5 h-14 px-8 text-lg font-bold">
                                        Lihat Profil Sekolah
                                    </Button>
                                </Link>
                            </div>

                            {/* Quick Info Strip */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-gray-200">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin className="w-5 h-5 text-[#21AD00]" />
                                    <span className="text-sm font-medium">Lokasi: {schoolProfile?.address || 'Bandung'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <BookOpen className="w-5 h-5 text-[#21AD00]" />
                                    <span className="text-sm font-medium">Kompetensi: {majors[0]?.name || 'RPL'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="w-5 h-5 text-[#21AD00]" />
                                    <span className="text-sm font-bold text-[#21AD00]">PPDB {ppdbIsOpen ? 'Dibuka' : 'Segera'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Portrait Image with Modern Shape */}
                        <div className="relative flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-md">
                                {/* Decorative background shape */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#21AD00]/20 to-emerald-200/30 rounded-[3rem] transform rotate-3"></div>
                                
                                {/* Main image container */}
                                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white aspect-[3/4]">
                                    {schoolProfile?.hero_image ? (
                                        <img 
                                            src={`/storage/${schoolProfile.hero_image}`} 
                                            alt="SMK Bina Insan Mulia" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                                            <BookOpen className="w-32 h-32 text-[#21AD00]/30" />
                                        </div>
                                    )}
                                </div>

                                {/* Floating badge */}
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-6 py-4 border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-[#21AD00]/10 flex items-center justify-center">
                                            <Award className="w-6 h-6 text-[#21AD00]" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Akreditasi</p>
                                            <p className="text-lg font-bold text-gray-900">A (Unggul)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. SEKILAS SMK - More Attractive Design */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Header with decorative element */}
                        <div className="text-center mb-16 relative">
                            <div className="inline-block">
                                <Badge className="bg-[#21AD00]/10 text-[#21AD00] mb-4">Tentang Kami</Badge>
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                    Sekilas Tentang SMK Bina Insan Mulia
                                </h2>
                                <div className="h-1 w-24 bg-gradient-to-r from-[#21AD00] to-[#E7974D] mx-auto rounded-full"></div>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                            {/* Left: Text with gradient background */}
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-br from-[#21AD00]/5 to-emerald-50 rounded-3xl -z-10"></div>
                                <div className="p-8 space-y-6">
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        SMK Bina Insan Mulia hadir sebagai sekolah kejuruan yang berkomitmen menyiapkan lulusan yang terampil, 
                                        berkarakter, dan siap menghadapi perubahan zaman.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        Melalui perpaduan antara pembelajaran teori, praktik langsung, serta pembinaan akhlak, 
                                        sekolah ini menjadi tempat tumbuhnya generasi muda yang mandiri dan bertanggung jawab.
                                    </p>
                                    <div className="flex items-center gap-4 pt-4">
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-[#21AD00]">500+</p>
                                            <p className="text-sm text-gray-600">Siswa Aktif</p>
                                        </div>
                                        <div className="h-12 w-px bg-gray-200"></div>
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-[#E7974D]">95%</p>
                                            <p className="text-sm text-gray-600">Tingkat Kelulusan</p>
                                        </div>
                                        <div className="h-12 w-px bg-gray-200"></div>
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-[#21AD00]">15+</p>
                                            <p className="text-sm text-gray-600">Ekstrakurikuler</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Stacked Cards with Icons */}
                            <div className="grid gap-6">
                                <Card className="border-0 shadow-lg hover:shadow-xl transition-all group bg-gradient-to-br from-white to-emerald-50/30">
                                    <CardContent className="p-6 flex gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-[#21AD00]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#21AD00] group-hover:text-white transition-colors">
                                            <Heart className="w-7 h-7 text-[#21AD00] group-hover:text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-2 text-gray-900">Fokus Pembinaan Karakter</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                Pembiasaan ibadah, kedisiplinan, dan budaya saling menghargai menjadi bagian dari keseharian di sekolah.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg hover:shadow-xl transition-all group bg-gradient-to-br from-white to-orange-50/30">
                                    <CardContent className="p-6 flex gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-[#E7974D]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E7974D] group-hover:text-white transition-colors">
                                            <Target className="w-7 h-7 text-[#E7974D] group-hover:text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-2 text-gray-900">Lingkungan Belajar Nyaman</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                Ruang kelas, laboratorium, serta fasilitas pendukung dirancang untuk mendukung proses belajar yang optimal.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg hover:shadow-xl transition-all group bg-gradient-to-br from-white to-emerald-50/30">
                                    <CardContent className="p-6 flex gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-[#21AD00]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#21AD00] group-hover:text-white transition-colors">
                                            <TrendingUp className="w-7 h-7 text-[#21AD00] group-hover:text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-2 text-gray-900">Pendampingan Karir & Studi Lanjut</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                Siswa dibimbing untuk memilih jalur terbaik: langsung bekerja, berwirausaha, atau melanjutkan pendidikan.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. KOMPETENSI KEAHLIAN UTAMA */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <Badge className="bg-[#21AD00]/10 text-[#21AD00] mb-4">Kompetensi Keahlian</Badge>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Kompetensi Keahlian Unggulan
                            </h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                Satu jurusan, fokus pada kualitas penguasaan skill.
                            </p>
                        </div>

                        <div className="max-w-6xl mx-auto">
                            <p className="text-gray-600 text-center mb-12 leading-relaxed">
                                SMK Bina Insan Mulia memiliki satu kompetensi keahlian utama yang menjadi fokus pengembangan keterampilan siswa. 
                                Setiap materi dirancang untuk mendekatkan siswa dengan kebutuhan dunia kerja dan perkembangan teknologi terkini.
                            </p>

                            {majors.length > 0 && (
                                <Card className="border-0 shadow-xl overflow-hidden">
                                    <div className="grid lg:grid-cols-2 gap-0">
                                        {/* Left: Image */}
                                        <div className="relative aspect-square lg:aspect-auto bg-gradient-to-br from-[#21AD00]/10 to-emerald-50">
                                            {majors[0].image ? (
                                                <img 
                                                    src={`/storage/${majors[0].image}`} 
                                                    alt={majors[0].name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <BookOpen className="w-32 h-32 text-[#21AD00]/30" />
                                                </div>
                                            )}
                                            {/* Overlay badge */}
                                            <div className="absolute top-6 left-6">
                                                <Badge className="bg-[#21AD00] text-white shadow-lg text-base px-4 py-2">
                                                    Program Unggulan
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Right: Content */}
                                        <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                                            <h3 className="text-3xl font-bold text-gray-900 mb-4">{majors[0].name}</h3>
                                            <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                                                {majors[0].description || 'Belajar pemrograman, pengembangan aplikasi web, dan dasar-dasar sistem informasi dengan pendekatan praktis dan berbasis industri.'}
                                            </p>

                                            {/* Skills/Competencies */}
                                            <div className="mb-6">
                                                <p className="text-sm font-semibold text-gray-700 mb-3">Kompetensi yang Dipelajari:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {majors[0].skills ? (
                                                        majors[0].skills.slice(0, 6).map((skill: string, index: number) => (
                                                            <Badge key={index} variant="outline" className="border-[#21AD00] text-[#21AD00] bg-[#21AD00]/5">
                                                                {skill}
                                                            </Badge>
                                                        ))
                                                    ) : (
                                                        <>
                                                            <Badge variant="outline" className="border-[#21AD00] text-[#21AD00] bg-[#21AD00]/5">
                                                                Web Development
                                                            </Badge>
                                                            <Badge variant="outline" className="border-[#21AD00] text-[#21AD00] bg-[#21AD00]/5">
                                                                Mobile Apps
                                                            </Badge>
                                                            <Badge variant="outline" className="border-[#21AD00] text-[#21AD00] bg-[#21AD00]/5">
                                                                Database
                                                            </Badge>
                                                            <Badge variant="outline" className="border-[#21AD00] text-[#21AD00] bg-[#21AD00]/5">
                                                                UI/UX Design
                                                            </Badge>
                                                            <Badge variant="outline" className="border-[#21AD00] text-[#21AD00] bg-[#21AD00]/5">
                                                                Programming
                                                            </Badge>
                                                            <Badge variant="outline" className="border-[#21AD00] text-[#21AD00] bg-[#21AD00]/5">
                                                                Project Management
                                                            </Badge>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Quick Facts */}
                                            <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-gray-200">
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-1">Durasi</p>
                                                    <p className="font-bold text-gray-900">3 Tahun</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-1">Sertifikasi</p>
                                                    <p className="font-bold text-gray-900">Kompetensi Nasional</p>
                                                </div>
                                            </div>

                                            <Link href={`/jurusan/${majors[0].slug}`}>
                                                <Button className="bg-[#21AD00] hover:bg-[#1a8a00] w-full lg:w-auto">
                                                    Lihat Selengkapnya
                                                    <ArrowRight className="ml-2 w-4 h-4" />
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. PROGRAM UNGGULAN SEKOLAH */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <Badge className="bg-[#E7974D]/10 text-[#E7974D] mb-4">Program Unggulan</Badge>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Program Unggulan SMK Bina Insan Mulia
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {schoolPrograms.length > 0 ? schoolPrograms.map((program: any, index: number) => {
                                const colors = [
                                    { bg: 'bg-[#21AD00]/10', text: 'text-[#21AD00]', hover: 'group-hover:bg-[#21AD00]' },
                                    { bg: 'bg-[#E7974D]/10', text: 'text-[#E7974D]', hover: 'group-hover:bg-[#E7974D]' },
                                    { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'group-hover:bg-purple-600' },
                                    { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'group-hover:bg-blue-600' },
                                ];
                                const color = colors[index % colors.length];
                                
                                return (
                                    <Card key={program.id} className="border-0 shadow-lg hover:shadow-xl transition-all group">
                                        <CardContent className="p-8 text-center">
                                            <div className={`w-16 h-16 rounded-2xl ${color.bg} flex items-center justify-center mx-auto mb-6 ${color.hover} group-hover:text-white transition-colors`}>
                                                <Lightbulb className={`w-8 h-8 ${color.text} group-hover:text-white`} />
                                            </div>
                                            <h3 className="font-bold text-xl mb-3 text-gray-900">{program.title}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">{program.description}</p>
                                        </CardContent>
                                    </Card>
                                );
                            }) : (
                                <>
                                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all group">
                                        <CardContent className="p-8 text-center">
                                            <div className="w-16 h-16 rounded-2xl bg-[#21AD00]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#21AD00] transition-colors">
                                                <Heart className="w-8 h-8 text-[#21AD00] group-hover:text-white" />
                                            </div>
                                            <h3 className="font-bold text-xl mb-3">Program Pembinaan Keagamaan</h3>
                                            <p className="text-gray-600 text-sm">Pembiasaan ibadah harian, kajian rutin, dan pembinaan akhlak.</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all group">
                                        <CardContent className="p-8 text-center">
                                            <div className="w-16 h-16 rounded-2xl bg-[#E7974D]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#E7974D] transition-colors">
                                                <Users className="w-8 h-8 text-[#E7974D] group-hover:text-white" />
                                            </div>
                                            <h3 className="font-bold text-xl mb-3">Program Kemitraan Industri</h3>
                                            <p className="text-gray-600 text-sm">Kerja sama dengan mitra industri untuk praktik kerja lapangan.</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all group">
                                        <CardContent className="p-8 text-center">
                                            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 transition-colors">
                                                <TrendingUp className="w-8 h-8 text-purple-600 group-hover:text-white" />
                                            </div>
                                            <h3 className="font-bold text-xl mb-3">Program Kewirausahaan</h3>
                                            <p className="text-gray-600 text-sm">Pembelajaran bisnis dasar dan simulasi usaha.</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all group">
                                        <CardContent className="p-8 text-center">
                                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                                                <Target className="w-8 h-8 text-blue-600 group-hover:text-white" />
                                            </div>
                                            <h3 className="font-bold text-xl mb-3">Bimbingan Karir & Studi Lanjut</h3>
                                            <p className="text-gray-600 text-sm">Konseling karir dan pendampingan pendaftaran kampus.</p>
                                        </CardContent>
                                    </Card>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. KEGIATAN & PRESTASI (MERGED) - More Attractive */}
            <section className="py-20 bg-gradient-to-br from-[#21AD00]/5 via-white to-emerald-50/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <Badge className="bg-[#21AD00]/10 text-[#21AD00] mb-4">Aktivitas & Prestasi</Badge>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Kegiatan Siswa & Prestasi Membanggakan
                            </h2>
                            <p className="text-gray-600 max-w-3xl mx-auto">
                                Aktivitas siswa tidak berhenti di dalam kelas. Berbagai kegiatan, ekstrakurikuler, dan prestasi 
                                menjadi bukti kesungguhan sekolah dalam mendampingi proses belajar.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {allActivities.length > 0 ? allActivities.slice(0, 6).map((activity: any) => {
                                const isAchievement = activity.type === 'achievement';
                                
                                return (
                                    <Card key={activity.id} className="border-0 shadow-lg hover:shadow-2xl transition-all group overflow-hidden">
                                        <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                            {activity.image ? (
                                                <img 
                                                    src={`/storage/${activity.image}`} 
                                                    alt={activity.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className={`w-full h-full bg-gradient-to-br ${isAchievement ? 'from-yellow-100 to-yellow-50' : 'from-[#21AD00]/10 to-emerald-50'} flex items-center justify-center`}>
                                                    {isAchievement ? (
                                                        <Award className="w-16 h-16 text-yellow-600/30" />
                                                    ) : (
                                                        <Calendar className="w-16 h-16 text-[#21AD00]/30" />
                                                    )}
                                                </div>
                                            )}
                                            {isAchievement && (
                                                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                    <Award className="w-3 h-3" />
                                                    Prestasi
                                                </div>
                                            )}
                                        </div>
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(activity.date).toLocaleDateString('id-ID')}</span>
                                            </div>
                                            <h3 className="font-bold text-xl mb-3 group-hover:text-[#21AD00] transition-colors line-clamp-2">
                                                {activity.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                                {activity.description}
                                            </p>
                                            <Link href={`/kegiatan/${activity.id}`} className="text-[#21AD00] font-medium text-sm hover:underline inline-flex items-center gap-1">
                                                Lihat selengkapnya
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </CardContent>
                                    </Card>
                                );
                            }) : (
                                <div className="col-span-3 text-center py-12">
                                    <p className="text-gray-500">Kegiatan dan prestasi akan segera ditampilkan.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. BERITA & ARTIKEL - Featured Layout */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <Badge className="bg-[#E7974D]/10 text-[#E7974D] mb-4">Berita & Artikel</Badge>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Berita & Artikel Terbaru
                            </h2>
                            <p className="text-gray-600 max-w-3xl mx-auto">
                                Ikuti perkembangan terbaru seputar kegiatan sekolah, informasi penting, 
                                serta artikel edukatif yang relevan bagi siswa dan orang tua.
                            </p>
                        </div>

                        {articles.length > 0 ? (
                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Featured Article - Large */}
                                <div className="lg:col-span-2">
                                    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all group overflow-hidden h-full">
                                        <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                                            {articles[0].featured_image ? (
                                                <img 
                                                    src={`/storage/${articles[0].featured_image}`} 
                                                    alt={articles[0].title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-[#E7974D]/10 to-orange-50 flex items-center justify-center">
                                                    <BookOpen className="w-24 h-24 text-[#E7974D]/30" />
                                                </div>
                                            )}
                                            <Badge className="absolute top-6 left-6 bg-[#21AD00] text-white shadow-lg">
                                                {articles[0].category || 'Berita Utama'}
                                            </Badge>
                                        </div>
                                        <CardContent className="p-8">
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(articles[0].published_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}</span>
                                            </div>
                                            <h3 className="font-bold text-2xl lg:text-3xl mb-4 group-hover:text-[#21AD00] transition-colors leading-tight">
                                                {articles[0].title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                                                {articles[0].excerpt}
                                            </p>
                                            <Link href={`/artikel/${articles[0].slug}`} className="text-[#21AD00] font-bold hover:underline inline-flex items-center gap-2">
                                                Baca selengkapnya
                                                <ArrowRight className="w-5 h-5" />
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Older Articles - Small List */}
                                <div className="space-y-6">
                                    {articles.slice(1, 4).map((article: any) => (
                                        <Card key={article.id} className="border-0 shadow-lg hover:shadow-xl transition-all group overflow-hidden">
                                            <div className="flex gap-4 p-4">
                                                <div className="w-24 h-24 rounded-xl bg-gray-100 relative overflow-hidden flex-shrink-0">
                                                    {article.featured_image ? (
                                                        <img 
                                                            src={`/storage/${article.featured_image}`} 
                                                            alt={article.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                                                            <BookOpen className="w-8 h-8 text-gray-300" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                                        <Calendar className="w-3 h-3" />
                                                        <span>{new Date(article.published_at).toLocaleDateString('id-ID')}</span>
                                                    </div>
                                                    <h4 className="font-bold text-sm mb-2 group-hover:text-[#21AD00] transition-colors line-clamp-2">
                                                        {article.title}
                                                    </h4>
                                                    <Link href={`/artikel/${article.slug}`} className="text-[#21AD00] font-medium text-xs hover:underline inline-flex items-center gap-1">
                                                        Baca
                                                        <ArrowRight className="w-3 h-3" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">Artikel akan segera ditampilkan.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 7. GALERI SINGKAT */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <Badge className="bg-[#21AD00]/10 text-[#21AD00] mb-4">Galeri</Badge>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Galeri Kegiatan & Fasilitas
                            </h2>
                            <p className="text-gray-600 max-w-3xl mx-auto">
                                Beberapa momen dan suasana di SMK Bina Insan Mulia yang menggambarkan lingkungan belajar, 
                                kegiatan siswa, dan fasilitas yang tersedia.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {galleries.length > 0 ? galleries.map((gallery: any) => (
                                <div key={gallery.id} className="aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all">
                                    {gallery.file_path ? (
                                        <img 
                                            src={`/storage/${gallery.file_path}`} 
                                            alt={gallery.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50"></div>
                                    )}
                                </div>
                            )) : (
                                <div className="col-span-3 text-center py-12">
                                    <p className="text-gray-500">Galeri akan segera ditampilkan.</p>
                                </div>
                            )}
                        </div>

                        <div className="text-center mt-8">
                            <Link href="/galeri/foto">
                                <Button variant="outline" size="lg" className="rounded-full border-2 border-[#21AD00] text-[#21AD00] hover:bg-[#21AD00]/5">
                                    Lihat Galeri Lengkap
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. TESTIMONI - More Attractive */}
            <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-orange-50/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <Badge className="bg-[#E7974D]/10 text-[#E7974D] mb-4">Testimoni</Badge>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Apa Kata Mereka?
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Dengarkan pengalaman dari orang tua siswa, alumni, dan mitra industri kami.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {testimonials.length > 0 ? testimonials.slice(0, 3).map((testimonial: any) => (
                                <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-all bg-white">
                                    <CardContent className="p-8 relative">
                                        <div className="absolute top-6 right-6 opacity-10">
                                            <Quote className="w-16 h-16 text-gray-900" />
                                        </div>
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <p className="text-gray-700 italic mb-6 leading-relaxed relative z-10">
                                            "{testimonial.content}"
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-[#21AD00]/10 flex items-center justify-center">
                                                <Users className="w-7 h-7 text-[#21AD00]" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{testimonial.name}</p>
                                                <p className="text-sm text-gray-600">{testimonial.role || 'Orang Tua Siswa'}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )) : (
                                <>
                                    <Card className="border-0 shadow-lg bg-white">
                                        <CardContent className="p-8 relative">
                                            <div className="absolute top-6 right-6 opacity-10">
                                                <Quote className="w-16 h-16 text-gray-900" />
                                            </div>
                                            <div className="flex items-center gap-1 mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                                ))}
                                            </div>
                                            <p className="text-gray-700 italic mb-6 leading-relaxed">
                                                "Sejak bersekolah di sini, anak saya jadi lebih disiplin dan punya gambaran jelas tentang masa depannya."
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-full bg-[#21AD00]/10 flex items-center justify-center">
                                                    <Users className="w-7 h-7 text-[#21AD00]" />
                                                </div>
                                                <div>
                                                    <p className="font-bold">Ibu Siti</p>
                                                    <p className="text-sm text-gray-600">Orang Tua Siswa</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-0 shadow-lg bg-white">
                                        <CardContent className="p-8 relative">
                                            <div className="absolute top-6 right-6 opacity-10">
                                                <Quote className="w-16 h-16 text-gray-900" />
                                            </div>
                                            <div className="flex items-center gap-1 mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                                ))}
                                            </div>
                                            <p className="text-gray-700 italic mb-6 leading-relaxed">
                                                "Bekal keterampilan dari SMK Bina Insan Mulia sangat membantu saya ketika mulai bekerja di industri."
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-full bg-[#21AD00]/10 flex items-center justify-center">
                                                    <Users className="w-7 h-7 text-[#21AD00]" />
                                                </div>
                                                <div>
                                                    <p className="font-bold">Ahmad Fauzi</p>
                                                    <p className="text-sm text-gray-600">Alumni 2022</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. CTA PENUTUP */}
            <section className="py-20 bg-gradient-to-r from-[#21AD00] via-[#1a8a00] to-[#21AD00] text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <Sparkles className="w-16 h-16 mx-auto mb-6 text-white/80" />
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                            Siap Bergabung dengan SMK Bina Insan Mulia?
                        </h2>
                        <p className="text-lg text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Jika Anda ingin anak memiliki keterampilan kerja, karakter yang kuat, dan bimbingan yang serius 
                            dalam menghadapi masa depan, SMK Bina Insan Mulia siap menjadi mitra pendidikan Anda.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/ppdb/register">
                                <Button size="lg" className="bg-white text-[#21AD00] hover:bg-gray-50 h-14 px-8 text-lg font-bold shadow-xl">
                                    Daftar PPDB
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/kontak">
                                <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#21AD00] h-14 px-8 text-lg font-bold transition-all">
                                    Hubungi Admin Sekolah
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

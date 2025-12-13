import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Target, Flag, History, Award, Users, UserCheck, Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
    schoolProfile: any;
}

export default function Profile({ schoolProfile }: Props) {
    return (
        <PublicLayout>
            <Head title="Profil Sekolah" />

            {/* 1. Header Hero */}
            <div className="bg-[#F8FDF9] dark:bg-slate-950 py-20 border-b border-green-50 dark:border-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Badge className="bg-white dark:bg-slate-900 text-primary border-primary/20 mb-4 px-4 py-1">Tentang Kami</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Mengenal Lebih Dekat <br/><span className="text-primary">{schoolProfile?.name || 'SMK Bina Insan Mulia'}</span></h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                        Mewujudkan lembaga pendidikan yang unggul dalam prestasi, berkarakter, dan berwawasan lingkungan berlandaskan nilai-nilai keagamaan.
                    </p>
                </div>
            </div>

            {/* 2. Sambutan Kepala Sekolah (Headmaster Profile) */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/3 relative">
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 border-[8px] border-white shadow-xl relative z-10">
                                {schoolProfile?.headmaster_photo ? (
                                    <img src={`/storage/${schoolProfile.headmaster_photo}`} alt="Kepala Sekolah" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                        <UserCheck size={64} />
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/10 rounded-full blur-2xl -z-0"></div>
                        </div>
                        <div className="md:w-2/3">
                            <Quote className="text-secondary/20 w-20 h-20 mb-4" />
                            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Sambutan Kepala Sekolah</h2>
                            <h3 className="text-xl text-primary font-semibold mb-6">{schoolProfile?.headmaster_name || 'Nama Kepala Sekolah'}</h3>
                            <div className="prose prose-lg text-gray-600 dark:text-gray-300">
                                <p className="leading-relaxed">
                                    "{schoolProfile?.headmaster_quote || schoolProfile?.description || 'Selamat datang di website resmi kami. Kami berkomitmen untuk memberikan layanan pendidikan terbaik bagi putra-putri bangsa.'}"
                                </p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800 flex gap-12">
                                <div>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white">25+</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Tahun Pengalaman</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white">100+</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Guru Tersertifikasi</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* 3. Visi & Misi */}
             <section className="py-20 bg-[#FFF8F2] dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Visi */}
                        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Target size={120} />
                            </div>
                            <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-primary mb-6">
                                <Target size={32} />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Visi Sekolah</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                {schoolProfile?.vision || 'Menjadi sekolah kejuruan unggulan yang menghasilkan lulusan kompeten, berakhlak mulia, dan siap bersaing di tingkat global.'}
                            </p>
                        </div>

                        {/* Misi */}
                        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Flag size={120} />
                            </div>
                            <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-secondary mb-6">
                                <Flag size={32} />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Misi Sekolah</h2>
                            <div className="text-gray-600 dark:text-gray-300 space-y-3">
                                {schoolProfile?.mission ? (
                                    <div className="whitespace-pre-line leading-relaxed">{schoolProfile.mission}</div>
                                ) : (
                                    <ul className="space-y-3">
                                        <li className="flex gap-3"><span className="w-2 h-2 mt-2 rounded-full bg-secondary flex-shrink-0"></span> Menyelenggarakan pendidikan berkualitas.</li>
                                        <li className="flex gap-3"><span className="w-2 h-2 mt-2 rounded-full bg-secondary flex-shrink-0"></span> Mengembangkan potensi siswa secara optimal.</li>
                                        <li className="flex gap-3"><span className="w-2 h-2 mt-2 rounded-full bg-secondary flex-shrink-0"></span> Menjalin kerjasama dengan dunia industri.</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Sejarah Singkat */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white mb-4">
                            <History size={24} />
                        </div>
                        <h2 className="text-3xl font-bold">Sejarah Perjalanan</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 bg-slate-50 dark:bg-slate-800 p-10 rounded-[2rem]">
                        <p className="whitespace-pre-wrap leading-loose">
                            {schoolProfile?.history || 'SMK Bina Insan Mulia didirikan pada tahun... (Konten sejarah belum diisi). Sekolah ini berawal dari semangat untuk memajukan pendidikan kejuruan di wilayah ini.'}
                        </p>
                    </div>
                </div>
            </section>

             {/* 5. Fasilitas & Keunggulan (Optional Grid) */}
             <section className="py-20 bg-primary/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold">Kenapa Memilih Kami?</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Terakreditasi A', icon: Award },
                            { label: 'Guru Profesional', icon: Users },
                            { label: 'Fasilitas Lengkap', icon: Target },
                            { label: 'Lulusan Berkualitas', icon: UserCheck },
                        ].map((item, i) => (
                            <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
                                    <item.icon className="w-10 h-10 text-primary mb-4" />
                                    <h3 className="font-bold text-gray-900 dark:text-white">{item.label}</h3>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
             </section>

        </PublicLayout>
    );
}

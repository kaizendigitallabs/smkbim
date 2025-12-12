import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, BookOpen, CheckCircle, GraduationCap } from 'lucide-react';

export default function Show({ major, otherMajors }: { major: any, otherMajors: any[] }) {
    return (
        <PublicLayout>
            <Head title={major.name} />
            
            {/* Hero */}
            <div className="bg-[#F8FDF9] py-16 border-b border-green-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                         <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                            <GraduationCap size={40} />
                        </div>
                        <div className="text-center md:text-left">
                            <Link href={route('program.majors.index')} className="inline-flex items-center text-gray-500 hover:text-primary mb-2 transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Daftar Jurusan
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{major.name}</h1>
                            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">Kompetensi Keahlian</Badge>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card className="border-0 shadow-sm overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
                            <CardContent className="p-8 md:p-10 space-y-8">
                                <div>
                                    <h3 className="flex items-center text-xl font-bold text-gray-900 mb-6 pb-4 border-b">
                                        <BookOpen className="w-5 h-5 mr-3 text-primary" />
                                        Deskripsi Kompetensi
                                    </h3>
                                    <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                                        <div dangerouslySetInnerHTML={{ __html: major.description || '<p>Deskripsi jurusan ini belum tersedia secara lengkap.</p>' }} />
                                    </div>
                                </div>
                                
                                {/* Placeholder for curriculum or career prospects if they existed */}
                                <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                                        <CheckCircle className="w-5 h-5 mr-2 text-secondary" />
                                        Kenapa Memilih Jurusan Ini?
                                    </h4>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex gap-2"><span className="text-primary">•</span> Kurikulum berbasis industri terkini.</li>
                                        <li className="flex gap-2"><span className="text-primary">•</span> Fasilitas praktek yang lengkap dan modern.</li>
                                        <li className="flex gap-2"><span className="text-primary">•</span> Peluang magang dan kerja yang luas.</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                            <h3 className="font-bold text-lg mb-6 pb-2 border-b">Jurusan Lainnya</h3>
                            <ul className="space-y-3">
                                {otherMajors.map((m) => (
                                     <li key={m.slug}>
                                        <Link 
                                            href={route('program.majors.show', m.slug)} 
                                            className="group flex items-center p-3 rounded-lg hover:bg-green-50 transition-all border border-transparent hover:border-green-100"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-primary transition-colors shrink-0">
                                                <GraduationCap size={16} />
                                            </div>
                                            <span className="ml-3 text-gray-600 font-medium group-hover:text-primary transition-colors line-clamp-1">{m.name}</span>
                                        </Link>
                                     </li>
                                ))}
                            </ul>
                            <div className="mt-8 pt-6 border-t text-center">
                                <p className="text-sm text-gray-500 mb-4">Masih bingung memilih jurusan?</p>
                                <Link href={route('contact')} className="inline-block w-full">
                                    <Badge className="w-full justify-center py-2 cursor-pointer bg-secondary hover:bg-secondary/90 text-white">Konsultasi Jurusan</Badge>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

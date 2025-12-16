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
            <div className="bg-[#F8FDF9] dark:bg-slate-900 py-16 border-b border-green-50 dark:border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className={`flex flex-col md:flex-row items-center gap-8 ${otherMajors.length > 0 ? '' : 'md:justify-center'}`}>
                         <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-slate-700">
                            <GraduationCap size={40} />
                        </div>
                        <div className={`text-center ${otherMajors.length > 0 ? 'md:text-left' : 'md:text-left'}`}>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">{major.name}</h1>
                            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">Kompetensi Keahlian</Badge>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {otherMajors.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content (With Sidebar) */}
                        <div className="lg:col-span-2">
                            <Card className="border-0 shadow-sm overflow-hidden bg-white dark:bg-slate-900">
                                <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
                                <CardContent className="p-8 md:p-10 space-y-8">
                                    <div>
                                        <h3 className="flex items-center text-xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
                                            <BookOpen className="w-5 h-5 mr-3 text-primary" />
                                            Deskripsi Kompetensi
                                        </h3>
                                        <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 leading-relaxed dark:prose-invert">
                                            <div dangerouslySetInnerHTML={{ __html: major.description || '<p>Deskripsi jurusan ini belum tersedia secara lengkap.</p>' }} />
                                        </div>
                                    </div>
                                    
                                    <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-xl border border-yellow-100 dark:border-yellow-900/20">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                            <CheckCircle className="w-5 h-5 mr-2 text-secondary" />
                                            Kenapa Memilih Jurusan Ini?
                                        </h4>
                                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
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
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm sticky top-24">
                                <h3 className="font-bold text-lg mb-6 pb-2 border-b border-gray-100 dark:border-slate-800 text-gray-900 dark:text-white">Jurusan Lainnya</h3>
                                <ul className="space-y-3">
                                    {otherMajors.map((m) => (
                                         <li key={m.slug}>
                                            <Link 
                                                href={route('program.majors.show', m.slug)} 
                                                className="group flex items-center p-3 rounded-lg hover:bg-green-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-green-100 dark:hover:border-slate-700"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-primary transition-colors shrink-0">
                                                    <GraduationCap size={16} />
                                                </div>
                                                <span className="ml-3 text-gray-600 dark:text-gray-300 font-medium group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-1">{m.name}</span>
                                            </Link>
                                         </li>
                                    ))}
                                </ul>
                                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 text-center">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Masih bingung memilih jurusan?</p>
                                    <Link href={route('contact.index')} className="inline-block w-full">
                                        <Badge className="w-full justify-center py-2 cursor-pointer bg-secondary hover:bg-secondary/90 text-white">Konsultasi Jurusan</Badge>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Centered Content (No Sidebar)
                    <div className="max-w-5xl mx-auto w-full">
                        <Card className="border-0 shadow-sm overflow-hidden bg-white dark:bg-slate-900">
                            <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
                            <CardContent className="p-8 md:p-10 space-y-8">
                                <div>
                                    <h3 className="flex items-center text-xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
                                        <BookOpen className="w-5 h-5 mr-3 text-primary" />
                                        Deskripsi Kompetensi
                                    </h3>
                                    <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 leading-relaxed dark:prose-invert">
                                        <div dangerouslySetInnerHTML={{ __html: major.description || '<p>Deskripsi jurusan ini belum tersedia secara lengkap.</p>' }} />
                                    </div>
                                </div>
                                
                                <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-xl border border-yellow-100 dark:border-yellow-900/20">
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                        <CheckCircle className="w-5 h-5 mr-2 text-secondary" />
                                        Kenapa Memilih Jurusan Ini?
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                        <li className="flex gap-2"><span className="text-primary">•</span> Kurikulum berbasis industri terkini.</li>
                                        <li className="flex gap-2"><span className="text-primary">•</span> Fasilitas praktek yang lengkap dan modern.</li>
                                        <li className="flex gap-2"><span className="text-primary">•</span> Peluang magang dan kerja yang luas.</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}

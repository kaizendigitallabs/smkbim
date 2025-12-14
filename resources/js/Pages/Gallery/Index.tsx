import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Monitor, Trophy } from 'lucide-react';

export default function Index({ projects }: { projects: any }) {
    return (
        <PublicLayout>
            <Head title="Karya Siswa" />

            {/* Hero */}
            <div className="bg-[#F8FDF9] dark:bg-slate-950 py-20 border-b border-green-50 dark:border-slate-900 transition-colors duration-300">
                <div className="container mx-auto px-4 text-center">
                    <Badge className="bg-white dark:bg-slate-900 text-primary border-primary/20 mb-4 px-4 py-1">Portofolio Siswa</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Karya & Inovasi Siswa</h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg">
                        Hasil karya kreatif dan inovatif dari siswa-siswi SMK Bina Insan Mulia.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {projects.data?.length > 0 ? projects.data.map((px: any) => (
                        <div key={px.id} className="group h-full">
                            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border-t-4 border-t-transparent hover:border-t-primary">
                                <div className="aspect-video bg-gray-100 dark:bg-slate-800 relative overflow-hidden">
                                    {px.thumbnail ? (
                                        <img 
                                            src={`/storage/${px.thumbnail}`} 
                                            alt={px.title}
                                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" 
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-50 dark:bg-slate-800">
                                            <Monitor size={48} className="mb-2 opacity-50" />
                                            <span className="text-sm">No Preview</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm text-primary uppercase tracking-wide">
                                        Project
                                    </div>
                                </div>
                                <CardContent className="p-8 flex-1 flex flex-col">
                                    <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                        {px.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                         {px.technologies?.split(',').map((tech: string, i: number) => (
                                             <span key={i} className="px-3 py-1 bg-green-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-md border border-green-100 dark:border-slate-700">
                                                {tech.trim()}
                                             </span>
                                         ))}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed mb-6 flex-1">
                                        {px.description || "Deskripsi project belum tersedia."}
                                    </p>
                                    
                                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-sm">
                                        <span className="text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                            <Code2 size={14} /> Created by Student
                                        </span>
                                        {px.url && (
                                            <a href={px.url} target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
                                                Live Demo &rarr;
                                            </a>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                     )) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="bg-gray-50 dark:bg-slate-900 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-inner">
                                <Trophy className="text-gray-300 dark:text-slate-700 w-12 h-12" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Belum ada karya ditampilkan</h3>
                            <p className="text-gray-500 dark:text-gray-400">Nantikan update karya terbaik siswa kami.</p>
                        </div>
                     )}
                </div>
                </div>
            </div>
        </PublicLayout>
    );
}

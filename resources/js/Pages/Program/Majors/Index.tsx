import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { Briefcase, ArrowRight, Laptop, PenTool, Settings } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Index({ majors }: { majors: any[] }) {
    return (
        <PublicLayout>
            <Head title="Jurusan" />
            
            {/* Header Hero */}
            <div className="bg-[#F8FDF9] dark:bg-slate-950 py-20 border-b border-green-50 dark:border-slate-900 transition-colors duration-300">
                <div className="container mx-auto px-4 text-center">
                    <Badge className="bg-white dark:bg-slate-900 text-primary border-primary/20 mb-4 px-4 py-1">Program Keahlian</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Pilih Masa Depanmu</h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        SMK Bina Insan Mulia menyediakan berbagai kompetensi keahlian yang relevan dengan kebutuhan industri saat ini.
                    </p>
                </div>
            </div>

            {/* Majors Grid */}
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {majors?.map((major, index) => (
                        <Card key={major.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden bg-white dark:bg-slate-900">
                            <div className="h-2 bg-gradient-to-r from-primary to-secondary w-full"></div>
                            <CardContent className="p-8">
                                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <Briefcase size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                    {major.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3">
                                    {major.description || 'Pelajari keterampilan teknis dan profesional di bidang ini untuk mempersiapkan karir masa depan yang gemilang.'}
                                </p>
                            </CardContent>
                            <CardFooter className="p-8 pt-0">
                                <Link href={route('program.majors.show', major.slug)} className="w-full">
                                    <Button variant="outline" className="w-full border-gray-200 dark:border-slate-800 dark:text-white hover:border-primary hover:text-primary group-hover:bg-primary/5 dark:group-hover:bg-primary/10">
                                        Lihat Detail Jurusan <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                    
                    {/* Fallback if empty (optional, but good for preview) */}
                    {majors?.length === 0 && (
                        <div className="col-span-3 text-center py-12 text-gray-500 dark:text-gray-400">
                            Belum ada data jurusan.
                        </div>
                    )}
                </div>
                </div>
            </div>
        </PublicLayout>
    );
}

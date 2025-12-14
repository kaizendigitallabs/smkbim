import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Image as ImageIcon } from 'lucide-react';

export default function Index({ activities, title }: { activities: any, title: string }) {
    return (
        <PublicLayout>
            <Head title={title} />
            
             {/* Hero */}
             <div className="bg-[#F8FDF9] dark:bg-slate-950 py-20 border-b border-green-50 dark:border-slate-900 transition-colors duration-300">
                <div className="container mx-auto px-4 text-center">
                    <Badge className="bg-white dark:bg-slate-900 text-primary border-primary/20 mb-4 px-4 py-1">Kegiatan</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{title}</h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg">
                        Dokumentasi kegiatan dan agenda sekolah yang telah dan akan terlaksana.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activities.data?.length > 0 ? activities.data.map((item: any) => (
                         <Card key={item.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col bg-white dark:bg-slate-900">
                            <div className="aspect-video bg-gray-100 dark:bg-slate-800 relative overflow-hidden">
                                {item.cover_image ? (
                                    <img 
                                        src={`/storage/${item.cover_image}`} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-slate-600">
                                        <ImageIcon className="w-12 h-12 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                     <Badge className="bg-white/90 dark:bg-slate-900/90 text-gray-900 dark:text-white backdrop-blur-sm border-0 shadow-sm flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3" />
                                        {item.date || 'Tanggal tidak tersedia'}
                                     </Badge>
                                </div>
                            </div>
                            <CardContent className="p-6 flex-1 flex flex-col">
                                <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                                    {item.description || item.excerpt || 'Tidak ada deskripsi.'}
                                </p>
                            </CardContent>
                        </Card>
                    )) : (
                        <div className="col-span-full text-center py-20 bg-gray-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-800">
                            <ImageIcon className="w-16 h-16 text-gray-300 dark:text-slate-700 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Belum ada kegiatan</h3>
                            <p className="text-gray-500 dark:text-gray-400">Saat ini belum ada data kegiatan yang ditampilkan.</p>
                        </div>
                    )}
                </div>
                
                {/* Pagination (if exists) */}
                {activities.links && (
                    <div className="mt-12 flex justify-center">
                         {/* Simple styling for pagination links would go here, usually handled by a reusable Pagination component */}
                    </div>
                )}
                </div>
            </div>
        </PublicLayout>
    );
}

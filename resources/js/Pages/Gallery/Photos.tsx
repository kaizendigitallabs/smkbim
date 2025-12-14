import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Image as ImageIcon, ZoomIn } from 'lucide-react';

export default function Photos({ galleries }: { galleries: any }) {
    return (
        <PublicLayout>
            <Head title="Galeri Foto" />
            
            {/* Hero */}
            <div className="bg-[#F8FDF9] dark:bg-slate-950 py-20 border-b border-green-50 dark:border-slate-900 transition-colors duration-300">
                <div className="container mx-auto px-4 text-center">
                    <Badge className="bg-white dark:bg-slate-900 text-primary border-primary/20 mb-4 px-4 py-1">Dokumentasi</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Galeri Foto Sekolah</h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg">
                        Kumpulan momen berharga dan aktivitas seru di lingkungan SMK Bina Insan Mulia.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {galleries.data?.length > 0 ? galleries.data.map((item: any) => (
                        <div key={item.id} className="group relative break-inside-avoid">
                             <Card className="border-0 shadow-sm overflow-hidden rounded-2xl bg-white dark:bg-slate-900">
                                <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-slate-800">
                                     {item.file_path ? (
                                        <img 
                                            src={`/storage/${item.file_path}`} 
                                            alt={item.title} 
                                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" 
                                        />
                                     ) : (
                                        <div className="flex items-center justify-center h-full text-gray-300 dark:text-slate-600">
                                            <ImageIcon size={48} />
                                        </div>
                                     )}
                                     
                                     {/* Overlay */}
                                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                        <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mx-auto mb-3 hover:bg-white hover:text-primary transition-colors cursor-pointer">
                                                <ZoomIn size={24} />
                                            </div>
                                            <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">{item.title}</h3>
                                            <p className="text-gray-300 text-xs mt-1">{item.category || 'Galeri Umum'}</p>
                                        </div>
                                     </div>
                                </div>
                             </Card>
                        </div>
                    )) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="bg-gray-50 dark:bg-slate-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                                <ImageIcon className="text-gray-300 dark:text-slate-600 w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Belum ada foto</h3>
                            <p className="text-gray-500 dark:text-gray-400">Galeri foto akan segera diupdate.</p>
                        </div>
                    )}
                </div>
                
                 {/* Pagination if needed */}
                 {galleries.links && (
                    <div className="mt-12">
                        {/* Pagination component would go here */}
                    </div>
                 )}
                </div>
            </div>
        </PublicLayout>
    );
}

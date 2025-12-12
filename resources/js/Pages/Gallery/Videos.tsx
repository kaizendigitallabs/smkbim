import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle, Video as VideoIcon } from 'lucide-react';

export default function Videos({ galleries }: { galleries: any }) {
    return (
        <PublicLayout>
            <Head title="Galeri Video" />
            
            {/* Hero */}
            <div className="bg-[#F8FDF9] py-20 border-b border-green-50">
                <div className="container mx-auto px-4 text-center">
                    <Badge className="bg-white text-primary border-primary/20 mb-4 px-4 py-1">Dokumentasi Video</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Galeri Video Sekolah</h1>
                    <p className="text-gray-600 max-w-xl mx-auto text-lg">
                        Saksikan berbagai kegiatan dan profil sekolah melalui koleksi video kami.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleries.data?.length > 0 ? galleries.data.map((item: any) => (
                        <div key={item.id} className="group">
                             <Card className="border-0 shadow-lg overflow-hidden rounded-2xl h-full flex flex-col bg-black/5">
                                <div className="aspect-video bg-black relative overflow-hidden group-hover:shadow-xl transition-shadow">
                                    {item.youtube_url ? (
                                        <iframe 
                                            src={item.youtube_url.replace('watch?v=', 'embed/')} 
                                            className="w-full h-full" 
                                            allowFullScreen 
                                            title={item.title}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-white/50">
                                            <VideoIcon size={48} className="mb-2 opacity-50" />
                                            <span className="text-sm">Video tidak tersedia</span>
                                        </div>
                                    )}
                                 </div>
                                 <CardContent className="p-6 bg-white flex-1 flex flex-col">
                                     <h3 className="font-bold text-xl mb-2 text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                                        {item.title}
                                     </h3>
                                     <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                        {item.description || "Tonton video selengkapnya."}
                                     </p>
                                     <div className="mt-auto flex items-center text-sm font-medium text-primary">
                                        <PlayCircle className="w-4 h-4 mr-2" />
                                        Putar Video
                                     </div>
                                 </CardContent>
                             </Card>
                        </div>
                    )) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                                <VideoIcon className="text-gray-300 w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Belum ada video</h3>
                            <p className="text-gray-500">Galeri video akan segera diupdate.</p>
                        </div>
                    )}
                </div>
                
                 {/* Pagination */}
                 {galleries.links && (
                    <div className="mt-12">
                         {/* Centered pagination would go here */}
                    </div>
                 )}
                </div>
                </div>
            </div>
        </PublicLayout>
    );
}

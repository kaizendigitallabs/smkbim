import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Search, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Index({ articles, currentCategory }: { articles: any, currentCategory: string }) {
    const [search, setSearch] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('articles.index'), { search }, { preserveState: true });
    };

    return (
        <PublicLayout>
            <Head title="Artikel & Berita" />
            
            {/* Standard Hero */}
            <div className="bg-[#F8FDF9] dark:bg-slate-950 py-20 border-b border-green-50 dark:border-slate-900">
                <div className="container mx-auto px-4 text-center">
                    <Badge className="bg-white dark:bg-slate-900 text-primary border-primary/20 mb-4 px-4 py-1">Informasi</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Berita & Artikel Terkini</h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-lg mb-8">
                        Dapatkan informasi terbaru seputar kegiatan sekolah, prestasi siswa, dan artikel edukatif lainnya.
                    </p>
                    
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
                        <Input 
                            type="text" 
                            placeholder="Cari artikel..." 
                            className="pl-12 h-12 rounded-full shadow-sm border-gray-200 dark:border-slate-700 focus:border-primary dark:focus:border-primary focus:ring-primary/20 dark:focus:ring-primary/20 dark:bg-slate-900"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </form>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-7xl mx-auto">
                {currentCategory && (
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Kategori: <span className="text-primary">{currentCategory}</span></h2>
                        <Link href={route('articles.index')} className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary">Reset Filter</Link>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.data?.length > 0 ? articles.data.map((article: any) => (
                        <Link key={article.id} href={route('articles.show', article.slug)} className="group h-full">
                            <Card className="h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col bg-white dark:bg-slate-900">
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <Badge className="absolute top-4 left-4 z-10 bg-white dark:bg-slate-900/90 text-gray-900 dark:text-white border-0 backdrop-blur-sm shadow-sm hover:bg-white dark:bg-slate-900">
                                        {article.category}
                                    </Badge>
                                    {article.image ? (
                                        <img src={`/storage/${article.image}`} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                                    )}
                                </div>
                                <CardContent className="flex-1 p-6 flex flex-col">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm mb-6 flex-1">
                                        {article.excerpt}
                                    </p>
                                    <div className="text-primary font-bold text-sm flex items-center mt-auto group-hover:translate-x-1 transition-transform">
                                        Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )) : (
                        <div className="col-span-3 text-center py-20 bg-gray-50 dark:bg-slate-800 rounded-2xl">
                            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tidak ada artikel ditemukan</h3>
                            <p className="text-gray-500 dark:text-gray-400">Coba kata kunci lain atau kembali lagi nanti.</p>
                        </div>
                    )}
                </div>
                </div>
            </div>
        </PublicLayout>
    );
}

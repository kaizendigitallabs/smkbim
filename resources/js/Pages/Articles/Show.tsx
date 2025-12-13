import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Show({ article, relatedArticles }: { article: any, relatedArticles: any[] }) {
    return (
        <PublicLayout>
            <Head title={article.title} />
            
            {/* Breadcrumb / Back */}
            <div className="bg-gray-50 dark:bg-slate-900 border-b dark:border-slate-800">
                <div className="container mx-auto px-4 py-4">
                    <Link href="/berita" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary flex items-center gap-1">
                        <ArrowLeft size={14} /> Kembali ke Berita
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                 <div className="mb-8 text-center">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 mb-6 px-4 py-1.5 text-sm uppercase tracking-wider">{article.category}</Badge>
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">{article.title}</h1>
                    <div className="flex items-center justify-center gap-6 text-gray-500 dark:text-gray-400 text-sm">
                        <div className="flex items-center gap-2">
                             <Calendar size={16} />
                             {new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        {article.author && (
                            <div className="flex items-center gap-2">
                                <User size={16} />
                                {article.author}
                            </div>
                        )}
                    </div>
                 </div>

                 {article.image && (
                    <div className="rounded-3xl overflow-hidden mb-12 shadow-xl border-4 border-white dark:border-slate-700 bg-gray-100 dark:bg-slate-800">
                        <img src={`/storage/${article.image}`} alt={article.title} className="w-full object-cover max-h-[500px]" />
                    </div>
                 )}

                 <div className="prose prose-lg prose-green dark:prose-invert max-w-none mb-20 text-gray-700 dark:text-gray-300 leading-loose">
                     {/* Dangerous HTML rendering for article content usually */}
                     <div dangerouslySetInnerHTML={{ __html: article.content }} />
                 </div>

                 {relatedArticles.length > 0 && (
                    <div className="border-t pt-16">
                        <h3 className="text-2xl font-bold mb-8">Artikel Terkait</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map((rel) => (
                                <Link href={route('articles.show', rel.slug)} key={rel.id} className="group h-full">
                                    <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col bg-white dark:bg-slate-900">
                                        <div className="aspect-video bg-gray-100 dark:bg-slate-800 relative overflow-hidden">
                                           {rel.image && (
                                                <img src={`/storage/${rel.image}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                           )}
                                        </div>
                                        <CardContent className="p-5 flex-1 flex flex-col">
                                            <div className="text-xs text-primary font-bold uppercase mb-2">{rel.category}</div>
                                            <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 mb-2">{rel.title}</h4>
                                            <div className="mt-auto text-xs text-gray-400">
                                                {new Date(rel.published_at).toLocaleDateString()}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                 )}
            </div>
        </PublicLayout>
    );
}

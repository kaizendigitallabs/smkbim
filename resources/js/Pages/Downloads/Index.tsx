import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, FileText, File as FileIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Index({ downloads }: { downloads: any[] }) {
    
    // Helper for file icon
    const getFileIcon = (filename: string) => {
        if (filename.endsWith('.pdf')) return <FileText className="text-red-500" size={24} />;
        return <FileIcon className="text-blue-500" size={24} />;
    };

    return (
        <PublicLayout>
            <Head title="Download Center" />

            {/* Hero */}
            <div className="bg-[#F8FDF9] dark:bg-slate-950 py-20 border-b border-green-50 dark:border-slate-900 transition-colors duration-300">
                <div className="container mx-auto px-4 text-center">
                    <Badge className="bg-white dark:bg-slate-900 text-primary border-primary/20 mb-4 px-4 py-1">Resources</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Download Center</h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg">
                        Unduh berbagai dokumen, formulir, dan panduan akademik resmi dari sekolah.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20 max-w-5xl">
                <div className="grid gap-4">
                     {downloads?.length > 0 ? downloads.map((item) => (
                        <div key={item.id} className="group">
                             <Card className="border p-6 flex flex-col sm:flex-row sm:items-center gap-6 hover:shadow-lg transition-all duration-300 rounded-2xl group-hover:border-primary/30 bg-white dark:bg-slate-900 dark:border-slate-800">
                                <div className="h-14 w-14 rounded-2xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-primary/5 dark:group-hover:bg-primary/10 transition-colors">
                                    {getFileIcon(item.file_path)}
                                </div>
                                
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{item.description || "Dokumen resmi sekolah untuk diunduh."}</p>
                                </div>
                                
                                <a href={`/storage/${item.file_path}`} download className="shrink-0">
                                    <Button className="rounded-full bg-white dark:bg-slate-800 border-2 border-primary dark:border-primary text-primary dark:text-white hover:bg-primary hover:text-white font-bold px-6 shadow-sm">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                </a>
                             </Card>
                        </div>
                     )) : (
                        <div className="py-20 text-center border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-3xl bg-gray-50 dark:bg-slate-900">
                            <div className="bg-gray-50 dark:bg-slate-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                                <FileIcon className="text-gray-300 dark:text-slate-600 w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Belum ada file</h3>
                            <p className="text-gray-500 dark:text-gray-400">File download akan segera tersedia.</p>
                        </div>
                     )}
                </div>
            </div>
        </PublicLayout>
    );
}

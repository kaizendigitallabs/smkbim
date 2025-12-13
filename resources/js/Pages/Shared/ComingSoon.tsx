import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ComingSoon() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
            <Head title="Coming Soon" />
            
            <div className="text-center space-y-6 max-w-lg">
                <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Construction className="h-12 w-12 text-primary" />
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Sedang Dalam Pengembangan
                </h1>
                
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Halaman ini sedang dipersiapkan untuk memberikan pengalaman terbaik bagi Anda. Silakan kembali lagi nanti.
                </p>

                <div className="pt-8">
                    <Link href="/portal">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Portal
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Rocket, Target, BookOpen } from 'lucide-react';

export default function Featured({ programs }: { programs: any[] }) {
    
    // Helper to get random icon
    const getIcon = (index: number) => {
        const icons = [Lightbulb, Rocket, Target, BookOpen];
        return icons[index % icons.length];
    };

    return (
        <PublicLayout>
            <Head title="Program Unggulan" />

            {/* Hero */}
            <div className="bg-[#F8FDF9] py-20 border-b border-green-50">
                <div className="container mx-auto px-4 text-center">
                    <Badge className="bg-white text-primary border-primary/20 mb-4 px-4 py-1">Excellent Programs</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Program Unggulan Sekolah</h1>
                    <p className="text-gray-600 max-w-xl mx-auto text-lg">
                        Berbagai program khusus yang dirancang untuk meningkatkan kompetensi dan karakter siswa.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-7xl mx-auto">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs?.length > 0 ? programs.map((p, index) => {
                        const Icon = getIcon(index);
                        return (
                            <div key={p.id} className="group">
                                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white relative overflow-hidden">
                                     <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                                        <Icon size={120} className="text-primary" />
                                     </div>
                                     <CardContent className="p-8 relative z-10 flex flex-col h-full">
                                        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                                            <Icon size={28} />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors">
                                            {p.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {p.description}
                                        </p>
                                     </CardContent>
                                </Card>
                            </div>
                        );
                    }) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                <Rocket className="text-gray-300 w-12 h-12" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum ada program unggulan</h3>
                            <p className="text-gray-500">Program unggulan akan segera ditambahkan.</p>
                        </div>
                    )}
                </div>
                </div>
            </div>
        </PublicLayout>
    );
}

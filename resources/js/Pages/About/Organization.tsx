import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Building2 } from 'lucide-react';

export default function Organization({ schoolProfile }: { schoolProfile: any }) {
    return (
        <PublicLayout>
            <Head title="Struktur Organisasi" />
            
            {/* Hero */}
            <div className="bg-[#F8FDF9] py-20 border-b border-green-50">
                <div className="container mx-auto px-4 text-center">
                    <Badge className="bg-white text-primary border-primary/20 mb-4 px-4 py-1">Profil Sekolah</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Struktur Organisasi</h1>
                    <p className="text-gray-600 max-w-xl mx-auto text-lg">
                        Struktur kepemimpinan dan organisasi SMK Bina Insan Mulia yang profesional dan berpengalaman.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-7xl mx-auto">
                    {/* Kepala Sekolah */}
                    <div className="mb-16 text-center">
                        <Card className="border-0 shadow-xl max-w-md mx-auto overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-[#21AD00] to-[#E7974D]"></div>
                            <CardContent className="p-8">
                                <div className="w-24 h-24 bg-[#21AD00]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Award className="w-12 h-12 text-[#21AD00]" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {schoolProfile?.principal_name || 'Nama Kepala Sekolah'}
                                </h3>
                                <p className="text-[#21AD00] font-semibold mb-4">Kepala Sekolah</p>
                                <p className="text-gray-600 text-sm">
                                    Memimpin dan mengelola seluruh kegiatan sekolah dengan visi mencetak lulusan yang kompeten dan berkarakter.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Wakil Kepala Sekolah & Staff */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {[
                            { title: 'Wakil Kepala Kurikulum', icon: Building2, desc: 'Mengelola dan mengembangkan kurikulum sekolah' },
                            { title: 'Wakil Kepala Kesiswaan', icon: Users, desc: 'Membina dan mengembangkan potensi siswa' },
                            { title: 'Wakil Kepala Sarana & Prasarana', icon: Building2, desc: 'Mengelola fasilitas dan infrastruktur sekolah' }
                        ].map((item, index) => (
                            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all group">
                                <CardContent className="p-6">
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#21AD00]/10 transition-colors">
                                        <item.icon className="w-8 h-8 text-[#21AD00]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Organizational Chart Placeholder */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 border-2 border-dashed border-gray-200">
                        <div className="text-center">
                            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Bagan Organisasi</h3>
                            <p className="text-gray-500 max-w-2xl mx-auto">
                                Bagan struktur organisasi lengkap akan ditampilkan di sini. 
                                Hubungi admin untuk mengunggah bagan organisasi sekolah.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

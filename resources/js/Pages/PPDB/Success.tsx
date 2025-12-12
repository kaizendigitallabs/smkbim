import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, Printer, Home, Download } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Success({ registration }: { registration: any }) {
    return (
        <PublicLayout>
            <Head title="Pendaftaran Berhasil" />
            
            <div className="min-h-[80vh] flex items-center justify-center bg-[#F8FDF9] py-20 relative overflow-hidden">
                 {/* Decorative background elements */}
                 <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                 <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2"></div>

                <div className="container mx-auto px-4 max-w-2xl text-center relative z-10">
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                                <CheckCircle2 className="w-12 h-12 text-primary" />
                            </div>
                            <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"></div>
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Pendaftaran Berhasil!</h1>
                    <p className="text-gray-600 text-lg mb-10 max-w-lg mx-auto">
                        Selamat! Data pendaftaran Anda telah berhasil disimpan di sistem kami. 
                        Tim kami akan segera memverifikasi data Anda.
                    </p>

                    <Card className="border-0 shadow-xl overflow-hidden bg-white mb-10">
                        <div className="h-2 bg-gradient-to-r from-primary to-emerald-400"></div>
                        <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-6">
                            <CardTitle className="text-lg text-gray-500 font-medium uppercase tracking-widest text-xs">Bukti Pendaftaran</CardTitle>
                            <div className="text-3xl font-mono font-bold text-primary mt-2">{registration.registration_number}</div>
                            <Badge className="mx-auto mt-2 bg-green-100 text-green-700 hover:bg-green-100 border-0">Menunggu Verifikasi</Badge>
                        </CardHeader>
                        <CardContent className="p-8 text-left space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 mb-1">Nama Siswa</p>
                                    <p className="font-bold text-gray-900 text-lg">{registration.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 mb-1">Tanggal Daftar</p>
                                    <p className="font-bold text-gray-900">{new Date(registration.created_at).toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
                                </div>
                                <div className="col-span-2 mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-gray-500 mb-1 text-xs uppercase font-bold">Jurusan Pilihan</p>
                                    <p className="font-bold text-primary text-xl">{registration.major_choice_1}</p>
                                    {registration.major_choice_2 && (
                                        <p className="text-gray-500 text-sm mt-1">Pilihan 2: {registration.major_choice_2}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-gray-50 p-6 flex justify-center gap-4">
                            <Button variant="outline" onClick={() => window.print()} className="border-gray-200 hover:bg-white hover:border-primary hover:text-primary transition-all">
                                <Printer className="mr-2 h-4 w-4" />
                                Cetak Bukti
                            </Button>
                            <Button variant="outline" className="border-gray-200">
                                <Download className="mr-2 h-4 w-4" />
                                Simpan PDF
                            </Button>
                        </CardFooter>
                    </Card>

                    <div className="flex justify-center">
                        <Link href="/">
                            <Button variant="ghost" className="text-gray-500 hover:text-primary">
                                <Home className="mr-2 h-4 w-4" />
                                Kembali ke Beranda
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

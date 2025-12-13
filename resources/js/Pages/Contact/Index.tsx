import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Index({ schoolProfile }: { schoolProfile: any }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const { flash } = usePage().props as any;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout>
            <Head title="Kontak Kami" />
            
            {/* Hero */}
            <div className="bg-[#F8FDF9] dark:bg-slate-950 py-20 border-b border-green-50 dark:border-slate-900">
                <div className="container mx-auto px-4 text-center">
                     <Badge className="bg-white text-primary border-primary/20 mb-4 px-4 py-1">Hubungi Kami</Badge>
                     <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Jangan Ragu Menghubungi Kami</h1>
                     <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-lg">
                        Tim kami siap membantu menjawab pertanyaan Anda seputar PPDB, akademik, dan program sekolah.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Info Section */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Informasi Kontak</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                Kunjungi sekolah kami atau hubungi melalui saluran komunikasi yang tersedia. Kami menantikan kehadiran Anda.
                            </p>
                        </div>
                        
                        <div className="grid gap-6">
                            {[
                                { icon: MapPin, title: 'Alamat Sekolah', value: schoolProfile?.address || 'Alamat belum diatur', color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' },
                                { icon: Phone, title: 'Telepon / WhatsApp', value: schoolProfile?.phone || '-', color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
                                { icon: Mail, title: 'Email Resmi', value: schoolProfile?.email || '-', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
                                { icon: Clock, title: 'Jam Operasional', value: schoolProfile?.operating_hours || 'Senin - Jumat: 07:00 - 16:00', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
                            ].map((item, i) => (
                                <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center p-6 gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}>
                                            <item.icon size={28} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-300 font-medium">{item.value}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                         {/* Maps */}
                        {schoolProfile?.maps_embed_link && (
                            <div className="rounded-2xl overflow-hidden shadow-lg border-[6px] border-white bg-gray-100 aspect-video h-64 mt-8">
                                <iframe src={schoolProfile.maps_embed_link} className="w-full h-full border-0" allowFullScreen loading="lazy" />
                            </div>
                        )}
                    </div>

                    {/* Form Section */}
                    <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-slate-800">
                         <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-2">Kirim Pesan</h2>
                            <p className="text-gray-500 dark:text-gray-400">Isi formulir di bawah ini, kami akan segera merespon pesan Anda.</p>
                        </div>

                        {flash?.success && (
                            <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 flex items-center gap-2 border border-green-100">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                {flash.success}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-base">Nama Lengkap</Label>
                                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} required placeholder="Contoh: Budi Santoso" className="h-12 bg-gray-50 border-gray-200 focus:bg-white dark:bg-slate-900" />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-base">Email</Label>
                                    <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} required placeholder="nama@email.com" className="h-12 bg-gray-50 border-gray-200 focus:bg-white dark:bg-slate-900" />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-base">No. WhatsApp</Label>
                                    <Input id="phone" value={data.phone} onChange={e => setData('phone', e.target.value)} placeholder="0812..." className="h-12 bg-gray-50 border-gray-200 focus:bg-white dark:bg-slate-900"/>
                                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-base">Pesan</Label>
                                <Textarea id="message" value={data.message} onChange={e => setData('message', e.target.value)} rows={6} required placeholder="Tuliskan pesan Anda disini..." className="bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 resize-none" />
                                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                            </div>
                            <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/25" disabled={processing}>
                                <Send className="w-5 h-5 mr-2" /> Kirim Pesan Sekarang
                            </Button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </PublicLayout>
    );
}

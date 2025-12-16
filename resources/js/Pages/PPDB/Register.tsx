import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm } from '@inertiajs/react';
import { AlertCircle, User, BookOpen, GraduationCap, MapPin, Phone, Mail, UserCheck } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Badge } from '@/components/ui/badge';

export default function Register({ majors, isOpen, settings }: { majors: any[], isOpen: boolean, settings: any }) {
    const { data, setData, post, processing, errors } = useForm({
        nik: '',
        name: '',
        email: '',
        phone: '',
        origin_school: '',
        graduation_year: '',
        major_choice_1: '',
        major_choice_2: '',
        address: '',
        parent_name: '',
        parent_phone: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('ppdb.store'));
    };

    if (!isOpen) {
        return (
             <PublicLayout>
                <Head title="Pendaftaran PPDB Ditutup" />
                <div className="w-full min-h-[80vh] bg-[#F8FDF9] dark:bg-slate-950 flex flex-col justify-center items-center py-32">
                    <div className="container mx-auto px-4">
                        <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-10 rounded-3xl border border-yellow-100 dark:border-yellow-900/50 shadow-xl text-center">
                             <div className="w-20 h-20 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertCircle className="w-10 h-10 text-yellow-500" />
                             </div>
                             <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Pendaftaran Belum Dibuka</h1>
                             <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                                Mohon maaf, periode pendaftaran Peserta Didik Baru (PPDB) saat ini belum dibuka atau sudah ditutup. 
                                Silahkan pantau website atau sosial media kami untuk informasi terbaru.
                             </p>
                             {settings?.contact_info && (
                                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl mb-6 text-sm text-gray-600 dark:text-gray-300">
                                    <p className="font-semibold mb-1">Informasi Lebih Lanjut:</p>
                                    <p className="whitespace-pre-line">{settings.contact_info}</p>
                                </div>
                             )}
                             <Button className="rounded-full" variant="outline" asChild>
                                 <a href="/">Kembali ke Beranda</a>
                             </Button>
                        </div>
                    </div>
                </div>
             </PublicLayout>
        )
    }

    return (
        <PublicLayout>
            <Head title="Formulir PPDB" />
            
            {/* Header / Hero Form */}
            <div className="bg-[#F8FDF9] dark:bg-slate-900/50 py-16 border-b border-green-50 dark:border-green-900/10">
                <div className="container mx-auto px-4 text-center">
                    <Badge className="bg-white dark:bg-slate-800 text-primary border-primary/20 mb-4 px-4 py-1 shadow-sm">PPDB Online</Badge>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Formulir Pendaftaran Siswa Baru</h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Silahkan lengkapi data diri Anda di bawah ini dengan benar dan valid untuk melakukan proses pendaftaran.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 -mt-10 mb-20">
                <div className="max-w-4xl mx-auto relative z-10 space-y-8">
                    
                    {/* Requirements Info Section */}
                    {settings?.requirements && (
                        <Card className="border-l-4 border-l-primary shadow-md">
                            <CardHeader>
                                <div className="flex items-center gap-2 text-primary">
                                    <AlertCircle className="h-5 w-5" />
                                    <CardTitle className="text-lg">Persyaratan Pendaftaran</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-line">
                                    {settings.requirements}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <form onSubmit={submit}>
                        <div className="space-y-8">
                            
                            {/* Section A: Data Siswa */}
                            <Card className="border-0 shadow-lg overflow-hidden rounded-2xl">
                                <div className="h-1 bg-primary w-full"></div>
                                <CardHeader className="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-700 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">Data Pribadi Calon Siswa</CardTitle>
                                            <CardDescription>Isi identitas lengkap sesuai dokumen resmi (Ijazah/KK)</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8 grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-gray-700 dark:text-gray-300">NIK (Nomor Induk Kependudukan) <span className="text-red-500">*</span></Label>
                                        <Input 
                                            value={data.nik} 
                                            onChange={e => setData('nik', e.target.value)} 
                                            placeholder="16 digit NIK" 
                                            className="bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                                        />
                                        {errors.nik && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.nik}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-gray-700 dark:text-gray-300">Nama Lengkap <span className="text-red-500">*</span></Label>
                                        <Input 
                                            value={data.name} 
                                            onChange={e => setData('name', e.target.value)} 
                                            placeholder="Nama Lengkap" 
                                            className="bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-gray-700 dark:text-gray-300">Email Aktif <span className="text-red-500">*</span></Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <Input 
                                                type="email" 
                                                value={data.email} 
                                                onChange={e => setData('email', e.target.value)} 
                                                placeholder="email@contoh.com"
                                                className="pl-9 bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                                            />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-gray-700 dark:text-gray-300">No. WhatsApp <span className="text-red-500">*</span></Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <Input 
                                                value={data.phone} 
                                                onChange={e => setData('phone', e.target.value)} 
                                                placeholder="08xxxxxxxxxx"
                                                className="pl-9 bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                                            />
                                        </div>
                                        {errors.phone && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.phone}</p>}
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label className="text-gray-700 dark:text-gray-300">Alamat Lengkap <span className="text-red-500">*</span></Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Textarea 
                                                value={data.address} 
                                                onChange={e => setData('address', e.target.value)} 
                                                placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten"
                                                className="pl-9 bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 transition-colors min-h-[100px]"
                                            />
                                        </div>
                                        {errors.address && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.address}</p>}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Section B: Sekolah Asal */}
                            <Card className="border-0 shadow-lg overflow-hidden rounded-2xl">
                                <div className="h-1 bg-secondary w-full"></div>
                                <CardHeader className="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-700 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                            <GraduationCap size={20} />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">Data Sekolah Asal</CardTitle>
                                            <CardDescription>Informasi pendidikan terakhir</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8 grid md:grid-cols-2 gap-6">
                                     <div className="space-y-2">
                                        <Label className="text-gray-700 dark:text-gray-300">Asal Sekolah (SMP/MTS) <span className="text-red-500">*</span></Label>
                                        <Input 
                                            value={data.origin_school} 
                                            onChange={e => setData('origin_school', e.target.value)} 
                                            placeholder="Nama Sekolah Asal" 
                                            className="bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                                        />
                                        {errors.origin_school && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.origin_school}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-gray-700 dark:text-gray-300">Tahun Lulus <span className="text-red-500">*</span></Label>
                                        <Input 
                                            type="number" 
                                            value={data.graduation_year} 
                                            onChange={e => setData('graduation_year', e.target.value)} 
                                            placeholder="Contoh: 2024" 
                                            className="bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                                        />
                                        {errors.graduation_year && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.graduation_year}</p>}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Section C: Jurusan */}
                            <Card className="border-0 shadow-lg overflow-hidden rounded-2xl">
                                <div className="h-1 bg-purple-500 w-full"></div>
                                <CardHeader className="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-700 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                            <BookOpen size={20} />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">Pilihan Kompetensi Keahlian</CardTitle>
                                            <CardDescription>Pilih jurusan yang Anda minati</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8 grid md:grid-cols-2 gap-6">
                                     <div className="space-y-2">
                                        <Label className="text-gray-700 dark:text-gray-300">Pilihan Jurusan 1 <span className="text-red-500">*</span></Label>
                                         <div className="relative">
                                            <select 
                                                className="flex h-10 w-full rounded-md border border-input bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                value={data.major_choice_1}
                                                onChange={e => setData('major_choice_1', e.target.value)}
                                            >
                                                <option value="">-- Pilih Jurusan Utama --</option>
                                                {majors.map(m => <option key={m.id || m.name} value={m.name}>{m.name}</option>)}
                                            </select>
                                        </div>
                                        {errors.major_choice_1 && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.major_choice_1}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-gray-700 dark:text-gray-300">Pilihan Jurusan 2 (Opsional)</Label>
                                        <div className="relative">
                                            <select 
                                                className="flex h-10 w-full rounded-md border border-input bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                value={data.major_choice_2}
                                                onChange={e => setData('major_choice_2', e.target.value)}
                                            >
                                                <option value="">-- Pilih Jurusan Cadangan --</option>
                                                 {majors.map(m => <option key={m.id || m.name} value={m.name}>{m.name}</option>)}
                                            </select>
                                        </div>
                                        {errors.major_choice_2 && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.major_choice_2}</p>}
                                    </div>
                                </CardContent>
                            </Card>

                             {/* Section D: Orang Tua */}
                            <Card className="border-0 shadow-lg overflow-hidden rounded-2xl">
                                <div className="h-1 bg-orange-500 w-full"></div>
                                <CardHeader className="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-700 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                            <UserCheck size={20} />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">Data Orang Tua / Wali</CardTitle>
                                            <CardDescription>Informasi penanggung jawab siswa</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8 grid md:grid-cols-2 gap-6">
                                     <div className="space-y-2">
                                        <Label className="text-gray-700 dark:text-gray-300">Nama Orang Tua / Wali <span className="text-red-500">*</span></Label>
                                        <Input 
                                            value={data.parent_name} 
                                            onChange={e => setData('parent_name', e.target.value)} 
                                            placeholder="Nama Orang Tua" 
                                            className="bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                                        />
                                        {errors.parent_name && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.parent_name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-gray-700 dark:text-gray-300">No. HP Orang Tua / Wali <span className="text-red-500">*</span></Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <Input 
                                                value={data.parent_phone} 
                                                onChange={e => setData('parent_phone', e.target.value)} 
                                                placeholder="08xxxxxxxxxx"
                                                className="pl-9 bg-gray-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                                            />
                                        </div>
                                        {errors.parent_phone && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.parent_phone}</p>}
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="pt-6">
                                <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all" disabled={processing}>
                                    {processing ? 'Sedang Memproses...' : 'Kirim Pendaftaran Sekarang'}
                                </Button>
                                <p className="text-center text-gray-400 text-sm mt-4">
                                    Pastikan seluruh data yang Anda masukkan sudah benar sebelum mengirim.
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </PublicLayout>
    );
}

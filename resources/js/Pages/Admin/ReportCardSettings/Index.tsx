import AppLayout from '@/Layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormEventHandler } from 'react';
import { Settings } from 'lucide-react';

interface ReportCardSetting {
    id?: number;
    headmaster_name: string;
    headmaster_nuks?: string;
    logo_watermark?: string;
    school_address: string;
    city: string;
    semester: string;
    academic_year: string;
    report_date?: string;
    footer_text?: string;
}

export default function Index({ settings }: { settings?: ReportCardSetting }) {
    const { data, setData, post, processing, errors } = useForm({
        headmaster_name: settings?.headmaster_name || '',
        headmaster_nuks: settings?.headmaster_nuks || '',
        logo_watermark: null as File | null,
        school_address: settings?.school_address || '',
        city: settings?.city || '',
        semester: settings?.semester || 'Ganjil',
        academic_year: settings?.academic_year || '',
        report_date: settings?.report_date || '',
        footer_text: settings?.footer_text || '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.report-card-settings.store'));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/admin' },
                { title: 'Pengaturan Rapot', href: '#' },
            ]}
        >
            <Head title="Pengaturan Rapot" />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Pengaturan Rapot</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola informasi yang akan ditampilkan di rapot siswa
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Kepala Sekolah</CardTitle>
                            <CardDescription>
                                Data kepala sekolah untuk tanda tangan rapot
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="headmaster_name">Nama Kepala Sekolah *</Label>
                                    <Input
                                        id="headmaster_name"
                                        value={data.headmaster_name}
                                        onChange={(e) => setData('headmaster_name', e.target.value)}
                                        placeholder="Nama lengkap kepala sekolah"
                                    />
                                    {errors.headmaster_name && (
                                        <p className="text-sm text-destructive">{errors.headmaster_name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="headmaster_nuks">NUKS Kepala Sekolah</Label>
                                    <Input
                                        id="headmaster_nuks"
                                        value={data.headmaster_nuks}
                                        onChange={(e) => setData('headmaster_nuks', e.target.value)}
                                        placeholder="NUKS"
                                    />
                                    {errors.headmaster_nuks && (
                                        <p className="text-sm text-destructive">{errors.headmaster_nuks}</p>
                                    )}
                                </div>
                                
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="logo_watermark">Logo Watermark Rapot</Label>
                                    <Input
                                        id="logo_watermark"
                                        type="file"
                                        accept="image/png,image/jpeg,image/jpg"
                                        onChange={(e) => setData('logo_watermark', e.target.files?.[0] || null)}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Format: PNG, JPG, JPEG. Maksimal 2MB. Logo akan ditampilkan sebagai watermark di rapot.
                                    </p>
                                    {settings?.logo_watermark && (
                                        <p className="text-xs text-muted-foreground">
                                            Logo saat ini: {settings.logo_watermark}
                                        </p>
                                    )}
                                    {errors.logo_watermark && (
                                        <p className="text-sm text-destructive">{errors.logo_watermark}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Sekolah</CardTitle>
                            <CardDescription>
                                Data sekolah untuk header rapot
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="school_address">Alamat Sekolah *</Label>
                                    <Textarea
                                        id="school_address"
                                        value={data.school_address}
                                        onChange={(e) => setData('school_address', e.target.value)}
                                        placeholder="Alamat lengkap sekolah"
                                        rows={3}
                                    />
                                    {errors.school_address && (
                                        <p className="text-sm text-destructive">{errors.school_address}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="city">Kota (Titimangsa) *</Label>
                                    <Input
                                        id="city"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        placeholder="Jakarta"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Kota untuk titimangsa rapot (contoh: Jakarta, 15 Desember 2024)
                                    </p>
                                    {errors.city && (
                                        <p className="text-sm text-destructive">{errors.city}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Periode Aktif</CardTitle>
                            <CardDescription>
                                Semester dan tahun ajaran yang sedang berjalan
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="semester">Semester Aktif *</Label>
                                    <Select
                                        value={data.semester}
                                        onValueChange={(value) => setData('semester', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih semester" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Ganjil">Ganjil</SelectItem>
                                            <SelectItem value="Genap">Genap</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.semester && (
                                        <p className="text-sm text-destructive">{errors.semester}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="academic_year">Tahun Ajaran *</Label>
                                    <Input
                                        id="academic_year"
                                        value={data.academic_year}
                                        onChange={(e) => setData('academic_year', e.target.value)}
                                        placeholder="2024/2025"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Format: YYYY/YYYY (contoh: 2024/2025)
                                    </p>
                                    {errors.academic_year && (
                                        <p className="text-sm text-destructive">{errors.academic_year}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="report_date">Tanggal Penetapan Rapot</Label>
                                    <Input
                                        id="report_date"
                                        type="date"
                                        value={data.report_date}
                                        onChange={(e) => setData('report_date', e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Tanggal untuk titimangsa rapot (contoh: 15 Desember 2024)
                                    </p>
                                    {errors.report_date && (
                                        <p className="text-sm text-destructive">{errors.report_date}</p>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="footer_text">Catatan Footer (Opsional)</Label>
                                    <Textarea
                                        id="footer_text"
                                        value={data.footer_text}
                                        onChange={(e) => setData('footer_text', e.target.value)}
                                        placeholder="Catatan tambahan yang akan ditampilkan di footer rapot"
                                        rows={3}
                                    />
                                    {errors.footer_text && (
                                        <p className="text-sm text-destructive">{errors.footer_text}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

import AppLayout from '@/Layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { FormEventHandler } from 'react';
import { Settings, Calendar, Users, FileText, Phone } from 'lucide-react';

interface PPDBSettings {
    is_open?: string; // Stored as string '1' or '0' in DB usually if using text/value pair, but controller casting might be needed or handled in frontend. 
    // Actually controller uses updateOrCreate with key/value.
    // Let's assume values come as strings from the pluck.
    start_date?: string;
    end_date?: string;
    quota?: string;
    requirements?: string;
    contact_info?: string;
}

export default function PPDBSettingsPage({ settings }: { settings: PPDBSettings }) {
    // Helper to parse boolean from string '1'/'0' or true/false
    const parseBool = (val: any) => val === '1' || val === 1 || val === true || val === 'true';

    const { data, setData, post, processing, errors } = useForm({
        is_open: parseBool(settings.is_open),
        start_date: settings.start_date || '',
        end_date: settings.end_date || '',
        quota: settings.quota || '',
        requirements: settings.requirements || '',
        contact_info: settings.contact_info || '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.ppdb.settings.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'PPDB Settings', href: '#' },
            ]}
        >
            <Head title="Pengaturan PPDB" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pengaturan PPDB</h1>
                    <p className="text-muted-foreground mt-2">
                        Kelola status pendaftaran, jadwal, dan informasi PPDB
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Status & Jadwal */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                <CardTitle>Status & Jadwal Pendaftaran</CardTitle>
                            </div>
                            <CardDescription>
                                Atur kapan pendaftaran dibuka dan ditutup
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Buka Pendaftaran</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Aktifkan untuk membuka akses pendaftaran bagi calon siswa
                                    </p>
                                </div>
                                <Switch
                                    checked={data.is_open}
                                    onCheckedChange={(checked) => setData('is_open', checked)}
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="start_date">Tanggal Mulai</Label>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                    />
                                    {errors.start_date && (
                                        <p className="text-sm text-destructive">{errors.start_date}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="end_date">Tanggal Selesai</Label>
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                    />
                                    {errors.end_date && (
                                        <p className="text-sm text-destructive">{errors.end_date}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="quota" className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    Kuota Penerimaan
                                </Label>
                                <Input
                                    id="quota"
                                    type="number"
                                    placeholder="0"
                                    value={data.quota}
                                    onChange={(e) => setData('quota', e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Masukkan 0 atau kosongkan jika tidak ada batasan kuota spesifik
                                </p>
                                {errors.quota && (
                                    <p className="text-sm text-destructive">{errors.quota}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Persyaratan & Kontak */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                <CardTitle>Informasi & Persyaratan</CardTitle>
                            </div>
                            <CardDescription>
                                Informasi yang akan ditampilkan di halaman pendaftaran
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="requirements">Persyaratan Pendaftaran</Label>
                                <Textarea
                                    id="requirements"
                                    value={data.requirements}
                                    onChange={(e) => setData('requirements', e.target.value)}
                                    placeholder="Tuliskan persyaratan pendaftaran disini..."
                                    rows={6}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Gunakan baris baru untuk memisahkan setiap poin persyaratan
                                </p>
                                {errors.requirements && (
                                    <p className="text-sm text-destructive">{errors.requirements}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contact_info" className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    Kontak Panitia PPDB
                                </Label>
                                <Textarea
                                    id="contact_info"
                                    value={data.contact_info}
                                    onChange={(e) => setData('contact_info', e.target.value)}
                                    placeholder="Informasi kontak panitia (WhatsApp, Telepon, dll)..."
                                    rows={3}
                                />
                                {errors.contact_info && (
                                    <p className="text-sm text-destructive">{errors.contact_info}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing} size="lg">
                            {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

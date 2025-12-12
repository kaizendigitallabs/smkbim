import AppLayout from '@/Layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/image-upload';
import { Switch } from '@/components/ui/switch';
import { FormEventHandler } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        position: '',
        subject: '',
        contact: '',
        photo: null as File | null,
        is_active: true,
        order: 0,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.teachers.store'), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Guru & Staff', href: route('admin.teachers.index') },
                { title: 'Tambah Guru', href: '#' },
            ]}
        >
            <Head title="Tambah Guru" />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.teachers.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tambah Guru</h1>
                        <p className="text-muted-foreground mt-2">
                            Tambahkan data guru atau tenaga pendidik baru
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Guru</CardTitle>
                            <CardDescription>
                                Masukkan data lengkap guru atau tenaga pendidik
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="name">Nama Lengkap *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Nama lengkap guru"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="position">Jabatan</Label>
                                    <Input
                                        id="position"
                                        value={data.position}
                                        onChange={(e) => setData('position', e.target.value)}
                                        placeholder="Guru, Kepala Sekolah, dll"
                                    />
                                    {errors.position && (
                                        <p className="text-sm text-destructive">{errors.position}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Mata Pelajaran</Label>
                                    <Input
                                        id="subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="Matematika, Bahasa Indonesia, dll"
                                    />
                                    {errors.subject && (
                                        <p className="text-sm text-destructive">{errors.subject}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact">Kontak</Label>
                                    <Input
                                        id="contact"
                                        value={data.contact}
                                        onChange={(e) => setData('contact', e.target.value)}
                                        placeholder="Email atau nomor telepon"
                                    />
                                    {errors.contact && (
                                        <p className="text-sm text-destructive">{errors.contact}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="order">Urutan Tampilan</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        placeholder="0"
                                    />
                                    {errors.order && (
                                        <p className="text-sm text-destructive">{errors.order}</p>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <ImageUpload
                                        label="Foto Guru"
                                        value={data.photo}
                                        onChange={(file) => setData('photo', file)}
                                        error={errors.photo}
                                    />
                                </div>

                                <div className="flex items-center space-x-2 md:col-span-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                    <Label htmlFor="is_active" className="cursor-pointer">
                                        Aktif (tampilkan di website)
                                    </Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" asChild>
                            <Link href={route('admin.teachers.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

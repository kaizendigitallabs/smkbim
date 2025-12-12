import AppLayout from '@/Layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUpload } from '@/components/image-upload';
import { FormEventHandler } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Activity {
    id: number;
    type: 'school' | 'extracurricular' | 'achievement';
    title: string;
    date: string;
    description?: string;
    cover_image?: string;
}

export default function Edit({ activity }: { activity: Activity }) {
    const { data, setData, post, processing, errors } = useForm({
        type: activity.type,
        title: activity.title,
        date: activity.date,
        description: activity.description || '',
        cover_image: null as File | null,
        _method: 'PUT',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.activities.update', activity.id), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Kegiatan & Prestasi', href: route('admin.activities.index') },
                { title: 'Edit Kegiatan', href: '#' },
            ]}
        >
            <Head title={`Edit ${activity.title}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.activities.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Kegiatan</h1>
                        <p className="text-muted-foreground mt-2">
                            Edit data {activity.title}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Kegiatan</CardTitle>
                            <CardDescription>
                                Perbarui data kegiatan, ekstrakurikuler, atau prestasi
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="type">Tipe *</Label>
                                <Select
                                    value={data.type}
                                    onValueChange={(value: any) => setData('type', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tipe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="school">Kegiatan Sekolah</SelectItem>
                                        <SelectItem value="extracurricular">Ekstrakurikuler</SelectItem>
                                        <SelectItem value="achievement">Prestasi</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.type && (
                                    <p className="text-sm text-destructive">{errors.type}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Judul *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Judul kegiatan"
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date">Tanggal *</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                />
                                {errors.date && (
                                    <p className="text-sm text-destructive">{errors.date}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Deskripsi kegiatan..."
                                    rows={5}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <ImageUpload
                                    label="Gambar Cover"
                                    value={activity.cover_image}
                                    onChange={(file) => setData('cover_image', file)}
                                    error={errors.cover_image}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" asChild>
                            <Link href={route('admin.activities.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

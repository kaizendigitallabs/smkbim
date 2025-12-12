import AppLayout from '@/Layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUpload } from '@/components/image-upload';
import { FormEventHandler } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Activity {
    id: number;
    title: string;
}

interface Gallery {
    id?: number;
    type: 'photo' | 'video';
    title: string;
    url: string;
    thumbnail?: string;
    category?: string;
    activity_id?: number;
}

export default function Form({ 
    gallery, 
    activities 
}: { 
    gallery?: Gallery; 
    activities: Activity[];
}) {
    const isEdit = !!gallery;
    
    const { data, setData, post, put, processing, errors } = useForm({
        type: gallery?.type || 'photo' as 'photo' | 'video',
        title: gallery?.title || '',
        url: gallery?.url || '',
        category: gallery?.category || '',
        activity_id: gallery?.activity_id || 0,
        file: null as File | null,
        thumbnail: null as File | null,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(route('admin.gallery.update', gallery.id), {
                forceFormData: true,
            });
        } else {
            post(route('admin.gallery.store'), {
                forceFormData: true,
            });
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Galeri', href: route('admin.gallery.index') },
                { title: isEdit ? 'Edit Item' : 'Tambah Item', href: '#' },
            ]}
        >
            <Head title={isEdit ? 'Edit Item Galeri' : 'Tambah Item Galeri'} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.gallery.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? 'Edit Item Galeri' : 'Tambah Item Galeri'}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {isEdit ? 'Edit item galeri' : 'Tambahkan foto atau video baru'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Item</CardTitle>
                            <CardDescription>
                                Masukkan informasi foto atau video
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Tipe *</Label>
                                    <Select
                                        value={data.type}
                                        onValueChange={(value: 'photo' | 'video') => setData('type', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih tipe" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="photo">Foto</SelectItem>
                                            <SelectItem value="video">Video</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && (
                                        <p className="text-sm text-destructive">{errors.type}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Kategori</Label>
                                    <Input
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        placeholder="Contoh: Kegiatan, Fasilitas"
                                    />
                                    {errors.category && (
                                        <p className="text-sm text-destructive">{errors.category}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Judul *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Judul foto/video"
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="activity_id">Kegiatan (opsional)</Label>
                                <Select
                                    value={data.activity_id?.toString() || '0'}
                                    onValueChange={(value) => setData('activity_id', parseInt(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kegiatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">Tidak ada</SelectItem>
                                        {activities.map((activity) => (
                                            <SelectItem key={activity.id} value={activity.id.toString()}>
                                                {activity.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.activity_id && (
                                    <p className="text-sm text-destructive">{errors.activity_id}</p>
                                )}
                            </div>

                            {data.type === 'photo' ? (
                                <ImageUpload
                                    label="Upload Foto *"
                                    value={gallery?.url}
                                    onChange={(file) => setData('file', file)}
                                    error={errors.file || errors.url}
                                />
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="url">URL Video (YouTube/Vimeo) *</Label>
                                        <Input
                                            id="url"
                                            value={data.url}
                                            onChange={(e) => setData('url', e.target.value)}
                                            placeholder="https://www.youtube.com/watch?v=..."
                                        />
                                        {errors.url && (
                                            <p className="text-sm text-destructive">{errors.url}</p>
                                        )}
                                    </div>

                                    <ImageUpload
                                        label="Thumbnail Video (opsional)"
                                        value={gallery?.thumbnail}
                                        onChange={(file) => setData('thumbnail', file)}
                                        error={errors.thumbnail}
                                    />
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" asChild>
                            <Link href={route('admin.gallery.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

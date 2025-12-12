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

interface Article {
    id?: number;
    category: string;
    title: string;
    slug: string;
    content: string;
    meta_title?: string;
    meta_description?: string;
    tags?: string[];
    status: string;
    cover_image?: string;
    published_at?: string;
}

const categories = [
    'Berita',
    'Prestasi',
    'Kegiatan',
    'Pengumuman',
    'Artikel',
];

export default function Create({ article }: { article?: Article }) {
    const isEdit = !!article;
    
    const { data, setData, post, put, processing, errors } = useForm({
        category: article?.category || 'Berita',
        title: article?.title || '',
        content: article?.content || '',
        meta_title: article?.meta_title || '',
        meta_description: article?.meta_description || '',
        tags: article?.tags?.join(', ') || '',
        status: article?.status || 'draft',
        cover_image: null as File | null,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(route('admin.articles.update', article.id), {
                forceFormData: true,
            });
        } else {
            post(route('admin.articles.store'), {
                forceFormData: true,
            });
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Artikel & Berita', href: route('admin.articles.index') },
                { title: isEdit ? 'Edit Artikel' : 'Tambah Artikel', href: '#' },
            ]}
        >
            <Head title={isEdit ? `Edit ${article.title}` : 'Tambah Artikel'} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.articles.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? 'Edit Artikel' : 'Tambah Artikel'}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {isEdit ? `Edit artikel "${article.title}"` : 'Buat artikel atau berita baru'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Artikel</CardTitle>
                            <CardDescription>
                                Masukkan informasi artikel atau berita
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Kategori *</Label>
                                    <Select
                                        value={data.category}
                                        onValueChange={(value) => setData('category', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category && (
                                        <p className="text-sm text-destructive">{errors.category}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status *</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData('status', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-sm text-destructive">{errors.status}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Judul *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Judul artikel"
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Konten *</Label>
                                <Textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Tulis konten artikel..."
                                    rows={10}
                                />
                                {errors.content && (
                                    <p className="text-sm text-destructive">{errors.content}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <ImageUpload
                                    label="Cover Image"
                                    value={article?.cover_image}
                                    onChange={(file) => setData('cover_image', file)}
                                    error={errors.cover_image}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>SEO</CardTitle>
                            <CardDescription>
                                Optimasi untuk mesin pencari
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="meta_title">Meta Title</Label>
                                <Input
                                    id="meta_title"
                                    value={data.meta_title}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                    placeholder="Meta title untuk SEO"
                                />
                                {errors.meta_title && (
                                    <p className="text-sm text-destructive">{errors.meta_title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="meta_description">Meta Description</Label>
                                <Textarea
                                    id="meta_description"
                                    value={data.meta_description}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    placeholder="Meta description untuk SEO"
                                    rows={3}
                                />
                                {errors.meta_description && (
                                    <p className="text-sm text-destructive">{errors.meta_description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags</Label>
                                <Input
                                    id="tags"
                                    value={data.tags}
                                    onChange={(e) => setData('tags', e.target.value)}
                                    placeholder="tag1, tag2, tag3"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Pisahkan dengan koma
                                </p>
                                {errors.tags && (
                                    <p className="text-sm text-destructive">{errors.tags}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" asChild>
                            <Link href={route('admin.articles.index')}>Batal</Link>
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

import AppLayout from '@/Layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEventHandler } from 'react';

interface HomeSettings {
    hero_title: string;
    hero_subtitle: string;
    hero_description: string;
    hero_image: string | null;
    about_title: string;
    about_description: string;
    cta_title: string;
    cta_text: string;
    cta_primary_btn_text: string;
    cta_primary_btn_url: string;
    cta_secondary_btn_text: string;
    cta_secondary_btn_url: string;
}

export default function Index({ settings }: { settings: HomeSettings }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        ...settings,
        _method: 'PUT',
        hero_image: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.home-settings.update'), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Pengaturan Homepage', href: '/admin/home-settings' },
            ]}
        >
            <Head title="Pengaturan Homepage" />
            <div className="flex justify-between items-center mb-6 px-4 pt-4">
                <h1 className="text-2xl font-bold tracking-tight">Pengaturan Homepage</h1>
            </div>

            <div className="px-4 pb-8">
                <form onSubmit={submit}>
                    <Tabs defaultValue="hero" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="hero">Hero Section</TabsTrigger>
                            <TabsTrigger value="about">About Section</TabsTrigger>
                            <TabsTrigger value="cta">Call to Action</TabsTrigger>
                        </TabsList>

                        {/* HERO SECTION */}
                        <TabsContent value="hero">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Hero Section</CardTitle>
                                    <CardDescription>
                                        Atur tampilan utama (banner) website.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="hero_subtitle">Subtitle (Kecil di atas Title)</Label>
                                        <Input
                                            id="hero_subtitle"
                                            value={data.hero_subtitle}
                                            onChange={(e) => setData('hero_subtitle', e.target.value)}
                                            placeholder="Contoh: Mempersiapkan Generasi Siap Kerja"
                                        />
                                        {errors.hero_subtitle && <p className="text-red-500 text-sm">{errors.hero_subtitle}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="hero_title">Title Utama</Label>
                                        <Input
                                            id="hero_title"
                                            value={data.hero_title}
                                            onChange={(e) => setData('hero_title', e.target.value)}
                                            placeholder="Contoh: SMK Bina Insan Mulia"
                                        />
                                        {errors.hero_title && <p className="text-red-500 text-sm">{errors.hero_title}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="hero_description">Deskripsi</Label>
                                        <Textarea
                                            id="hero_description"
                                            value={data.hero_description}
                                            onChange={(e) => setData('hero_description', e.target.value)}
                                            rows={4}
                                        />
                                        {errors.hero_description && <p className="text-red-500 text-sm">{errors.hero_description}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="hero_image">Gambar Hero</Label>
                                        <Input
                                            id="hero_image"
                                            type="file"
                                            onChange={(e) => setData('hero_image', e.target.files ? e.target.files[0] : null)}
                                            accept="image/*"
                                        />
                                        {settings.hero_image && (
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500 mb-2">Gambar Saat Ini:</p>
                                                <img
                                                    src={`/storage/${settings.hero_image}`}
                                                    alt="Hero"
                                                    className="w-48 h-auto rounded-lg shadow-sm border"
                                                />
                                            </div>
                                        )}
                                        {errors.hero_image && <p className="text-red-500 text-sm">{errors.hero_image}</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* ABOUT SECTION */}
                        <TabsContent value="about">
                            <Card>
                                <CardHeader>
                                    <CardTitle>About Section</CardTitle>
                                    <CardDescription>
                                        Atur ringkasan profil sekolah di homepage.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="about_title">Judul About</Label>
                                        <Input
                                            id="about_title"
                                            value={data.about_title}
                                            onChange={(e) => setData('about_title', e.target.value)}
                                        />
                                        {errors.about_title && <p className="text-red-500 text-sm">{errors.about_title}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="about_description">Deskripsi Singkat</Label>
                                        <Textarea
                                            id="about_description"
                                            value={data.about_description}
                                            onChange={(e) => setData('about_description', e.target.value)}
                                            rows={5}
                                        />
                                        {errors.about_description && <p className="text-red-500 text-sm">{errors.about_description}</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* CTA SECTION */}
                        <TabsContent value="cta">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Call to Action (CTA)</CardTitle>
                                    <CardDescription>
                                        Atur bagian ajakan bertindak (biasanya di bagian bawah homepage).
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="cta_title">Judul CTA</Label>
                                        <Input
                                            id="cta_title"
                                            value={data.cta_title}
                                            onChange={(e) => setData('cta_title', e.target.value)}
                                        />
                                        {errors.cta_title && <p className="text-red-500 text-sm">{errors.cta_title}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="cta_text">Teks CTA</Label>
                                        <Textarea
                                            id="cta_text"
                                            value={data.cta_text}
                                            onChange={(e) => setData('cta_text', e.target.value)}
                                            rows={2}
                                        />
                                        {errors.cta_text && <p className="text-red-500 text-sm">{errors.cta_text}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cta_primary_btn_text">Teks Tombol Utama</Label>
                                            <Input
                                                id="cta_primary_btn_text"
                                                value={data.cta_primary_btn_text}
                                                onChange={(e) => setData('cta_primary_btn_text', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cta_primary_btn_url">URL Tombol Utama</Label>
                                            <Input
                                                id="cta_primary_btn_url"
                                                value={data.cta_primary_btn_url}
                                                onChange={(e) => setData('cta_primary_btn_url', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="mt-6 flex items-center gap-4">
                        <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                        {recentlySuccessful && (
                            <span className="text-sm text-green-600 animate-fade-in">Berhasil disimpan!</span>
                        )}
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

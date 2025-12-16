import AppLayout from '@/Layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/image-upload';
import { FormEventHandler } from 'react';
import { Home, Info, Megaphone, Sparkles, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HomeSetting {
    id?: number;
    hero_title?: string;
    hero_subtitle?: string;
    hero_description?: string;
    hero_image?: string;
    about_title?: string;
    about_description?: string;
    cta_title?: string;
    cta_text?: string;
    cta_primary_btn_text?: string;
    cta_primary_btn_url?: string;
    cta_secondary_btn_text?: string;
    cta_secondary_btn_url?: string;
    // Hero Bullets
    hero_feature_1?: string;
    hero_feature_2?: string;
    hero_feature_3?: string;
    // Metrics
    metric_1_label?: string;
    metric_1_value?: string;
    metric_2_label?: string;
    metric_2_value?: string;
    metric_3_label?: string;
    metric_3_value?: string;
    // Features (Sekilas Info)
    feature_1_title?: string;
    feature_1_description?: string;
    feature_2_title?: string;
    feature_2_description?: string;
    feature_3_title?: string;
    feature_3_description?: string;
}

interface SchoolProgram {
    id: number;
    title: string;
    description: string;
    icon: string;
    order: number;
}

export default function Index({ 
    setting, 
    schoolPrograms 
}: { 
    setting?: HomeSetting;
    schoolPrograms: SchoolProgram[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        hero_title: setting?.hero_title || '',
        hero_subtitle: setting?.hero_subtitle || '',
        hero_description: setting?.hero_description || '',
        hero_image: null as File | null,
        about_title: setting?.about_title || '',
        about_description: setting?.about_description || '',
        cta_title: setting?.cta_title || '',
        cta_text: setting?.cta_text || '',
        cta_primary_btn_text: setting?.cta_primary_btn_text || '',
        cta_primary_btn_url: setting?.cta_primary_btn_url || '',
        cta_secondary_btn_text: setting?.cta_secondary_btn_text || '',
        cta_secondary_btn_url: setting?.cta_secondary_btn_url || '',
        // Hero Bullets
        hero_feature_1: setting?.hero_feature_1 || '',
        hero_feature_2: setting?.hero_feature_2 || '',
        hero_feature_3: setting?.hero_feature_3 || '',
        // Metrics
        metric_1_label: setting?.metric_1_label || '',
        metric_1_value: setting?.metric_1_value || '',
        metric_2_label: setting?.metric_2_label || '',
        metric_2_value: setting?.metric_2_value || '',
        metric_3_label: setting?.metric_3_label || '',
        metric_3_value: setting?.metric_3_value || '',
        // Features
        feature_1_title: setting?.feature_1_title || '',
        feature_1_description: setting?.feature_1_description || '',
        feature_2_title: setting?.feature_2_title || '',
        feature_2_description: setting?.feature_2_description || '',
        feature_3_title: setting?.feature_3_title || '',
        feature_3_description: setting?.feature_3_description || '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.home-settings.update'), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Home Settings', href: '#' },
            ]}
        >
            <Head title="Home Settings" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Home Settings</h1>
                    <p className="text-muted-foreground mt-2">
                        Kelola konten halaman beranda website
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hero Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Home className="h-5 w-5" />
                                Hero Section
                            </CardTitle>
                            <CardDescription>
                                Bagian utama yang pertama kali dilihat pengunjung
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="hero_title">Judul Hero</Label>
                                <Input
                                    id="hero_title"
                                    value={data.hero_title}
                                    onChange={(e) => setData('hero_title', e.target.value)}
                                    placeholder="Contoh: Selamat Datang di SMK BIM"
                                />
                                {errors.hero_title && (
                                    <p className="text-sm text-destructive">{errors.hero_title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="hero_subtitle">Subjudul Hero</Label>
                                <Input
                                    id="hero_subtitle"
                                    value={data.hero_subtitle}
                                    onChange={(e) => setData('hero_subtitle', e.target.value)}
                                    placeholder="Contoh: Membangun Generasi Unggul dan Berkarakter"
                                />
                                {errors.hero_subtitle && (
                                    <p className="text-sm text-destructive">{errors.hero_subtitle}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="hero_description">Deskripsi Hero</Label>
                                <Textarea
                                    id="hero_description"
                                    value={data.hero_description}
                                    onChange={(e) => setData('hero_description', e.target.value)}
                                    placeholder="Deskripsi singkat tentang sekolah..."
                                    rows={4}
                                />
                                {errors.hero_description && (
                                    <p className="text-sm text-destructive">{errors.hero_description}</p>
                                )}
                            </div>

                            <ImageUpload
                                label="Gambar Hero"
                                value={setting?.hero_image}
                                onChange={(file) => setData('hero_image', file)}
                                error={errors.hero_image}
                            />

                            <div className="grid gap-4 md:grid-cols-3 pt-4">
                                <div className="space-y-2">
                                    <Label>Poin Keunggulan 1</Label>
                                    <Input value={data.hero_feature_1} onChange={(e) => setData('hero_feature_1', e.target.value)} placeholder="Kurikulum..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Poin Keunggulan 2</Label>
                                    <Input value={data.hero_feature_2} onChange={(e) => setData('hero_feature_2', e.target.value)} placeholder="Karakter..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Poin Keunggulan 3</Label>
                                    <Input value={data.hero_feature_3} onChange={(e) => setData('hero_feature_3', e.target.value)} placeholder="Karir..." />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* About Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Info className="h-5 w-5" />
                                About Section
                            </CardTitle>
                            <CardDescription>
                                Bagian tentang sekolah di halaman beranda
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="about_title">Judul About</Label>
                                <Input
                                    id="about_title"
                                    value={data.about_title}
                                    onChange={(e) => setData('about_title', e.target.value)}
                                    placeholder="Contoh: Tentang SMK BIM"
                                />
                                {errors.about_title && (
                                    <p className="text-sm text-destructive">{errors.about_title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="about_description">Deskripsi About</Label>
                                <Textarea
                                    id="about_description"
                                    value={data.about_description}
                                    onChange={(e) => setData('about_description', e.target.value)}
                                    placeholder="Deskripsi lengkap tentang sekolah..."
                                    rows={6}
                                />
                                    {errors.about_description && (
                                    <p className="text-sm text-destructive">{errors.about_description}</p>
                                )}
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="font-semibold mb-4">Statistik (Metrics)</h3>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label>Metric 1: Label</Label>
                                        <Input value={data.metric_1_label} onChange={(e) => setData('metric_1_label', e.target.value)} placeholder="Siswa Aktif" />
                                        <Label>Metric 1: Value</Label>
                                        <Input value={data.metric_1_value} onChange={(e) => setData('metric_1_value', e.target.value)} placeholder="500+" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Metric 2: Label</Label>
                                        <Input value={data.metric_2_label} onChange={(e) => setData('metric_2_label', e.target.value)} placeholder="Kelulusan" />
                                        <Label>Metric 2: Value</Label>
                                        <Input value={data.metric_2_value} onChange={(e) => setData('metric_2_value', e.target.value)} placeholder="95%" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Metric 3: Label</Label>
                                        <Input value={data.metric_3_label} onChange={(e) => setData('metric_3_label', e.target.value)} placeholder="Ekstrakurikuler" />
                                        <Label>Metric 3: Value</Label>
                                        <Input value={data.metric_3_value} onChange={(e) => setData('metric_3_value', e.target.value)} placeholder="15+" />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="font-semibold mb-4">Kartu Info (Features)</h3>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label>Kartu 1: Judul</Label>
                                        <Input value={data.feature_1_title} onChange={(e) => setData('feature_1_title', e.target.value)} placeholder="Judul..." />
                                        <Label>Kartu 1: Deskripsi</Label>
                                        <Textarea value={data.feature_1_description} onChange={(e) => setData('feature_1_description', e.target.value)} placeholder="Deskripsi..." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Kartu 2: Judul</Label>
                                        <Input value={data.feature_2_title} onChange={(e) => setData('feature_2_title', e.target.value)} placeholder="Judul..." />
                                        <Label>Kartu 2: Deskripsi</Label>
                                        <Textarea value={data.feature_2_description} onChange={(e) => setData('feature_2_description', e.target.value)} placeholder="Deskripsi..." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Kartu 3: Judul</Label>
                                        <Input value={data.feature_3_title} onChange={(e) => setData('feature_3_title', e.target.value)} placeholder="Judul..." />
                                        <Label>Kartu 3: Deskripsi</Label>
                                        <Textarea value={data.feature_3_description} onChange={(e) => setData('feature_3_description', e.target.value)} placeholder="Deskripsi..." />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Features Section */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Sparkles className="h-5 w-5" />
                                        Features / Keunggulan
                                    </CardTitle>
                                    <CardDescription>
                                        Keunggulan sekolah yang ditampilkan di homepage
                                    </CardDescription>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={route('admin.school-programs.index')}>
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Kelola Features
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {schoolPrograms.length > 0 ? (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {schoolPrograms.map((program) => (
                                        <div key={program.id} className="border rounded-lg p-4 space-y-2">
                                            <div className="flex items-start gap-3">
                                                <div className="text-2xl">{program.icon}</div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold">{program.title}</h4>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {program.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge variant="secondary" className="text-xs">
                                                Order: {program.order}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                    <p>Belum ada features. Klik "Kelola Features" untuk menambahkan.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* CTA Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Megaphone className="h-5 w-5" />
                                Call to Action (CTA)
                            </CardTitle>
                            <CardDescription>
                                Ajakan untuk pengunjung melakukan aksi
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="cta_title">Judul CTA</Label>
                                <Input
                                    id="cta_title"
                                    value={data.cta_title}
                                    onChange={(e) => setData('cta_title', e.target.value)}
                                    placeholder="Contoh: Bergabunglah Bersama Kami"
                                />
                                {errors.cta_title && (
                                    <p className="text-sm text-destructive">{errors.cta_title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cta_text">Teks CTA</Label>
                                <Textarea
                                    id="cta_text"
                                    value={data.cta_text}
                                    onChange={(e) => setData('cta_text', e.target.value)}
                                    placeholder="Teks ajakan untuk pengunjung..."
                                    rows={3}
                                />
                                {errors.cta_text && (
                                    <p className="text-sm text-destructive">{errors.cta_text}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="cta_primary_btn_text">Teks Tombol Utama</Label>
                                    <Input
                                        id="cta_primary_btn_text"
                                        value={data.cta_primary_btn_text}
                                        onChange={(e) => setData('cta_primary_btn_text', e.target.value)}
                                        placeholder="Contoh: Daftar Sekarang"
                                    />
                                    {errors.cta_primary_btn_text && (
                                        <p className="text-sm text-destructive">{errors.cta_primary_btn_text}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cta_primary_btn_url">URL Tombol Utama</Label>
                                    <Input
                                        id="cta_primary_btn_url"
                                        value={data.cta_primary_btn_url}
                                        onChange={(e) => setData('cta_primary_btn_url', e.target.value)}
                                        placeholder="/ppdb"
                                    />
                                    {errors.cta_primary_btn_url && (
                                        <p className="text-sm text-destructive">{errors.cta_primary_btn_url}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="cta_secondary_btn_text">Teks Tombol Sekunder</Label>
                                    <Input
                                        id="cta_secondary_btn_text"
                                        value={data.cta_secondary_btn_text}
                                        onChange={(e) => setData('cta_secondary_btn_text', e.target.value)}
                                        placeholder="Contoh: Pelajari Lebih Lanjut"
                                    />
                                    {errors.cta_secondary_btn_text && (
                                        <p className="text-sm text-destructive">{errors.cta_secondary_btn_text}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cta_secondary_btn_url">URL Tombol Sekunder</Label>
                                    <Input
                                        id="cta_secondary_btn_url"
                                        value={data.cta_secondary_btn_url}
                                        onChange={(e) => setData('cta_secondary_btn_url', e.target.value)}
                                        placeholder="/tentang"
                                    />
                                    {errors.cta_secondary_btn_url && (
                                        <p className="text-sm text-destructive">{errors.cta_secondary_btn_url}</p>
                                    )}
                                </div>
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

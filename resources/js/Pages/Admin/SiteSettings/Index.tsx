import AppLayout from '@/Layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUpload } from '@/components/image-upload';
import { FormEventHandler } from 'react';
import { Settings, FileText, Search, DollarSign } from 'lucide-react';

interface SiteSetting {
    id?: number;
    // General
    site_logo?: string;
    site_favicon?: string;
    site_name?: string;
    site_description?: string;
    site_keywords?: string;
    meta_author?: string;
    // Footer
    footer_about_text?: string;
    footer_contact_email?: string;
    footer_contact_phone?: string;
    footer_contact_address?: string;
    footer_social_facebook?: string;
    footer_social_instagram?: string;
    footer_social_youtube?: string;
    footer_social_twitter?: string;
    // SEO
    google_analytics_id?: string;
    google_search_console?: string;
    facebook_pixel_id?: string;
    // Popup Banner
    popup_banner_image?: string;
    popup_banner_url?: string;
    enable_popup_banner?: boolean;
}

export default function Index({ setting }: { setting?: SiteSetting }) {
    const { data, setData, post, processing, errors } = useForm({
        // General
        site_logo: null as File | null,
        site_favicon: null as File | null,
        site_name: setting?.site_name || '',
        site_description: setting?.site_description || '',
        site_keywords: setting?.site_keywords || '',
        meta_author: setting?.meta_author || '',
        // Footer
        footer_about_text: setting?.footer_about_text || '',
        footer_contact_email: setting?.footer_contact_email || '',
        footer_contact_phone: setting?.footer_contact_phone || '',
        footer_contact_address: setting?.footer_contact_address || '',
        footer_social_facebook: setting?.footer_social_facebook || '',
        footer_social_instagram: setting?.footer_social_instagram || '',
        footer_social_youtube: setting?.footer_social_youtube || '',
        footer_social_twitter: setting?.footer_social_twitter || '',
        // SEO
        google_analytics_id: setting?.google_analytics_id || '',
        google_search_console: setting?.google_search_console || '',
        facebook_pixel_id: setting?.facebook_pixel_id || '',
        // Popup Banner
        popup_banner_image: null as File | null,
        popup_banner_url: setting?.popup_banner_url || '',
        enable_popup_banner: setting?.enable_popup_banner || false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.site-settings.update'), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Site Settings', href: '#' },
            ]}
        >
            <Head title="Site Settings" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
                    <p className="text-muted-foreground mt-2">
                        Kelola pengaturan website, footer, SEO, dan iklan
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Tabs defaultValue="general" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="general">
                                <Settings className="h-4 w-4 mr-2" />
                                General
                            </TabsTrigger>
                            <TabsTrigger value="footer">
                                <FileText className="h-4 w-4 mr-2" />
                                Footer
                            </TabsTrigger>
                            <TabsTrigger value="seo">
                                <Search className="h-4 w-4 mr-2" />
                                SEO & Analytics
                            </TabsTrigger>
                            <TabsTrigger value="banner">
                                <DollarSign className="h-4 w-4 mr-2" />
                                Popup Banner
                            </TabsTrigger>
                        </TabsList>

                        {/* General Tab */}
                        <TabsContent value="general" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>General Settings</CardTitle>
                                    <CardDescription>
                                        Pengaturan umum website seperti logo, favicon, dan informasi dasar
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <ImageUpload
                                            label="Site Logo"
                                            value={setting?.site_logo}
                                            onChange={(file) => setData('site_logo', file)}
                                            error={errors.site_logo}
                                        />
                                        <ImageUpload
                                            label="Site Favicon"
                                            value={setting?.site_favicon}
                                            onChange={(file) => setData('site_favicon', file)}
                                            error={errors.site_favicon}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="site_name">Site Name</Label>
                                        <Input
                                            id="site_name"
                                            value={data.site_name}
                                            onChange={(e) => setData('site_name', e.target.value)}
                                            placeholder="Contoh: SMK Bina Insan Mulia"
                                        />
                                        {errors.site_name && <p className="text-sm text-destructive">{errors.site_name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="site_description">Site Description</Label>
                                        <Textarea
                                            id="site_description"
                                            value={data.site_description}
                                            onChange={(e) => setData('site_description', e.target.value)}
                                            placeholder="Deskripsi singkat tentang website..."
                                            rows={3}
                                        />
                                        {errors.site_description && <p className="text-sm text-destructive">{errors.site_description}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="site_keywords">Site Keywords</Label>
                                        <Input
                                            id="site_keywords"
                                            value={data.site_keywords}
                                            onChange={(e) => setData('site_keywords', e.target.value)}
                                            placeholder="keyword1, keyword2, keyword3"
                                        />
                                        {errors.site_keywords && <p className="text-sm text-destructive">{errors.site_keywords}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="meta_author">Meta Author</Label>
                                        <Input
                                            id="meta_author"
                                            value={data.meta_author}
                                            onChange={(e) => setData('meta_author', e.target.value)}
                                            placeholder="Nama penulis/organisasi"
                                        />
                                        {errors.meta_author && <p className="text-sm text-destructive">{errors.meta_author}</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Footer Tab */}
                        <TabsContent value="footer" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Footer Settings</CardTitle>
                                    <CardDescription>
                                        Pengaturan footer website termasuk kontak dan social media
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="footer_about_text">About Text</Label>
                                        <Textarea
                                            id="footer_about_text"
                                            value={data.footer_about_text}
                                            onChange={(e) => setData('footer_about_text', e.target.value)}
                                            placeholder="Teks tentang sekolah di footer..."
                                            rows={4}
                                        />
                                        {errors.footer_about_text && <p className="text-sm text-destructive">{errors.footer_about_text}</p>}
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="footer_contact_email">Contact Email</Label>
                                            <Input
                                                id="footer_contact_email"
                                                type="email"
                                                value={data.footer_contact_email}
                                                onChange={(e) => setData('footer_contact_email', e.target.value)}
                                                placeholder="email@example.com"
                                            />
                                            {errors.footer_contact_email && <p className="text-sm text-destructive">{errors.footer_contact_email}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="footer_contact_phone">Contact Phone</Label>
                                            <Input
                                                id="footer_contact_phone"
                                                value={data.footer_contact_phone}
                                                onChange={(e) => setData('footer_contact_phone', e.target.value)}
                                                placeholder="+62 xxx xxxx xxxx"
                                            />
                                            {errors.footer_contact_phone && <p className="text-sm text-destructive">{errors.footer_contact_phone}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="footer_contact_address">Contact Address</Label>
                                        <Textarea
                                            id="footer_contact_address"
                                            value={data.footer_contact_address}
                                            onChange={(e) => setData('footer_contact_address', e.target.value)}
                                            placeholder="Alamat lengkap sekolah..."
                                            rows={3}
                                        />
                                        {errors.footer_contact_address && <p className="text-sm text-destructive">{errors.footer_contact_address}</p>}
                                    </div>

                                    <div className="space-y-3">
                                        <Label>Social Media Links</Label>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="footer_social_facebook">Facebook</Label>
                                                <Input
                                                    id="footer_social_facebook"
                                                    value={data.footer_social_facebook}
                                                    onChange={(e) => setData('footer_social_facebook', e.target.value)}
                                                    placeholder="https://facebook.com/..."
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="footer_social_instagram">Instagram</Label>
                                                <Input
                                                    id="footer_social_instagram"
                                                    value={data.footer_social_instagram}
                                                    onChange={(e) => setData('footer_social_instagram', e.target.value)}
                                                    placeholder="https://instagram.com/..."
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="footer_social_youtube">YouTube</Label>
                                                <Input
                                                    id="footer_social_youtube"
                                                    value={data.footer_social_youtube}
                                                    onChange={(e) => setData('footer_social_youtube', e.target.value)}
                                                    placeholder="https://youtube.com/..."
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="footer_social_twitter">Twitter/X</Label>
                                                <Input
                                                    id="footer_social_twitter"
                                                    value={data.footer_social_twitter}
                                                    onChange={(e) => setData('footer_social_twitter', e.target.value)}
                                                    placeholder="https://twitter.com/..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* SEO Tab */}
                        <TabsContent value="seo" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>SEO & Analytics</CardTitle>
                                    <CardDescription>
                                        Pengaturan SEO dan tracking analytics
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                                        <Input
                                            id="google_analytics_id"
                                            value={data.google_analytics_id}
                                            onChange={(e) => setData('google_analytics_id', e.target.value)}
                                            placeholder="G-XXXXXXXXXX atau UA-XXXXXXXXX-X"
                                        />
                                        {errors.google_analytics_id && <p className="text-sm text-destructive">{errors.google_analytics_id}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="google_search_console">Google Search Console Verification</Label>
                                        <Textarea
                                            id="google_search_console"
                                            value={data.google_search_console}
                                            onChange={(e) => setData('google_search_console', e.target.value)}
                                            placeholder='<meta name="google-site-verification" content="..." />'
                                            rows={3}
                                        />
                                        {errors.google_search_console && <p className="text-sm text-destructive">{errors.google_search_console}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="facebook_pixel_id">Facebook Pixel ID</Label>
                                        <Input
                                            id="facebook_pixel_id"
                                            value={data.facebook_pixel_id}
                                            onChange={(e) => setData('facebook_pixel_id', e.target.value)}
                                            placeholder="XXXXXXXXXXXXXXX"
                                        />
                                        {errors.facebook_pixel_id && <p className="text-sm text-destructive">{errors.facebook_pixel_id}</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Popup Banner Tab */}
                        <TabsContent value="banner" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Popup Banner</CardTitle>
                                    <CardDescription>
                                        Banner iklan yang muncul sebagai popup saat membuka homepage
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-0.5">
                                            <Label>Enable Popup Banner</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Aktifkan atau nonaktifkan popup banner di homepage
                                            </p>
                                        </div>
                                        <Switch
                                            checked={data.enable_popup_banner}
                                            onCheckedChange={(checked) => setData('enable_popup_banner', checked)}
                                        />
                                    </div>

                                    <ImageUpload
                                        label="Banner Image"
                                        value={setting?.popup_banner_image}
                                        onChange={(file) => setData('popup_banner_image', file)}
                                        error={errors.popup_banner_image}
                                    />

                                    <div className="space-y-2">
                                        <Label htmlFor="popup_banner_url">Banner URL (Optional)</Label>
                                        <Input
                                            id="popup_banner_url"
                                            value={data.popup_banner_url}
                                            onChange={(e) => setData('popup_banner_url', e.target.value)}
                                            placeholder="https://example.com/promo"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            URL tujuan ketika banner diklik (opsional)
                                        </p>
                                        {errors.popup_banner_url && <p className="text-sm text-destructive">{errors.popup_banner_url}</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="flex justify-end mt-6">
                        <Button type="submit" disabled={processing} size="lg">
                            {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

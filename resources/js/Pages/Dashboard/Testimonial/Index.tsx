import AppLayout from '@/Layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar: string | null;
    is_active: boolean;
}

export default function Index({ testimonials }: { testimonials: Testimonial[] }) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
            router.delete(route('admin.testimonials.destroy', id));
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Testimoni', href: '/admin/testimonials' },
            ]}
        >
            <Head title="Manajemen Testimoni" />
            <div className="flex justify-between items-center mb-6 px-4 pt-4">
                <h1 className="text-2xl font-bold tracking-tight">Manajemen Testimoni</h1>
                <Link href={route('admin.testimonials.create')}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Testimoni
                    </Button>
                </Link>
            </div>

            <div className="px-4">
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Avatar</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Peran</TableHead>
                                    <TableHead>Konten</TableHead>
                                    <TableHead>Rating</TableHead>
                                    <TableHead className="w-[80px]">Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {testimonials.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center h-24 text-muted-foreground"
                                        >
                                            Belum ada testimoni.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    testimonials.map((testi) => (
                                        <TableRow key={testi.id}>
                                            <TableCell>
                                                {testi.avatar ? (
                                                    <img
                                                        src={`/storage/${testi.avatar}`}
                                                        alt={testi.name}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs">
                                                        N/A
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium">{testi.name}</TableCell>
                                            <TableCell>{testi.role}</TableCell>
                                            <TableCell className="max-w-xs truncate">{testi.content}</TableCell>
                                            <TableCell>{testi.rating} / 5</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                        testi.is_active
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}
                                                >
                                                    {testi.is_active ? 'Aktif' : 'Nonaktif'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link href={route('admin.testimonials.edit', testi.id)}>
                                                    <Button variant="ghost" size="icon">
                                                        <Pencil className="h-4 w-4 text-blue-500" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(testi.id)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

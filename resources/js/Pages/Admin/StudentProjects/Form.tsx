import AppLayout from '@/Layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUpload } from '@/components/image-upload';
import { FormEventHandler, useState } from 'react';
import { ArrowLeft, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface Major {
    id: number;
    name: string;
}

interface Student {
    id: number;
    name: string;
}

interface StudentProject {
    id?: number;
    major_id: number;
    student_name: string;
    title: string;
    description?: string;
    image?: string;
}

export default function Form({ project, majors, students }: { project?: StudentProject; majors: Major[]; students: Student[] }) {
    const isEdit = !!project;
    const [open, setOpen] = useState(false)
    
    const { data, setData, post, processing, errors } = useForm({
        major_id: project?.major_id || (majors[0]?.id || 0),
        student_name: project?.student_name || '',
        title: project?.title || '',
        description: project?.description || '',
        image: null as File | null,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(route('admin.student-projects.update', project.id), {
                forceFormData: true,
            });
        } else {
            post(route('admin.student-projects.store'), {
                forceFormData: true,
            });
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Project Siswa', href: route('admin.student-projects.index') },
                { title: isEdit ? 'Edit Project' : 'Tambah Project', href: '#' },
            ]}
        >
            <Head title={isEdit ? `Edit Project` : 'Tambah Project Siswa'} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.student-projects.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? 'Edit Project Siswa' : 'Tambah Project Siswa'}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {isEdit ? `Edit data project` : 'Tambahkan project siswa baru'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Project</CardTitle>
                            <CardDescription>
                                Masukkan data project siswa
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2 flex flex-col">
                                    <Label htmlFor="student_name">Nama Siswa *</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-full justify-between"
                                            >
                                                {data.student_name
                                                    ? students.find((student) => student.name === data.student_name)?.name || data.student_name
                                                    : "Pilih siswa..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari siswa..." />
                                                <CommandList>
                                                    <CommandEmpty>Siswa tidak ditemukan.</CommandEmpty>
                                                    <CommandGroup>
                                                        {students.map((student) => (
                                                            <CommandItem
                                                                key={student.id}
                                                                value={student.name}
                                                                onSelect={(currentValue) => {
                                                                    setData('student_name', currentValue === data.student_name ? "" : currentValue)
                                                                    setOpen(false)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        data.student_name === student.name ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {student.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    {errors.student_name && (
                                        <p className="text-sm text-destructive">{errors.student_name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="major_id">Jurusan *</Label>
                                    <Select
                                        value={data.major_id.toString()}
                                        onValueChange={(value) => setData('major_id', parseInt(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jurusan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {majors.map((major) => (
                                                <SelectItem key={major.id} value={major.id.toString()}>
                                                    {major.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.major_id && (
                                        <p className="text-sm text-destructive">{errors.major_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="title">Judul Project *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Judul project"
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-destructive">{errors.title}</p>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Deskripsi</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Deskripsi project..."
                                        rows={5}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-destructive">{errors.description}</p>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <ImageUpload
                                        label="Gambar Project"
                                        value={project?.image}
                                        onChange={(file) => setData('image', file)}
                                        error={errors.image}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" asChild>
                            <Link href={route('admin.student-projects.index')}>Batal</Link>
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

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModeToggle } from '@/components/mode-toggle';
import { Head, Link, useForm } from '@inertiajs/react';
import { GraduationCap, Lock, Mail } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
            <Head title="Admin Login" />
            
            {/* Theme Toggle - Top Right */}
            <div className="fixed top-4 right-4 z-50">
                <ModeToggle />
            </div>
            
            {/* Background Decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-br from-[#21AD00] via-[#1a8a00] to-[#E7974D] opacity-10"></div>
                <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#21AD00]/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-100px] -left-20 w-[300px] h-[300px] bg-[#E7974D]/10 rounded-full blur-3xl"></div>
            </div>

            <Card className="w-full max-w-md border-0 shadow-xl relative z-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#21AD00] to-[#E7974D]"></div>
                
                <CardContent className="pt-12 px-8 pb-10 space-y-8">
                    <div className="text-center space-y-2">
                        <div className="mx-auto w-16 h-16 bg-[#21AD00]/10 rounded-2xl flex items-center justify-center mb-4 text-[#21AD00]">
                            <GraduationCap className="h-8 w-8" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Selamat Datang Kembali</h1>
                        <p className="text-gray-500 text-sm">Masuk untuk mengelola dashboard SMK Bina Insan Mulia</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="pl-10 h-11"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@smkbim.sch.id"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'} // Toggle logic if we add an eye icon later, current implementation is basic
                                    name="password"
                                    value={data.password}
                                    className="pl-10 h-11"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-xs font-medium">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="rounded border-gray-300 text-[#21AD00] shadow-sm focus:ring-[#21AD00]"
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    checked={data.remember}
                                />
                                <Label htmlFor="remember" className="text-sm font-normal text-gray-600 cursor-pointer">Ingat Saya</Label>
                            </div>
                            <Link
                                href="/forgot-password"
                                className="text-sm font-medium text-[#21AD00] hover:text-[#1a8a00] transition-colors"
                            >
                                Lupa Password?
                            </Link>
                        </div>

                        <Button 
                            className="w-full h-11 text-base bg-[#21AD00] hover:bg-[#1a8a00] shadow-lg shadow-[#21AD00]/20 transition-all active:scale-[0.98]" 
                            disabled={processing}
                        >
                            {processing ? 'Memproses...' : 'Masuk ke Dashboard'}
                        </Button>
                    </form>

                    <div className="text-center pt-2">
                        <p className="text-xs text-gray-400">
                            &copy; {new Date().getFullYear()} SMK Bina Insan Mulia. All rights reserved.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

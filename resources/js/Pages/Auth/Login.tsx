import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModeToggle } from '@/components/mode-toggle';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { GraduationCap, Lock, Mail, ArrowLeft } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const { props } = usePage<{ flash: { success?: string; error?: string } }>();
    const { flash } = props;
    const siteSetting = (props as any).siteSetting;
    const schoolProfile = (props as any).schoolProfile;

    const [showPassword, setShowPassword] = useState(false);

    // Show SweetAlert when there are validation errors or flash messages
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const errorMessages = Object.values(errors).join('<br>');
            Swal.fire({
                icon: 'error',
                title: 'Validasi Gagal',
                html: errorMessages,
                confirmButtonColor: '#21AD00',
            });
        }

        if (flash?.success) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: flash.success,
                confirmButtonColor: '#21AD00',
                timer: 3000
            });
        }

        if (flash?.error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: flash.error,
                confirmButtonColor: '#d33',
            });
        }
    }, [errors, flash]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
            onError: (errors) => {
                console.log('Login errors:', errors);
            }
        });
    };

    const handleForgotPassword = (e: React.MouseEvent) => {
        e.preventDefault();
        Swal.fire({
            icon: 'info',
            title: 'Lupa Password?',
            text: 'Silakan hubungi Administrator sekolah untuk melakukan reset password akun Anda.',
            confirmButtonText: 'Mengerti',
            confirmButtonColor: '#21AD00',
        });
    };

    return (
        <div className="min-h-screen w-full bg-[#f0f2f5] dark:bg-slate-900 flex items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden">
            <Head title="Login Admin" />
            
            {/* Background Shapes */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-400/20 dark:bg-blue-900/10 blur-3xl"></div>
                <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#21AD00]/10 dark:bg-[#21AD00]/5 blur-3xl"></div>
                <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-blue-300/20 dark:bg-blue-800/10 blur-3xl"></div>
            </div>

            {/* Navigation & Theme Toggle */}
            <div className="absolute top-4 left-4 z-50">
                 <Link href="/portal">
                    <Button variant="ghost" className="gap-2 text-gray-600 dark:text-gray-300 hover:text-primary">
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Button>
                </Link>
            </div>
            <div className="absolute top-4 right-4 z-50">
                <ModeToggle />
            </div>

            <Card className="w-full max-w-5xl h-[600px] bg-white dark:bg-slate-800 shadow-2xl rounded-[2rem] border-0 overflow-hidden flex flex-col md:flex-row relative z-10">
                
                {/* Left Side - Illustration/Branding */}
                <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-700 dark:to-slate-800 relative items-center justify-center p-12">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#21AD00]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    </div>

                    <div className="relative z-10 text-center space-y-8">
                        {/* Mockup Illustration Placeholder using Icons */}
                        <div className="relative mx-auto w-64 h-80">
                             {/* Phone Frame */}
                             <div className="absolute inset-0 border-8 border-gray-800 dark:border-gray-600 rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-xl overflow-hidden flex flex-col">
                                <div className="h-6 w-32 bg-gray-800 dark:bg-gray-600 mx-auto rounded-b-xl"></div>
                                <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4 bg-green-50/50 dark:bg-slate-800/50">
                                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                         <GraduationCap className="h-8 w-8 text-primary" />
                                     </div>
                                     <div className="w-full space-y-2">
                                         <div className="h-2 w-20 bg-gray-200 rounded mx-auto"></div>
                                         <div className="h-8 w-full bg-white rounded-lg shadow-sm border border-gray-100"></div>
                                         <div className="h-8 w-full bg-white rounded-lg shadow-sm border border-gray-100"></div>
                                     </div>
                                     <div className="pt-4">
                                         <div className="h-8 w-24 bg-[#21AD00] rounded-full mx-auto shadow-md shadow-green-200"></div>
                                     </div>
                                </div>
                             </div>
                             
                             {/* Floating Elements */}
                             <div className="absolute top-20 -right-8 w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl shadow-lg flex items-center justify-center animate-bounce duration-[3000ms]">
                                 <Lock className="h-8 w-8 text-primary" />
                             </div>
                             <div className="absolute bottom-20 -left-6 w-14 h-14 bg-white dark:bg-slate-700 rounded-full shadow-lg flex items-center justify-center animate-bounce duration-[4000ms]">
                                 <div className="h-6 w-6 bg-[#21AD00] rounded-full"></div>
                             </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Sistem Informasi Akademik</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">SMK Bina Insan Mulia</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-slate-800">
                    <div className="max-w-md mx-auto w-full space-y-8">
                        <div className="text-center md:text-left space-y-2">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Welcome Back!</h1>
                            <p className="text-gray-500 dark:text-gray-400">Sign in to access your dashboard</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="pl-12 h-12 rounded-full border-gray-200 bg-gray-50 dark:bg-slate-700/50 dark:border-slate-600 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            autoComplete="username"
                                            autoFocus
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="Email Address"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={data.password}
                                            className="pl-12 h-12 rounded-full border-gray-200 bg-gray-50 dark:bg-slate-700/50 dark:border-slate-600 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end">
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-primary"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            <Button 
                                className="w-full h-12 rounded-full text-base font-bold bg-[#21AD00] hover:bg-[#1a8a00] text-white shadow-lg shadow-green-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]" 
                                disabled={processing}
                            >
                                {processing ? 'Signing In...' : 'SIGN IN'}
                            </Button>
                        </form>

                        <div className="text-center pt-4">
                            <p className="text-xs text-gray-400">
                                &copy; {new Date().getFullYear()} SMK Bina Insan Mulia.
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

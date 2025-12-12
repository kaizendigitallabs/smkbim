<?php

use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\DownloadController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\HomeSettingController;
use App\Http\Controllers\Admin\MajorController;
use App\Http\Controllers\Admin\MajorProgramController;
use App\Http\Controllers\Admin\PPDBSettingController;
use App\Http\Controllers\Admin\SchoolProfileController;
use App\Http\Controllers\Admin\SchoolProgramController;
use App\Http\Controllers\Admin\StudentProjectController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ActivityPublicController;
use App\Http\Controllers\ArticlePublicController;
use App\Http\Controllers\ContactPublicController;
use App\Http\Controllers\DownloadPublicController;
use App\Http\Controllers\GalleryPublicController;
use App\Http\Controllers\PPDBPublicController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\SchoolGalleryPublicController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

// Profil
Route::get('/profil', [AboutController::class, 'profile'])->name('about.profile');
Route::get('/profil/struktur-organisasi', [AboutController::class, 'organization'])->name('about.organization');
Route::get('/guru', [AboutController::class, 'teachers'])->name('about.teachers');

// Program & Jurusan
Route::get('/jurusan', [ProgramController::class, 'majors'])->name('program.majors.index');
Route::get('/jurusan/{slug}', [ProgramController::class, 'showMajor'])->name('program.majors.show');
Route::get('/program-unggulan', [ProgramController::class, 'featured'])->name('program.featured');
Route::get('/program/kurikulum', [ProgramController::class, 'curriculum'])->name('program.curriculum');

// Kegiatan & Prestasi
Route::get('/kegiatan', [ActivityPublicController::class, 'index'])->name('activity.index');
Route::get('/ekstrakurikuler', [ActivityPublicController::class, 'extracurricular'])->name('activity.extracurricular');
Route::get('/prestasi', [ActivityPublicController::class, 'achievement'])->name('activity.achievement');

// Artikel & Berita
Route::get('/artikel', [ArticlePublicController::class, 'index'])->name('articles.index');
Route::get('/artikel/{slug}', [ArticlePublicController::class, 'show'])->name('articles.show');

// Gallery
Route::get('/galeri/foto', [SchoolGalleryPublicController::class, 'index'])->name('gallery.photos');
Route::get('/galeri/video', [SchoolGalleryPublicController::class, 'videos'])->name('gallery.videos');
Route::get('/karya-siswa', [GalleryPublicController::class, 'index'])->name('gallery.student-projects');

// Download
Route::get('/download', [DownloadPublicController::class, 'index'])->name('downloads.index');

// Kontak
Route::get('/kontak', [ContactPublicController::class, 'index'])->name('contact.index');
Route::post('/kontak', [ContactPublicController::class, 'store'])->name('contact.store');

// PPDB
Route::get('/ppdb', [PPDBPublicController::class, 'index'])->name('ppdb.index');
Route::post('/ppdb', [PPDBPublicController::class, 'store'])->name('ppdb.store');
Route::get('/ppdb/success/{id}', [PPDBPublicController::class, 'success'])->name('ppdb.success');

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->middleware('guest')->name('login');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/account', function () {
        return Inertia::render('Account');
    })->name('account');

    // Admin Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        
        // Master Data
        Route::resource('school-profile', SchoolProfileController::class)->only(['index', 'update']);
        Route::resource('school-programs', SchoolProgramController::class);
        Route::resource('teachers', TeacherController::class);
        Route::resource('majors', MajorController::class);
        Route::resource('major-programs', MajorProgramController::class);
        Route::resource('student-projects', StudentProjectController::class);

        // Content
        Route::resource('activities', ActivityController::class);
        Route::resource('articles', ArticleController::class);
        Route::resource('gallery', GalleryController::class);
        Route::resource('downloads', DownloadController::class);
        Route::resource('testimonials', TestimonialController::class);
        
        // Home Settings (Single Resource-ish)
        Route::get('home-settings', [HomeSettingController::class, 'index'])->name('home-settings.index');
        Route::put('home-settings', [HomeSettingController::class, 'update'])->name('home-settings.update');

        // PPDB
        Route::get('ppdb/settings', [PPDBSettingController::class, 'index'])->name('ppdb.settings.index');
        Route::put('ppdb/settings', [PPDBSettingController::class, 'update'])->name('ppdb.settings.update');
    });
});

require __DIR__.'/auth.php';

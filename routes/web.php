<?php

use App\Http\Controllers\Admin\AcademicYearController;
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
use App\Http\Controllers\Admin\SiteSettingController;
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
})->middleware('guest');



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
        
        // Student Management
        Route::get('students/export', [App\Http\Controllers\Admin\StudentController::class, 'export'])->name('students.export');
        Route::get('students/template', [App\Http\Controllers\Admin\StudentController::class, 'template'])->name('students.template');
        Route::post('students/import', [App\Http\Controllers\Admin\StudentController::class, 'import'])->name('students.import');
        Route::resource('students', App\Http\Controllers\Admin\StudentController::class);

        // Content
        Route::resource('activities', ActivityController::class);
        Route::resource('articles', ArticleController::class);
        Route::resource('gallery', GalleryController::class);
        Route::resource('downloads', DownloadController::class);
        Route::resource('testimonials', TestimonialController::class);
        
        // Home Settings (Single Resource-ish)
        Route::get('home-settings', [HomeSettingController::class, 'index'])->name('home-settings.index');
        Route::put('home-settings', [HomeSettingController::class, 'update'])->name('home-settings.update');
        
        // Site Settings
        Route::get('site-settings', [SiteSettingController::class, 'index'])->name('site-settings.index');
        Route::post('site-settings', [SiteSettingController::class, 'update'])->name('site-settings.update');

        // PPDB
        Route::get('ppdb/settings', [PPDBSettingController::class, 'index'])->name('ppdb.settings.index');
        Route::put('ppdb/settings', [PPDBSettingController::class, 'update'])->name('ppdb.settings.update');

        // Academic Year Management
        Route::post('/academic-years/{academic_year}/set-active', [AcademicYearController::class, 'setActive'])->name('academic-years.set-active');
        Route::resource('academic-years', AcademicYearController::class);

        // Report Card Settings (Operator Only)
        Route::get('report-card-settings', [App\Http\Controllers\Admin\ReportCardSettingController::class, 'index'])->name('report-card-settings.index');
        Route::post('report-card-settings', [App\Http\Controllers\Admin\ReportCardSettingController::class, 'store'])->name('report-card-settings.store');

        // Permission Management
        Route::resource('permissions', \App\Http\Controllers\Admin\PermissionController::class)->except(['create', 'edit', 'show']);
    });
});

// Inertia Page Routes (Admin)
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    // Role Management Page
    // Role Management Page (Using resource for proper naming)
    Route::resource('roles', App\Http\Controllers\Admin\RoleController::class)->except(['create', 'edit', 'show']);
    Route::get('/roles', [App\Http\Controllers\Admin\RoleController::class, 'page'])->name('roles.index'); 
    
    // Master Data Pages
    Route::get('/classes', [App\Http\Controllers\Admin\ClassController::class, 'page'])->name('classes.index');
    Route::get('/subjects', [App\Http\Controllers\Admin\SubjectController::class, 'page'])->name('subjects.index');
    
    // Assignment Pages
    Route::get('/assignments/class-teachers', [App\Http\Controllers\Admin\ClassTeacherAssignmentController::class, 'page'])->name('assignments.class-teachers');
    Route::get('/assignments/subject-teachers', [App\Http\Controllers\Admin\SubjectTeacherAssignmentController::class, 'page'])->name('assignments.subject-teachers');

    // User Management Page
    Route::get('/users', [App\Http\Controllers\Admin\UserRoleController::class, 'page'])->name('users.index');
    Route::post('/users', [App\Http\Controllers\Admin\UserRoleController::class, 'storeUser'])->name('users.store');
    Route::put('/users/{id}', [App\Http\Controllers\Admin\UserRoleController::class, 'updateUser'])->name('users.update');
    Route::delete('/users/{id}', [App\Http\Controllers\Admin\UserRoleController::class, 'destroyUser'])->name('users.destroy');
});

// API RBAC Routes
Route::prefix('api/admin')->middleware(['auth'])->group(function () {
    // Role Management
    Route::get('/roles', [App\Http\Controllers\Admin\RoleController::class, 'index'])->name('api.admin.roles.index');
    Route::post('/roles', [App\Http\Controllers\Admin\RoleController::class, 'store'])->name('api.admin.roles.store');
    Route::get('/roles/{id}', [App\Http\Controllers\Admin\RoleController::class, 'show'])->name('api.admin.roles.show');
    Route::put('/roles/{id}', [App\Http\Controllers\Admin\RoleController::class, 'update'])->name('api.admin.roles.update');
    Route::delete('/roles/{id}', [App\Http\Controllers\Admin\RoleController::class, 'destroy'])->name('api.admin.roles.destroy');
    Route::get('/roles/{id}/permissions', [App\Http\Controllers\Admin\RoleController::class, 'permissions'])->name('api.admin.roles.permissions');
    Route::post('/roles/{id}/permissions', [App\Http\Controllers\Admin\RoleController::class, 'syncPermissions'])->name('api.admin.roles.syncPermissions');

    // Permission Management Routes Removed (Moved to Admin Resource)

    // User Role Management
    Route::get('/users/{userId}/roles', [App\Http\Controllers\Admin\UserRoleController::class, 'index'])->name('api.admin.users.roles.index');
    Route::post('/users/{userId}/roles', [App\Http\Controllers\Admin\UserRoleController::class, 'store'])->name('api.admin.users.roles.store');
    Route::delete('/users/{userId}/roles/{roleId}', [App\Http\Controllers\Admin\UserRoleController::class, 'destroy'])->name('api.admin.users.roles.destroy');

    // Master Data (Classes & Subjects)
    Route::apiResource('/classes', App\Http\Controllers\Admin\ClassController::class)->names('api.admin.classes');
    Route::apiResource('/subjects', App\Http\Controllers\Admin\SubjectController::class)->names('api.admin.subjects');

    // Assignment Management
    Route::prefix('class-teacher-assignments')->name('api.admin.class-teacher-assignments.')->group(function () {
        Route::get('/', [App\Http\Controllers\Admin\ClassTeacherAssignmentController::class, 'index'])->name('index');
        Route::post('/', [App\Http\Controllers\Admin\ClassTeacherAssignmentController::class, 'store'])->name('store');
        Route::delete('/{id}', [App\Http\Controllers\Admin\ClassTeacherAssignmentController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('subject-teacher-assignments')->name('api.admin.subject-teacher-assignments.')->group(function () {
        Route::get('/', [App\Http\Controllers\Admin\SubjectTeacherAssignmentController::class, 'index'])->name('index');
        Route::post('/', [App\Http\Controllers\Admin\SubjectTeacherAssignmentController::class, 'store'])->name('store');
        Route::delete('/{id}', [App\Http\Controllers\Admin\SubjectTeacherAssignmentController::class, 'destroy'])->name('destroy');
    });
});

// Teacher Routes (Guru Mapel & Wali Kelas)
Route::middleware(['auth'])->prefix('teacher')->name('teacher.')->group(function () {
    // Grade Management (Guru Mapel)
    Route::prefix('grades')->name('grades.')->group(function () {
        Route::get('/my-subjects', [App\Http\Controllers\Teacher\GradeController::class, 'mySubjects'])->name('my-subjects');
        Route::get('/input/{assignmentId}', [App\Http\Controllers\Teacher\GradeController::class, 'inputForm'])->name('input');
        Route::post('/store', [App\Http\Controllers\Teacher\GradeController::class, 'store'])->name('store');
        Route::put('/{id}', [App\Http\Controllers\Teacher\GradeController::class, 'update'])->name('update');
        Route::delete('/{id}', [App\Http\Controllers\Teacher\GradeController::class, 'destroy'])->name('destroy');
        Route::get('/recap/{assignmentId}', [App\Http\Controllers\Teacher\GradeController::class, 'recap'])->name('recap');
    });
    
    // Attendance Management (Wali Kelas)
    Route::prefix('attendance')->name('attendance.')->group(function () {
        Route::get('/my-class', [App\Http\Controllers\Teacher\AttendanceController::class, 'myClass'])->name('my-class');
        Route::post('/bulk-store', [App\Http\Controllers\Teacher\AttendanceController::class, 'bulkStore'])->name('bulk-store');
        Route::post('/bulk-store-recap', [App\Http\Controllers\Teacher\AttendanceController::class, 'bulkStoreRecap'])->name('bulk-store-recap');
        Route::put('/{id}', [App\Http\Controllers\Teacher\AttendanceController::class, 'update'])->name('update');
        Route::get('/recap', [App\Http\Controllers\Teacher\AttendanceController::class, 'recap'])->name('recap');
    });
    
    // Attitude Grade Management (Wali Kelas)
    Route::prefix('attitude-grades')->name('attitude-grades.')->group(function () {
        Route::get('/my-class', [App\Http\Controllers\Teacher\AttitudeGradeController::class, 'myClass'])->name('my-class');
        Route::post('/store', [App\Http\Controllers\Teacher\AttitudeGradeController::class, 'store'])->name('store');
        Route::put('/{id}', [App\Http\Controllers\Teacher\AttitudeGradeController::class, 'update'])->name('update');
        Route::post('/store-note', [App\Http\Controllers\Teacher\AttitudeGradeController::class, 'storeNote'])->name('store-note');
    });
    
    // Report Card (All Teachers)
    Route::prefix('report-card')->name('report-card.')->group(function () {
        Route::get('/my-class', [App\Http\Controllers\Teacher\ReportCardController::class, 'myClass'])->name('my-class');
        Route::get('/generate/{studentId}', [App\Http\Controllers\Teacher\ReportCardController::class, 'generate'])->name('generate');
        Route::get('/print/{studentId}', [App\Http\Controllers\Teacher\ReportCardController::class, 'print'])->name('print');
    });
});

// Portal Selection Routes
Route::get('/portal', function () {
    return Inertia::render('Auth/PortalSelection');
})->name('portal.index');

Route::get('/portal/siswa', function () {
    return Inertia::render('Shared/ComingSoon');
})->name('portal.siswa');

Route::get('/portal/cbt', function () {
    return Inertia::render('Shared/ComingSoon');
})->name('portal.cbt');

require __DIR__.'/auth.php';

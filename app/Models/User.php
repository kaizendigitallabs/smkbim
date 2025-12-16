<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

use Laravel\Sanctum\HasApiTokens;

use Illuminate\Database\Eloquent\Concerns\HasUuids;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, TwoFactorAuthenticatable, \Spatie\Permission\Traits\HasRoles, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];



    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Get the class assignments for the user (as wali kelas).
     */
    public function classAssignments()
    {
        return $this->hasMany(ClassTeacherAssignment::class);
    }

    /**
     * Get the subject assignments for the user (as guru mapel).
     */
    public function subjectAssignments()
    {
        return $this->hasMany(SubjectTeacherAssignment::class);
    }

    /**
     * Check if user is assigned as wali kelas.
     */
    public function isWaliKelas()
    {
        return $this->classAssignments()->exists();
    }

    /**
     * Check if user is assigned as guru mapel.
     */
    public function isGuruMapel()
    {
        return $this->subjectAssignments()->exists();
    }

    /**
     * Get assigned classes (as wali kelas).
     */
    public function getAssignedClasses()
    {
        return SchoolClass::whereIn('id', $this->classAssignments()->pluck('class_id'))->get();
    }

    /**
     * Get assigned subjects (as guru mapel).
     */
    public function getAssignedSubjects()
    {
        return $this->subjectAssignments()->with(['subject', 'schoolClass'])->get();
    }
    /**
     * Get the teacher profile associated with the user.
     */
    public function teacher()
    {
        return $this->hasOne(Teacher::class);
    }
}

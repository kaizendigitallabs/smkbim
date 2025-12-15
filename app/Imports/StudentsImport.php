<?php

namespace App\Imports;

use App\Models\Student;
use App\Models\User;
use App\Models\SchoolClass;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class StudentsImport implements ToModel, WithHeadingRow, WithValidation
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // Skip if NIS already exists
        if (Student::where('nis', $row['nis'])->exists()) {
            return null;
        }

        // Find Class ID
        $classId = null;
        if (!empty($row['kelas'])) {
            $schoolClass = SchoolClass::where('name', $row['kelas'])->first();
            $classId = $schoolClass ? $schoolClass->id : null;
        }

        // Create User (skip if email exists)
        if (User::where('email', $row['email'])->exists()) {
             return null;
        }

        $user = User::create([
            'name' => $row['nama'],
            'email' => $row['email'],
            // Default password is NIS or '12345678'
            'password' => Hash::make($row['nis'] ?? '12345678'),
        ]);

        $user->assignRole('siswa');

        $dob = null;
        if (isset($row['tanggal_lahir'])) {
            try {
                $dob = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['tanggal_lahir']);
            } catch (\Throwable $e) {
                // Fallback attempt if it's a string date like Y-m-d
                try {
                    $dob = \Carbon\Carbon::parse($row['tanggal_lahir']);
                } catch (\Throwable $e) {
                    $dob = null;
                }
            }
        }

        return new Student([
            'user_id' => $user->id,
            'nis' => $row['nis'],
            'nisn' => $row['nisn'],
            'class_id' => $classId,
            'place_of_birth' => $row['tempat_lahir'],
            'date_of_birth' => $dob,
            'gender' => $row['jenis_kelamin'], // L/P
            'address' => $row['alamat'],
            'parent_phone' => $row['no_hp_ortu'],
            'religion' => $row['agama'] ?? null,
            'father_name' => $row['nama_ayah'] ?? null,
            'mother_name' => $row['nama_ibu'] ?? null,
            'guardian_name' => $row['nama_wali'] ?? null,
            'father_job' => $row['pekerjaan_ayah'] ?? null,
            'mother_job' => $row['pekerjaan_ibu'] ?? null,
            'guardian_job' => $row['pekerjaan_wali'] ?? null,
            'previous_school' => $row['asal_sekolah'] ?? null,
            'entry_year' => $row['tahun_masuk'] ?? null,
        ]);
    }

    public function rules(): array
    {
        return [
            'nama' => 'required',
            'email' => 'required|email',
            'nis' => 'required',
        ];
    }
}

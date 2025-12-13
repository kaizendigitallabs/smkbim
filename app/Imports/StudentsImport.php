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
        // Find Class ID
        $classId = null;
        if (!empty($row['kelas'])) {
            $schoolClass = SchoolClass::where('name', $row['kelas'])->first();
            $classId = $schoolClass ? $schoolClass->id : null;
        }

        // Create User (if not exists ideally, but simple logic creates new or errors if unique constraint)
        // Check uniqueness manually to avoid error crash?
        if (User::where('email', $row['email'])->exists()) {
             // Skip or Update? Let's skip existing emails to prevent duplicate entry errors
             return null;
        }

        $user = User::create([
            'name' => $row['nama'],
            'email' => $row['email'],
            // Default password is NIS or '12345678'
            'password' => Hash::make($row['nis'] ?? '12345678'),
        ]);

        $user->assignRole('siswa');

        return new Student([
            'user_id' => $user->id,
            'nis' => $row['nis'],
            'nisn' => $row['nisn'],
            'class_id' => $classId,
            'place_of_birth' => $row['tempat_lahir'],
            'date_of_birth' => isset($row['tanggal_lahir']) ? \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['tanggal_lahir']) : null,
            'gender' => $row['jenis_kelamin'], // L/P
            'address' => $row['alamat'],
            'parent_phone' => $row['no_hp_ortu'],
        ]);
    }

    public function rules(): array
    {
        return [
            'nama' => 'required',
            'email' => 'required|email',
            'nis' => 'required|unique:students,nis',
        ];
    }
}

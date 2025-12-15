<?php

namespace App\Imports;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class TeachersImport implements ToModel, WithHeadingRow, WithValidation
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // Check uniqueness manually to avoid error crash
        if (User::where('email', $row['email'])->exists()) {
             // Skip existing emails
             return null;
        }

        $user = User::create([
            'name' => $row['nama'],
            'email' => $row['email'],
            // Default password is NIP if available, otherwise 'password'
            'password' => Hash::make($row['nip'] ?? 'password'),
        ]);

        $user->assignRole('guru');

        return new Teacher([
            'user_id' => $user->id,
            'name' => $row['nama'],
            'email' => $row['email'], // Sync email if teacher table has it (Teacher model doesn't have email column usually, checks User)
            // Wait, Teacher model doesn't have email column in schema, it's on User.
            // But TeacherController stores it? TeacherController stores validated['email'] to User, not Teacher.
            // Let's check Teacher model fillable again. 
            // Teacher Model fillable: name, position, subject, contact, photo, is_active, order, user_id, nip, nuptk, gender, place_of_birth, date_of_birth, address, last_education, education_major, university.
            
            'nip' => $row['nip'] ?? null,
            'nuptk' => $row['nuptk'] ?? null,
            'position' => $row['jabatan'] ?? 'Guru',
            'subject' => $row['mapel'] ?? null, // Assuming 'mapel' column
            'contact' => $row['kontak'] ?? null,
            'gender' => $row['jenis_kelamin'] ?? null, // L/P
            'place_of_birth' => $row['tempat_lahir'] ?? null,
            'date_of_birth' => isset($row['tanggal_lahir']) ? \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['tanggal_lahir']) : null,
            'address' => $row['alamat'] ?? null,
            'last_education' => $row['pendidikan_terakhir'] ?? null,
            'education_major' => $row['jurusan'] ?? null,
            'university' => $row['universitas'] ?? null,
            'is_active' => true,
            'order' => 0,
        ]);
    }

    public function rules(): array
    {
        return [
            'nama' => 'required',
            'email' => 'required|email',
        ];
    }
}

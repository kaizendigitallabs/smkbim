<?php

namespace App\Imports;

use App\Models\Subject;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Illuminate\Validation\Rule;

class SubjectsImport implements ToModel, WithHeadingRow, WithValidation
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // Skip if code already exists to prevent duplication error if not handled by validation
        // (Validation handles 'unique', but good to be safe or update?)
        // For now, simple create. Logic:
        
        return new Subject([
            'name'          => $row['nama_mapel'],
            'code'          => $row['kode_mapel'],
            'subject_group' => $row['kelompok'],
            'display_order' => $row['urutan'] ?? 0,
            'description'   => $row['deskripsi'] ?? null,
        ]);
    }

    public function rules(): array
    {
        return [
            'nama_mapel' => 'required',
            'kode_mapel' => 'required|unique:subjects,code',
            'kelompok'   => ['required', Rule::in(['A', 'B', 'C'])],
            'urutan'     => 'nullable|integer',
        ];
    }

    public function customValidationMessages()
    {
        return [
            'kode_mapel.unique' => 'Kode Mapel :input sudah ada.',
            'kelompok.in'       => 'Kelompok harus A, B, atau C.',
        ];
    }
}

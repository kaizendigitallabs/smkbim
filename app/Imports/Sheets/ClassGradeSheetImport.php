<?php

namespace App\Imports\Sheets;

use App\Models\Grade;
use App\Models\Student;
use App\Models\SubjectTeacherAssignment;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ClassGradeSheetImport implements ToCollection, WithHeadingRow
{
    protected $classId;
    protected $type;
    protected $semester;
    protected $academicYear;

    public function __construct($classId, $type, $semester, $academicYear)
    {
        $this->classId = $classId;
        $this->type = $type;
        $this->semester = $semester;
        $this->academicYear = $academicYear;
    }

    public function collection(Collection $rows)
    {
        $assignments = SubjectTeacherAssignment::with('subject')
            ->where('class_id', $this->classId)
            ->orWhereNull('class_id')
            ->get();
            
        $subjectMap = [];
        foreach ($assignments as $assignment) {
            $slug = \Illuminate\Support\Str::slug($assignment->subject->name, '_');
            $subjectMap[$slug] = $assignment->id;
            $subjectMap[strtolower($assignment->subject->name)] = $assignment->id;
        }

        // Cache students to avoid N+1, though 'whereIn' or full fetch is better for bulk
        // For now, let's just optimize slightly by eager loading? 
        // Or just keep the simple query per row if class size is small (<40). 
        // Optimizing: fetch all students in class first.
        
        foreach ($rows as $row) {
            // Support 'nis' or 'NIS' via HeadingRow normalization (slugs)
            // Laravel excel slugs headings: 'NIS' -> 'nis', 'Nama Siswa' -> 'nama_siswa'
            if (!isset($row['nis'])) continue;

            $student = Student::where('nis', $row['nis'])->first();
            if (!$student) continue;

            foreach ($row as $key => $value) {
                if (in_array($key, ['nis', 'nama_siswa', 'no', '0'])) continue;
                if ($value === null || $value === '') continue;

                 if (isset($subjectMap[$key])) {
                     $assignmentId = $subjectMap[$key];
                     
                     Grade::updateOrCreate(
                         [
                             'student_id' => $student->id,
                             'subject_teacher_assignment_id' => $assignmentId,
                             'type' => $this->type,
                             'semester' => $this->semester,
                             'academic_year' => $this->academicYear,
                         ],
                         [
                             'score' => (float) $value,
                             'date' => now(),
                             'description' => 'Imported Bulk',
                         ]
                     );
                 }
            }
        }
    }
}

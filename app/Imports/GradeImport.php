<?php

namespace App\Imports;

use App\Models\Grade;
use App\Models\Student;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Validator;

class GradeImport implements ToCollection, WithHeadingRow
{
    protected $assignmentId;
    protected $semester;
    protected $academicYear;

    public function __construct($assignmentId, $semester, $academicYear)
    {
        $this->assignmentId = $assignmentId;
        $this->semester = $semester;
        $this->academicYear = $academicYear;
    }

    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            $nis = $row['nis'] ?? null;
            if (!$nis) continue; 

            $student = Student::where('nis', $nis)->first();
            if (!$student) continue;

            // Dynamic column handling
            // We iterate over the row keys to find matching patterns
            foreach ($row as $key => $value) {
                if ($value === null) continue; // Skip empty cells
                
                $type = null;
                $description = null;

                // Check for UH (Daily Exam)
                // Pattern: uh_1, uh_2, ... uh_10, etc.
                if (preg_match('/^uh_(\d+)$/', $key, $matches)) {
                    $type = 'daily_exam';
                    $description = 'UH ' . $matches[1];
                }
                // Check for Tugas (Daily)
                // Pattern: tugas_1, tugas_2, ...
                elseif (preg_match('/^tugas_(\d+)$/', $key, $matches)) {
                     $type = 'daily';
                     $description = 'Tugas ' . $matches[1];
                }
                // Check for UTS
                elseif ($key === 'uts') {
                    $type = 'midterm';
                }
                // Check for UAS
                elseif ($key === 'uas') {
                    $type = 'final';
                }

                if ($type) {
                    $this->saveGrade($student, $type, $description, $value);
                }
            }
        }
    }

    protected function saveGrade($student, $type, $description, $score)
    {
        $query = Grade::where('student_id', $student->id)
            ->where('subject_teacher_assignment_id', $this->assignmentId)
            ->where('type', $type)
            ->where('semester', $this->semester)
            ->where('academic_year', $this->academicYear);

        if ($type === 'midterm' || $type === 'final') {
            // Unique per semester
            $grade = $query->first();
        } else {
            // Unique per description (column name)
            if ($description) {
                $query->where('description', $description);
                $grade = $query->first();
            } else {
                 $grade = null;
            }
        }

        if ($grade) {
            $grade->update([
                'score' => $score,
                'date' => now(), 
            ]);
        } else {
            Grade::create([
                'student_id' => $student->id,
                'subject_teacher_assignment_id' => $this->assignmentId,
                'type' => $type,
                'score' => $score,
                'description' => $description,
                'date' => now(),
                'semester' => $this->semester,
                'academic_year' => $this->academicYear,
            ]);
        }
    }
}

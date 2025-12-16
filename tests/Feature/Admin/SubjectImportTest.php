<?php

namespace Tests\Feature\Admin;

use App\Models\Subject;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

use Maatwebsite\Excel\Facades\Excel;

class SubjectImportTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Run seeders if necessary, e.g., permissions/roles
        $this->seed();
        
        // Mock the disk for excel storage
        \Illuminate\Support\Facades\Storage::fake('test_disks');
        config(['filesystems.disks.test_disks' => [
            'driver' => 'local',
            'root'   => storage_path('framework/testing/disks/test_disks'),
        ]]);
    }

    public function test_admin_can_download_import_template()
    {
        $admin = User::factory()->create();
        $admin->assignRole('super_admin');

        $response = $this->actingAs($admin)->get(route('api.admin.subjects.template'));

        $response->assertStatus(200);
        $response->assertHeader('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }

    public function test_admin_can_import_subjects_via_excel()
    {
        $admin = User::factory()->create();
        $admin->assignRole('super_admin');

        // Generate a valid Excel file using the export class
        $export = new \App\Exports\SubjectsTemplateExport();
        Excel::store($export, 'subjects.xlsx', 'test_disks');
        
        $file = new UploadedFile(
            storage_path('framework/testing/disks/test_disks/subjects.xlsx'), 
            'subjects.xlsx', 
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
            null, 
            true
        );

        $response = $this->actingAs($admin)->post(route('api.admin.subjects.import'), [
            'file' => $file,
        ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect();

        // The export class has 'Matematika' as the first example subject
        $this->assertDatabaseHas('subjects', [
            'name' => 'Matematika',
            'code' => 'MAT01',
            'subject_group' => 'A',
        ]);
    }

    public function test_import_fails_with_invalid_data()
    {
        $admin = User::factory()->create();
        $admin->assignRole('super_admin');

        // Invalid data: Duplicate code within file (or DB), Invalid Group
        // Creating existing subject to test uniqueness
        Subject::create([
            'name' => 'Existing Subject',
            'code' => 'EXIST',
            'subject_group' => 'A',
        ]);

        $header = "Nama Mapel,Kode Mapel,Kelompok,Urutan,Deskripsi";
        $row1 = "New Subject,EXIST,A,1,"; // Duplicate code
        $row2 = "Invalid Group,INV,Z,2,"; // Invalid group 'Z'

        $content = implode("\n", [$header, $row1, $row2]);
        $file = UploadedFile::fake()->createWithContent('invalid.csv', $content);

        $response = $this->actingAs($admin)->post(route('api.admin.subjects.import'), [
            'file' => $file,
        ]);

        // Expecting validation errors in session
        $response->assertSessionHasErrors();
        
        // We can inspect errors specifically if needed, but existence is enough for now
        // Usually Maatwebsite validation errors are keyed by row
    }
}

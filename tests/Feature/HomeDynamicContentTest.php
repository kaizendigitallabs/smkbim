<?php

namespace Tests\Feature;

use App\Models\HomeSetting;
use App\Models\SchoolProfile;
use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HomeDynamicContentTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Seed roles
        $role = Role::create(['name' => 'super_admin']);
    }

    public function test_admin_can_update_dynamic_home_settings()
    {
        $admin = User::factory()->create();
        $admin->assignRole('super_admin');

        $this->actingAs($admin);

        // Initial Setting (or empty)
        $initial = HomeSetting::create(['hero_title' => 'Old Title']);

        $response = $this->put(route('admin.home-settings.update', $initial->id), [
            'hero_title' => 'New Dynamic Title',
            'metric_1_label' => 'Total Siswa',
            'metric_1_value' => '1000',
            'hero_feature_1' => 'Fitur Baru 1',
        ]);

        $response->assertRedirect();
        
        $this->assertDatabaseHas('home_settings', [
            'hero_title' => 'New Dynamic Title',
            'metric_1_label' => 'Total Siswa',
            'metric_1_value' => '1000',
            'hero_feature_1' => 'Fitur Baru 1',
        ]);
    }

    public function test_admin_can_update_accreditation()
    {
        $admin = User::factory()->create();
        $admin->assignRole('super_admin');
        
        $this->actingAs($admin);

        $profile = SchoolProfile::create(['name' => 'SMK Test']);

        $response = $this->put(route('admin.school-profile.update', $profile->id), [
            'name' => 'SMK Test Updated',
            'accreditation_grade' => 'A+',
            'accreditation_label' => 'Sangat Unggul',
        ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('school_profiles', [
            'accreditation_grade' => 'A+',
            'accreditation_label' => 'Sangat Unggul',
        ]);
    }

    public function test_public_home_page_shows_dynamic_content()
    {
        // Setup Data
        HomeSetting::create([
            'hero_title' => 'Dynamic Hero Title',
            'metric_1_value' => '999',
            'metric_1_label' => 'Siswa Test',
            'hero_feature_1' => 'Bullet Test 1',
        ]);

        SchoolProfile::create([
            'name' => 'SMK Test',
            'accreditation_grade' => 'B',
            'accreditation_label' => 'Baik',
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        // Inertia asserts
        $response->assertSee('Dynamic Hero Title');
        $response->assertSee('999');
        $response->assertSee('Bullet Test 1');
        $response->assertSee('Siswa Test'); // Although hard to test formatted text sometimes
        $response->assertSee('B');
        $response->assertSee('Baik');
    }
}

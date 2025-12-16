<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use App\Models\PPDBSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Spatie\Permission\Models\Role;

class PPDBSettingTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\RolesAndPermissionsSeeder::class);
    }

    public function test_admin_can_update_ppdb_settings()
    {
        $admin = User::factory()->create();
        $admin->assignRole('super_admin');

        $this->actingAs($admin)
            ->put(route('admin.ppdb.settings.update'), [
                'is_open' => true,
                'start_date' => '2024-01-01',
                'end_date' => '2024-12-31',
                'quota' => 100,
                'requirements' => 'Requirements test',
                'contact_info' => 'Contact info test',
            ])
            ->assertRedirect();

        $this->assertEquals('1', PPDBSetting::where('key', 'is_open')->value('value'));
        $this->assertEquals('Requirements test', PPDBSetting::where('key', 'requirements')->value('value'));
    }

    public function test_public_registration_page_shows_settings()
    {
        // Set settings
        PPDBSetting::updateOrCreate(['key' => 'is_open'], ['value' => '1']);
        PPDBSetting::updateOrCreate(['key' => 'requirements'], ['value' => 'Public requirements']);

        $response = $this->get(route('ppdb.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('PPDB/Register')
            ->where('settings.requirements', 'Public requirements')
            ->where('isOpen', true)
        );
    }

    public function test_public_registration_page_shows_closed_state()
    {
        // Set settings
        PPDBSetting::updateOrCreate(['key' => 'is_open'], ['value' => '0']);
        
        $response = $this->get(route('ppdb.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('PPDB/Register')
            ->where('isOpen', false)
        );
    }
}

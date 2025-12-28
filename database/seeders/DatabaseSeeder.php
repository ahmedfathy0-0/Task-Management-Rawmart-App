<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User 1
        User::factory()
            ->has(
                \App\Models\Task::factory()->count(5)->state(function (array $attributes, User $user) {
                    return ['user_id' => $user->id];
                })
            )
            ->create([
                'name' => 'Admin User',
                'email' => 'admin@rawmart.com',
                'password' => 'password',
            ]);

        // User 2
        User::factory()
             ->has(
                \App\Models\Task::factory()->count(3)->state(function (array $attributes, User $user) {
                    return ['user_id' => $user->id];
                })
            )
            ->create([
                'name' => 'Regular User',
                'email' => 'user@rawmart.com',
                'password' => 'password',
            ]);
    }
}

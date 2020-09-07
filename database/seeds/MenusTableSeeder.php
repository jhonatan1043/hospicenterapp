<?php

use Illuminate\Database\Seeder;
use App\Http\Modelos\MenuPermiso;
class MenusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(MenuPermiso::class)->times(5)->create();
    }
}

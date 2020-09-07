<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Blade;
use App\Http\Controllers\Administracion\MenuPermisoController;



class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        view()->composer("plantilla.sidebar",function($view){
            $menu = MenuPermisoController::menus(); 
            $view->with('menusComposer', $menu );  
            });
            View::share('plantilla'); 
    
            view()->composer("contenido.contenido",function($view){
                $menu = MenuPermisoController::menus(); 
                $view->with('menusComposer', $menu );  
                });
                View::share('contenido'); 

        //directiva personalizada de blade para el envio de datos atravez de laravel y vue
           Blade::directive('prop', function ($expression) {
             return "<?php echo \App\Vue::prop({$expression}); ?>";
           });     
       
    }
}

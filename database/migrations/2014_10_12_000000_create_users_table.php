<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admin_usuariosistema', function (Blueprint $table) {
            $table->integer('idTercero');
            $table->foreign('idTercero')->references('idTercero')->on('admin_tercero');
            $table->integer('idPerfil');
            $table->foreign('idPerfil')->references('idPerfil')->on('admin_perfilmenu');
            $table->string('usuario')->unique();
            $table->string('password');
            $table->boolean('activo')->default(1);
           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admin_usuariosistema');
    }
}

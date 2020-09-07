<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/main', function () {
    return view('contenido/contenido');
})->name('main');

Route::get('/', 'Auth\LoginController@showLoginForm');
Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('/logout', 'Auth\LoginController@logout');

Route::get('/login/empresaListar', 'Auth\LoginController@usuarioEmpresaListar');
Route::get('/login/usuarioPuntoListar', 'Auth\LoginController@usuarioPuntoListar');
Route::get('/login/usuarioConsultar', 'Auth\LoginController@usuarioConsultar');
Route::get('/login/sessionUsuarioActual', 'Auth\LoginController@sessionUsuarioActual');

/*Administracion*/ 
Route::get('/listaEmpresa', 'Administracion\EmpresaController@listaEmpresa');
Route::get('/comboPais', 'Administracion\EmpresaController@comboPais');
Route::get('/comboDepartamento', 'Administracion\EmpresaController@comboDepartamento');
Route::get('/comboMunicipio', 'Administracion\EmpresaController@comboMunicipio');
Route::get('/empresa/listaResolucion', 'Administracion\EmpresaController@cargarResolucion');

/*Roles y Permisos*/
Route::get('/perfilMenu/cargarModuloSinAsignar', 'Administracion\PermisoRoles@cargarModuloSinAsignar');
Route::get('/perfilMenu/cargarModuloAsignados', 'Administracion\PermisoRoles@cargarModuloAsignados');
Route::get('/perfilMenu/cargarFormularioSinAsignar', 'Administracion\PermisoRoles@cargarFormularioSinAsignar');
Route::get('/perfilMenu/cargarFormularioAsignado', 'Administracion\PermisoRoles@cargarFormularioAsignado');
Route::post('/perfilMenu/crearPermisosAsignados', 'Administracion\PermisoRoles@crearPermisosAsignados');
Route::get('/perfilMenu/puntoEmpresaListar', 'Administracion\PermisoRoles@puntoEmpresaListar');

/*punto de servicio*/
Route::get('/listaPuntoServicio', 'Administracion\PuntoServicioController@index');
Route::get('/puntoServicio/consultar', 'Administracion\PuntoServicioController@ConsultarTercero');
Route::get('/puntoServicio/cargar','Administracion\PuntoServicioController@cargarPuntoServicio');
Route::post('/puntoServicio/guardar', 'Administracion\PuntoServicioController@store');
Route::put('/puntoServicio/actualizar', 'Administracion\PuntoServicioController@actualizar');
Route::put('/PuntoServicio/anular', 'Administracion\PuntoServicioController@anular');

/*Tercero*/
Route::get('/tercero/terceroListar', 'Administracion\TerceroController@cargarTerceroListar');
Route::post('/tercero/terceroCrear', 'Administracion\TerceroController@terceroCrear');
Route::put('/tercero/terceroActualizar', 'Administracion\TerceroController@terceroActualizar');
Route::get('/tercero/registroTerceroCargar', 'Administracion\TerceroController@registroTerceroCargar');
Route::get('/tercero/registroTerceroRut', 'Administracion\TerceroController@registroTerceroRut');

/* usuario */
Route::get('/usuario', 'Administracion\UsuarioController@index');
Route::get('/usuario/consultarTercero', 'Administracion\UsuarioController@consultarTerceroUsuario');
Route::get('/usuario/listar', 'Administracion\UsuarioController@usuarioListar');
Route::get('/usuario/asignarUsuario', 'Administracion\UsuarioController@asignarUsuario');
Route::post('/usuario/registrar', 'Administracion\UsuarioController@store');
Route::put('/usuario/actualizar', 'Administracion\UsuarioController@update');

/** Administracion.Cliente */
Route::get('/cliente/consultar', 'Administracion\ClienteController@consultarClientes');
Route::get('/cliente/consultar/tercero', 'Administracion\ClienteController@consultarClienteTercero');
Route::get('/cliente/cargar', 'Administracion\ClienteController@index');
Route::post('/cliente/guardar', 'Administracion\ClienteController@store');
Route::get('/cliente/listar', 'Administracion\ClienteController@clienteListar');
Route::put('/cliente/anular', 'Administracion\ClienteController@anularCliente');
Route::put('/cliente/actualizar', 'Administracion\ClienteController@actualizar');

/**Administracion.Proveedor */
Route::get('/proveedor/consultar', 'Administracion\ProveedorController@consultarProveedor');
Route::get('/proveedor/cargar', 'Administracion\ProveedorController@index');
Route::post('/proveedor/guardar', 'Administracion\ProveedorController@store');
Route::get('/proveedor/listar', 'Administracion\ProveedorController@proveedorListar');
Route::put('/proveedor/anular', 'Administracion\ProveedorController@anularProveedor');
Route::put('/proveedor/actualizar', 'Administracion\ProveedorController@actualizar');

/* General.tipoIdentificacion */
Route::get('/tipoIdentificacion', 'General\TipoIdentificacionController@Index');
Route::get('/tipoIdentificacionListar', 'General\TipoIdentificacionController@listar');
Route::post('/tipoIdentificacion/registrar', 'General\TipoIdentificacionController@store');
Route::put('/tipoIdentificacion/actualizar', 'General\TipoIdentificacionController@update');
Route::put('/tipoIdentificacion/anular', 'General\TipoIdentificacionController@anular');

  /* General.descripciones*/
Route::get('/general/descripciones/pag', 'General\descGeneralController@index');
Route::post('/descripcionGeneral/registrar', 'General\descGeneralController@store');
Route::put('/descripcionGeneral/actualizar', 'General\descGeneralController@update');
Route::put('/descripcionGeneral/anular', 'General\descGeneralController@anular');
Route::get('/general/descripciones', 'Asistencial\PacienteController@consultarDescripciones');

  /* General.parametro */
Route::get('/Parametros', 'General\ParametroController@Index');
Route::post('/parametro/registrar', 'General\ParametroController@store');
Route::put('/parametro/actualizar', 'General\ParametroController@update');

/*General.Entono*/
Route::get('/entorno', 'General\EntornoController@Index');
Route::get('/entorno/consultarentornos', 'General\EntornoController@consultarEntornos');
Route::post('/entorno/registrar', 'General\EntornoController@store');
Route::put('/entorno/actualizar', 'General\EntornoController@update');
Route::put('/entorno/anular', 'General\EntornoController@anular');

/* General Administraodora */
Route::get('/administradora', 'General\AdministradoraController@Index');

/* General.EntornoServicioCama */
Route::get('/entornoservicio', 'General\EntornoServicioCamaController@index');
Route::get('/entornoservicio/entornos', 'General\EntornoServicioCamaController@entornoServicio');
Route::get('/entornoservicio/listar', 'General\EntornoServicioCamaController@entornoServicioCamaListar');
Route::post('/entornoservicio/registrar', 'General\EntornoServicioCamaController@store');
Route::put('/entornoservicio/actualizar', 'General\EntornoServicioCamaController@update');
Route::put('/entornoservicio/anular', 'General\EntornoServicioCamaController@anular');

/* General. manual Tarifario */
Route::post('/servicios/registrar', 'General\ManualTarifarioController@guardarServicio');
Route::post('/servicios/registrar/homologacion', 'General\ManualTarifarioController@guardarHomologacionServicio');
Route::get('/servicios', 'General\ManualTarifarioController@consultarServicio');
Route::get('/servicios/buscarcups', 'General\ManualTarifarioController@buscarCups');
Route::get('/servicios/buscarsoat', 'General\ManualTarifarioController@buscarSoat');
Route::get('/servicios/buscariss', 'General\ManualTarifarioController@buscarIss');
Route::get('/serviciosiss', 'General\ManualTarifarioController@consultarServicioISS');
Route::get('/serviciossoat', 'General\ManualTarifarioController@consultarServicioSoat');
Route::get('/servicioscups', 'General\ManualTarifarioController@consultarServicioCups');

Route::get('/tarifas', 'General\TarifaController@index');
Route::post('/tarifas/registrar', 'General\TarifaController@store');
Route::put('/tarifas/actualizar', 'General\TarifaController@update');
Route::put('/tarifas/anular', 'General\TarifaController@anular');
/* Asistencial */

    /*paciente */
Route::get('/paciente', 'Asistencial\PacienteController@Index');
Route::get('/pacienteVerificarTriage', 'Asistencial\PacienteController@verificarPacienteTriage');
Route::get('/listarPacientes', 'Asistencial\PacienteController@listarPaciente');
Route::get('/tipoIdentificacion', 'Asistencial\PacienteController@consultarTipoIdentificacion');
Route::get('/consultarAfiliacion', 'Asistencial\PacienteController@consultarAfiliacion');
Route::get('/consultarAdministradora', 'Asistencial\PacienteController@consultarAdministradora');
Route::post('/paciente/registrar', 'Asistencial\PacienteController@crearPaciente');
Route::put('/paciente/actualizar', 'Asistencial\PacienteController@actualizarPaciente');
Route::put('/paciente/eliminar', 'Asistencial\PacienteController@eliminarPaciente');
Route::get('/consultarPaciente', 'Asistencial\PacienteController@consultarPaciente');
Route::get('/cargarPacienteTriage', 'Asistencial\PacienteController@cargarPacienteTriage');

    /* Admisiones */ 
Route::get('/admision/verificarPaciente', 'Asistencial\AdmisionController@verificarPaciente');
Route::get('/admision/consultarPaciente', 'Asistencial\AdmisionController@consultarPaciente');
Route::get('/admision/cargarEspecialidad', 'Asistencial\AdmisionController@cargarEspecialidad');
Route::get('/admision/listar', 'Asistencial\AdmisionController@admisionListar');
Route::post('/admision/guardarAdmision', 'Asistencial\AdmisionController@guardarAdmision');
Route::put('/admision/actualizarAdmision', 'Asistencial\AdmisionController@guardarAdmision');
Route::get('/admision/cargarContrato', 'Asistencial\AdmisionController@cargarContrato');
Route::post('/admision/subirArchivos', 'Asistencial\AdmisionController@guardarPDF');
Route::get('/admision/consultarAdmision', 'Asistencial\AdmisionController@consultarAdmision');
Route::get('/admision/consultarAcompañante', 'Asistencial\AdmisionController@consultaAcompañante');
Route::put('/admision/anularAdmision', 'Asistencial\AdmisionController@anularAdmision');

/*Ingreso */
Route::get('/ingreso/busquedaAdmision', 'Asistencial\IngresoController@busquedaAdmision');
Route::get('/ingreso/cargarAdmision', 'Asistencial\IngresoController@cargarAdmision');
Route::get('/ingreso/busquedaDiagnosticos', 'Asistencial\IngresoController@busquedaDiagnosticos');
Route::get ('/ingreso/viaIngresos','Asistencial\IngresoController@cargarViaIngreso' );
Route::get ('/ingreso/servicio','Asistencial\IngresoController@cargarServicio' );
Route::get ('/ingreso/area','Asistencial\IngresoController@cargaArea' );
Route::get ('/ingreso/cama','Asistencial\IngresoController@cargaCama' );
Route::post ('/ingreso/guardar','Asistencial\IngresoController@guardarIngreso' );
Route::get ('/ingreso/listar','Asistencial\IngresoController@listarIngreso' );
Route::get ('/ingreso/cargar','Asistencial\IngresoController@cargarIngreso' );
Route::get ('/ingreso/diagnosticos','Asistencial\IngresoController@cargarDiagnostico' );
Route::put ('/ingreso/anular','Asistencial\IngresoController@anularIngreso' );

    /* Triage */  
Route::get('/listarTriage', 'Asistencial\TriageController@listarTriage');
Route::get('/pacientePorIdentificacion', 'Asistencial\TriageController@consultarPacienteIdent');
Route::get('/consultarTriage', 'Asistencial\TriageController@consultarTriage');
Route::get('/consultarRegistroTriage', 'Asistencial\TriageController@consultarRegistroTriage');
Route::get('/consultarSintoma', 'Asistencial\TriageController@consultarSintomas');
Route::post('/triageRegistrar', 'Asistencial\TriageController@crearTriage');
Route::put('/triageActualizar', 'Asistencial\TriageController@ActualizarTriage');
Route::put('/triageanular', 'Asistencial\TriageController@anularRegistro');

/* Contrato */
Route::get('/contrato/cargarContrato', 'Asistencial\ContratoController@cargarContrato');
Route::get('/contrato/cargarContratoAdministradora', 'Asistencial\ContratoController@cargarContratoAdministradora');
Route::get('/contrato/cargarContratoAreaServicio', 'Asistencial\ContratoController@cargarContratoAreaServicio');
Route::get('/contrato/listarContratos', 'Asistencial\ContratoController@listarContratos');
Route::post('/contrato/registrar', 'Asistencial\ContratoController@crearContrato');
Route::put('/contrato/actualizar', 'Asistencial\ContratoController@actualizarContrato');
/* HistoriaClinica */

/*Ingreso Medico */
Route::get('/historiaClinica/ingresoPacienteListar', 'HistoriaClinica\PacienteListadoController@ingresoPacienteListar');   
Route::post('/historiaClinica/ingresoAdulto/registrar','HistoriaClinica\IngresoAdultoController@informacionIngresoRegistrar');
Route::get('/historiaClinica/ingresoAdulto/cargar','HistoriaClinica\IngresoAdultoController@informacionIngresoCargar');
Route::get('/historiaClinica/ingresoAdulto/cargar/antFam','HistoriaClinica\IngresoAdultoController@informacionIngresoAntFamCargar');
Route::get('/historiaClinica/ingresoAdulto/cargar/antPers','HistoriaClinica\IngresoAdultoController@informacionIngresoAntPersCargar');
Route::get('/historiaClinica/ingresoAdulto/cargar/diagnostico','HistoriaClinica\IngresoAdultoController@informacionIngresoDiagnosticoCargar');
Route::post('/historiaClinica/ingresoNeonato/registrar','HistoriaClinica\IngresoNeonatoController@informacionIngresoRegistrar');

/*Epicrisis*/
Route::get('/epicrisi/pacienteCargar', 'HistoriaClinica\EpicrisisController@cargarDatosPaciente');   
Route::get('/epicrisi/diagnosticosCargar', 'HistoriaClinica\EpicrisisController@cargarDiagnosticoUltimaEvo');
Route::get('/epicrisi/estadoPaciente', 'HistoriaClinica\EpicrisisController@cargarEstadoPaciente');   
Route::post('/epicrisi/guardar', 'HistoriaClinica\EpicrisisController@guardarEpicrisis');   

/*Orden medica */
Route::get('/ordenMedica/medicamentos', 'HistoriaClinica\OrdenMedicaController@MedicamentosConsultar');
Route::get('/ordenMedica/paraclinicos', 'HistoriaClinica\OrdenMedicaController@paraclinicosConsultar'); 
Route::get('/historiaClinica/ingresoPacienteCargar', 'HistoriaClinica\PacienteListadoController@ingresoPacienteCargar'); 
Route::post('/ordenMedica/registrar','HistoriaClinica\OrdenMedicaController@ordenMedicaGuardar');  
Route::get('/ordenMedica/listar','HistoriaClinica\OrdenMedicaController@ordenMedicaListar');  
Route::get('/ordenMedica/cargar','HistoriaClinica\OrdenMedicaController@ordenMedicaCargar'); 
Route::get('/ordenMedica/estacia/cargar','HistoriaClinica\OrdenMedicaController@ordenMedicaEstanciaCargar');  
Route::get('/ordenMedica/oxigeno/cargar','HistoriaClinica\OrdenMedicaController@ordenMedicaOxigenoCargar');  
Route::get('/ordenMedica/paraclinico/cargar','HistoriaClinica\OrdenMedicaController@ordenMedicaParaclinicoCargar');  
Route::get('/ordenMedica/medicamentos/cargar','HistoriaClinica\OrdenMedicaController@ordenMedicaMedicamentoCargar');  
Route::get('/ordenMedica/interconsulta/cargar','HistoriaClinica\OrdenMedicaController@ordenMedicaInterconsultaCargar');  
 
/*Facturacion*/
Route::get('/facturaConsolidado/procedimientos', 'Facturacion\FacturaConsolidadoController@cargarProcedimientos'); 

/*Enfermeria*/
Route::post('/historiaClinica/enfermeria/registarInsumos', 'HistoriaClinica\EnfermeriaController@guardarInsumos');
Route::post('/historiaClinica/enfermeria/registrar', 'HistoriaClinica\EnfermeriaController@registrarNotasEnfermeria');
Route::put('/historiaClinica/enfermeria/actualizar', 'HistoriaClinica\EnfermeriaController@actualizar');
Route::put('/enfermeria/anular', 'HistoriaClinica\EnfermeriaController@anularNotasEnfermeria');
Route::get('/enfermeria/listar', 'HistoriaClinica\EnfermeriaController@listarNotasEnfermeria');
Route::get('/enfermeria/listarInsumos', 'HistoriaClinica\EnfermeriaController@listarInsumosEnfermeria');
Route::get('/enfermeria/cargarnota', 'HistoriaClinica\EnfermeriaController@cargarNotasEnfermeria');
Route::get('/enfermeria/cargarInsumos', 'HistoriaClinica\EnfermeriaController@cargarInsumosEnfermeria');
Route::get('/enfermeria/insumoBuscar', 'HistoriaClinica\EnfermeriaController@buscarInsumoEnfermeria');

/*Fisioterapia*/
Route::post('/historiaClinica/fisioterapia/registarInsumos', 'HistoriaClinica\FisioterapiaController@guardarInsumos');
Route::post('/historiaClinica/fisioterapia/registarNota', 'HistoriaClinica\FisioterapiaController@guardarNota');
Route::get('/fisioterapia/cargarnota', 'HistoriaClinica\FisioterapiaController@cargarNotas');
Route::get('/fisioterapia/listar', 'HistoriaClinica\FisioterapiaController@listarNotas');
Route::get('/fisioterapia/listarInsumos', 'HistoriaClinica\FisioterapiaController@listarInsumos');
Route::get('/fisioterapia/cargarInsumos', 'HistoriaClinica\FisioterapiaController@cargarInsumos');
Route::get('/fisioterapia/insumoBuscar', 'HistoriaClinica\FisioterapiaController@buscarInsumo');

/** Evolucion Medica */
Route::post('/historiaClinica/evolucion/registrar', 'HistoriaClinica\EvolucionMedicaController@registrarEvolucionMedica');
Route::get('/evolucion/listar', 'HistoriaClinica\EvolucionMedicaController@listarEvolucionMedica');
Route::get('/evolucion/cargar', 'HistoriaClinica\EvolucionMedicaController@cargarEvolucionMedica');
Route::get('/evolucion/cargardiag', 'HistoriaClinica\EvolucionMedicaController@cargarEvolucionMedicaDiag');
Route::get('/evolucion/cargarultimosdiag', 'HistoriaClinica\EvolucionMedicaController@cargarEvolucionMedicaUltimaDiag');

/* Configuracion */
Route::get('/listaPrecioMedicamentos/medicamentosCargar', 'General\ListaPrecioMedicamentosController@medicamentosCargar');  
Route::post('/listaPrecioMedicamentos/guardar', 'General\ListaPrecioMedicamentosController@guardar');  
Route::get('/listaPrecioMedicamentos/listar', 'General\ListaPrecioMedicamentosController@listaPrecioMedicamentosCargar'); 
Route::get('/listaPrecioMedicamentos/cargar', 'General\ListaPrecioMedicamentosController@cargarDatos'); 
Route::get('/listaPrecioMedicamentos/cargarDetalle', 'General\ListaPrecioMedicamentosController@cargarDetalles'); 
Route::put('/listaPrecioMedicamentos/anular', 'General\ListaPrecioMedicamentosController@anularLista'); 

/*Inventario*/
Route::post('/medicamentos/guardar', 'Inventario\MedicamentosController@guardar');   
Route::get('/medicamentos/viaAdministracion', 'Inventario\MedicamentosController@viaAdministracionBuscar');  
Route::get('/medicamentos/listar', 'Inventario\MedicamentosController@listarMedicamentos');  
Route::get('/medicamentos/cargar', 'Inventario\MedicamentosController@medicamentosCargar');  
Route::get('/medicamentos/cargarDetalle', 'Inventario\MedicamentosController@medicamentosDetalleCargar'); 
Route::put('/medicamentos/anular', 'Inventario\MedicamentosController@medicamentosAnular'); 
Route::get('/listarviaadmin', 'Inventario\MedicamentosController@listarViaAdmin'); 
Route::get('/medicamentos/productosAsociados', 'Inventario\MedicamentosController@productosAsociados'); 
Route::get('/historiaClinica/ingresoPacienteCargar', 'HistoriaClinica\PacienteListadoController@ingresoPacienteCargar'); 

/* Inventario.Producto */
Route::get('/inventario/consultarEquivalencia', 'Inventario\ProductoController@consultarEquivalencia');  
Route::post('/inventario/reqistrar', 'Inventario\ProductoController@store');  
Route::put('/inventario/actualizar', 'Inventario\ProductoController@update');  
Route::get('/inventario/cargarProducto', 'Inventario\ProductoController@cargarProducto');  
Route::get('/inventario/productoListar', 'Inventario\ProductoController@productoListar'); 

Route::get('/home', 'HomeController@index')->name('home');


 

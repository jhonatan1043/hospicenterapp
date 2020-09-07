require('./bootstrap');

window.Vue = require('vue');

Vue.component('iniciosesion-component', require('./components/InicioSesion.vue').default);
/*Componentes de Generales */
Vue.component('entorno-component', require('./components/General/Entorno.vue').default);
Vue.component('tipoidentificacion-component', require('./components/General/TipoIdentificacion.vue').default);
Vue.component('descripcionsistema-component', require('./components/General/DescripcionSistema.vue').default);
Vue.component('manualtarifario-component', require('./components/General/ManualTarifario.vue').default);
Vue.component('entornoserviciocama-component', require('./components/General/EntornoServicioCama.vue').default);
Vue.component('listapreciomedicamentos-component', require('./components/General/ListaPrecioMedicamentos.vue').default);
Vue.component('menuvertical-component', require('./components/General/MenuVertical.vue').default);

/*Componentes de Administración */
Vue.component('empresa-component', require('./components/Administracion/Empresa.vue').default);
Vue.component('perfilmenu-component', require('./components/Administracion/PerfilMenu.vue').default);
Vue.component('resolucion-component', require('./components/Administracion/Resolucion.vue').default);
Vue.component('puntoservicio-component', require('./components/Administracion/PuntoServicio.vue').default);
Vue.component('tercero-component', require('./components/Administracion/Tercero.vue').default);
Vue.component('usuario-component', require('./components/Administracion/Usuario.vue').default);
Vue.component('cliente-component', require('./components/Administracion/Cliente.vue').default);
Vue.component('proveedor-component', require('./components/Administracion/Proveedor.vue').default);
/*Componentes de inventario */
Vue.component('medicamento-component', require('./components/Inventario/Medicamentos.vue').default);
Vue.component('producto-component', require('./components/Inventario/Producto.vue').default);
/*Componentes de Asistencial */
Vue.component('paciente-component', require('./components/Asistencial/Paciente.vue').default);
Vue.component('admision-component', require('./components/Asistencial/Admision.vue').default);
Vue.component('triage-component', require('./components/Asistencial/Triage.vue').default);
Vue.component('ingreso-component', require('./components/Asistencial/Ingreso.vue').default);
Vue.component('contrato-component', require('./components/Asistencial/Contrato.vue').default)
/* Componentes de Historia Clinica */
Vue.component('historiaclinica-component', require('./components/HistoriaClinica/HistoriaClinica.vue').default);
Vue.component('urgencia-component', require('./components/HistoriaClinica/Urgencia.vue').default);
Vue.component('hospi-component', require('./components/HistoriaClinica/Hospitalizacion.vue').default);
Vue.component('epicrisis-component', require('./components/HistoriaClinica/Epicrisis.vue').default);

/*facturacion*/
Vue.component('consolidadofactura-component', require('./components/Facturacion/FacturaConsolidado.vue').default);

/** complementos */
Vue.component('ingresoneonatal-component', require('./components/HistoriaClinica/IngresoNeonatal.vue').default);
Vue.component('ingresomedico-component', require('./components/HistoriaClinica/IngresoMedico.vue').default);
Vue.component('ordenmedica-component', require('./components/HistoriaClinica/OrdenMedica.vue').default);
Vue.component('enfermeria-component', require('./components/HistoriaClinica/Enfermeria.vue').default);
Vue.component('evolucion-component', require('./components/HistoriaClinica/Evolucion.vue').default);
Vue.component('fisioterapia-component', require('./components/HistoriaClinica/Fisioterapia.vue').default);
/* componentes de complemento Examen Fisico */
Vue.component('examenfisico-component', require('./components/HistoriaClinica/Complementos/ExamenFisico.vue').default);
const app = new Vue({
    el: '#app',
    data:{
        menu: 0
    }
    
});

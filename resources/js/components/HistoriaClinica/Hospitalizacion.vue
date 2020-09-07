<template>
  <div class="main">
    <div class="container-fluid">
      <div class="card mt-2">
        <template v-if="listado == 0">
          <div class="card-header">
            <h4>Hospitalización</h4>
          </div>
          <div class="card-body">
            <div class="form-group row">
              <div class="col-md-6 col-sm-6 col-xs-12 col-xl-6">
                <div class="input-group">
                  <select class="form-control col-md-3 form-control-sm" v-model="criterio">
                    <option value="identificacion">Identificacion</option>
                    <option value="paciente">Paciente</option>
                  </select>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="Texto a buscar"
                    @keyup.enter="ingresoPacienteListar(1,buscar,criterio)"
                    v-model="buscar"
                  />
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="ingresoPacienteListar(1,buscar,criterio)"
                  >
                    <i class="fa fa-search"></i> Buscar
                  </button>
                </div>
              </div>
              <div class="form-inline col-md-6 col-sm-6 col-xs-12 col-xl-6">
                <label>Entorno de Servicio:</label> &nbsp;&nbsp;
                <select
                  class="form-control form-control-sm"
                  v-model="idEntorno"
                  @change="ingresoPacienteListar(1,buscar,criterio)"
                >
                  <option selected :value="0">Todos</option>
                  <option
                    v-for="item in arrayEntorno"
                    :key="item.id"
                    :value="item.id"
                    v-text="item.descripcion"
                  ></option>
                </select>
              </div>
            </div>
            <div class="table-responsive-sm">
              <table class="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th class="text-center" width="50">Opciones</th>
                    <th class="text-center" width="100">N° Ingreso</th>
                    <th class="text-center" width="100">Documento</th>
                    <th class="text-center" width="200">Paciente</th>
                    <th class="text-center" width="100">Cama</th>
                    <th class="text-center" width="100" hidden>Area</th>
                    <th class="text-center" width="100">Genero</th>
                    <th class="text-center" width="100" hidden>Medico</th>
                    <th class="text-center" width="100">Administradora</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arrayLista" :key="index">
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        @click="mostrarFormulario(item.id,item.aplicaNeonatal,item.idGenero)"
                      >
                        <i class="fa fa-check-square-o"></i>
                      </button>&nbsp;
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="abrirEpicrisis(item)"
                      >
                        <i class="fa fa-sign-out"></i>
                      </button>
                    </td>
                    <td class="text-center" v-text="item.id"></td>
                    <td class="text-center" v-text="item.identificacion"></td>
                    <td class="text-center" v-text="item.paciente"></td>
                    <td class="text-center" v-text="item.cama"></td>
                    <td class="text-center" v-text="item.entorno" hidden></td>
                    <td class="text-center" v-text="item.genero"></td>
                    <td class="text-center" v-text="item.medico" hidden></td>
                    <td class="text-center" v-text="item.administradora"></td>
                  </tr>
                </tbody>
              </table>
              <epicrisi v-if="modal"/>
            </div>
            <nav>
              <ul class="pagination">
                <li class="page-item" v-if="paginacion.current_page > 1">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPagina(paginacion.current_page - 1,buscar,criterio)"
                  >Ant</a>
                </li>
                <li
                  class="page-item active"
                  v-for="page in pageNumber"
                  :key="page"
                  :class="[page == isActived ? 'active' : '']"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPagina(page,buscar,criterio)"
                    v-text="page"
                  ></a>
                </li>
                <li class="page-item" v-if="paginacion.current_page < paginacion.last_page">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPagina(paginacion.current_page + 1,buscar,criterio)"
                  >Sig</a>
                </li>
              </ul>
            </nav>
          </div>
        </template>
        <template v-if="listado==1">
          <!-- datos del menu -->
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#" @click="ocultarFormulario()">
              <i class="fa fa-arrow-left" aria-hidden="true"></i></a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav">
                <li class="nav-item" :class="{'active': seleccion == mIngreso}">
                  <a class="nav-link" @click="opcionesMenu(mIngreso)" href="#">
                    Ingreso
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item" :class="{'active': seleccion == mOrdenMedica}">
                  <a class="nav-link" @click="opcionesMenu(mOrdenMedica)" href="#">Orden Medica</a>
                </li>
                <li class="nav-item" :class="{'active': seleccion == mEvolucion}">
                  <a class="nav-link" @click="opcionesMenu(mEvolucion)" href="#">Evolucion</a>
                </li>
                <li class="nav-item" :class="{'active': seleccion == mEnfermeria}">
                  <a class="nav-link" @click="opcionesMenu(mEnfermeria)" href="#">Enfermeria</a>
                </li>
                <li class="nav-item" :class="{'active': seleccion == mFisioterpia}">
                  <a class="nav-link" @click="opcionesMenu(mFisioterpia)" href="#">Fisioterapia</a>
                </li>
              </ul>
            </div>
          </nav>
          <!-- datos del paciente -->
          <div class="card-body">
            <div class="row">
              <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                <label>Identificacion:</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  readonly
                  v-model="identificacion"
                />
              </div>
              <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                <label>Paciente:</label>
                <input type="text" class="form-control form-control-sm" readonly v-model="paciente" />
              </div>
              <div class="form-group col-xl-3 col-xs-6">
                <label>Fecha:</label>
                <input
                  type="date"
                  class="form-control form-control-sm"
                  readonly
                  v-model="fAdmision"
                />
              </div>
              <div class="form-group col-xl-2 col-xs-6">
                <label>Hora:</label>
                <input
                  type="time"
                  class="form-control form-control-sm"
                  readonly
                  v-model="hAdmision"
                />
              </div>
              <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                <label>Edad:</label>
                <input type="text" class="form-control form-control-sm" readonly v-model="edad" />
              </div>
              <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                <label>Genero:</label>
                <input type="text" class="form-control form-control-sm" readonly v-model="genero" />
              </div>
              <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                <label>Cama:</label>
                <input type="text" class="form-control form-control-sm" readonly v-model="cama" />
              </div>
              <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                <label>Administradora:</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  readonly
                  v-model="administradora"
                />
              </div>
            </div>
            <!--  datos del historial  -->
            <template v-if="seleccion == mIngreso">
              <div class="shadow-none p-2 mb-2 bg-light">
                <h6>Historial:</h6>
              </div>
              <div class="row">
                <div class="form-group col-lg-6 col-md-6 col-sm-4 col-xs-12 col-xl-4">
                  <label>Via Ingreso:</label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    readonly
                    v-model="viaIngreso"
                  />
                </div>
                <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                  <label>Causa Externa:</label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    readonly
                    v-model="cExterna"
                  />
                </div>
                <div class="form-group col-lg-6 col-md-6 col-sm-4 col-xs-12 col-xl-4">
                  <label>Institucion:</label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    readonly
                    v-model="institucion"
                  />
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
      <!-- Datos del Ingreso -->
      <template v-if="listado == 1">
        <template v-if="seleccion == mIngreso">
          <ingresoneonatal-component v-if="aplicaNeonatal == 1"></ingresoneonatal-component>
          <ingresomedico v-else :idGenero="idGenero" 
                                :idIngreso="idIngreso"
                                :arryDiagIng="arryDiagIng"
                                :arrayAntFam="arrayAntFam"
                                :arrayAntPers="arrayAntPers"
                                :arrayD="arrayD"></ingresomedico>
        </template>
        <template v-if="seleccion == mOrdenMedica">
          <ordenmedica-component :idIngreso="idIngreso"></ordenmedica-component>
        </template>
        <template v-if="seleccion == mEvolucion">
          <evolucion-component :idIngreso="idIngreso"></evolucion-component>
        </template>
        <template v-if="seleccion == mEnfermeria">
          <enfermeria :idIngreso="idIngreso"></enfermeria>
        </template>
        <template v-if="seleccion == mFisioterpia">
          <fisioterapia-component :idIngreso="idIngreso"></fisioterapia-component>
        </template>
      </template>
      <componentEpicrisis
        v-if="abrirModal"
        :modal="abrirModal"
        :idIngreso="idIngreso"
        v-on:cerrarModal="cerrarEpicrisis"
         v-on:actualizarListaPaciente="ingresoPacienteListar(1,buscar,criterio)"
      ></componentEpicrisis>
    </div>
  </div>
</template>

<script>
import ingresomedico from "../HistoriaClinica/IngresoMedico.vue";
import enfermeria from "../HistoriaClinica/Enfermeria.vue";
import componentEpicrisis from "../HistoriaClinica/Epicrisis.vue";

export default {
 
  components: {
    componentEpicrisis,
    ingresomedico,
    enfermeria
  },
  data() {
    return {
      listado: 0,
      mIngreso: 1,
      modal: false,
      abrirModal:false,
      mOrdenMedica: 2,
      mEvolucion: 3,
      mEnfermeria: 4,
      mFisioterpia: 5,
      seleccion: 1,
      arrayLista: [],
      arrayEntorno: [],
      aplicaNeonatal: 0,
      idServicio: 2313,
      idGenero: 0,
      idEntorno: 0,
      idAdminsion: 0,
      idIngreso: 0,
      paciente: "",
      edad: "",
      diasEstan: "",
      fAdmision: "",
      hAdmision: "",
      administradora: "",
      alergia: "",
      identificacion: "",
      genero: "",
      cama: "",
      viaIngreso: "",
      cExterna: "",
      institucion: "",
      peso: "",
      paginacion: {
        total: 0,
        current_page: 0,
        per_page: 0,
        last_page: 0,
        from: 0,
        to: 0
      },
      offset: 3,
      criterio: "paciente",
      buscar: "",
      arrayDigRem: [],
      arryDiagIng: [],
      arrayAntFam: [],
      arrayAntPers:[],
      arrayD:[]
    };
  },
  computed: {
    isActived: function() {
      return this.paginacion.current_page;
    },
    pageNumber: function() {
      if (!this.paginacion.to) {
        return [];
      }
      var from = this.paginacion.current_page - this.offset;
      if (from < 1) {
        from = 1;
      }
      var to = from + this.offset * 2;
      if (to >= this.paginacion.last_page) {
        to = this.paginacion.last_page;
      }

      var pageArray = [];
      while (from <= to) {
        pageArray.push(from);
        from++;
      }

      return pageArray;
    }
  },
  methods: {
    mostrarFormulario(id, aplica, idGenero) {
      this.cargarInformacionPaciente(id);
      this.listado = 1;
      this.aplicaNeonatal = aplica;
      this.idGenero = idGenero;
    },
    ocultarFormulario() {
      this.listado = 0;
      this.ingresoPacienteListar(1, "", "paciente");
    },
    opcionesMenu(opcion) {
      this.seleccion = opcion;
    },

   abrirEpicrisis(item) {
      this.abrirModal = true;
      this.idIngreso = item.id;
    },
    cerrarEpicrisis() {
      this.abrirModal = false;
    },
    ingresoPacienteListar(page, buscar, criterio) {
      let me = this;
      me.abrirModal = false;
      axios
        .get("/historiaClinica/ingresoPacienteListar", {
          params: {
            page: page,
            buscar: buscar,
            criterio: criterio,
            idEntorno: me.idEntorno,
            idServicio: me.idServicio
          }
        })
        .then(function(response) {
          var respuesta = response.data;
          me.arrayLista = respuesta.pacienteListar.data;
          me.paginacion = respuesta.pagination;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cambiarPagina(page, buscar, criterio) {
      let me = this;
      me.paginacion.current_page = page;
      me.ingresoPacienteListar(page, buscar, criterio);
    },
    cargarInformacionPaciente(idIngreso) {
      let me = this;
      axios
        .get("/historiaClinica/ingresoPacienteCargar", {
          params: {
            id: idIngreso
          }
        })
        .then(function(response) {
          let arrayPaciente = response.data;
          me.idAdminsion = arrayPaciente[0]["idAdmision"];
          me.idIngreso = idIngreso;
          me.identificacion = arrayPaciente[0]["identificacion"];
          me.paciente = arrayPaciente[0]["paciente"];
          me.edad = arrayPaciente[0]["edad"];
          me.genero = arrayPaciente[0]["genero"];
          me.diasEstan = arrayPaciente[0]["diasEstancia"];
          me.fAdmision = arrayPaciente[0]["fechaIngreso"],
          me.hAdmision = arrayPaciente[0]["horaIngreso"],
          me.administradora = arrayPaciente[0]["administradora"];
          me.alergia = arrayPaciente[0]["alergia"];
          me.cama = arrayPaciente[0]["cama"];
          me.viaIngreso = arrayPaciente[0]["viaIngreso"];
          me.cExterna = arrayPaciente[0]["causaExterna"];
          me.institucion = arrayPaciente[0]["institucion"];
          me.peso = arrayPaciente[0]["peso"];
          me.cargarInformacionIngreso();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cargarEntorno() {
      let me = this;
      axios
        .get("/entornoservicio/entornos", {
          params: {
            id: me.idServicio
          }
        })
        .then(function(response) {
          me.arrayEntorno = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cargarInformacionIngreso() {
      let me = this;
      axios
        .get("/historiaClinica/ingresoAdulto/cargar", {
          params: {
            id: me.idIngreso
          }
        })
        .then(function(response) {
          me.arrayD = response.data;
          me.cargarInformacionAntFam();
          me.cargarInformacionAntPers();
          me.cargarDiagnosticoIngreso();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cargarInformacionAntFam() {
      let me = this;
      axios
        .get("/historiaClinica/ingresoAdulto/cargar/antFam", {
          params: {
            id: me.idIngreso
          }
        })
        .then(function(response) {
          me.arrayAntFam = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cargarInformacionAntPers() {
      let me = this;
      axios
        .get("/historiaClinica/ingresoAdulto/cargar/antPers", {
          params: {
            id: me.idIngreso
          }
        })
        .then(function(response) {
          me.arrayAntPers = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cargarDiagnosticoIngreso() {
      let me = this;
      axios
        .get("/historiaClinica/ingresoAdulto/cargar/diagnostico", {
          params: {
            id: me.idIngreso
          }
        })
        .then(function(response) {
          me.arryDiagIng = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.cargarEntorno();
  }
};
</script>

<style>
.scroll {
  height: 600px;
  overflow-y: scroll;
}
.subScroll {
  height: 450px;
  overflow-y: scroll;
}
</style>
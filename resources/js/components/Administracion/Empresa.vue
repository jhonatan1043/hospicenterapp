<template>
  <main class="main">
    <!-- Breadcrumb -->
    <div class="container-fluid">
      <div class="card mt-2">
      <!-- Ejemplo de tabla Listado -->
      <div class="card">
        <div class="card-header" v-text="titulo">
        <i class="fa fa-building"></i> 
         
        </div>
        <div class="card-body">
         <template v-if="listado==1">
            <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-toggle="modal"
            data-target="#modalNuevo"
            @click="mostrarFormulario()"
          >
            <i class="icon-plus"></i>&nbsp;Nuevo
          </button>
        <hr/>
          <div class="form-group row">
            <div class="col-md-6">
              <div class="input-group">
                <select class="form-control col-md-3" id="opcion" name="opcion">
                  <option value="nombre">Nombre</option>
                  <option value="descripcion">Descripción</option>
                </select>
                <input
                  type="text"
                  id="texto"
                  name="texto"
                  class="form-control"
                  placeholder="Texto a buscar"
                />
                <button type="submit" class="btn btn-primary">
                  <i class="fa fa-search"></i> Buscar
                </button>
              </div>
            </div>
          </div>
          <table class="table table-bordered table-responsive table-striped table-sm">
            <thead>
              <tr>
                <th width="150">Opciones</th>
                <th width="100">Id empresa</th>
                <th width="100">Nit</th>
                <th>Empresa</th> 
                <th width="100">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="items in arrayEmpresa" :key="items.idEmpresa">
                <td>
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#modalNuevo"
                  >
                    <i class="icon-pencil"></i>
                  </button> &nbsp;
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    data-toggle="modal"
                    data-target="#modalEliminar"
                  >
                    <i class="icon-trash"></i>
                  </button>
                </td>
                <td v-text="items.idEmpresa" ></td>
                <td v-text="items.nit"></td>
                <td v-text="items.razonSocial"></td>
                <td>
                  <div v-if="items.activo">
                    <span class="badge alert-success">Activo</span>
                  </div>
                  <div v-else>
                    <span class="badge alert-danger">Desactivado</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <nav>
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#">Ant</a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="#">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">4</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">Sig</a>
              </li>
            </ul>
          </nav>
          </template>
          <template v-else-if="listado==0">
                <div class="card-body" id="formularioregistros">
                  <button class="btn btn-primary btn-sm" @click="mostrarResolucion()">
                    <i class="fa fa-plus-circle"></i> Crear resolucion
                  </button>
                  <hr />
                  <form name="formulario" id="formulario" method="POST">
                    <div class="form-row">
                       <div class="form-group col-lg-2 col-md-6 col-sm-6 col-xs-12">
                      <label>Nit:</label>
                      <input type="hidden" name="idEmpresa" id="idEmpresa" />
                      <input
                        type="text"
                        class="form-control"
                        name="nit"
                        id="nit"
                        maxlength="100"
                        placeholder="Nit"
                        required
                      />
                    </div>
                  
                   
                       <div class="form-group col-lg-2 col-md-6 col-sm-6 col-xs-12">
                         
                      <label>Razon social:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="razonSocial"
                        id="razonSocial"
                        maxlength="256"
                        placeholder="Digite la razon social"
                        required
                      />
                       
                        </div>
                    
                    <div class="form-group col-lg-2 col-md-6 col-sm-6 col-xs-12">
                      <label>Pais:</label>
                      <select
                        id="idPais"
                        name="idPais"
                        class="form-control selectpicker"
                        data-live-search="true"
                        required
                        v-model="idPais"
                        @change="cargarComboDepartamento"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option
                          v-for="itemPais in arrayPais"
                          :key="itemPais.idPais"
                          :value="itemPais.idPais"
                          v-text="itemPais.descripcion"
                        ></option>
                      </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12">
                      <label>Departamento:</label>
                      <select
                        id="idDepartamento"
                        name="idDepartamento"
                        class="form-control selectpicker"
                        data-live-search="true"
                        required
                        v-model="idDepartamento"
                        @change="cargarComboMunicipio"
                      >
                        >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option
                          v-for="itemDepartamento in arrayDepartamento"
                          :key="itemDepartamento.idDepartamento"
                          :value="itemDepartamento.idDepartamento"
                          v-text="itemDepartamento.descripcion"
                        ></option>
                      </select>
                    </div>
                    <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12">
                      <label>Municipio:</label>
                      <select
                        id="idMunicipio"
                        name="idMunicipio"
                        class="form-control selectpicker"
                        data-live-search="true"
                        required
                        v-model="idMunicipio"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option
                          v-for="itemMunicipio in arrayMunicipio"
                          :key="itemMunicipio.idMunicipio"
                          :value="itemMunicipio.idMunicipio"
                          v-text="itemMunicipio.descripcion"
                        ></option>
                      </select>
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <label>Direccion:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="direccion"
                        id="direccion"
                        maxlength="256"
                        placeholder="Digite la direccion de la empresa"
                        required
                      />
                    </div>
                    <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12">
                      <label>Telefono:</label>
                      <input
                        type="number"
                        class="form-control"
                        name="direccion"
                        id="direccion"
                        maxlength="256"
                        placeholder="Digite el telefono de la empresa"
                      />
                    </div>
                    <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12">
                      <label>Celular:</label>
                      <input
                        type="number"
                        class="form-control"
                        name="direccion"
                        id="direccion"
                        maxlength="256"
                        placeholder="Digite el celular de la empresa"
                      />
                    </div>

                    <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <label>Email:</label>
                      <input
                        type="Email"
                        class="form-control"
                        name="direccion"
                        id="direccion"
                        maxlength="256"
                        placeholder="Digite el correo de la empresa"
                      />
                    </div>

                    <div v-if="mostrarReso" class="form-inline col-md-6 col-sm-12 col-xs-12">
                      <label>Resolucion:</label>

                      <input
                        type="number"
                        class="form-control"
                        name="idDocumento"
                        id="idDocumento"
                        placeholder="Codigo resolucion"
                        readonly="false"
                        required
                      />
                      <button @click="abrirModal()" class="btn btn-primary btn-sm">
                        <i class="fa fa-search"></i>
                      </button>
                      <input
                        type="text"
                        class="form-control"
                        name="representante"
                        id="representante"
                        placeholder="Resolucion"
                        readonly="false"
                      />
                    </div>

                    <div class="form-inline col-md-6 col-sm-12 col-xs-12">
                      <label>Representante legal:</label>
                      <input
                        type="number"
                        class="form-control"
                        name="idDocumento"
                        id="idDocumento"
                        placeholder="Cargue el documento"
                        readonly="false"
                        required
                      />
                      <button @click="abrirModal()" class="btn btn-primary btn-sm" >
                        <i class="fa fa-search"></i>
                      </button>
                      <input
                        type="text"
                        class="form-control"
                        name="representante"
                        id="representante"
                        placeholder="Representante"
                        readonly="false"
                      />
                    </div>

                    <div class="form-group col-lg-12 col-md-6 col-sm-6 col-xs-12 py-4">
                      <ul class="nav nav-tabs">
                        <li class="nav-item">
                          <a
                            class="nav-link active"
                            href="#informacion"
                            data-toggle="tab"
                          >Informacion de la factura</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#documentacion" data-toggle="tab">Documentancion</a>
                        </li>
                      </ul>
                    </div>
                    <hr />

                    <div class="tab-content container">
                      <div class="tab-pane active" id="informacion">
                        <textarea
                          class="form-group col-lg-12 col-md-6 col-sm-6 col-xs-12"
                          name="textarea"
                          placeholder="Digite el encabezado de la factura"
                        ></textarea>

                        <textarea
                          class="form-group col-lg-12 col-md-6 col-sm-6 col-xs-12"
                          name="textarea"
                          placeholder="Digite el pie de la factura"
                        ></textarea>
                      </div>

                      <div class="tab-pane" id="documentacion"></div>
                    </div>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <button class="btn btn-success mt-20" type="submit" id="btnGuardar">
                        <i class="fa fa-save"></i> Guardar
                      </button>

                      <button class="btn btn-danger" @click="ocultarFormulario()" type="button">
                        <i class="fa fa-arrow-circle-left"></i> Cancelar
                      </button>
                    </div>
                       </div>
                  </form>
                 
                </div>
              </template>
               <template v-if="listado==3">
                <resolucion-component></resolucion-component>
              </template>
        </div>
      </div>
      </div>
      <!-- Fin ejemplo de tabla Listado -->
    </div>
    <!--Inicio del modal agregar/actualizar-->
    <!--Fin del modal-->
    <!-- Inicio del modal Eliminar -->
    <div
      class="modal fade"
      id="modalEliminar"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      style="display: none;"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Eliminar Categoría</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Estas seguro de eliminar la categoría?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-danger">Eliminar</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- Fin del modal Eliminar -->
  </main>
</template>

<script>
import ModalGeneral from "../ModalBusqueda/ModalGeneral.vue";
export default {
  components: {
    ModalGeneral
  },
  data() {
    return {
      listado: 1,
      idPais: 0,
      idDepartamento: 0,
      idMunicipio: 0,
      idEmpresa: null,
      mostrarReso: 0,
      modal: 0,
      buscar: "",
      campoBusqueda: "idResolucion",
      titulo: "Lista de empresa",
      tituloModal: "Seleccione una resolucion",
      arrayEmpresa: [],
      arrayPais: [],
      arrayDepartamento: [],
      arrayMunicipio: [],
      arrayResolucion: [],
      arrayRepresentante: [],
      tipoAccion: 0
    };
  },
  methods: {
    mostrarFormulario() {
      this.listado = 0;
      this.crearResolucion = 0;
      this.titulo = "Empresa";
    },
    ocultarFormulario() {
      this.listado = 1;
      this.crearResolucion = 0;
      this.titulo = "Lista de empresa";
    },
    mostrarResolucion() {
      this.listado = 3;
      this.titulo = "Resolución";
    },
    listadoEmpresa() {
      var me = this;
      axios
        .get("/listaEmpresa")
        .then(function(response) {
          me.arrayEmpresa = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cargarComboPais() {
      var me = this;
      axios
        .get("/comboPais")
        .then(function(response) {
          me.arrayPais = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cargarComboDepartamento() {
      var me = this;
      axios
        .get("/comboDepartamento", {
          params: {
            idPais: this.idPais
          }
        })
        .then(function(response) {
          me.arrayDepartamento = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cargarComboMunicipio() {
      var me = this;
      axios
        .get("/comboMunicipio", {
          params: {
            idDepartamento: this.idDepartamento
          }
        })
        .then(function(response) {
          me.arrayMunicipio = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    abrirModal() {
      this.arrayResolucion = [];
      this.modal = 1;
      this.tituloModal;
    },
    cerrarModal() {
      this.modal = 0;
      this.tituloModal = "";
    },
    agregarResolucion(buscar, nombreCampo) {
      var me = this;

      axios
        .get(
          "/empresa/listaResolucion?buscar=" +
            buscar +
            "&nombreCampo=" +
            nombreCampo
        )
        .then(function(response) {
          me.arrayResolucion = response.data;
          console.log(me.arrayResolucion);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    agregarRepresentante() {}
  },

  mounted() {
    this.listadoEmpresa();
    this.cargarComboPais();
    this.cargarComboDepartamento();
    this.cargarComboMunicipio();
    this.agregarResolucion();
  }
};
</script>
<style>
.modal-content {
  width: 100% !important;
  position: absolute !important;
}
.mostrar {
  display: list-item !important;
  opacity: 1 !important;
  position: absolute !important;
  background-color: #3c29297a !important;
}
</style>
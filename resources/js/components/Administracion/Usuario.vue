<template>
  <main class="main">
    <div class="container-fluid">
      <div class="card mt-3">
        <div class="card-header">
          <h5>Usuario</h5>
        </div>
        <div class="card-body">
          <template v-if="listado == 0">
            <button type="button" class="btn btn-secondary btn-sm" @click="mostrarFormulario()">
              <i class="icon-plus"></i>&nbsp;Nuevo
            </button>
            <hr />
            <div class="table-responsive">
              <table class="table table-bordered table-hover table-sm">
                <thead>
                  <tr>
                    <th width="20" class="text-center">Opciones</th>
                    <th width="20" class="text-center">codigo</th>
                    <th width="200" class="text-center">Terceros</th>
                    <th width="200" class="text-center">Usuarios</th>
                    <th width="200" class="text-center">Roles</th>
                    <th width="20" class="text-center">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arrayRegUsuario" :key="index">
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-warning btn-sm"
                        @click="editarRegistro(item.id,
                                              item.tercero,
                                              item.usuario,
                                              item.password,
                                              item.idPerfil,
                                              item.activo)"
                      >
                        <i class="icon-pencil"></i>
                      </button>
                    </td>
                    <td class="text-center" v-text="item.id"></td>
                    <td v-text="item.tercero"></td>
                    <td v-text="item.usuario"></td>
                    <td v-text="item.rol"></td>
                    <td class="text-center" v-if="item.activo==1">
                      <small v-text="'Activo'" class="form-text text-white badge badge-success"></small>
                    </td>
                    <td class="text-center" v-else>
                      <small v-text="'No Activo'" class="form-text text-white badge badge-danger"></small>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <template v-else>
            <form>
              <div class="form-row">
                <div class="col-md-6 mb-2">
                  <div class="input-group">
                    <input type="text" class="form-control" disabled v-model="nombre" />
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="abrirModal()"
                      :disabled="accion == 1"
                    >
                      <i class="fa fa-search"></i> Buscar Tercero
                    </button>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-6">
                  <label>Usuario:</label>
                  <input
                    type="text"
                    class="form-control text-center"
                    maxlength="50"
                    v-model="usuario"
                    disabled
                  />
                </div>
                <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-6">
                  <label>Contraseña:</label>
                  <input
                    type="password"
                    class="form-control"
                    maxlength="10"
                    v-model="password"
                    :disabled="editable == 0"
                  />
                </div>
                <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-6">
                  <label>Roles:</label>
                  <select
                    class="form-control selectpicker"
                    name="genero"
                    v-model="idRol"
                    :disabled="editable == 0"
                  >
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arrayRol"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>
                <div class="form-check-inline mt-3 ml-3">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      id="estado"
                      class="custom-control-input"
                      true-value="1"
                      false-value="0"
                      v-model="estado"
                      :disabled="editable == 0"
                    />
                    <label class="custom-control-label" for="estado">Estado</label>
                  </div>
                </div>
                <div class="form-group col-12">
                  <button
                    v-if="accion == 0"
                    class="btn btn-success mt-20"
                    type="button"
                    @click="crearUsuarioSistema()"
                  >
                    <i class="fa fa-save"></i> Guardar
                  </button>
                  <button
                    v-else
                    class="btn btn-success mt-40"
                    type="button"
                    @click="actualizarUsuarioSistema()"
                  >
                    <i class="fa fa-save"></i> Actualizar
                  </button>
                  <button class="btn btn-danger" type="button" @click="cancelar()">
                    <i class="fa fa-arrow-circle-left"></i> Cancelar
                  </button>
                </div>
              </div>
            </form>
          </template>
        </div>
      </div>
    </div>
    <ModalGeneral
      v-if="modal"
      v-bind:objTitulo="objTituloTercero"
      tituloModal="Busqueda de terceros"
      url="/usuario/consultarTercero"
      :arrayCampos="arrayCamposTercero"
      :modal="modal"
      @datos="arrayDatosTerceros = $event"
      @cerrar="modal = $event"
      v-on:llamarFuncion="agregarDatos"
    ></ModalGeneral>
  </main>
</template>
<script>
import ModalGeneral from "../../components/ModalBusqueda/ModalGeneral.vue";
export default {
  components: {
    ModalGeneral
  },
  data() {
    return {
      idTercero: 0,
      nombre: "",
      listado: 0,
      listaRol: 2,
      arrayRegUsuario: [],
      arrayRol: [],
      estado: 0,
      idRol: 0,
      usuario: "",
      password: "",
      editable: 0,
      modal: 0,
      accion: 0,
      arrayTercero: [],
      arrayDatosTerceros: [],
      objTituloTercero: {
        agregar: "agregar",
        id: "id",
        documento: "documento",
        nombre: "tercero"
      },
      arrayCamposTercero: ["id", "documento", "tercero"]
    };
  },
  methods: {
    mostrarFormulario() {
      this.listado = 1;
    },
    ocultarFormulario() {
      this.listado = 0;
    },
    cargarRoles() {
      let me = this;
      axios
        .get("/general/descripciones", {
          params: {
            id: me.listaRol
          }
        })
        .then(function(response) {
          me.arrayRol = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    abrirModal: function() {
      this.modal = 1;
    },
    agregarDatos() {
      this.idTercero = this.arrayDatosTerceros[0]["id"];
      this.nombre = this.arrayDatosTerceros[0]["tercero"];
      this.asignarUsuario();
      this.editable = 1;
      this.modal = 0;
      this.password = "0000";
    },
    asignarUsuario() {
      let me = this;
      axios
        .get("/usuario/asignarUsuario", {
          params: {
            id: me.idTercero
          }
        })
        .then(function(response) {
          let arrayUsuario = response.data;
          me.usuario = arrayUsuario[0]["usuario"];
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    usuarioListar() {
      let me = this;
      axios
        .get("/usuario/listar")
        .then(function(response) {
          me.arrayRegUsuario = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    actualizarUsuarioSistema() {
      let me = this;
      axios
        .put("/usuario/actualizar", {
          id: me.idTercero,
          idPerfil: me.idRol,
          usuario:  me.usuario,
          password: me.password,
          estado:   me.estado
        })
        .then(function(response) {
          me.usuarioListar();
          me.limpiarControles();
          me.ocultarFormulario();
          swal(
            "actualizado!",
            "El registro ha sido actualizado con éxito.",
            "success"
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    crearUsuarioSistema() {
      let me = this;
      axios
        .post("/usuario/registrar", {
          id: me.idTercero,
          idPerfil: me.idRol,
          usuario: me.usuario,
          password: me.password,
          estado: me.estado
        })
        .then(function(response) {
          me.usuarioListar();
          me.limpiarControles();
          me.ocultarFormulario();
          swal(
            "Guardado!",
            "El registro ha sido guardado con éxito.",
            "success"
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    limpiarControles() {
      this.editable = 0;
      this.estado = 0;
      this.idRol = 0;
      this.usuario = "";
      this.password = "";
      this.idTercero = 0;
      this.nombre = "";
      this.accion = 0;
    },
    cancelar() {
      this.limpiarControles();
      this.ocultarFormulario();
    },
    editarRegistro(idTercero, tercero, usuario, password, idPerfil, activo) {
      swal({
        title: "¿Desea editar el registro?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!",
        cancelButtonText: "No",
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        buttonsStyling: false,
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.idTercero = idTercero;
          this.nombre    = tercero;
          this.usuario   = usuario;
          this.password  = password;
          this.idRol     = idPerfil;
          this.estado    = activo;
          this.accion    = 1;
          this.editable  = 1;
          this.mostrarFormulario();
        } else if (result.dismiss === swal.DismissReason.cancel) {
        }
      });
    }
  },
  mounted() {
    this.cargarRoles();
    this.usuarioListar();
  }
};
Vue.directive("focus", {
  inserted: function(el) {
    el.focus();
  }
});
</script>
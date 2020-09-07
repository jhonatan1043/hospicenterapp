<template>
  <main class="main">
    <div class="container-fluid">
      <div class="card mt-2">
        <div class="card-header">
          <h5>Puntos de Servicios</h5>
        </div>
        <div class="card-body">
          <template v-if="listado == 0">
            <button type="button" class="btn btn-secondary btn-sm" @click="mostrarFormulario()">
              <i class="icon-plus"></i>&nbsp;Nuevo
            </button>
            <hr />
            <div class="table-responsive">
              <table class="table table-sm table-bordered table-hover">
                <thead>
                  <tr>
                    <th width="150" class="text-center">Opciones</th>
                    <th width="10" class="text-center">Codigo</th>
                    <th width="250" class="text-center">Razon Social</th>
                    <th width="100" class="text-center">Dirección</th>
                    <th width="100" class="text-center">Telefono</th>
                    <th width="100" class="text-center">Celular</th>
                    <th width="100" class="text-center">Email</th>
                    <th width="100" class="text-center">Pagina Web</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arrayPuntoListar" :key="index">
                    <td class="text-center">
                      <button type="button" 
                      class="btn btn-warning btn-sm"
                      @click="editarRegistro(item.idPuntoServicio)">
                        <i class="icon-pencil"></i>
                        
                      </button> &nbsp;
                      <button type="button" 
                      class="btn btn-danger btn-sm"
                      @click="anular(item.idPuntoServicio)"
                      >
                        <i class="icon-trash"></i>
                      </button>
                    </td>
                    <td class="text-center" v-text="item.idPuntoServicio"></td>
                    <td class="text-center" v-text="item.razonSocial"></td>
                    <td class="text-center" v-text="item.direccion"></td>
                    <td class="text-center" v-text="item.telefono"></td>
                    <td class="text-center" v-text="item.celular"></td>
                    <td class="text-center" v-text="item.email"></td>
                    <td class="text-center" v-text="item.paginaWeb"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <template v-else-if="listado==1">
            <div class="card-body" id="formularioregistros">
            <form>
              <div class="form-row">
                  <div class="col-md-6 mb-2">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        :disabled="accion==1"
                        v-model="tercero"
                        v-bind:style="tercero == 0 ?'background-color: #FEF9E7':''"
                      />

                      <button type="button" 
                      :disabled="accion ==1" 
                      class="btn btn-primary btn-sm" 
                      @click="abrirModal()">
                        <i class="fa fa-search"></i> Buscar Responsable
                      </button>
                    </div>
                  </div>
                </div>
                <hr/>
              <div class="form-row">
                <div class="form-group col-xs-12 col-lg-4 col-sm-4 col-md-6 col-xl-4">
                  <label for="razonsocial">Razon Social:</label>
                  <input
                    type="text"
                    name="razonSocial"
                    maxlength="100"
                    class="form-control selectpicker form-control-sm"
                    v-model="razonSocial"
                    v-bind:style="razonSocial == 0 ?'background-color: #FEF9E7':''"
                  />
                </div>
                <div class="form-group col-xs-12 col-lg-4 col-sm-4 col-md-6 col-xl-4">
                  <label for="direccion">Direccion:</label>
                  <input
                    type="text"
                    name="direccion"
                    maxlength="100"
                    class="form-control selectpicker form-control-sm"
                    v-model="direccion"
                    v-bind:style="direccion == 0 ?'background-color: #FEF9E7':''"
                  />
                </div>
                <div class="form-group col-xs-12 col-lg-4 col-sm-4 col-md-6 col-xl-4">
                  <label for="telefono">Telefono:</label>
                  <input
                    type="text"
                    name="telefono"
                    maxlength="100"
                    class="form-control selectpicker form-control-sm"
                    v-model="telefono"
                  />
                </div>
                <div class="form-group col-xs-12 col-lg-4 col-sm-4 col-md-6 col-xl-4">
                  <label for="celular">Celular:</label>
                  <input
                    type="text"
                    name="celular"
                    maxlength="100"
                    class="form-control selectpicker form-control-sm"
                    v-model="celular"
                    v-bind:style="celular == 0 ?'background-color: #FEF9E7':''"
                  />
                </div>
                <div class="form-group col-xs-12 col-lg-4 col-sm-4 col-md-6 col-xl-4">
                  <label for="email">Email:</label>
                  <input
                    type="text"
                    maxlength="100"
                    class="form-control selectpicker form-control-sm"
                    v-model="email"
                  />
                </div>
                <div class="form-group col-xs-12 col-lg-4 col-sm-4 col-md-6 col-xl-4">
                  <label for="paginaWeb">Pagina Web:</label>
                  <input
                    type="text"
                    name="paginaWeb"
                    maxlength="100"
                    class="form-control selectpicker form-control-sm"
                    v-model="paginaWeb"
                  />
                </div>
                <div class="form-group col-lg-2 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                  <label>Departamento:</label>
                  <select
                    class="form-control form-control-sm selectpicker"
                    data-live-search="true"
                    required
                    v-model="idDepartamento"
                    @change="cargarComboMunicipio"
                    v-bind:style="idDepartamento == 0 ?'background-color: #FEF9E7':''"
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
                <div class="form-group col-lg-2 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                  <label>Municipio:</label>
                  <select
                    class="form-control form-control-sm selectpicker"
                    data-live-search="true"
                    required
                    v-model="idMunicipio"
                    v-bind:style="idMunicipio == 0 ?'background-color: #FEF9E7':''"
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
                <div class="form-check-inline mt-3 ml-3">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      id="administrativo"
                      class="custom-control-input"
                      true-value="1"
                      false-value="0"
                      v-model="administrativo"
                      v-bind:style="administrativo == 0 ?'background-color: #FEF9E7':''"
                    />
                    <label class="custom-control-label" for="administrativo">Administrativo</label>
                  </div>
                </div>
                <div class="form-group col-12 mt-5">
                  <button 
                  v-if="accion==0" 
                  class="btn btn-success btn-sm" 
                  type="button" 
                  @click="guardar()"
                  >
                    <i class="fa fa-save"></i> Guardar
                  </button>
                  <button v-else 
                    class="btn btn-success mt-40 btn-sm" 
                    type="button"
                    @click="actualizar()">
                      <i class="fa fa-save"></i> Actualizar
                    </button>
                  <button class="btn btn-danger btn-sm" type="button" @click="cancelarRegistro()">
                    <i class="fa fa-arrow-circle-left"></i> Cancelar
                  </button>
                </div>
              </div>
            </form>
            </div>
          </template>
        </div>
      </div>
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
            <h4 class="modal-title"></h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Estas seguro de eliminar el registro?</p>
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
    <ModalGeneral
      v-if="modal"
      v-bind:objTitulo="objTituloTercero"
      tituloModal="Busqueda de terceros"
      url="/puntoServicio/consultar"
      :arrayCampos="arrayCamposTercero"
      :modal="modal"
      @datos="arrayDatosTerceros = $event"
      @cerrar="modal = $event"
      v-on:llamarFuncion="agregarDatos"
      v-on:llamarMetodo="cerrarModal"
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
      listado: 0,
      modal: 0,
      editable: 0,
      accion: 0,
      idPuntoServicio: 0,
      razonSocial: "",
      tercero: "",
      idTercero:0,
      direccion: "",
      telefono: "",
      celular: "",
      email: "",
      paginaWeb: "",
      idPais: 1,
      idDepartamento: 0,
      idMunicipio: 0,
      administrativo: 0,
      arrayDepartamento: [],
      arrayMunicipio: [],
      arrayPuntoListar: [],
      arrayCamposTercero: [],
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
    abrirModal() {
      this.modal = 1;
    },
    agregarDatos() {
      this.idTercero = this.arrayDatosTerceros[0]["id"];
      this.tercero = this.arrayDatosTerceros[0]["tercero"];
      this.editable = 1;
      this.modal = 0;
    },
    cerrarModal() {
      this.modal = 0;
    },
    puntoServicioListar() {
      let me = this;
      axios
        .get("/listaPuntoServicio")
        .then(function(response) {
          me.arrayPuntoListar = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    guardar(){
      let me = this;
      if (me.validacionCampos() == true) { 
        axios
        .post("/puntoServicio/guardar", {
          idTercero:       me.idTercero,
          razonSocial:     me.razonSocial,
          direccion:       me.direccion,   
          telefono:        me.telefono,     
          celular:         me.celular,      
          email:           me.email,       
          paginaWeb:       me.paginaWeb,     
          idDepartamento:  me.idDepartamento,
          idMunicipio:     me.idMunicipio,
          administrativo:  me.administrativo
        })
        .then(function() {
          me.limpiarControles();
          me.puntoServicioListar();
          me.ocultarFormulario();
          swal(
            "Guardado",
            "El registro ha sido guardado con exito.",
            "success"
          );
        })
        .catch(function(error){ 
          console.log(error);
        });
        } else {
        swal("Siho", "Los campos marcados son obligatorios", "warning");
      }
    },
    actualizar(){
      let me = this; 
        axios.put('/puntoServicio/actualizar', {
          id:              me.idPuntoServicio,
          idTercero:       me.idTercero,
          razonSocial:     me.razonSocial,
          direccion:       me.direccion,   
          telefono:        me.telefono,     
          celular:         me.celular,      
          email:           me.email,       
          paginaWeb:       me.paginaWeb,     
          idDepartamento:  me.idDepartamento,
          idMunicipio:     me.idMunicipio,
          administrativo:  me.administrativo
        })
        .then(function(response) {
          me.limpiarControles();
          me.puntoServicioListar();
          me.ocultarFormulario();
          swal(
            "Actualizado",
            "El registro ha sido actualizado con exito.",
            "success"
          )
        })
        .catch(function(error){ 
          console.log(error);
        })
    },
    validacionCampos(){ 
        if(
          this.idTercero       != 0 &&
          this.razonSocial     != "" &&
          this.direccion       != "" &&
          this.celular         != "" &&
          this.idDepartamento  != 0 &&
          this.idMunicipio     != 0 
        ) {
          return true;
        }else {
          return false;
          }
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
    limpiarControles() { 
          this.tercero         ="";
          this.razonSocial     ="";
          this.direccion       ="";
          this.telefono        ="";
          this.celular         ="";
          this.email           ="";
          this.paginaWeb       ="";
          this.idDepartamento  =0;
          this.idMunicipio     =0;
          this.administrativo  =0;
          this.accion          =0;
    },
    cancelarRegistro() {
      let me = this;
      swal({
        title: "¿Desea cancelar el registro?",
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
          me.limpiarControles();
          me.ocultarFormulario();
        } else if (result.dismiss === swal.DismissReason.cancel) {
        }
      });
    },
    editarRegistro(id){
     let me = this;
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
          me.idPuntoServicio = id;
          me.accion = 1;
          me.editable = 1;
          me.cargarRegistro(id);
          me.mostrarFormulario();
        } else if (result.dismiss === swal.DismissReason.cancel) {
        }
      });
    },
    anular(id) {
      swal({
        title: "¿Desea Anular el registro?",
        type: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar!",
        cancelButtonText: "Cancelar",
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        buttonsStyling: false,
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          let me = this;
          axios
            .put("/puntoServicio/anular", {
              id: id
            })
            .then(function(response) {
              me.puntoServicioListar();
              
              swal(
                "Anulado!",
                "El registro ha sido anulado con éxito.",
                "success"
              );
            }) 
            .catch(function(error) {
              console.log(error);
            });
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
        }
      });
    },
    cargarRegistro(id) {
    let me = this;
    axios.get("/puntoServicio/cargar", {
      params:{
        id : id
      }    
    }).then(function (response) {
      let arrayL=[];
      arrayL = response.data;
      console.log(arrayL);
          me.idPuntoServicio = id;
          me.tercero         = arrayL[0]['tercero'];
          me.idTercero       = arrayL[0]['idTercero'];
          me.razonSocial     = arrayL[0]['razonSocial'];
          me.direccion       = arrayL[0]['direccion'];   
          me.telefono        = arrayL[0]['telefono'];     
          me.celular         = arrayL[0]['celular'];      
          me.email           = arrayL[0]['email'];       
          me.paginaWeb       = arrayL[0]['paginaWeb'];     
          me.idDepartamento  = arrayL[0]['idDepartamento'];
          me.cargarComboMunicipio();
          me.idMunicipio     = arrayL[0]['idMunicipio'];
          me.administrativo  = arrayL[0]['administrativo'];
    })
    .catch(function (error) {
       console.log(error);
    })
    }
  },
    created() {
      this.puntoServicioListar();
      this.cargarComboDepartamento();
      this.cargarComboMunicipio();
    }
};
</script>
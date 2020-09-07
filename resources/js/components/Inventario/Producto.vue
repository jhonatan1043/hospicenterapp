<template>
  <main class="main">
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <h5>Producto</h5>
        </div>
        <div class="card-body">
          <template v-if="listado == 0">
            <button type="button" class="btn btn-secondary btn-sm" @click="mostrarFormulario()">
              <i class="icon-plus"></i>&nbsp;Nuevo
            </button>
            <hr />
            <div class="form-group row">
              <div class="col-md-6 col-sm-6 col-xs-12 col-xl-6">
                <div class="input-group">
                  <select class="form-control col-md-3 form-control-sm" v-model="criterio">
                    <option value="id">codigo</option>
                    <option value="descripcion">descripcion</option>
                  </select>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="Texto a buscar"
                    @keyup.enter="listarProducto(1,buscar,criterio)"
                    v-model="buscar"
                  />
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="listarProducto(1,buscar,criterio)"
                  >
                    <i class="fa fa-search"></i> Buscar
                  </button>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-sm table-bordered table-hover">
                <thead>
                  <tr>
                    <th width="50" class="text-center">Opciones</th>
                    <th width="20" class="text-center">Codigo</th>
                    <th width="500" class="text-center">Producto</th>
                    <th width="200" class="text-center">Marca</th>
                    <th width="100" class="text-center">Reg. Sanitario</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arrayReg" :key="index">
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-warning btn-sm"
                        @click="editarRegistro(item.id,item.descripcion)"
                      >
                        <i class="icon-pencil"></i>
                      </button> &nbsp;
                      <button type="button" class="btn btn-danger btn-sm">
                        <i class="icon-trash"></i>
                      </button>
                    </td>
                    <td class="text-center" v-text="item.id"></td>
                    <td v-text="item.descripcion"></td>
                    <td v-text="item.marca"></td>
                    <td class="text-center" v-text="item.regSanitario"></td>
                  </tr>
                </tbody>
              </table>
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
          </template>
          <template v-else>
            <form>
              <div class="form-row">
                <div class="col-md-6 mb-2">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      disabled
                      v-model="descripcion"
                    />
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      :disabled="accion == 1"
                      @click="abrirModal()"
                    >
                      <i class="fa fa-search"></i> Buscar
                    </button>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-xs-12 col-xl-3 col-md-4 col-sm-6">
                  <label>Marca:</label>
                  <select class="form-control" v-model="idMarca">
                    <option selected :value="0">seleccionar</option>
                    <option
                      v-for="item in arrayMarca"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>
                <div class="form-group col-xs-12 col-xl-3 col-md-4 col-sm-6">
                  <label>Reg. Sanitario:</label>
                  <input type="text" class="form-control" v-model="regSanitario" />
                </div>
                <div class="form-group col-xs-12 col-xl-3 col-md-4 col-sm-6">
                  <label>Codigo CUM:</label>
                  <input type="text" class="form-control" v-model="codigoCum" />
                </div>
                <div class="form-group col-xs-12 col-xl-3 col-md-4 col-sm-6">
                  <label>Iva:</label>
                  <input type="number" class="form-control" v-model="iva" />
                </div>
                <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <button
                    v-if="accion==0"
                    class="btn btn-success mt-20 btn-sm"
                    type="button"
                    @click="crearProducto()"
                  >
                    <i class="fa fa-save"></i> Guardar
                  </button>
                  <button
                    v-else
                    class="btn btn-success mt-40 btn-sm"
                    type="button"
                    @click="actualizarProducto()"
                  >
                    <i class="fa fa-save"></i> Actualizar
                  </button>
                  <button class="btn btn-danger btn-sm" type="button" @click="cancelar()">
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
      v-bind:objTitulo="objTituloEqui"
      tituloModal="Busqueda de equivalencia"
      url="/inventario/consultarEquivalencia"
      :arrayCampos="arrayCamposEqui"
      :modal="modal"
      @datos="arrayDatosEqui = $event"
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
      lMarca: 1030,
      listado: 0,
      idEquivalencia: 0,
      descripcion: "",
      accion: 0,
      idMarca: 0,
      idProducto: 0,
      codigoCum: "",
      iva: "0",
      regSanitario: "",
      modal: 0,
      arrayMarca: [],
      arrayReg: [],
      arrayDatosEqui: [],
      objTituloEqui: {
        agregar: "agregar",
        id: "id",
        descripcion: "descripcion"
      },
      arrayCamposEqui: ["id", "descripcion"],
      buscar:'',
      criterio:'descripcion',
      paginacion:{
                 'total'        :0,
                 'current_page' :0,
                 'per_page'     :0,
                 'last_page'    :0,
                 'from'         :0,
                 'to'           :0,
      },
      offset: 3
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
    mostrarFormulario() {
      this.listado = 1;
    },
    ocultarFormulario() {
      this.listado = 0;
    },
    cargarMarca() {
      let me = this;
      axios
        .get("general/descripciones", {
          params: {
            id: me.lMarca
          }
        })
        .then(function(response) {
          me.arrayMarca = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    listarProducto(page, buscar, criterio) {
      let me = this;
      axios.get("/inventario/productoListar", {
          params: {
            page: page,
            buscar: buscar,
            criterio: criterio
          }
        })
        .then(function(response) {
          var respuesta = response.data;
          me.arrayReg = respuesta.parametroListar.data;
          me.paginacion = respuesta.pagination;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    crearProducto() {
      let me = this;
      axios
        .post("/inventario/reqistrar", {
          idEquivalencia: me.idEquivalencia,
          idMarca: me.idMarca,
          regSanitario: me.regSanitario,
          codigoCum: me.codigoCum,
          iva: me.iva
        })
        .then(function() {
          me.limpiarControles();
          me.listarProducto(1, "", "descripcion");
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
    actualizarProducto() {
      let me = this;
      axios
        .put("/inventario/actualizar", {
          id: me.idProducto,
          idEquivalencia: me.idEquivalencia,
          idMarca: me.idMarca,
          regSanitario: me.regSanitario,
          codigoCum: me.codigoCum,
          iva: me.iva
        })
        .then(function() {
          me.limpiarControles();
          me.listarProducto(1, "", "descripcion");
          me.ocultarFormulario();
          swal(
            "Actualizado!",
            "El registro ha sido actualizado con éxito.",
            "success"
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cargarProducto() {
      let me = this;
      axios
        .get("/inventario/cargarProducto", {
          params: {
            id: me.idProducto
          }
        })
        .then(function(response) {
          let arrayl = response.data;
          me.idEquivalencia = arrayl[0]["idEquivalencia"];
          me.idMarca = arrayl[0]["idMarca"];
          me.regSanitario = arrayl[0]["regSanitario"];
          me.codigoCum = arrayl[0]["codigoCum"];
          me.iva = arrayl[0]["iva"];
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    agregarDatos() {
      this.idEquivalencia = this.arrayDatosEqui[0]["id"];
      this.descripcion = this.arrayDatosEqui[0]["descripcion"];
      this.modal = 0;
    },
    abrirModal: function() {
      this.modal = 1;
    },
    limpiarControles() {
      this.descripcion = "";
      this.accion = 0;
      this.idMedicamento = 0;
      this.idMarca = 0;
      this.regSanitario = "";
      this.codigoCum = "";
      this.iva = "";
    },
    cancelar() {
      this.limpiarControles();
      this.ocultarFormulario();
    },
    editarRegistro(id, descripcion) {
      swal({
        title: "¿Desea editar el registro?",
        type: "question",
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
          this.idProducto = id;
          this.descripcion = descripcion;
          this.accion = 1;
          this.cargarProducto();
          this.mostrarFormulario();
        } else if (result.dismiss === swal.DismissReason.cancel) {
        }
      });
    },
    cambiarPagina(page, buscar, criterio) {
      let me = this;
      me.paginacion.current_page = page;
      me.listarProducto(page, buscar, criterio);
    }
  },
  mounted() {
    this.cargarMarca();
    this.listarProducto(1, "", "descripcion");
  }
};
</script>
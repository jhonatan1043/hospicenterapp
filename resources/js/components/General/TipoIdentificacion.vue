<template>
  <main class="main">
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <h5>Tipo de Identificación</h5>
        </div>
        <div class="card-body">
          <template v-if="listado == 0">
            <button type="button" class="btn btn-secondary btn sm" @click="mostrarFormulario()">
              <i class="fa fa-plus-circle"></i> Nuevo
            </button>
            <hr />
            <div class="table-responsive">
              <table class="table table-bordered table-sm table-hover">
                <thead>
                  <tr>
                    <th width="20" class="text-center">Opciones</th>
                    <th width="10" class="text-center">codigo</th>
                    <th width="700" class="text-center">Descripcion</th>
                    <th width="100" class="text-center">Codigo Dian</th>
                    <th width="100" class="text-center">Codigo Rips</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arrayIdent" :key="index">
                    <td>
                      <button
                        type="button"
                        class="btn btn-warning btn-sm"
                        @click="editar(item.idTipoIdentificacion,item.descripcion,item.codigoDian,item.codigoRips)"
                      >
                        <i class="icon-pencil"></i>
                      </button> &nbsp;
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="anularTipoIdentificacion(item.idTipoIdentificacion)"
                      >
                        <i class="icon-trash"></i>
                      </button>
                    </td>
                    <td v-text="item.idTipoIdentificacion"></td>
                    <td v-text="item.descripcion"></td>
                    <td v-text="item.codigoDian"></td>
                    <td v-text="item.codigoRips"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <template v-else>
            <form>
              <div class="form-row">
                <div class="form-group col-xs-12 col-sm-6 col-md-4 col-xl-4">
                  <label>Descripción</label>
                  <input type="text" class="form-control" v-model="descripcion" />
                </div>
                <div class="form-group col-xs-12 col-sm-6 col-md-4 col-xl-4">
                  <label>Codigo Dián</label>
                  <input type="text" class="form-control" v-model="cDian" />
                </div>
                <div class="form-group col-xs-12 col-sm-6 col-md-4 col-xl-4">
                  <label>Codigo Rips</label>
                  <input type="text" class="form-control" v-model="cRips" />
                </div>
                <div class="form-group col-12">
                  <button
                    v-if="accion == 0"
                    class="btn btn-success mt-20"
                    type="button"
                    @click="crearTipoIdentificacion()"
                  >
                    <i class="fa fa-save"></i> Guardar
                  </button>
                  <button
                    v-else
                    class="btn btn-success mt-40"
                    type="button"
                    @click="actualizarTipoIdentificacion()"
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
  </main>
</template>
<script>
export default {
  data() {
    return {
      listado: 0,
      accion: 0,
      idTident: 0,
      descripcion: "",
      cDian: "",
      cRips: "",
      arrayIdent: []
    };
  },
  methods: {
    mostrarFormulario() {
      this.listado = 1;
    },
    ocultarFormulario() {
      this.listado = 0;
    },
    tipoIdentificacionListar() {
      let me = this;
      axios
        .get("/tipoIdentificacionListar")
        .then(function(response) {
          me.arrayIdent = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    limpiarControles() {
      this.descripcion = "";
      this.cDian = "";
      this.rips = "";
      this.accion = "";
    },
    cancelar() {
      this.limpiarControles();
      this.ocultarFormulario();
    },
    editar(id, descripcion, cDian, cRips) {
      this.idTident = id;
      this.descripcion = descripcion;
      this.cDian = cDian;
      this.cRips = cRips;
      this.accion = 1;
      this.mostrarFormulario();
    },
    crearTipoIdentificacion() {
      let me = this;
      axios
        .post("/tipoIdentificacion/registrar", {
          descripcion: me.descripcion,
          codigoDian: me.cDian,
          codigoRips: me.cRips
        })
        .then(function() {
          me.limpiarControles();
          me.tipoIdentificacionListar();
          me.ocultarFormulario();
          swal(
            "Guardado",
            "El registro ha sido guardado con exito.",
            "success"
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    actualizarTipoIdentificacion() {
      let me = this;
      axios
        .put("/tipoIdentificacion/actualizar", {
          id: me.idTident,
          descripcion: me.descripcion,
          codigoDian: me.cDian,
          codigoRips: me.cRips
        })
        .then(function() {
          me.limpiarControles();
          me.tipoIdentificacionListar();
          me.ocultarFormulario();
          swal(
            "Actualizar",
            "El registro ha sido actualizado con exito.",
            "success"
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    anularTipoIdentificacion(idTiden) {
      let me = this;
      axios
        .put("/tipoIdentificacion/anular", {
          id: idTiden
        })
        .then(function(response) {
          me.tipoIdentificacionListar();
          swal("Anulado", "El registro ha sido anulado con exito.", "success");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.tipoIdentificacionListar();
  }
};
</script>

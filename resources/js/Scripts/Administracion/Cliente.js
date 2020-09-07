import ModalGeneral from "../../components/ModalBusqueda/ModalGeneral.vue";
export default {
  components: {
    ModalGeneral
  },
  data() {
    return {
      listado: 1,
      ldia: 1037,
      modal: 0,
      accion: 0,
      editable: 0,
      idCliente: 0,
      idTercero: 0,
      tercero: "",
      idDiaEntrega: 0,
      idDiaPlazo: 0,
      idDiaDevolucion: 0,
      idFormaPago: 0,
      idRegimen: 0,
      nombreCampo: "id",
      campoBuscar: "",
      arrayCliente: [],
      arrayDatos: [],
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
      this.listado = 0;
    },
    ocultarFormulario() {
      this.listado = 1;
    },
    clienteListar() {
      let me = this;
      axios
        .get("/cliente/listar")
        .then(function(response) {
          me.arrayCliente = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    guardarCliente() {
      let me = this;
      if (me.validacionCampos() == true) {
        axios
          .post("/cliente/guardar", {
            idTercero:       me.idTercero,
            idDiaEntrega:    me.idDiaEntrega,
            idDiaPlazo:      me.idDiaPlazo,
            idDiaDevolucion: me.idDiaDevolucion,
            idFormaPago:     me.idFormaPago,
            idRegimen:       me.idRegimen
          })
          .then(function() {
            me.limpiarControles();
            me.clienteListar();
            me.ocultarFormulario();
            swal(
              "Guardado",
              "El registro ha sido guardado con éxito.",
              "success"
            );
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        swal("Siho", "Los campos marcados son obligatorios", "warning");
      }
    },
    actualizar(){
        let me = this;
        axios.put('/cliente/actualizar', {
            id:              me.idCliente,
            idTercero:       me.idTercero,
            idDiaEntrega:    me.idDiaEntrega,
            idDiaPlazo:      me.idDiaPlazo,
            idDiaDevolucion: me.idDiaDevolucion,
            idFormaPago:     me.idFormaPago,
            idRegimen:       me.idRegimen
        })
        .then(function(response) {
          me.limpiarControles();
          me.ocultarFormulario();
          me.clienteListar();
          swal(
            'Actualizado!',
            'El registro ha sido actualizado con éxito.',
            'success'
          )
        })
        .catch(function (error) {
          console.log(error);
          })
    },
    abrirModal() {
      this.modal = 1;
    },
    agregarDatos() {
      this.idTercero = this.arrayDatosTerceros[0]["id"];
      this.tercero   = this.arrayDatosTerceros[0]["tercero"];
      this.editable  = 1;
      this.modal     = 0;
    },
    cerrarModal() {
      this.modal = 0;
    },
    cargarDias() {
      let me = this;
      axios
        .get("general/descripciones", {
          params: {
            id: me.ldia
          }
        })
        .then(function(response) {
          me.arrayDatos = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    limpiarControles() {
      this.tercero         = "";
      this.idCliente       = 0;
      this.idTercero       = 0;
      this.nombre          = "";
      this.idDiaEntrega    = 0;
      this.idDiaPlazo      = 0;
      this.idDiaDevolucion = 0;
      this.idFormaPago     = 0;
      this.idRegimen       = 0;
      this.accion          = 0;
    },
    
    cancelar() {
      let me = this;
       swal({
        title: '¿Desea cancelar el registro?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          me.limpiarControles();
          me.ocultarFormulario();
       } else if (
          result.dismiss === swal.DismissReason.cancel
        ) {
        }
      })
    },
    cargarRegistro(id, idTercero, nombre) {
      let me = this;
     
      axios.get("/cliente/cargar", {
          params: {
            id: id
          }
        })
        .then(function(response) {
          let arrayL = [] ;
          arrayL = response.data;       
              
          me.idCliente       = id;
          me.idTercero       = idTercero;
          me.tercero         = nombre;
          me.idDiaEntrega    = arrayL['idDiaEntrega'];
          me.idDiaPlazo      = arrayL['idDiaPlazo'];
          me.idDiaDevolucion = arrayL['idDiaDevolucion'];
          me.idFormaPago     = arrayL['idFormaPago'];
          me.idRegimen       = arrayL['idRegimen'];
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    validacionCampos() {
      if (
        this.idTercero != 0 &&
        this.idDiaEntrega != 0 &&
        this.idDiaPlazo != 0 &&
        this.idDiaDevolucion != 0 &&
        this.idFormaPago != 0 &&
        this.idRegimen != 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    editarRegistro(id, idTercero, nombre) {
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
          me.idCliente = id;
          me.accion = 1;
          me.editable = 1;
          console.log(idTercero)
          me.cargarRegistro(id, idTercero, nombre);
          me.mostrarFormulario();
        } else if (result.dismiss === swal.DismissReason.cancel) {
        }
      });
    },
    anularCliente(id) {
      swal({
        title: "¿Desea anular el registro?",
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
            .put("cliente/anular", {
              id: id
            })
            .then(function(response) {
              me.clienteListar();
              
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
    }
  },

  created() {
    this.cargarDias();
    this.clienteListar();
  }
};
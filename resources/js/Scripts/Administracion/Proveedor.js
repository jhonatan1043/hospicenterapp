import ModalGeneral from "../../components/ModalBusqueda/ModalGeneral.vue";
export default {
  components: {
    ModalGeneral
  },
  data() {
    return {
      listado: 1,
      ldia: 1037,
      lbanco: 1038,
      modal: 0,
      accion: 0,
      editable: 0,
      idProveedor: 0,
      idTercero: 0,
      tercero: "",
      idBanco: 0,
      idTipoCuenta: 0,
      identificacion: "",
      numeroCuenta: "",
      idDiaDevolucion: 0,
      idDiaPlazo: 0,
      idDiaEntrega: 0,
      idFormaPago: 0,
      idRegimen: 0,
      arrayProveedor: [],
      arrayBancos: [],
      arrayDatos: [],
      arrayTitulo : [],
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
    cancelar() {
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
          this.limpiarControles();
          this.ocultarFormulario();
          this.arrayTitulo = [];
        } else if (
          result.dismiss === swal.DismissReason.cancel
        ) {
        }
      })
    },
    proveedorListar() {
      let me = this;
      axios
      .get("/proveedor/listar")
      .then(function(response) {
        me.arrayProveedor = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    guardarProveedor(){
      let me = this;
      if(me.validacionCampos() == true){
        axios
        .post("/proveedor/guardar", {
            idTercero:       me.idTercero,
            idDiaEntrega:    me.idDiaEntrega,
            idDiaPlazo:      me.idDiaPlazo,
            idDiaDevolucion: me.idDiaDevolucion,
            idFormaPago:     me.idFormaPago,
            idRegimen:       me.idRegimen,
            idBanco:         me.idBanco,
            idTipoCuenta:    me.idTipoCuenta,
            identificacion:  me.identificacion,
            numeroCuenta:    me.numeroCuenta
        })
        .then(function() {
          me.limpiarControles();
          me.proveedorListar();
          me.ocultarFormulario();
          swal(
            "Guardado",
            "El registro ha sido guardado con exito",
            "success"
          );
        })
        .catch(function(error) {
          console.log(error);
        });
      }else{
        swal("Siho", "Los campos son obligatorios", "warning");
      }
    },
    actualizar() {
      let me = this;
      axios.put("/proveedor/actualizar", {
            id:              me.idProveedor,
            idTercero:       me.idTercero,
            idDiaEntrega:    me.idDiaEntrega,
            idDiaPlazo:      me.idDiaPlazo,
            idDiaDevolucion: me.idDiaDevolucion,
            idFormaPago:     me.idFormaPago,
            idRegimen:       me.idRegimen,
            idBanco:         me.idBanco,
            idTipoCuenta:    me.idTipoCuenta,
            identificacion:  me.identificacion,
            numeroCuenta:    me.numeroCuenta
      })
      .then(function(response) {
        me.limpiarControles();
        me.ocultarFormulario();
        me.proveedorListar();
        swal(
          "actualizado",
          "El registro ha sido actualizado con exito,",
          "success"
        )
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    limpiarControles() {
        this.tercero         = ""; 
        this.idTercero       =  "";
        this.idDiaEntrega    = 0 ;
        this.idDiaPlazo      = 0 ;
        this.idDiaDevolucion = 0 ;
        this.idFormaPago     = 0 ;
        this.idRegimen       = 0 ;
        this.idBanco         = 0 ;
        this.idTipoCuenta    = 0 ;
        this.identificacion  = "";
        this.numeroCuenta    = "";  
        this.accion          = 0;
        },
    cargarRegistro(id, idTercero, nombre) {
      let me = this;

      axios
      .get("/proveedor/cargar", {
        params: {
          id: id
        }
      })
      .then(function(response) {
         let arrayL = [] ;
         arrayL = response.data;

          me.idProveedor      = id;
          me.idTercero        = idTercero;
          me.tercero          = nombre;
          me.idDiaEntrega     = arrayL['idDiaEntrega'];
          me.idDiaPlazo       = arrayL['idDiaPlazo'];
          me.idDiaDevolucion  = arrayL['idDiaDevolucion'];
          me.idFormaPago      = arrayL['idFormaPago'];
          me.idRegimen        = arrayL['idRegimen'];
          me.idBanco          = arrayL['idBanco'];
          me.idTipoCuenta     = arrayL['idTipoCuenta'];
          me.identificacion   = arrayL['identificacion'];
          me.numeroCuenta     = arrayL['numeroCuenta'];
      })
      .catch(function(error) { 
        console.error(error);
      });
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
          me.idProveedor = id;
          me.accion = 1;
          me.editable = 1;
          me.cargarRegistro(id, idTercero, nombre);
          me.mostrarFormulario();
        } else if (result.dismiss === swal.DismissReason.cancel) {
        }
      });
    },
    validacionCampos() {
      if (
        this.idTercero != 0 &&
        this.idDiaEntrega != 0 &&
        this.idDiaPlazo != 0 &&
        this.idDiaDevolucion != 0 &&
        this.idFormaPago != 0 &&
        this.idRegimen != 0 &&
        this.idBanco != 0 &&
        this.idTipoCuenta != 0 &&
        this.identificacion != 0 &&
        this.numeroCuenta != 0
      ){
        return true;
      } else {
        return  false;
      }
    },
    anularProveedor(id) {
      swal({
        title: "¿Desea Anular el registro?",
        type: "error",
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
          let me = this;
          axios.put("proveedor/anular", {
                'id': id
            })
            .then(function(response) {
              me.proveedorListar();
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
    cargarBancos() {
      let me = this;
      axios
        .get("general/descripciones", {
          params: {
            id: me.lbanco
          }
        })
        .then(function(response) {
          me.arrayBancos = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
  },
  },
  created() { 
    this.cargarDias();
    this.cargarBancos();
    this.proveedorListar();
  }
}
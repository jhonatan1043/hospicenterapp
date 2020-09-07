export default {
    data() {
      return {
        id: 0,
        listado: 0,
        lcama: 1019,
        lServicio: 1024,
        lPiso: 1025,
        lHabitacion: 1026,
        arrayRegListar: [],
        arraycama: [],
        arrayEntorno: [],
        arrayServicio: [],
        arrayPiso: [],
        arrayHabitacion: [],
        observacion: "",
        idCama: 0,
        idEntorno: 0,
        idServicio: 0,
        idPiso: 0,
        idHabitacion: 0,
        accion: 0
      };
    },
    methods: {
      mostrarFormulario() {
        this.listado = 1;
      },
      ocultarFormulario() {
        this.listado = 0;
      },
      cargarEntornos() {
        let me = this;
        axios
          .get("/entorno")
          .then(function(response) {
            me.arrayEntorno = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      cargarCamas() {
        let me = this;
        axios
          .get("general/descripciones", {
            params: {
              id: me.lcama
            }
          })
          .then(function(response) {
            me.arraycama = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      cargarServicios() {
        let me = this;
        axios
          .get("general/descripciones", {
            params: {
              id: me.lServicio
            }
          })
          .then(function(response) {
            me.arrayServicio = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      cargarPisos() {
        let me = this;
        axios
          .get("general/descripciones", {
            params: {
              id: me.lPiso
            }
          })
          .then(function(response) {
            me.arrayPiso = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      cargarHabitaciones() {
        let me = this;
        axios
          .get("general/descripciones", {
            params: {
              id: me.lHabitacion
            }
          })
          .then(function(response) {
            me.arrayHabitacion = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      limpiarControles() {
        this.observacion = "";
        this.idCama = 0;
        this.idEntono = 0;
        this.idServicio = 0;
        this.idPiso = 0;
        this.idHabitacion = 0;
        this.accion = 0;
      },
      cancelar() {
        this.limpiarControles();
        this.ocultarFormulario();
      },
      cargarRegListar() {
        let me = this;
        axios
          .get("/entornoservicio/listar")
          .then(function(response) {
            me.arrayRegListar = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      crearEntornoServicioCama() {
        let me = this;
        axios
          .post("/entornoservicio/registrar", {
            'idCama': me.idCama,
            'idEntorno': me.idEntorno,
            'idServicio': me.idServicio,
            'idPiso': me.idPiso,
            'idHabitacion': me.idHabitacion,
            'observacion': me.observacion
          })
          .then(function(response) {
            me.limpiarControles();
            me.cargarRegListar();
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
      actualizarEntornoServicioCama() {
        let me = this;
        axios.put("/entornoservicio/actualizar", {
            'id'          : me.id,
            'idCama'      : me.idCama,
            'idEntorno'   : me.idEntorno,
            'idServicio'  : me.idServicio,
            'idPiso'      : me.idPiso,
            'idHabitacion': me.idHabitacion,
            'observacion' : me.observacion
          })
          .then(function(response) {
            me.limpiarControles();
            me.cargarRegListar();
            me.ocultarFormulario();
            swal(
              "Actualizado",
              "El registro ha sido actualizado con exito.",
              "success"
            );
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      anularEntornoServicioCama(id) {
        swal({
          title: "¿Desea Eliminar el registro?",
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
            axios.put("/entornoservicio/anular", {
                'id': id
              })
              .then(function(response) {
                me.cargarRegListar();
                swal(
                  "Anulado",
                  "El registro ha sido anulado con exito.",
                  "success"
                );
              })
              .catch(function(error) {
                console.log(error);
              });
          } else if (result.dismiss === swal.DismissReason.cancel) {
          }
        });
      },
      cargarRegistro() {
        let me = this;
        axios
          .get("/entornoservicio", {
            params: {
              id: me.id
            }
          })
          .then(function(response) {
            let array = response.data;
            me.observacion = array.observacion;
            me.idCama = array.idCama;
            me.idEntorno = array.idEntorno;
            me.idServicio = array.idServicio;
            me.idPiso = array.idPiso;
            me.idHabitacion = array.idHabitacion;
          })
          .catch(function(error) {
            console.error(error);
          });
      },
      editarRegistro(id) {
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
            this.id = id;
            this.accion = 1;
            this.cargarRegistro();
            this.mostrarFormulario();
          } else if (result.dismiss === swal.DismissReason.cancel) {
          }
        });
      }
    },
    mounted() {
      this.cargarServicios();
      this.cargarEntornos();
      this.cargarCamas();
      this.cargarPisos();
      this.cargarHabitaciones();
      this.cargarRegListar();
    }
  };
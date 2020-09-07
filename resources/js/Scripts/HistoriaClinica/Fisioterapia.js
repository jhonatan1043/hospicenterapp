import ModalGeneral from "../../components/ModalBusqueda/ModalGeneral.vue";
export default {
    components: {
        ModalGeneral
    },
    props: {
        idIngreso: 0
    },
    data() {
        return {
            indice: 0,
            idOrdenInsumo:0,
            codigoNota:0,
            modal:0,
            nota: "",
            editable: 0,
            btEditar: 0,
            btGuardar: 0,
            btCancelar: 0,
            btAnular: 0,
            btNuevo: 0,
            url: "/fisioterapia/insumoBuscar",
            arrayCampos: ["id", "descripcion"],
            tituloModal: "Busqueda de Insumos",
            objTitulo: {
                Agregar: "Agregar",
                Id: "Id",
                Codigo: "Codigo",
                Descripcion: "Descripcion"
            },
            arrayListarNotas:[],
            arrayDatos:[],
            arrayListarInsumos:[],
            arrayInsumos:[],
            tituloNotaFisio: "Lista de Nota",
            tituloInsFisio: "Lista de Insumo"
        };
    },
    methods: {
      abrirModal() {
        this.modal = 1;
      },
      cerrarModal() {
        this.modal = 0;
      },
      quitarFila(index, array) {
        array.splice(index, 1);
       },
        inicio() {
            this.desHabilitarBotones();
            this.btNuevo = 1;
        },
        habilitarBotones() {
            this.btNuevo = 1;
            this.btEditar = 1;
            this.btGuardar = 1;
            this.btCancelar = 1;
            this.editable = 1;
        },
        desHabilitarBotones() {
            this.btNuevo = 0;
            this.btEditar = 0;
            this.btGuardar = 0;
            this.btAnular = 0;
            this.btCancelar = 0;
        },
        pestañaSeleccionada(index) {
            this.indice = index;
        },
        nuevoReg() {
            switch (this.indice) {
                case 0:
                    this.limpiarControles();
                    this.desHabilitarBotones();
                    this.editable = 1;
                    this.btGuardar = 1;
                    this.btCancelar = 1;
                    break;
                case 1:
                    this.limpiarControlesInsumos();
                    this.desHabilitarBotones();
                    this.editable = 1;
                    this.btGuardar = 1;
                    this.btCancelar = 1;
                    break;
            }
        },
        editarReg() {
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
                    this.desHabilitarBotones();
                    this.editable = 1;
                    this.btEditar = 0;
                    this.btGuardar = 1;
                    this.btCancelar = 1;
                } else if (result.dismiss === swal.DismissReason.cancel) {
                }
            });
        },
        anularReg() {

        },
        cancelarReg() {
            swal({
                title: "¿Desea cancelar el registro?",
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
                    this.inicio();
                    this.limpiarControles();
                    this.editable = 0;
                } else if (result.dismiss === swal.DismissReason.cancel) {
                }
            });
        },
        limpiarControles() {
            this.nota = "";
            this.codigoNota=0;           
        },
        limpiarControlesInsumos(){
            this.arrayDatos = [];
            this.arrayInsumos = [];
            this.idOrdenInsumo =0;
        },
        validarCantidadInsumo(){
           console.log("entrando");
            if (this.arrayInsumos.length==0) {
                swal(
                    "Siho",
                    "¡Por favor agregue un insumo antes de guardar!",
                    "warning"
                );  
                return false;   
             }
          for(var i = 0;i<this.arrayInsumos.length;i++){
           
             if(this.arrayInsumos[i].cantidad <= 0){     
                                   
                swal(
                    "Siho",
                    "¡Digite una cantidad valida para el insumo!",
                    "warning"
                );    
                return false;           
             }
          }
          
          return true;
           
        },
        guardarReg() {
            switch (this.indice) {
                case 0:
                    this.guardarNotas();
                    break;
                case 1:
                    if(this.validarCantidadInsumo()){
                        this.guardarInsumos();
                    }                  
                    break;
            }
        },
        listarNotas() {
          let me = this;
          axios
              .get("/fisioterapia/listar", {
                  params: {
                      idIngreso: me.idIngreso
                  }
              })
              .then(function(response) {
                  me.arrayListarNotas = response.data;
              })
              .catch(function(error) {
                  console.log(error);
              });
      },
      cargarNotas(){
        let me = this;
        axios
            .get('/fisioterapia/cargarnota', {
                params: {
                    idNota: me.codigoNota
                }
            })
            .then(res => {
                let arrayData = res.data;
                me.nota = arrayData["nota"];
                me.desHabilitarBotones();
                me.btNuevo = 1;
                me.btEditar = 1;
                me.btAnular = 1;
            })
            .catch(err => {
                console.error(err);
            });
    },
      cargarInsumos(){
        let me = this;
        axios
            .get("/fisioterapia/cargarInsumos", {
                params: {
                    idOrdenInsumo: me.idOrdenInsumo
                }
            })
            .then(res => {
                me.arrayInsumos=[];
                me.arrayInsumos = res.data;
                me.desHabilitarBotones();
                me.btNuevo = 1;
                me.btEditar = 1;
                me.btAnular = 1;
            })
            .catch(err => {
                console.error(err);
            });     
      },
      agregarDatos() {
        switch (this.modal) {
            case 1:
                this.arrayInsumos.push({
                    id: this.arrayDatos[0]["id"],
                    codigo: this.arrayDatos[0]["codigo"],
                    descripcion: this.arrayDatos[0]["descripcion"],
                    cantidad: 0
                });
                break;
        }
    },
    
      guardarNotas() {
          let me = this;
            axios
                .post("/historiaClinica/fisioterapia/registarNota", {
                    idNota: this.codigoNota,
                    idIngreso: this.idIngreso,
                    nota: this.nota
                })
                .then(res => {
                    me.listarNotas();
                    me.editable = 0;
                    me.btEditar = 1;
                    me.btAnular = 1;
                    swal(
                        "Guardar!",
                        "El registro ha sido guardado con éxito.",
                        "success"
                    );
                })
                .catch(err => {
                    console.error(err);
                });
        },
        listarInsumos(){
            let me = this;
            axios
                .get("/fisioterapia/listarInsumos", {
                    params: {
                        idIngreso: me.idIngreso
                    }
                })
                .then(function(response) {
                    me.arrayListarInsumos = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        guardarInsumos() {
           let me = this;
            try {
                axios
                    .post('/historiaClinica/fisioterapia/registarInsumos',{
                      
                            "idOrdenIngreso": me.idOrdenInsumo,
                            "idIngreso": me.idIngreso,
                            "json": JSON.stringify(me.arrayInsumos)
                        
                        })
                    .then(res => {
                        me.listarInsumos();
                        me.inicio();
                        me.editable = 0;
                        me.btEditar = 1;
                        me.btAnular = 1;
                        swal(
                            "Guardar!",
                            "El registro ha sido guardado con éxito.",
                            "success"
                        );
                    })
                    .catch(err => {
                        console.error(err);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
      this.inicio();
      this.listarNotas();
      this.listarInsumos();
    }
};

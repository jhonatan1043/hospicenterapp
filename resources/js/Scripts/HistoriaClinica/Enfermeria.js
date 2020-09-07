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
            editable: 0,
            codigoNota:0,
            codigo: 0,
            nota: "",
            idOrdenInsumo: 0,
            indice: 0,
            url: "/enfermeria/insumoBuscar",
            btEditar: 0,
            btGuardar: 0,
            btCancelar: 0,
            btAnular: 0,
            btNuevo: 0,
            arrayListarNotas: [],
            arrayInsumos: [],
            arrayCampos: ["id", "descripcion"],
            arrayDatos: [],
            arrayListarInsumos:[],
            Modal: 0,
            tituloModal: "Busqueda de Insumos",
            objTitulo: {
                Agregar: "Agregar",
                Id: "Id",
                Codigo: "Codigo",
                Descripcion: "Descripcion"
            },
            arrayEnfermeria: [],
            tituloNotaEnf: "Lista de Nota",
            tituloInsEnf: "Lista de Insumo"
        };
    },
    methods: {
        inicio() {
            this.desHabilitarBotones();
            this.btNuevo = 1;
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

        anularReg(url, id) {
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
                        .put(url, {
                            id: id
                        })
                        .then(function() {
                            me.limpiarControles();
                            swal(
                                "Anulado",
                                "El registro ha sido anulado con éxito",
                                "succes"
                            );
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                } else if (result.dismiss === swal.DismissReason.cancel) {
                }
            });
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
                    this.limpiarControlesInsumos();
                    this.editable = 0;
                } else if (result.dismiss === swal.DismissReason.cancel) {
                }
            });
        },
        limpiarParamsModal() {
            this.arrayCampos = [];
            this.objTitulo = {};
            this.url = "";
        },
        abrirModal() {
            this.Modal = 1;
        },
        cerrarModal() {
            this.Modal = 0;
        },
        quitarFila(index, array) {
            array.splice(index, 1);
        },
        pestañaSeleccionada(index) {
            this.indice = index;
        },
        validarCampos() {
            switch (this.indice) {
                case 0:
                    if (this.nota == "") {
                        return false;
                    }
                    break;
                case 1:
                  this.validarCantidadInsumo();
                    break;
            }
            return true;
        },
        validarCantidadInsumo(){
           
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
            if (this.validarCampos()) {
                switch (this.indice) {
                    case 0:
                        this.guardarNota();
                        break;
                    case 1:
                     if(this.validarCantidadInsumo()){
                        this.guardarInsumos();
                     }
                        break;
                }
            } else {
                swal(
                    "Siho",
                    "¡Todos los campos marcados son obrigatorio!",
                    "warning"
                );
            }
        },
        guardarInsumos() {
            let me = this;
           
            try {
                axios
                    .post('/historiaClinica/enfermeria/registarInsumos',{
                      
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
        },
        listarInsumos(){
            let me = this;
            axios
                .get("/enfermeria/listarInsumos", {
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
        cargarInsumos(){
            let me = this;
            axios
                .get("/enfermeria/cargarInsumos", {
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
            switch (this.Modal) {
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
        limpiarControles() {
            this.nota = "";
            this.accion = 0;
            this.codigoNota =0;
        },
        limpiarControlesInsumos() {
            this.arrayDatos = [];
            this.arrayInsumos = [];
            this.idOrdenInsumo =0;
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
        listarNotas() {
            let me = this;
            axios
                .get("/enfermeria/listar", {
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
        guardarNota() {
            let me = this;
            axios
                .post("/historiaClinica/enfermeria/registrar", {
                    idNota: me.codigoNota,
                    idIngreso: me.idIngreso,
                    nota: me.nota
                })
                .then(function() {
                    me.inicio();
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
                .catch(function(error) {
                    console.log(error);
                });
        },
        actualizarNota() {
            let me = this;
            axios
                .put("/historiaClinica/enfermeria/actualizar", {
                    idNota: me.codigoNota,
                    nota: me.nota
                })
                .then(function(response) {
                    me.habilitarBotones();
                    me.btEditar = 0;
                    me.editable = 1;
                    swal(
                        "Actualizado!",
                        "El registro ha sido actualizado con éxito",
                        "success"
                    );
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarNotas() {
            let me = this;
            axios
                .get("/enfermeria/cargarnota", {
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
        }
    },
    created() {
        this.inicio();
        this.listarNotas();
        this.listarInsumos();
    }
};

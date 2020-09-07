import ModalGeneral from "../../components/ModalBusqueda/ModalGeneral.vue";
import moment from "moment";


export default {
   props:[
    "admision",
    "ingresoOn"
   ],
  
    components: {
        componentAdmision: () => import('../../components/Asistencial/Admision.vue'),
        ModalGeneral
       
    },
    data() {
        return {
            listado: this.ingresoOn !=0 ? 1:0,
            regresarAdmision: this.admision,
            accion: 0,
            idIngreso: 0,
            documento: "",
            nombrePaciente: "",
            fechaIngreso: moment().format("YYYY-MM-DD"),
            horaIngreso: moment().format("HH:mm:ss"),
            tipoRegimen: "",
            tipoAfiliacion: "",
            modal: 0,
            modalDiagnostico: 0,
            modalPaciente: 0,
            idViaIngreso: 0,
            idCausaExterna: 0,
            idAdmision: 0,
            idServicio: 0,
            idArea: 0,
            listaCausaExterna: 13,
            paramInstitucion: 1017,
            paramCamas: 1019,
            idCama: 0,
            idInstitucion: 0,
            numeroAutorizacion: "",
            arrayDiagnosticos: [],
            administradora: "",
            msg: "",
            estadoError: 0,
            nombreCampo: "paciente",
            campoBuscar: "",
            estadoErrorCampos: 0,
            valorFurips: 0,
            arrayDatos: [],
            arrayIngreso: [],
            arrayDatosDiagnosticos: [],
            arrayViaIngreso: [],
            arrayCausaExterna: [],
            arrayArea: [],
            arrayServicio: [],
            arrayCama: [],
            arrayInstitucion: [],
            offset: 3,
            paginacion: {
                total: 0,
                current_page: 0,
                per_page: 0,
                last_page: 0,
                from: 0,
                to: 0
            },
            objTitulo: {
                Agregar: "Agregar",
                Id: "Id",
                Documento: "Documento",
                Paciente: "Paciente",
                fechaAdmision: "FechaAdmision",
                Regimen: "Regimen",
                Afiliado: "Afiliado",
                Administradora: "Administradora"
            },
            objTituloDiagnostico: {
                Agregar: "Agregar",
                Id: "Id",
                CodigoCie: "CodigoCie",
                Descripcion: "Descripcion",
                Genero: "Genero",
                EdadInicial: "EdadInicial",
                EdadFinal: "EdadFinal"
            },
            arrayCamposDiagnosticos: ["id", "codigoCie", "descripcion"],
            arrayDatos: [],
            objTituloPaciente: {
                Agregar: "Agregar",
                IdPaciente: "idPaciente",
                Documento: "Documento",
                Nombre: "Paciente",
                TipoRegimen: "TipoRegimen",
                TipoAfiliacion: "TipoAfiliacion",
                administradora: "Administradora"
            },
            arrayCampos: [
                "idPaciente",
                "documento",
                "paciente",
                "regimen",
                "afiliacion",
                "nombreEps"
            ]
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
        listarIngreso: function(page, nombreCampo, campoBuscar) {
            let me = this;
           
            axios
                .get("/ingreso/listar", {
                    params: {
                        page: page,
                        nombreCampo:
                            nombreCampo == "" ? "Paciente" : nombreCampo,
                        campoBuscar: campoBuscar
                    }
                })
                .then(function(response) {
                    var respuesta = response.data;
                    me.arrayIngreso = respuesta.ingresoListar.data;
                    me.paginacion = respuesta.pagination;
                })
                .catch(function(error) {
                    throw error;
                });
        },
        deleteRow(index, dato) {
            var idx = this.arrayDiagnosticos.indexOf(dato);
            this.arrayDiagnosticos.splice(idx, 1);
        },
        cambiarPagina(page, buscar, criterio) {
            let me = this;
            me.paginacion.current_page = page;
            me.listarIngreso(page, buscar, criterio);
        },
        anularIngreso(idIngreso) {
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
                        .put("/ingreso/anular", {
                            idIngreso: idIngreso
                        })
                        .then(function() {
                            me.listarIngreso();
                            swal(
                                "Anular!",
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
        validarIngreso() {
            this.estadoErrorCampos = 0;
            this.estadoError = 0;
            if (
                this.idAdmision == 0 ||
                this.fechaIngreso == "" ||
                this.idViaIngreso == 0 ||
                this.idCausaExterna == 0 ||
                this.idServicio == 0 ||
                this.idArea == 0 ||
                this.idCama == 0 ||
                this.idInstitucion == 0
            ) {
                this.estadoErrorCampos = 1;
            }

            if (!this.arrayDiagnosticos.length) {
                this.msg = "Por favor debe agregar algun diagnostico";
                this.estadoError = 1;
            }
            return this.estadoErrorCampos == 1 || this.estadoError == 1
                ? true
                : false;
        },
        guardarIngreso: function() {
            if (this.validarIngreso()) {
                return swal(
                    "Siho",
                    "¡Todos los campos marcados son obrigatorio!",
                    "warning"
                );
            }
            let me = this;
            axios
                .post("/ingreso/guardar", {
                    idIngreso: me.idIngreso,
                    idAdmision: me.idAdmision,
                    fechaIngreso: me.fechaIngreso,
                    horaIngreso: me.horaIngreso,
                    idViaIngreso: me.idViaIngreso,
                    idCausaExterna: me.idCausaExterna,
                    idServicio: me.idServicio,
                    idArea: me.idArea,
                    idCama: me.idCama,
                    idInstitucion: me.idInstitucion,
                    numeroAutorizacion: me.numeroAutorizacion,
                    json: JSON.stringify(me.arrayDiagnosticos)
                })
                .then(function() {
                    me.estadoError = 0;
                    me.estadoErrorCampos = 0;
                    me.msg = "";                 
                   if(me.ingresoOn==0){
                     me.listado=2;
                     console.log("entrando");
                   }else{
                    me.listado=1;
                    me.listarIngreso();
                   }

                    if (me.idIngreso == 0) {
                        swal(
                            "Guardado!",
                            "El registro ha sido guardado con éxito.",
                            "success"
                        );
                    } else {
                        swal(
                            "Actualizar!",
                            "El registro ha sido actualizado con éxito.",
                            "success"
                        );
                    }
                    me.limpiarControles();
                })
                .catch(function(error) {
                    throw error;
                });
        },
        anularIngreso(id) {
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
                        .put("/ingreso/anular", {
                            idIngreso: id
                        })
                        .then(function(response) {
                            me.listarIngreso();
                            swal(
                                "Anular!",
                                "El registro ha sido eliminado con éxito.",
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

        cargarIngreso(idIngreso) {
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
                    let me = this;
                    axios
                        .get("/ingreso/cargar", {
                            params: {
                                idIngreso: idIngreso
                            }
                        })
                        .then(function(response) {
                            let arrayDatoIngreso = [];
                            arrayDatoIngreso = response.data;
                            (me.idIngreso = arrayDatoIngreso[0]["idAtencion"]),
                                me.cargarDiagnosticos();
                            (me.idAdmision = arrayDatoIngreso[0]["idAdmision"]),
                                (me.fechaIngreso =
                                    arrayDatoIngreso[0]["fechaIngreso"]),
                                (me.horaIngreso =
                                    arrayDatoIngreso[0]["horaIngreso"]),
                                (me.idViaIngreso =
                                    arrayDatoIngreso[0]["idViaIngreso"]),
                                (me.idCausaExterna =
                                    arrayDatoIngreso[0]["idCausaExterna"]),
                                (me.idServicio =
                                    arrayDatoIngreso[0]["idServicio"]),
                                me.cargarArea();
                            (me.idArea = arrayDatoIngreso[0]["idArea"]),
                                me.cargarCama();
                            (me.idCama = arrayDatoIngreso[0]["idCama"]),
                                (me.idInstitucion =
                                    arrayDatoIngreso[0]["idInstitucion"]),
                                (me.tipoRegimen =
                                    arrayDatoIngreso[0]["tipoRegimen"]),
                                (me.tipoAfiliacion =
                                    arrayDatoIngreso[0]["tipoAfiliacion"]),
                                (me.documento =
                                    arrayDatoIngreso[0]["documento"]),
                                (me.nombrePaciente =
                                    arrayDatoIngreso[0]["paciente"]),
                                (me.listado = 0);
                            me.accion = 1;
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

        cargarDiagnosticos() {
            let me = this;
            axios
                .get("/ingreso/diagnosticos", {
                    params: {
                        idIngreso: me.idIngreso
                    }
                })
                .then(function(response) {
                    me.arrayDiagnosticos = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
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
                    me.msg = "";
                    me.listado = 1;
                    me.listarIngreso();
                    me.limpiarControles();
                } else if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.cancel
                ) {
                }
            });
        },
        mostrarFormulario: function() {
            this.listado = 0;
        },
        limpiarControles: function() {
            this.idIngreso = 0;
            this.idAdmision = 0;
            this.fechaIngreso = moment().format("YYYY-MM-DD");
            this.horaIngreso = moment().format("HH:mm:ss");
            this.idViaIngreso = 0;
            this.idCausaExterna = 0;
            this.idAreaServicio = 0;
            this.idCama = 0;
            this.idInstitucion = 0;
            this.numeroAutorizacion = "";
            this.furips = 0;
            this.arrayDiagnosticos = [];
            this.nombrePaciente = "";
            this.tipoAfiliacion = "";
            this.tipoRegimen = "";
            this.documento = "";
            this.valorFurips = "";
            this.administradora ="";
            this.idServicio=0;
            this.idArea=0;
        },

        abrirModal: function() {
            this.modal = 1;
        },
        abrirModalDiagnosticos: function() {
            this.modalDiagnostico = 1;
        },
        asignarDatos: function() {
            this.idAdmision = this.arrayDatos[0]["Id"];
            this.documento = this.arrayDatos[0]["identificacion"];
            this.nombrePaciente = this.arrayDatos[0]["Paciente"];
            this.tipoRegimen = this.arrayDatos[0]["Regimen"];
            this.tipoAfiliacion = this.arrayDatos[0]["Afiliacion"];
        },
        cerrarModal() {
            this.modal = 0;
        },
        cerrarModalDiagnostico() {
            this.modalDiagnostico = 0;
        },
        agregarDiagnosticos: function() {
            if (this.datosNoRepetir(this.arrayDatosDiagnosticos[0]["id"])) {
                return swal({
                    type: "error",
                    title: "Error",
                    text: "Este registro ya se encuentra agregado!"
                });
            }

            this.arrayDiagnosticos.push({
                id: this.arrayDatosDiagnosticos[0]["id"],
                codigo: this.arrayDatosDiagnosticos[0]["codigoCIE"],
                descripcion: this.arrayDatosDiagnosticos[0]["descripcion"]
            });
        },
        datosNoRepetir: function(id) {
            for (var i = 0; i < this.arrayDiagnosticos.length; i++) {
                if (this.arrayDiagnosticos[i].id == id) {
                    return true;
                }
            }
        },
        cargarComboViaIngreso() {
            let me = this;
            axios
                .get("/ingreso/viaIngresos", {})
                .then(function(response) {
                    me.arrayViaIngreso = response.data;
                })
                .catch(function(error) {
                    throw error;
                });
        },
        cargarCausasExternas() {
            var me = this;
            axios
                .get("general/descripciones", {
                    params: {
                        id: this.listaCausaExterna
                    }
                })
                .then(function(response) {
                    me.arrayCausaExterna = response.data;
                })
                .catch(function(error) {
                    throw error;
                });
        },
        cargarServicio() {
            var me = this;
            axios
                .get("ingreso/servicio")
                .then(function(response) {
                    me.arrayServicio = response.data;
                })
                .catch(function(error) {
                    throw error;
                });
        },

        cargarArea() {
            var me = this;
            axios
                .get("ingreso/area", {
                    params: { idServicio: me.idServicio }
                })
                .then(function(response) {
                    me.arrayArea = response.data;
                })
                .catch(function(error) {
                    throw error;
                });
        },

        cargarInstitucion: function() {
            var me = this;
            axios
                .get("general/descripciones", {
                    params: {
                        id: me.paramInstitucion
                    }
                })
                .then(function(response) {
                    me.arrayInstitucion = response.data;
                })
                .catch(function(error) {
                    throw error;
                });
        },
        cargarCama: function() {
            var me = this;
            axios
                .get("ingreso/cama", {
                    params: {
                        idArea: me.idArea
                    }
                })
                .then(function(response) {
                    me.arrayCama = response.data;
                })
                .catch(function(error) {
                    throw error;
                });
        },
        verificarAdmision() {
            let me = this;
            axios
                .get("/ingreso/cargarAdmision", {
                    params: {
                        documento: me.documento
                    }
                })
                .then(function(response) {
                    me.arrayDatos = response.data;
                    me.idAdmision = me.arrayDatos[0]["idAdmision"];
                    me.identificacion = me.arrayDatos[0]["identificacion"];
                    me.nombrePaciente = me.arrayDatos[0]["paciente"];
                    me.tipoRegimen = me.arrayDatos[0]["regimen"];
                    me.tipoAfiliacion = me.arrayDatos[0]["afiliacion"];
                })
                .catch(function() {
                    swal(
                        "Siho",
                        "! La identificación no Existe o Presenta un ingreso activo ¡",
                        "warning"
                    );
                });
        },
        abrirModalPaciente() {
            this.modalPaciente = 1;
        },
        cerrarModalPaciente() {
            this.modalPaciente = 0;
        },
        agregarPaciente: function() {
            this.idAdmision = this.arrayDatos[0]["idAdmision"];
            this.documento = this.arrayDatos[0]["identificacion"];
            this.nombrePaciente = this.arrayDatos[0]["paciente"];
            this.tipoRegimen = this.arrayDatos[0]["regimen"];
            this.tipoAfiliacion = this.arrayDatos[0]["afiliacion"];
            this.administradora = this.arrayDatos[0]["nombreEps"];
            this.cerrarModalPaciente();
        }
    },

    created() {
        this.listarIngreso();
        this.cargarComboViaIngreso();
        this.cargarCausasExternas();
        this.cargarServicio();
        this.cargarInstitucion();
        console.log(this.ingresoOn);
    }
};

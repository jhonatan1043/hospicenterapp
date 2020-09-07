import componentPaciente from "../../components/Asistencial/Paciente.vue";
import ModalGeneral from "../../components/ModalBusqueda/ModalGeneral.vue";
import moment from "moment";
import componentIngreso from "../../components/Asistencial/Ingreso.vue";

export default {
    props:["ingreso"],
    components: {
        componentIngreso,
        componentPaciente,
        ModalGeneral
    },
    data() {
        return {
            listado: 1,
            openIngreso: 0,
            listaRegimen: 1,
            listaEstadoC: 6,
            listaDocumentos: 1039,
            listaGenero: 3,
            identificacion: "",
            idPaciente: 0,
            nombrePaciente: "",
            idAdministradora: 0,
            idEstadoCivil: 0,
            fechaAdmision: moment().format("YYYY-MM-DD"),
            horaAdmision: moment().format("HH:mm:ss"),
            genero: "",
            edad: "",
            idContrato: 0,
            idEspecialista: 0,
            idRegimen: 0,
            idAfiliacion: 0,
            idDocumento: 0,
            idAdmision: 0,
            modal: 0,
            modalPaciente: 0,
            pdf: "",
            arrayErrores: [],
            msgResponsable: "",
            errorEstado: 0,
            errorResponsable: 0,
            accion: 0,
            arrayAdmision: [],
            titulo: "Listado de admision",
            nombreCampo: "Identificacion",
            texto: "",
            arrayTipoIdent: [],
            arrayEspecialidad: [],
            arrayAfiliacion: [],
            arrayRegimen: [],
            arrayContrato: [],
            msg: "",
            arrayEstado: [],
            arrayTipoIdentificacionPaciente: [],
            arrayAdministradora: [],
            arrayDocumento: [],
            arrayPaciente: [],
            arrayDatos: [],
            objTituloPaciente: {
                Agregar: "Agregar",
                IdPaciente: "idPaciente",
                TipoDocumento: "TipoDocumento",
                Documento: "Documento",
                Nombre: "Paciente",
                Edad: "Edad",
                Genero: "Genero"
            },
            arrayCampos: [
                "idPaciente",
                "documento",
                "paciente",
                "edad",
                "genero"
            ],
            arrayResponsable: [
                {
                    responsable: 0,
                    tipoDocumento: 0,
                    documento: "",
                    nombre: "",
                    telefono: "",
                    direccion: ""
                }
            ]
        };
    },
    methods: {
        mostrarFormulario() {
            this.titulo = "Admision";
            this.listado = 0;
            this.accion = 0;
        },
        abrirModal() {
            let me = this;
            me.modal = 1;
        },
        abrirModalPaciente() {
            this.modalPaciente = 1;
        },
        limpiarContraoles() {
            let me = this;
            me.idPaciente = 0;
            me.idAdmision = 0;
            me.idEspecialista = 0;
            me.idContrato = 0;
            me.idRegimen = 0;
            me.idAfiliacion = 0;
            me.identificacion = "";
            me.fechaAdmision = moment().format("YYYY-MM-DD");
            me.nombrePaciente = "";
            me.idAdministradora=0;
            me.idEstadoCivil=0;
            me.horaAdmision =moment().format("HH:mm:ss");
            me.edad = "";
            me.genero = "";
            me.arrayResponsable=[];
            me.agregarFilas();
        },
        ocultarFormulario() {
            this.listado = 1;
            this.limpiarContraoles();
        },
        listarAdmision() {
            let me = this;
            axios
                .get("/admision/listar", {
                    params: {
                        nombreCampo: me.nombreCampo,
                        texto: me.texto == "" ? "''" : me.texto
                    }
                })
                .then(function(response) {
                    me.arrayAdmision = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        cargarComboRegimen() {
            var me = this;
            axios
                .get("general/descripciones", {
                    params: {
                        id: this.listaRegimen
                    }
                })
                .then(function(response) {
                    me.arrayRegimen = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarComboAfiliacion() {
            var me = this;
            axios
                .get("/consultarAfiliacion", {
                    params: {
                        id: this.idRegimen
                    }
                })
                .then(function(response) {
                    me.arrayAfiliacion = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarComboDocumentos() {
            var me = this;
            axios
                .get("/general/descripciones", {
                    params: {
                        id: this.listaDocumentos
                    }
                })
                .then(function(response) {
                    me.arrayDocumento = response.data;
                    console.log(me.arrayDocumento);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarComboEspecialidad() {
            var me = this;
            axios
                .get("/admision/cargarEspecialidad")
                .then(function(response) {
                    me.arrayEspecialidad = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarComboEstado() {
            var me = this;
            axios
                .get("/general/descripciones", {
                    params: {
                        id: this.listaEstadoC
                    }
                })
                .then(function(response) {
                    me.arrayEstado = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarComboAdministradora() {
            var me = this;
            axios
                .get("/consultarAdministradora")
                .then(function(response) {
                    me.arrayAdministradora = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarComboContrato() {
            var me = this;
            if (me.idEps != 0) {
                axios
                    .get("/admision/cargarContrato", {
                        params: {
                            idEps: me.idAdministradora
                        }
                    })
                    .then(function(response) {
                        me.arrayContrato = response.data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
       
        guardarAdmision() {
            if (this.validarAdmision()) {
                return swal(
                    "Siho",
                    "¡Todos los campos marcados son obrigatorio!",
                    "warning"
                );
            }
            let me = this;

            axios
                .post("/admision/guardarAdmision", {
                    idPaciente: me.idPaciente,
                    idAdmision: me.idAdmision,
                    idContrato: me.idContrato,
                    idEps: me.idEps,
                    idRegimen: me.idRegimen,
                    idAdministradora: me.idAdministradora,
                    idEstadoCivil: me.idEstadoCivil,
                    idAfiliacion: me.idAfiliacion,
                    idEspecialista: me.idEspecialista,
                    fechaAdmision: me.fechaAdmision,
                    horaAdmision: me.horaAdmision,
                    json: JSON.stringify(me.arrayResponsable)
                })
                .then(function(response) {
                    me.arrayResponsable = [];
                    me.arrayErrores = [];
                    me.errorEstado = 0;
                    me.errorResponsable = 0;                   
                    me.listado = 2;
                   

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
        verificarPaciente() {
            let me = this;
            if (me.identificacion != "") {
                axios
                    .get("/admision/verificarPaciente", {
                        params: {
                            documento: me.identificacion
                        }
                    })
                    .then(function(response) {
                        me.arrayDatos = response.data;
                        me.idPaciente = me.arrayDatos[0]["id"];
                        me.nombrePaciente = me.arrayDatos[0]["paciente"];
                        me.edad = me.arrayDatos[0]["edad"];
                        me.genero = me.arrayDatos[0]["genero"];
                        me.cargarComboContrato();
                    })
                    .catch(function(error) {
                        swal({
                            title:
                                "¿Registro no encontrado, Desea crear el registro?",
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
                                me.modal = 1;
                            } else if (
                                // Read more about handling dismissals
                                result.dismiss === swal.DismissReason.cancel
                            ) {
                            }
                        });
                    });
            }
        },
        validarAdmision() {
            this.errorEstado = 0;

            if (
                this.idPaciente == 0 ||
                !this.fechaAdmision ||
                !this.horaAdmision ||
                this.idContrato == 0 ||
                this.idEspecialista == 0 ||
                this.idRegimen == 0 ||
                this.idAfiliacion == 0 ||
                this.idAdministradora == 0
            ) {
                this.errorEstado = 1;
            }

            for (var i = 0; i < this.arrayResponsable.length; i++) {
                if (
                    this.arrayResponsable[i]["tipoDocumento"] == 0 ||
                    !this.arrayResponsable[i]["documento"] ||
                    !this.arrayResponsable[i]["nombre"] ||
                    !this.arrayResponsable[i]["telefono"] ||
                    !this.arrayResponsable[i]["direccion"]
                ) {
                    this.msgResponsable =
                        "Por favor diligencie toda la infomarción";
                    return (this.errorResponsable = 1);
                } else {
                    this.errorResponsable = 0;
                }
            }
            if (!this.arrayResponsable.length) {
                this.msg =
                    "Por favor debe agregar un acompañante o responsable";
                this.errorResponsable = 0;
                return (this.errorEstado = 1);
            }

            return this.errorEstado;
        },
        getArchivo(e) {
            this.pdf = this.$refs.file.files[0];
        },
        guardarPDF() {
            var formData = new FormData();
            formData.append("pdf", this.pdf);

            axios
                .post("/admision/subirArchivos", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(function() {
                    console.log("SUCCESS!!");
                })
                .catch(function() {
                    console.log("FAILURE!!");
                });
        },
        actualizarAdmision() {
            if (this.validarAdmision()) {
                return swal(
                    "Siho",
                    "¡Todos los campos marcados son obrigatorio!",
                    "warning"
                );
            }

            let me = this;
            console.log(me.idAdmision);
            axios
                .put("/admision/actualizarAdmision", {
                    idPaciente: me.idPaciente,
                    idAdmision: me.idAdmision,
                    idContrato: me.idContrato,
                    idEps: me.idEps,
                    idRegimen: me.idRegimen,
                    idAfiliacion: me.idAfiliacion,
                    idEspecialista: me.idEspecialista,
                    fechaAdmision: me.fechaAdmision,
                    horaAdmision: me.horaAdmision,
                    idAdministradora: me.idAdministradora,
                    idEstadoCivil: me.idEstadoCivil,
                    json: JSON.stringify(me.arrayResponsable)
                })
                .then(function(response) {
                    me.arrayResponsable = [];
                    me.arrayErrores = [];
                    me.errorEstado = 0;
                    me.errorResponsable = 0;
                    me.listarAdmision();
                    me.ocultarFormulario();
                    swal(
                        "Actualizar!",
                        "El registro ha sido actualizado con éxito.",
                        "success"
                    );
                })
                .catch(function(error) {});
        },
        anularAdmision(id) {
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
                    axios
                        .put("/admision/anularAdmision", {
                            idAdmision: id
                        })
                        .then(function(response) {
                            me.listarAdmision();
                            swal(
                                "Eliminar!",
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
        cargarAdmision(id) {
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
                        .get("admision/consultarAdmision", {
                            params: {
                                idAdmision: id
                            }
                        })
                        .then(function(response) {
                            let arrayDatoAdmision = [];
                            arrayDatoAdmision = response.data;

                            me.idAdmision = arrayDatoAdmision[0]["idAdmision"],
                            me.cargarDetalle(me.idAdmision);
                            me.idPaciente = arrayDatoAdmision[0]["idPaciente"],                          
                            me.idAdministradora =arrayDatoAdmision[0]["idAdministradora"],                           
                            me.cargarComboContrato();
                            me.idContrato = arrayDatoAdmision[0]["idContrato"],
                            me.idRegimen = arrayDatoAdmision[0]["idRegimen"],
                            me.cargarComboAfiliacion();
                            me.idAfiliacion = arrayDatoAdmision[0]["idAfiliacion"],
                            me.idEspecialista = arrayDatoAdmision[0]["idTercero"],
                            me.fechaAdmision = arrayDatoAdmision[0]["fechaAdmision"],
                            me.horaAdmision = arrayDatoAdmision[0]["horaAdmision"],
                            me.arrayResponsable = arrayDatoAdmision[0]["idPaciente"],
                            me.nombrePaciente =  arrayDatoAdmision[0]["paciente"],
                            me.idEstadoCivil = arrayDatoAdmision[0]["idEstadoCivil"];                         
                            me.edad = arrayDatoAdmision[0]["edad"],
                            me.EPS = arrayDatoAdmision[0]["nombreEps"],
                            me.genero = arrayDatoAdmision[0]["genero"],
                            me.identificacion = arrayDatoAdmision[0]["identificacion"],
                            me.listado = 0;
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
        cargarDetalle(id) {
            let me = this;

            axios
                .get("admision/consultarAcompañante", {
                    params: {
                        idAdmision: id
                    }
                })
                .then(function(response) {
                    me.arrayResponsable = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        agregarFilas() {
            this.arrayResponsable.push({
                responsable: 0,
                tipoDocumento: 0,
                documento: "",
                nombre: "",
                telefono: "",
                direccion: ""
            });
        },
        deleteRow(index, arrayResponsa) {
            var idx = this.arrayResponsable.indexOf(arrayResponsa);
            this.arrayResponsable.splice(idx, 1);
        },
        cancelarModal() {
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
                    if (localStorage.braRegistro == 1) {
                        this.verificarPaciente();
                    }
                    this.limpiarControlesPaciente();
                    this.modal = 0;
                } else if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.cancel
                ) {
                }
            });
        },
        cargarComboTipoIdent() {
            var me = this;
            axios
                .get("/tipoIdentificacion")
                .then(function(response) {
                    me.arrayTipoIdent = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cancelarRegistro() {
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
                    this.limpiarContraoles();
                    this.ocultarFormulario();
                } else if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.cancel
                ) {
                }
            });
        },
        cancelarModal() {
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
                    alert(localStorage.getItem("braRegistro"));
                    if (localStorage.getItem("braRegistro") == 1) {
                        localStorage.clear();
                        this.verificarPaciente();
                    }
                    this.modal = 0;
                } else if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.cancel
                ) {
                }
            });
        },
        cargarComboPais() {
            var me = this;
            axios
                .get("/comboPais")
                .then(function(response) {
                    me.arrayPais = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
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
        cargarComboGenero() {
            var me = this;
            axios
                .get("general/descripciones", {
                    params: {
                        id: this.listaGenero
                    }
                })
                .then(function(response) {
                    me.arrayGenero = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarComboEstado() {
            var me = this;
            axios
                .get("general/descripciones", {
                    params: {
                        id: this.listaEstadoC
                    }
                })
                .then(function(response) {
                    me.arrayEstado = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarComboTipoIdentificacionPaciente() {
            var me = this;
            axios
                .get("/tipoIdentificacion")
                .then(function(response) {
                    me.arrayTipoIdentificacionPaciente = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarComboAdministradora() {
            var me = this;
            axios
                .get("/consultarAdministradora")
                .then(function(response) {
                    me.arrayAdministradora = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        letraCapital(cadena) {
            return cadena.charAt(0).toUpperCase() + cadena.slice(1);
        },
        cerrarModalPaciente() {
            this.modalPaciente = 0;
        },
        agregarPaciente: function() {
                this.idPaciente = this.arrayDatos[0]["idPaciente"];
                this.identificacion = this.arrayDatos[0]["identificacion"];
                this.nombrePaciente = this.arrayDatos[0]["paciente"];
                this.edad = this.arrayDatos[0]["edad"];
                this.genero= this.arrayDatos[0]["genero"];
                this.cerrarModalPaciente();
        },
       
    },
    created() {
        this.listarAdmision();
        this.cargarComboRegimen();
        this.cargarComboEspecialidad();
        this.cargarComboEstado();
        this.cargarComboAdministradora();
        this.cargarComboDocumentos();
        this.cargarComboTipoIdent();
    }
};

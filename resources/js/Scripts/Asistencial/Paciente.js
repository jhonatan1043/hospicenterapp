export default {
    props: ["admision", "identiPaciente"],
    data() {
        return {
            accion: 0,
            pacienteId: 0,
            listaGenero: 3,
            listaRegimen: 1,
            listaEstadoC: 6,
            listado: 1,
            idPais: 0,
            idDepartamento: 0,
            idMunicipio: 0,
            idGenero: 0,
            idRegimen: 0,
            idTipoIdentificacion: 0,
            idTipoAfiliacion: 0,
            identificacion: this.identiPaciente,
            celular: "",
            telefono: "",
            direccion: "",
            fechaNacimiento: "",
            sApellido: "",
            pApellido: "",
            pNombre: "",
            sNombre: "",
            email: "",
            arrayPais: [],
            arrayDepartamento: [],
            arrayMunicipio: [],
            arrayTipoIdentificacion: [],
            arrayGenero: [],
            arrayEstado: [],
            arrayTipoIdent: [],
            arrayAdministradora: [],
            listaReg: []
        };
    },
    methods: {
        cargarDatosPacienteTriage() {
            let me = this;
            axios
                .get("/cargarPacienteTriage", {
                    params: {
                        documento: this.identiPaciente
                    }
                })
                .then(function(response) {
                    var arrayPaciente = response.data;
                    me.pacienteId = arrayPaciente[0]["idPaciente"];
                    me.pNombre = arrayPaciente[0]["pNombre"];
                    me.sNombre = arrayPaciente[0]["sNombre"];
                    me.pApellido = arrayPaciente[0]["pApellido"];
                    me.sApellido = arrayPaciente[0]["sApellido"];
                    me.accion = 1;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        validarllamadoPaciente() {
            if (this.admision == 1) {
                this.cargarDatosPacienteTriage();
            }
        },
        mostrarFormulario() {
            this.listado = 0;
            this.accion = 0;
        },
        ocultarFormulario() {
            this.listado = 1;
            this.limpiarContraoles();
        },
        listarpacientes() {
            let me = this;
            axios
                .get("/listarPacientes")
                .then(function(response) {
                    me.listaReg = response.data;
                })
                .catch(function(error) {
                    console.log(error);
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
                .get("/general/descripciones", {
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
        guardarPaciente() {
            let me = this;
            if (this.validaRegistro() == true) {
                axios
                    .post("/paciente/registrar", {
                        idTipoIdentificacion: me.idTipoIdentificacion,
                        identificacion: me.identificacion,
                        pNombre: me.letraCapital(me.pNombre),
                        sNombre: me.letraCapital(me.sNombre),
                        pApellido: me.letraCapital(me.pApellido),
                        sApellido: me.letraCapital(me.sApellido),
                        idGenero: me.idGenero,
                        fechaNacimiento: me.fechaNacimiento,
                        idPais: me.idPais,
                        idDepartamento: me.idDepartamento,
                        idMunicipio: me.idMunicipio,
                        direccion: me.direccion,
                        telefono: me.telefono,
                        celular: me.celular,
                        email: me.email
                    })
                    .then(function() {
                        me.limpiarContraoles();
                        me.ocultarFormulario();
                        me.listarpacientes();
                        swal(
                            "Guardado!",
                            "El registro ha sido guardado con éxito.",
                            "success"
                        );
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            } else {
                swal(
                    "Siho",
                    "¡Todos los campos marcados son obrigatorio!",
                    "warning"
                );
            }
        },
        actualizarPaciente() {
            let me = this;
            if (this.validaRegistro() == true) {
                axios
                    .put("/paciente/actualizar", {
                        idTipoIdentificacion: me.idTipoIdentificacion,
                        identificacion: me.identificacion,
                        pNombre: me.letraCapital(me.pNombre),
                        sNombre: me.letraCapital(me.sNombre),
                        pApellido: me.letraCapital(me.pApellido),
                        sApellido: me.letraCapital(me.sApellido),
                        idGenero: me.idGenero,
                        fechaNacimiento: me.fechaNacimiento,
                        idPais: me.idPais,
                        idDepartamento: me.idDepartamento,
                        idMunicipio: me.idMunicipio,
                        direccion: me.direccion,
                        telefono: me.telefono,
                        celular: me.celular,
                        email: me.email,
                        id: me.pacienteId
                    })
                    .then(function() {

                        if (me.admision != 1) {
                            me.limpiarContraoles();
                            me.ocultarFormulario();
                            me.listarpacientes();
                        } else {
                            localStorage.setItem("braRegistro", 1);
                        }

                        swal(
                            "Actualizar!",
                            "El registro ha sido actualizado con éxito.",
                            "success"
                        );

                    })
                    .catch(function() {});
            } else {
                swal(
                    "Siho",
                    "¡Todos los campos marcados son obrigatorio!",
                    "warning"
                );
            }
        },
        eliminarPaciente(id) {
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
                        .put("/paciente/eliminar", {
                            id: id
                        })
                        .then(function(response) {
                            me.listarpacientes();
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
        cargarPaciente(id) {
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
                    this.cargar(id);
                } else if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.cancel
                ) {
                }
            });
        },
        verificarPacienteTriage() {
            let me = this;
            console.log("entrando");
            try {
                axios
                    .get("/pacienteVerificarTriage", {
                        params: {
                            documento: me.identificacion
                        }
                    })
                    .then(res => {
                        let arrayDato = res.data;

                        me.pacienteId = arrayDato[0]["idPaciente"];
                        me.pNombre = arrayDato[0]["pNombre"];
                        me.sNombre = arrayDato[0]["sNombre"];
                        me.pApellido = arrayDato[0]["pApellido"];
                        me.sApellido = arrayDato[0]["sApellido"];
                    })
                    .catch(err => {
                        console.error(err);
                    });
            } catch (error) {
                console.log(error);
            }
        },
        cargar(id) {
            let me = this;

            axios
                .get("/consultarPaciente", {
                    params: {
                        id: id
                    }
                })
                .then(function(response) {
                    let arrayPaciente = response.data;
                    me.idTipoIdentificacion =
                        arrayPaciente["idTipoIdentificacion"];
                    me.identificacion = arrayPaciente["identificacion"];
                    me.pNombre = arrayPaciente["pNombre"];
                    me.sNombre = arrayPaciente["sNombre"];
                    me.pApellido = arrayPaciente["pApellido"];
                    me.sApellido = arrayPaciente["sApellido"];
                    me.idGenero = arrayPaciente["idGenero"];
                    me.fechaNacimiento = arrayPaciente["fechaNacimiento"];
                    me.idPais = arrayPaciente["idPais"];
                    me.cargarComboDepartamento();
                    me.idDepartamento = arrayPaciente["idDepartamento"];
                    me.cargarComboMunicipio();
                    me.idMunicipio = arrayPaciente["idMunicipio"];
                    me.direccion = arrayPaciente["direccion"];
                    me.telefono = arrayPaciente["telefono"];
                    me.celular = arrayPaciente["celular"];
                    me.email = arrayPaciente["email"];
                    me.pacienteId = id;
                    me.accion = 1;
                    me.listado = 0;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        limpiarContraoles() {
            this.idPais = 0;
            this.idDepartamento = 0;
            this.idMunicipio = 0;
            this.idGenero = 0;
            this.idEstadoCivil = 0;
            this.idTipoIdentificacion = 0;
            this.identificacion = "";
            this.celular = "";
            this.telefono = "";
            this.direccion = "";
            this.fechaNacimiento = "";
            this.sApellido = "";
            this.pApellido = "";
            this.pNombre = "";
            this.sNombre = "";
            this.email = "";
        },
        validaRegistro() {
            if (
                this.idTipoIdentificacion == 0 ||
                this.identificacion == "" ||
                this.pNombre == "" ||
                this.pApellido == "" ||
                this.idAdministradora == 0 ||
                this.idGenero == 0 ||
                this.idPais == 0 ||
                this.idDepartamento == 0 ||
                this.idMunicipio == 0 ||
                this.direccion == "" ||
                this.celular == ""
            ) {
                return false;
            }
            {
                return true;
            }
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
        letraCapital(cadena) {
            if (cadena != null) {
                return cadena.charAt(0).toUpperCase() + cadena.slice(1);
            }
        }
    },
    mounted() {
        this.listarpacientes();
        this.cargarComboPais();
        this.cargarComboDepartamento();
        this.cargarComboMunicipio();
        this.cargarComboGenero();
        this.cargarComboTipoIdent();
        this.validarllamadoPaciente();
    }
};

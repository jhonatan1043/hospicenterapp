import { constants } from "crypto";
export default {
    data() {
        return {
            accion: 0,
            listado: 1,
            listaCriterio: 4,
            listaRespOcular: 9,
            listaRespVerbal: 10,
            listaRespMotora: 11,
            listaCausaExterna: 13,
            listaEstadoPaciente: 12,
            existePaciente: 0,
            crearPaciente: 0,
            idTriage: 0,
            idPaciente: 0,
            idTipoIdentificacion: 0,
            identificacion: "",
            nombre: "",
            administradora: "",
            genero: "",
            estadoCivil: "",
            celular: "",
            edad: "",
            fechaNacimiento: "",
            criterioSintoma: 0,
            sintomas: 0,
            nTriage: "",
            oAtencion: 0,
            ePaciente: 0,
            pAlergia: null,
            aOcular: 0,
            aVerbal: 0,
            aMotora: 0,
            peso: "",
            talla: "",
            fCard: "",
            fResp: "",
            temp: "",
            pulso: "",
            tasi: "",
            tadi: "",
            pulpils: "",
            perimetroAbdominal: "",
            perimetroCefalico: "",
            pNombre: null,
            sNombre: null,
            pApellido: null,
            sApellido: null,
            nivelGlasglow: 0,
            msgClasglow: "",
            colorImc: "",
            colorGs: "",
            colorSc: "",
            msgImc: "",
            msgGp: "",
            msgSc: "",
            arrayCriterio: [],
            arrayRespOcular: [],
            arrayRespVerbal: [],
            arrayRespMotora: [],
            arrayEstadoPacient: [],
            arraySintomas: [],
            arrayTipoIdent: [],
            arrayCausaExterna: [],
            arraylistaTriage: []
        };
    },
    methods: {
        mostrarFormulario() {
            this.listado = 0;
        },
        ocultarFormulario() {
            this.listado = 1;
        },
        cargarCriterio() {
            var me = this;
            axios
                .get("/general/descripciones", {
                    params: {
                        id: this.listaCriterio
                    }
                })
                .then(function(response) {
                    me.arrayCriterio = response.data;
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
        cargarRespuestaOcular() {
            var me = this;
            axios
                .get("/general/descripciones", {
                    params: {
                        id: this.listaRespOcular
                    }
                })
                .then(function(response) {
                    me.arrayRespOcular = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarRespuestaVerbal() {
            var me = this;
            axios
                .get("/general/descripciones", {
                    params: {
                        id: this.listaRespVerbal
                    }
                })
                .then(function(response) {
                    me.arrayRespVerbal = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarRespuestaMotora() {
            var me = this;
            axios
                .get("/general/descripciones", {
                    params: {
                        id: this.listaRespMotora
                    }
                })
                .then(function(response) {
                    me.arrayRespMotora = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarCausasExternas() {
            var me = this;
            axios
                .get("/general/descripciones", {
                    params: {
                        id: this.listaCausaExterna
                    }
                })
                .then(function(response) {
                    me.arrayCausaExterna = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarEstadoPaciente() {
            var me = this;
            axios
                .get("/general/descripciones", {
                    params: {
                        id: this.listaEstadoPaciente
                    }
                })
                .then(function(response) {
                    me.arrayEstadoPacient = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        consultarPaciente() {
            let me = this;
            if (me.accion == 0) {
                if (me.identificacion != "") {
                    axios
                        .get("/pacientePorIdentificacion", {
                            params: {
                                identificacion: me.identificacion
                            }
                        })
                        .then(function(response) {
                            let arrayPaciente = response.data;
                            if (arrayPaciente.length > 0) {
                                me.idPaciente = arrayPaciente[0]["idPaciente"];
                                me.nombre = arrayPaciente[0]["paciente"];
                                me.administradora =
                                    arrayPaciente[0]["nombreEps"];
                                me.genero = arrayPaciente[0]["genero"];
                                me.estadoCivil =
                                    arrayPaciente[0]["estadoCivil"];
                                me.celular = arrayPaciente[0]["celular"];
                                me.fechaNacimiento =
                                    arrayPaciente[0]["fechaNacimiento"];
                                me.edad = arrayPaciente[0]["edad"];
                                me.existePaciente = 1;
                            } else {
                                swal({
                                    title:
                                        "¡Paciente no encontrado!,¿Desea Crear el paciente.?",
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
                                        me.crearPaciente = 1;
                                        me.existePaciente = 1;
                                    } else if (
                                        result.dismiss ===
                                        swal.DismissReason.cancel
                                    ) {
                                    }
                                });
                            }
                            console.log(arrayPaciente);
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            }
        },
        cargarTriage() {
            var me = this;
            axios
                .get("/consultarTriage", {
                    params: {
                        id: this.sintomas
                    }
                })
                .then(function(response) {
                    let arrayTriage = response.data;
                    me.nTriage = arrayTriage[0]["Triage"];
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarSintomas() {
            var me = this;
            axios
                .get("/consultarSintoma", {
                    params: {
                        id: this.criterioSintoma
                    }
                })
                .then(function(response) {
                    me.arraySintomas = response.data;
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
                    this.ocultarFormulario();
                    this.limpiarControles();
                } else if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.cancel
                ) {
                }
            });
        },
        limpiarControles() {
            this.idTriage = 0;
            this.idPaciente = 0;
            this.idTipoIdentificacion = 0;
            this.identificacion = "";
            this.nombre = "";
            this.administradora = "";
            this.genero = "";
            this.estadoCivil = "";
            this.celular = "";
            this.fechaNacimiento = "";
            this.criterioSintoma = 0;
            this.sintomas = 0;
            this.nTriage = "";
            this.oAtencion = 0;
            this.ePaciente = 0;
            this.pAlergia = "";
            this.aOcular = 0;
            this.aVerbal = 0;
            this.aMotora = 0;
            this.edad = "";
            this.identificacion = "";
            this.pIdentificacion = "";
            this.crearPaciente = 0;
            this.existePaciente = 0;
            this.accion = 0;
            this.peso = "";
            this.talla = "";
            this.fCard = "";
            this.fResp = "";
            this.temp = "";
            this.tadi = "";
            this.tasi = "";
            this.pulso = "";
            this.pulpils = "";
            this.perimetroAbdominal = "";
            this.perimetroCefalico = "";
            this.pNombre = "";
            this.sNombre = "";
            this.pApellido = "";
            this.sApellido = "";
            this.nivelGlasglow = 0;
        },
        guardarTriage() {
            let me = this;
            if (this.validarFormulario() == true) {
                axios
                    .post("/triageRegistrar", {
                        idPaciente: me.idPaciente,
                        idTIdenti: me.idTipoIdentificacion,
                        identificacion: me.identificacion,
                        pNombre: me.letraCapital(me.pNombre),
                        sNombre: me.letraCapital(me.sNombre),
                        pApellido: me.letraCapital(me.pApellido),
                        sApellido: me.letraCapital(me.sApellido),
                        idCriterio: me.criterioSintoma,
                        idSintoma: me.sintomas,
                        idCausaExterna: me.oAtencion,
                        idEstadoPaciente: me.ePaciente,
                        alergia: me.pAlergia,
                        idRespOcular: me.aOcular,
                        idRespVerbal: me.aVerbal,
                        idRespMotora: me.aMotora,
                        peso: me.peso,
                        talla: me.talla,
                        frecCard: me.fCard,
                        frecResp: me.fResp,
                        temp: me.temp,
                        pulso: me.pulso,
                        tasi: me.tasi,
                        tadi: me.tadi,
                        pulpils: me.pulpils,
                        perimAbdominal: me.perimetroAbdominal,
                        perimCefalico:  me.perimetroCefalico
                    })
                    .then(function(response) {
                        me.limpiarControles();
                        me.ocultarFormulario();
                        me.listarTriage();
                        me.idTriage = response.data;
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
        actualizarTriage() {
            let me = this;
            axios
                .put("/triageActualizar", {
                    idTriage: me.idTriage,
                    idCriterio: me.criterioSintoma,
                    idSintoma: me.sintomas,
                    idCausaExterna: me.oAtencion,
                    idEstadoPaciente: me.ePaciente,
                    alergia: me.pAlergia,
                    idRespOcular: me.aOcular,
                    idRespVerbal: me.aVerbal,
                    idRespMotora: me.aMotora,
                    peso: me.peso,
                    talla: me.talla,
                    frecCard: me.fCard,
                    frecResp: me.fResp,
                    temp: me.temp,
                    pulso: me.pulso,
                    tasi: me.tasi,
                    tadi: me.tadi,
                    pulpils: me.pulpils,
                    perimAbdominal: me.perimetroAbdominal,
                    perimCefalico:  me.perimetroCefalico
                })
                .then(function(response) {
                    me.limpiarControles();
                    me.ocultarFormulario();
                    me.listarTriage();
                    swal(
                        "Actualizar!",
                        "El registro ha sido actualizado con éxito.",
                        "success"
                    );
                    console.log(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        listarTriage() {
            let me = this;
            axios
                .get("/listarTriage")
                .then(function(response) {
                    me.arraylistaTriage = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        eliminarTriage(id) {
            let me = this;
            swal({
                title: "¿Desea eliminar el registro?",
                type: "warning",
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
                    axios
                        .put("/triageanular", {
                            id: id,
                            idUsuario: me.idUsuario
                        })
                        .then(function() {
                            me.listarTriage();
                            swal(
                                "Eliminar!",
                                "El registro ha sido eliminar con éxito.",
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
        editarTriage(id) {
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
                    this.cargarRegistrosTriage(id);
                    this.accion = 1;
                    this.existePaciente = 1;
                    this.listado = 0;
                } else if (result.dismiss === swal.DismissReason.cancel) {
                }
            });
        },
        calcular() {
            let resultado = 0;
            let respOcular = parseInt(this.aOcular);
            let respVerbal = parseInt(this.aVerbal);
            let respMotora = parseInt(this.aMotora);
            let fActual = new Date();
            let fNacimiento = new Date(this.fechaNacimiento);
            let edad = fActual.getFullYear() - fNacimiento.getFullYear();

            resultado = respOcular + respVerbal + respMotora;

            // Calculo de glasglow
            if (resultado >= 3) {
                if (resultado <= 8) {
                    this.nivelGlasglow = 1; //mal
                } else if (resultado > 8 && resultado <= 13) {
                    this.nivelGlasglow = 2; // moderado
                } else if (resultado > 13 && resultado <= 15) {
                    this.nivelGlasglow = 3; // leve
                } else {
                    this.nivelGlasglow = 0; //no aplica
                }
                this.msgClasglow = resultado;
            }

            // calculo del IMC
            resultado = 0;
            if (this.peso != "" && this.talla != "") {
                resultado = this.peso / this.talla / 2;
                if (resultado <= 15) {
                    this.msgImc = " Delgadez muy severa";
                    this.colorImc = "#E74C3C";
                } else if (resultado >= 15 && resultado <= 15.9) {
                    this.msgImc = " Delgadez severa";
                    this.colorImc = "#E74C3C";
                } else if (resultado >= 16 && resultado <= 18.4) {
                    this.msgImc = " Delgadez";
                    this.colorImc = "#F1C40F";
                } else if (resultado >= 18.5 && resultado <= 24.9) {
                    this.msgImc = " Peso Saludable";
                    this.colorImc = "#58D68D";
                } else if (resultado >= 25 && resultado <= 29.9) {
                    this.msgImc = " Sobrepeso";
                    this.colorImc = "##F1C40F";
                } else if (resultado >= 30 && resultado <= 34.9) {
                    this.msgImc = " Obesidad Moderada";
                    this.colorImc = "#F1C40F";
                } else if (resultado >= 35 && resultado <= 39.9) {
                    this.msgImc = " Obesidad severa";
                    this.colorImc = "#E74C3C";
                } else if (resultado > 40) {
                    this.msgImc = " Obesidad Muy severa (obesidad mórbida)";
                    this.colorImc = "#E74C3C";
                }
            }

            // condiciones del grado de precion
            if (this.tasi != "" && this.tadi != "") {
                if (
                    this.tadi >= 90 &&
                     edad <= 50 &&
                    (this.tasi >= 140 || this.tasi >= 160)
                ) {
                    this.msgGp = "Hipertenso";
                    this.colorGs = "#F1C40F";
                } else if (this.tadi < 60) {
                    this.msgGp = "Hipotenso";
                    this.colorGs = "#F1C40F";
                } else if ((this.tasi >= 140 || this.tasi <= 160) && edad >= 50) {
                    this.msgGp = "Normal";
                    this.colorGs = "#58D68D";
                }
            }

            // consiciones del S.C
            resultado = 0;
            if (this.peso != "") {
                if (this.peso < 20) {
                    resultado = (this.peso * (4 + 7)) / (this.peso + 90);
                } else {
                    resultado = (this.peso * (2 + 40)) / 100;
                }
                this.msgSc = resultado;
            }
        },
        validarFormulario() {
            if (
                this.criterioSintoma == 0 ||
                this.sintomas == 0 ||
                this.oAtencion == 0 ||
                this.ePaciente == 0 ||
                this.aOcular == 0 ||
                this.aVerbal == 0 ||
                this.aMotora == 0 ||
                this.peso == "" ||
                this.talla == "" ||
                this.fCard == "" ||
                this.fResp == "" ||
                this.temp == "" ||
                this.tadi == "" ||
                this.tasi == "" ||
                this.pulso == "" ||
                this.pulpils == "" ||
                this.perimetroAbdominal == "" ||
                this.perimetroCefalico  == "" ||
                (this.idTipoIdentificacion == 0 && this.crearPaciente == 1) ||
                (this.pNombre == 0 && this.crearPaciente == 1) ||
                (this.pApellido == "" && this.crearPaciente == 1) ||
                (this.sApellido == "" && this.crearPaciente == 1)
            ) {
                return false;
            }
            {
                return true;
            }
        },
        letraCapital(cadena) {
            if (cadena != null) {
                return cadena.charAt(0).toUpperCase() + cadena.slice(1);
            }
        },
        cargarRegistrosTriage(id) {
            let me = this;
            axios
                .get("/consultarRegistroTriage", {
                    params: {
                        id: id
                    }
                })
                .then(function(response) {
                    let arrayRegisTriage = response.data;
                    me.nombre = arrayRegisTriage[0]["paciente"];
                    me.identificacion = arrayRegisTriage[0]["identificacion"];
                    me.administradora = arrayRegisTriage[0]["nombreEps"];
                    me.genero = arrayRegisTriage[0]["genero"];
                    me.estadoCivil = arrayRegisTriage[0]["estadoCivil"];
                    me.celular = arrayRegisTriage[0]["celular"];
                    me.fechaNacimiento = arrayRegisTriage[0]["fechaNacimiento"];
                    me.edad = arrayRegisTriage[0]["edad"];
                    me.criterioSintoma = arrayRegisTriage[0]["idCriterio"];
                    me.cargarSintomas();
                    me.sintomas = arrayRegisTriage[0]["idSintoma"];
                    me.cargarTriage();
                    me.oAtencion = arrayRegisTriage[0]["idCausaExterna"];
                    me.ePaciente = arrayRegisTriage[0]["idEstadoPaciente"];
                    me.aOcular = arrayRegisTriage[0]["idRespuestaOcular"];
                    me.aVerbal = arrayRegisTriage[0]["idRespuestaVerbal"];
                    me.aMotora = arrayRegisTriage[0]["idRespuestaMotora"];
                    me.pAlergia = arrayRegisTriage[0]["alergia"];
                    me.peso = arrayRegisTriage[0]["peso"];
                    me.talla = arrayRegisTriage[0]["talla"];
                    me.fCard = arrayRegisTriage[0]["frecueciaCard"];
                    me.fResp = arrayRegisTriage[0]["frecuenciaResp"];
                    me.temp = arrayRegisTriage[0]["temperatura"];
                    me.pulso = arrayRegisTriage[0]["pulso"];
                    me.tasi = arrayRegisTriage[0]["tasi"];
                    me.tadi = arrayRegisTriage[0]["tadi"];
                    me.pulpils = arrayRegisTriage[0]["pulpils"];
                    me.perimetroAbdominal = arrayRegisTriage[0]["perimetroAbdominal"];
                    me.perimetroCefalico = arrayRegisTriage[0]["perimetroCefalico"];
                    me.idTriage = id;
                    me.calcular();
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.listarTriage();
        this.cargarComboTipoIdent();
        this.cargarCausasExternas();
        this.cargarCriterio();
        this.cargarSintomas();
        this.cargarRespuestaOcular();
        this.cargarRespuestaVerbal();
        this.cargarRespuestaMotora();
        this.cargarEstadoPaciente();
    }
};
Vue.directive("focus", {
    inserted: function(el) {
        el.focus();
    }
});

import ModalGeneral from "../../components/ModalBusqueda/ModalGeneral.vue";
export default {
    components: {
        ModalGeneral
    },
    props: {
        idGenero: 0,
        idIngreso: 0
    },
    data() {
        return {
            modalDiagnostico: 0,
            lAntFam: 1021,
            lAntPers: 1022,
            lParentesco: 1023,
            idInternoExamFis: 0,
            motivo: "",
            estadoGen: "",
            enfeActual: "",
            idEstIngreso: 0,
            menarquia: "",
            vidaSexual: "",
            idPlanificar: 0,
            menopausea: "",
            idDesconoceF: 0,
            otroCaso: "",
            idConfiable: 0,
            aspecto: "",
            pielFanela: "",
            craneo: "",
            ojo: "",
            oido: "",
            nariz: "",
            boca: "",
            garganta: "",
            cuello: "",
            toraxPulmon: "",
            corazon: "",
            senos: "",
            abdomen: "",
            genitales: "",
            examenRectal: "",
            Extremidades: "",
            neuroMuscular: "",
            osteoArticular: "",
            neurologia: "",
            dorso: "",
            listaAntParent: [],
            listaAntPers: [],
            listaAntFam: [],
            arrayDigRem: [],
            editable: 0,
            btEditar: 0,
            btGuardar: 0,
            btCancelar: 0,
            arrayDatosDiagnosticos: [],
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
            estado: 0,
            arrayDigRem: [],
            arryDiagIng: [],
            arrayAntFam: [],
            arrayAntPers: [],
            arrayD: []
        };
    },
    methods: {
        deleteRow(index, dato) {
            var idx = this.arryDiagIng.indexOf(dato);
            this.arryDiagIng.splice(idx, 1);
        },
        abrirModalDiagnosticos() {
            this.modalDiagnostico = 1;
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

            this.arryDiagIng.push({
                id: this.arrayDatosDiagnosticos[0]["id"],
                codigo: this.arrayDatosDiagnosticos[0]["codigoCIE"],
                descripcion: this.arrayDatosDiagnosticos[0]["descripcion"]
            });
        },
        datosNoRepetir: function(id) {
            for (var i = 0; i < this.arryDiagIng.length; i++) {
                if (this.arryDiagIng[i].id == id) {
                    return true;
                }
            }
        },
        desHabilitarBotones() {
            this.btEditar = 0;
            this.btGuardar = 0;
            this.btCancelar = 0;
        },
        HabilitarBotones() {
            this.btEditar = 1;
            this.btGuardar = 1;
            this.btCancelar = 1;
        },
        inicio() {
            this.desHabilitarBotones();
            this.btEditar = 1;
            this.editable = 0;
        },
        editar() {
            this.HabilitarBotones();
            this.btEditar = 0;
            this.editable = 1;
        },
        cancelar() {
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
                } else if (result.dismiss === swal.DismissReason.cancel) {
                }
            });
        },
        agregarAntFamiliar() {
            this.arrayAntFam.push({
                id: this.arrayAntFam.length + 1,
                idAntFamiliar: 0,
                idParentesco: 0,
                detalle: ""
            });
        },
        agregarAntPersonal() {
            this.arrayAntPers.push({
                id: this.arrayAntPers.length + 1,
                idAntPersonal: 0,
                detalle: ""
            });
        },
        quitarFila(array) {
            var index = array.indexOf(array);
            array.splice(index, 1);
        },
        cargarAntecedenteFam() {
            let me = this;
            axios
                .get("/general/descripciones", {
                    params: {
                        id: me.lAntFam
                    }
                })
                .then(function(response) {
                    me.listaAntFam = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarAntecedentePerson() {
            let me = this;
            axios
                .get("/general/descripciones", {
                    params: {
                        id: me.lAntPers
                    }
                })
                .then(function(response) {
                    me.listaAntPers = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarParentezco() {
            let me = this;
            axios
                .get("/general/descripciones", {
                    params: {
                        id: me.lParentesco
                    }
                })
                .then(function(response) {
                    me.listaAntParent = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarDianosticoRem() {
            let me = this;
            if (me.arrayDigRem.length == 0) {
                axios
                    .get("/ingreso/diagnosticos", {
                        params: {
                            idIngreso: me.idIngreso
                        }
                    })
                    .then(function(response) {
                        me.arrayDigRem = response.data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        registrarInformacion() {
            let me = this;
            axios
                .post("/historiaClinica/ingresoAdulto/registrar", {
                    idIngreso: me.idIngreso,
                    idGenero: me.idGenero,
                    motivo: me.motivo,
                    estadoGen: me.estadoGen,
                    enfeActual: me.enfeActual,
                    idEstIngreso: me.idEstIngreso,
                    arrayAntFam: JSON.stringify(me.arrayAntFam),
                    arrayAntPers: JSON.stringify(me.arrayAntPers),
                    arryDiagIng: JSON.stringify(me.arryDiagIng),
                    menarquia: me.menarquia,
                    vidaSexual: me.vidaSexual,
                    idPlanificar: me.idPlanificar,
                    menopausea: me.menopausea,
                    idDesconoceF: me.idDesconoceF,
                    otroCaso: me.otroCaso,
                    idConfiable: me.idConfiable,
                    idInternoExamFis: me.idInternoExamFis,
                    aspecto: me.aspecto,
                    pielFanela: me.pielFanela,
                    craneo: me.craneo,
                    ojo: me.ojo,
                    oido: me.oido,
                    nariz: me.nariz,
                    boca: me.boca,
                    garganta: me.garganta,
                    cuello: me.cuello,
                    toraxPulmon: me.toraxPulmon,
                    corazon: me.corazon,
                    senos: me.senos,
                    abdomen: me.abdomen,
                    genitales: me.genitales,
                    examenRectal: me.examenRectal,
                    Extremidades: me.Extremidades,
                    neuroMuscular: me.neuroMuscular,
                    osteoArticular: me.osteoArticular,
                    neurologia: me.neurologia,
                    dorso: me.dorso,
                    origen: "I"
                })
                .then(function(response) {
                    me.inicio();
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
        cargarInformacionIngreso() {
            let me = this;
            axios
                .get("/historiaClinica/ingresoAdulto/cargar", {
                    params: {
                        id: me.idIngreso
                    }
                })
                .then(function(response) {
                    me.arrayD = response.data;
                    me.motivo = me.arrayD[0]["motivoIngreso"];
                    me.estadoGen = me.arrayD[0]["estadoGeneral"];
                    me.enfeActual = me.arrayD[0]["enfermedadActual"];
                    me.idEstIngreso = me.arrayD[0]["idEstadoIngreso"];
                    me.menarquia = me.arrayD[0]["menarquia"];
                    me.vidaSexual = me.arrayD[0]["vidaSexual"];
                    me.idPlanificar = me.arrayD[0]["idPlanifica"];
                    me.menopausea = me.arrayD[0]["menopausea"];
                    me.idDesconoceF = me.arrayD[0]["idDesconFechaFum"];
                    me.otroCaso = me.arrayD[0]["otroCaso"];
                    me.idConfiable = me.arrayD[0]["idConfiable"];
                    me.idInternoExamFis = me.arrayD[0]["idInterno"];
                    me.aspecto = me.arrayD[0]["aspectoGeneral"];
                    me.pielFanela = me.arrayD[0]["pielFaneras"];
                    me.craneo = me.arrayD[0]["craneo"];
                    me.ojo = me.arrayD[0]["ojos"];
                    me.oido = me.arrayD[0]["oidos"];
                    me.nariz = me.arrayD[0]["nariz"];
                    me.boca = me.arrayD[0]["boca"];
                    me.garganta = me.arrayD[0]["garganta"];
                    me.cuello = me.arrayD[0]["cuello"];
                    me.toraxPulmon = me.arrayD[0]["toraxPulmones"];
                    me.corazon = me.arrayD[0]["corazon"];
                    me.senos = me.arrayD[0]["senos"];
                    me.abdomen = me.arrayD[0]["abdomen"];
                    me.genitales = me.arrayD[0]["genitales"];
                    me.examenRectal = me.arrayD[0]["examenRectal"];
                    me.Extremidades = me.arrayD[0]["extremidades"];
                    me.neuroMuscular = me.arrayD[0]["neuromuscular"];
                    me.osteoArticular = me.arrayD[0]["osteoArticular"];
                    me.neurologia = me.arrayD[0]["neurologico"];
                    me.dorso = me.arrayD[0]["dorsoLumbal"];
                    me.cargarInformacionAntFam();
                    me.cargarInformacionAntPers();
                    me.cargarDiagnosticoIngreso();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarInformacionAntFam() {
            let me = this;
            axios
                .get("/historiaClinica/ingresoAdulto/cargar/antFam", {
                    params: {
                        id: me.idIngreso
                    }
                })
                .then(function(response) {
                    me.arrayAntFam = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarInformacionAntPers() {
            let me = this;
            axios
                .get("/historiaClinica/ingresoAdulto/cargar/antPers", {
                    params: {
                        id: me.idIngreso
                    }
                })
                .then(function(response) {
                    me.arrayAntPers = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarDiagnosticoIngreso() {
            let me = this;
            axios
                .get("/historiaClinica/ingresoAdulto/cargar/diagnostico", {
                    params: {
                        id: me.idIngreso
                    }
                })
                .then(function(response) {
                    me.arryDiagIng = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    created() {
        this.cargarAntecedenteFam();
        this.cargarAntecedentePerson();
        this.cargarParentezco();
        this.cargarInformacionIngreso();
        this.inicio();
    }
};

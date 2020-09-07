import moment from "moment";
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
            codigoEvo: "",
            fechaEvo: moment().format("YYYY-MM-DD"),
            horaEvo: moment().format("HH:mm:ss"),
            tituloEvo: "Lista de Evolución",
            arrayDiag: [],
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
            fCard: "",
            fResp: "",
            temp: "",
            pulso: "",
            tasi: "",
            tadi: "",
            pulpils: "",
            perimetroAbdom: "",
            perimetroCefal: "",
            objetiva: "",
            subjetiva: "",
            analisis: "",
            plan: "",
            editable: 0,
            btNuevo: 0,
            btEditar: 0,
            btGuardar: 0,
            btAnular: 0,
            btCancelar: 0,
            modalDiagnostico: 0,
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
            arraylistaEvo: []
        };
    },
    methods: {
        limpiarControles() {
            this.codigoEvo = "";
            this.arrayDiag = [];
            this.aspecto = "";
            this.pielFanela = "";
            this.craneo = "";
            this.ojo = "";
            this.oido = "";
            this.nariz = "";
            this.boca = "";
            this.garganta = "";
            this.cuello = "";
            this.toraxPulmon = "";
            this.corazon = "";
            this.senos = "";
            this.abdomen = "";
            this.genitales = "";
            this.examenRectal = "";
            this.Extremidades = "";
            this.neuroMuscular = "";
            this.osteoArticular = "";
            this.neurologia = "";
            this.dorso = "";
            this.fechaEvo = moment().format("YYYY-MM-DD");
            this.horaEvo = moment().format("HH:mm:ss");
            this.fCard = "";
            this.fResp = "";
            this.temp = "";
            this.pulso = "";
            this.tasi = "";
            this.tadi = "";
            this.pulpils = "";
            this.perimetroAbdom = "";
            this.perimetroCefal = "";
            this.objetiva = "";
            this.subjetiva = "";
            this.analisis = "";
            this.plan = "";
        },
        desHabilitarBotones() {
            this.btNuevo = 0;
            this.btEditar = 0;
            this.btGuardar = 0;
            this.btAnular = 0;
            this.btCancelar = 0;
        },
        inicio() {
            this.desHabilitarBotones();
            this.btNuevo = 1;
        },
        nuevoReg() {
            this.desHabilitarBotones();
            this.limpiarControles();
            this.cargarUltimosDiagEvo();
            this.editable = 1;
            this.btGuardar = 1;
            this.btCancelar = 1;
        },
        editarReg() {
            swal({
                title: "¿Desea editar el registro?",
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
                    this.desHabilitarBotones();
                    this.btGuardar = 1;
                    this.btCancelar = 1;
                    this.editable = 1;
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
                    this.editable = 0;
                } else if (result.dismiss === swal.DismissReason.cancel) {
                }
            });
        },
        deleteRow(index, dato) {
            var idx = this.arrayDiag.indexOf(dato);
            this.arrayDiag.splice(idx, 1);
        },
        abrirModalDiagnosticos: function() {
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
            this.arrayDiag.push({
                id: this.arrayDatosDiagnosticos[0]["id"],
                codigo: this.arrayDatosDiagnosticos[0]["codigoCIE"],
                descripcion: this.arrayDatosDiagnosticos[0]["descripcion"],
                observacion: ""
            });
        },
        datosNoRepetir: function(id) {
            for (var i = 0; i < this.arrayDiag.length; i++) {
                if (this.arrayDiag[i].id == id) {
                    return true;
                }
            }
        },
        validarCampos() {
            if (
                this.objetiva == "" ||
                this.subjetiva == "" ||
                this.analisis == "" ||
                this.plan == ""
            ) {
                return false;
            }
            return true;
        },
        registrarEvolucion() {
            let me = this;
            if (me.validarCampos()) {
                axios
                    .post("/historiaClinica/evolucion/registrar", {
                        codigoEvo: me.codigoEvo,
                        idIngreso: me.idIngreso,
                        fechaEvo: me.fechaEvo,
                        horaEvo: me.horaEvo,
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
                        fCard: me.fCard,
                        fResp: me.fResp,
                        temp: me.temp,
                        pulso: me.pulso,
                        tasi: me.tasi,
                        tadi: me.tadi,
                        pulpils: me.pulpils,
                        perimetroAbdom: me.perimetroAbdom,
                        perimetroCefal: me.perimetroCefal,
                        objetiva: me.objetiva,
                        subjetiva: me.subjetiva,
                        analisis: me.analisis,
                        plan: me.plan,
                        jsonDiagnostico: JSON.stringify(me.arrayDiag)
                    })
                    .then(() => {
                        me.inicio();
                        me.limpiarControles();
                        me.listarEvo();
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
            } else {
                swal(
                    "Siho",
                    "¡Todos los campos marcados son obrigatorio!",
                    "warning"
                );
            }
        },
        listarEvo() {
            let me = this;
            axios
                .get("/evolucion/listar", {
                    params: {
                        idIngreso: me.idIngreso
                    }
                })
                .then(function(response) {
                    me.arraylistaEvo = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarEvolucion() {
            let me = this;
            axios
                .get("/evolucion/cargar", {
                    params: {
                        idEvo: me.codigoEvo
                    }
                })
                .then(res => {
                    let arrayDatos = res.data;
                    let codigo = me.codigoEvo;
                    me.limpiarControles();
                    me.codigoEvo = codigo;
                    me.fechaEvo = moment(arrayDatos[0]["fechaEvo"]).format(
                        "YYYY-MM-DD"
                    );
                    me.horaEvo = arrayDatos[0]["horaEvo"];
                    me.aspecto = arrayDatos[0]["aspectoGeneral"];
                    me.pielFanela = arrayDatos[0]["pielFaneras"];
                    me.craneo = arrayDatos[0]["craneo"];
                    me.ojo = arrayDatos[0]["ojos"];
                    me.oido = arrayDatos[0]["oidos"];
                    me.nariz = arrayDatos[0]["nariz"];
                    me.boca = arrayDatos[0]["boca"];
                    me.garganta = arrayDatos[0]["garganta"];
                    me.cuello = arrayDatos[0]["cuello"];
                    me.toraxPulmon = arrayDatos[0]["toraxPulmones"];
                    me.corazon = arrayDatos[0]["corazon"];
                    me.senos = arrayDatos[0]["senos"];
                    me.abdomen = arrayDatos[0]["abdomen"];
                    me.genitales = arrayDatos[0]["genitales"];
                    me.examenRectal = arrayDatos[0]["examenRectal"];
                    me.Extremidades = arrayDatos[0]["extremidades"];
                    me.neuroMuscular = arrayDatos[0]["neuromuscular"];
                    me.osteoArticular = arrayDatos[0]["osteoArticular"];
                    me.neurologia = arrayDatos[0]["neurologico"];
                    me.dorso = arrayDatos[0]["dorsoLumbal"];
                    me.fCard = arrayDatos[0]["frecueciaCard"];
                    me.fResp = arrayDatos[0]["frecuenciaResp"];
                    me.temp = arrayDatos[0]["temperatura"];
                    me.pulso = arrayDatos[0]["pulso"];
                    me.tasi = arrayDatos[0]["tasi"];
                    me.tadi = arrayDatos[0]["tadi"];
                    me.pulpils = arrayDatos[0]["pulpils"];
                    me.perimetroAbdom = arrayDatos[0]["perimetroAbdominal"];
                    me.perimetroCefal = arrayDatos[0]["perimetroCefalico"];
                    me.objetiva = arrayDatos[0]["objetivo"];
                    me.subjetiva = arrayDatos[0]["subjetivo"];
                    me.analisis = arrayDatos[0]["analisis"];
                    me.plan = arrayDatos[0]["planEvo"];
                    me.cargarEvolucionDiag();
                    me.desHabilitarBotones();
                    me.btNuevo = 1;
                    me.btEditar = 1;
                    me.btAnular = 1;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        cargarUltimosDiagEvo() {
            let me = this;
            axios
                .get("/evolucion/cargarultimosdiag", {
                    params: {
                        idIngreso: me.idIngreso
                    }
                })
                .then(res => {
                    me.arrayDiag = res.data;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        cargarEvolucionDiag() {
            let me = this;
            axios
                .get("/evolucion/cargardiag", {
                    params: {
                        idEvo: me.codigoEvo
                    }
                })
                .then(res => {
                    me.arrayDiag = res.data;
                })
                .catch(err => {
                    console.error(err);
                });
        }
    },
    created() {
        this.inicio();
        this.listarEvo();
    }
};

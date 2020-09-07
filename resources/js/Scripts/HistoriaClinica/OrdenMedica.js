import ModalGeneral from "../../components/ModalBusqueda/ModalGeneral.vue";
import moment from "moment";
import Axios from "axios";

export default {
    components: {
        ModalGeneral
    },
    props: {
        idIngreso: 0
    },
    data() {
        return {
            idOrdenMedica: 0,
            listaOxigeno: 1040,
            listEstancia: 2421,
            listParaclinico: 2424,
            listInterconsulta: 2423,
            medicamentos: false,
            paraclinico: false,
            interconsulta: false,
            estancia: false,
            oxigeno: false,
            descripcionMedicamento: "",
            filter: false,
            arrayFilter: [],
            ocultarFilter: 0,
            listaViaAdmin: [],
            arrayListaOrdenMedica: [],
            arrayEstancia: [],
            arrayMedicamentos: [],
            arrayOxigeno: [],
            arrayParaclinicos: [],
            arrayInterconsulta: [],
            arrayDatos: [],
            listado: 1,
            accion: 0,
            Modal: 0,
            url: "",
            editable: 0,
            tituloOrden: "Listado de Ordenes",
            objTitulo: {},
            arrayCampos: [],
            tituloModal: "",
            fechaOrden: moment().format("YYYY-MM-DD"),
            horaOrden: moment().format("HH:mm:ss"),
            codigoOrden: "",
            indicacionMedica: "",
            btNuevo: 0,
            btEditar: 0,
            btGuardar: 0,
            btAnular: 0,
            btCancelar: 0,
            estadoModal: 1,
            modalEstancia: 1,
            modalOxigeno: 2,
            modalParaclinico: 3,
            modalMedicamento: 4,
            modalInterconsulta: 5,
            modalEstado: 0
        };
    },
    methods: {
        cerrarModal() {
            this.Modal = 0;
        },
        abrirModal(modalEstado) {
            this.limpiarParamsModal();
            this.Modal = this.estadoModal;
            switch (modalEstado) {
                case this.modalEstancia:
                    this.url =
                        "ordenMedica/paraclinicos?id=" + this.listEstancia;
                    this.tituloModal = "Busqueda de Estancia";
                    this.arrayCampos = ["id", "codigo", "descripcion"];
                    this.objTitulo = {
                        Agregar: "Agregar",
                        Id: "Id",
                        Codigo: "Codigo",
                        Descripcion: "Descripcion"
                    };
                    break;
                case this.modalOxigeno:
                    this.url = "/general/descripciones?id=" + this.listaOxigeno;
                    this.tituloModal = "Busqueda de Oxigeno";
                    this.arrayCampos = ["id", "descripcion"];
                    this.objTitulo = {
                        Agregar: "Agregar",
                        Id: "Id",
                        Descripcion: "Descripcion",
                        Modo: "valorAdicional"
                    };

                    break;
                case this.modalParaclinico:
                    this.url =
                        "ordenMedica/paraclinicos?id=" + this.listParaclinico;
                    this.tituloModal = "Busqueda de Paraclinicos";
                    this.arrayCampos = ["id", "codigo", "descripcion"];
                    this.objTitulo = {
                        Agregar: "Agregar",
                        Id: "Id",
                        Codigo: "Codigo",
                        Descripcion: "Descripcion"
                    };
                    break;
                case this.modalMedicamento:
                    this.url = "ordenMedica/medicamentos?id=" + this.idIngreso;
                    this.tituloModal = "Busqueda de Medicamentos";
                    this.arrayCampos = ["id", "descripcion"];
                    this.objTitulo = {
                        Agregar: "Agregar",
                        Id: "Id",
                        Descripcion: "Descripcion"
                    };
                    break;
                case this.modalInterconsulta:
                    this.url =
                        "ordenMedica/paraclinicos?id=" + this.listInterconsulta;
                    this.tituloModal = "Busqueda de Interconsultas";
                    this.arrayCampos = ["id", "codigo", "descripcion"];
                    this.objTitulo = {
                        Agregar: "Agregar",
                        Id: "Id",
                        Codigo: "Codigo",
                        Descripcion: "Descripcion"
                    };
                    break;
            }
            this.modalEstado = modalEstado;
        },
        agregarDatos() {
            switch (this.modalEstado) {
                case this.modalEstancia:
                    this.arrayEstancia.push({
                        id: this.arrayDatos[0]["id"],
                        codigo: this.arrayDatos[0]["codigo"],
                        descripcion: this.arrayDatos[0]["descripcion"],
                        fechaInicio: moment().format("YYYY-MM-DD"),
                        fechaFin: moment().format("YYYY-MM-DD"),
                        observacion: ""
                    });
                    break;
                case this.modalOxigeno:
                    this.arrayOxigeno.push({
                        id: this.arrayDatos[0]["id"],
                        descripcion: this.arrayDatos[0]["Descripcion"],
                        observacion: ""
                    });
                    break;
                case this.modalParaclinico:
                    this.arrayParaclinicos.push({
                        id: this.arrayDatos[0]["id"],
                        codigo: this.arrayDatos[0]["codigo"],
                        descripcion: this.arrayDatos[0]["descripcion"],
                        cantidad: 1,
                        observacion: "",
                        justificacion: ""
                    });
                    break;
                case this.modalMedicamento:
                    this.arrayMedicamentos.push({
                        id: this.arrayDatos[0]["id"],
                        descripcion: this.arrayDatos[0]["descripcion"],
                        dosis: 0,
                        vAdmin: 0,
                        frecuencia: 0,
                        horaInicial: 0,
                        diaTratamiento: 0
                    });
                    this.cargarViaAdmin(this.arrayDatos[0]["id"]);
                    break;
                case this.modalInterconsulta:
                    this.arrayInterconsulta.push({
                        id: this.arrayDatos[0]["id"],
                        codigo: this.arrayDatos[0]["codigo"],
                        descripcion: this.arrayDatos[0]["descripcion"],
                        justificacion: ""
                    });
                    break;
            }
        },
        cargarMedicamentos() {
            let me = this;
            axios
                .get("/ordenMedica/medicamentos/cargar", {
                    params: { id: me.idOrdenMedica }
                })
                .then(res => {
                    me.arrayMedicamentos = res.data;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        cargarParaclinicos() {
            let me = this;
            axios
                .get("/ordenMedica/paraclinico/cargar", {
                    params: { id: me.idOrdenMedica }
                })
                .then(res => {
                    me.arrayParaclinicos = res.data;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        cargarInterconsultas() {
            let me = this;
            axios
                .get("/ordenMedica/interconsulta/cargar", {
                    params: { id: me.idOrdenMedica }
                })
                .then(res => {
                    me.arrayInterconsulta = res.data;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        cargarEstancia() {
            let me = this;
            axios
                .get("/ordenMedica/estacia/cargar", {
                    params: { id: me.idOrdenMedica }
                })
                .then(res => {
                    me.arrayEstancia = res.data;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        cargarOxigenos() {
            let me = this;
            axios
                .get("/ordenMedica/oxigeno/cargar", {
                    params: { id: me.idOrdenMedica }
                })
                .then(res => {
                    me.arrayOxigeno = res.data;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        agregarFilas(index) {
            switch (index) {
                case 0:
                    this.arrayEstancia.push({
                        codigo: "",
                        descripcion: "",
                        fechainicio: moment().format("YYYY-MM-DD"),
                        fechaFin: moment().format("YYYY-MM-DD"),
                        observacion: ""
                    });
                    break;
                case 1:
                    this.arrayOxigeno.push({
                        id: "",
                        descripcion: "",
                        observacion: ""
                    });
                    break;
                case 2:
                    this.arrayParaclinicos.push({
                        codigo: "",
                        descripcion: "",
                        cantidad: 0,
                        justificacion: ""
                    });
                    break;
                case 3:
                    this.arrayMedicamentos.push({
                        id: "",
                        descripcion: "",
                        dosis: 0,
                        vAdmin: 0,
                        frecuencia: 0,
                        horaInicial: 0,
                        diaTratamiento: 0
                    });
                    break;
                case 4:
                    this.arrayInterconsulta.push({
                        codigo: "",
                        descripcion: "",
                        justificacion: ""
                    });
                    break;
            }
        },
        quitarFila(index, array) {
            array.splice(index, 1);
            this.arrayFilter = [];
        },
        limpiarControles() {
            this.arrayEstancia = [];
            this.arrayMedicamentos = [];
            this.arrayOxigeno = [];
            this.arrayParaclinicos = [];
            this.arrayInterconsulta = [];
            this.fechaOrden = moment().format("YYYY-MM-DD");
            this.horaOrden = moment().format("HH:mm:ss");
            this.idOrdenMedica = "";
            this.codigoOrden = "";
            this.indicacionMedica = "";
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
            this.editable = 0;
            this.btNuevo = 1;
        },
        nuevo() {
            this.limpiarControles();
            this.desHabilitarBotones();
            this.editable = 1;
            this.btGuardar = 1;
            this.btCancelar = 1;
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
                    this.limpiarControles();
                    this.editable = 0;
                } else if (result.dismiss === swal.DismissReason.cancel) {
                }
            });
        },
        filtrarRegistro(items, index) {
            this.arrayFilter = [];
            this.medicamentos = false;
            this.estancia = false;
            this.oxigeno = false;
            this.interconsulta = false;
            this.paraclinico = false;
            switch (index) {
                case 0:
                    this.estancia = true;
                    this.arrayFilter = this.arrayEstanciaCargar.filter(item => {
                        return item.descripcion
                            .toLowerCase()
                            .startsWith(
                                items.descripcion.toLowerCase() == ""
                                    ? " "
                                    : items.descripcion.toLowerCase()
                            );
                    });

                    break;
                case 1:
                    this.oxigeno = true;
                    this.arrayFilter = this.arrayOxigenoCargar.filter(item => {
                        return item.Descripcion.toLowerCase().startsWith(
                            items.descripcion.toLowerCase() == ""
                                ? " "
                                : items.descripcion.toLowerCase()
                        );
                    });
                    break;
                case 2:
                    this.paraclinico = true;
                    this.arrayFilter = this.arrayParaclinicosCargar.filter(
                        item => {
                            return item.descripcion
                                .toLowerCase()
                                .startsWith(
                                    items.descripcion.toLowerCase() == ""
                                        ? " "
                                        : items.descripcion.toLowerCase()
                                );
                        }
                    );
                    break;
                case 3:
                    this.medicamentos = true;
                    this.arrayFilter = this.arrayMedicamentosCargar.filter(
                        item => {
                            return item.descripcion
                                .toLowerCase()
                                .startsWith(
                                    items.descripcion.toLowerCase() == ""
                                        ? " "
                                        : items.descripcion.toLowerCase()
                                );
                        }
                    );
                    break;
                case 4:
                    this.interconsulta = true;
                    this.arrayFilter = this.arrayInterconsultaCargar.filter(
                        item => {
                            return item.descripcion
                                .toLowerCase()
                                .startsWith(
                                    items.descripcion.toLowerCase() == ""
                                        ? " "
                                        : items.descripcion.toLowerCase()
                                );
                        }
                    );
                    break;
            }
        },
        obtenerRegistro(item, index) {
            switch (index) {
                case 0:
                    this.arrayEstancia.forEach((e, i) => {
                        if (e.codigo == "") {
                            this.arrayEstancia[i].codigo = item.codigo;
                            this.arrayEstancia[i].descripcion =
                                item.descripcion;
                        }
                    });
                    break;
                case 1:
                    this.arrayOxigeno.forEach((o, i) => {
                        if (o.id == "") {
                            this.arrayOxigeno[i].id = item.id;
                            this.arrayOxigeno[i].descripcion = item.Descripcion;
                        }
                    });
                    break;
                case 2:
                    this.arrayParaclinicos.forEach((p, i) => {
                        if (p.codigo == "") {
                            this.arrayParaclinicos[i].codigo = item.codigo;
                            this.arrayParaclinicos[i].descripcion =
                                item.descripcion;
                        }
                    });
                    break;
                case 3:
                    this.arrayMedicamentos.forEach((m, i) => {
                        if (m.id == "") {
                            this.arrayMedicamentos[i].id = item.id;
                            this.arrayMedicamentos[i].descripcion =
                                item.descripcion;
                        }
                    });
                    break;
                case 4:
                    this.arrayInterconsulta.forEach((inter, i) => {
                        if (inter.codigo == "") {
                            this.arrayInterconsulta[i].codigo = item.codigo;
                            this.arrayInterconsulta[i].descripcion =
                                item.descripcion;
                        }
                    });
                    break;
            }

            this.arrayFilter = [];
        },
        restablecerRegistro(item, index) {
            switch (index) {
                case 1:
                    for (var i = 0; i < this.arrayOxigeno.length; i++) {
                        if (this.arrayOxigeno[i].id == item.id) {
                            this.arrayOxigeno[i].id = "";
                            this.arrayOxigeno[i].descripcion = item.descripcion;
                        }
                    }
                    break;

                case 3:
                    for (var i = 0; i < this.arrayMedicamentos.length; i++) {
                        if (this.arrayMedicamentos[i].id == item.id) {
                            this.arrayMedicamentos[i].id = "";
                            this.arrayMedicamentos[i].descripcion =
                                item.descripcion;
                        }
                    }
                    break;
            }
        },
        validarOrdenMedica() {
            if (this.arrayEstancia.length < 0) {
                swal(
                    "Siho",
                    "¡Por favor agregue la estancia antes de guardar!",
                    "warning"
                );
                return false;
            } else if (this.arrayParaclinicos.length > 0) {
                this.arrayParaclinicos.forEach(item => {
                    if (item.cantidad == 0) {
                        swal(
                            "Siho",
                            "¡Por favor agregue la estancia antes de guardar!",
                            "warning"
                        );
                    }
                    return false;
                });
            } else if (this.arrayMedicamentos.length > 0) {
                this.arrayMedicamentos.forEach(item => {
                    if (item.dosis == 0) {
                        swal(
                            "Siho",
                            "¡Por favor agregue la dosis antes de guardar!",
                            "warning"
                        );
                        return false;
                    } else if (item.frecuencia == 0) {
                        swal(
                            "Siho",
                            "¡Por favor agregue el valor de la frecuencia antes de guardar!",
                            "warning"
                        );
                        return false;
                    } else if (item.horaInicial == 0) {
                        swal(
                            "Siho",
                            "¡Por favor agregue la hora inicial antes de guardar!",
                            "warning"
                        );
                        return false;
                    }
                });
            }
            return true;
        },

        guardarOrdenMedica() {
            if (this.validarOrdenMedica()) {
                let me = this;
                axios
                    .post("/ordenMedica/registrar", {
                        id: me.idOrdenMedica,
                        idIngreso: me.idIngreso,
                        fechaOrden: me.fechaOrden,
                        horaOrden: me.horaOrden,
                        indicacion: me.indicacionMedica,
                        jsonEstancia: JSON.stringify(me.arrayEstancia),
                        jsonOxigeno: JSON.stringify(me.arrayOxigeno),
                        jsonParaclinico: JSON.stringify(me.arrayParaclinicos),
                        jsonMedicamento: JSON.stringify(me.arrayMedicamentos),
                        jsonInterconsulta: JSON.stringify(me.arrayInterconsulta)
                    })
                    .then(() => {
                        me.inicio();
                        me.limpiarControles();
                        this.editable = 0;
                        // me.listarNotas();
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
            }
        },
        listarOrdenMedica() {
            let me = this;
            axios
                .get("/ordenMedica/listar", {
                    params: {
                        idIngreso: me.idIngreso
                    }
                })
                .then(function(response) {
                    me.arrayListaOrdenMedica = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        cargarOrdenMedica() {
            var me = this;
            axios
                .get("/ordenMedica/cargar", {
                    params: { id: me.idOrdenMedica }
                })
                .then(res => {
                    let datos = res.data;
                    me.fechaOrden = datos[0]["fechaOrden"];
                    me.horaOrden = datos[0]["horaOrden"];
                    me.indicacionMedica = datos[0]["indicaciones"];
                    me.codigoOrden = me.idOrdenMedica;
                    me.cargarEstancia();
                    me.cargarOxigenos();
                    me.cargarParaclinicos();
                    me.cargarMedicamentos();
                    me.cargarInterconsultas();
                    me.desHabilitarBotones();
                    me.editable = 0;
                    me.btNuevo = 1;
                    me.btEditar = 1;
                    me.btAnular = 1;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        cargarViaAdmin(idEquivalecia) {
            let me = this;
            axios
                .get("/listarviaadmin", {
                    params: {
                        idEquivalecia: idEquivalecia
                    }
                })
                .then(res => {
                    me.listaViaAdmin = res.data;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        limpiarParamsModal() {
            this.arrayCampos = [];
            this.objTitulo = {};
            this.url = "";
        }
    },

    created() {
        this.inicio();
        this.listarOrdenMedica();
    }
};

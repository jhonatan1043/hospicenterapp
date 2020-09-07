import ModalGeneral from "../../components/ModalBusqueda/ModalGeneral.vue";
import { Money } from "v-money";

export default {
    components: {
        ModalGeneral,
        Money
    },
    data() {
        return {
            listado: 0,
            bdraCrear: 0,
            bdraCrearRel: 0,
            listaManuales: 1020,
            bandera: 0,
            url: "",
            titulo: "",
            tituloModal: "",
            idManual: 0,
            codigo: "",
            lCups: 1,
            lSoat: 2,
            lIss: 3,
            cups: "",
            soat: "",
            iss: "",
            idCups: 0,
            idSoat: 0,
            idIss: 0,
            modal: 0,
            modalCruze: 0,
            modalSevicio: 0,
            codigo: "",
            descripcion: "",
            facturable: 0,
            factor: 0.0,
            uvr: 0,
            equipo: 0,
            visible: 0,
            valorPersonalizado: 0.0,
            seleccion: 0,
            buscarCups: "",
            criterioCups: "descripcion",
            buscarSoat: "",
            criterioSoat: "descripcion",
            buscarIss: "",
            criterioIss: "descripcion",
            buscarServ: "",
            criterioServ: "descripcionCups",
            arrayManual: [],
            arrayCups: [],
            arrayIss: [],
            arraySoat: [],
            arrayServicio: [],
            arrayDatos: [],
            arrayAsignado: [],
            arrayCampos: ["Id","Codigo", "Descripcion"],
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
                Codigo: "Codigo",
                Descripcion: "Descripcion"
            },
            offset: 3
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
        limpiarControlesModal() {
            this.codigo = "";
            this.descripcion = "";
            this.factor = 0;
            this.uvr = 0;
            this.valorPersonalizado = 0;
            this.facturable = 0;
            this.equipo = 0;
            this.visible = 0;
            this.cups = "";
            this.soat = "";
            this.iss = "";
        },
        cambiarPaginaIss(page, buscar, criterio) {
            let me = this;
            me.paginacion.current_page = page;
            me.consultarIss(page, buscar, criterio);
        },
        cambiarPaginaSoat(page, buscar, criterio) {
            let me = this;
            me.paginacion.current_page = page;
            me.consultarSoat(page, buscar, criterio);
        },
        cambiarPaginaCups(page, buscar, criterio) {
            let me = this;
            me.paginacion.current_page = page;
            me.consultarCups(page, buscar, criterio);
        },
        cambiarPaginaServicio(page, buscar, criterio) {
            let me = this;
            me.paginacion.current_page = page;
            me.consultarServicio(page, buscar, criterio);
        },
        ocultarFormulario() {
            this.listado = 0;
        },
        mostrarFormulario() {
            this.listado = 1;
        },
        cargarManulTarifario(id, descripcion) {
            this.idManual = id;
            this.titulo = descripcion;
            this.mostrarFormulario();
        },
        cargarManualesListar() {
            let me = this;
            axios
                .get("/general/descripciones", {
                    params: {
                        id: me.listaManuales
                    }
                })
                .then(function(response) {
                    me.arrayManual = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        agregarDatos() {
          console.log(this.arrayDatos);
            switch (this.bandera) {
                case 1:
                    this.idCups = this.arrayDatos[0]["idCups"];
                    this.cups = this.arrayDatos[0]["descripcion"];
                    break;
                case 2:
                    this.idSoat = this.arrayDatos[0]["idSoat"];
                    this.soat = this.arrayDatos[0]["descripcion"];
                    break;
                case 3:
                    this.idIss = this.arrayDatos[0]["idIss"];
                    this.iss = this.arrayDatos[0]["descripcion"];
                    break;
            }
            this.cerrarModal();
        },
        cerrarModal() {
            this.modal = 0;
            this.modalSevicio = 0;
        },
        abrirModal(tituloM, idLista) {
            this.modal = 1;
            this.tituloModal = tituloM;
            this.idManual = idLista;
        },
        abrirModalCruze() {
            this.modalCruze = 1;
        },
        abrirModalServicio(url, tituloModal, bandera) {
            this.url = url;
            this.tituloModal = tituloModal;
            this.bandera = bandera;
            this.modalSevicio = 1;
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
                    this.modal = 0;
                    this.modalCruze = 0;
                } else if (result.dismiss === swal.DismissReason.cancel) {
                }
            });
        },
        consultarCups(page, buscar, criterio) {
            let me = this;
            axios
                .get("/servicioscups", {
                    params: {
                        page: page,
                        buscar: buscar,
                        criterio: criterio
                    }
                })
                .then(function(response) {
                    var respuesta = response.data;
                    me.arrayCups = respuesta.parametroListar.data;
                    me.paginacion = respuesta.pagination;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        consultarIss(page, buscar, criterio) {
            let me = this;
            axios
                .get("/serviciosiss", {
                    params: {
                        page: page,
                        buscar: buscar,
                        criterio: criterio
                    }
                })
                .then(function(response) {
                    var respuesta = response.data;
                    me.arrayIss = respuesta.parametroListar.data;
                    me.paginacion = respuesta.pagination;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        consultarSoat(page, buscar, criterio) {
            let me = this;
            axios
                .get("/serviciossoat", {
                    params: {
                        page: page,
                        buscar: buscar,
                        criterio: criterio
                    }
                })
                .then(function(response) {
                    var respuesta = response.data;
                    me.arraySoat = respuesta.parametroListar.data;
                    me.paginacion = respuesta.pagination;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        consultarServicio(page, buscar, criterio) {
            let me = this;
            axios
                .get("/servicios", {
                    params: {
                        page: page,
                        buscar: buscar,
                        criterio: criterio
                    }
                })
                .then(function(response) {
                    var respuesta = response.data;
                    me.arrayServicio = respuesta.parametroListar.data;
                    me.paginacion = respuesta.pagination;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        guardarServicios(idManual) {
            let me = this;
            axios
                .post("/servicios/registrar", {
                    codigo: me.codigo,
                    descripcion: me.descripcion,
                    factor: me.factor,
                    uvr: me.uvr,
                    valorPersonalizado: me.valorPersonalizado,
                    facturable: me.facturable,
                    equipo: me.equipo,
                    visible: me.visible,
                    idManual: idManual
                })
                .then(() => {
                    me.limpiarControlesModal();
                    switch (idManual) {
                        case 1:
                            this.consultarCups(1, "", "descripcion");
                            break;
                        case 2:
                            this.consultarSoat(1, "", "descripcion");
                            break;
                        case 3:
                            this.consultarIss(1, "", "descripcion");
                            break;
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        guardarCruzeServicio() {
            let me = this;
            axios
                .post("/servicios/registrar/homologacion", {
                  idManual: me.idManual,
                  idCups  : me.idCups,
                  idSoat  : me.idSoat,
                  idIss   : me.idIss
                })
                .then(() => {
                   me.limpiarControlesModal();
                   me.consultarServicio(1, "", "descripcion");
                })
                .catch(err => {
                    console.error(err);
                });
        }
    },
    created() {
        this.cargarManualesListar();
        this.consultarCups(1, "", "descripcion");
        this.consultarIss(1, "", "descripcion");
        this.consultarSoat(1, "", "descripcion");
        this.consultarServicio(1, "", "descripcion");
    }
};

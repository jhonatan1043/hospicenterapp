import ModalGeneral from "../../components/ModalBusqueda/ModalGeneral.vue";
import { Money } from 'v-money'
import moment from "moment"

export default {
  components: {
    ModalGeneral,
    Money
  },
  data() {
    return {
      listado: 0,
      listaModal: 0,
      accion: 0,
      accionModal: 0,
      modal: 0,
      modalTarifa: 0,
      url: "",
      tituloModal: "",
      lManual: 1020,
      lPrecio: 1035,
      lTipoContrato: 1014,
      lReferencia: 1036,
      bandera: 0,
      idContrato:0,
      idCliente: 0,
      cliente: "",
      idTipoContrato: 0,
      cantidadAfiliado: 0,
      valorContrato: 0,
      idReferencia: 0,
      idManualCups: 0,
      manual: "",
      idListaPrecio: 0,
      listaPrecio: "",
      fechaInicio: '',
      fechaFin: '',
      valorOxigeno: 0,
      idTarifa: 0,
      estado:0,
      arrayDatos: [],
      arrayServicio: [],
      arrayEps: [],
      objTitulo: {
        agregar: "agregar",
        id: "id",
        descripcion: "descripcion"
      },
      arrayCampos: ["id", "descripcion"],
      arrayTipoContrato: [],
      arrayReferencia: [],
      arrayTarifa: [],
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '$ ',
        precision: 2,
        masked: false
      },
      descripcionTarifa: '',
      porcentaje: 0,
      año: '',
      idTarifaModal: 0,
      arrayRegContrato :[],
      arrayAsignado :[],
      editable : 0
    };
  },
  methods: {
    ocultarFormulario() {
      this.listado = 0;
    },
    mostrarFormulario() {
      this.listado = 1;
    },
    ocultarFormularioModal() {
      this.listaModal = 0;
    },
    mostrarFormularioModal() {
      this.listaModal = 1;
    },
    quitarFilasServicio() {
      var idx = this.arrayServicio.indexOf(this.arrayServicio);
      this.arrayServicio.splice(idx, 1);
    },
    quitarFilasEps() {
      var idx = this.arrayEps.indexOf(this.arrayEps);
      this.arrayEps.splice(idx, 1);
    },
    agregarFilasEps(arrayEntrante) {
      this.arrayEps.push({
        id: arrayEntrante[0]["id"],
        descripcion: arrayEntrante[0]["descripcion"]
      });
      console.log(arrayEntrante);
    },
    agregarFilasServicio(arrayEntrante) {
      console.log(arrayEntrante);
      this.arrayServicio.push({
        id: arrayEntrante[0]["id"],
        descripcion: arrayEntrante[0]["descripcion"]
      });
    },
    abrirModal: function (url, tituloModal, bandera) {
      if(this.bandera == 1){
       this.arrayAsignado = this.arrayServicio;
      }else if(this.bandera == 2){
        this.arrayAsignado = this.arrayEps;
      }
      this.url = url;
      this.tituloModal = tituloModal;
      this.bandera = bandera;
      this.modal = 1;
    },
    agregarDatos() {
      if (this.bandera == 1) {
        this.agregarFilasServicio(this.arrayDatos);
      } else if (this.bandera == 2) {
        this.agregarFilasEps(this.arrayDatos);
      } else if (this.bandera == 3) {
        this.idManualCups = this.arrayDatos[0]["id"];
        this.manual = this.arrayDatos[0]["Descripcion"];
        this.cerrarModal();
      } else if (this.bandera == 4) {
        this.idListaPrecio = this.arrayDatos[0]["id"];
        this.listaPrecio = this.arrayDatos[0]["Descripcion"];
        this.cerrarModal();
      } else if (this.bandera == 5) {
        this.idCliente = this.arrayDatos[0]["idCliente"];
        this.cliente = this.arrayDatos[0]["descripcion"];
        this.cerrarModal();
      }
    },
    cerrarModal() {
      this.modal = 0;
    },
    abrirModalTarifa() {
      this.modalTarifa = 1;
    },
    cancelarModalTarifa() {
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
          this.modalTarifa = 0;
          this.limpiarControlesTarifa();
          this.ocultarFormularioModal();
        } else if (result.dismiss === swal.DismissReason.cancel) {
        }
      });
    },
    cargarTipoContratos() {
      let me = this;
      axios
        .get("/general/descripciones", {
          params: {
            id: me.lTipoContrato
          }
        })
        .then(function (response) {
          me.arrayTipoContrato = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    cargarReferencias() {
      let me = this;
      axios
        .get("/general/descripciones", {
          params: {
            id: me.lReferencia
          }
        })
        .then(function (response) {
          me.arrayReferencia = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    cargarTarifas() {
      let me = this;
      axios.get('/tarifas')
        .then(function (response) {
          me.arrayTarifa = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    limpiarControlesTarifa() {
      this.descripcionTarifa = '';
      this.porcentaje = '';
      this.año = ''
      this.accionModal = 0
    },
    limpiarControlesContrato(){
      this.idCliente= 0;
      this.cliente= "";
      this.idTipoContrato= 0;
      this.cantidadAfiliado= 0;
      this.valorContrato= 0;
      this.idReferencia= 0;
      this.idManualCups= 0;
      this.manual= "";
      this.idListaPrecio= 0;
      this.listaPrecio= "";
      this.fechaInicio= '';
      this.fechaFin= '';
      this.valorOxigeno= 0;
      this.idTarifa= 0;
      this.estado=0;
      this.arrayServicio= [];
      this.arrayEps= [];
      this.editable =0;
      this.accion =0;
      this.arrayServicio=[];
      this.arrayEps =[];
    },
    cancelarTarifa() {
      this.limpiarControlesTarifa();
      this.ocultarFormularioModal();
    },
    cancelarContrato(){
      this.limpiarControlesContrato();
      this.ocultarFormulario();
    },
    crearTarifa() {
      let me = this;
      axios.post('/tarifas/registrar', {
        'descripcion': me.descripcionTarifa,
        'porcentaje': me.porcentaje,
        'año': me.año
      })
        .then(function () {
          me.limpiarControlesTarifa();
          me.ocultarFormularioModal();
          me.cargarTarifas();
          swal(
            'Guardado!',
            'El registro ha sido guardado con éxito.',
            'success'
          )
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    actualizarTarifa() {
      let me = this;
      axios.put('/tarifas/actualizar', {
        'id': me.idTarifaModal,
        'descripcion': me.descripcionTarifa,
        'porcentaje': me.porcentaje,
        'año': me.año
      })
        .then(function () {
          me.limpiarControlesTarifa();
          me.ocultarFormularioModal();
          me.cargarTarifas();
          swal(
            'Actualizar!',
            'El registro ha sido actualizado con éxito.',
            'success'
          )
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    editarTarifa(id,descripcion,porcentaje,año){
      swal({
        title: '¿Desea editar el registro?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        reverseButtons: true
        }).then((result) => {
        if (result.value) {
          this.idTarifaModal = id;
          this.descripcionTarifa = descripcion;
          this.porcentaje = porcentaje;
          this.año = año;
          this.accionModal = 1;
          this.listaModal = 1;
        } else if (
           result.dismiss === swal.DismissReason.cancel
       ) {    
       }
       })
    },
    editarContrato(id){
      swal({
        title: '¿Desea editar el registro?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        reverseButtons: true
        }).then((result) => {
        if (result.value) {
        this.cargarContrato(id);
        this.cargarContratoAdministradora(id);
        this.cargarContratoAreaServicio(id);
        this.idContrato = id;
        this.accion = 1; 
        this.editable = 1;
        this.mostrarFormulario();
        } else if (
           result.dismiss === swal.DismissReason.cancel
       ) {    
       }
       })
    },
    cargarContrato(id){
     let me = this;
    axios.get('/contrato/cargarContrato', {
      params: {
        id: id
      }
    })
    .then(function (response) {
      let arrayReg         = response.data;
       me.idCliente        = arrayReg[0]['idCliente'];
       me.cliente          = arrayReg[0]['cliente'];
       me.idTipoContrato   = arrayReg[0]['idTipoContrato'];
       me.cantidadAfiliado = arrayReg[0]['cantidadAfiliacion'];
       me.valorContrato    = arrayReg[0]['valorContrato'];
       me.idReferencia     = arrayReg[0]['idReferencia'];
       me.idManual         = arrayReg[0]['idManual'];
       me.manual           = arrayReg[0]['manual'];
       me.idListaPrecio    = arrayReg[0]['idListaPrecio'];
       me.listaPrecio      = arrayReg[0]['listaPrecio'];
       me.fechaInicio      = arrayReg[0]['fechaInicio'];
       me.fechaFin         = arrayReg[0]['fechaFin'];
       me.valorOxigeno     = arrayReg[0]['valorOxigeno'];
       me.idTarifa         = arrayReg[0]['idTarifa'];
       me.estado           = arrayReg[0]['estado'];
    })
    .catch(function (error) {
      console.log(error);
    })
    },
    cargarContratoAdministradora(id){
     let me = this;
     axios.get('/contrato/cargarContratoAdministradora', {
       params: {
         id: id
       }
     })
     .then(function (response) {
       me.arrayEps = response.data;
     })
     .catch(function (error) {
       console.log(error);
     })     
    },
    cargarContratoAreaServicio(id){
     let me = this;
     axios.get('/contrato/cargarContratoAreaServicio', {
       params: {
         id: id
       }
     })
     .then(function (response) {
       me.arrayServicio = response.data;
     })
     .catch(function (error) {
      console.log(error);
     })
    },
    listarContrato(){
     let me = this;
     axios.get('/contrato/listarContratos')
     .then(function (response) {
       me.arrayRegContrato = response.data;
     })
     .catch(function (error) {
       console.log(error);
     })
    },
    crearContrato(){
      let me = this;
      axios.post('/contrato/registrar', {
         'idCliente' : me.idCliente,
         'idTipoContrato' : me.idTipoContrato,
         'cantidadAfiliado' : me.cantidadAfiliado,
         'valorContrato' : me.valorContrato,
         'idReferencia' : me.idReferencia,
         'idManual' : me.idManualCups,
         'idListaPrecio' : me.idListaPrecio,
         'fechaInicio' : me.fechaInicio,
         'fechaFin' : me.fechaFin,
         'valorOxigeno' : me.valorOxigeno,
         'idTarifa' : me.idTarifa,
         'estado'   : me.estado,
         'jsoAreaServicio' : JSON.stringify(me.arrayServicio),
         'jsoEPS' : JSON.stringify(me.arrayEps)
      })
      .then(function () {
        me.limpiarControlesContrato();
        me.listarContrato();
        me.ocultarFormulario();
        swal(
          'Guardado!',
          'El registro ha sido guardado con éxito.',
          'success'
        )   
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    actualizarContrato(){
      let me = this;
      axios.put('/contrato/actualizar', {
         'idContrato' : me.idContrato,
         'idCliente' : me.idCliente,
         'idTipoContrato' : me.idTipoContrato,
         'cantidadAfiliado' : me.cantidadAfiliado,
         'valorContrato' : me.valorContrato,
         'idReferencia' : me.idReferencia,
         'idManual' : me.idManualCups,
         'idListaPrecio' : me.idListaPrecio,
         'fechaInicio' : me.fechaInicio,
         'fechaFin' : me.fechaFin,
         'valorOxigeno' : me.valorOxigeno,
         'idTarifa' : me.idTarifa,
         'estado'   : me.estado,
         'jsoAreaServicio' : JSON.stringify(me.arrayServicio),
         'jsoEPS' : JSON.stringify(me.arrayEps)
      })
      .then(function () {
        me.limpiarControlesContrato();
        me.listarContrato();
        me.ocultarFormulario();
        swal(
          'Actualizado!',
          'El registro ha sido actualizado con éxito.',
          'success'
        )   
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    fechaActual(){
      let fecha = new Date();
      fecha = fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear();
      return fecha.format('ddMMyyyy');
    }
  },
  created() {
    this.cargarTipoContratos();
    this.cargarReferencias();
    this.cargarTarifas();
    this.listarContrato();
  }
};

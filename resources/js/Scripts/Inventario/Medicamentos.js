import ModalGeneral from "../../components/ModalBusqueda/ModalGeneral.vue";
export default {
    components:{
        ModalGeneral
    },
    computed: {
      isActived:function(){
        return this.paginacion.current_page;
      },
      pageNumber:function(){
        if(!this.paginacion.to){
            return[]
        }
        var from = this.paginacion.current_page - this.offset;
        if(from<1){
          from = 1;
        }
        var to = from + (this.offset * 2 );
        if (to >= this.paginacion.last_page){
          to = this.paginacion.last_page;
        }

        var pageArray = [];
        while(from <= to){
          pageArray.push(from);
          from++;
        }

        return pageArray;
      }
 },
    data(){
        return {
           listado:1,
           accion:0,
           abrirModal:0,
           idEquivalencia:0,
           descripcion:'',
           descripcionATC:'',
           presentacion:0,
           unidad:0,
           categoria:0,
           clasificacion:0,
           grupoFarmaco:0,
           idParametroUnidad:1027,
           concentracion:0,
           idParametroCategoria:1028,
           idParametroPresentacion:1029,
           idParametroClasificacion:1032,
           idParametroGrupoFarmaco:1033,
           idParametroViaAdministracion:1034,
           codigoATC:'',
           concentracionATC:'',
           noPOS:0,
           puedeSerDisolvente:0,
           seleAplicaDisolvente:0,
           puedeSerMezcla:0,
           solicitadoEnfermeria:0,
           solicitadoFisioterapeuta:0,
           arrayViaAdministracion:[],
           arrayUnidad:[],
           arrayCategoria:[],
           arrayMedicamentos:[],
           arrayPresentacion:[],
           arrayGrupoFarmaco:[],
           arrayProductos:[],
           arrayClasificacion:[],
           arrayDatos:[],
           nombreCampo:'id',
           campoBuscar:'',
           offset: 3,
           paramUnidad:0,
           paramCategoria:0,
           paramPresentacion:0,
           errorControles:0,
           errorAdministracion:0,
           msg:'',
           paginacion:{
            'total'        :0,
            'current_page' :0,
            'per_page'     :0,
            'last_page'    :0,
            'from'         :0,
            'to'           :0,
           },
           arrayCampos: [       
            'id',
            'descripcion'          
            ],
           objTitulo:{
            Agregar: 'Agregar',
            Id: 'Id',
            Descripcion:'Descripcion',
         }
        }
    },
    methods:{
       validarControles(){
        this.errorControles =0;
        this.errorAdministracion=0;
         if(this.unidad==0 || this.presentacion==0 || this.categoria==0
            || this.clasificacion==0 || this.grupoFarmaco==0 || this.consentracion==0
            || this.descripcion=='' || this.descripcionATC=='' || this.codigoATC==''){
              return this.errorControles = 1;
         }
            if(this.arrayViaAdministracion.length==0){
                this.msg="Por favor debe seleccionar una via de administracion";
               return this.errorAdministracion = 1;
            }
       },
       cambiarPagina(page,buscar,criterio){
        let me = this;
         me.paginacion.current_page =page;
         me.listarMedicamentosEinsumos(page,buscar,criterio);
       },
       mostrarModal(){
         this.abrirModal=1;
       },
       cerrarModal(){
         this.abrirModal=0;
       },
       mostrarFormulario(){
         this.listado=0;
       },
       productosAsociados(id){
         let me = this;
        axios.get('medicamentos/productosAsociados', {
          params: {
            idEquivalencia:id
          }
        })
        .then(function (response) {
          me.arrayProductos = response.data;
          me.listado = 2;
        })
        .catch(function (error) {
          console.log(error);
        })
       },
       cancelarRegistro(){
        let me = this;
       swal({
         title: '¿Desea cancelar el registro?',
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
           me.msg='';
           me.opciones();
           me.listarMedicamentosEinsumos();
           me.limpiarControles();                
         } else if (
           // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
        ) {    
        }
        })
     },
       guardar(){
         if(this.validarControles()){
            return swal(  
                'Siho',
                '¡Todos los campos marcados son obrigatorio!',
                'warning'
        );
         }
         let me = this;
         axios.post('medicamentos/guardar', {
             
                 'idEquivalencia':me.idEquivalencia,
                 'descripcion':me.descripcion,
                 'concentracion':me.concentracion,
                 'clasificacion':me.clasificacion,
                 'unidad':me.unidad,
                 'categoria':me.categoria,
                 'grupoFarmaco':me.grupoFarmaco,
                 'presentacion':me.presentacion,
                 'codigoATC':me.codigoATC,
                 'descripcionATC':me.descripcionATC,
                 'noPos':me.noPOS,
                 'solicitadoEnfermeria':me.solicitadoEnfermeria,
                 'solicitadoFisioterapeuta':me.solicitadoFisioterapeuta,
                 'json':JSON.stringify(me.arrayViaAdministracion)
             
         })
         .then(function (response) { 
            me.limpiarControles();
            me.opciones();
            me.listarMedicamentosEinsumos();
           
            if(me.idEquivalencia ==0){
              swal(
                'Guardado!',
                'El registro ha sido guardado con éxito.',
                'success'
                 )
             }else{
              swal(
                'Actualizar!',
                'El registro ha sido actualizado con éxito.',
                'success'
                 )
             }
             me.idEquivalencia = 0;          
         })
         .catch(function (error) {
            console.error(error);
         })
       }, 
       cargarDetalle(id){
         let me=this;
         axios.get('medicamentos/cargarDetalle', {
           params: {
             idMedicamentos:id
           }
         })
         .then(function (response) {
            me.arrayViaAdministracion = response.data;
            
         })
         .catch(function (error) {
           console.log(error);
         })
       },
       cargar(id){
       
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
           let me=this;
           
           axios.get('/medicamentos/cargar',{
           params:{
             idMedicamentos : id
           }
           })
           .then(function (response) {
             let arrayDatos=[];   
             arrayDatos= response.data;            
             
             me.idEquivalencia = arrayDatos[0]['idEquivalencia'],
             me.cargarDetalle(me.idEquivalencia);            
             me.codigoATC = arrayDatos[0]['codigoATC'],          
             me.descripcion = arrayDatos[0]['descripcion'],            
             me.concentracion = arrayDatos[0]['concentracion'],
             me.descripcionATC = arrayDatos[0]['descripcionATC'],  
             me.cargarUnidad();          
             me.unidad = arrayDatos[0]['idUnidadMedida'],
             me.cargarPresentacion();
             me.presentacion = arrayDatos[0]['idPresentacion'],
             me.cargarGrupoFarmaceutico();
             me.grupoFarmaco= arrayDatos[0]['idGrupoFarmaco'],
             me.cargarCategoria();
             me.categoria = arrayDatos[0]['idCategoria'],
             me.cargarClasificacion();
             me.clasificacion = arrayDatos[0]['idClasificacion'],            
             me.noPOS =  arrayDatos[0]['noPos'], 
             me.solicitadoEnfermeria =  arrayDatos[0]['aplicaEnfermeria'], 
             me.solicitadoFisioterapeuta = arrayDatos[0]['aplicaFisioterapia']
             
             me.listado =0;
             me.accion=1;
           })
           .catch(function (error) {
             console.log(error);
           })
  
          } else if (
             // Read more about handling dismissals
              result.dismiss === swal.DismissReason.cancel
          ) {    
          }
          })
         },
       listarMedicamentosEinsumos(page,nombreCampo,campoBuscar){
        let me = this;
        
        axios.get('/medicamentos/listar', {
         params:{
           page:page,
           nombreCampo: nombreCampo=="" ?"id" : nombreCampo,
           campoBuscar: campoBuscar
         }
        })
        .then(function (response) {
          var respuesta = response.data;
           me.arrayMedicamentos = respuesta.medicamentosListar.data;
           me.paginacion = respuesta.pagination;
        })
        .catch(function (error) {
         throw error;
        })
       },
       agregarViaAdministracion(){
          this.arrayViaAdministracion.push({
              id: this.arrayDatos[0]['id'],
              Descripcion: this.arrayDatos[0]['Descripcion']
          });
         
       },
       anularMedicamento(id){
        swal({
           title: '¿Desea Anular el registro?',
           type:  'error',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Aceptar!',
           cancelButtonText: 'Cancelar',
           confirmButtonClass: 'btn btn-success',
           cancelButtonClass: 'btn btn-danger',
           buttonsStyling: false,
           reverseButtons: true
           }).then((result) => {
           if (result.value) {
            let me=this;
            axios.put('medicamentos/anular', {
             idMedicamentos : id
            })
            .then(function (response) {
             me.listarMedicamentosEinsumos();
             swal(
                 'Anular!',
                 'El registro ha sido anulado con éxito.',
                 'success'
                 )
            })
            .catch(function (error) {
              console.log(error)
            })
             } else if (
              // Read more about handling dismissals
               result.dismiss === swal.DismissReason.cancel
           ) {    
           }
           })
          },
       opciones(){
         this.listado=1;
         this.accion=0;
       },
       limpiarControles(){
          
          this.descripcion = '';
          this.concentracion=0;
          this.clasificacion=0;
          this.unidad=0;
          this.categoria=0;
          this.grupoFarmaco=0;
          this.presentacion=0;
          this.codigoATC='';
          this.descripcionATC='';
          this.noPOS=0;
          this.solicitadoEnfermeria=0;
          this.solicitadoFisioterapeuta=0;
          this.arrayViaAdministracion=[]
       },
       cargarUnidad(){
           let me = this;
         axios.get('general/descripciones', {
             params: {
                 id:me.idParametroUnidad
             }
         })
         .then(function (response) {
            me.arrayUnidad = response.data;
         })
         .catch(function (error) {
            console.error(error);
         })
       },
       cargarCategoria(){
        let me = this;
         axios.get('general/descripciones', {
             params: {
                 id:me.idParametroCategoria
             }
         })
         .then(function (response) {
           me.arrayCategoria = response.data;
         })
         .catch(function (error) {
            console.error(error);
         })
       },
       cargarPresentacion(){
        let me = this;
          axios.get('general/descripciones', {
              params: {
                  id:me.idParametroPresentacion
              }
          })
          .then(function (response) {
             me.arrayPresentacion = response.data;
          })
          .catch(function (error) {
            console.error(error);
          }) 
       },
       cargarClasificacion(){
        let me = this;
          axios.get('general/descripciones', {
              params: {
                  id:me.idParametroClasificacion
              }
          })
          .then(function (response) {
             me.arrayClasificacion = response.data;
          })
          .catch(function (error) {
            console.error(error);
          }) 
       },
       deleteRow(index, dato) {
        var idx = this.arrayViaAdministracion.indexOf(dato);
        this.arrayViaAdministracion.splice(idx, 1);
       },
       cargarGrupoFarmaceutico(){
        let me = this;
          axios.get('general/descripciones', {
              params: {
                  id:me.idParametroGrupoFarmaco
              }
          })
          .then(function (response) {
             me.arrayGrupoFarmaco = response.data;
          })
          .catch(function (error) {
            console.error(error);
          }) 
       }
    },
    created(){
      this.listarMedicamentosEinsumos();
      this.cargarCategoria();
      this.cargarClasificacion();
      this.cargarGrupoFarmaceutico();
      this.cargarPresentacion();
      this.cargarUnidad();
    },
    
};
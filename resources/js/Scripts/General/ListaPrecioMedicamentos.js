import { Money } from 'v-money'
export default {
    component:{
        Money
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
        return{
          listado: 1,
          accion:0,
          descripcion:'',
          nombreCampo:'descripcion',
          nombreCampoListar:'descripcion',
          campoBuscarListar:'',
          campoBuscar:'',  
          offset: 3,
          idListaPrecio:0,
          paginacion:{
            'total'        :0,
            'current_page' :0,
            'per_page'     :0,
            'last_page'    :0,
            'from'         :0,
            'to'           :0,
           },
          arrayMedicamentos:[],
          arrayListar:[],
          money: {
            decimal: ',',
            thousands: '.',
            prefix: '$ ',
            precision: 0,
            masked: false
          },
        }
    },
   
    methods:{
        cargarMedicamentos(page,nombreCampo,campoBuscar){
            let me = this;
            axios.get('listaPrecioMedicamentos/medicamentosCargar', {
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
                console.log(error);
            })
        },
        mostrarFormulario(){
          this.listado=0;
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
             me.listarPrecioMedicamentos();                
             me.limpiarControles();                
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
           
           axios.get('listaPrecioMedicamentos/cargar',{
           params:{
             idListaPrecio : id
           }
           })
           .then(function (response) {
             let arrayDatos=[];   
             arrayDatos= response.data;                     
             me.descripcion = arrayDatos[0]['descripcion'];
             me.idListaPrecio = id;
             me.cargarDetalle(id);  
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
         cargarDetalle(id){
           let me = this;
           axios.get('listaPrecioMedicamentos/cargarDetalle', {
             params: {
               idListaPrecio:id
             }
           })
           .then(function (response) {
             me.arrayMedicamentos=[];          
             me.arrayMedicamentos = response.data;
           })
           .catch(function (error) {
             console.log(error);
           })
         },
        listarPrecioMedicamentos(page,nombreCampo,campoBuscar){
          let me = this;
            axios.get('listaPrecioMedicamentos/listar', {
                params:{
                    page:page,
                    nombreCampo: nombreCampo=="" ?"id" : nombreCampo,
                    campoBuscar: campoBuscar
                  }
            })
            .then(function (response) {
                var respuesta = response.data;
                me.arrayListar = respuesta.listaMedicamentosListar.data;
                me.paginacion = respuesta.pagination;
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        limpiarControles(){
          this.descripcion = '',
          this.idListaPrecio = 0,
          this.campoBuscar ='',
          this.campoBuscarListar=''
          for(var i = 0;i < this.arrayMedicamentos.length; i++){
             this.arrayMedicamentos[i]['precio'] = 0;
             this.arrayMedicamentos[i]['noAplica'] = 0;
          }
        },
        validarControles(){
          if(this.descripcion==''){
            return true;
          }
        },
        anularLista(id){
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
              axios.put('listaPrecioMedicamentos/anular', {
               idListaPrecio : id
              })
              .then(function (response) {
               me.listarPrecioMedicamentos();
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
        guardar(){ 
          if(this.validarControles()){
            return swal(  
                'Siho',
                '¡Todos los campos marcados son obrigatorio!',
                'warning'
        );
         }
          let me = this;
          console.log(me.idListaPrecio);
          axios.post('listaPrecioMedicamentos/guardar', {

            'idListaPrecio': me.idListaPrecio,
            'descripcion': me.descripcion,
            'json': JSON.stringify(me.arrayMedicamentos)
          }) 
          .then(function (response) {
            me.opciones();
            me.listarPrecioMedicamentos();
            if(me.idListaPrecio ==0){
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
            me.limpiarControles(); 
          })
          .catch(function (error) {
            console.log(error);
          })
        },
        cambiarPagina(page,buscar,criterio){
            let me = this;
             me.paginacion.current_page =page;
             me.cargarMedicamentos(page,buscar,criterio);
           },
           cambiarPaginaListar(page,buscar,criterio){
            let me = this;
             me.paginacion.current_page =page;
             me.listarPrecioMedicamentos(page,buscar,criterio);
           }
    },
    created(){
        this.listarPrecioMedicamentos();
        this.cargarMedicamentos();      
    }
}
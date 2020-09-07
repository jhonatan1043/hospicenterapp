export default {
    data(){
        return{
            accion:0,
            listado: 0,
            idParametro : 0,
            idDescripcion: 0,
            titulo:'',
            descripcion:'',
            descrParametro:'',
            vExtra:'',
            arrayParam:[],
            arrayDescr:[],
            paginacion:{
                 'total'        :0,
                 'current_page' :0,
                 'per_page'     :0,
                 'last_page'    :0,
                 'from'         :0,
                 'to'           :0,
            },
            offset: 3,
            criterio :'descripcion',
            buscar :'',
            criterioDescr :'descripcion',
            buscarDescr :'',
            editable: 0
        }
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
    methods: {
        parametrosListar(page,buscar,criterio){
        let me = this;
           axios.get('/Parametros', {
            params: {
              page:page,
              buscar:buscar,
              criterio:criterio,
            }
          })
           .then(function (response) {
            var respuesta = response.data;
               me.arrayParam = respuesta.parametroListar.data;
               me.paginacion = respuesta.pagination;
           })
           .catch(function (error) {
               console.log(error);
           })
        },
        cambiarPagina(page,buscar,criterio){
         let me = this;
          me.paginacion.current_page =page;
          me.parametrosListar(page,buscar,criterio);
        },
        descripcionListar(page,buscar,criterio){
        let me = this;
           axios.get('/general/descripciones/pag',{
               params:{
                   id :       me.idParametro,
                   page:      page,
                   buscar:    buscar,
                   criterio:  criterio,
               }     
           })
           .then(function (response) {
               var respuesta = response.data;
               me.arrayDescr = respuesta.parametroListar.data;
               me.paginacion = respuesta.pagination;
           })
           .catch(function (error) {
               console.log(error);
           })
        },
        cambiarPaginaDescr(page,buscar,criterio){
          let me = this;
           me.paginacion.current_page =page;
           me.descripcionListar(page,buscar,criterio);
         },
         crearParametro(){
         let me = this;
         axios.post('/parametro/registrar', {
             'descripcion'   : me.descrParametro,
         })
         .then(function (response) {
           me.limpiarControles();
           me.parametrosListar(1,'','descripcion');
           me.ocultarFormulario();
           swal(
                'Guardado!',
                'El registro ha sido guardado con éxito.',
                'success'
            )
         }).catch(function (error) {
           console.log(error)
        })
        },
        actualizarParametro(){
         let me =  this;
         axios.put('/parametro/actualizar', {
          'id'             : me.idParametro,
          'descripcion'    : me.descrParametro,
        })
        .then(function (response) {
          me.limpiarControles();
          me.parametrosListar(1,'','descripcion');
          me.ocultarFormulario();
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
         crearDescripcion(){
         let me = this;
         me.editable = 1;
         axios.post('/descripcionGeneral/registrar', {
             'id'            : me.idParametro,
             'descripcion'   : me.descripcion,
             'valorAdicional': me.vExtra
         })
         .then(function (response) {
           me.limpiarControles();
           me.editable = 0;
          // me.descripcionListar(1,'','descripcion');
          // me.listado = 1;
           swal(
                'Guardado!',
                'El registro ha sido guardado con éxito.',
                'success'
            )
         }).catch(function (error) {
           console.log(error)
        })
        },
        actualizarDescripcion(){
         let me =  this;
         axios.put('/descripcionGeneral/actualizar', {
          'id'             : me.idDescripcion,
          'idParametro'    : me.idParametro,
          'descripcion'    : me.descripcion,
          'valorAdicional' : me.vExtra
        })
        .then(function (response) {
          me.limpiarControles();
         // me.descripcionListar(1,'','descripcion');
          //me.listado = 1;
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
        ocultarFormulario(){
        this.listado = 0;
        },
        mostrarFormularioParam(){
        this.listado = 2;
        },
        mostrarFormularioDescr(){
        this.listado = 3;
        },
        mostrarDescripcionListar(id,titulo){
        this.titulo = titulo;
        this.idParametro = id;
        this.listado = 1;
        this.descripcionListar(1,'','descripcion');
        },
        limpiarControles(){
            this.idDescripcion = 0;
            //this.titulo        ='';
            this.descripcion   ='';
            this.arrayDescr    =[];
            this.accion        = 0;
            this.vExtra        ='';
        },
        cancelar(){
         this.limpiarControles()
         this.ocultarFormulario();
        },
        editar(id,descripcion,vExtra){
            this.idDescripcion = id;
            this.descripcion = descripcion;
            this.vExtra = vExtra;
            this.accion = 1;
            this.mostrarFormularioDescr();
        },
        editarParametro(id, descripcion){
            this.idParametro = id;
            this.descrParametro = descripcion;
            this.accion = 1;
            this.mostrarFormularioParam();
        },
        anularDescripcion(id){
            let me =  this;
            axios.put('/descripcionGeneral/anular',{
                'id' : id
            })
           .then(function (response) {
             me.descripcionListar(1,'','descripcion');
             swal(
                  'Anular!',
                  'El registro ha sido anulado con éxito.',
                  'success'
              )
           })
           .catch(function (error) {
             console.log(error);
           })
        }
    },
    mounted() {
        this.parametrosListar(1,'','descripcion');
    },
}
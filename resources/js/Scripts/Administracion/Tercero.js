export default {
    data(){
        return{
            listado : 1,
            idTercero :0,
            idTdentificacion: 0,
            identificacion : '',
            dv: '',
            idTpersona : 0,
            idRut:0,
            pNombre:'',
            sNombre:'',
            pApellido:'',
            sApellido:'',
            fechaNacimiento:'',
            nComencial:'',
            razonSocial:'',
            idDocumento:'',
            direccion:'',
            telefono :'',
            celular :'',
            idDepartamento:0,
            idMunicipio:0,
            idGenero:0,
            email:'',
            listaRegimen: 1015,
            listaGenero: 3,
            accion:0,
            representante:'',
            arrayTipoIdent:[],
            arrayTipoPersona:[],
            arrayDepartamento:[],
            arrayMunicipio:[],
            arrayGenero:[],
            arrayTercero:[],
            arrayPerfil:[],
            arrayRut:[]
        }
    },
    methods :{
        cargarComboTipoIdent() {
          var me = this;
           axios.get("/tipoIdentificacion")
          .then(function(response) {
            me.arrayTipoIdent = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
        },
        cargarComboTipoPersona() {
          var me = this;
           axios.get("/general/descripciones",{
             params:{
              id: me.listaRegimen
             }
           })
          .then(function(response) {
            me.arrayTipoPersona = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
        },
        calcularDigitoVerificacion(documento){
        var vpri,x, y,z;
  
        // Se limpia el Nit
        documento = documento.replace ( /\s/g, "" ) ; // Espacios
        documento = documento.replace ( /,/g,  "" ) ; // Comas
        documento = documento.replace ( /\./g, "" ) ; // Puntos
        documento = documento.replace ( /-/g,  "" ) ; // Guiones
  
        // Se valida el nit
        if  ( isNaN ( documento ) )  {
           console.log ("El nit/cédula '" + documento + "' no es válido(a).") ;
            return "" ;
        };
  
        // Procedimiento
        vpri = new Array(16) ; 
        z = documento.length ;

        vpri[1]  =  3 ;
        vpri[2]  =  7 ;
        vpri[3]  = 13 ; 
        vpri[4]  = 17 ;
        vpri[5]  = 19 ;
        vpri[6]  = 23 ;
        vpri[7]  = 29 ;
        vpri[8]  = 37 ;
        vpri[9]  = 41 ;
        vpri[10] = 43 ;
        vpri[11] = 47 ;  
        vpri[12] = 53 ;  
        vpri[13] = 59 ; 
        vpri[14] = 67 ; 
        vpri[15] = 71 ;

        x = 0 ;
        y = 0 ;
      for  ( var i = 0; i < z; i++ )  { 
        y = ( documento.substr (i, 1 ) ) ;
        // console.log ( y + "x" + vpri[z-i] + ":" ) ;
        x += ( y * vpri [z-i] ) ;
        // console.log ( x ) ;    
        }
        y = x % 11 ;
       // console.log ( y ) ;
         this.dv = ( y > 1 ) ? 11 - y : y ;
    },
      cargarComboDepartamento() {
        var me = this;
        axios
          .get("/comboDepartamento", {
            params: {
              idPais: 1
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
      cargarTerceroListar(){
        let me = this;
        axios.get('/tercero/terceroListar')
        .then(function (response) {
          me.arrayTercero = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
      },
      ocultarFormulario(){
          this.listado = 1;
      },
      mostrarFormulario(){
          this.listado = 0;
      },
      agregarFilas(){
        this.arrayRut.push({
               id:'',
          respons:'',
           actEco:'',
           fecAct:'',
           fecRut:''
        });
        console.log(this.arrayRut);
     },
     deleteRow(index, arrayRut) {
      var idx = this.arrayRut.indexOf(arrayRut);     
          this.arrayRut.splice(idx, 1);
          console.log(this.arrayRut);    
    },
     guardarTercero(){
       let me = this;
       let jsonRut   = JSON.stringify(me.arrayRut);
       axios.post('/tercero/terceroCrear', {
        'idTdentificacion': me.idTdentificacion,
        'identificacion'  : me.identificacion,
        'dv'              : me.dv,
        'idRut'           : me.idRut,
        'idTpersona'      : me.idTpersona,
        'pNombre'         : me.letraCapital(me.pNombre),
        'sNombre'         : me.letraCapital(me.sNombre),
        'pApellido'       : me.letraCapital(me.pApellido),
        'sApellido'       : me.letraCapital(me.sApellido),
        'fechaNacimiento' : me.fechaNacimiento,
        'idGenero'        : me.idGenero,
        'razonSocial'     : me.letraCapital(me.razonSocial),
        'nComencial'      : me.letraCapital(me.nComencial),
        'representante'   : me.representante,
        'direccion'       : me.direccion,
        'telefono'        : me.telefono,
        'celular'         : me.celular,
        'email'           : me.email,
        'idDepartamento'  : me.idDepartamento,
        'idMunicipio'     : me.idMunicipio,
        'jsonRut'         : jsonRut
       })
       .then(function () {
        me.limpiarControles();  
        me.cargarTerceroListar();
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
     actualizarTercero(){
      let me = this;
      let jsonRut   = JSON.stringify(me.arrayRut);
      axios.put('/tercero/terceroActualizar', {
       'id'               : me.idTercero,
       'idTdentificacion': me.idTdentificacion,
       'identificacion'  : me.identificacion,
       'dv'              : me.dv,
       'idRut'           : me.idRut,
       'idTpersona'      : me.idTpersona,
       'pNombre'         : me.letraCapital(me.pNombre),
       'sNombre'         : me.letraCapital(me.sNombre),
       'pApellido'       : me.letraCapital(me.pApellido),
       'sApellido'       : me.letraCapital(me.sApellido),
       'fechaNacimiento' : me.fechaNacimiento,
       'idGenero'        : me.idGenero,
       'razonSocial'     : me.letraCapital(me.razonSocial),
       'nComencial'      : me.letraCapital(me.nComencial),
       'representante'   : me.representante,
       'direccion'       : me.direccion,
       'telefono'        : me.telefono,
       'celular'         : me.celular,
       'email'           : me.email,
       'idDepartamento'  : me.idDepartamento,
       'idMunicipio'     : me.idMunicipio,
       'jsonRut'         : jsonRut
      }).then(function () {  
       me.limpiarControles();
       me.cargarTerceroListar();
       me.ocultarFormulario();
       swal(
            '¡Actualizar!',
            'El registro ha sido Actualizado con éxito.',
            'success'
           )
      })
      .catch(function (error) {
        console.log(error);
      })
     },
     cargarRegistrotercero(id){
        let me = this;
        me.idTercero = id;
        axios.get('/tercero/registroTerceroCargar', {
          params: {
            id: me.idTercero
          }
        })
        .then(function (response) {
          let arrayRegTercero = response.data;
          me.accion = 1;
          me.idTdentificacion = arrayRegTercero[0]['idTipoIdentificacion'];
          me.identificacion = arrayRegTercero[0]['Identificacion'];
          me.dv = arrayRegTercero[0]['dv'];
          me.idTpersona = arrayRegTercero[0]['idTipoPersona'];
          me.idRut = arrayRegTercero[0]['rut'];
          me.pNombre =arrayRegTercero[0]['primerNombre'];
          me.sNombre =arrayRegTercero[0]['segundoNombre'];
          me.pApellido =arrayRegTercero[0]['primerApellido'];
          me.sApellido = arrayRegTercero[0]['segundoApellido'];
          me.fechaNacimiento = arrayRegTercero[0]['fechaNacimiento'];
          me.nComencial = arrayRegTercero[0]['nombreComercial'];
          me.razonSocial = arrayRegTercero[0]['razonSocial'];
          me.representante = arrayRegTercero[0]['representante'];
          me.direccion = arrayRegTercero[0]['direccion'];
          me.telefono = arrayRegTercero[0]['telefono'];
          me.celular = arrayRegTercero[0]['celular'];
          me.idDepartamento = arrayRegTercero[0]['idDepartamento'];
          me.cargarComboMunicipio()
          me.idMunicipio = arrayRegTercero[0]['idMunicipio'];
          me.idGenero = arrayRegTercero[0]['idGenero'];
          me.email = arrayRegTercero[0]['email'];
          me.cargarRegistroRut();
          me.mostrarFormulario();
        })
        .catch(function (error) {
          console.log(error);
        })
     },
     cargarRegistroRut(){
      let me = this;
      axios.get('/tercero/registroTerceroRut', {
        params: {
          id:me.idTercero
        }
      })
      .then(function (response) {
       me.arrayRut =  response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
     },
     cancelarRegistro(){
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
             this.limpiarControles();
             this.ocultarFormulario();
        } else if (
           result.dismiss === swal.DismissReason.cancel
       ) {    
       }
       })
     },
     editarRegistro(id){
      swal({
        title:'¿Desea editar el registro?',
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
          this.cargarRegistrotercero(id);
        } else if (
           result.dismiss === swal.DismissReason.cancel
       ) {    
       }
       })
     },
     limpiarControles(){
      this.accion =0;
      this.idTercero=0 ,
      this.idTdentificacion= 0;
      this.identificacion ='';
      this.dv='';
      this.idTpersona = 0;
      this.idRut = 0;
      this.pNombre='';
      this.sNombre='';
      this.pApellido='';
      this.sApellido='';
      this.fechaNacimiento='';
      this.nComencial='';
      this.razonSocial='';
      this.direccion='';
      this.telefono ='';
      this.celular='';
      this.idDepartamento=0;
      this.idMunicipio='';
      this.idGener=0;
      this.email='';
      this.representante='';
      this.arrayRut = []
     },
     letraCapital(cadena){
      if(cadena != null){
      return cadena.charAt(0).toUpperCase() + cadena.slice(1);
       }
    }
    },
    mounted() {
      this.cargarComboTipoIdent();
      this.cargarComboTipoPersona();
      this.cargarComboDepartamento();
      this.cargarComboGenero();
      this.cargarTerceroListar();
    },
}
<template>
  <div
    class="modal fade"
    tabindex="-1"
    :class="{'mostrar' : modal}"
    role="dialog"
    aria-labelledby="myModalLabel"
    style="display: none;"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" v-text="tituloModal"></h4>
          <button type="button" class="close" aria-label="Close">
            <span v-on:click="$emit('llamarMetodo')" aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-inline row">
            <div class="col-md-8">
              <div class="input-inline">
                <select class="form-control col-md-4" v-model="campoBusqueda">
                  <option v-for="(item,i) in arrayCampos" :key="i"
                    selected
                    :value="item"
                    v-text="item"
                  ></option>
                </select>
                <input
                  type="text"
                  v-model="texto"
                  class="form-control"
                  placeholder="Texto a buscar"
                  @keyup.enter="agregarContenido(texto,campoBusqueda)"
                />
                <button
                  type="submit"
                  @click="agregarContenido(texto,campoBusqueda)"
                  class="btn btn-primary btn-sm"
                >
                  <i class="fa fa-search"></i> Buscar
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div class="table-responsive">
            <table class="table table-sm table-bordered table-striped">
              <thead>
                <tr>
                  <th v-for="(item, i) in objTitulo" :key="i" >{{item}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(fila,j) in arrayGeneral" :key="j">
                  <td>
                    <button type="button" @click="obtenerDato(fila)"  v-on:click="$emit('llamarFuncion')" class="btn btn-success btn-sm">
                      <i class="fa fa-check-square-o"></i>
                    </button>
                  </td>
                  <td v-for="(celdas,c) in fila" :key="c" v-text="celdas"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary"  v-on:click="$emit('llamarMetodo')" >Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isUndefined, isString, isNull } from 'util';
export default {
  name: "modalGeneral",
  props: {
    objParametros: {},
    idParametro:0,
    objTitulo: {},
    tituloModal: "",
    url: "",
    arrayCampos:Array,
    modal:0,
    arrayAsignados:Array    
  },
  data() {
    return {
      campoBusqueda: "id",
      texto: "",
      tipoAccion: 0,
      arrayGeneral: [],        
      arrayDato:[],
      prueba:''
    };
  },
  methods: {
    agregarContenido(campoTexto, campoBusqueda) {
      var me = this;
    
      axios
        .get(this.url,
          { params:{
          'campoBusqueda': isUndefined(campoBusqueda)?"id" : campoBusqueda ,
          'texto': isUndefined(campoTexto)? "''" :(campoTexto=="")?"''":campoTexto,
          'parametros': me.objParametros,
          'id': me.idParametro
          }
        })
        .then(function(response) {        
             me.arrayGeneral = response.data; 
             if(me.arrayGeneral.length!=0){
                me.noMostrarRegistroAsignadoInicio(new Array(me.arrayAsignados));
             }                  
        })
        .catch(function(error) {
          console.log(error);
        });
    },
   noMostrarRegistroAsignado:function(datos = []){
     
      for(var i=0 ; i < datos.length; i++){   
          for(var j=0; j<this.arrayGeneral.length; j++){                
             if(this.arrayGeneral[j].id==datos[i].id){    
                         
               this.arrayGeneral.splice(j, 1);
             }
         }
      }     
   }, 
   noMostrarRegistroAsignadoInicio:function(arreglo=[]){
     
      for(var i=0 ; i < arreglo[0].length; i++){  
          
          for(var j=0; j<this.arrayGeneral.length; j++){  
            
                            
             if(this.arrayGeneral[j].id==arreglo[0][i].id){    
                         
               this.arrayGeneral.splice(j, 1);
             }
         }
      }     
   },
   obtenerDato(dato = []){
       var me = this;
       me.arrayDato=[];
       me.arrayDato = new Array(dato) ;     
       me.noMostrarRegistroAsignado(me.arrayDato); 
       
       this.$emit('datos', me.arrayDato);
      
   },
    
  },
  mounted() {
    this.agregarContenido();
  }
};
</script>
<style>
.modal-content {
  width: 100% !important;
  position: absolute !important;
}
.mostrar {
  display: list-item !important;
  opacity: 1 !important;
  position: absolute !important;
  background-color: #3c29297a !important;
}
</style>
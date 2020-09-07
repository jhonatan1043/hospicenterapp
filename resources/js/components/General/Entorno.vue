<template>
  <div class="main">
    <div class="container-fluid">
      <div class="card">
        <div class="card-header"><h5>Entorno de Servicio</h5></div>
        <div class="card-body">
         <template v-if="listado==0">
           <button 
              type="button"
              class="btn btn-secondary btn sm"
              @click="mostrarFormulario()"
            >
             <i class="fa fa-plus-circle"></i> Nuevo
           </button>
           <hr>
           <div class="table-responsive">
           <table class="table table-sm table-bordered table-hover">
            <thead>
               <tr>
                  <th class="text-center" width="20">Opciones</th>
                  <th class="text-center" width="700">Entorno</th>
                  <th class="text-center" width="50">Aplica Neonato</th>
               </tr>
            </thead>
            <tbody>
                  <tr v-for="(item, index) in arrayEntorno" :key="index">
                    <td>
                    <button
                      type="button"
                      class="btn btn-warning btn-sm"
                      @click="editar(item.idEntorno,item.descripcion,item.aplicaNeonatal)"
                     >
                    <i class="icon-pencil"></i>
                   </button> &nbsp;
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="anularRegistro(item.idEntorno)"
                    >
                    <i class="icon-trash"></i>
                    </button>
                    </td>
                    <td>{{item.descripcion}}</td>
                      <td  class="text-center" v-if="item.aplicaNeonatal==1">
                       <small v-text="'Aplica'" class="form-text text-white badge badge-success"></small>
                      </td>
                      <td class="text-center" v-else>
                       <small v-text="'No aplica'" class="form-text text-white badge badge-danger"></small>
                      </td>
                  </tr>
            </tbody>
           </table>
           </div>
         </template>
         <template v-else>
               <form>
                  <div class="form-row">
                        <div class="form-group col-xs-12 col-sm-8 col-md-6 col-xl-12">
                          <label>Descripcion:</label>
                          <input 
                          type="text"
                          class="form-control"
                          v-model="descripcion"
                          >
                        </div>
                        <div class="form-check-inline">
                        <div class="custom-control custom-checkbox">    
                          <input 
                             type="checkbox"
                             id="aplicaNeonato"
                             class="custom-control-input"  
                             true-value="1"
                             false-value="0"
                             v-model="aplicaNeonato"
                          > 
                          <label class="custom-control-label" for="aplicaNeonato">Aplica Neonato</label>
                        </div>
                        </div>
                         <div class="form-group col-12">
                          <button v-if="accion == 0" 
                            class="btn btn-success mt-20"
                            type="button"
                            @click="crearEntorno()"
                          >
                          <i class="fa fa-save"></i> Guardar
                          </button>
                          <button v-else 
                            class="btn btn-success mt-40" 
                            type="button"
                            @click="actualizarEntorno()"
                          >
                          <i class="fa fa-save"></i> Actualizar
                          </button>
                          <button 
                            class="btn btn-danger" 
                            type="button"
                            @click="cancelar()"
                          >     
                          <i class="fa fa-arrow-circle-left"></i> Cancelar
                          </button>                       
                        </div>                        
                  </div>
               </form>
         </template>
      </div>
    </div>
   </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      listado : 0,
      accion  : 0,
      idEntorno : 0,
      descripcion:'',
      aplicaNeonato:0,
      arrayEntorno :[]
    }
  },
  methods: {
    mostrarFormulario(){
     this.listado = 1;
    },
    ocultarFormulario(){
     this.listado = 0;
    },
    entornoListar(){
      let me = this;
      axios.get('/entorno')
      .then(function (response) {
      me.arrayEntorno = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    crearEntorno(){
    let me = this;
    axios.post('/entorno/registrar', {
      'descripcion'   : me.descripcion,
      'aplicaNeonato' : me.aplicaNeonato
    })
    .then(function () {
      me.limpiarControles();
      me.entornoListar();
      me.ocultarFormulario();
      swal(
        'Guardado',
        'El registro ha sido guardado con exito.',
        'success'
      )
    })
    .catch(function (error) {
      console.log(error);
    })
    },
    actualizarEntorno(){
    let me = this;
    axios.put('/entorno/actualizar', {
    'id'            : me.idEntorno,
    'descripcion'   : me.descripcion,
    'aplicaNeonato' : me.aplicaNeonato
    })
    .then(function () {
      me.limpiarControles();
      me.entornoListar();
      me.ocultarFormulario();
      swal(
        'Actualizar',
        'El registro ha sido actualizado con exito.',
        'success'
      )
    })
    .catch(function (error) {
      console.log(error);
    })
    },
    limpiarControles(){
      this.accion = 0;
      this.descripcion = '';
      this.aplicaNeonato = 0;
    },
    cancelar(){
     this.limpiarControles();
     this.ocultarFormulario();
    },
    editar(id,descripcion,aplica){
      this.idEntorno = id;
      this.descripcion = descripcion;
      this.aplicaNeonato = aplica;
      this.accion = 1;
      this.mostrarFormulario();
    },
    anularRegistro(idEntorno){
    let me = this;
    axios.put('/entorno/anular', {
        'id': idEntorno
    })
    .then(function (response) {
     me.entornoListar();
     swal(
        'Anular',
        'El registro ha sido anulado con exito.',
        'success'
      )
    })
    .catch(function (error) {
      console.log(error)
    })
    }
  },
  mounted() {
    this.entornoListar();
  },
}
</script>
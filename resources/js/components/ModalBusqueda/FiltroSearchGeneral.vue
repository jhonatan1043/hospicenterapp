<template>
  <div v-if="arrayFilter.length > 0">
    <ul class="nav flex-column w-48 bg-dark text-white">
      <li
        v-for="(item,index) in arrayFilter"
        :key="index"
        class="py-1 border"
        style="cursor: pointer"
        @click="obtenerRegistro(item)"
      >{{item.descripcion}}</li>
    </ul>
  </div>
</template>

<script>
export default {
    data(){
        return{
          arrayFilter:[],
          arrayDatos:[]
        }
    },
    methods:{
        obtenerRegistro(item){
           this.$emit('registro',item);
        },
        
    },
    created(){
        
    }
};
</script>


export default {
    props:{
      idIngreso:0
    },
    data(){
        return{
           arrayProcedimientos:[]
        }
    },
    methods:{
       cargarProcedimientos(){
           axios.get('/facturaConsolidado/procedimientos',{
               params:{
                   idIngreso: this.idIngreso
               }
           })
           .then(res => {
              this.arrayProcedimientos = res.data;
           })
           .catch(err => {
               console.error(err); 
           })
       }
    },
    created(){
       this.cargarProcedimientos();
    }
}
export default {
  methods: {

    formatNumber(num){
     return num.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    formatCurrency(valor){

     if(valor === ''){return;}

     var originalLen = valor.length;

     var caretPos = valor.prop("selectionStart");

     if(valor.indexOf(".") >= 0){

       var decimalPos = valor.indexOf(".");
       var leftSide =  valor.substring(0,decimalPos);
       var rightSide = valor.substring(decimalPos);

       leftSide = this.formatNumber(leftSide);
       rightSide = this.formatNumber(rightSide);
      
       rightSide = rightSide.substring(0,2);

       valor = "$" + leftSide + "." + rightSide;

     }else{
      valor = formatNumber(valor);
      valor = "$" + valor;
     }
     var updatelen = valor.length;
     caretPos = updatelen - originalLen + caretPos;
     valor[0].setSelectionRange(caretPos, caretPos);
    }
  },
}


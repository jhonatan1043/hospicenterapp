@extends('principal')
@section('contenido')
   <template v-if="menu==5">
   <descripcionsistema-component></descripcionsistema-component>  
   </template>
   <template v-if="menu == 6">
   <entorno-component></entorno-component> 
   </template>
   <template v-if="menu==7">
   <medicamento-component></medicamento-component>
   </template>
   <template v-if="menu == 8">
   <tipoidentificacion-component></tipoidentificacion-component>
   </template>
   <template v-if="menu == 9">
   <manualtarifario-component></manualtarifario-component>
   </template>
   <template v-if="menu == 1">
   <empresa-component></empresa-component>
   </template>
   <template v-if="menu==2">
   <perfilmenu-component></perfilmenu-component>
   </template>
   <template v-if="menu == 3">
   <puntoservicio-component></puntoservicio-component>
   </template>
   <template v-if="menu == 4">
   <tercero-component></tercero-component>
   </template>
   <template v-if="menu == 9">
   </template>
   <template v-if="menu==10">
   <paciente-component></paciente-component>
   </template>
   <template v-if="menu == 11">
   <admision-component></admision-component>
   </template>
   <template v-if="menu == 12">
   <triage-component></triage-component>
   </template>
   <template v-if="menu==13">
   <ingreso-component></ingreso-component>
   </template>
   <template v-if="menu==14">
   <urgencia-component></urgencia-component>
   </template>
   <template v-if="menu==23">
   <historiaclinica-component></historiaclinica-component>
   </template>
   <template v-if="menu==15">
   <hospi-component></hospi-component>
   </template>
   <template v-if="menu==16">
   <entornoserviciocama-component></entornoserviciocama-component>
   </template>
   <template v-if="menu==17">
   <contrato-component></contrato-component>
   </template>
   <template v-if="menu==18">
   <usuario-component></usuario-component>
   </template>
   <template v-if="menu==19">
   <producto-component></producto-component>
   </template>
   <template v-if="menu==20">
   <cliente-component></cliente-component>
   </template>
   <template v-if="menu==21">
   <proveedor-component></proveedor-component>
   </template>
   <template v-if="menu==22">
   <listapreciomedicamentos-component></listapreciomedicamentos-component>
   </template>
@endsection   
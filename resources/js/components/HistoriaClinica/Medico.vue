<template>
  <div class="card">
    <div class="card-body">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active" href="#estancia" data-toggle="tab">Estancia</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#ordenMedica" data-toggle="tab">Orden medica</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#evolucion" data-toggle="tab">Evolucion medica</a>
        </li>
      </ul>
      <div class="tab-content container-fluid">
        <div class="tab-pane active" id="estancia">
           <table class="table table-hover table-bordered table-sm">
             <thead>
               <tr>
                 <th width="50">Agregar</th>
                 <th>Fecha</th>
                 <th>Código</th>
                 <th>Descripcion</th>
               </tr>           
             </thead>
             <tbody>
               
             </tbody>
           </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>

<template>
 <div class="card">
  <div class="card-header">
    <h4>Pre-Factura</h4>
  </div>
  <div class="card-body">
     <div class="row">
              <div class="form-group col-12">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" href="#procedimientos" data-toggle="tab">Procedimientos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#medicamentos" data-toggle="tab">Medicamentos e Insumos</a>
          </li>
        </ul>
        <!--procedimientos-->
        <div class="tab-content">
          <div class="tab-pane active" id="procedimientos">
            <div class="form-row">
                <div class="table-responsive">
                <table class="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th class="text-center" width="50">OrdenMedica</th>
                      <th class="text-center" width="100">Descripcion</th>
                      <th class="text-center" width="50">Codigo</th>
                      <th class="text-center">Procedimientos</th>
                      <th class="text-center" width="30">Cantidad</th>
                      <th class="text-center">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in arrayProcedimientos" :key="index">
                      <td v-text="item.OrdenMedica"></td>
                      <td v-text="item.Descripcion"></td>
                      <td v-text="item.Codigo"></td>
                      <td v-text="item.Procedimiento"></td>
                      <td v-text="item.Cantidad"></td>
                      <td v-text="item.Valor"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!--medicamentos e insumos-->
          <div class="tab-pane" id="diagnosticos">
            <div class="row">
              <div class="table-responsive">
                <table class="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th class="text-center" width="50">ordenMedica</th>
                      <th class="text-center">Descripcion</th>
                      <th class="text-center">Observacion</th>
                    </tr>
                  </thead>
                  <tbody>
                   
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
         </div>
  </div>
</div>
</template>

<script src="../../Scripts/Facturacion/FacturaConsolidado.js"></script>

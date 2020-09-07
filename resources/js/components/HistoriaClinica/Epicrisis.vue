<template>
  <div
    class="modal fade"
    tabindex="-1"
    :class="{ mostrar: modal }"
    role="dialog"
    aria-labelledby="myModalLabel"
    style="display: none;"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Epicrisis</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" v-on:click="$emit('cerrarModal')">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
              <label>Identificacion:</label>
              <input
                type="text"
                class="form-control form-control-sm"
                readonly
                v-model="identificacion"
              />
            </div>
            <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
              <label>Paciente:</label>
              <input type="text" class="form-control form-control-sm" readonly v-model="paciente" />
            </div>
            <div class="form-group col-xl-3 col-xs-6">
              <label>Fecha:</label>
              <input type="date" class="form-control form-control-sm" readonly v-model="fEpicrisis" />
            </div>
            <div class="form-group col-xl-2 col-xs-6">
              <label>Hora:</label>
              <input type="time" class="form-control form-control-sm" readonly v-model="hEpicrisis"/>
            </div>
            <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
              <label>Edad:</label>
              <input type="text" class="form-control form-control-sm" readonly v-model="edad" />
            </div>
            <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
              <label>Genero:</label>
              <input type="text" class="form-control form-control-sm" readonly v-model="genero" />
            </div>
            <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
              <label>Cama:</label>
              <input type="text" class="form-control form-control-sm" readonly v-model="cama" />
            </div>
            <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
              <label>Administradora:</label>
              <input
                type="text"
                class="form-control form-control-sm"
                readonly
                v-model="administradora"
              />
            </div>
          </div>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="form-group col-12">
              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a
                    class="nav-link active"                  
                    href="#descripcion"
                    data-toggle="tab"
                  >Descripción</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"                
                    href="#diagnosticos"
                    data-toggle="tab"
                  >Diagnosticos</a>
                </li>
              </ul>
              <!--descripcion-->
              <div class="tab-content">
                <div class="tab-pane active" id="descripcion">
                  <div class="form-row">
                    <div class="col-xl-12">
                      <textarea
                        class="form-control"
                        rows="3"
                        style="resize: none;"                 
                        v-model="descripcion"
                      ></textarea>
                    </div>
                    <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                      <label>Estado</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idEstado"
                        v-bind:style="
                                                    idEstado == 0
                                                        ? 'background-color: #FEF9E7'
                                                        : ''
                                                "
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option
                          v-for="item in arrayEstado"
                          :key="item.codigo"
                          :value="item.codigo"
                          v-text="item.descripcion"
                        ></option>
                      </select>
                    </div>
                  </div>
                </div>
                <!--diagnosticos-->
                <div class="tab-pane" id="diagnosticos">
                  <div class="row">
                  <div class="table-responsive">
                  <table class="table table-bordered table-sm">
                    <thead>
                     <tr>
                        <th class="text-center" width="50">Codigo</th>
                        <th class="text-center">Descripcion</th>
                        <th class="text-center">Observacion</th>
                       </tr>
                    </thead>
                      <tbody>
                    <tr v-for="(item,index) in arrayDiagnosticos" :key="index">
                      <td v-text="item.codigo"></td>
                      <td v-text="item.descripcion"></td>
                      <td v-text="item.observacion"></td>
                    </tr>
                   </tbody>
                    </table>               
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" 
                  class="btn btn-success btn-sm" 
                  @click="guardarEpicrisis()"
                  v-on:click="$emit('actualizarListaPaciente')"             
          >Guardar
                  
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../Scripts/HistoriaClinica/Epicrisis.js"></script>


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
.modal-lg {
  max-width: 100%;
}
</style>

<template>
   <div>
    <div class="card">
      <div class="row">
        <div class="col-6 m-2">
          <button
            class="btn btn-secondary btn-sm"
            type="button"
            :disabled="btNuevo == 0"
            @click="nuevoReg()"
          >
            <i class="icon-plus"></i>&nbsp;Nuevo
          </button>
          <button
            class="btn btn-success btn-sm"
            type="button"
            :disabled="btGuardar == 0"
            @click="guardarReg()"
          >
            <i class="fa fa-save"></i>&nbsp;Guardar
          </button>
          <button
            class="btn btn-warning btn-sm"
            type="button"
            :disabled="btEditar == 0 || (idOrdenInsumo!=0 && btEditar == 0)"
            @click="editarReg()"
          >
            <i class="icon-pencil"></i>&nbsp;Editar
          </button>
          <button
            class="btn btn-danger btn-sm"
            type="button"
            :disabled="btAnular == 0"
            @click="anularReg(indice == 0 ? '/enfermeria/anulado':'',codigo)"
          >
            <i class="icon-trash"></i>&nbsp;Anular
          </button>
          <button
            class="btn btn-primary btn-sm"
            type="button"
            :disabled="btCancelar == 0"
            @click="cancelarReg()"
          >
            <i class="fa fa-arrow-circle-left"></i>&nbsp;Cancelar
          </button>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <!--Inicio del codigo-->
        <div class="col-12">
          <form>
            <div class="form-row">
              <div class="form-group col-12">
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      @click="pestañaSeleccionada(0)"
                      href="#nota"
                      :data-toggle="[btGuardar==1?'disabled':'tab']"
                    >Notas</a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      @click="pestañaSeleccionada(1)"
                      href="#insumos"
                      :data-toggle="[btGuardar==1?'disabled':'tab']"
                    >Insumos</a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      @click="pestañaSeleccionada(2)"
                      href="#oxigeno"
                      :data-toggle="[btGuardar==1?'disabled':'tab']"
                    >Oxigeno</a>
                  </li>
                </ul>
                <!--notas de fisioterapia-->
                <div class="tab-content subScroll">
                  <div class="tab-pane active" id="nota">
                    <div class="form-row">
                      <div class="col-xl-3">
                        <menuvertical-component
                          :pTitulo="tituloNotaFisio"
                          :arrayDatos="arrayListarNotas"
                          :editar="editable"
                          v-on:llamarFuncion="cargarNotas"
                          @codigo="codigoNota = $event"
                        ></menuvertical-component>
                      </div>
                      <div class="col-xl-9">
                        <textarea
                          class="form-control"
                          rows="17"
                          style="resize: none;"
                          :disabled="editable == 0"
                          v-model="nota"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <!--orden de insumos-->
                  <div class="tab-pane" id="insumos">
                    <div class="row">
                      <div class="col-xl-3">
                        <menuvertical-component 
                        :pTitulo="tituloInsFisio"
                        :arrayDatos="arrayListarInsumos"
                        :editar="editable"
                        v-on:llamarFuncion="cargarInsumos"
                        @codigo="idOrdenInsumo = $event"
                        >
                        </menuvertical-component>
                      </div>
                      <div class="col-xl-9">
                        <div class="table-responsive">
                          <button
                            type="button"
                            class="btn btn-primary btn-sm"
                            :disabled="editable == 0"
                            @click="abrirModal"
                          >
                            <i class="icon-plus"></i>
                          </button>

                          <hr />
                          <table class="table table-sm table-striped table-hover">
                            <thead class="table-dark">
                              <tr>
                                <th width="50" class="text-center">Opción</th>
                                <th hidden width="50" class="text-center">Id</th>
                                <th width="50" class="text-center">Codigo</th>
                                <th width="200" class="text-center">Descripcion</th>
                                <th width="10" class="text-center">Cantidad</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr  v-for="(item, index) in arrayInsumos" :key="index">
                                <td class="text-center">
                                  <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    @click="quitarFila(index,arrayInsumos)"
                                    :disabled="!editable"
                                  >
                                    <i class="icon-trash"></i>
                                  </button>
                                </td>
                                <td hidden v-text="item.id"></td>
                                <td v-text="item.codigo"></td>
                                <td v-text="item.descripcion"></td>
                                <td>
                                  <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    v-model="item.cantidad"
                                    width="10"
                                    :readOnly="!editable"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--Oxigeno-->
                  <div class="tab-pane" id="oxigeno">
                    <div class="row">
                      <div class="col-xl-3">
                        <menuvertical-component 
                        :pTitulo="tituloInsFisio"
                        :arrayDatos="arrayListarInsumos"
                        :editar="editable"
                        v-on:llamarFuncion="cargarInsumos"
                        @codigo="idOrdenInsumo = $event"
                        >
                        </menuvertical-component>
                      </div>
                      <div class="col-xl-9">
                        <div class="table-responsive">
                         
                          <table class="table table-sm table-striped table-hover">
                            <thead class="table-dark">
                              <tr>
                                <th width="50" class="text-center">Opción</th>
                                <th hidden width="50" class="text-center">Id</th>
                                <th width="50" class="text-center">Codigo</th>
                                <th width="200" class="text-center">Descripcion</th>
                                <th width="10" class="text-center">Cantidad</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr  v-for="(item, index) in arrayInsumos" :key="index">
                                <td class="text-center">
                                  <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    @click="quitarFila(index,arrayInsumos)"
                                    :disabled="!editable"
                                  >
                                    <i class="icon-trash"></i>
                                  </button>
                                </td>
                                <td hidden v-text="item.id"></td>
                                <td v-text="item.codigo"></td>
                                <td v-text="item.descripcion"></td>
                                <td>
                                  <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    v-model="item.cantidad"
                                    width="10"
                                    :readOnly="!editable"
                                  />
                                </td>
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
          </form>
        </div>
      </div>
     <ModalGeneral
        v-if="modal"
        v-bind:objTitulo="objTitulo"
        :tituloModal="tituloModal"
        :url="url"
        :arrayCampos="arrayCampos"
        :modal="modal"
        @datos="arrayDatos = $event"
        v-on:llamarFuncion="agregarDatos"
        v-on:llamarMetodo="cerrarModal"
        v-bind:arrayAsignados="arrayInsumos"
      ></ModalGeneral>
    </div>
  </div>
</template>
<script src="../../Scripts/HistoriaClinica/Fisioterapia.js" ></script>  

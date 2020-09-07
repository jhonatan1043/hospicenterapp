<template>
  <main>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <div>
          <button
            class="btn btn-secondary btn-sm"
            type="button"
            @click="nuevo()"
            :disabled="btNuevo == 0"
          >
            <i class="icon-plus"></i>&nbsp;Nuevo
          </button>
          <button
            class="btn btn-success btn-sm"
            type="button"
            :disabled="btGuardar == 0"
            @click="guardarOrdenMedica()"
          >
            <i class="fa fa-arrow-circle-left"></i>&nbsp;Guardar
          </button>
          <button class="btn btn-warning btn-sm" type="button" :disabled="btEditar == 0">
            <i class="icon-pencil"></i>&nbsp;Editar
          </button>
          <button
            class="btn btn-primary btn-sm"
            type="button"
            @click="cancelar()"
            :disabled="btCancelar == 0"
          >
            <i class="fa fa-arrow-circle-left"></i>&nbsp;Cancelar
          </button>
          <button class="btn btn-danger btn-sm" type="button" :disabled="btAnular == 0">
            <i class="icon-trash"></i>&nbsp;Anular
          </button>
        </div>
        <div class="form-inline">
          <input
            type="date"
            class="form-control form-control-sm"
            v-model="fechaOrden"
            :disabled="editable==0"
          />
          <input
            type="time"
            class="form-control form-control-sm ml-1"
            v-model="horaOrden"
            :disabled="editable==0"
          />
          <input
            type="number"
            class="form-control form-control-sm text-center ml-1"
            placeholder="Codigo"
            readonly
            v-model="codigoOrden"
          />
        </div>
      </div>
      <div class="card-body">
        <div class="form-row">
          <div class="col-xl-3">
            <menuvertical-component
              :pTitulo="tituloOrden"
              :arrayDatos="arrayListaOrdenMedica"
              :editar="editable"
              v-on:llamarFuncion="cargarOrdenMedica"
              @codigo="idOrdenMedica = $event"
            ></menuvertical-component>
          </div>
          <div class="col-xl-9">
            <div class="form-row">
              <div class="shadow-none p-2 mb-2 bg-light col-12">
                <h6>Estancia</h6>
              </div>
              <div class="form-group col-12">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="agregarFilas(0)"
                  :disabled="editable==0"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Agregar manualmente una estancia"
                >
                  <i class="fa fa-hand-pointer-o"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  :disabled="editable==0"
                  @click="abrirModal(modalEstancia)"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="buscar una estancia"
                >
                  <i class="icon-plus"></i>
                </button>
                <hr />
                <div class="table-responsive">
                  <table class="table table-sm table-striped table-hover">
                    <thead class="table-dark">
                      <tr>
                        <th width="50" class="text-center">Opción</th>
                        <th width="50" class="text-center">Codigo</th>
                        <th width="300" class="text-center">Descripción</th>
                        <th width="100" class="text-center">Fecha Incio</th>
                        <th width="100" class="text-center">Fecha Fin</th>
                        <th width="200" class="text-center">Observación</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in arrayEstancia" :key="index">
                        <td>
                          <button
                            type="button"
                            class="btn btn-danger btn-sm"
                            @click="quitarFila(index,arrayEstancia)"
                          >
                            <i class="icon-trash"></i>
                          </button>
                        </td>
                        <td v-text="item.codigo"></td>
                        <td class="text-center">
                          <input
                            :readonly="arrayEstancia.length > 0 && item.codigo!= ''? true:false"
                            type="text"
                            class="form-control form-control-sm"
                            v-model="item.descripcion"
                            autocomplete="off"
                            @input="filtrarRegistro(item,0)"
                             :disabled="editable==0"
                          />
                        </td>
                        <td class="text-center">
                          <input
                            type="date"
                            class="form-control form-control-sm"
                             :disabled="editable==0"
                            v-model="item.fechaInicio"
                          />
                        </td>
                        <td class="text-center">
                          <input
                            type="date"
                            class="form-control form-control-sm"
                             :disabled="editable==0"
                            v-model="item.fechaFin"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            class="form-control form-control-sm"
                             :disabled="editable==0"
                            v-model="item.observacion"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="arrayFilter.length > 0 && estancia">
                    <ul class="nav flex-column w-48 bg-dark text-white">
                      <li
                        v-for="(item,index) in arrayFilter"
                        :key="index"
                        class="py-1 border"
                        style="cursor: pointer"
                        @click="obtenerRegistro(item,0)"
                      >{{item.descripcion}}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="form-group col-12">
                <hr />
                <label>Indicaciones:</label>
                <textarea
                  class="form-control"
                  rows="3"
                  style="resize: none;"
                  :disabled="editable==0"
                  v-model="indicacionMedica"
                ></textarea>
              </div>

              <div class="shadow-none p-2 mb-2 bg-light col-12">
                <h6>Oxigeno</h6>
              </div>
              <div class="form-group col-12">
                <div class="table-responsive">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="agregarFilas(1)"
                    :disabled="editable==0"
                  >
                    <i class="fa fa-hand-pointer-o"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    :disabled="editable==0"
                    @click="abrirModal(modalOxigeno)"
                  >
                    <i class="icon-plus"></i>
                  </button>
                  <hr />
                  <table class="table table-sm table-striped table-hover">
                    <thead class="table-dark">
                      <tr>
                        <th width="50" class="text-center">Opción</th>
                        <th width="200" class="text-center">Descripción</th>
                        <th width="200" class="text-center">Observación</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in arrayOxigeno" :key="index">
                        <td class="text-center">
                          <button
                            type="button"
                            class="btn btn-danger btn-sm"
                            @click="quitarFila(index,arrayOxigeno)"
                          >
                            <i class="icon-trash"></i>
                          </button>
                        </td>
                        <td class="text-center">
                          <div class="col-lg-12 col-md-6 col-sm-6 col-xs-12 col-xl-12">
                            <input
                              :readonly="arrayOxigeno.length > 0 && item.id!= ''? true:false"
                              type="text"
                              class="form-control form-control-sm"
                              v-model="item.descripcion"
                              autocomplete="off"
                              @input="filtrarRegistro(item,1)"
                              @change="restablecerRegistro(item,1)"
                               :disabled="editable==0"
                            />
                          </div>
                        </td>
                        <td class="text-center">
                          <input
                            type="text"
                            class="form-control form-control-sm"
                             :disabled="editable==0"
                            v-model="item.observacion"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="arrayFilter.length > 0 && oxigeno">
                    <ul class="nav flex-column w-48 bg-dark text-white">
                      <li
                        v-for="(item,index) in arrayFilter"
                        :key="index"
                        class="py-1 border"
                        style="cursor: pointer"
                        @click="obtenerRegistro(item,1)"
                      >{{item.Descripcion}}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="shadow-none p-2 mb-2 bg-light col-12">
                <h6>Paraclinicos</h6>
              </div>
              <div class="form-group col-12">
                <div class="table-responsive">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="agregarFilas(2)"
                    :disabled="editable==0"
                  >
                    <i class="fa fa-hand-pointer-o"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    :disabled="editable==0"
                    @click="abrirModal(modalParaclinico)"
                  >
                    <i class="icon-plus"></i>
                  </button>
                  <hr />
                  <table class="table table-sm table-striped table-hover">
                    <thead class="table-dark">
                      <tr>
                        <th width="50" class="text-center">Opción</th>
                        <th width="50" class="text-center">Codigo</th>
                        <th width="400" class="text-center">Paraclinico</th>
                        <th width="50" class="text-center">Cantidad</th>
                        <th width="100" class="text-center">Justificación</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in arrayParaclinicos" :key="index">
                        <td class="text-center">
                          <button
                            type="button"
                            class="btn btn-danger btn-sm"
                            @click="quitarFila(index,arrayParaclinicos)"
                          >
                            <i class="icon-trash"></i>
                          </button>
                        </td>
                        <td v-text="item.codigo"></td>
                        <td>
                          <input
                            :readonly="arrayParaclinicos.length > 0 && item.codigo!= ''? true:false"
                            type="text"
                            class="form-control form-control-sm"
                            v-model="item.descripcion"
                            autocomplete="off"
                            @input="filtrarRegistro(item,2)"
                             :disabled="editable==0"
                          />
                        </td>
                        <td class="text-center">
                          <input
                            type="number"
                            class="form-control form-control-sm"
                             :disabled="editable==0"
                            v-model="item.cantidad"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            class="form-control form-control-sm"
                             :disabled="editable==0"
                            v-model="item.justificacion"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="arrayFilter.length > 0 && paraclinico">
                    <ul class="nav flex-column w-48 bg-dark text-white">
                      <li
                        v-for="(item,index) in arrayFilter"
                        :key="index"
                        class="py-1 border"
                        style="cursor: pointer"
                        @click="obtenerRegistro(item,2)"
                      >{{item.descripcion}}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="shadow-none p-2 mb-2 bg-light col-12">
                <h6>Medicamentos</h6>
              </div>
              <div class="form-group col-12">
                <div class="table-responsive">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="agregarFilas(3)"
                    :disabled="editable==0"
                  >
                    <i class="fa fa-hand-pointer-o"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    :disabled="editable==0"
                    @click="abrirModal(modalMedicamento)"
                  >
                    <i class="icon-plus"></i>
                  </button>
                  <hr />
                  <table class="table table-sm table-striped table-hover">
                    <thead class="table-dark">
                      <tr>
                        <th width="50" class="text-center">Opción</th>
                        <th width="300" class="text-center">Medicamento</th>
                        <th width="50" class="text-center">Dosis</th>
                        <th width="100" class="text-center">V.Admin.</th>
                        <th width="20" class="text-center">Frecuencia</th>
                        <th width="20" class="text-center">H.Inicial</th>
                        <th width="50" class="text-center">D.Tratamiento</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in arrayMedicamentos" :key="index">
                        <td class="text-center">
                          <button
                            type="button"
                            class="btn btn-danger btn-sm"
                            @click="quitarFila(index,arrayMedicamentos)"
                          >
                            <i class="icon-trash"></i>
                          </button>
                        </td>
                        <td>
                          <div class="col-lg-12 col-md-6 col-sm-6 col-xs-12 col-xl-12">
                            <input
                              :readonly="arrayMedicamentos.length > 0 && item.id!= ''? true:false"
                              type="text"
                              class="form-control form-control-sm"
                              v-model="item.descripcion"
                              autocomplete="off"
                              @input="filtrarRegistro(item,3)"
                              @change="restablecerRegistro(item,3)"
                               :disabled="editable==0"
                            />
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            class="form-control form-control-sm"
                             :disabled="editable==0"
                            v-model="item.dosis"
                          />
                        </td>
                        <td>
                          <select class="form-control form-control-sm" v-model="item.vAdmin"  :disabled="editable==0">
                            <option selected :value="0" disabled="disabled" >Seleccione</option>
                            <option
                              v-for="item in listaViaAdmin"
                              :key="item.id"
                              :value="item.id"
                              v-text="item.descripcion"
                            ></option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            class="form-control form-control-sm text-center"
                             :disabled="editable==0"
                            v-model="item.frecuencia"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            class="form-control form-control-sm text-center"
                             :disabled="editable==0"
                            v-model="item.horaInicial"
                          />
                        </td>
                        <td v-text="item.diaTratamiento" class="text-center"></td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="arrayFilter.length > 0 && medicamentos">
                    <ul class="nav flex-column w-48 bg-dark text-white">
                      <li
                        v-for="(item,index) in arrayFilter"
                        :key="index"
                        class="py-1 border"
                        style="cursor: pointer"
                        @click="obtenerRegistro(item,3)"
                      >{{item.descripcion}}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="shadow-none p-2 mb-2 bg-light col-12">
                <h6>Interconsulta</h6>
              </div>
              <div class="form-group col-12">
                <div class="table-responsive">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="agregarFilas(4)"
                    :disabled="editable==0"
                  >
                    <i class="fa fa-hand-pointer-o"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    :disabled="editable==0"
                    @click="abrirModal(modalInterconsulta)"
                  >
                    <i class="icon-plus"></i>
                  </button>
                  <hr />
                  <table class="table table-sm table-striped table-hover">
                    <thead class="table-dark">
                      <tr>
                        <th width="50" class="text-center">Opción</th>
                        <th width="50" class="text-center">Codigo</th>
                        <th width="200" class="text-center">interconsulta</th>
                        <th width="100" class="text-center">Justificación</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in arrayInterconsulta" :key="index">
                        <td class="text-center">
                          <button
                            type="button"
                            class="btn btn-danger btn-sm"
                            @click="quitarFila(index,arrayInterconsulta)"
                          >
                            <i class="icon-trash"></i>
                          </button>
                        </td>
                        <td v-text="item.codigo"></td>

                        <td>
                          <input
                            :readonly="arrayInterconsulta.length > 0 && item.codigo!= ''? true:false"
                            type="text"
                            class="form-control form-control-sm"
                            v-model="item.descripcion"
                            autocomplete="off"
                            @input="filtrarRegistro(item,4)"
                             :disabled="editable==0"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            class="form-control form-control-sm"
                             :disabled="editable==0"
                            v-model="item.justificacion"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="arrayFilter.length > 0 && interconsulta">
                    <ul class="nav flex-column w-48 bg-dark text-white">
                      <li
                        v-for="(item,index) in arrayFilter"
                        :key="index"
                        class="py-1 border"
                        style="cursor: pointer"
                        @click="obtenerRegistro(item,4)"
                      >{{item.descripcion}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalGeneral
        v-if="Modal"
        v-bind:objTitulo="objTitulo"
        :tituloModal="tituloModal"
        :url="url"
        :arrayCampos="arrayCampos"
        :modal="Modal"
        @datos="arrayDatos = $event"
        v-on:llamarFuncion="agregarDatos"
        v-on:llamarMetodo="cerrarModal"
      ></ModalGeneral>
    </div>
  </main>
</template>
<script src="../../Scripts/HistoriaClinica/OrdenMedica.js" ></script>
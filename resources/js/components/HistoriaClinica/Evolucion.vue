<template>
  <div>
    <div class="card">
      <div class="row">
        <div class="form-group col-6 mt-2">
          <button
            class="btn btn-secondary btn-sm"
            type="button"
            @click="nuevoReg()"
            :disabled="btNuevo == 0"
          >
            <i class="icon-plus"></i>&nbsp;Nuevo
          </button>
          <button
            class="btn btn-success btn-sm"
            type="button"
            :disabled="btGuardar == 0"
            @click="registrarEvolucion()"
          >
            <i class="fa fa-arrow-circle-left"></i>&nbsp;Guardar
          </button>
          <button
            class="btn btn-warning btn-sm"
            type="button"
            :disabled="btEditar == 0"
            @click="editarReg()"
          >
            <i class="icon-pencil"></i>&nbsp;Editar
          </button>
          <button
            class="btn btn-primary btn-sm"
            type="button"
            @click="cancelarReg()"
            :disabled="btCancelar == 0"
          >
            <i class="fa fa-arrow-circle-left"></i>&nbsp;Cancelar
          </button>
          <button class="btn btn-danger btn-sm" type="button" :disabled="btAnular == 0">
            <i class="icon-trash"></i>&nbsp;Anular
          </button>
        </div>
        <div class="form-group col-2 mt-2">
          <input
            type="date"
            class="form-control form-control-sm"
            v-model="fechaEvo"
            disabled
          />
        </div>
        <div class="form-group col-2 mt-2">
          <input
            type="time"
            class="form-control form-control-sm"
            v-model="horaEvo"
            disabled
          />
        </div>
        <div class="form-group col-2 mt-2">
          <input
            type="number"
            class="form-control form-control-sm text-center"
            placeholder="Codigo"
            readonly
            v-model="codigoEvo"
          />
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-xl-3">
            <menuvertical-component
              :arrayDatos="arraylistaEvo"
              :pTitulo="tituloEvo"
              :editar="editable"
              v-on:llamarFuncion="cargarEvolucion"
              @codigo="codigoEvo = $event"
            ></menuvertical-component>
          </div>
          <div class="col-xl-9">
            <form>
              <div class="form-row">
                <div class="form-group col-12">
                  <ul class="nav nav-tabs">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        href="#signoVitales"
                        data-toggle="tab"
                      >Signos Vitales</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#examFisico" data-toggle="tab">Examén Fisico</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#diagnostico" data-toggle="tab">Diagnosticos</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#conclusion" data-toggle="tab">Conclusión</a>
                    </li>
                  </ul>
                  <div class="tab-content container-fluid subScroll">
                    <div class="tab-pane active" id="signoVitales">
                      <div class="form-row">
                        <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                          <label>Frec. Cardiaca</label>
                          <input
                            type="number"
                            class="form-control form-control-sm text-center"
                            maxlength="20"
                            v-model="fCard"
                            :disabled="editable == 0"
                          />
                        </div>
                        <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                          <label>Frec. Respiratoria</label>
                          <input
                            type="number"
                            class="form-control form-control-sm text-center"
                            maxlength="20"
                            v-model="fResp"
                            :disabled="editable == 0"
                          />
                        </div>
                        <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                          <label>Temperatura</label>
                          <input
                            type="number"
                            class="form-control form-control-sm text-center"
                            maxlength="20"
                            v-model="temp"
                            :disabled="editable == 0"
                          />
                        </div>
                        <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                          <label>Pulso</label>
                          <input
                            type="number"
                            class="form-control form-control-sm text-center"
                            maxlength="20"
                            v-model="pulso"
                            :disabled="editable == 0"
                          />
                        </div>
                        <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                          <label>Sistolica:</label>
                          <input
                            type="number"
                            class="form-control form-control-sm text-center"
                            maxlength="20"
                            v-model="tasi"
                            :disabled="editable == 0"
                          />
                        </div>
                        <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                          <label>Diactolica:</label>
                          <input
                            type="number"
                            class="form-control form-control-sm text-center"
                            maxlength="20"
                            v-model="tadi"
                            :disabled="editable == 0"
                          />
                        </div>
                        <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                          <label>Pulpils</label>
                          <input
                            type="text"
                            class="form-control form-control-sm text-center"
                            maxlength="50"
                            v-model="pulpils"
                            :disabled="editable == 0"
                          />
                        </div>
                        <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                          <label>Perimetro Abdominal:</label>
                          <input
                            type="number"
                            class="form-control form-control-sm text-center"
                            maxlength="50"
                            v-model="perimetroAbdom"
                            :disabled="editable == 0"
                          />
                        </div>
                        <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                          <label>Perimetro Cefalico:</label>
                          <input
                            type="number"
                            class="form-control form-control-sm text-center"
                            maxlength="50"
                            v-model="perimetroCefal"
                            :disabled="editable == 0"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane" id="examFisico">
                      <div class="form-row">
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Aspecto General:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="aspecto"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Piel y Faneras:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="pielFanela"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Craneo:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="craneo"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Ojos:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="ojo"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Oidos:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="oido"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Nariz:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="nariz"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Boca:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="boca"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Garganta:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="garganta"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Cuello:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="cuello"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Torax y Pulmones:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="toraxPulmon"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Corazón:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="corazon"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Senos:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="senos"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Abdomén:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="abdomen"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Genitales:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="genitales"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Examén Rectal:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="examenRectal"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Extremidades:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="Extremidades"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Neuromuscular:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="neuroMuscular"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Osteo Articular:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="osteoArticular"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Neurologico:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="neurologia"
                            style="resize: none;"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Dorso Lumbal:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            cols="30"
                            rows="2"
                            class="form-control"
                            :disabled="editable == 0"
                            v-model="dorso"
                            style="resize: none;"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane" id="diagnostico">
                      <div class="form-group col-12">
                        <button
                          type="button"
                          class="btn btn-primary btn-sm mb-2"
                          @click="abrirModalDiagnosticos()"
                          :disabled="editable == 0"
                        >
                          <i class="icon-plus"></i>
                        </button>
                        <div class="table-reponsive">
                          <table class="table table-striped table-sm">
                            <thead class="table-dark">
                              <tr>
                                <th width="50" class="text-center">Opciones</th>
                                <th width="70" class="text-center">Codigo</th>
                                <th width="500" class="text-center">Diagnostico</th>
                                <th width="400" class="text-center">Observación</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item, index) in arrayDiag" :key="index">
                                <td class="text-center">
                                  <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    @click="deleteRow(i,arrayDiag)"
                                    :disabled="editable == 0"
                                  >
                                    <i class="icon-trash"></i>
                                  </button>
                                </td>
                                <td v-text="item.codigo"></td>
                                <td v-text="item.descripcion"></td>
                                <td>
                                  <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    :disabled="editable == 0"
                                    v-model="item.observacion"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane" id="conclusion">
                      <div class="row">
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Objetivo:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            class="form-control"
                            col="30"
                            rows="5"
                            style="resize: none;"
                            v-model="objetiva"
                            :disabled="editable == 0"
                             v-bind:style="objetiva == '' && editable == 1 ?'background-color: #FEF9E7':''"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Subjetivo:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            class="form-control form-control-sm"
                            col="30"
                            rows="5"
                            style="resize: none;"
                            v-model="subjetiva"
                            :disabled="editable == 0"
                             v-bind:style="subjetiva == '' && editable == 1 ?'background-color: #FEF9E7':''"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Analisis:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            class="form-control form-control-sm"
                            col="30"
                            rows="5"
                            style="resize: none;"
                            v-model="analisis"
                            :disabled="editable == 0"
                             v-bind:style="analisis == '' && editable == 1 ?'background-color: #FEF9E7':''"
                          ></textarea>
                        </div>
                        <div class="shadow-none p-2 mb-2 bg-light col-12">
                          <h6>Plan:</h6>
                        </div>
                        <div class="form-group col-12">
                          <textarea
                            class="form-control form-control-sm"
                            col="30"
                            rows="5"
                            style="resize: none;"
                            v-model="plan"
                            :disabled="editable == 0"
                             v-bind:style="plan == '' && editable == 1 ?'background-color: #FEF9E7':''"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ModalGeneral
        v-if="modalDiagnostico"
        v-bind:objTitulo="objTituloDiagnostico"
        tituloModal="Busqueda de Diagnosticos"
        url="/ingreso/busquedaDiagnosticos"
        v-bind:arrayCampos="arrayCamposDiagnosticos"
        :modal="modalDiagnostico"
        @datos="arrayDatosDiagnosticos = $event"
        v-on:llamarMetodo="cerrarModalDiagnostico"
        v-on:llamarFuncion="agregarDiagnosticos"
        v-bind:arrayAsignados="arrayDiag"
      ></ModalGeneral>
    </div>
  </div>
</template>
<script src="../../Scripts/HistoriaClinica/EvolucionMedica.js" ></script>

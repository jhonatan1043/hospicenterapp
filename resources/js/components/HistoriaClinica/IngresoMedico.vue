  <template>
  <div>
    <div class="card">
      <div class="row">
        <div class="col-12 m-2">
          <button
            class="btn btn-warning btn-sm"
            type="button"
            :disabled="btEditar == 0"
            @click="editar()"
          >
            <i class="icon-pencil"></i>&nbsp;Editar
          </button>
          <button
            class="btn btn-success btn-sm"
            type="button"
            :disabled="btGuardar == 0"
            @click="registrarInformacion()"
          >
            <i class="fa fa-save"></i> Guardar
          </button>
          <button
            class="btn btn-primary btn-sm"
            type="button"
            :disabled="btCancelar == 0"
            @click="cancelar()"
          >
            <i class="fa fa-arrow-circle-left"></i> Cancelar
          </button>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" href="#ingreso" data-toggle="tab">Ingreso</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#diagnostico"
              data-toggle="tab"
              @click="cargarDianosticoRem();"
            >Diagnosticos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#antFam" data-toggle="tab">Antecedentes Familiares</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#antPers" data-toggle="tab">Antecedentes Personales</a>
          </li>
          <li class="nav-item" v-if="idGenero == 9">
            <a class="nav-link" href="#otrosAnt" data-toggle="tab">Otros Antecedentes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#examFisico" data-toggle="tab">Examén Fisico</a>
          </li>
        </ul>
        <div class="tab-content container-fluid scroll">
          <div class="tab-pane active" id="ingreso">
            <div class="form-row">
              <div class="form-group col-xs-12 col-xl-12 col-lg-4 col-md-4 col-sm-6">
                <label>Motivo del Ingreso:</label>
                <textarea
                  cols="30"
                  rows="5"
                  class="form-control"
                  maxlength="4000"
                  style="resize: none;"
                  v-model="motivo"
                  :disabled="editable == 0"
                ></textarea>
              </div>
              <div class="form-group col-xs-12 col-xl-12 col-lg-4 col-md-4 col-sm-6">
                <label>Estado General:</label>
                <textarea
                  cols="30"
                  rows="5"
                  class="form-control"
                  maxlength="4000"
                  style="resize: none;"
                  v-model="estadoGen"
                  :disabled="editable == 0"
                ></textarea>
              </div>
              <div class="form-group col-xs-12 col-xl-12 col-lg-4 col-md-4 col-sm-6">
                <label>Enfermedad Actual:</label>
                <textarea
                  cols="30"
                  rows="3"
                  class="form-control "
                  maxlength="4000"
                  style="resize: none;"
                  v-model="enfeActual"
                  :disabled="editable == 0"
                ></textarea>
              </div>
              <div class="form-group col-xs-12 col-xl-4 col-lg-4 col-md-4 col-sm-4">
                <label>Estado del Ingreso:</label>
                <select
                  class="form-control form-control-sm"
                  data-live-search="true"
                  v-model="idEstIngreso"
                  :disabled="editable == 0"
                >
                  <option selected :value="0" disabled="disabled">Seleccione</option>
                  <option selected :value="1">Vivo</option>
                  <option selected :value="2">Muerto</option>
                </select>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="diagnostico">
            <div class="shadow-none p-2 mb-2 bg-light">
              <h6>Diagnosticos de Remisión:</h6>
            </div>
            <div class="table-responsive">
              <table class="table table-sm table-striped">
                <thead class="table-dark">
                  <tr>
                    <th class="text-center" width="50">Codigo</th>
                    <th class="text-center" width="500">Diagnostico</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arrayDigRem" :key="index">
                    <td v-text="item.codigo"></td>
                    <td v-text="item.descripcion"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="shadow-none p-2 mb-2 bg-light">
              <h6>Impresión Diagnostica:</h6>
            </div>
            <button
              type="button"
              class="btn btn-primary btn-sm"
              @click="abrirModalDiagnosticos()"
              :disabled="editable == 0"
            >
              <i class="icon-plus"></i>
            </button>
            <hr />
            <div class="table-responsive">
              <table class="table table-sm table-striped">
                <thead class="table-dark">
                  <tr>
                    <th class="text-center" width="50">Opciones</th>
                    <th class="text-center" width="50">Codigo</th>
                    <th class="text-center" width="500">Diagnostico</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arryDiagIng" :key="index">
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="deleteRow(i,arryDiagIng)"
                        :disabled="editable == 0"
                      >
                        <i class="icon-trash"></i>
                      </button>
                    </td>
                    <td v-text="item.codigo"></td>
                    <td v-text="item.descripcion"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane" id="antFam">
            <div class="form-group col-12">
              <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="agregarAntFamiliar()"
                :disabled="editable == 0"
              >
                <i class="icon-plus"></i>
              </button>
            </div>
            <div class="table-responsive">
              <table class="table table-sm table-striped">
                <thead class="table-dark">
                  <tr>
                    <th width="50" class="text-center">Opciones</th>
                    <th width="100" class="text-center">Antecedente</th>
                    <th width="100" class="text-center">Parentesco</th>
                    <th width="500" class="text-center">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arrayAntFam" :key="index">
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="quitarFila(arrayAntFam)"
                        :disabled="editable == 0"
                      >
                        <i class="icon-trash"></i>
                      </button>
                    </td>
                    <td>
                      <select
                        class="form-control form-control-sm"
                        :disabled="editable == 0"
                        v-model="item.idAntFamiliar"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option
                          v-for="item in listaAntFam"
                          :key="item.id"
                          :value="item.id"
                          v-text="item.Descripcion"
                        ></option>
                      </select>
                    </td>
                    <td>
                      <select
                        class="form-control form-control-sm"
                        :disabled="editable == 0"
                        v-model="item.idParentesco"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option
                          v-for="item in listaAntParent"
                          :key="item.id"
                          :value="item.id"
                          v-text="item.Descripcion"
                        ></option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        :disabled="editable == 0"
                        v-model="item.detalle"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane" id="antPers">
            <div class="form-group col-12">
              <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="agregarAntPersonal()"
                :disabled="editable == 0"
              >
                <i class="icon-plus"></i>
              </button>
            </div>
            <div class="table-responsive">
              <table class="table table-sm table-striped">
                <thead class="table-dark">
                  <tr>
                    <th width="10" class="text-center">Opciones</th>
                    <th width="100" class="text-center">Antecedente</th>
                    <th width="500" class="text-center">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arrayAntPers" :key="index">
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="quitarFila(arrayAntPers)"
                        :disabled="editable == 0"
                      >
                        <i class="icon-trash"></i>
                      </button>
                    </td>
                    <td>
                      <select
                        class="form-control form-control-sm"
                        :disabled="editable == 0"
                        v-model="item.idAntPersonal"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option
                          v-for="item in listaAntPers"
                          :key="item.id"
                          :value="item.id"
                          v-text="item.Descripcion"
                        ></option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        :disabled="editable == 0"
                        v-model="item.detalle"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane" id="otrosAnt" v-if="idGenero == 9">
            <div class="form-row">
              <div class="form-group col-xs-12 col-xl-3 col-lg-4 col-md-4 col-sm-4">
                <label>Menarquia:</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-model="menarquia"
                  :disabled="editable == 0"
                />
              </div>
              <div class="form-group col-xs-12 col-xl-3 col-lg-4 col-md-4 col-sm-4">
                <label>Vida Sexual:</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-model="vidaSexual"
                  :disabled="editable == 0"
                />
              </div>
              <div class="form-group col-xs-12 col-xl-3 col-lg-4 col-md-4 col-sm-4">
                <label>Planifica:</label>
                <select
                  class="form-control form-control-sm"
                  data-live-search="true"
                  v-model="idPlanificar"
                  :disabled="editable == 0"
                >
                  <option selected :value="0" disabled="disabled">Seleccione</option>
                  <option selected :value="1">Si</option>
                  <option selected :value="2">No</option>
                </select>
              </div>
              <div class="form-group col-xs-12 col-xl-3 col-lg-4 col-md-4 col-sm-4">
                <label>Menopausea:</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-model="menopausea"
                  :disabled="editable == 0"
                />
              </div>
              <div class="shadow-none p-2 mb-2 bg-light col-12">
                <h6>F.U.R</h6>
              </div>
              <div class="form-group col-xs-12 col-xl-3 col-lg-4 col-md-4 col-sm-4">
                <label>Desconoce Fecha F.U.R:</label>
                <select
                  class="form-control form-control-sm"
                  data-live-search="true"
                  v-model="idDesconoceF"
                  :disabled="editable == 0"
                >
                  <option selected :value="0" disabled="disabled">Seleccione</option>
                  <option selected :value="1">Si</option>
                  <option selected :value="2">No</option>
                </select>
              </div>
              <div class="form-group col-xs-12 col-xl-3 col-lg-4 col-md-4 col-sm-4">
                <label>Otro Caso:</label>
                <input
                  type="date"
                  class="form-control form-control-sm"
                  v-model="otroCaso"
                  :disabled="editable == 0"
                />
              </div>
              <div class="form-group col-xs-12 col-xl-3 col-lg-4 col-md-4 col-sm-4">
                <label>Confiable:</label>
                <select
                  class="form-control form-control-sm"
                  data-live-search="true"
                  v-model="idConfiable"
                  :disabled="editable == 0"
                >
                  <option selected :value="0" disabled="disabled">Seleccione</option>
                  <option selected :value="1">Si</option>
                  <option selected :value="2">No</option>
                </select>
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="aspecto"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="pielFanela"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="craneo"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="ojo"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="oido"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="nariz"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="boca"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="garganta"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="cuello"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="toraxPulmon"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="corazon"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="senos"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="abdomen"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="genitales"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="examenRectal"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="Extremidades"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="neuroMuscular"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="osteoArticular"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="neurologia"
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
                   style="resize: none;"
                  :disabled="editable == 0"
                  v-model="dorso"
                ></textarea>
              </div>
            </div>
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
        v-bind:arrayAsignados="arryDiagIng"
      ></ModalGeneral>
    </div>
  </div>
</template>
<script src="../../Scripts/HistoriaClinica/IngresoMedico.js"></script>
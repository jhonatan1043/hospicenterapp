<template>
  <main class="main">
    <div class="container-fluid">
      <div class="card mt-2">
        <div class="card-header">Triage</div>
        <div class="card-body">
          <template v-if="listado==1">
            <button type="button" class="btn btn-secondary btn-sm" @click="mostrarFormulario()">
              <i class="icon-plu"></i>&nbsp;Nuevo
            </button>
            <hr />
            <div class="table-responsive">
              <table class="table table-hover table-bordered table-sm">
                <thead>
                  <tr>
                    <th width="20">Opciones</th>
                    <th width="20" hidden>id</th>
                    <th width="50">identificacion</th>
                    <th width="100">Paciente</th>
                    <th width="200">sintomas</th>
                    <th width="100">Nivel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in arraylistaTriage" :key="item.id">
                    <!-- Opciones -->
                    <td>
                      <!-- Button editar -->
                      <button
                        type="button"
                        class="btn btn-warning btn-sm"
                        @click="editarTriage(item.id)"
                      >
                        <i class="icon-pencil"></i>
                      </button> &nbsp;
                      <!-- Button eliminar -->
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="eliminarTriage(item.id)"
                      >
                        <i class="icon-trash"></i>
                      </button>
                    </td>
                    <td hidden v-text="item.id"></td>
                    <td v-text="item.identificacion"></td>
                    <td v-text="item.Paciente"></td>
                    <td v-text="item.sintoma"></td>
                    <td v-text="item.tipoTriage"></td>
                    <!-- fin de opciones -->
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <template v-else>
            <div class="card-body">
              <form method="post">
                <div class="form-row">
                  <template v-if="crearPaciente == 1">
                    <div class="form-group col-lg-3 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                      <label>Tipo de Identificación:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-focus
                        v-model="idTipoIdentificacion"
                        v-bind:style="idTipoIdentificacion == 0 ?'background-color: #FEF9E7':''"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option
                          v-for="item in arrayTipoIdent"
                          :key="item.id"
                          :value="item.id"
                          v-text="item.descripcion"
                        ></option>
                      </select>
                    </div>
                  </template>
                  <div class="form-group col-lg-3 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                    <label>Identificación:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="26"
                      placeholder="Identificacíon"
                      required
                      v-model="identificacion"
                      @keyup.enter="consultarPaciente()"
                      :disabled="existePaciente == 1"
                    />
                  </div>

                  <template v-if="crearPaciente == 0">
                    <div class="form-group col-lg-3 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                      <label>Nombre del paciente:</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        maxlength="100"
                        readonly
                        v-model="nombre"
                      />
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                      <label>Administradora:</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        maxlength="100"
                        readonly
                        v-model="administradora"
                      />
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                      <label>Genero:</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        readonly
                        v-model="genero"
                      />
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                      <label>Estado Civil:</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        readonly
                        v-model="estadoCivil"
                      />
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                      <label>Celular:</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        readonly
                        v-model="celular"
                      />
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                      <label>Fecha de Nacimiento:</label>
                      <input
                        type="date"
                        class="form-control form-control-sm"
                        v-model="fechaNacimiento"
                        readonly
                      />
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                      <label>Edad:</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        v-model="edad"
                        readonly
                      />
                    </div>
                  </template>
                  <!-- Creacion del paciente -->
                  <template v-else>
                    <div class="form-group col-lg-3 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                      <label>Primer Nombre:</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        maxlength="50"
                        ref="pNombre"
                        placeholder="Digite el primer nombre"
                        required
                        v-model="pNombre"
                        v-bind:style="pNombre == '' ?'background-color: #FEF9E7':''"
                      />
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                      <label>Segundo Nombre:</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        maxlength="50"
                        placeholder="Digite el Segundo nombre"
                        required
                        v-model="sNombre"
                      />
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                      <label>Primer Apellido:</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        maxlength="50"
                        placeholder="Digite el primer apellido"
                        required
                        v-model="pApellido"
                        v-bind:style="pApellido == '' ?'background-color: #FEF9E7':''"
                      />
                    </div>
                    <div class="form-group col-lg-3 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                      <label>Segundo Apellido:</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        maxlength="50"
                        placeholder="Digite el segundo apellido"
                        required
                        v-model="sApellido"
                        v-bind:style="sApellido == '' ?'background-color: #FEF9E7':''"
                      />
                    </div>
                  </template>
                  <div v-if="existePaciente == 0" class="form-group col-12">
                    <button class="btn btn-danger btn-sm" @click="cancelarRegistro()" type="button">
                      <i class="fa fa-arrow-circle-left"></i> Cancelar
                    </button>
                  </div>
                  <!-- -Fin Paciente- -->
                </div>
              </form>
            </div>
          </template>
        </div>
      </div>
      <template v-if="existePaciente == 1">
        <div class="card">
          <div class="card-body" id="formularioregistros">
            <form method="post">
              <div class="form-row">
                <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12 col-xl-4">
                  <label>Criterio del Sintoma:</label>
                  <select
                    class="form-control form-control-sm selectpicker"
                    required
                    v-model="criterioSintoma"
                    @change="cargarSintomas()"
                    v-bind:style="criterioSintoma == 0 ?'background-color: #FEF9E7':''"
                  >
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arrayCriterio"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>

                <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12 col-xl-4">
                  <label>Sintoma:</label>
                  <select
                    class="form-control form-control-sm selectpicker"
                    required
                    v-model="sintomas"
                    @change="cargarTriage()"
                    v-bind:style="sintomas == 0 ?'background-color: #FEF9E7':''"
                  >
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arraySintomas"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>

                <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12 col-xl-4">
                  <label>Nivel de Triage:</label>
                  <input
                    type="text"
                    class="form-control form-control-sm text-center"
                    readonly
                    v-model="nTriage"
                  />
                </div>

                <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12 col-xl-4">
                  <label>Origén de la Atención:</label>
                  <select
                    class="form-control form-control-sm selectpicker"
                    required
                    v-model="oAtencion"
                    v-bind:style="oAtencion == 0 ?'background-color: #FEF9E7':''"
                  >
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arrayCausaExterna"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>

                <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12 col-xl-4">
                  <label>Estado del Paciente:</label>
                  <select
                    class="form-control form-control-sm selectpicker"
                    required
                    v-model="ePaciente"
                    v-bind:style="ePaciente == 0 ?'background-color: #FEF9E7':''"
                  >
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arrayEstadoPacient"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>

                <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12 col-xl-4">
                  <label>Padece Alguna Alergia:</label>
                  <textarea
                    class="form-control form-control-sm"
                    v-model="pAlergia"
                    rows="1"
                    style="resize: none;"
                  />
                </div>

                <div class="form-group col-lg-12 col-md-6 col-sm-6 col-xs-12 py-4">
                  <ul class="nav nav-tabs">
                    <li class="nav-item">
                      <a class="nav-link active" href="#glasglow" data-toggle="tab">Glasglow</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#signoVitales" data-toggle="tab">Signos Vitales</a>
                    </li>
                  </ul>
                </div>
                <hr />

                <div class="tab-content container-fluid">
                  <div class="tab-pane active" id="glasglow">
                    <div class="form-group col-12">
                      <div class="table-responsive">
                        <table class="table table-bordered table-sm">
                          <thead>
                            <tr>
                              <th width="20">
                                <center>Glasglow</center>
                              </th>
                              <th width="100">
                                <center>Resultado</center>
                              </th>
                              <th width="20">
                                <center>Referencia</center>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Apertura Ocular:</td>
                              <td>
                                <select
                                  class="form-control form-control-sm selectpicker"
                                  required
                                  v-model="aOcular"
                                  v-bind:style="aOcular == 0 ?'background-color: #FEF9E7':''"
                                  @change="calcular()"
                                >
                                  <option selected :value="0" disabled="disabled">Seleccione</option>
                                  <option
                                    v-for="item in arrayRespOcular"
                                    :key="item.id"
                                    :value="item.valorAdicional"
                                    v-text="item.Descripcion"
                                  ></option>
                                </select>
                              </td>
                              <td
                                v-bind:style="nivelGlasglow == 1 ? 'background-color: #E74C3C':''"
                              >TCE Severo: 3-8</td>
                            </tr>
                            <tr>
                              <td>Apertura Verbal:</td>
                              <td>
                                <select
                                  class="form-control form-control-sm selectpicker"
                                  required
                                  v-model="aVerbal"
                                  v-bind:style="aVerbal == 0 ?'background-color: #FEF9E7':''"
                                  @change="calcular()"
                                >
                                  <option selected :value="0" disabled="disabled">Seleccione</option>
                                  <option
                                    v-for="item in arrayRespVerbal"
                                    :key="item.id"
                                    :value="item.valorAdicional"
                                    v-text="item.Descripcion"
                                  ></option>
                                </select>
                              </td>
                              <td
                                v-bind:style="nivelGlasglow == 2 ? 'background-color: #F7DC6F':''"
                              >TCE Moderado: 9-13</td>
                            </tr>
                            <tr>
                              <td>Apertura Motora:</td>
                              <td>
                                <select
                                  class="form-control form-control-sm selectpicker"
                                  required
                                  v-model="aMotora"
                                  v-bind:style="aMotora == 0 ?'background-color: #FEF9E7':''"
                                  @change="calcular()"
                                >
                                  <option selected :value="0" disabled="disabled">Seleccione</option>
                                  <option
                                    v-for="item in arrayRespMotora"
                                    :key="item.id"
                                    :value="item.valorAdicional"
                                    v-text="item.Descripcion"
                                  ></option>
                                </select>
                              </td>
                              <td
                                v-bind:style="nivelGlasglow == 3 ? 'background-color: #58D68D':''"
                              >TCE leve: 14-15</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <i>El resultado del Clasglow es: {{msgClasglow}}</i>
                    </div>
                  </div>
                  <div class="tab-pane" id="signoVitales">
                    <div class="row">
                      <div class="form-group col-lg-2 col-md-2 col-sm-2 col-xs-12 col-xl-2">
                        <label>Peso(KG):</label>
                        <input
                          type="number"
                          class="form-control form-control-sm text-center"
                          maxlength="20"
                          v-model="peso"
                          v-bind:style="peso == '' ?'background-color: #FEF9E7':''"
                          v-on:blur="calcular()"
                        />
                      </div>
                      <div class="form-group col-lg-2 col-md-2 col-sm-2 col-xs-12 col-xl-2">
                        <label>Talla(M):</label>
                        <input
                          type="number"
                          class="form-control form-control-sm text-center"
                          maxlength="20"
                          v-model="talla"
                          v-bind:style="talla == '' ?'background-color: #FEF9E7':''"
                          v-on:blur="calcular()"
                        />
                      </div>
                      <div class="form-group col-lg-2 col-md-2 col-sm-2 col-xs-12 col-xl-2">
                        <label>F.Cardiaca:</label>
                        <input
                          type="number"
                          class="form-control form-control-sm text-center"
                          maxlength="20"
                          v-model="fCard"
                          v-bind:style="fCard == '' ?'background-color: #FEF9E7':''"
                        />
                      </div>
                      <div class="form-group col-lg-2 col-md-2 col-sm-2 col-xs-12 col-xl-2">
                        <label>F.Respiratoria:</label>
                        <input
                          type="number"
                          class="form-control form-control-sm text-center"
                          maxlength="20"
                          v-model="fResp"
                          v-bind:style="fResp == '' ?'background-color: #FEF9E7':''"
                        />
                      </div>
                      <div class="form-group col-lg-2 col-md-2 col-sm-2 col-xs-12 col-xl-2">
                        <label>Temperatura:</label>
                        <input
                          type="number"
                          class="form-control form-control-sm text-center"
                          maxlength="20"
                          v-model="temp"
                          v-bind:style="temp == '' ?'background-color: #FEF9E7':''"
                        />
                      </div>
                      <div class="form-group col-lg-2 col-md-2 col-sm-2 col-xs-12 col-xl-2">
                        <label>Pulso</label>
                        <input
                          type="number"
                          class="form-control form-control-sm text-center"
                          maxlength="20"
                          v-model="pulso"
                          v-bind:style="pulso == '' ?'background-color: #FEF9E7':''"
                        />
                      </div>
                      <div class="form-group col-lg-2 col-md-2 col-sm-2 col-xs-12 col-xl-2">
                        <label>Sistolica:</label>
                        <input
                          type="number"
                          class="form-control form-control-sm text-center"
                          maxlength="20"
                          v-model="tasi"
                          v-bind:style="tasi == '' ?'background-color: #FEF9E7':''"
                          v-on:blur="calcular()"
                        />
                      </div>
                      <div class="form-group col-lg-2 col-md-2 col-sm-2 col-xs-12 col-xl-2">
                        <label>Diactolica</label>
                        <input
                          type="number"
                          class="form-control form-control-sm text-center"
                          maxlength="20"
                          v-model="tadi"
                          v-bind:style="tadi == '' ?'background-color: #FEF9E7':''"
                          v-on:blur="calcular()"
                        />
                      </div>
                      <div class="form-group col-lg-2 col-md-2 col-sm-2 col-xs-12 col-xl-2">
                        <label>Pulpils</label>
                        <input
                          type="text"
                          class="form-control form-control-sm text-center"
                          maxlength="50"
                          v-model="pulpils"
                          v-bind:style="pulpils == '' ?'background-color: #FEF9E7':''"
                        />
                      </div>
                      <div class="form-group col-lg-2 col-md-2 col-sm-2 col-xs-12 col-xl-2">
                        <label>P.Abdominal:</label>
                        <input
                          type="number"
                          class="form-control form-control-sm text-center"
                          v-model="perimetroAbdominal"
                          v-bind:style="perimetroAbdominal == '' ?'background-color: #FEF9E7':''"
                        />
                      </div>
                      <div class="form-group col-lg-2 col-md-2 col-sm-2 col-xs-12 col-xl-2">
                        <label>P.Cefalico:</label>
                        <input
                          type="number"
                          class="form-control form-control-sm text-center"
                          v-model="perimetroCefalico"
                          v-bind:style="perimetroCefalico == '' ?'background-color: #FEF9E7':''"
                        />
                      </div>
                    </div>
                    <hr />
                    <i>
                      IMC: <i :style="{color: colorImc}">{{msgImc}}</i>&nbsp;|&nbsp;
                      Grado de Presión: <i :style="{color: colorGs}">{{msgGp}}</i>&nbsp;|&nbsp;
                      S.C: {{msgSc}}
                    </i>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="card-footer">
            <div
              class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12"
              style="margin-top: 10px;"
            >
              <button
                v-if="accion==0"
                class="btn btn-success mt-20 btn-sm"
                type="button"
                @click="guardarTriage()"
              >
                <i class="fa fa-save"></i> Guardar
              </button>
              <button
                v-else
                class="btn btn-success mt-40 btn-sm"
                type="button"
                @click="actualizarTriage()"
              >
                <i class="fa fa-save"></i> Actualizar
              </button>
              <button class="btn btn-danger btn-sm" @click="cancelarRegistro()" type="button">
                <i class="fa fa-arrow-circle-left"></i> Cancelar
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<script src="../../Scripts/Asistencial/Triage.js" ></script>
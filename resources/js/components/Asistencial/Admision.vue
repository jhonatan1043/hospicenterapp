<template>
  <main :class="[ingreso != 1 ? 'main' : '']">
    <div class="container-fluid">
      <template v-if="listado==1">
        <div class="card mt-2">
          <div class="card-header">
            <h5>Lista de admision</h5>
          </div>
          <div class="card-body">
            <button type="button" class="btn btn-secondary btn-sm" @click="mostrarFormulario()">
              <i class="icon-plus"></i>&nbsp;Nuevo
            </button>
            <hr />
            <div class="table-responsive">
              <table class="table table-bordered table-sm table-hover">
                <thead>
                  <tr>
                    <th width="100">Opciones</th>
                    <th width="50">F.Admisión</th>
                    <th width="200">Nombre</th>
                    <th width="50">Indetificación</th>
                    <th width="50">Genero</th>
                    <th width="50">Regimen</th>
                    <th width="50">Afiliación</th>
                    <th width="400">Administradora</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in arrayAdmision" :key="item.id">
                    <td>
                      <button
                        type="button"
                        class="btn btn-warning btn-sm"
                        @click="cargarAdmision(item.id)"
                      >
                        <i class="icon-pencil"></i>
                      </button> &nbsp;
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="anularAdmision(item.id)"
                      >
                        <i class="icon-trash"></i>
                      </button>
                    </td>
                    <td v-text="item.fechaAdmision"></td>
                    <td v-text="item.Paciente"></td>
                    <td v-text="item.identificacion"></td>
                    <td v-text="item.Genero"></td>
                    <td v-text="item.Regimen"></td>
                    <td v-text="item.Afiliacion"></td>
                    <td v-text="item.Eps"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="listado==0">
        <div class="card mt-3">
          <div class="card-header">
            <h5>Admisión</h5>
          </div>
          <div class="card-body">
            <form>
              <div class="form-row">
                <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                  <label>Documento:</label>
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      v-model="identificacion"
                      placeholder="Digite el numero de documento"
                      maxlength="26"
                      v-bind:style="identificacion == '' ?'background-color: #FEF9E7':''"
                      @keyup.enter="verificarPaciente"
                      :readonly="idAdmision!=0"
                    />
                    <span class="input-group-btn">
                      <button
                        class="btn btn-primary btn-sm"
                        type="button"
                        @click="abrirModalPaciente"
                        :disabled="idAdmision!=0"
                      >Buscar</button>
                    </span>
                  </div>
                </div>

                <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                  <label>Paciente:</label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="Nombre del paciente"
                    required
                    v-model="nombrePaciente"
                    readonly
                  />
                </div>

                <div class="form-group col-2">
                  <label>Fecha admision:</label>
                  <input
                    type="date"
                    class="form-control form-control-sm"
                    required
                    v-model="fechaAdmision"
                    readonly
                    v-bind:style="fechaAdmision == '' ?'background-color: #FEF9E7':''"
                  />
                </div>

                <div class="form-group col-2">
                  <label>Hora:</label>
                  <input
                    type="time"
                    class="form-control form-control-sm"
                    required
                    v-model="horaAdmision"
                    readonly
                    v-bind:style="horaAdmision == '' ?'background-color: #FEF9E7':''"
                  />
                </div>

                <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                  <label>Administradora:</label>
                  <select
                    class="form-control form-control-sm"
                    data-live-search="true"
                    required
                    v-model="idAdministradora"
                    v-bind:style="idAdministradora == 0 ?'background-color: #FEF9E7':''"
                    @change="cargarComboContrato"
                  >
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arrayAdministradora"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>

                <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                  <label>Contrato:</label>
                  <select
                    class="form-control form-control-sm selectpicker"
                    data-live-search="true"
                    required
                    v-model="idContrato"
                    v-bind:style="idContrato == 0 ?'background-color: #FEF9E7':''"
                  >
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arrayContrato"
                      :key="item.idContrato"
                      :value="item.idContrato"
                      v-text="item.contrato"
                    ></option>
                  </select>
                </div>

                <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                  <label>Especialista:</label>
                  <select
                    class="form-control form-control-sm selectpicker"
                    data-live-search="true"
                    required
                    :disabled="idAdmision!=0"
                    v-model="idEspecialista"
                    v-bind:style="idEspecialista == 0 ?'background-color: #FEF9E7':''"
                  >
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arrayEspecialidad"
                      :key="item.idTercero"
                      :value="item.idTercero"
                      v-text="item.Tercero"
                    ></option>
                  </select>
                </div>

                <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                  <label>Estado Civil:</label>
                  <select
                    class="form-control form-control-sm selectpicker"
                    data-live-search="true"
                    required
                    :disabled="idAdmision!=0"
                    v-model="idEstadoCivil"
                  >
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arrayEstado"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>
                <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                  <label>Edad:</label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="Edad"
                    required
                    v-model="edad"
                    readonly
                    
                  />
                </div>

                <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                  <label>Genero:</label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="Genero"
                    required
                    v-model="genero"
                    readonly
                  />
                </div>
                <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                  <label>Tipo de Regimen:</label>
                  <select
                    class="form-control form-control-sm selectpicker"
                    data-live-search="true"
                    required
                    v-model="idRegimen"
                    @change="cargarComboAfiliacion"
                    :disabled="idAdmision!=0"
                    v-bind:style="idRegimen == 0 ?'background-color: #FEF9E7':''"
                  >
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arrayRegimen"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>

                <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                  <label>Tipo de Afiliación:</label>
                  <select
                    class="form-control form-control-sm selectpicker"
                    data-live-search="true"
                    required
                    :disabled="idAdmision!=0"
                    v-model="idAfiliacion"
                    v-bind:style="idAfiliacion == 0 ?'background-color: #FEF9E7':''"
                  >
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arrayAfiliacion"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>

                <div class="form-group col-12">
                  <ul class="nav nav-tabs">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        href="#responsable"
                        data-toggle="tab"
                      >Acompañante y/o responsable</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#documentos" data-toggle="tab">Documentos</a>
                    </li>
                  </ul>
                </div>

                <div class="tab-content container-fluid">
                  <div class="tab-pane active" id="responsable">
                    <button type="button" class="btn btn-primary btn-sm" @click="agregarFilas()">
                      <i class="icon-plus"></i>
                    </button>
                    <hr />
                    <div class="table-responsive">
                      <table class="table table-bordered table-sm table-hover">
                        <thead>
                          <tr>
                            <th width="50">Quitar</th>
                            <th width="60">Responsable</th>
                            <th width="200">Tipo documento</th>
                            <th width="150">Documento</th>
                            <th>Nombre</th>
                            <th width="160">Telefono</th>
                            <th>Direccion</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(items,i) in arrayResponsable" :key="i">
                            <td>
                              <button
                                type="button"
                                class="btn btn-danger btn-sm"
                                data-toggle="modal"
                                data-target="#modalEliminar"
                                @click="deleteRow(i, arrayResponsable)"
                              >
                                <i class="icon-trash"></i>
                              </button>
                            </td>
                            <td>
                              <input
                                type="checkBox"
                                class="form-control form-control-sm mt-2"
                                required
                                v-model="items.responsable"
                                v-bind:style="items.responsable == 0 ?'background-color: #FEF9E7':''"
                              />
                            </td>
                            <td>
                              <select
                                class="form-control form-control-sm selectpicker"
                                data-live-search="true"
                                required
                                v-model="items.tipoDocumento"
                                v-bind:style="items.tipoDocumento == 0 ?'background-color: #FEF9E7':''"
                              >
                                <option selected :value="0" disabled="disabled">Seleccione</option>
                                <option
                                  v-for="item in arrayTipoIdent"
                                  :key="item.id"
                                  :value="item.id"
                                  v-text="item.descripcion"
                                ></option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="number"
                                class="form-control form-control-sm"
                                maxlength="50"
                                placeholder="Digite documento"
                                required
                                v-model="items.documento"
                                v-bind:style="items.documento == 0 ?'background-color: #FEF9E7':''"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control form-control-sm"
                                maxlength="50"
                                placeholder="Digite el nombre"
                                required
                                v-model="items.nombre"
                                v-bind:style="items.nombre == 0 ?'background-color: #FEF9E7':''"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                class="form-control form-control-sm"
                                maxlength="50"
                                placeholder="Digite telefono"
                                required
                                v-model="items.telefono"
                                v-bind:style="items.telefono == 0 ?'background-color: #FEF9E7':''"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control form-control-sm"
                                maxlength="50"
                                placeholder="Digite direccion"
                                required
                                v-model="items.direccion"
                                v-bind:style="items.direccion == 0 ?'background-color: #FEF9E7':''"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <small
                      v-if="errorResponsable"
                      v-text="msgResponsable"
                      class="form-text text-white badge badge-danger"
                    ></small>
                    <small
                      v-if="errorEstado && !arrayResponsable.length"
                      v-text="msg"
                      class="form-text text-white badge badge-danger"
                    ></small>
                  </div>
                  <div v-if="idAdmision==0" class="tab-pane" id="documentos">
                    <div class="row">
                      <div class="col-6">
                        <div class="form-group col-12">
                          <label>Tipo de Documento:</label>
                          <select
                            class="form-control form-control-sm"
                            data-live-search="true"
                            required
                            v-model="idDocumento"
                            v-bind:style="idDocumento == 0 ?'background-color: #FEF9E7':''"
                          >
                            <option selected :value="0" disabled="disabled">Seleccione</option>
                            <option
                              v-for="item in arrayDocumento"
                              :key="item.id"
                              :value="item.id"
                              v-text="item.Descripcion"
                            ></option>
                          </select>
                          <small
                            v-if="errorEstado && idRegimen==0"
                            v-text="arrayErrores[4]"
                            class="form-text text-white badge badge-danger"
                          ></small>
                        </div>
                      </div>
                      <div class="form-group col-6">
                        <label>Seleccione un archivo:</label>
                        <input
                          type="file"
                          ref="file"
                          class="form-control form-control-sm btn btn-primary"
                          maxlength="50"
                          placeholder="Genero"
                          required
                          @change="getArchivo"
                          readonly
                        />
                      </div>
                      <div class="col-12">
                        <legend>
                          <h6>Documentos:</h6>
                        </legend>
                        <div class="table-responsive">
                          <table class="table table-bordered table-striped table-sm">
                            <thead>
                              <tr>
                                <th width="20">Id</th>
                                <th>Descripcion</th>
                                <th width="20">Archivo</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </div>
                      <div class="form-group col-12">
                        <button
                          v-if="accion==0"
                          class="btn btn-primary btn-sm mt-20"
                          type="button"
                          @click="guardarPDF()"
                        >
                          <i class="fa fa-plus"></i> Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="card-footer">
            <div class="form-group col-12">
              <button
                v-if="accion==0"
                class="btn btn-success btn-sm mt-20"
                type="button"
                @click="guardarAdmision()"
              >
                <i class="fa fa-save"></i> Guardar
              </button>
              <button
                v-else
                class="btn btn-success btn-sm mt-40"
                type="button"
                @click="actualizarAdmision()"
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
     <template v-if="listado==2">
       <componentIngreso admision="1"
                         ingresoOn="0">
       </componentIngreso>
      </template>
    <template v-if="modal">
      <div
        class="modal fade"
        tabindex="-1"
        :class="{'mostrar' : modal}"
        role="dialog"
        aria-labelledby="myModalLabel"
        style="display: none;"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" v-text="'Paciente'"></h4>
              <button type="button" class="close" @click="cancelarModal()" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <componentPaciente admision="1" :identiPaciente="identificacion"></componentPaciente>
            </div>			
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-sm" @click="cancelarModal()">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </template>
   
    <ModalGeneral
      v-if="modalPaciente"
      v-bind:objTitulo="objTituloPaciente"
      tituloModal="Busqueda de Paciente"
      url="/admision/consultarPaciente"
      v-bind:arrayCampos="arrayCampos"
      :modal="modalPaciente"
      @datos="arrayDatos = $event"
      v-on:llamarMetodo="cerrarModalPaciente"
      v-on:llamarFuncion="agregarPaciente"
      v-bind:arrayAsignados="arrayPaciente"
    ></ModalGeneral>
  </main>
</template>
   
<script src="../../Scripts/Asistencial/Admision.js" ></script>

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
  max-width: 70%;
}
</style>
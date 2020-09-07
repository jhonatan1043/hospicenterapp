<template>
  <main :class="[admision != 1 ? 'main' : '']">
    <div class="container-fluid">
      <template v-if="listado==0">
        <div class="card mt-2">
          <div class="card-header">
            <h5>Ingreso de pacientes</h5>
          </div>
          <div class="card-body">
            <div class="form-row">
              <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                <label>Documento:</label>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control form-control-sm"
                    v-model="documento"
                    placeholder="Digite el numero de documento"
                    maxlength="26"
                    :disabled="idIngreso != 0"
                    v-bind:style="documento == '' ?'background-color: #FEF9E7':''"
                    @keyup.enter="verificarAdmision"
                  />
                  <span class="input-group-btn">
                    <button
                      class="btn btn-primary btn-sm"
                      type="button"
                      @click="abrirModalPaciente"
                      :disabled="idIngreso != 0"
                    >Buscar</button>
                  </span>
                </div>
              </div>
              <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                <label>Nombre del paciente:</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Nombre de paciente"
                  v-model="nombrePaciente"
                  readonly
                />
              </div>

              <div class="form-group col-2">
                <label>Fecha ingreso:</label>
                <input
                  type="date"
                  class="form-control form-control-sm"
                  placeholder="Seleccione una fecha"
                  required
                  v-model="fechaIngreso"
                  readonly
                  v-bind:style="fechaIngreso == '' ?'background-color: #FEF9E7':''"
                />
              </div>

              <div class="form-group col-2">
                <label>Hora Ingreso:</label>
                <input
                  type="time"
                  class="form-control form-control-sm"
                  required
                  v-model="horaIngreso"
                  readonly
                  v-bind:style="horaIngreso == '' ?'background-color: #FEF9E7':''"
                />
              </div>

              <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                <label>Tipo de regimen:</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  maxlength="50"
                  placeholder="Tipo de regimen"
                  disabled
                  v-model="tipoRegimen"
                />
              </div>
              <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                <label>Tipo de afiliación:</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  maxlength="50"
                  placeholder="Tipo de afiliación"
                  disabled
                  v-model="tipoAfiliacion"
                />
              </div>
              <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xl-4">
                <label>Administradora:</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Administradora"
                  disabled
                  v-model="administradora"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h5>Complementos</h5>
          </div>
          <div class="card-body">
            <div class="form-row">
              <div class="col col-lg-3 col-md-12 col-sm-12 col-xs-12 col-xl-3">
                <label>Via de ingreso:</label>
                <select
                  class="form-control form-control-sm selectpicker"
                  data-live-search="true"
                  required
                  v-model="idViaIngreso"
                  v-bind:style="idViaIngreso == 0 ?'background-color: #FEF9E7':''"
                >
                  <option selected :value="0" disabled="disabled">Seleccione</option>
                  <option
                    v-for="item in arrayViaIngreso"
                    :key="item.Id"
                    :value="item.Id"
                    v-text="item.Descripcion"
                  ></option>
                </select>
              </div>
              <div class="col col-lg-3 col-md-12 col-sm-12 col-xs-12 col-xl-3">
                <label>Causa externa:</label>
                <select
                  class="form-control form-control-sm selectpicker"
                  data-live-search="true"
                  required
                  v-model="idCausaExterna"
                  v-bind:style="idCausaExterna == 0 ?'background-color: #FEF9E7':''"
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
              <div class="col col-lg-3 col-md-12 col-sm-12 col-xs-12 col-xl-3">
                <label>servicio:</label>
                <select
                  class="form-control form-control-sm selectpicker"
                  data-live-search="true"
                  required
                  v-model="idServicio"
                  @change="cargarArea()"
                  v-bind:style="idServicio == 0 ?'background-color: #FEF9E7':''"
                >
                  <option selected :value="0" disabled="disabled">Seleccione</option>
                  <option
                    v-for="item in arrayServicio"
                    :key="item.idServicio"
                    :value="item.idServicio"
                    v-text="item.descripcion"
                  ></option>
                </select>
              </div>
              <div class="col col-lg-3 col-md-12 col-sm-12 col-xs-12 col-xl-3">
                <label>Area:</label>
                <select
                  class="form-control form-control-sm selectpicker"
                  data-live-search="true"
                  required
                  v-model="idArea"
                  @change="cargarCama()"
                  v-bind:style="idArea == 0 ?'background-color: #FEF9E7':''"
                >
                  <option selected :value="0" disabled="disabled">Seleccione</option>
                  <option
                    v-for="item in arrayArea"
                    :key="item.idEntorno"
                    :value="item.idEntorno"
                    v-text="item.descripcion"
                  ></option>
                </select>
              </div>
              <div class="col col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <label>Cama:</label>
                <select
                  class="form-control form-control-sm selectpicker"
                  data-live-search="true"
                  required
                  v-model="idCama"
                  v-bind:style="idCama == 0 ?'background-color: #FEF9E7':''"
                >
                  <option selected :value="0" disabled="disabled">Seleccione</option>
                  <option
                    v-for="item in arrayCama"
                    :key="item.idCama"
                    :value="item.idCama"
                    v-text="item.descripcion"
                  ></option>
                </select>
              </div>
              <div class="col col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <label>Institución:</label>
                <select
                  class="form-control form-control-sm selectpicker"
                  data-live-search="true"
                  required
                  v-model="idInstitucion"
                  v-bind:style="idInstitucion == 0 ?'background-color: #FEF9E7':''"
                >
                  <option selected :value="0" disabled="disabled">Seleccione</option>
                  <option
                    v-for="item in arrayInstitucion"
                    :key="item.id"
                    :value="item.id"
                    v-text="item.Descripcion"
                  ></option>
                </select>
              </div>
              <div class="col col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <label>Numero de autorización:</label>
                <input
                  type="number"
                  class="form-control form-control-sm"
                  maxlength="50"
                  placeholder="Digite el numero de autorización"
                  required
                  v-model="numeroAutorizacion"
                />
              </div>
              <legend class="mt-5">
                <h6>Diagnostico de ingreso</h6>
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="abrirModalDiagnosticos()"
                >
                  <i class="icon-plus"></i>
                </button>
                <hr />
              </legend>
              <small
                v-if="estadoError"
                v-text="msg"
                class="form-text text-white badge badge-danger"
              ></small>
              <table class="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th width="50">Quitar</th>
                    <th width="50">Id</th>
                    <th width="50">Código</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,i) in arrayDiagnosticos" :key="i">
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        data-toggle="modal"
                        data-target="#modalEliminar"
                        @click="deleteRow(i,arrayDiagnosticos)"
                      >
                        <i class="icon-trash"></i>
                      </button>
                    </td>
                    <td v-text="item.id"></td>
                    <td v-text="item.codigo"></td>
                    <td v-text="item.descripcion"></td>
                  </tr>
                </tbody>
              </table>
              <br />
            </div>
          </div>
          <div class="card-footer">
            <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <button
                v-if="accion==0"
                class="btn btn-success btn-sm mt-20"
                type="button"
                @click="guardarIngreso()"
              >
                <i class="fa fa-save"></i> Guardar
              </button>
              <button
                v-else
                class="btn btn-success btn-sm mt-40"
                type="button"
                @click="guardarIngreso()"
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
      <template v-else-if="listado==1">
        <div class="card mt-3">
          <div class="card-header">
            <h5>Lista de ingreso</h5>
          </div>
          <div class="card-body">
            <button type="button" class="btn btn-secondary btn-sm" @click="mostrarFormulario">
              <i class="icon-plus"></i>&nbsp;Nuevo
            </button>
            <hr />
            <table class="table table-bordered table-sm">
              <thead class="shadow-none p-2 mb-2 bg-light">
                <tr>
                  <th width="100">Opciones</th>
                  <th width="200">Paciente</th>
                  <th width="100">servicio</th>
                  <th width="100">Causa externa</th>
                  <th width="100">Institucion</th>
                  <th width="100">Via ingreso</th>
                  <th width="100">Cama</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in arrayIngreso" :key="index">
                  <td>
                    <button
                      type="button"
                      class="btn btn-warning btn-sm"
                      @click="cargarIngreso(item.id)"
                    >
                      <i class="icon-pencil"></i>
                    </button> &nbsp;
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="anularIngreso(item.id)"
                    >
                      <i class="icon-trash"></i>
                    </button>
                  </td>
                  <td v-text="item.Paciente"></td>
                  <td v-text="item.Entorno"></td>
                  <td v-text="item.CausaExterna"></td>
                  <td v-text="item.Institucion"></td>
                  <td v-text="item.ViaIngreso"></td>
                  <td v-text="item.Cama"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </template>
     <template v-if="listado==2">
      <componentAdmision ingreso="1"> </componentAdmision>
     </template>
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
        v-bind:arrayAsignados="arrayDiagnosticos"
      ></ModalGeneral>
    </div>
    <ModalGeneral
      v-if="modalPaciente"
      v-bind:objTitulo="objTituloPaciente"
      tituloModal="Busqueda de adminisión"
      url="/ingreso/busquedaAdmision"
      v-bind:arrayCampos="arrayCampos"
      :modal="modalPaciente"
      @datos="arrayDatos = $event"
      v-on:llamarMetodo="cerrarModalPaciente"
      v-on:llamarFuncion="agregarPaciente"  
    ></ModalGeneral>
    
  </main>
</template>

<script src="../../Scripts/Asistencial/Ingreso.js" ></script>

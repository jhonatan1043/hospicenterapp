<template>
  <div :class="[admision != 1 ? 'main' : '']">
    <div class="container-fluid">
      <div class="card mt-2">
        <div class="card-header">Paciente</div>
        <div class="card-body">
          <template v-if="listado==1 && admision != 1">
            <button type="button" class="btn btn-secondary btn-sm" @click="mostrarFormulario()">
              <i class="icon-plus"></i>&nbsp;Nuevo
            </button>
            <hr />
            <div class="table-responsive">
              <table class="table table-bordered table-hover table-sm">
                <thead>
                  <tr>
                    <th width="20">Opciones</th>
                    <th width="20">Identificación</th>
                    <th width="100">Paciente</th>
                    <th width="50">Dirección</th>
                    <th width="10">Telefono</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in listaReg" :key="item.id">
                    <td>
                      <button
                        type="button"
                        class="btn btn-warning btn-sm"
                        @click="cargarPaciente(item.id)"
                      >
                        <i class="icon-pencil"></i>
                      </button> &nbsp;
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="eliminarPaciente(item.id)"
                      >
                        <i class="icon-trash"></i>
                      </button>
                    </td>
                    <td v-text="item.identificacion"></td>
                    <td v-text="item.Paciente"></td>
                    <td v-text="item.direccion"></td>
                    <td v-text="item.telefono"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <template v-else-if="listado==0 || admision==1">
            <div class="card-body" id="formularioregistros">
              <form name="formulario" id="formulario" method="POST">
                <div class="form-row">
                  <div class="shadow-none p-2 mb-2 bg-light col-12">
                    <h6>Datos Basico:</h6>
                  </div>

                  <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                    <label>Tipo de Identificación:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
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
                  <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                    <label>Identificación:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="26"
                      placeholder="Digite la Identificacíon"
                      required
                      v-model="identificacion"
                      @keyup.enter="verificarPacienteTriage"
                      :disabled="admision == 1"
                      v-bind:style="identificacion == 0 ?'background-color: #FEF9E7':''"
                    />
                  </div>
                  <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                    <label>Genero:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idGenero"
                      v-bind:style="idGenero == 0 ?'background-color: #FEF9E7':''"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option
                        v-for="item in arrayGenero"
                        :key="item.id"
                        :value="item.id"
                        v-text="item.Descripcion"
                      ></option>
                    </select>
                  </div>
                  <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                    <label>Fecha de Nacimiento:</label>
                    <input
                      type="date"
                      class="form-control form-control-sm"
                      required
                      v-model="fechaNacimiento"
                      v-bind:style="fechaNacimiento == 0 ?'background-color: #FEF9E7':''"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                    <label>Primer Apellido:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="50"
                      placeholder="Digite el primer apellido"
                      required
                      v-model="pApellido"
                      v-bind:style="pApellido == 0 ?'background-color: #FEF9E7':''"
                    />
                  </div>
                  <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                    <label>Segundo Apellido:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="50"
                      placeholder="Digite el segundo apellido"
                      required
                      v-model="sApellido"
                      v-bind:style="sApellido == 0 ?'background-color: #FEF9E7':''"
                    />
                  </div>
                  <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                    <label>Primer Nombre:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="50"
                      placeholder="Digite el primer nombre"
                      required
                      v-model="pNombre"
                      v-bind:style="pNombre == 0 ?'background-color: #FEF9E7':''"
                    />
                  </div>
                  <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
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
                  <div class="shadow-none p-2 mb-2 bg-light col-12">
                    <h6>Datos de Residencia:</h6>
                  </div>
                  <div class="form-group col-lg-2 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                    <label>Pais:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idPais"
                      @change="cargarComboDepartamento"
                      v-bind:style="idPais == 0 ?'background-color: #FEF9E7':''"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option
                        v-for="itemPais in arrayPais"
                        :key="itemPais.idPais"
                        :value="itemPais.idPais"
                        v-text="itemPais.descripcion"
                      ></option>
                    </select>
                  </div>
                  <div class="form-group col-lg-2 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                    <label>Departamento:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idDepartamento"
                      @change="cargarComboMunicipio"
                      v-bind:style="idDepartamento == 0 ?'background-color: #FEF9E7':''"
                    >
                      >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option
                        v-for="itemDepartamento in arrayDepartamento"
                        :key="itemDepartamento.idDepartamento"
                        :value="itemDepartamento.idDepartamento"
                        v-text="itemDepartamento.descripcion"
                      ></option>
                    </select>
                  </div>
                  <div class="form-group col-lg-2 col-md-4 col-sm-4 col-xs-12 col-xl-3">
                    <label>Municipio:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idMunicipio"
                      v-bind:style="idMunicipio == 0 ?'background-color: #FEF9E7':''"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option
                        v-for="itemMunicipio in arrayMunicipio"
                        :key="itemMunicipio.idMunicipio"
                        :value="itemMunicipio.idMunicipio"
                        v-text="itemMunicipio.descripcion"
                      ></option>
                    </select>
                  </div>
                  <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                    <label>Direccion:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="50"
                      placeholder="Digite la direccion"
                      v-model="direccion"
                      v-bind:style="direccion == '' ?'background-color: #FEF9E7':''"
                    />
                  </div>
                  <div class="form-group col-lg-2 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                    <label>Telefono:</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      placeholder="Digite el telefono"
                      v-model="telefono"
                    />
                  </div>
                  <div class="form-group col-lg-2 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                    <label>Celular:</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      placeholder="Digite el celular"
                      v-model="celular"
                      v-bind:style="celular == '' ?'background-color: #FEF9E7':''"
                    />
                  </div>
                  <div class="form-group col-lg-2 col-md-6 col-sm-6 col-xs-12 col-xl-3">
                    <label>Email:</label>
                    <input
                      type="email"
                      class="form-control form-control-sm"
                      maxlength="50"
                      placeholder="Digite el email"
                      v-model="email"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="card-footer">
              <div class="form-row">
                <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <button
                    v-if="accion==0"
                    class="btn btn-success mt-20 btn-sm"
                    type="button"
                    @click="guardarPaciente()"
                  >
                    <i class="fa fa-save"></i> Guardar
                  </button>
                  <button
                    v-else
                    class="btn btn-success mt-40 btn-sm"
                    type="button"
                    @click="actualizarPaciente()"
                  >
                    <i class="fa fa-save"></i> Actualizar
                  </button>
                  <button v-if="admision!=1" class="btn btn-danger btn-sm" @click="cancelarRegistro()" type="button">
                    <i class="fa fa-arrow-circle-left"></i> Cancelar
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../Scripts/Asistencial/Paciente.js" ></script>
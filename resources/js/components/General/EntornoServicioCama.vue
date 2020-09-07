<template>
  <main class="main">
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <h5>Servicio</h5>
        </div>
        <div class="card-body">
          <template v-if="listado == 0">
            <button type="button" class="btn btn-secondary btn sm" @click="mostrarFormulario()">
              <i class="fa fa-plus-circle"></i> Nuevo
            </button>
            <hr />
            <div class="table-responsive">
              <table class="table table-sm table-bordered table-hover">
                <thead>
                  <tr>
                    <th width="20" class="text-center">Opciones</th>
                    <th width="10" class="text-center">Codigo</th>
                    <th width="100" class="text-center">Cama</th>
                    <th width="100" class="text-center">Servicio</th>
                    <th width="100" class="text-center">Entorno</th>
                    <th width="100" class="text-center">Piso</th>
                    <th width="100" class="text-center">Habitación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arrayRegListar" :key="index">
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-warning btn-sm"
                        @click="editarRegistro(item.id)"
                      >
                        <i class="icon-pencil"></i>
                      </button> &nbsp;
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="anularEntornoServicioCama(item.id)"
                      >
                        <i class="icon-trash"></i>
                      </button>
                    </td>
                    <td class="text-center" v-text="item.id"></td>
                    <td class="text-center" v-text="item.cama"></td>
                    <td class="text-center" v-text="item.servicio"></td>
                    <td class="text-center" v-text="item.entorno"></td>
                    <td class="text-center" v-text="item.piso"></td>
                    <td class="text-center" v-text="item.habitacion"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <template v-else>
            <form>
              <div class="form-row">
                <div class="form-group col-xs-12 col-xl-4 col-sm-3 col-md-6">
                  <label>Cama:</label>
                  <select class="form-control selectpicker" v-model="idCama">
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arraycama"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>
                <div class="form-group col-xs-12 col-xl-4 col-sm-3 col-md-6">
                  <label>Servicio:</label>
                  <select class="form-control selectpicker" v-model="idServicio">
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arrayServicio"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>
                <div class="form-group col-xs-12 col-xl-4 col-sm-3 col-md-6">
                  <label>Entorno:</label>
                  <select class="form-control selectpicker" v-model="idEntorno">
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arrayEntorno"
                      :key="item.idEntorno"
                      :value="item.idEntorno"
                      v-text="item.descripcion"
                    ></option>
                  </select>
                </div>
                <div class="form-group col-xs-12 col-xl-4 col-sm-3 col-md-6">
                  <label>Piso:</label>
                  <select class="form-control selectpicker" v-model="idPiso">
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arrayPiso"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>
                <div class="form-group col-xs-12 col-xl-4 col-sm-3 col-md-6">
                  <label>Habitacion:</label>
                  <select class="form-control selectpicker" v-model="idHabitacion">
                    <option selected :value="0" disabled="disabled">Seleccione</option>
                    <option
                      v-for="item in arrayHabitacion"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>
                <div class="form-group col-12">
                  <label>Observación:</label>
                  <textarea cols="30" rows="5" class="form-control" v-model="observacion"></textarea>
                </div>
                <div class="form-group col-12">
                  <button
                    v-if="accion == 0"
                    class="btn btn-success mt-20"
                    type="button"
                    @click="crearEntornoServicioCama()"
                  >
                    <i class="fa fa-save"></i> Guardar
                  </button>
                  <button
                    v-else
                    class="btn btn-success mt-40"
                    type="button"
                    @click="actualizarEntornoServicioCama()"
                  >
                    <i class="fa fa-save"></i> Actualizar
                  </button>
                  <button class="btn btn-danger" type="button" @click="cancelar()">
                    <i class="fa fa-arrow-circle-left"></i> Cancelar
                  </button>
                </div>
              </div>
            </form>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>
<script src="../../Scripts/General/EntornoCamaServicio.js"></script>
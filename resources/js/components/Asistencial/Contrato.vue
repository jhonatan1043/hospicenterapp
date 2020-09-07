<template>
  <main class="main">
    <div class="container-fluid">
      <div class="card mt-3">
        <div class="card-header">
          <h5>Contrato</h5>
        </div>
        <div class="card-body">
          <template v-if="listado == 0">
            <button type="button" class="btn btn-secondary btn-sm" @click="mostrarFormulario()">
              <i class="icon-plus"></i>&nbsp;Nuevo
            </button>
            <hr />
            <div class="table-responsive">
              <table class="table table-bordered table-hover table-sm">
                <thead>
                  <tr>
                    <th width="100" class="text-center">Opciones</th>
                    <th width="50" class="text-center">Codigo</th>
                    <th width="500" class="text-center">Clientes</th>
                    <th width="100" class="text-center">Tipo de Contrato</th>
                    <th width="100" class="text-center">Referencia</th>
                    <th width="100" class="text-center">Tarifa</th>
                    <th width="50" class="text-center">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arrayRegContrato" :key="index">
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-warning btn-sm"
                        @click="editarContrato(item.id)"
                      >
                        <i class="icon-pencil"></i>
                      </button> &nbsp;
                      <button type="button" class="btn btn-danger btn-sm">
                        <i class="icon-trash"></i>
                      </button>
                    </td>
                    <td class="text-center" v-text="item.id"></td>
                    <td v-text="item.cliente"></td>
                    <td class="text-center" v-text="item.tipoContrato"></td>
                    <td class="text-center" v-text="item.referencia"></td>
                    <td class="text-center" v-text="item.tarifa"></td>
                    <td class="text-center" v-if="item.estado==1">
                      <small v-text="'Activo'" class="form-text text-white badge badge-success"></small>
                    </td>
                    <td class="text-center" v-else>
                      <small v-text="'Inactivo'" class="form-text text-white badge badge-danger"></small>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <template v-else>
            <form>
              <button type="button" class="btn btn-secondary btn-sm" @click="abrirModalTarifa()">
                <i class="icon-plus"></i>&nbsp;Tarifa
              </button>
              <hr />
              <div class="shadow-none p-2 mb-2 bg-light col-12">
                <h6>Información del Cliente:</h6>
              </div>
              <div class="form-row">
                <div class="col-md-6 mb-2">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      disabled
                      v-model="cliente"
                    />
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      @click="abrirModal('/cliente/consultar','Busqueda de clientes',5)"
                      :disabled="editable == 1"
                    >
                      <i class="fa fa-search"></i> Buscar Cliente
                    </button>
                  </div>
                </div>
              </div>
              <div class="form-check-inline ml-10 mb-2">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    id="estado"
                    class="custom-control-input"
                    true-value="1"
                    false-value="0"
                    v-model="estado"
                  />
                  <label class="custom-control-label" for="estado">Activo</label>
                </div>
              </div>
              <div class="shadow-none p-2 mb-2 bg-light col-12">
                <h6>Tarifa Contratada:</h6>
              </div>
              <div class="form row">
                <div class="form-group col-xs-12 col-xl-3 col-sm-4 col-md-6">
                  <label>Tipo de Contrato:</label>
                  <select class="form-control form-control-sm" v-model="idTipoContrato">
                    <option select :value="0">Seleccionar</option>
                    <option
                      v-for="item in arrayTipoContrato"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>
                <div class="form-group col-xs-12 col-xl-3 col-sm-4 col-md-6">
                  <label>Cantidad de Afiliados:</label>
                  <input
                    type="number"
                    class="form-control form-control-sm"
                    v-model="cantidadAfiliado"
                  />
                </div>
                <div class="form-group col-xs-12 col-xl-3 col-sm-4 col-md-6">
                  <label>Valor del Contrato:</label>
                  <money
                    class="form-control form-control-sm"
                    v-model="valorContrato"
                    v-bind="money"
                  ></money>
                </div>
                <div class="form-group col-xs-12 col-xl-3 col-sm-4 col-md-6">
                  <label>Referencia:</label>
                  <select class="form-control form-control-sm" v-model="idReferencia">
                    <option select :value="0">Seleccionar</option>
                    <option
                      v-for="item in arrayReferencia"
                      :key="item.id"
                      :value="item.id"
                      v-text="item.Descripcion"
                    ></option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6 mb-2">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      disabled
                      v-model="manual"
                    />
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      @click="abrirModal('','Busqueda de manuales',3)"
                    >
                      <i class="fa fa-search"></i> Manual Cups
                    </button>
                  </div>
                </div>
                <div class="col-md-6 mb-2">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      disabled
                      v-model="listaPrecio"
                    />
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      @click="abrirModal('','Busqueda de lista de precio',4)"
                    >
                      <i class="fa fa-search"></i> Lista Precio
                    </button>
                  </div>
                </div>
              </div>
              <div class="form row">
                <div class="form-group col-xs-12 col-xl-3 col-sm-4 col-md-6">
                  <label>Fecha Inicio:</label>
                  <input type="date" class="form-control form-control-sm" v-model="fechaInicio" />
                </div>
                <div class="form-group col-xs-12 col-xl-3 col-sm-4 col-md-6">
                  <label>Fecha Fin:</label>
                  <input type="date" class="form-control form-control-sm" v-model="fechaFin" />
                </div>
                <div class="form-group col-xs-12 col-xl-3 col-sm-4 col-md-6">
                  <label>Valor del Oxigeno:</label>
                  <money class="form-control form-control-sm" v-model="valorOxigeno" v-bind="money"></money>
                </div>
                <div class="form-group col-xs-12 col-xl-3 col-sm-4 col-md-6">
                  <label>Tarifa:</label>
                  <select class="form-control form-control-sm" v-model="idTarifa">
                    <option select :value="0">Seleccionar</option>
                    <option
                      v-for="item in arrayTarifa"
                      :key="item.idTarifa"
                      :value="item.idTarifa"
                      v-text="item.descripcion"
                    ></option>
                  </select>
                </div>
              </div>
              <div class="form row">
                <div class="form-group col-xs-12 col-xl-6 col-sm-6 col-md-6">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="abrirModal('/entorno/consultarentornos','Busqueda de Servicio',1)"
                  >
                    <i class="icon-plus"></i>
                  </button>
                  <hr />
                  <div class="table-responsive">
                    <table class="table table-bordered table-hover table-sm">
                      <thead>
                        <tr>
                          <th width="10" class="text-center">Opciones</th>
                          <th width="50" class="text-center">Codigo</th>
                          <th width="700" class="text-center">Area de Servicio</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in arrayServicio" :key="index">
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger btn-sm"
                              @click="quitarFilasServicio()"
                            >
                              <i class="icon-trash"></i>
                            </button>
                          </td>
                          <td v-text="item.id"></td>
                          <td v-text="item.descripcion"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="form-group col-xs-12 col-xl-6 col-sm-6 col-md-6">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="abrirModal('/administradora','Busqueda de Administradora',2)"
                  >
                    <i class="icon-plus"></i>
                  </button>
                  <hr />
                  <div class="table-responsive">
                    <table class="table table-bordered table-hover table-sm">
                      <thead>
                        <tr>
                          <th width="10" class="text-center">Opciones</th>
                          <th width="50" class="text-center">Codigo</th>
                          <th width="700" class="text-center">Administradora</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in arrayEps" :key="index">
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger btn-sm"
                              @click="quitarFilasEps()"
                            >
                              <i class="icon-trash"></i>
                            </button>
                          </td>
                          <td v-text="item.id"></td>
                          <td v-text="item.descripcion"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <button
                    v-if="accion==0"
                    class="btn btn-success mt-20 btn-sm"
                    type="button"
                    @click="crearContrato()"
                  >
                    <i class="fa fa-save"></i> Guardar
                  </button>
                  <button v-else class="btn btn-success mt-40 btn-sm" type="button" @click="actualizarContrato()">
                    <i class="fa fa-save"></i> Actualizar
                  </button>
                  <button class="btn btn-danger btn-sm" type="button" @click="cancelarContrato()">
                    <i class="fa fa-arrow-circle-left"></i> Cancelar
                  </button>
                </div>
              </div>
            </form>
          </template>
        </div>
      </div>
      <template v-if="modalTarifa">
        <div
          class="modal fade"
          tabindex="-1"
          :class="{'mostrar' : modalTarifa}"
          role="dialog"
          aria-labelledby="myModalLabel"
          style="display : none"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Tarifa</h4>
                <button type="button" class="close" @click="cancelarModalTarifa()">
                  <span aria-hidden="true">x</span>
                </button>
              </div>
              <div class="modal-body">
                <template v-if="listaModal == 0">
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    @click="mostrarFormularioModal()"
                  >
                    <i class="icon-plus"></i>&nbsp;Nuevo
                  </button>
                  <hr />
                  <div class="table-responsive">
                    <table class="table table-bordered table-sm hover">
                      <thead>
                        <tr>
                          <th class="text-center" width="50">Opciones</th>
                          <th class="text-center" width="20">codigo</th>
                          <th class="text-center" width="500">Descripción</th>
                          <th class="text-center" width="50">Porcentaje</th>
                          <th class="text-center" width="50">año</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in arrayTarifa" :key="index">
                          <td class="text-center">
                            <button
                              type="button"
                              class="btn btn-warning btn-sm"
                              @click="editarTarifa(item.idTarifa,item.descripcion,item.porcentaje,item.año)"
                            >
                              <i class="icon-pencil"></i>
                            </button> &nbsp;
                            <button type="button" class="btn btn-danger btn-sm">
                              <i class="icon-trash"></i>
                            </button>
                          </td>
                          <td class="text-center" v-text="item.idTarifa"></td>
                          <td class="text-center" v-text="item.descripcion"></td>
                          <td class="text-center" v-text="item.porcentaje"></td>
                          <td class="text-center" v-text="item.año"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </template>
                <template v-else>
                  <form>
                    <div class="form-row">
                      <div class="form-group col-lg-4 col-md-4 col-sm-3 col-xs-3">
                        <label>Descripción:</label>
                        <input
                          type="text"
                          class="form-control form-control-sm"
                          v-model="descripcionTarifa"
                        />
                      </div>
                      <div class="form-group col-lg-4 col-md-4 col-sm-3 col-xs-3">
                        <label>Porcentaje:</label>
                        <input
                          type="number"
                          class="form-control form-control-sm"
                          v-model="porcentaje"
                        />
                      </div>
                      <div class="form-group col-lg-4 col-md-4 col-sm-3 col-xs-3">
                        <label>Año:</label>
                        <input type="number" class="form-control form-control-sm" v-model="año" />
                      </div>
                      <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <button
                          v-if="accionModal==0"
                          class="btn btn-success mt-20 btn-sm"
                          type="button"
                          @click="crearTarifa()"
                        >
                          <i class="fa fa-save"></i> Guardar
                        </button>
                        <button
                          v-else
                          class="btn btn-success mt-40 btn-sm"
                          type="button"
                          @click="actualizarTarifa()"
                        >
                          <i class="fa fa-save"></i> Actualizar
                        </button>
                        <button
                          class="btn btn-danger btn-sm"
                          type="button"
                          @click="cancelarTarifa()"
                        >
                          <i class="fa fa-arrow-circle-left"></i> Cancelar
                        </button>
                      </div>
                    </div>
                  </form>
                </template>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="cancelarModalTarifa()"
                >Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <ModalGeneral
      v-if="modal"
      v-bind:objTitulo="objTitulo"
      :tituloModal="tituloModal"
      :url="url"
      :arrayCampos="arrayCampos"
      :modal="modal"
      @datos="arrayDatos=$event"
      v-on:llamarFuncion="agregarDatos"
      v-on:llamarMetodo="cerrarModal"
      v-bind:arrayAsignados="arrayAsignado"
    ></ModalGeneral>
  </main>
</template>

<script src="../../Scripts/Asistencial/Contrato.js"></script>

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
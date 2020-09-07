<template>
  <main class="main">
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">Roles y Permisos</div>
        <div class="card-body">
          <template v-if="listado == 1">
            <button type="button" class="btn btn-secondary btn-sm" @click="mostrarNuevoRol()">
              <i class="icon-plus"></i>&nbsp;Nuevo Rol
            </button>
            <hr />
            <table class="table table-hover table-bordered table-sm">
              <thead>
                <tr>
                  <th width="20" class="text-center">Opciones</th>
                  <th width="700" class="text-center">Roles</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in listaRoles" :key="item.id">
                  <td class="text-center">
                    <button
                      type="button"
                      class="btn btn-warning btn-sm"
                      @click="mostrarNuevoRol(item.id,item.Descripcion)"
                    >
                      <i class="icon-pencil"></i>
                    </button> &nbsp;
                    <button type="button" class="btn btn-danger btn-sm">
                      <i class="icon-trash"></i>
                    </button> &nbsp;
                    <button
                      type="button"
                      class="btn btn-success btn-sm"
                      @click="cargarPermisos(item.id,item.Descripcion)"
                    >
                      <i class="fa fa-arrow-right"></i>
                    </button>
                  </td>
                  <td v-text="item.Descripcion"></td>
                </tr>
              </tbody>
            </table>
          </template>
          <template v-else-if="listado == 0">
            <!--- Aisgnacion de Modulos -->
            <form>
              <div class="card">
                <div class="card-header" v-text="titulo"></div>
                <template v-if="continuidad == 0">
                  <div class="form-row">
                    <div class="col-12">
                      <div class="card-body">
                        <div class="card-header text-center">Seleccionar Punto(s) de Servicio(s)</div>
                        <table class="table table-bordered table-sm">
                          <tbody>
                            <tr v-for="(item,index) in arrayPuntos" :key="index">
                              <td class="text-center">
                                <button
                                  type="button"
                                  class="btn btn-outline-success"
                                  @click="adelante(item.id,item.descripcion)"
                                >
                                  <i class="fa fa-arrow-right"></i>
                                </button>
                              </td>
                              <td>{{item.descripcion}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </template>
                <!-- INICIO MODULOS 
                   | | | | | | | | | | 
                permiso por Modulo del sistema, Sin asignar-->
                <template v-else-if="continuidad == 1">
                  <div class="form-row">
                    <div class="col-xs-12 col-sm-6 col-lg-6">
                      <div class="card-body">
                        <div class="card-header text-center">Modulo(s) Sin Asignar</div>
                        <table class="table table-bordered table-sm">
                          <tbody>
                            <tr v-for="(item,index) in moduloSinAsignar" :key="index">
                              <td class="text-center">
                                <button
                                  type="button"
                                  class="btn btn-outline-success"
                                  @click="asignarModulo(item.id,item.descripcion,index)"
                                >
                                  <i class="fa fa-plus"></i>
                                </button>
                              </td>
                              <td>{{item.descripcion}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <!-- permiso por Modulo del sistema, Asignados-->
                    <div class="col-xs-12 col-sm-6 col-lg-6">
                      <div class="card-body">
                        <div class="card-header text-center">Modulo(s) Asignados</div>
                        <table class="table table-bordered table-sm">
                          <tbody>
                            <tr v-for="(item,index) in moduloAsignados" :key="index">
                              <td class="text-center">
                                <button
                                  type="button"
                                  class="btn btn-outline-danger"
                                  @click="desAsignarModulo(item.id,item.descripcion,index)"
                                >
                                  <i class="fa fa-minus"></i>
                                </button> &nbsp;
                                <button
                                  type="button"
                                  class="btn btn-outline-success"
                                  @click="adelante(item.id,item.descripcion)"
                                >
                                  <i class="fa fa-arrow-right"></i>
                                </button>
                              </td>
                              <td>{{item.descripcion}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button
                      v-if="administrativo == 1"
                      class="btn btn-danger mt-20"
                      type="button"
                      @click="atras()"
                    >
                      <i class="fa fa-arrow-left"></i> Atras
                    </button>
                  </div>
                </template>
                <!-- FIN MODULOS 
                  | | | | | | | | | | | | |
                    --INICIO FORMULARIOS--
                  | | | | | | | | | | | | |  php
                permiso por formularios del sistema, Sin asignar-->
                <template v-else-if="continuidad == 2">
                  <div class="form-row">
                    <div class="col-xs-12 col-sm-6 col-lg-6">
                      <div class="card-body">
                        <div class="card-header text-center">Formulario(s) Sin Asignar</div>
                        <table class="table table-bordered table-sm">
                          <tbody>
                            <tr v-for="(item,index) in formSinAsignar" :key="index">
                              <td class="text-center">
                                <button
                                  type="button"
                                  class="btn btn-outline-success"
                                  @click="asignarForm(item.id,item.descripcion,index)"
                                >
                                  <i class="fa fa-plus"></i>
                                </button>
                              </td>
                              <td>{{item.descripcion}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <!-- permiso por formularios del sistema, Asignados-->
                    <div class="col-xs-12 col-sm-6 col-lg-6">
                      <div class="card-body">
                        <div class="card-header text-center">Formulario(s) Asignados</div>
                        <table class="table table-bordered table-sm">
                          <tbody v-for="(item,index) in formAsignados" :key="index">
                            <tr>
                              <td class="text-center">
                                <button
                                  type="button"
                                  class="btn btn-outline-danger"
                                  @click="desAsignarForm(item.id,item.descripcion,index)"
                                >
                                  <i class="fa fa-minus"></i>
                                </button> &nbsp;
                                <button
                                  type="button"
                                  class="btn btn-outline-success"
                                  @click="adelante(item.id,item.descripcion)"
                                >
                                  <i class="fa fa-arrow-right"></i>
                                </button>
                              </td>
                              <td>{{item.descripcion}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button class="btn btn-danger mt-20" type="button" @click="atras()">
                      <i class="fa fa-arrow-left"></i> Atras
                    </button>
                  </div>
                </template>
                <!-- FIN FORMULARIO -->
              </div>
              <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button class="btn btn-danger" type="button" @click="cancelarFormulario()">
                  <i class="fa fa-arrow-circle-left"></i> Cancelar
                </button>
              </div>
            </form>
          </template>
          <template v-else>
            <div class="card">
              <div class="card-header">
                <h4>Creacion de Roles</h4>
              </div>
              <div class="card-body">
                <form>
                  <div class="form-row">
                    <div class="form-group col-6">
                      <input
                        type="text"
                        class="form-control"
                        maxlength="50"
                        v-model="descRol"
                        placeholder="Digital un rol"
                        required
                        v-bind:style="descRol == '' ?'background-color: #FEF9E7':''"
                      />
                    </div>
                    <div class="form-group col-12">
                      <button
                        v-if="accion == 0"
                        class="btn btn-success mt-20"
                        type="button"
                        @click="crearDescripcionRol()"
                      >
                        <i class="fa fa-save"></i> Guardar
                      </button>
                      <button
                        v-else
                        class="btn btn-success mt-40"
                        type="button"
                        @click="actualizarDescripcionRol()"
                      >
                        <i class="fa fa-save"></i> Actualizar
                      </button>
                      <button class="btn btn-danger" type="button" @click="cancelarFormulario()">
                        <i class="fa fa-arrow-circle-left"></i> Cancelar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script src="../../Scripts/Administracion/PerfilMenu.js"></script>>

<template>
  <div class="main mt-2">
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <h5>Descripciones del Sistema</h5>
        </div>
        <div class="card-body">
          <template v-if="listado == 0">
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              @click="mostrarFormularioParam()"
            >
              <i class="icon-plus"></i>&nbsp;Nuevo Parametro
            </button>
            <hr />
            <div class="form-group row">
              <div class="col-md-6 col-sm-6 col-xs-12 col-xl-6">
                <div class="input-group">
                  <select class="form-control col-md-3" v-model="criterio">
                    <option value="codigo">codigo</option>
                    <option value="descripcion">descripcion</option>
                  </select>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Texto a buscar"
                    @keyup.enter="parametrosListar(1,buscar,criterio)"
                    v-model="buscar"
                  />
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="parametrosListar(1,buscar,criterio)"
                  >
                    <i class="fa fa-search"></i> Buscar
                  </button>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered table-hover table-sm">
                <thead>
                  <tr>
                    <th width="100">Opciones</th>
                    <th width="100">Codigo</th>
                    <th width="700">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arrayParam" :key="index">
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-warning btn-sm"
                        @click="editarParametro(item.idParametro,item.descripcion)"
                      >
                        <i class="icon-pencil"></i>
                      </button> &nbsp;
                      <button
                        type="button"
                        class="btn btn-success btn-sm"
                        @click="mostrarDescripcionListar(item.idParametro,item.descripcion)"
                      >
                        <i class="fa fa-arrow-right"></i>
                      </button>
                    </td>
                    <td class="text-center">{{item.idParametro}}</td>
                    <td>{{item.descripcion}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav>
              <ul class="pagination">
                <li class="page-item" v-if="paginacion.current_page > 1">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPagina(paginacion.current_page - 1,buscar,criterio)"
                  >Ant</a>
                </li>
                <li
                  class="page-item active"
                  v-for="page in pageNumber"
                  :key="page"
                  :class="[page == isActived ? 'active' : '']"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPagina(page,buscar,criterio)"
                    v-text="page"
                  ></a>
                </li>
                <li class="page-item" v-if="paginacion.current_page < paginacion.last_page">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPagina(paginacion.current_page + 1,buscar,criterio)"
                  >Sig</a>
                </li>
              </ul>
            </nav>
          </template>
          <template v-else-if="listado == 1">
            <div class="shadow-none p-2 mb-2 bg-light">
              <h5>{{titulo}}</h5>
            </div>
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              @click="mostrarFormularioDescr()"
            >
              <i class="icon-plus"></i>&nbsp;Nueva Descripción
            </button>
            <hr />
              <div class="form-group row">
              <div class="col-md-6 col-sm-6 col-xs-12 col-xl-6">
                <div class="input-group">
                  <select class="form-control col-md-3" v-model="criterioDescr">
                    <option value="codigo">codigo</option>
                    <option value="descripcion">descripcion</option>
                  </select>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Texto a buscar"
                    @keyup.enter="descripcionListar(1,buscarDescr,criterioDescr)"
                    v-model="buscarDescr"
                  />
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="descripcionListar(1,buscarDescr,criterioDescr)"
                  >
                    <i class="fa fa-search"></i> Buscar
                  </button>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-sm table-bordered table-hover">
                <thead>
                  <tr>
                    <th class="text-center" width="50">Opciones</th>
                    <th class="text-center" width="10">Codigo</th>
                    <th class="text-center" width="700">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arrayDescr" :key="index">
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-warning btn-sm"
                        @click="editar(item.idDescripcion,item.descripcion,item.valorAdicional)"
                      >
                        <i class="icon-pencil"></i>
                      </button> &nbsp;
                      <button type="button" class="btn btn-danger btn-sm">
                        <i class="icon-trash"></i>
                      </button>
                    </td>
                    <td>{{item.idDescripcion}}</td>
                    <td>{{item.descripcion}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
              <nav>
              <ul class="pagination">
                <li class="page-item" v-if="paginacion.current_page > 1">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPaginaDescr(paginacion.current_page - 1,buscarDescr,criterioDescr)"
                  >Ant</a>
                </li>
                <li
                  class="page-item active"
                  v-for="page in pageNumber"
                  :key="page"
                  :class="[page == isActived ? 'active' : '']"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPaginaDescr(page,buscarDescr,criterioDescr)"
                    v-text="page"
                  ></a>
                </li>
                <li class="page-item" v-if="paginacion.current_page < paginacion.last_page">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPaginaDescr(paginacion.current_page + 1,buscarDescr,criterioDescr)"
                  >Sig</a>
                </li>
              </ul>
            </nav>
            <div class="form-group col-12">
              <button class="btn btn-danger" type="button" @click="cancelar()">
                <i class="fa fa-arrow-circle-left"></i> Volver
              </button>
            </div>
          </template>
          <template v-else-if="listado == 2">
            <!-- Crear parametros -->
            <form>
              <div class="form-row">
                <div class="form-group col-6 col-xs-12">
                  <label for="descripcion">Parametro</label>
                  <input
                    type="text"
                    maxlength="50"
                    name="descripcion"
                    class="form-control"
                    v-model="descrParametro"
                  />
                </div>
                <div class="form-group col-12">
                  <button
                    v-if="accion == 0"
                    class="btn btn-success mt-20"
                    type="button"
                    @click="crearParametro()"
                  >
                    <i class="fa fa-save"></i> Guardar
                  </button>
                  <button
                    v-else
                    class="btn btn-success mt-40"
                    type="button"
                    @click="actualizarParametro()"
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
          <template v-else-if="listado == 3">
            <form>
              <div class="shadow-none p-2 mb-2 bg-light">
                <h6>{{titulo}}</h6>
              </div>
              <div class="form-row">
                <div class="form-group col-6 col-xs-12">
                  <label for="descripcion">Descripcion</label>
                  <input
                    type="text"
                    maxlength="50"
                    name="descripcion"
                    class="form-control"
                    v-model="descripcion"
                  />
                </div>
                <div class="form-group col-6 col-xs-12">
                  <label for="vExtra">Valor Extra</label>
                  <input
                    type="text"
                    maxlength="50"
                    name="vExtra"
                    class="form-control"
                    v-model="vExtra"
                  />
                </div>
                <div class="form-group col-12">
                  <button
                    v-if="accion == 0"
                    class="btn btn-success mt-20"
                    type="button"
                    @click="crearDescripcion()"
                    :disabled="editable == 1"
                  >
                    <i class="fa fa-save"></i> Guardar
                  </button>
                  <button
                    v-else
                    class="btn btn-success mt-40"
                    type="button"
                    @click="actualizarDescripcion()"
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
  </div>
</template>
<script src="../../Scripts/General/DescripcionSistema.js"></script>
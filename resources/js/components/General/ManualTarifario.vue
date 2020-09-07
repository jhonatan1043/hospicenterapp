<template>
  <main class="main">
    <div class="container-fluid">
      <div class="card mt-2">
        <div class="card-header">
          <h5>Manuales Tarifario</h5>
        </div>
        <div class="card-body">
          <template v-if="listado == 0">
            <button type="button" class="btn btn-secondary btn-sm">
              <i class="fa fa-plus-circle"></i> Nuevo
            </button>
            <hr />
            <div class="table-responsive">
              <table class="table table-bordered table-sm table-hover">
                <thead>
                  <tr>
                    <th width="200" class="text-center">Opciones</th>
                    <th width="100" class="text-center">Codigo</th>
                    <th width="700" class="text-center">Manual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arrayManual" :key="index">
                    <td class="text-center">
                      <button type="button" class="btn btn-warning btn-sm">
                        <i class="icon-pencil"></i>
                      </button> &nbsp;
                      <button type="button" class="btn btn-danger btn-sm">
                        <i class="icon-trash"></i>
                      </button> &nbsp;
                      <button
                        type="button"
                        class="btn btn-success btn-sm"
                        @click="cargarManulTarifario(item.id,item.Descripcion)"
                      >
                        <i class="fa fa-arrow-right"></i>
                      </button>
                    </td>
                    <td class="text-center" v-text="item.id"></td>
                    <td v-text="item.Descripcion"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <template v-else>
            <div class="form-inline">
              <h6 class="text-muted">{{ titulo }}</h6>&nbsp;&nbsp;
              <h6>
                <a  href="https://www.normassalud.com/" target="_blank">
                  <i class="fa fa-question-circle"></i>Ayuda
                </a>
              </h6>
            </div>
            <hr />
            <div class="form-group col-12">
              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a class="nav-link active" href="#mServicio" data-toggle="tab">Manual de Servicio</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#mCodigoCups" data-toggle="tab">Codigo Cups</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#mCodigoSoat" data-toggle="tab">Codigo Soat</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#mCodigoISS" data-toggle="tab">Codigo Iss</a>
                </li>
              </ul>
            </div>
            <div class="tab-content container-fluid">
              <div class="tab-pane active" id="mServicio">
                <button class="btn btn-sm btn-secondary float-left" @click="abrirModalCruze()">
                  <i class="fa fa-plus-circle"></i> Agregar Servicio
                </button>
                <div class="form-group row">
                  <div class="col-md-6 col-sm-6 col-xs-12 col-xl-12">
                    <div class="input-group">
                      <select class="form-control col-md-3 form-control-sm" v-model="criterioServ">
                        <option value="codigoCups">codigo</option>
                        <option value="descripcionCups">descripcion</option>
                      </select>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="Texto a buscar"
                        @keyup.enter="consultarServicio(1,buscarServ,criterioServ)"
                        v-model="buscarServ"
                      />
                      <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        @click="consultarServicio(1,buscarServ,criterioServ)"
                      >
                        <i class="fa fa-search"></i> Buscar
                      </button>
                    </div>
                  </div>
                </div>
                <div class="table table-responsive">
                  <table class="table table-sm table-bordered">
                    <thead>
                      <tr>
                        <th width="50" class="text-center">Opción</th>
                        <th width="100" class="text-center">Cod.Cups</th>
                        <th class="text-center">Descripcion Cups</th>
                        <th width="100" class="text-center">Cod.Soat</th>
                        <th class="text-center">Descripcion Soat</th>
                        <th width="100" class="text-center">Cod.Iss</th>
                        <th class="text-center">Descripcion Iss</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in arrayServicio" :key="index">
                        <td class="text-center">
                          <button type="button" class="btn btn-warning btn-sm">
                            <i class="icon-pencil"></i>
                          </button>
                        </td>
                        <td v-text="item.codigoCups"></td>
                        <td v-text="item.descripcionCups"></td>
                        <td v-text="item.codigoSOAT"></td>
                        <td v-text="item.descripcionSoat"></td>
                        <td v-text="item.codigoISS"></td>
                        <td v-text="item.descripcionIss"></td>
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
                        @click.prevent="cambiarPaginaServicio(paginacion.current_page - 1,buscarServ,criterioServ)"
                      >Ant</a>
                    </li>
                    <li
                      class="page-item active"
                      v-for="pageServ in pageNumber"
                      :key="pageServ"
                      :class="[pageServ == isActived ? 'active' : '']"
                    >
                      <a
                        class="page-link"
                        href="#"
                        @click.prevent="cambiarPaginaServicio(pageServ,buscarServ,criterioServ)"
                        v-text="pageServ"
                      ></a>
                    </li>
                    <li class="page-item" v-if="paginacion.current_page < paginacion.last_page">
                      <a
                        class="page-link"
                        href="#"
                        @click.prevent="cambiarPaginaServicio(paginacion.current_page + 1,buscarServ,criterioServ)"
                      >Sig</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="tab-pane" id="mCodigoCups">
                <button
                  class="btn btn-sm btn-secondary float-left mb-2"
                  @click="abrirModal('Procedimientos Cups',lCups)"
                >
                  <i class="fa fa-plus-circle"></i> Agregar Codigo Cups
                </button>
                <div class="form-group row">
                  <div class="col-md-6 col-sm-6 col-xs-12 col-xl-12">
                    <div class="input-group">
                      <select class="form-control col-md-3 form-control-sm" v-model="criterioCups">
                        <option value="codigoProcedimiento">codigo</option>
                        <option value="descripcion">descripcion</option>
                      </select>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="Texto a buscar"
                        @keyup.enter="consultarCups(1,buscarServ,criterioCups)"
                        v-model="buscarServ"
                      />
                      <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        @click="consultarCups(1,buscarServ,criterioCups)"
                      >
                        <i class="fa fa-search"></i> Buscar
                      </button>
                    </div>
                  </div>
                </div>
                <div class="table table-responsive">
                  <table class="table table-sm table-bordered table-hover">
                    <thead>
                      <tr>
                        <th width="50" class="text-center">Opción</th>
                        <th width="100" class="text-center">Cod.Cups</th>
                        <th class="text-center">Descripcion</th>
                        <th width="100" class="text-center">Facturable</th>
                        <th width="100" class="text-center">Equipo</th>
                        <th width="100" class="text-center">Visible</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in arrayCups" :key="index">
                        <td class="text-center">
                          <button type="button" class="btn btn-warning btn-sm">
                            <i class="icon-pencil"></i>
                          </button>
                        </td>
                        <td v-text="item.codigoCups"></td>
                        <td v-text="item.descripcion"></td>
                        <td class="text-center" v-if="item.facturable==1">
                          <small v-text="'Aplica'" class="form-text text-white badge badge-success"></small>
                        </td>
                        <td class="text-center" v-else>
                          <small
                            v-text="'No aplica'"
                            class="form-text text-white badge badge-danger"
                          ></small>
                        </td>
                        <td class="text-center" v-if="item.equipo==1">
                          <small v-text="'Aplica'" class="form-text text-white badge badge-success"></small>
                        </td>
                        <td class="text-center" v-else>
                          <small
                            v-text="'No aplica'"
                            class="form-text text-white badge badge-danger"
                          ></small>
                        </td>
                        <td class="text-center" v-if="item.visible==1">
                          <small v-text="'Aplica'" class="form-text text-white badge badge-success"></small>
                        </td>
                        <td class="text-center" v-else>
                          <small
                            v-text="'No aplica'"
                            class="form-text text-white badge badge-danger"
                          ></small>
                        </td>
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
                        @click.prevent="cambiarPaginaCups(paginacion.current_page - 1,buscarCups,criterioCups)"
                      >Ant</a>
                    </li>
                    <li
                      class="page-item active"
                      v-for="pageCups in pageNumber"
                      :key="pageCups"
                      :class="[pageCups == isActived ? 'active' : '']"
                    >
                      <a
                        class="page-link"
                        href="#"
                        @click.prevent="cambiarPaginaCups(pageCups,buscarCups,criterioCups)"
                        v-text="pageCups"
                      ></a>
                    </li>
                    <li class="page-item" v-if="paginacion.current_page < paginacion.last_page">
                      <a
                        class="page-link"
                        href="#"
                        @click.prevent="cambiarPaginaCups(paginacion.current_page + 1,buscarCups,criterioCups)"
                      >Sig</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="tab-pane" id="mCodigoSoat">
                <button
                  class="btn btn-sm btn-secondary float-left"
                  @click="abrirModal('Procedimientos Soat',lSoat)"
                >
                  <i class="fa fa-plus-circle"></i> Agregar Codigo Soat
                </button>
                <div class="form-group row">
                  <div class="col-md-6 col-sm-6 col-xs-12 col-xl-12">
                    <div class="input-group">
                      <select class="form-control col-md-3 form-control-sm" v-model="criterioSoat">
                        <option value="codigoSoat">codigo</option>
                        <option value="descripcion">descripcion</option>
                      </select>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="Texto a buscar"
                        @keyup.enter="consultarSoat(1,buscarSoat,criterioSoat)"
                        v-model="buscarSoat"
                      />
                      <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        @click="consultarSoat(1,buscarSoat,criterioSoat)"
                      >
                        <i class="fa fa-search"></i> Buscar
                      </button>
                    </div>
                  </div>
                </div>
                <div class="table table-responsive">
                  <table class="table table-sm table-bordered table-hover">
                    <thead>
                      <tr>
                        <th width="50" class="text-center">Opción</th>
                        <th width="100" class="text-center">Cod.Soat</th>
                        <th class="text-center">Descripcion</th>
                        <th width="100" class="text-center">Factor</th>
                        <th width="200" class="text-center">Valor Personalizado</th>
                        <th width="100" class="text-center">Facturable</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in arraySoat" :key="index">
                        <td class="text-center">
                          <button type="button" class="btn btn-warning btn-sm">
                            <i class="icon-pencil"></i>
                          </button>
                        </td>
                        <td v-text="item.codigoSoat"></td>
                        <td v-text="item.descripcion"></td>
                        <td v-text="item.factor"></td>
                        <td v-text="item.valorPersonalizado"></td>
                        <td class="text-center" v-if="item.facturable==1">
                          <small v-text="'Aplica'" class="form-text text-white badge badge-success"></small>
                        </td>
                        <td class="text-center" v-else>
                          <small
                            v-text="'No aplica'"
                            class="form-text text-white badge badge-danger"
                          ></small>
                        </td>
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
                        @click.prevent="cambiarPaginaSoat(paginacion.current_page - 1,buscarSoat,criterioSoat)"
                      >Ant</a>
                    </li>
                    <li
                      class="page-item active"
                      v-for="pageSoat in pageNumber"
                      :key="pageSoat"
                      :class="[pageSoat == isActived ? 'active' : '']"
                    >
                      <a
                        class="page-link"
                        href="#"
                        @click.prevent="cambiarPaginaSoat(pageSoat,buscarSoat,criterioSoat)"
                        v-text="pageSoat"
                      ></a>
                    </li>
                    <li class="page-item" v-if="paginacion.current_page < paginacion.last_page">
                      <a
                        class="page-link"
                        href="#"
                        @click.prevent="cambiarPaginaSoat(paginacion.current_page + 1,buscarSoat,criterioSoat)"
                      >Sig</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="tab-pane" id="mCodigoISS">
                <button
                  class="btn btn-sm btn-secondary float-left"
                  @click="abrirModal('Procedimientos Iss',lIss)"
                >
                  <i class="fa fa-plus-circle"></i> Agregar Codigo Iss
                </button>
                <div class="form-group row">
                  <div class="col-md-6 col-sm-6 col-xs-12 col-xl-12">
                    <div class="input-group">
                      <select class="form-control col-md-3 form-control-sm" v-model="criterioIss">
                        <option value="codigoISS">codigo</option>
                        <option value="descripcion">descripcion</option>
                      </select>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="Texto a buscar"
                        @keyup.enter="consultarIss(1,buscarIss,criterioIss)"
                        v-model="buscarIss"
                      />
                      <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        @click="consultarIss(1,buscarIss,criterioIss)"
                      >
                        <i class="fa fa-search"></i> Buscar
                      </button>
                    </div>
                  </div>
                </div>
                <div class="table table-responsive">
                  <table class="table table-sm table-bordered table-hover">
                    <thead>
                      <tr>
                        <th width="50" class="text-center">Opción</th>
                        <th width="100" class="text-center">Cod.Iss</th>
                        <th class="text-center">Descripcion</th>
                        <th width="100" class="text-center">Uvr</th>
                        <th width="200" class="text-center">Valor Personalizado</th>
                        <th width="100" class="text-center">Facturable</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in arrayIss" :key="index">
                        <td class="text-center">
                          <button type="button" class="btn btn-warning btn-sm">
                            <i class="icon-pencil"></i>
                          </button>
                        </td>
                        <td v-text="item.codigoISS"></td>
                        <td v-text="item.descripcion"></td>
                        <td v-text="item.uvr"></td>
                        <td v-text="item.valorPersonalizado"></td>
                        <td class="text-center" v-if="item.facturable==1">
                          <small v-text="'Aplica'" class="form-text text-white badge badge-success"></small>
                        </td>
                        <td class="text-center" v-else>
                          <small
                            v-text="'No aplica'"
                            class="form-text text-white badge badge-danger"
                          ></small>
                        </td>
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
                        @click.prevent="cambiarPaginaIss(paginacion.current_page - 1,buscarIss,criterioIss)"
                      >Ant</a>
                    </li>
                    <li
                      class="page-item active"
                      v-for="pageIss in pageNumber"
                      :key="pageIss"
                      :class="[pageIss == isActived ? 'active' : '']"
                    >
                      <a
                        class="page-link"
                        href="#"
                        @click.prevent="cambiarPaginaIss(pageIss,buscarIss,criterioIss)"
                        v-text="pageIss"
                      ></a>
                    </li>
                    <li class="page-item" v-if="paginacion.current_page < paginacion.last_page">
                      <a
                        class="page-link"
                        href="#"
                        @click.prevent="cambiarPaginaIss(paginacion.current_page + 1,buscarIss,criterioIss)"
                      >Sig</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </template>
        </div>
      </div>
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
                <h5 class="modal-title text-muted">{{tituloModal}}</h5>
                <button type="button" class="close" @click="cancelarModal()" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="form-group col-xl-2 col-md-4 col-sm-12 col-xs-12">
                    <label>Código</label>
                    <input type="text" class="form-control form-control-sm" v-model="codigo" />
                  </div>
                  <div class="form-group col-xl-10 col-md-8 col-sm-12 col-xs-12">
                    <label>Descripción</label>
                    <input type="text" class="form-control form-control-sm" v-model="descripcion" />
                  </div>
                  <div
                    class="form-group col-xl-4 col-md-4 col-sm-12 col-xs-12"
                    v-if="idManual == 2"
                  >
                    <label>Factor</label>
                    <input type="number" class="form-control form-control-sm" v-model="factor" />
                  </div>
                  <div
                    class="form-group col-xl-4 col-md-4 col-sm-12 col-xs-12"
                    v-if="idManual == 3"
                  >
                    <label>Uvr</label>
                    <input type="number" class="form-control form-control-sm" v-model="uvr" />
                  </div>
                  <div
                    class="form-group col-xl-4 col-md-4 col-sm-12 col-xs-12"
                    v-if="idManual == 2 || idManual == 3"
                  >
                    <label>V.Personalizado</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      v-model="valorPersonalizado"
                    />
                  </div>
                  <div class="form-group col-xl-4 col-md-4 col-sm-12 col-xs-12">
                    <div class="custom-control custom-checkbox mt-4">
                      <input
                        type="checkbox"
                        id="facturable"
                        class="custom-control-input"
                        true-value="1"
                        false-value="0"
                        v-model="facturable"
                      />
                      <label class="custom-control-label" for="facturable">Facturable</label>
                    </div>
                  </div>
                  <div
                    class="form-group col-xl-4 col-md-4 col-sm-12 col-xs-12"
                    v-if="idManual == 1"
                  >
                    <div class="custom-control custom-checkbox mt-4">
                      <input
                        type="checkbox"
                        id="equipo"
                        class="custom-control-input"
                        true-value="1"
                        false-value="0"
                        v-model="equipo"
                      />
                      <label class="custom-control-label" for="equipo">Equipo</label>
                    </div>
                  </div>
                  <div
                    class="form-group col-xl-4 col-md-4 col-sm-12 col-xs-12"
                    v-if="idManual == 1"
                  >
                    <div class="custom-control custom-checkbox mt-4">
                      <input
                        type="checkbox"
                        id="visible"
                        class="custom-control-input"
                        true-value="1"
                        false-value="0"
                        v-model="visible"
                      />
                      <label class="custom-control-label" for="visible">Visible</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <div class="col-12">
                  <button
                    type="button"
                    class="btn btn-sm btn-success float-left"
                    @click="guardarServicios(idManual)"
                  >Guardar</button>
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm float-right"
                    @click="cancelarModal()"
                  >Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="modalCruze">
        <div
          class="modal fade"
          tabindex="-1"
          :class="{'mostrar' : modalCruze}"
          role="dialog"
          aria-labelledby="myModalLabel"
          style="display: none;"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-muted" v-text="'Homologación de Servicio'"></h5>
                <button type="button" class="close" @click="cancelarModal()" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="form-group col-12">
                    <div class="col-12">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control form-control-sm"
                          disabled
                          v-model="cups"
                        />
                        <button
                          type="button"
                          class="btn btn-primary btn-sm"
                          @click="abrirModalServicio('/servicios/buscarcups','Buscar Cups',lCups)"
                        >
                          <i class="fa fa-search"></i> Buscar Cups
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-12">
                    <div class="col-12">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control form-control-sm"
                          disabled
                          v-model="soat"
                        />
                        <button
                          type="button"
                          class="btn btn-primary btn-sm"
                          @click="abrirModalServicio('/servicios/buscarsoat','Buscar Soat',lSoat)"
                        >
                          <i class="fa fa-search"></i> Buscar Soat
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-12">
                    <div class="col-12">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control form-control-sm"
                          disabled
                          v-model="iss"
                        />
                        <button
                          type="button"
                          class="btn btn-primary btn-sm"
                          @click="abrirModalServicio('/servicios/buscariss','Buscar Iss',lIss)"
                        >
                          <i class="fa fa-search"></i> Buscar Iss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <div class="col-12">
                  <button
                    type="button"
                    class="btn btn-sm btn-success float-left"
                    @click="guardarCruzeServicio()"
                  >Guardar</button>
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm float-right"
                    @click="cancelarModal()"
                  >Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template>
        <ModalGeneral
          v-if="modalSevicio"
          v-bind:objTitulo="objTitulo"
          :tituloModal="tituloModal"
          :url="url"
          :arrayCampos="arrayCampos"
          :modal="modalSevicio"
          @datos="arrayDatos=$event"
          v-on:llamarFuncion="agregarDatos"
          v-on:llamarMetodo="cerrarModal"
        ></ModalGeneral>
      </template>
    </div>
  </main>
</template>
<script src="../../Scripts/General/ManualTarifario.js" ></script>
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
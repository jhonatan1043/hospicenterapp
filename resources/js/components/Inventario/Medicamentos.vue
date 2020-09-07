<template>
  <main class="main">
    <div class="container-fluid">
      <template v-if="listado==0">
        <div class="card mt-3">
          <div class="card-header">
            <h5>Configuración de medicamentos e insumos</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <label>Descripcion:</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  maxlength="50"
                  placeholder="Descripcion del medicamento"
                  required
                  v-model="descripcion"
                  v-bind:style="descripcion == '' ?'background-color: #FEF9E7':''"
                />
              </div>
              <div class="col col-lg-2 col-md-6 col-sm-12 col-xs-12">
                <label>Clasificación:</label>
                <select
                  class="form-control form-control-sm selectpicker"
                  data-live-search="true"
                  required
                  v-model="clasificacion"
                  v-bind:style="clasificacion == 0 ?'background-color: #FEF9E7':''"
                >
                  <option selected :value="0" disabled="disabled">Seleccione</option>
                  <option
                    v-for="item in arrayClasificacion"
                    :key="item.id"
                    :value="item.id"
                    v-text="item.Descripcion"
                  ></option>
                </select>
              </div>
              <div class="col col-lg-2 col-md-6 col-sm-12 col-xs-12">
                <label>Unidad:</label>
                <select
                  class="form-control form-control-sm selectpicker"
                  data-live-search="true"
                  required
                  v-model="unidad"
                  v-bind:style="unidad == 0 ?'background-color: #FEF9E7':''"
                >
                  <option selected :value="0" disabled="disabled">Seleccione</option>
                  <option
                    v-for="item in arrayUnidad"
                    :key="item.id"
                    :value="item.id"
                    v-text="item.Descripcion"
                  ></option>
                </select>
              </div>
              <div class="col col-lg-2 col-md-6 col-sm-12 col-xs-12">
                <label>Concentracion:</label>
                <input
                  type="number"
                  class="form-control form-control-sm"
                  maxlength="50"
                  placeholder="Concentracion"
                  required
                  v-model="concentracion"
                />
              </div>

              <div class="col col-lg-2 col-md-6 col-sm-12 col-xs-12">
                <label>Categoria:</label>
                <select
                  class="form-control form-control-sm selectpicker"
                  data-live-search="true"
                  required
                  v-model="categoria"
                  v-bind:style="categoria == 0 ?'background-color: #FEF9E7':''"
                >
                  <option selected :value="0" disabled="disabled">Seleccione</option>
                  <option
                    v-for="item in arrayCategoria"
                    :key="item.id"
                    :value="item.id"
                    v-text="item.Descripcion"
                  ></option>
                </select>
              </div>
              <div class="col col-lg-2 col-md-6 col-sm-12 col-xs-12">
                <label>Grupo farmaceutico:</label>
                <select
                  class="form-control form-control-sm selectpicker"
                  data-live-search="true"
                  required
                  v-model="grupoFarmaco"
                  v-bind:style="grupoFarmaco == 0 ?'background-color: #FEF9E7':''"
                >
                  <option selected :value="0" disabled="disabled">Seleccione</option>
                  <option
                    v-for="item in arrayGrupoFarmaco"
                    :key="item.id"
                    :value="item.id"
                    v-text="item.Descripcion"
                  ></option>
                </select>
              </div>
              <div class="col col-lg-2 col-md-6 col-sm-12 col-xs-12">
                <label>Presentación:</label>
                <select
                  class="form-control form-control-sm selectpicker"
                  data-live-search="true"
                  required
                  v-model="presentacion"
                  v-bind:style="presentacion == 0 ?'background-color: #FEF9E7':''"
                >
                  <option selected :value="0" disabled="disabled">Seleccione</option>
                  <option
                    v-for="item in arrayPresentacion"
                    :key="item.id"
                    :value="item.id"
                    v-text="item.Descripcion"
                  ></option>
                </select>
              </div>
              <div class="form-group col-lg-2 col-md-2 col-sm-2 col-xs-12">
                <label>Codigo ATC:</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  maxlength="50"
                  placeholder="Código ATC"
                  required
                  v-model="codigoATC"
                  v-bind:style="codigoATC == 0 ?'background-color: #FEF9E7':''"
                />
              </div>
              <div class="form-group  col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <label>Descripcion ATC:</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  maxlength="50"
                  placeholder="DescripcionATC del medicamento"
                  required
                  v-model="descripcionATC"
                  v-bind:style="descripcionATC == 0 ?'background-color: #FEF9E7':''"
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
            <div class="row">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="defaultChecked2"
                  v-model="noPOS"
                  true-value="1"
                  false-value="0"
                />
                <label class="custom-control-label" for="defaultChecked2">No Pos</label>
              </div>
              <div class="custom-control custom-checkbox ml-4">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="defaultChecked5"
                  v-model="solicitadoEnfermeria"
                  true-value="1"
                  false-value="0"
                />
                <label class="custom-control-label" for="defaultChecked5">Solicitado en enfermeria</label>
              </div>
              <div class="custom-control custom-checkbox ml-4">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="defaultChecked6"
                  v-model="solicitadoFisioterapeuta"
                  true-value="1"
                  false-value="0"
                />
                <label
                  class="custom-control-label"
                  for="defaultChecked6"
                >Solicitado en fisioterapeuta</label>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h5>Vias de administración</h5>
          </div>
          <div class="card-body">
            <button type="button" class="btn btn-primary btn-sm" @click="mostrarModal()">
              <i class="icon-plus"></i>
            </button>
            <hr />
            <table class="table table-bordered table-sm">
              <thead>
                <tr>
                  <th width="50">Quitar</th>
                  <th width="50">Id</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in arrayViaAdministracion" :key="i">
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      data-toggle="modal"
                      data-target="#modalEliminar"
                      @click="deleteRow(i,arrayViaAdministracion)"
                    >
                      <i class="icon-trash"></i>
                    </button>
                  </td>
                  <td v-text="item.id"></td>
                  <td v-text="item.Descripcion"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <button 
              v-if="accion==0"
              class="btn btn-success btn-sm mt-20"
              type="button"
              @click="guardar()"
            >
              <i class="fa fa-save"></i> Guardar
            </button>
            <button v-else class="btn btn-success btn-sm mt-40" type="button" @click="guardar()">
              <i class="fa fa-save"></i> Actualizar
            </button>
            <button class="btn btn-danger btn-sm" @click="cancelarRegistro()" type="button">
              <i class="fa fa-arrow-circle-left"></i> Cancelar
            </button>
          </div>
        </div>
      </template>
      <template v-if="listado==1">
        <div class="card mt-3">
          <div class="card-header">
            <h5>Lista de configuración de medicamentos e insumos</h5>
          </div>
          <div class="card-body">
            <button type="button" class="btn btn-secondary btn-sm" @click="mostrarFormulario">
              <i class="icon-plus"></i>&nbsp;Nuevo
            </button>
            <hr />
            <div class="form-group row">
              <div class="col-md-6">
                <div class="input-group">
                  <select
                    class="form-control col-md-3"
                    id="opcion"
                    v-model="nombreCampo"
                    name="opcion"
                  >
                    <option value="id">Id</option>
                    <option value="descripcion">Descripcion</option>
                  </select>
                  <input
                    type="text"
                    id="texto"
                    name="texto"
                    class="form-control"
                    placeholder="Texto a buscar"
                    v-model="campoBuscar"
                    @keyup.enter="listarMedicamentosEinsumos(1,nombreCampo,campoBuscar)"
                  />
                  <button
                    type="submit"
                    class="btn btn-primary btn-sm"
                    @click="listarMedicamentosEinsumos(1,nombreCampo,campoBuscar)"
                  >
                    <i class="fa fa-search"></i> Buscar
                  </button>
                </div>
              </div>
            </div>
            <table class="table table-bordered table-sm">
              <thead>
                <tr>
                  <th width="150">Opciones</th>
                  <th width="50">Id</th>
                  <th width="90">CodigoATC</th>
                  <th>Descripcion</th>
                  <th>Concentracion</th>
                  <th>Unidad</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody v-for="(item,i) in arrayMedicamentos" :key="i">
                <tr>
                  <td>
                    <button type="button" class="btn btn-warning btn-sm" @click="cargar(item.id)">
                      <i class="icon-pencil"></i>
                    </button> &nbsp;
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="anularMedicamento(item.id)"
                    >
                      <i class="icon-trash"></i>
                    </button> &nbsp;
                    <button
                      type="button"
                      class="btn btn-info btn-sm"
                      @click="productosAsociados(item.id)"
                    >
                      <i class="fa fa-eye"></i>
                    </button>
                  </td>
                  <td v-text="item.id"></td>
                  <td v-text="item.codigoATC"></td>
                  <td v-text="item.descripcion"></td>
                  <td v-text="item.concentracion"></td>
                  <td v-text="item.unidad"></td>
                  <td v-if="item.noPos==1">
                    <small v-text="'NoPOS'" class="form-text text-white badge badge-secondary"></small>
                  </td>
                  <td v-else>
                    <small v-text="'POS'" class="form-text text-white badge badge-success"></small>
                  </td>
                </tr>
              </tbody>
            </table>
            <nav>
              <ul class="pagination">
                <li class="page-item" v-if="paginacion.current_page > 1">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPagina(paginacion.current_page - 1,campoBuscar,nombreCampo)"
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
                    @click.prevent="cambiarPagina(page,campoBuscar,nombreCampo)"
                    v-text="page"
                  ></a>
                </li>
                <li class="page-item" v-if="paginacion.current_page < paginacion.last_page">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPagina(paginacion.current_page + 1,campoBuscar,nombreCampo)"
                  >Sig</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </template>
      <template v-if="listado==2">
        <div class="card mt-3">
          <div class="card-header"><h5>Productos asociados</h5></div>
          <div class="card-body">
            <table class="table table-bordered table-sm">
              <thead>
                <tr>
                  <th>Id Producto</th>
                  <th>Descripcion</th>
                  <th>Marca</th>
                  <th>CUM</th>
                  <th>Registro sanitario</th>
                  <th>Iva</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in arrayProductos" :key="i">
                  <td v-text="item.idProducto"></td>
                  <td v-text="item.descripcion"></td>
                  <td v-text="item.marca"></td>
                  <td v-text="item.codigoCum"></td>
                  <td v-text="item.regSanitario"></td>
                  <td v-text="item.iva"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <button class="btn btn-secondary btn-sm" @click="opciones()" type="button">
              <i class="fa fa-arrow-circle-left"></i> Inicio
            </button>
          </div>
        </div>
      </template>
    </div>
    <ModalGeneral
      v-if="abrirModal"
      v-bind:objTitulo="objTitulo"
      tituloModal="Busqueda via administracion"
      url="medicamentos/viaAdministracion"
      :arrayCampos="arrayCampos"
      :modal="abrirModal"
      :idParametro="idParametroViaAdministracion"
      @datos="arrayDatos = $event"
      v-on:llamarFuncion="agregarViaAdministracion"
      v-on:llamarMetodo="cerrarModal"
      v-bind:arrayAsignados="arrayViaAdministracion"
    ></ModalGeneral>
  </main>
</template>

<script src="../../Scripts/Inventario/Medicamentos.js" ></script>

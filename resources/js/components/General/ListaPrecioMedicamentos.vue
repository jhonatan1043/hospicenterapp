<template>
  <main class="main">
    <div class="container-fluid">
      <template v-if="!listado">
      <div class="card mt-3">
        <div class="card-header">
          <h5>Lista de precio de medicamentos</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
              <label>Descripcion:</label>
              <input
                type="text"
                class="form-control form-control-sm"
                maxlength="50"
                placeholder="Descripcion de la lista"
                required
                v-model="descripcion"
                v-bind:style="descripcion == '' ?'background-color: #FEF9E7':''"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h5>Configuración</h5>
        </div>
        <div class="card-body">
          <div class="form-group row">
            <div class="col-md-6">
              <div class="input-group">
                <select
                  class="form-control form-control-sm col-md-3"
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
                  class="form-control form-control-sm"
                  placeholder="Texto a buscar"
                  v-model="campoBuscar"
                  @keyup.enter="cargarMedicamentos(1,nombreCampo,campoBuscar)"
                />
                <button
                  type="submit"
                  class="btn btn-primary btn-sm"
                  @click="cargarMedicamentos(1,nombreCampo,campoBuscar)"
                >
                  <i class="fa fa-search"></i> Buscar
                </button>
              </div>
            </div>
          </div>
          <table class="table table-bordered table-sm">
            <thead>
              <tr>
                <th width="50">Id</th>
                <th width="150">Categoria</th>
                <th>Descripcion</th>
                <th width="130">Precio</th>
                <th width="100">No aplica</th>
              </tr>
            </thead> 
            <tbody>
              <tr v-for="(item,i) in arrayMedicamentos" :key="i">
                <td v-text="item.id"></td>
                <td v-text="item.categoria"></td>
                <td v-text="item.descripcion"></td>
                <td>
                   <money
                    class="form-control form-control-sm"
                    v-model="item.precio"
                    v-bind="money"
                  ></money>
                </td>
                <td>                
                    <input
                      type="checkbox"
                      class="form-control"
                      v-model="item.noAplica"
                      true-value="1"
                      false-value="0"
                    />                
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
     <div class="card">
       <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <button 
              v-if="accion==0"
              class="btn btn-success btn-sm mt-3"
              type="button"
              @click="guardar()"
            >
              <i class="fa fa-save"></i> Guardar
            </button>
            <button v-else class="btn btn-success btn-sm mt-3" type="button" @click="guardar()">
              <i class="fa fa-save"></i> Actualizar
            </button>
            <button class="btn btn-danger btn-sm mt-3" @click="cancelarRegistro()" type="button">
              <i class="fa fa-arrow-circle-left"></i> Cancelar
            </button>
          </div>
     </div>
      
      </template>
      <template v-else>
        <div class="card mt-3">
          <div class="card-header">
            <h5>Lista precio de medicamentos</h5>
          </div>
          <div class="card-body">
            <button type="button" class="btn btn-secondary btn-sm" @click="mostrarFormulario()" >
              <i class="icon-plus"></i>&nbsp;Nuevo
            </button>
            <hr />
            <div class="form-group row">
            <div class="col-md-6">
              <div class="input-group">
                <select
                  class="form-control form-control-sm col-md-3"
                  id="opcion"
                  v-model="nombreCampoListar"
                  name="opcion"
                >
                  <option value="id">Id</option>
                  <option value="descripcion">Descripcion</option>
                </select>
                <input
                  type="text"
                  id="texto"
                  name="texto"
                  class="form-control form-control-sm"
                  placeholder="Texto a buscar"
                  v-model="campoBuscarListar"
                  @keyup.enter="listarPrecioMedicamentos(1,nombreCampoListar,campoBuscarListar)"
                />
                <button
                  type="submit"
                  class="btn btn-primary btn-sm"
                  @click="listarPrecioMedicamentos(1,nombreCampoListar,campoBuscarListar)"
                >
                  <i class="fa fa-search"></i> Buscar
                </button>   
              </div> 
            </div>
          </div> 
            <table class="table table-bordered table-sm">
              <thead>
                <tr>
                  <th width="100">Opciones</th>
                  <th width="50">Id</th>
                  <th>Descripcion</th>                                
                </tr>
              </thead>
              <tbody>
                 <tr v-for="(item,i) in arrayListar" :key="i">
                   <td>
                     <button type="button" class="btn btn-warning btn-sm" @click="cargar(item.id)">
                      <i class="icon-pencil"></i>
                    </button> &nbsp;
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="anularLista(item.id)"
                    >
                      <i class="icon-trash"></i>
                    </button>
                   </td>
                   <td v-text="item.id"></td>
                   <td v-text="item.descripcion"></td>
                 </tr>
              </tbody>
            </table>
             <nav>
              <ul class="pagination">
                <li class="page-item" v-if="paginacion.current_page > 1">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPaginaListar(paginacion.current_page - 1,campoBuscarListar,nombreCampoListar)"
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
                    @click.prevent="cambiarPaginaListar(page,campoBuscarListar,nombreCampoListar)"
                    v-text="page"
                  ></a>
                </li>
                <li class="page-item" v-if="paginacion.current_page < paginacion.last_page">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPaginaListar(paginacion.current_page + 1,campoBuscarListar,nombreCampoListar)"
                  >Sig</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </template>
    </div>
  
  </main>
</template>

<script src="../../Scripts/General/ListaPrecioMedicamentos.js" ></script>
 
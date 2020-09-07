<template>
  <main class="main">
    <div class="container-fluid">
      <div class="card mt-2">
        <div class="card-header">
          <h5>Proveedor</h5>
        </div>
        <div class="card-body">
          <template v-if="listado==1">
            <button type="button" class="btn btn-secondary btn-sm" @click="mostrarFormulario()">
              <i class="icon-plus"></i>&nbsp;Nuevo
            </button>
            <hr />
            <div class="table-responsive">
              <table class="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th width="100" class="text-center">Opciones</th>
                    <th width="200" class="text-center">Proveedor</th>
                    <th width="100" class="text-center">Dia de Entrega</th>
                    <th width="100" class="text-center">Dia de Plazo</th>
                    <th width="100" class="text-center">Dia de devolucion</th>
                    <th width="100" class="text-center">Forma de Pago</th>
                    <th width="100" class="text-center">Regimen</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in arrayProveedor" :key="index">
                    <td class="text-center">
                      <button
                        type="button"
                        class="btn btn-warning btn-sm"
                        @click="editarRegistro(item.id,item.idTercero,item.proveedor)"
                      >
                        <i class="icon-pencil"></i>
                      </button> &nbsp;
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="anularProveedor(item.id)"
                      >
                        <i class="icon-trash"></i>
                      </button>
                    </td>
                    <td class="text-center" v-text="item.proveedor"></td>
                    <td class="text-center" v-text="item.diaEntrega"></td>
                    <td class="text-center" v-text="item.diaPlazo"></td>
                    <td class="text-center" v-text="item.diaDevolucion"></td>
                    <td class="text-center" v-text="item.formaPago"></td>
                    <td class="text-center" v-text="item.regimen"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>

          <template v-else-if="listado==0">
            <div class="card-body" id="formularioregistros">
              <form>
                <div class="form-row">
                  <div class="col-md-6 mb-2">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        :disabled="editable==1"
                        v-model="tercero"
                        v-bind:style="tercero == 0 ?'background-color: #FEF9E7':''"
                      />
                      <button
                        type="button"
                        :disabled="accion==1"
                        class="btn btn-primary btn-sm"
                        @click="abrirModal()"
                      >
                        <i class="fa fa-search"></i> Buscar Tercero
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="form-row">
                  <div class="form-group col-xs-12 col-lg-3 col-sm-6 col-md-3 col-xl-3">
                    <label for="idDiaEntrega">Dia de Entrega:</label>
                    <select
                      class="form-control selectpicker form-control-sm"
                      v-model="idDiaEntrega"
                      v-bind:style="idDiaEntrega == 0 ?'background-color: #FEF9E7':''"
                    >
                      <option selected :value="0" disabled>Seleccionar</option>
                      <option
                        v-for="item in arrayDatos"
                        :key="item.id"
                        :value="item.id"
                        v-text="item.Descripcion"
                      ></option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-lg-3 col-sm-6 col-md-3 col-xl-3">
                    <label>Dia de Plazo:</label>
                    <select class="form-control selectpicker form-control-sm" 
                    v-model="idDiaPlazo"
                    v-bind:style="idDiaPlazo == 0 ?'background-color: #FEF9E7':''">
                      <option selected :value="0" disabled>Seleccionar</option>
                      <option
                        v-for="item in arrayDatos"
                        :key="item.id"
                        :value="item.id"
                        v-text="item.Descripcion"
                      ></option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-lg-3 col-sm-6 col-md-3 col-xl-3">
                    <label>Dia de Devolucion:</label>
                    <select
                      class="form-control selectpicker form-control-sm"
                      v-model="idDiaDevolucion"
                      v-bind:style="idDiaDevolucion == 0 ?'background-color: #FEF9E7':''"
                    >
                      <option selected :value="0" disabled>Seleccionar</option>
                      <option
                        v-for="item in arrayDatos"
                        :key="item.id"
                        :value="item.id"
                        v-text="item.Descripcion"
                      ></option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-lg-3 col-sm-6 col-md-3 col-xl-3">
                    <label for="formapago">Forma de Pago:</label>
                    <select
                      name="formapago"
                      class="form-control selectpicker form-control-sm"
                      v-model="idFormaPago"
                      v-bind:style="idFormaPago == 0 ?'background-color: #FEF9E7':''"
                    >
                      <option value="0" disabled>Seleccionar</option>
                      <option value="1">Credito</option>
                      <option value="2">Contado</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-lg-3 col-sm-6 col-md-3 col-xl-3">
                    <label for="idRegimen">Regimen:</label>
                    <select
                      name="idRegimen"
                      class="form-control selectpicker form-control-sm"
                      v-model="idRegimen"
                      v-bind:style="idRegimen == 0 ?'background-color: #FEF9E7':''" 
                    >

                      <option value="0" disabled>Seleccionar</option>
                      <option value="1">Contribuyente</option>
                      <option value="2">Simplificado</option>
                      <option value="3">Comun</option>
                    </select>
                  </div>
                   </div>
              </form>
            </div>
          </template>
        </div>
      </div>
      <template v-if="listado ==0">
        <div class="card">
          <div class="card-header"><h5>Cuenta bancaria</h5></div>
          <div class="card-body">
              <div class="form-row">
                <div class="form-group col-xs-12 col-lg-3 col-sm-6 col-md-3 col-xl-3">
                    <label>Banco:</label>
                    <select
                      class="form-control selectpicker form-control-sm"
                      v-model="idBanco"
                      v-bind:style="idBanco == 0 ?'background-color: #FEF9E7':''"
                    >
                      <option selected :value="0" disabled>Seleccionar</option>
                      <option
                        v-for="item in arrayBancos"
                        :key="item.id"
                        :value="item.id"
                        v-text="item.Descripcion"
                      ></option>
                    </select>
                  </div>
               <div class="form-group col-xs-12 col-lg-3 col-sm-6 col-md-3 col-xl-3">
                  <label for="idTipoCuenta">Tipo de Cuenta:</label>
                  <select
                      name="idTipoCuenta"
                      class="form-control selectpicker form-control-sm"
                      v-model="idTipoCuenta"
                      v-bind:style="idTipoCuenta == 0 ?'background-color: #FEF9E7':''"
                    >
                      <option value="0" disabled>Seleccionar</option>
                      <option value="1">Cuenta de ahorros</option>
                      <option value="2">Cuenta corriete</option>
                    </select>
                </div>
                <div class="form-group col-xs-12 col-lg-3 col-sm-6 col-md-3 col-xl-3">
                    <label for="identificacion">Identificacion:</label>
                    <input type="text"
                      name="identificacion"
                      maxlength="100"
                      class="form-control selectpicker form-control-sm"
                      v-model="identificacion"
                      v-bind:style="identificacion == 0 ?'background-color: #FEF9E7':''"
                     >
                    </div> 
                    <div class="form-group col-xs-12 col-lg-3 col-sm-6 col-md-3 col-xl-3">
                    <label for="numeroCuenta">Numero de cuenta:</label>
                    <input type="text"
                      name="numeroCuenta"
                      maxlength="100"
                      class="form-control selectpicker form-control-sm"
                      v-model="numeroCuenta"
                      v-bind:style="numeroCuenta == 0 ?'background-color: #FEF9E7':''"
                     >
                    </div> 
              
                  <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button
                    v-if="accion == 0"
                      class="btn btn-success btn-sm"
                      type="button"
                      @click="guardarProveedor()"
                    >
                      <i class="fa fa-save"></i> Guardar
                    </button>
                    <button
                    v-else
                    class="btn btn-success btn-sm"
                    type="button"
                    @click="actualizar()"
                  >
                   <i class="fa fa-save"></i> Actualizar
                    </button>
                    <button
                      class="btn btn-danger btn-sm"
                      type="button"
                      @click="cancelar()"
                    >
                      <i class="fa fa-arrow-circle-left"></i> Cancelar
                    </button>
                  </div>
                </div>
          </div>
        </div>
      </template>
               
      <!-- Fin ejemplo de tabla Listado <template v-if="listado==3">
                <resolucion-component></resolucion-component>
      </template>-->
    </div>
    <!--Inicio del modal agregar/actualizar-->
    <!--Fin del modal-->
    <!-- Inicio del modal Eliminar -->
    <div
      class="modal fade"
      id="modalEliminar"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      style="display: none;"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title"></h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Estas seguro de eliminar el registro?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-danger">Eliminar</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- Fin del modal Eliminar -->

    <ModalGeneral
      v-if="modal"
      v-bind:objTitulo="objTituloTercero"
      tituloModal="Busqueda de terceros"
      url="/proveedor/consultar"
      :arrayCampos="arrayCamposTercero"
      :modal="modal"
      @datos="arrayDatosTerceros = $event"
      @cerrar="modal = $event"
      v-on:llamarFuncion="agregarDatos"
      v-on:llamarMetodo="cerrarModal"
    ></ModalGeneral>
  </main>
</template>

<script src="../../Scripts/Administracion/Proveedor.js"></script>
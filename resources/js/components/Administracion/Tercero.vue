<template>
    <div class="main">
        <div class="container-fluid">
          <form>
            <div class="card">
                <div class="card-header"><h5>Terceros</h5></div>
                 <div class="card-body">
                    <template v-if="listado==1">
                          <button
                          type="button"
                          class="btn btn-secondary btn-sm"
                          @click="mostrarFormulario()"
                           >
                          <i class="icon-plus"></i>&nbsp;Nuevo
                          </button>
                         <hr>
                         <table class="table table-bordered table-hover table-sm">
                        <thead>
                        <tr>
                          <th width="10">Opciones</th>
                          <th width="10">Documento</th>
                          <th width="50">Tercero</th>
                          <th width="20">Direccion</th> 
                          <th width="10">Telefono</th>
                          <th width="10">Celular</th>
                          <th width="10">Email</th>
                        </tr>
                     </thead>
                     <tbody>
                     <tr v-for="(item, index) in arrayTercero" :key="index"> 
                     <td>
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
                    >
                    <i class="icon-trash"></i>
                    </button>
                  </td>
                  <td v-text="item.documento"></td>
                  <td v-text="item.tercero"></td>
                  <td v-text="item.direccion"></td>
                  <td v-text="item.telefono"></td>
                  <td v-text="item.celular"></td>
                  <td v-text="item.email"></td>
                </tr>
                </tbody>
                </table>      
         </template>

         <template v-else>
               <div class="form-row">
                   <div class="form-group col-xs-12 col-lg-3 col-sm-3 col-md-3 col-xl-3">
                       <label for="tipoIdenti"> T. Identificación:</label>
                       <select
                         name="tipoIdenti"
                         class="form-control selectpicker"
                         v-model="idTdentificacion"
                         v-bind:style="idTdentificacion == 0 ?'background-color: #FEF9E7':''"
                       >
                       <option selected :value="0" disabled>Seleccionar</option>
                       <option
                          v-for="item in arrayTipoIdent"
                          :key="item.id"
                          :value="item.id"
                          v-text="item.descripcion"
                        ></option>
                       </select>
                   </div>
                   <div class="form-group col-xs-10 col-lg-3 col-sm-3 col-md-3 col-xl-3">
                    <label for="txtIdent">Identificación o Nit:</label>
                    <input type="text"
                       name="txtIdent"
                       class=" form-control"
                       maxlength="10"
                       v-model="identificacion"
                       placeholder="ingresa la cedula"
                      v-bind:style="identificacion == '' ?'background-color: #FEF9E7':''"
                       @change="calcularDigitoVerificacion(identificacion)"
                     >
                   </div>
                   <div class="form-group col-1" v-if="idRut == 2">
                    <label for="dv">dv:</label>
                    <input type="text"
                      name="dv"
                      class=" form-control text-center"
                      disabled
                      v-model="dv"
                     >
                 </div>
                   <div class="form-group col-xs-12 col-lg-2 col-sm-2 col-md-2 col-xl-2">
                     <label for="rut">Rut</label>
                       <select
                         name="rut"
                         class="form-control selectpicker"
                         v-model="idRut"
                         v-bind:style="idRut == 0 ?'background-color: #FEF9E7':''"
                         :disabled="accion == 1"
                       >
                       <option value="0" disabled>Seleccionar</option>
                       <option value="1">No</option>
                       <option value="2">SI</option>
                       </select>
                 </div>
                    <div class="form-group col-xs-12 col-lg-3 col-sm-3 col-md-3 col-xl-3" v-if="idRut == 2" >
                    <label for="idTpersona">Tipo de Persona:</label>
                       <select
                         name="idTpersona"
                         class="form-control selectpicker"
                         v-model="idTpersona"
                         v-bind:style="idTpersona == 0 ?'background-color: #FEF9E7':''"
                          :disabled="accion == 1"
                       >
                       <option selected :value="0" disabled>Seleccionar</option>
                       <option
                          v-for="item in arrayTipoPersona"
                          :key="item.id"
                          :value="item.id"
                          v-text="item.Descripcion"
                        ></option>
                       </select>
                 </div>
               </div> 
              </template>
            </div>
           </div>
           <template v-if="idRut == 2">
             <div class="card">
                <div class="card-header"><h5>Datos del Rut.</h5></div>
                <div class="card-body">
                  <div class="form-group col-xs-12">
                      <button type="button" class="btn btn-primary btn-sm" @click="agregarFilas()">
                        <i class="icon-plus"></i>
                      </button>
                      <hr />
                      <table class="table table-bordered table-responsive table-sm">
                        <thead>
                          <tr>
                            <th class="text-center" width="50">Quitar</th>
                            <th class="text-center" width="20">Respons/des</th>
                            <th class="text-center" width="10">Act/Eco</th>
                            <th class="text-center" width="10">Fec/Act/Eco</th>
                            <th class="text-center" width="10">Fec/Act/Rut</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(items,i) in arrayRut" :key="i">
                            <td class="text-center">
                              <button
                                type="button"
                                class="btn btn-danger btn-sm"
                                @click="deleteRow(i, arrayRut)"
                              >
                                <i class="icon-trash"></i>
                              </button>
                            </td>
                            <td>
                              <input
                                type="text"
                                maxlength="10"
                                class="form-control"
                                v-model="items.respons"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                maxlength="10"
                                class="form-control"
                                v-model="items.actEco"
                              />
                            </td>
                            <td>
                               <input
                                 type="date"
                                 class="form-control"
                                 v-model="items.fecAct"
                               />
                            </td>
                            <td>
                               <input
                                 type="date"
                                 class="form-control"
                                 v-model="items.fecRut"
                               />
                            </td>
                          </tr>
                        </tbody>
                      </table>   
                 </div>
               </div>
             </div>
           </template>
           <template v-if="idTpersona == 1080 || idRut == 1">
               <div class="card">
                 <div class="card-header"><h5>Persona Natural.</h5></div>
                   <div class="card-body">
                    <div class="form-row">
                    <div class="form-group col-xs-12 col-lg-2 col-sm-2 col-md-2 col-xl-2">
                    <label for="pNombre">Primer Nombre:</label>
                    <input type="text"
                      name="pNombre"
                      maxlength="50"
                      placeholder="ingresa el Primer Nombre"
                      class=" form-control"
                      v-model="pNombre"
                      v-bind:style="pNombre == '' ?'background-color: #FEF9E7':''"
                     >
                    </div>
                    <div class="form-group col-xs-12 col-lg-2 col-sm-2 col-md-2 col-xl-2">
                    <label for="sNombre">Segundo Nombre:</label>
                    <input type="text"
                      name="sNombre"
                      maxlength="50"
                      placeholder="ingresa el Segundo Nombre"
                      class=" form-control"
                      v-model="sNombre"
                      v-bind:style="sNombre == '' ?'background-color: #FEF9E7':''"
                     >
                    </div>
                     <div class="form-group col-xs-12 col-lg-2 col-sm-2 col-md-2 col-xl-2">
                     <label for="pApellido">Primer Apellido:</label>
                     <input type="text"
                      name="pApellido"
                      maxlength="50"
                      placeholder="ingresa el Primer Apellido"
                      class=" form-control"
                      v-model="pApellido"
                      v-bind:style="pApellido == '' ?'background-color: #FEF9E7':''"
                     >
                    </div>
                     <div class="form-group col-xs-12 col-lg-2 col-sm-2 col-md-2 col-xl-2">
                     <label for="sApellido">Segundo Apellido:</label>
                     <input type="text"
                      name="sApellido"
                      maxlength="50"
                      placeholder="ingresa el Segundo Apellido"
                      class=" form-control"
                      v-model="sApellido"
                      v-bind:style="sApellido == '' ?'background-color: #FEF9E7':''"
                     >
                    </div>
                    <div class="form-group col-xs-12 col-lg-2 col-sm-2 col-md-4 col-xl-2">
                    <label for="fechaNacimiento">Fecha de Nacimiento:</label>
                    <input
                      type="date"
                      name="fechaNacimiento"
                      class="form-control"
                      v-model="fechaNacimiento"
                      v-bind:style="fechaNacimiento == '' ?'background-color: #FEF9E7':''"
                    />
                   </div>
                   <div class="form-group col-xs-12 col-lg-2 col-sm-2 col-md-2 col-xl-2">
                      <label for="genero">Genero:</label>
                      <select
                      class="form-control selectpicker"
                      name="genero"
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
                  </div>
                  </div>
               </div>
           </template>
           <template v-else-if="idTpersona == 1079">
             <div class="card">
               <div class="card-header"><h5>Persona Juridica.</h5></div>
               <div class="card-body">
                <div class="form-row">
                <div class="form-group col-xs-12 col-lg-4 col-sm-4 col-md-4 col-xl-4">
                    <label for="razonSocial">Razon Social:</label>
                    <input type="text"
                      name="razonSocial"
                      maxlength="100"
                      placeholder="ingresa la Razon Social"
                      class=" form-control"
                      v-model="razonSocial"
                      v-bind:style="razonSocial == '' ?'background-color: #FEF9E7':''"
                     >
                </div>
                <div class="form-group col-xs-12 col-lg-4 col-sm-4 col-md-4 col-xl-4">
                    <label for="nComencial">Nombre Comercial:</label>
                    <input type="text"
                      name="nComencial"
                      maxlength="100"
                      placeholder="ingresa el Nombre Comercial"
                      class=" form-control"
                      v-model="nComencial"
                     >
                </div>  
                 <div class="form-group col-xs-12 col-lg-4 col-sm-4 col-md-4 col-xl-4">
                    <label for="representante">Representante:</label>
                    <input type="text"
                      name="representante"
                      maxlength="100"
                      placeholder="ingresa el Representante"
                      class=" form-control"
                      v-model="representante"
                     >
                </div> 
               </div>
              </div>
             </div>
           </template>
           <template v-if="listado == 0">
             <div class="card">
               <div class="card-header"><h5>Complemento:</h5></div>
               <div class="card-body">
                 <div class="form-row">
                    <div class="form-group col-xs-12 col-lg-6 col-sm-6 col-md-6 col-xl-6">
                    <label for="direccion">Dirección:</label>
                    <input type="text"
                      name="direccion"
                      maxlength="100"
                      placeholder="ingresa la Direccion"
                      class=" form-control"
                      v-model="direccion"
                      v-bind:style="direccion == '' ?'background-color: #FEF9E7':''"
                     >
                    </div> 
                    <div class="form-group col-xs-12 col-lg-3 col-sm-3 col-md-3 col-xl-3">
                    <label for="telefono">Telefono:</label>
                    <input type="text"
                      name="telefono"
                      maxlength="10"
                      placeholder="ingresa el Telefono"
                      class=" form-control"
                      v-model="telefono"
                      v-bind:style="telefono == '' ?'background-color: #FEF9E7':''"
                     >
                    </div>  
                    <div class="form-group col-xs-12 col-lg-3 col-sm-3 col-md-3 col-xl-3">
                    <label for="celular">Celular:</label>
                    <input type="text"
                      name="celular"
                      maxlength="10"
                      placeholder="Celulat"
                      class=" form-control"
                      v-model="celular"
                      v-bind:style="celular == '' ?'background-color: #FEF9E7':''"
                     >
                    </div> 
                    <div class="form-group col-xs-12 col-lg-6 col-sm-6 col-md-6 col-xl-6">
                    <label for="email">Email:</label>
                    <input type="email"
                      name="email"
                      maxlength="100"
                      placeholder="ingresa el Email"
                      class=" form-control"
                      v-model="email"
                     >
                    </div> 
                    <div class="form-group col-xs-12 col-lg-3 col-sm-3 col-md-3 col-xl-3">
                    <label for="departamento">Departamento:</label>
                      <select
                      class="form-control selectpicker"
                      name="departamento"
                      v-model="idDepartamento"
                      @change="cargarComboMunicipio"
                      v-bind:style="idDepartamento == 0 ?'background-color: #FEF9E7':''"
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
                    <div class="form-group col-xs-12 col-lg-3 col-sm-3 col-md-3 col-xl-3">
                    <label for="municipio">Municipio:</label>
                    <select
                      class="form-control selectpicker"
                      name="municipio"
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
                 </div>
               </div>
               <div class="form-group col-12">
                    <button v-if="accion == 0" 
                       class="btn btn-success mt-20"
                       type="button"
                       @click="guardarTercero()"
                       >
                      <i class="fa fa-save"></i> Guardar
                    </button>
                    <button v-else 
                      class="btn btn-success mt-40" 
                      type="button"
                      @click="actualizarTercero()"
                      >
                      <i class="fa fa-save"></i> Actualizar
                    </button>
                    <button class="btn btn-danger" 
                            type="button"
                           @click="cancelarRegistro()"
                            >
                      <i class="fa fa-arrow-circle-left"></i> Cancelar
                    </button>
                  </div>
             </div>
           </template>
         </form>
         </div>
        </div>
</template>

<script src="../../Scripts/Administracion/Tercero.js"></script>
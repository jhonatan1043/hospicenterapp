<template>
    <div class="card-body" id="resolucion">
                       <div class="form-row">
                        <div class="form-group col-lg-2 col-md-6 col-sm-6 col-xs-12">
                          <label>Codigo:</label>
                          <input type="hidden" name="idEmpresa" id="idEmpresa" />
                          <input
                            type="text"
                            class="form-control"
                            name="nit"
                            id="nit"
                            maxlength="100"
                            placeholder="Codigo"
                            required
                          />
                        </div>
                   
                        <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                          <label>Resolucion:</label>
                          <input
                            type="text"
                            class="form-control"
                            name="razonSocial"
                            id="razonSocial"
                            maxlength="256"
                            placeholder="Digite resolucion"
                            required
                          />
                        </div>
                         <div class="form-group col-lg-3 col-md-6 col-sm-6 col-xs-12">
                      <label>Empresa:</label>
                      <select
                        id="idEmpresa"
                        name="idEmpresa"
                        class="form-control selectpicker"
                        data-live-search="true"
                        required
                      ></select>
                    </div>
                        <div class="form-group col-lg-2 col-md-6 col-sm-6 col-xs-12">
                          <label>Prefijo:</label>
                         <input
                            type="text"
                            class="form-control"
                            name="razonSocial"
                            id="razonSocial"
                            maxlength="256"
                            placeholder="Prefijo"
                            required>
                        </div>
                        <div class="form-group col-lg-2 col-md-6 col-sm-6 col-xs-12">
                          <label>Desde:</label>
                          <input
                            type="number"
                            class="form-control"
                            name="desde"
                            id="desde"                                                  
                            required>
                        </div>
                        <div class="form-group col-lg-2 col-md-6 col-sm-6 col-xs-12">
                          <label>Hasta:</label>
                          <input
                            type="number"
                            class="form-control"
                            name="hasta"
                            id="hasta"
                            required>
                        </div>

                        <div class="form-group col-lg-2 col-md-6 col-sm-6 col-xs-12">
                          <label>Actual:</label>
                          <input
                            type="number"
                            class="form-control"
                            name="direccion"
                            id="direccion"
                            required
                          />
                        </div>

                        <div class="form-group col-lg-2 col-md-6 col-sm-6 col-xs-12">
                          <label>Fecha inicio:</label>
                          <input
                            type="date"
                            class="form-control"
                            name="direccion"
                            id="direccion"
                            required
                          />
                        </div>

                        <div class="form-group col-lg-2 col-md-6 col-sm-6 col-xs-12">
                          <label>Fecha vencimiento:</label>
                          <input
                            type="date"
                            class="form-control"
                            name="direccion"
                            id="direccion"
                            required
                          />
                        </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <button class="btn btn-success mt-20" type="submit" id="btnGuardar">
                        <i class="fa fa-save"></i> Guardar
                      </button>

                      <button class="btn btn-danger" @click="ocultarFormulario()" type="button">
                        <i class="fa fa-arrow-circle-left"></i> Cancelar
                      </button>
                    </div>
                      </div>
                      </div>
                      
</template>

<script>
export default {
    
}
</script>
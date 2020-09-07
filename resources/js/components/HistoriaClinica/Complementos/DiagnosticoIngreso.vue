<template>
  <div>
    <div class="shadow-none p-2 mb-2 bg-light">
      <h6>Diagnosticos de Ingreso:</h6>
    </div>
    <div class="table-responsive">
      <table class="table table-sm table-bordered table-hover">
        <thead>
          <tr>
            <th class="text-center" width="20">Codigo</th>
            <th class="text-center" width="500">Diagnostico</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in arrayDigRem" :key="index">
            <td v-text="item.id"></td>
            <td v-text="item.descripcion"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="shadow-none p-2 mb-2 bg-light">
      <h6>Diagnosticos de Impregnacion:</h6>
    </div>
    <button type="button" class="btn btn-primary btn-sm" @click="agregarFilas()">
      <i class="icon-plus"></i>
    </button>
    <hr />
    <div class="table-responsive">
      <table class="table table-sm table-bordered table-hover">
        <thead>
          <tr>
            <th class="text-center" width="10">Opciones</th>
            <th class="text-center" width="20">Codigo</th>
            <th class="text-center" width="500">Diagnostico</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in arryDiagIng" :key="index">
            <td class="text-center">
              <button type="button" class="btn btn-danger btn-sm">
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
</template>
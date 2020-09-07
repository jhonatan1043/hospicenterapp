<template>
  <main>
    <div class="card">
      <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3">
        <button
          class="btn btn-warning btn-sm"
          type="button"
          :disabled="btEditar==0"
          @click="editar()"
        >
          <i class="icon-pencil"></i>&nbsp;Editar
        </button>
        <button
          class="btn btn-success btn-sm"
          type="button"
          @click="ingresoNeonatocrear()"
          :disabled="btGuardar==0"
        >
          <i class="fa fa-arrow-circle-left"></i>&nbsp;Guardar
        </button>
        <button
          class="btn btn-primary btn-sm"
          type="button"
          :disabled="btCancelar==0"
          @click="cancelar()"
        >
          <i class="fa fa-arrow-circle-left"></i>&nbsp;Cancelar
        </button>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" href="#dIngreso" data-toggle="tab">Ingreso</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#dRecienNac" data-toggle="tab">Datos del Parto</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#puntuacion" data-toggle="tab">Puntuaciones</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#examenFisico" data-toggle="tab">Examén Fisico</a>
          </li>
        </ul>
        <div class="tab-content container-fluid scroll">
          <div class="tab-pane active" id="dIngreso">
            <div class="card-body">
              <form>
                <div class="shadow-none p-2 mb-2 bg-light">
                  <h6>Datos de la Madre</h6>
                </div>
                <div class="form-row">
                  <div class="form-group col-xl-3 col-lg-2 col-md-4 col-sm-2 col-xs-12">
                    <label>Tipo de Identificación:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idTipoIdentificacionMad"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option
                        v-for="item in arrayTipoIdent"
                        :key="item.id"
                        :value="item.id"
                        v-text="item.descripcion"
                      ></option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-2 col-md-4 col-sm-2 col-xs-12">
                    <label>Identificación:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="26"
                      placeholder="Digite la Identificacíon"
                      required
                      v-model="identificacionMad"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-4 col-md-2 col-sm-4 col-xs-12">
                    <label>Nombres:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite los nombres"
                      required
                      v-model="NombresMad"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-4 col-md-2 col-sm-4 col-xs-12">
                    <label>Apellidos:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite los apellidos"
                      required
                      v-model="apellidosMad"
                      :disabled="editable==0"
                    />
                  </div>
                  <!--2 Fila-->
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Fecha de Nacimiento:</label>
                    <input
                      type="date"
                      class="form-control"
                      required
                      v-model="fechaNacimientoMad"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-4 col-sm-2 col-xs-12">
                    <label>Estado Civil:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idEstadoCivilMad"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option
                        v-for="item in arrayEstado"
                        :key="item.id"
                        :value="item.id"
                        v-text="item.Descripcion"
                      ></option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-12">
                    <label>Grupo Sanguineo:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idgrupoSanguineoMad"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1" >O+</option>
                      <option selected :value="2" >O-</option>
                      <option selected :value="3" >A+</option>
                      <option selected :value="3" >A-</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Direccion:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="50"
                      placeholder="Digite la direccion"
                      v-model="direccionMad"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-12">
                    <label>Telefono:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="10"
                      placeholder="Digite el telefono"
                      v-model="telefonoMad"
                      :disabled="editable==0"
                    />
                  </div>
                  <!--3 Fila-->
                  <div class="form-group col-xl-3 col-lg-4 col-md-2 col-sm-4 col-xs-12">
                    <label>Pais:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idPaisMad"
                      @change="cargarComboDepartamento(idPaisMad)"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option
                        v-for="itemPais in arrayPais"
                        :key="itemPais.idPais"
                        :value="itemPais.idPais"
                        v-text="itemPais.descripcion"
                      ></option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-4 col-md-2 col-sm-4 col-xs-12">
                    <label>Departamento:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idDepartamentoMad"
                      @change="cargarComboMunicipio(idDepartamentoMad)"
                      :disabled="editable==0"
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
                  <div class="form-group col-xl-3 col-lg-4 col-md-2 col-sm-4 col-xs-12">
                    <label>Municipio:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idMunicipioMad"
                      :disabled="editable==0"
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
                <div class="shadow-none p-2 mb-2 bg-light">
                  <h6>Datos del Padre:</h6>
                </div>
                <div class="form-row">
                  <div class="form-group col-xl-3 col-lg-2 col-md-4 col-sm-2 col-xs-12">
                    <label>Tipo de Identificación:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idTipoIdentificacionPat"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option
                        v-for="item in arrayTipoIdent"
                        :key="item.id"
                        :value="item.id"
                        v-text="item.descripcion"
                      ></option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-2 col-md-4 col-sm-2 col-xs-12">
                    <label>Identificación:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="26"
                      placeholder="Digite la Identificacíon"
                      required
                      v-model="identificacionPat"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-4 col-md-2 col-sm-4 col-xs-12">
                    <label>Nombres:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite los nombres"
                      required
                      v-model="NombresPat"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-4 col-md-2 col-sm-4 col-xs-12">
                    <label>Apellidos:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite los apellidos"
                      required
                      v-model="apellidosPat"
                      :disabled="editable==0"
                    />
                  </div>
                  <!--2 Fila-->
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Fecha de Nacimiento:</label>
                    <input
                      type="date"
                      class="form-control"
                      required
                      v-model="fechaNacimientoPat"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-4 col-sm-2 col-xs-12">
                    <label>Estado Civil:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idEstadoCivilPat"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option
                        v-for="item in arrayEstado"
                        :key="item.id"
                        :value="item.id"
                        v-text="item.Descripcion"
                      ></option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-12">
                    <label>Grupo Sanguineo:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idgrupoSanguineoPat"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1" >O+</option>
                      <option selected :value="2" >O-</option>
                      <option selected :value="3" >A+</option>
                      <option selected :value="3" >A-</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Direccion:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="50"
                      placeholder="Digite la direccion"
                      v-model="direccionPat"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-12">
                    <label>Telefono:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="10"
                      placeholder="Digite el telefono"
                      v-model="telefonoPat"
                      :disabled="editable==0"
                    />
                  </div>
                  <!--3 Fila-->
                  <div class="form-group col-xl-3 col-lg-4 col-md-2 col-sm-4 col-xs-12">
                    <label>Pais:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idPaisPat"
                      @change="cargarComboDepartamento(idPaisPat)"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option
                        v-for="itemPais in arrayPais"
                        :key="itemPais.idPais"
                        :value="itemPais.idPais"
                        v-text="itemPais.descripcion"
                      ></option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-4 col-md-2 col-sm-4 col-xs-12">
                    <label>Departamento:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idDepartamentoPat"
                      @change="cargarComboMunicipio(idDepartamentoPat)"
                      :disabled="editable==0"
                    >
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
                  <div class="form-group col-xl-3 col-lg-4 col-md-2 col-sm-4 col-xs-12">
                    <label>Municipio:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idMunicipioPat"
                      :disabled="editable==0"
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
                <div class="shadow-none p-2 mb-2 bg-light">
                  <h6>Datos Maternos:</h6>
                </div>
                <div class="form-row">
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Combs Indirecto:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="20"
                      placeholder="Digite el Combs Indirecto"
                      required
                      v-model="combs"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <label>Habito:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite el Habito"
                      required
                      v-model="habito"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-2 col-md-2 col-sm-2 col-xs-12">
                    <label>Embarazo N°:</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      required
                      v-model="nEmbarazo"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-2 col-md-2 col-sm-2 col-xs-12">
                    <label>Parto a Termino N°:</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      required
                      v-model="pTermino"
                      :disabled="editable==0"
                    />
                  </div>
                  <!-- Otra Fila -->
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Parto Prematuro N°:</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      required
                      v-model="pPrematuro"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <label>Cesarea N°:</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      required
                      v-model="cesarea"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-2 col-md-2 col-sm-2 col-xs-12">
                    <label>Aborto N°:</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      required
                      v-model="aborto"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-2 col-md-2 col-sm-2 col-xs-12">
                    <label>Nacidos Vivos N°:</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      required
                      v-model="nVivos"
                      :disabled="editable==0"
                    />
                  </div>
                  <!-- otra fila -->
                  <div class="form-group col-xl-3 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <label>Mortinatos N°:</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      required
                      v-model="mortinatos"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-2 col-md-2 col-sm-2 col-xs-12">
                    <label>Hijo Vivos N°:</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      required
                      v-model="hVivo"
                      :disabled="editable==0"
                    />
                  </div>
                </div>
                <div class="shadow-none p-2 mb-2 bg-light">
                  <h6>Embarazo Actual:</h6>
                </div>
                <div class="form-row">
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Fum:</label>
                    <input
                      type="date"
                      class="form-control form-control-sm"
                      v-model="fum"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>FPP:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite el FPP"
                      required
                      v-model="fpp"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Edad Gestacional con Ecografia:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite la edad"
                      required
                      v-model="edadGestacional"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Control Prenatal:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idControlPrenatal"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Lugar:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite el lugar"
                      required
                      v-model="lugarControlPren"
                      :disabled="idControlPrenatal != 1"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Numero:</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      required
                      v-model="numeroControl"
                      :disabled="idControlPrenatal != 1"
                    />
                  </div>
                </div>
                <div class="shadow-none p-2 mb-2 bg-light">
                  <h6>Perfil Infeccioso:</h6>
                </div>
                <div class="form-row">
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Cultivo Recto Vaginal:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idCultRectoVaginal"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Resultado:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite el resultado"
                      required
                      v-model="resultadoCul"
                      :disabled="idCultRectoVaginal !=1"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Taxoplasma:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="50"
                      placeholder="Digite el Taxoplasma"
                      required
                      v-model="taxoplasma"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Sifilis:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="50"
                      placeholder="Digite el Sifilis"
                      required
                      v-model="sifilis"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>VIH:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="50"
                      placeholder="Digite VIH"
                      required
                      v-model="vih"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Estreptococo del Grupo B:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="50"
                      placeholder="Digite el Estreptococo"
                      required
                      v-model="estreptococo"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Otras Serologias:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="50"
                      placeholder="Digite las otras serologias"
                      required
                      v-model="oSerologias"
                      :disabled="editable==0"
                    />
                  </div>
                </div>
                <div class="shadow-none p-2 mb-2 bg-light">
                  <h6>Medicación Durante la Gestación:</h6>
                </div>
                <div class="form-row">
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Maduración Fetal:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idMaduracionFetal"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Medicación:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite los medicamento"
                      required
                      v-model="medicacion"
                      :disabled="idMaduracionFetal!=1"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Dosis:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite las dosis"
                      required
                      v-model="dosis"
                      :disabled="idMaduracionFetal!=1"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Riesgo de la Gestación:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idRiesgoGestacion"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Bajo</option>
                      <option selected :value="2">Medio</option>
                      <option selected :value="3">alto</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Fecha:</label>
                    <input
                      type="date"
                      class="form-control form-control-sm"
                      required
                      v-model="fechaMaduracion"
                      :disabled="editable==0"
                    />
                  </div>
                  <!-- otra fila -->
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Patologia Materna:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite la patologia Materna"
                      required
                      v-model="patologiaMat"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-12">
                    <label>Observaciones:</label>
                    <textarea
                      type="textArea"
                      class="form-control form-control-sm"
                      maxlength="200"
                      required
                      v-model="observacion"
                      :disabled="editable==0"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- parte2 del formato datos del parto-->
          <div class="tab-pane" id="dRecienNac">
            <div class="card-body">
              <form>
                <div class="form-row">
                  <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <label>Amniorrexis:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idAmniorrexis"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Espontanea</option>
                      <option selected :value="2">Artificial</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <label>RPM:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idRpm"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <label>Hora:</label>
                    <input
                      type="time"
                      class="form-control form-control-sm"
                      v-model="horaParto"
                      :disabled="idRpm!=1"
                    />
                  </div>
                  <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <label>Dias:</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      required
                      v-model="diasParto"
                      :disabled="idRpm!=1"
                    />
                  </div>
                  <!-- otra fila --->
                  <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <label>Aspecto:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idAspecto"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Claro</option>
                      <option selected :value="2">Meconial</option>
                      <option selected :value="3">Hematico</option>
                      <option selected :value="4">Purulento</option>
                      <option selected :value="5">Fetido</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <label>Cantidad:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idCantAmniorrexis"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Normal</option>
                      <option selected :value="2">Polidramnios</option>
                      <option selected :value="3">Oligoamnios</option>
                    </select>
                  </div>
                  <div class="form-group col-12">
                    <label>Observaciones:</label>
                    <textarea
                      type="textArea"
                      class="form-control form-control-sm"
                      maxlength="200"
                      v-model="observacionAmn"
                      :disabled="editable==0"
                    />
                  </div>
                  <!-- otra fila --->
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Hospitalario:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idhospitalario"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>ExtraHospitalario:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idextraHospitalario"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Lugar del Parto:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite el lugar del parto"
                      required
                      v-model="lParto"
                      :disabled=" idhospitalario !=1 || idextraHospitalario !=1"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Tipo de Parto:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idTParto"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Inducido</option>
                      <option selected :value="2">Conducido</option>
                      <option selected :value="3">Cesarea Urgente</option>
                      <option selected :value="4">Cesarea Electiva</option>
                    </select>
                  </div>
                  <!-- Otra Fila -->
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Motivo de Cesarea:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite el motivo de la cesarea"
                      required
                      v-model="mCesarea"
                      :disabled="idTParto <= 2"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Medicacion:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite la medicación"
                      required
                      v-model="medicacionCesarea"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Instrumentado:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idinstrumentado"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Cual:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite el instrumentador"
                      required
                      v-model="cualInstr"
                      :disabled="idinstrumentado != 1"
                    />
                  </div>
                  <!-- Otra Fila -->
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Complicación:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite la complicación"
                      required
                      v-model="complicacion"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Anestesia:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idanestecia"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Tipo:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite el tipo"
                      required
                      v-model="tipoAnestecia"
                      :disabled="idanestecia!=1"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Duracion del Parto:</label>
                    <input
                      type="time"
                      class="form-control form-control-sm"
                      required
                      v-model="dParto"
                      :disabled="editable==0"
                    />
                  </div>
                  <!-- Otra Fila -->
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Situación:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite la situación"
                      required
                      v-model="situacion"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Presentación:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite la presentación"
                      required
                      v-model="presentacion"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Eutocico:</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      required
                      v-model="eutocico"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Distocico:</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      required
                      v-model="distocico"
                      :disabled="editable==0"
                    />
                  </div>
                  <!-- Otra Fila -->
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Pizamiento:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idPizamiento"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Precoz</option>
                      <option selected :value="2">Habitual</option>
                      <option selected :value="3">Tardio</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Circular del Cordon:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idCircularCordon"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Tipo de Circular de Cordon:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite el Tipo"
                      required
                      v-model="tCircular"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Placenta(Caracteristicas):</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite las caracteristicas de la Placenta"
                      required
                      v-model="placenta"
                      :disabled="editable==0"
                    />
                  </div>
                  <!-- Otra Fila -->
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Medicamento Intraparto:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idMedicamentoIntrap"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Cual:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite cual medicamento"
                      required
                      v-model="cMedicamento"
                      :disabled="idMedicamentoIntrap!=1"
                    />
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Estado Fetal Insatifactorio:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idEstadoFetal"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Tipo Estado Fetal Insatifactorio:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idTipoEstadoFetal"
                      :disabled="idEstadoFetal !=1 "
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Agudo</option>
                      <option selected :value="2">Cronico</option>
                      <option selected :value="3">Mixto</option>
                    </select>
                  </div>
                  <!-- Otra Fila -->
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Presentación a la Madre:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idPMadre"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-12">
                    <label>Motivo:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite el motivo"
                      required
                      v-model="mPmadre"
                      :disabled="idPMadre!=1"
                    />
                  </div>
                  <!-- Otra Fila -->
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Contacto Piel a Piel:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idPielaPiel"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-12">
                    <label>Motivo:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite el motivo"
                      required
                      v-model="mPielaPiel"
                      :disabled="idPielaPiel!=1"
                    />
                  </div>
                  <!-- Otra Fila -->
                  <div class="form-group col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label>Lactancia Materna:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idLactanciaM"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-12">
                    <label>Motivo:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      maxlength="100"
                      placeholder="Digite el motivo"
                      required
                      v-model="mLactanciaM"
                      :disabled="idLactanciaM!=1"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- parte3 puntuaciones -->
          <div class="tab-pane" id="puntuacion">
            <div class="card-body">
              <form>
                <div class="shadow-none p-2 mb-2 bg-light">
                  <h6>Puntucación Apgar:</h6>
                </div>
                <div class="form-row">
                  <div class="form-group col-12">
                    <div class="table-resposive">
                      <table class="table table-bordered table-sm">
                        <thead class="table-dark">
                          <tr>
                            <th class="text-center">Signo</th>
                            <th class="text-center">Valor = 0</th>
                            <th class="text-center">Valor = 1</th>
                            <th class="text-center">Valor = 2</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <strong>A: aspecto - Color</strong>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor0"
                                  id="Cianosis"
                                  @change="arrayPunt[0].rbcol1 = $event.target.checked,
                                           arrayPunt[0].rbcol2 =false,arrayPunt[0].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPunt[0].rbcol1"
                                />&nbsp;
                                <label for="Cianosis">Cianosis - Palidez</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor0"
                                  id="Cuerpo"
                                  @change="arrayPunt[0].rbcol2 = $event.target.checked,
                                           arrayPunt[0].rbcol1 =false,arrayPunt[0].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPunt[0].rbcol2"
                                />&nbsp;
                                <label for="Cuerpo">Cuerpo Rosado - Extrem,Cianoticas</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor0"
                                  id="Completamente"
                                  @change="arrayPunt[0].rbcol3 = $event.target.checked,
                                           arrayPunt[0].rbcol2 =false,arrayPunt[0].rbcol1 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPunt[0].rbcol3"
                                />&nbsp;
                                <label for="Completamente">Completamente Rosado</label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>P: Pulso - Frecuencia</strong>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor1"
                                  id="AusentePulso"
                                  @change="arrayPunt[1].rbcol1 = $event.target.checked,
                                           arrayPunt[1].rbcol2 =false,arrayPunt[1].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPunt[1].rbcol1"
                                />&nbsp;
                                <label for="AusentePulso">Ausente</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor1"
                                  id="InferiorInferior"
                                  @change="arrayPunt[1].rbcol2 = $event.target.checked,
                                           arrayPunt[1].rbcol1 =false,arrayPunt[1].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPunt[1].rbcol2"
                                />&nbsp;
                                <label for="InferiorInferior">Inferior a 100</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor1"
                                  id="SuperiorPulso"
                                  @change="arrayPunt[1].rbcol3 = $event.target.checked,
                                           arrayPunt[1].rbcol2 =false,arrayPunt[1].rbcol1 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPunt[1].rbcol3"
                                />&nbsp;
                                <label for="SuperiorPulso">Superior a 100</label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>G: Gemido - Irritabilidad refleja</strong>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor2"
                                  id="Respuesta"
                                  @change="arrayPunt[2].rbcol1 = $event.target.checked,
                                           arrayPunt[2].rbcol2 =false,arrayPunt[2].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPunt[2].rbcol1"
                                />&nbsp;
                                <label for="Respuesta">Sin Respuesta</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor2"
                                  id="Muescas"
                                  @change="arrayPunt[2].rbcol2 = $event.target.checked,
                                           arrayPunt[2].rbcol1 =false,arrayPunt[2].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPunt[2].rbcol2"
                                />&nbsp;
                                <label for="Muescas">Muescas</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor2"
                                  id="Estornudos"
                                  @change="arrayPunt[2].rbcol3 = $event.target.checked,
                                           arrayPunt[2].rbcol2 =false,arrayPunt[2].rbcol1 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPunt[2].rbcol3"
                                />&nbsp;
                                <label for="Estornudos">Tos Estornudos</label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>A: Actividad - Tono muscular</strong>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor3"
                                  id="Hipotermia"
                                  @change="arrayPunt[3].rbcol1 = $event.target.checked,
                                           arrayPunt[3].rbcol2 =false,arrayPunt[3].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPunt[3].rbcol1"
                                />&nbsp;
                                <label for="Hipotermia">Hipotermia generalizada</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor3"
                                  id="parcial"
                                  @change="arrayPunt[3].rbcol2 = $event.target.checked,
                                           arrayPunt[3].rbcol1 =false,arrayPunt[3].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPunt[3].rbcol2"
                                />&nbsp;
                                <label for="parcial">Flexion parcial de las extremidades</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor3"
                                  id="Buena"
                                  @change="arrayPunt[3].rbcol3 = $event.target.checked,
                                           arrayPunt[3].rbcol2 =false,arrayPunt[3].rbcol1 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPunt[3].rbcol3"
                                />&nbsp;
                                <label for="Buena">Buena flexión</label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>R: Respiración - Frec,Resp</strong>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor4"
                                  id="Ausente"
                                  @change="arrayPunt[4].rbcol1 = $event.target.checked,
                                           arrayPunt[4].rbcol2 =false,arrayPunt[4].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPunt[4].rbcol1"
                                />&nbsp;
                                <label for="Ausente">Ausente</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor4"
                                  id="LLanto"
                                  @change="arrayPunt[4].rbcol2 = $event.target.checked,
                                           arrayPunt[4].rbcol1 =false,arrayPunt[4].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPunt[4].rbcol2"
                                />&nbsp;
                                <label for="LLanto">LLanto debil - Hipoventilación</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor4"
                                  id="fuerte"
                                  @change="arrayPunt[4].rbcol3 = $event.target.checked,
                                           arrayPunt[4].rbcol2 =false,arrayPunt[4].rbcol1 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPunt[4].rbcol3"
                                />&nbsp;
                                <label for="fuerte">LLanto fuerte</label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="4">
                              <div class="row">
                                <div class="col-3">
                                  <strong>AL MINUTO:</strong>
                                  <a href="#" @click="mostrarValorApgar(1)" :disabled="editable==0">
                                    <i class="fa fa-calculator"></i>
                                  </a>&nbsp;
                                  <a
                                    href="#"
                                    @click="limpirValorApgar(1)"
                                    :disabled="editable==0"
                                  >
                                    <i class="fa fa-trash"></i>
                                  </a>
                                  <input
                                    type="number"
                                    class="form-control form-control-sm text-center"
                                    required
                                    v-model="mSigno"
                                    disabled
                                  />
                                </div>
                                <div class="col-3">
                                  <strong>5: MINUTO:</strong>
                                  <a href="#" @click="mostrarValorApgar(2)" :disabled="editable==0">
                                    <i class="fa fa-calculator"></i>
                                  </a>&nbsp;
                                  <a
                                    href="#"
                                    @click="limpirValorApgar(2)"
                                    :disabled="editable==0"
                                  >
                                    <i class="fa fa-trash"></i>
                                  </a>
                                  <input
                                    type="number"
                                    class="form-control form-control-sm text-center"
                                    required
                                    v-model="mSigno5"
                                    disabled
                                  />
                                </div>
                                <div class="col-3">
                                  <strong>10: MINUTO:</strong>
                                  <a href="#" @click="mostrarValorApgar(3)" :disabled="editable==0">
                                    <i class="fa fa-calculator"></i>
                                  </a>&nbsp;
                                  <a
                                    href="#"
                                    @click="limpirValorApgar(3)"
                                    :disabled="editable==0"
                                  >
                                    <i class="fa fa-trash"></i>
                                  </a>
                                  <input
                                    type="number"
                                    class="form-control form-control-sm text-center"
                                    required
                                    v-model="mSigno10"
                                    disabled
                                  />
                                </div>
                                <div class="col-3">
                                  <strong>15: MINUTO:</strong>
                                  <a href="#" @click="mostrarValorApgar(4)" :disabled="editable==0">
                                    <i class="fa fa-calculator"></i>
                                  </a>&nbsp;
                                  <a
                                    href="#"
                                    @click="limpirValorApgar(4)"
                                    :disabled="editable==0"
                                  >
                                    <i class="fa fa-trash"></i>
                                  </a>
                                  <input
                                    type="number"
                                    class="form-control form-control-sm text-center"
                                    required
                                    v-model="mSigno15"
                                    disabled
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="shadow-none p-2 mb-2 bg-light">
                  <h6>Puntucación de Silvermán:</h6>
                </div>
                <div class="form-row">
                  <div class="form-group col-12">
                    <div class="table-responsive">
                      <table class="table table-bordered table-sm">
                        <thead class="table-dark">
                          <tr>
                            <th class="text-center">Puntaje</th>
                            <th class="text-center">Valor = 0</th>
                            <th class="text-center">Valor = 1</th>
                            <th class="text-center">Valor = 2</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <strong>Movimiento toraco abdominal</strong>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor5"
                                  id="Ritmico"
                                  @change="arrayPuntSilv[0].rbcol1 = $event.target.checked,
                                  arrayPuntSilv[0].rbcol2 =false,arrayPuntSilv[0].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPuntSilv[0].rbcol1"
                                />&nbsp;
                                <label for="Ritmico">Ritmico y Regular</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor5"
                                  id="Torax"
                                  @change="arrayPuntSilv[0].rbcol2 = $event.target.checked,
                                  arrayPuntSilv[0].rbcol1 =false,arrayPuntSilv[0].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPuntSilv[0].rbcol2"
                                />&nbsp;
                                <label for="Torax">Torax inmovil - abdomen movimiento</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor5"
                                  id="Respiración"
                                  @change="arrayPuntSilv[0].rbcol3 = $event.target.checked,
                                  arrayPuntSilv[0].rbcol2 =false,arrayPuntSilv[0].rbcol1 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPuntSilv[0].rbcol3"
                                />&nbsp;
                                <label for="Respiración">Respiración en balanceo</label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Tiraje intercostal</strong>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor6"
                                  id="tirajeAusente"
                                  @change="arrayPuntSilv[1].rbcol1 = $event.target.checked,
                                  arrayPuntSilv[1].rbcol2 =false,arrayPuntSilv[1].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPuntSilv[1].rbcol1"
                                />&nbsp;
                                <label for="tirajeAusente">Ausente</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor6"
                                  id="Discreto"
                                  @change="arrayPuntSilv[1].rbcol2 = $event.target.checked,
                                  arrayPuntSilv[1].rbcol1 =false,arrayPuntSilv[1].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPuntSilv[1].rbcol2"
                                />&nbsp;
                                <label for="Discreto">Discreto</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor6"
                                  id="Intenso"
                                  @change="arrayPuntSilv[1].rbcol3 = $event.target.checked,
                                  arrayPuntSilv[1].rbcol2 =false,arrayPuntSilv[1].rbcol1 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPuntSilv[1].rbcol3"
                                />&nbsp;
                                <label for="Intenso">Intenso</label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Retracción Xifoidea</strong>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor7"
                                  id="rAusente"
                                  @change="arrayPuntSilv[2].rbcol1 = $event.target.checked,
                                  arrayPuntSilv[2].rbcol2 =false,arrayPuntSilv[2].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPuntSilv[2].rbcol1"
                                />&nbsp;
                                <label for="rAusente">Ausente</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor7"
                                  id="rDiscreto"
                                  @change="arrayPuntSilv[2].rbcol2 = $event.target.checked,
                                  arrayPuntSilv[2].rbcol1 =false,arrayPuntSilv[2].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPuntSilv[2].rbcol2"
                                />&nbsp;
                                <label for="rDiscreto">Discreto</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor7"
                                  id="RIntenso"
                                  @change="arrayPuntSilv[2].rbcol3 = $event.target.checked,
                                  arrayPuntSilv[2].rbcol2 =false,arrayPuntSilv[2].rbcol1 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPuntSilv[2].rbcol3"
                                />&nbsp;
                                <label for="RIntenso">Intenso</label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Aleteo Nasal</strong>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor8"
                                  id="aAusente"
                                  @change="arrayPuntSilv[3].rbcol1 = $event.target.checked,
                                  arrayPuntSilv[3].rbcol2 =false,arrayPuntSilv[3].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPuntSilv[3].rbcol1"
                                />&nbsp;
                                <label for="aAusente">Ausente</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor8"
                                  id="aDiscreto"
                                  @change="arrayPuntSilv[3].rbcol2 = $event.target.checked,
                                  arrayPuntSilv[3].rbcol1 =false,arrayPuntSilv[3].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPuntSilv[3].rbcol2"
                                />&nbsp;
                                <label for="aDiscreto">Discreto</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor8"
                                  id="aIntenso"
                                  @change="arrayPuntSilv[3].rbcol3 = $event.target.checked,
                                  arrayPuntSilv[3].rbcol2 =false,arrayPuntSilv[3].rbcol1 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPuntSilv[3].rbcol3"
                                />&nbsp;
                                <label for="aIntenso">Intenso</label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Quejido respiratorio</strong>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor9"
                                  id="qAusente"
                                  @change="arrayPuntSilv[4].rbcol1 = $event.target.checked,
                                  arrayPuntSilv[4].rbcol2 =false,arrayPuntSilv[4].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPuntSilv[4].rbcol1"
                                />&nbsp;
                                <label for="qAusente">Ausente</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor9"
                                  id="Debil"
                                  @change="arrayPuntSilv[4].rbcol2 = $event.target.checked,
                                  arrayPuntSilv[4].rbcol1 =false,arrayPuntSilv[4].rbcol3 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPuntSilv[4].rbcol2"
                                />&nbsp;
                                <label for="Debil">Debil - audible con fonendoscopio</label>
                              </div>
                            </td>
                            <td>
                              <div class="inline">
                                <input
                                  type="radio"
                                  name="valor9"
                                  id="Audible"
                                  @change="arrayPuntSilv[4].rbcol3 = $event.target.checked,
                                  arrayPuntSilv[4].rbcol2 =false,arrayPuntSilv[4].rbcol1 =false"
                                  :disabled="editable==0"
                                  v-model="arrayPuntSilv[4].rbcol3"
                                />&nbsp;
                                <label for="Audible">Audible a Distancia</label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="4">
                              <center>
                                <strong style="color: #81F79F;">NORMAL:0:</strong>&nbsp;
                                <strong style="color: #FFFF00;">DISTREL LEVE: 1-4:</strong>&nbsp;
                                <strong style="color: #8181F7;">DESTRES MODERADOS:5-7:</strong>&nbsp;
                                <strong style="color: #FF4000;">DISTRES GRAVE:8-10:</strong>
                              </center>
                              <div class="row">
                                <div class="col-11">
                                  <input
                                    type="number"
                                    class="form-control form-control-sm text-center"
                                    required
                                    v-model="dNormal"
                                    disabled
                                  />
                                </div>
                                <div class="col-1">
                                  <a href="#" :disabled="editable==0" @click="mostrarValorSilver()">
                                    <i class="fa fa-calculator"></i>
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="tab-pane" id="examenFisico">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link active" href="#dExamen" data-toggle="tab">Datos Examen Fisico</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#oExamenFisico" data-toggle="tab">Otros Datos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#impresion" data-toggle="tab">Impresión Diagnostica</a>
              </li>
            </ul>
            <div class="tab-content container-fluid scroll">
              <div class="tab-pane active" id="dExamen">
                <div class="card-body">
                  <div class="shadow-none p-2 mb-2 bg-light">
                    <h6>Curvatura de Levchenco:</h6>
                  </div>
                  <div class="form-row">
                    <div class="col-12">
                      <img
                        src="../../../../public/img/curva de bchenco.png"
                        class="rounded mx-auto d-block"
                        alt="Responsive image"
                      />
                    </div>
                    <div class="form-group col-4">
                      <label>PEG</label>
                      <input
                        type="number"
                        v-model="peg"
                        class="form-control form-control-sm"
                        :disabled="editable==0"
                      />
                    </div>
                    <div class="form-group col-4">
                      <label>AEG</label>
                      <input
                        type="number"
                        v-model="aeg"
                        class="form-control form-control-sm"
                        :disabled="editable==0"
                      />
                    </div>
                    <div class="form-group col-4">
                      <label>GEG</label>
                      <input
                        type="number"
                        v-model="geg"
                        class="form-control form-control-sm"
                        :disabled="editable==0"
                      />
                    </div>
                  </div>
                  <div class="shadow-none p-2 mb-2 bg-light">
                    <h6>Datos Examén Fisico:</h6>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Cabeza:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idCabeza"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">Normal</option>
                        <option selected :value="2">CamputSuccedaneum</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Piel:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idPiel"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">Normal</option>
                        <option selected :value="2">Petequio</option>
                        <option selected :value="3">Erupciones</option>
                        <option selected :value="4">Calor</option>
                        <option selected :value="5">Lenugo</option>
                        <option selected :value="6">Plegues</option>
                        <option selected :value="7">Descamación</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Fontanela:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idFontanela"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">Normal</option>
                        <option selected :value="2">Abombada</option>
                        <option selected :value="3">Deprimida</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Tamaño X</label>
                      <input
                        type="number"
                        v-model="tamañox"
                        class="form-control form-control-sm"
                        :disabled="editable==0"
                      />
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Facies:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idFacie"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">Normal</option>
                        <option selected :value="2">Anormal</option>
                        <option selected :value="3">Paralisis Facial</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Ojos:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idOjo"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">Normal</option>
                        <option selected :value="2">Conjutivitis</option>
                        <option selected :value="3">Edema Porpebral</option>
                        <option selected :value="4">Opacidad</option>
                        <option selected :value="5">Reflejo Rojo Pertinato</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Boca y ORL:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idBocaOrl"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">Normal</option>
                        <option selected :value="2">Atresa de Caona</option>
                        <option selected :value="3">Labio laporino</option>
                        <option selected :value="4">Hemodura Palatina</option>
                        <option selected :value="5">Pabellón</option>
                        <option selected :value="6">Mucosa Normal</option>
                        <option selected :value="7">Seca</option>
                        <option selected :value="8">Sialorrea</option>
                        <option selected :value="9">Anorrea</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Permacibilidad Exofajica:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idPermacibilidadExo"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">Si</option>
                        <option selected :value="2">No</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Clavicula:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idClavicula"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">Integra</option>
                        <option selected :value="2">Fracturada</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Cuello:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idCuello"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">Normal</option>
                        <option selected :value="2">Asimetrico</option>
                        <option selected :value="3">Nasal</option>
                        <option selected :value="4">Hematomas</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Respiratorio:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idRespiratorio"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">FR</option>
                        <option selected :value="2">MRN</option>
                        <option selected :value="3">Taquipnea</option>
                        <option selected :value="4">Bradpneas</option>
                        <option selected :value="5">ToraxNormal</option>
                        <option selected :value="6">Nastitis</option>
                        <option selected :value="7">Tumefacial Mamaria</option>
                        <option selected :value="8">Ritmo Noral</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Circulatorio:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idCirculatorio"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">FC</option>
                        <option selected :value="2">LPM</option>
                        <option selected :value="3">Tquicardia</option>
                        <option selected :value="4">Bradicardia</option>
                        <option selected :value="5">Asistolica</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Ritmo:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idRitmo"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">Normal</option>
                        <option selected :value="2">Anormal</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Caracteristicas:</label>
                      <input
                        type="text"
                        v-model="caracteristicaRitmo"
                        class="form-control form-control-sm"
                        :disabled="editable==0"
                      />
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Pulso Femoral:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idPulsoFemoral"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">Presente</option>
                        <option selected :value="2">Debil</option>
                        <option selected :value="3">Ausente</option>
                        <option selected :value="4">Otro</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Cual Pulso:</label>
                      <input
                        type="text"
                        v-model="cualPulso"
                        class="form-control form-control-sm"
                        :disabled="editable==0"
                      />
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Aucustica:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idAcustica"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">Normal</option>
                        <option selected :value="2">Anormal</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Abdomén:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idAbdomen"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">Normal</option>
                        <option selected :value="2">Escabado</option>
                        <option selected :value="3">Distenido</option>
                      </select>
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Miembro Sup Izquierdo:</label>
                      <input
                        type="text"
                        v-model="miemSupIzquierdo"
                        class="form-control form-control-sm"
                        :disabled="editable==0"
                      />
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Miembro Sup Derecho:</label>
                      <input
                        type="text"
                        v-model="miemSupDerecho"
                        class="form-control form-control-sm"
                        :disabled="editable==0"
                      />
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Hepatomegalia:</label>
                      <input
                        type="text"
                        v-model="hepatomegalia"
                        class="form-control form-control-sm"
                        :disabled="editable==0"
                      />
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Masas:</label>
                      <input
                        type="text"
                        v-model="masas"
                        class="form-control form-control-sm"
                        :disabled="editable==0"
                      />
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Arteria N°:</label>
                      <input
                        type="number"
                        v-model="nArteria"
                        class="form-control form-control-sm"
                        :disabled="editable==0"
                      />
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Esplenomegalia:</label>
                      <input
                        type="text"
                        v-model="esplenomegalia"
                        class="form-control form-control-sm"
                        :disabled="editable==0"
                      />
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Neflomegalia:</label>
                      <input
                        type="number"
                        v-model="neflomegalia"
                        class="form-control form-control-sm"
                        :disabled="editable==0"
                      />
                    </div>
                    <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                      <label>Ruido:</label>
                      <select
                        class="form-control form-control-sm selectpicker"
                        data-live-search="true"
                        required
                        v-model="idRuido"
                        :disabled="editable==0"
                      >
                        <option selected :value="0" disabled="disabled">Seleccione</option>
                        <option selected :value="1">Presente</option>
                        <option selected :value="2">Ausente</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="oExamenFisico">
                <div class="form-row">
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Diuresis:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idDiuresis"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Ano Permeable:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idAnoPermeable"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Configuración:</label>
                    <input
                      type="text"
                      v-model="configuracion"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Hem.del codo:</label>
                    <input
                      type="text"
                      v-model="hemCodo"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>VDR:</label>
                    <input
                      type="text"
                      v-model="vdr"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Profilaxis Ocular:</label>
                    <input
                      type="text"
                      v-model="profOcular"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Profilaxis Umbilica:</label>
                    <input
                      type="text"
                      v-model="profUmbilica"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Profilaxis Hemorragica:</label>
                    <input
                      type="text"
                      v-model="profHemorragica"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                </div>
                <div class="shadow-none p-2 mb-2 bg-light">
                  <h6>Locomotor:</h6>
                </div>
                <div class="form-row">
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>M.S Derecho:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idMSDerecho"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Normal</option>
                      <option selected :value="2">Edemas</option>
                      <option selected :value="3">Paralisis Branquial</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>M.S Izquierdo:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idMSIzquierdo"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Normal</option>
                      <option selected :value="2">Edemas</option>
                      <option selected :value="3">Pies</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Caderas:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idCadera"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Ortolani</option>
                      <option selected :value="2">Barlow</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Caracteristica:</label>
                    <input
                      type="text"
                      v-model="caractCadera"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Locomotor:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idLocomotor"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Normal</option>
                      <option selected :value="2">Anormal</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Caracteristica:</label>
                    <input
                      type="text"
                      v-model="caractLocomoto"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                </div>
                <div class="shadow-none p-2 mb-2 bg-light">
                  <h6>Sistema Nervioso:</h6>
                </div>
                <div class="form-row">
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Actividad:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idActividad"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Normal</option>
                      <option selected :value="2">Irritable</option>
                      <option selected :value="3">Temblores</option>
                      <option selected :value="4">Deprimido</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Tono:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idTono"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Normal</option>
                      <option selected :value="2">Hipertonia</option>
                      <option selected :value="3">Hipotonia</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>R.Moro:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idRMoro"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Normal</option>
                      <option selected :value="2">Anormal</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>R.Succión:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idRSuccion"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Presente</option>
                      <option selected :value="2">Debil</option>
                      <option selected :value="3">Ausente</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>R.Busqueda:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idRBusqueda"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Presente</option>
                      <option selected :value="2">Debil</option>
                      <option selected :value="3">Ausente</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>R.Marcha:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idRMarcha"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Presente</option>
                      <option selected :value="2">Debil</option>
                      <option selected :value="3">Ausente</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>R.Palmar:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idRPalmar"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Presente</option>
                      <option selected :value="2">Debil</option>
                      <option selected :value="3">Ausente</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>R.Plantar:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idRPlantar"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Presente</option>
                      <option selected :value="2">Debil</option>
                      <option selected :value="3">Ausente</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>R.Enderezamiento:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idREnderezamiento"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Presente</option>
                      <option selected :value="2">Debil</option>
                      <option selected :value="3">Ausente</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="impresion">
                <div class="form-row">
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Edad Gestacional:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idEdadGestacional"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">A termino</option>
                      <option selected :value="2">Pretermino</option>
                      <option selected :value="3">Postermino</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Peso:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idPeso"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Adecuado</option>
                      <option selected :value="2">Bajo</option>
                      <option selected :value="3">Grande</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Destino:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idDestino"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Alojamiento Conjunto</option>
                      <option selected :value="2">UciN</option>
                      <option selected :value="3">Aislamiento</option>
                      <option selected :value="4">Hospitalización</option>
                      <option selected :value="5">Remisión a otro Centro</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Indetif. por Manilla:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="identManilla"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-6 col-sm-6 col-md-6">
                    <label>Porque:</label>
                    <input
                      type="text"
                      v-model="porqueManilla"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xs-12 col-xl-6 col-sm-6 col-md-6">
                    <label>Observación:</label>
                    <input
                      type="text"
                      v-model="observacionManilla"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                </div>
                <div class="shadow-none p-2 mb-2 bg-light">
                  <h6>Tamizaje:</h6>
                </div>
                <div class="form-row">
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Tamizaje metabolico Neo.:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idtamMetabolico"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Tamizaje Auditivo:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idTamAuditivo"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Tam. de Cardi. Congenita:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idTamCardi"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Tamizaje de Visual:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idTamVisual"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Muestra de:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idMuestrade"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Cordon</option>
                      <option selected :value="2">Talon</option>
                      <option selected :value="3">Puncion Venosa</option>
                      <option selected :value="4">TSH</option>
                      <option selected :value="5">PKU</option>
                      <option selected :value="6">Otros</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Cual:</label>
                    <input
                      type="text"
                      v-model="cualMuestra"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Emisiones Otoacustica:</label>
                    <input
                      type="text"
                      v-model="emisiones"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>RTA. Aud. de tallo encefalico:</label>
                    <input
                      type="text"
                      v-model="rtaEncefalico"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Hora Tamizaje:</label>
                    <input
                      type="time"
                      v-model="horaTamizaje"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Reflejo rojo retiniano:</label>
                    <input type="text" class="form-control form-control-sm" :disabled="editable==0" />
                  </div>
                </div>
                <div class="shadow-none p-2 mb-2 bg-light">
                  <h6>Vacunación:</h6>
                </div>
                <div class="form-row">
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>BGG:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idBGG"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Porque:</label>
                    <input
                      type="text"
                      v-model="porqueBGG"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Hepatitis B.:</label>
                    <select
                      class="form-control form-control-sm selectpicker"
                      data-live-search="true"
                      required
                      v-model="idHepatitisB"
                      :disabled="editable==0"
                    >
                      <option selected :value="0" disabled="disabled">Seleccione</option>
                      <option selected :value="1">Si</option>
                      <option selected :value="2">No</option>
                    </select>
                  </div>
                  <div class="form-group col-xs-12 col-xl-3 col-sm-6 col-md-4">
                    <label>Porque:</label>
                    <input
                      type="text"
                      v-model="porqueHepatitis"
                      class="form-control form-control-sm"
                      :disabled="editable==0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script src="../../Scripts/HistoriaClinica/IngresoNeonato.js"></script>


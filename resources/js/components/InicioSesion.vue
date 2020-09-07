<template>
  <div class="login-box-body">
    <form class="was-validated">
      <div class="form-row">
        <div class="form-group col-12" :class="{'has-error' : errorsUsuario == true}">
          <label for="usuario">Usuario</label>
          <input
            type="text"
            value
            class="form-control"
            v-model="usuario"
            placeholder="Digite el usuario"
            v-on:blur="consultarUsuario()"
          />
          <span v-if="errorsUsuario == true" class="help-block">
            <strong>{{usuarioError}}</strong>
          </span>
        </div>
        <div class="form-group col-12" :class="{'has-error' : errorsPassword}">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Digite la contraseña"
          />
          <span v-if="errorsPassword" class="help-block">
            <strong>{{passwordError}}</strong>
          </span>
        </div>

        <div class="form-group col-12" :class="{'has-error' : errorsIdEmpresa}">
          <label for="Empresa">Empresa</label>
          <select class="form-control" @change="cargarPuntoServicio()" v-model="idEmpresa">
            <option selected :value="0" disabled="disabled">Seleccione</option>
            <option
              v-for="item in arrayEmpresa"
              :key="item.id"
              :value="item.id"
              v-text="item.descripcion"
            ></option>
          </select>

          <span v-if="errorsIdEmpresa" class="help-block">
            <strong>{{empresaError}}</strong>
          </span>
        </div>

        <div class="form-group col-12" :class="{'has-error' : errorsidPunto}">
          <label for="Empresa">Punto de servicio</label>
          <select class="form-control" v-model="idPuntoServicio">
            <option selected :value="0" disabled="disabled">Seleccione</option>
            <option
              v-for="(item , i) in arrayPuntoServ"
              :key="i"
              :value="item.id"
              v-text="item.descripcion"
            ></option>
          </select>
          <span v-if="errorsidPunto" class="help-block">
            <strong>{{puntoservError}}</strong>
          </span>
        </div>
        <!-- /.col -->
        <div class="form-group col-12">
          <button
            type="button"
            class="btn btn-success btn-block btn-flat"
            @click="loginPost()"
          >Acceder</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: "",
      password: "",
      idEmpresa: 0,
      idPuntoServicio: 0,
      errorsUsuario: false,
      errorsPassword: false,
      errorsIdEmpresa: false,
      errorsidPunto: false,
      usuarioError: null,
      passwordError: null,
      empresaError: null,
      puntoservError: null,
      arrayEmpresa: [],
      arrayPuntoServ: [],
      msjUsuario: "",
      idUsuario: 0
    };
  },
  methods: {
    loginPost() {
      let me = this;
      if (me.idEmpresa == 0) {
        me.errorsIdEmpresa = true;
        me.empresaError = "¡debes seleccionar la empresa!";
      }
      if (me.idPuntoServicio == 0) {
        me.errorsidPunto = true;
        me.puntoservError = "¡debes seleccionar el punto de servicio!";
      } else {
        axios
          .post("/login", {
            usuario: me.usuario,
            password: me.password,
            idEmpresa: me.idEmpresa,
            idPuntoServicio: me.idPuntoServicio
          })
          .then(function() {
            location.href = "/main";
          })
          .catch(function(error) {
            let er = error.response.data.errors;
            if (er.hasOwnProperty("usuario")) {
              me.errorsUsuario = true;
              me.usuarioError = er.usuario[0];
            }
            if (er.hasOwnProperty("password")) {
              me.errorsPassword = true;
              me.passwordError = er.password[0];
            }
            if (er.hasOwnProperty("idEmpresa")) {
              me.errorsIdEmpresa = true;
              me.empresaError = er.idEmpresa[0];
            }
            if (er.hasOwnProperty("idPuntoServicio")) {
              me.errorsidPunto = true;
              me.puntoservError = er.idPuntoServicio[0];
            }
            if (er.hasOwnProperty("login")) {
              me.errorsPassword = true;
              me.passwordError = er.password[0];
              alert(me.passwordError);
            }
          });
      }
    },
    cargarEmpresas() {
      let me = this;
      axios
        .get("/login/empresaListar", {
          params: {
            id: me.idUsuario
          }
        })
        .then(function(response) {
          me.arrayEmpresa = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cargarPuntoServicio() {
      let me = this;
      axios
        .get("/login/usuarioPuntoListar", {
          params: {
            id: me.idUsuario,
            idEmpresa: me.idEmpresa
          }
        })
        .then(function(response) {
          me.arrayPuntoServ = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    consultarUsuario() {
      let me = this;
      if (me.usuario != "") {
        axios
          .get("/login/usuarioConsultar", {
            params: {
              usuario: me.usuario
            }
          })
          .then(function(response) {
            let arrayUsuario = response.data;
            if (arrayUsuario.length > 0) {
              me.errorsUsuario = false;
              me.idUsuario = arrayUsuario[0]["idTercero"];
              me.cargarEmpresas();
            } else {
              me.errorsUsuario = true;
              me.usuarioError = "¡Usuario no encontrado!";
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    limpiarControles() {
      this.password = "";
      this.idEmpresa = 0;
      this.idPuntoServicio = 0;
      this.idUsuario = 0;
    }
  }
};
</script>

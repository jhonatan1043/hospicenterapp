export default {
  data() {
    return {
      idDescripcion: 0,
      accion: 0,
      listado: 1,
      estado: 1,
      lRol: 2,
      idRol: 0,
      idPadre: 0,
      titulo: '',
      listaRoles: [],
      moduloSinAsignar: [],
      moduloAsignados: [],
      formSinAsignar: [],
      formAsignados: [],
      arrayPuntos: [],
      arrayPuntosEditar: [],
      arrayTitulo: [],
      continuidad: 1,
      idEmpresa: 0,
      idPuntoServicio: 0,
      administrativo: 0,
      mostrar: false,
      descRol: ''
    };
  },
  methods: {
    mostrarFormulario() {
      this.listado = 0;
    },
    ocultarFormulario() {
      this.listado = 1;
    },
    mostrarNuevoRol(id = null, descripcion = null) {
      if (id != null) {
        swal({
          title: '¿Desea editar el registro?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si!',
          cancelButtonText: 'No',
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          buttonsStyling: false,
          reverseButtons: true
        }).then((result) => {
          if (result.value) {

            this.idDescripcion = id;
            this.descRol = descripcion;
            this.accion = 1;
            this.listado = 2;
          } else if (
            result.dismiss === swal.DismissReason.cancel
          ) {
          }
        })
      } else {
        this.listado = 2;
      }
    },
    consultarRoles() {
      let me = this;
      axios.get('/general/descripciones', {
        params: {
          id: me.lRol
        }
      })
        .then(function (response) {
          me.listaRoles = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    cargarModuloSinAsignar(idPuntoServicio) {
      let me = this;
      me.idPuntoServicio = idPuntoServicio;
      axios.get('/perfilMenu/cargarModuloSinAsignar', {
        params: {
          id: me.idRol,
          idPunto: idPuntoServicio
        }
      })
        .then(function (response) {
          me.moduloSinAsignar = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    cargarModuloAsignados(idPuntoServicio) {
      let me = this;
      axios.get('/perfilMenu/cargarModuloAsignados', {
        params: {
          id: me.idRol,
          idPunto: idPuntoServicio
        }
      })
        .then(function (response) {
          me.moduloAsignados = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    cargarFormSinAsignar(idPadre) {
      let me = this;
      me.idPadre = idPadre;
      axios.get('/perfilMenu/cargarFormularioSinAsignar', {
        params: {
          id: me.idRol,
          idPunto: me.idPuntoServicio,
          idPadre: idPadre
        }
      })
        .then(function (response) {
          me.formSinAsignar = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    cargarFormAsignados(idPadre) {
      let me = this;
      axios.get('/perfilMenu/cargarFormularioAsignado', {
        params: {
          id: me.idRol,
          idPunto: me.idPuntoServicio,
          idPadre: idPadre
        }
      })
        .then(function (response) {
          me.formAsignados = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    cargarPermisos(id, rol) {
      this.idRol = id;
      this.obtenerUsuarioActual()
      if (this.continuidad == 1) {
        this.cargarModuloSinAsignar(id);
        this.cargarModuloAsignados(id);
      }
      this.titulos(rol, 1, this.continuidad);
      this.mostrarFormulario();
    },
    // Asignaciones y desAsignaciones-------------
    asignarModulo(idRol, modulo, index) {
      let datos = { id: idRol, descripcion: modulo }
      this.moduloAsignados.push(datos);
      this.moduloSinAsignar.splice(index, 1);
      this.crearPermisosAsignados(0, 0, idRol);
    },
    desAsignarModulo(idRol, modulo, index) {
      let datos = { id: idRol, descripcion: modulo }
      this.moduloSinAsignar.push(datos);
      this.moduloAsignados.splice(index, 1);
      this.crearPermisosAsignados(0, 1, idRol);
    },
    asignarForm(idRol, form, index) {
      let datos = { id: idRol, descripcion: form }
      this.formAsignados.push(datos);
      this.formSinAsignar.splice(index, 1);
      this.crearPermisosAsignados(1, 0, idRol);
    },
    desAsignarForm(idRol, form, index) {
      let datos = { id: idRol, descripcion: form }
      this.formSinAsignar.push(datos);
      this.formAsignados.splice(index, 1);
      this.crearPermisosAsignados(1, 1, idRol);
    },
    //------------------------------------------------
    cancelarFormulario() {
      swal({
        title: '¿Desea cancelar el registro?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.limpiarControles();
          this.ocultarFormulario();
          this.arrayTitulo = [];
        } else if (
          result.dismiss === swal.DismissReason.cancel
        ) {
        }
      })
    },
    crearPermisosAsignados(bdraModulo, quitar, id) {
      let me = this;
      axios.post('/perfilMenu/crearPermisosAsignados', {
        'idRol': me.idRol,
        'idPuntoServ': me.idPuntoServicio,
        'id': id,
        'bdraModulo': bdraModulo,
        'quitar': quitar,
        'idPadre': me.idPadre
      })
        .then(function () {
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    crearDescripcionRol() {
      let me = this;
      axios.post('/descripcionGeneral/registrar', {
        'id': me.lRol,
        'descripcion': me.descRol,
        'valorAdicional': 'Null'
      })
        .then(function (response) {
          me.consultarRoles();
          me.ocultarFormulario();
          swal(
            'Guardado!',
            'El registro ha sido guardado con éxito.',
            'success'
          )
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    actualizarDescripcionRol() {
      let me = this;
      axios.put('/descripcionGeneral/actualizar', {
        'id': me.idDescripcion,
        'idParametro': me.lRol,
        'descripcion': me.descRol
      })
        .then(function (response) {
          me.consultarRoles();
          me.ocultarFormulario();
          swal(
            'Actualizar!',
            'El registro ha sido actualizado con éxito.',
            'success'
          )
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    cargarPuntosServicios() {
      let me = this;
      axios.get('/perfilMenu/puntoEmpresaListar', {
        params: {
          id: me.idEmpresa
        }
      })
        .then(function (response) {
          me.arrayPuntos = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    adelante(id = 0, descripcion) {
      if (this.continuidad == 0) {
        this.cargarModuloSinAsignar(id);
        this.cargarModuloAsignados(id);
      } else if (this.continuidad == 1) {
        this.cargarFormSinAsignar(id);
        this.cargarFormAsignados(id);
      }
      this.continuidad = this.continuidad + 1;
      this.titulos(descripcion, 1, this.continuidad);
    },
    atras() {
      this.titulos(null, 0, this.continuidad);
      this.continuidad = this.continuidad - 1;
    },
    obtenerUsuarioActual() {
      let me = this;
      axios.get('/login/sessionUsuarioActual')
        .then(function (response) {
          let arraySession = response.data;

          me.idEmpresa = arraySession.idEmpresa;
          me.administrativo = arraySession.administrativo.administrativo;

          if (me.administrativo == 1) {
            me.cargarPuntosServicios();
            me.continuidad = 0;
          }

        })
        .catch(function (error) {
          console.log(error)
        })
    },
    mostrarOcultar(id) {
      let me = this;
      me.idPadre = id;
      if (me.mostrar == false) {
        me.mostrar = true;
      } else {
        me.mostrar = false;
      }
    },
    titulos(tit, bdraCont, index) {
      let ctitulo = '';
      if (bdraCont == 1) {
        this.arrayTitulo.push(tit)
      } else {
        this.arrayTitulo.splice(index, 1);
      }

      for (let posicion = 0; posicion < this.arrayTitulo.length; posicion++) {
        ctitulo = ctitulo + '/' + this.arrayTitulo[posicion];
      }
      this.titulo = ctitulo;
      console.log(this.arrayTitulo);
    },
    limpiarControles(){
      this.moduloSinAsignar= [];
      this.moduloAsignados= [];
      this.formSinAsignar= [];
      this.formAsignados= [];
      this.arrayPuntos= [];
      this.arrayPuntosEditar= [];
      this.arrayTitulo= [];
      if (this.administrativo == 1) {
        this.continuidad = 0;
      }else{
         this.continuidad= 1;
      }
    }
  },
  mounted() {
    this.consultarRoles();
  }
};
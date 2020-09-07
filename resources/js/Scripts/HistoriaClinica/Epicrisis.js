import moment from "moment";

export default {
  props: {
    modal: false,
    idIngreso: 0
  },
  data() {
    return {
      idEpicrisis: 0,
      arrayDiagnosticos: [],
      arrayEstado: [],
      registrado: false,
      descripcion: '',
      paciente: '',
      hEpicrisis: moment().format("HH:mm:ss"),
      fEpicrisis: moment().format("YYYY-MM-DD"),
      edad: 0,
      genero: '',
      idEstado: 0,
      cama: '',
      administradora: '',
      identificacion: 0
    };
  },
  methods: {
    cargarDiagnosticos() {
      axios.get('/epicrisi/diagnosticosCargar', {
        params: {
          idIngreso: this.idIngreso
        }
      })
        .then(res => {
          this.arrayDiagnosticos = res.data;
        })
        .catch(err => {
          console.error(err);
        })
    },
    cargarDatosPaciente() {
      console.log(this.idIngreso);
      axios.get('/epicrisi/pacienteCargar', {
        params: {
          idIngreso: this.idIngreso
        }
      })
        .then(res => {
          let arrayDatos = res.data;
          this.identificacion = arrayDatos[0].identificacion,
            this.paciente = arrayDatos[0].paciente,
            this.edad = arrayDatos[0].edad,
            this.cama = arrayDatos[0].cama,
            this.genero = arrayDatos[0].genero,
            this.administradora = arrayDatos[0].administradora
        })
        .catch(err => {
          console.error(err);
        })
    },
    cargarEstadoPaciente() {
      axios.get('/epicrisi/estadoPaciente')
        .then(res => {
          this.arrayEstado = res.data;
        })
        .catch(err => {
          console.error(err);
        })
    },

    validarRegistro() {
      if (this.descripcion == '') {
        swal(
          "Informacion!",
          "Por favor debe agregar informacion de salida del paciente",
          "info"
        );
       
        return false;
      } else if (this.idEstado == 0) {
        swal(
          "Informacion!",
          "Por favor debe seleccionar el estado del paciente",
          "info"
        );
        return false;
      }
      return true;
    },
    guardarEpicrisis() {
      if (this.validarRegistro()) {
        axios.post('/epicrisi/guardar', {

          idEpicrisis: this.idEpicrisis,
          idIngreso: this.idIngreso,
          idEstado: this.idEstado,
          fechaEpicrisis: this.fEpicrisis,
          horaEpicrisis: this.hEpicrisis,
          descripcion: this.descripcion,
          json: JSON.stringify(this.arrayDiagnosticos)

        })
          .then(res => {
            swal(
              "Guardar!",
              "El registro ha sido guardado con éxito.",
              "success"
            );
          })
          .catch(err => {
            console.error(err);
          })
      }
    }
  },
  created() {
    this.cargarDatosPaciente();
    this.cargarDiagnosticos();
    this.cargarEstadoPaciente();
  }
};
export default {
    data() {
        return {
            continuidad: 0,
            idIngreso: 0,
            idTipoIdentificacionMad: 0,
            identificacionMad: "",
            NombresMad: "",
            apellidosMad: "",
            fechaNacimientoMad: "",
            idPaisMad: 0,
            idDepartamentoMad: 0,
            idMunicipioMad: 0,
            idEstadoCivilMad: 0,
            idgrupoSanguineoMad: 0,
            direccionMad: "",
            telefonoMad: "",
            idTipoIdentificacionPat: 0,
            identificacionPat: "",
            NombresPat: "",
            apellidosPat: "",
            fechaNacimientoPat: "",
            idPaisPat: 0,
            idDepartamentoPat: 0,
            idMunicipioPat: 0,
            idEstadoCivilPat: 0,
            idgrupoSanguineoPat: 0,
            direccionPat: "",
            telefonoPat: "",
            combs: "",
            habito: "",
            nEmbarazo: "",
            pTermino: "",
            pPrematuro: "",
            cesarea: "",
            aborto: "",
            nVivos: "",
            mortinatos: "",
            hVivo: "",
            fum: "",
            fpp: "",
            idControlPrenatal: 0,
            edadGestacional: "",
            lugarControlPren: "",
            numeroControl: "",
            idCultRectoVaginal: 0,
            resultadoCul: "",
            taxoplasma: "",
            sifilis: "",
            vih: "",
            estreptococo: "",
            oSerologias: "",
            idMaduracionFetal: 0,
            dosis: "",
            idRiesgoGestacion: 0,
            fechaMaduracion: "",
            medicacion: "",
            patologiaMat: "",
            observacion: "",
            idhospitalario: 0,
            idextraHospitalario: 0,
            lParto: "",
            idTParto: 0,
            mCesarea: "",
            medicacionCesarea: "",
            idinstrumentado: 0,
            cualInstr: "",
            idAmniorrexis: 0,
            idRpm: 0,
            horaParto: "",
            diasParto: "",
            idCantAmniorrexis: 0,
            idAspecto: 0,
            observacionAmn: "",
            complicacion: "",
            idanestecia: 0,
            tipoAnestecia: "",
            dParto: "",
            presentacion: "",
            situacion: "",
            eutocico: "",
            distocico: "",
            idPizamiento: 0,
            idCircularCordon: 0,
            tCircular: "",
            idMedicamentoIntrap: 0,
            cMedicamento: "",
            idEstadoFetal: 0,
            idTipoEstadoFetal: 0,
            idPielaPiel: 0,
            mPielaPiel: "",
            idPMadre: 0,
            mPmadre: "",
            placenta: "",
            idLactanciaM: 0,
            mLactanciaM: "",
            mSigno: "",
            mSigno5: "",
            mSigno10: "",
            mSigno15: "",
            dNormal: "",
            peg: "",
            aeg: "",
            geg: "",
            idCabeza: 0,
            idPiel: 0,
            idFontanela: 0,
            tamañox: "",
            idFacie: 0,
            idOjo: 0,
            idBocaOrl: 0,
            idPermacibilidadExo: 0,
            idClavicula: 0,
            idCuello: 0,
            idRespiratorio: 0,
            idCirculatorio: 0,
            idRitmo: 0,
            caracteristicaRitmo: "",
            idPulsoFemoral: 0,
            cualPulso: "",
            idAcustica: 0,
            idAbdomen: 0,
            miemSupIzquierdo: "",
            miemSupDerecho: "",
            hepatomegalia: "",
            masas: "",
            nArteria: 0,
            esplenomegalia: "",
            neflomegalia: 0,
            idRuido: 0,
            idDiuresis: 0,
            idAnoPermeable: 0,
            configuracion: "",
            hemCodo: "",
            vdr: "",
            profOcular: "",
            profUmbilica: "",
            profHemorragica: "",
            idMSDerecho: 0,
            idMSIzquierdo: 0,
            idCadera: 0,
            caractCadera: "",
            idLocomotor: 0,
            caractLocomoto: "",
            idActividad: 0,
            idTono: 0,
            idRMoro: 0,
            idRSuccion: 0,
            idRBusqueda: 0,
            idRMarcha: 0,
            idRPalmar: 0,
            idRPlantar: 0,
            idREnderezamiento: 0,
            idEdadGestacional: 0,
            idPeso: 0,
            idDestino: 0,
            identManilla: 0,
            porqueManilla: "",
            observacionManilla: "",
            idtamMetabolico: 0,
            idTamAuditivo: 0,
            idTamCardi: 0,
            idTamVisual: 0,
            idMuestrade: 0,
            cualMuestra: "",
            emisiones: "",
            rtaEncefalico: "",
            horaTamizaje: "",
            idBGG: 0,
            porqueBGG: "",
            idHepatitisB: 0,
            porqueHepatitis: "",
            listaEstadoC: 6,
            listaGrup: 0,
            arrayTipoIdent: [],
            arrayEstado: [],
            arrayPais: [],
            arrayDepartamento: [],
            arrayMunicipio: [],
            arrayGrupSag: [],
            editable: 0,
            btEditar: 0,
            btGuardar: 0,
            btCancelar: 0,
            valorApgar: 0,
            valorSilv: 0,
            arrayPunt: [
                { rbcol1: 0, rbcol2: 0, rbcol3: 0 },
                { rbcol1: 0, rbcol2: 0, rbcol3: 0 },
                { rbcol1: 0, rbcol2: 0, rbcol3: 0 },
                { rbcol1: 0, rbcol2: 0, rbcol3: 0 },
                { rbcol1: 0, rbcol2: 0, rbcol3: 0 }
            ],
            arrayPuntSilv: [
                { rbcol1: 0, rbcol2: 0, rbcol3: 0 },
                { rbcol1: 0, rbcol2: 0, rbcol3: 0 },
                { rbcol1: 0, rbcol2: 0, rbcol3: 0 },
                { rbcol1: 0, rbcol2: 0, rbcol3: 0 },
                { rbcol1: 0, rbcol2: 0, rbcol3: 0 }
            ]
        };
    },
    methods: {
        mostrarValorApgar(ctrol) {
            let valor;
            this.valorApgar = 0;
            this.arrayPunt.forEach(element => {
                if (element.rbcol1 == true) {
                    valor = 0;
                } else if (element.rbcol2 == true) {
                    valor = 1;
                } else if (element.rbcol3 == true) {
                    valor = 2;
                }
                this.valorApgar = this.valorApgar + valor;
            });
            switch (ctrol) {
                case 1:
                    this.mSigno = this.valorApgar;
                    break;
                case 2:
                    this.mSigno5 = this.valorApgar;
                    break;
                case 3:
                    this.mSigno10 = this.valorApgar;
                    break;
                case 4:
                    this.mSigno15 = this.valorApgar;
                    break;
            }
        },
        mostrarValorSilver() {
            let valor;
            this.valorSilv = 0;
            this.arrayPuntSilv.forEach(element => {
                if (element.rbcol1 == true) {
                    valor = 0;
                } else if (element.rbcol2 == true) {
                    valor = 1;
                } else if (element.rbcol3 == true) {
                    valor = 2;
                }
                this.valorSilv = this.valorSilv + valor;
            });

            this.dNormal = this.valorSilv;
        },
        limpirValorApgar(ctrol) {
            switch (ctrol) {
                case 1:
                    this.mSigno = "";
                    break;
                case 2:
                    this.mSigno5 = "";
                    break;
                case 3:
                    this.mSigno10 = "";
                    break;
                case 4:
                    this.mSigno15 = "";
                    break;
                case 5:
                    this.dNormal = "";
                    break;
            }
        },
        desHabilitarBotones() {
            this.btEditar = 0;
            this.btGuardar = 0;
            this.btCancelar = 0;
        },
        HabilitarBotones() {
            this.btEditar = 1;
            this.btGuardar = 1;
            this.btCancelar = 1;
        },
        inicio() {
            this.desHabilitarBotones();
            this.btEditar = 1;
            this.editable = 0;
        },
        editar() {
            this.HabilitarBotones();
            this.btEditar = 0;
            this.editable = 1;
        },
        cancelar() {
            swal({
                title: "¿Desea cancelar el registro?",
                type: "error",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si!",
                cancelButtonText: "No",
                confirmButtonClass: "btn btn-success",
                cancelButtonClass: "btn btn-danger",
                buttonsStyling: false,
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    this.inicio();
                } else if (result.dismiss === swal.DismissReason.cancel) {
                }
            });
        },
        cargarComboEstado() {
            var me = this;
            axios
                .get("/general/descripciones", {
                    params: {
                        id: this.listaEstadoC
                    }
                })
                .then(function(response) {
                    me.arrayEstado = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarComboTipoIdent() {
            var me = this;
            axios
                .get("/tipoIdentificacion")
                .then(function(response) {
                    me.arrayTipoIdent = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarComboPais() {
            var me = this;
            axios
                .get("/comboPais")
                .then(function(response) {
                    me.arrayPais = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarComboDepartamento(idPais) {
            var me = this;
            axios
                .get("/comboDepartamento", {
                    params: {
                        idPais: idPais
                    }
                })
                .then(function(response) {
                    me.arrayDepartamento = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        cargarComboMunicipio(idDepartamento) {
            var me = this;
            axios
                .get("/comboMunicipio", {
                    params: {
                        idDepartamento: idDepartamento
                    }
                })
                .then(function(response) {
                    me.arrayMunicipio = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        limpiarControles() {
            this.idTipoIdentificacionMad = 0;
            this.identificacionMad = "";
            this.NombresMad = "";
            this.apellidosMad = "";
            this.fechaNacimientoMad = "";
            this.idPaisMad = 0;
            this.idDepartamentoMad = 0;
            this.idMunicipioMad = 0;
            this.idEstadoCivilMad = 0;
            this.idgrupoSanguineoMad = 0;
            this.direccionMad = "";
            this.telefonoMad = "";
            this.idTipoIdentificacionPat = 0;
            this.identificacionPat = "";
            this.NombresPat = "";
            this.apellidosPat = "";
            this.fechaNacimientoPat = "";
            this.idPaisPat = 0;
            this.idDepartamentoPat = 0;
            this.idMunicipioPat = 0;
            this.idEstadoCivilPat = 0;
            this.idgrupoSanguineoPat = 0;
            this.direccionPat = "";
            this.telefonoPat = "";
            this.combs = "";
            this.habito = "";
            this.nEmbarazo = "";
            this.pTermino = "";
            this.pPrematuro = "";
            this.cesarea = "";
            this.aborto = "";
            this.nVivos = "";
            this.mortinatos = "";
            this.hVivo = "";
            this.fum = "";
            this.fpp = "";
            this.idControlPrenatal = 0;
            this.edadGestacional = "";
            this.lugarControlPren = "";
            this.numeroControl = "";
            this.idCultRectoVaginal = 0;
            this.resultadoCul = "";
            this.taxoplasma = "";
            this.sifilis = "";
            this.vih = "";
            this.estreptococo = "";
            this.oSerologias = "";
            this.idMaduracionFetal = 0;
            this.dosis = "";
            this.idRiesgoGestacion = 0;
            this.fechaMaduracion = "";
            this.medicacion = "";
            this.patologiaMat = "";
            this.observacion = "";
            this.idhospitalario = 0;
            this.idextraHospitalario = 0;
            this.lParto = "";
            this.idTParto = 0;
            this.mCesarea = "";
            this.medicacionCesarea = "";
            this.idinstrumentado = 0;
            this.cualInstr = "";
            this.idAmniorrexis = 0;
            this.idRpm = 0;
            this.horaParto = "";
            this.diasParto = "";
            this.idCantAmniorrexis = 0;
            this.idAspecto = 0;
            this.observacionAmn = "";
            this.complicacion = "";
            this.idanestecia = 0;
            this.tipoAnestecia = "";
            this.dParto = "";
            this.presentacion = "";
            this.situacion = "";
            this.eutocico = "";
            this.distocico = "";
            this.idPizamiento = 0;
            this.idCircularCordon = 0;
            this.tCircular = "";
            this.idMedicamentoIntrap = 0;
            this.cMedicamento = "";
            this.idEstadoFetal = 0;
            this.idTipoEstadoFetal = 0;
            this.idPielaPiel = 0;
            this.mPielaPiel = "";
            this.idPMadre = 0;
            this.mPmadre = "";
            this.placenta = "";
            this.idLactanciaM = 0;
            this.mLactanciaM = "";
            this.mSigno = "";
            this.mSigno5 = "";
            this.mSigno10 = "";
            this.mSigno15 = "";
            this.dNormal = "";
            this.peg = "";
            this.aeg = "";
            this.geg = "";
            this.idCabeza = 0;
            this.idPiel = 0;
            this.idFontanela = 0;
            this.tamañox = "";
            this.idFacie = 0;
            this.idOjo = 0;
            this.idBocaOrl = 0;
            this.idPermacibilidadExo = 0;
            this.idClavicula = 0;
            this.idCuello = 0;
            this.idRespiratorio = 0;
            this.idCirculatorio = 0;
            this.idRitmo = 0;
            this.caracteristicaRitmo = "";
            this.idPulsoFemoral = 0;
            this.cualPulso = "";
            this.idAcustica = 0;
            this.idAbdomen = 0;
            this.miemSupIzquierdo = "";
            this.miemSupDerecho = "";
            this.hepatomegalia = "";
            this.masas = "";
            this.nArteria = 0;
            this.esplenomegalia = "";
            this.neflomegalia = 0;
            this.idRuido = 0;
            this.idDiuresis = 0;
            this.idAnoPermeable = 0;
            this.configuracion = "";
            this.hemCodo = "";
            this.vdr = "";
            this.profOcular = "";
            this.profUmbilica = "";
            this.profHemorragica = "";
            this.idMSDerecho = 0;
            this.idMSIzquierdo = 0;
            this.idCadera = 0;
            this.caractCadera = "";
            this.idLocomotor = 0;
            this.caractLocomoto = "";
            this.idActividad = 0;
            this.idTono = 0;
            this.idRMoro = 0;
            this.idRSuccion = 0;
            this.idRBusqueda = 0;
            this.idRMarcha = 0;
            this.idRPalmar = 0;
            this.idRPlantar = 0;
            this.idREnderezamiento = 0;
            this.idEdadGestacional = 0;
            this.idPeso = 0;
            this.idDestino = 0;
            this.identManilla = 0;
            this.porqueManilla = "";
            this.observacionManilla = "";
            this.idtamMetabolico = 0;
            this.idTamAuditivo = 0;
            this.idTamCardi = 0;
            this.idTamVisual = 0;
            this.idMuestrade = 0;
            this.cualMuestra = "";
            this.emisiones = "";
            this.rtaEncefalico = "";
            this.horaTamizaje = "";
            this.idBGG = 0;
            this.porqueBGG = "";
            this.idHepatitisB = 0;
            this.valorApgar = 0;
        },
        ingresoNeonatocrear() {
            let me = this;
            axios
                .post("/historiaClinica/ingresoNeonato/registrar", {
                    idIngreso: me.idIngreso,
                    idTipoIdentificacionMad: me.idTipoIdentificacionMad,
                    identificacionMad: me.identificacionMad,
                    NombresMad: me.NombresMad,
                    apellidosMad: me.apellidosMad,
                    fechaNacimientoMad: me.fechaNacimientoMad,
                    idPaisMad: me.idPaisMad,
                    idDepartamentoMad: me.idDepartamentoMad,
                    idMunicipioMad: me.idMunicipioMad,
                    idEstadoCivilMad: me.idEstadoCivilMad,
                    idgrupoSanguineoMad: me.idgrupoSanguineoMad,
                    direccionMad: me.direccionMad,
                    telefonoMad: me.telefonoMad,
                    idTipoIdentificacionPat: me.idTipoIdentificacionPat,
                    identificacionPat: me.identificacionPat,
                    NombresPat: me.NombresPat,
                    apellidosPat: me.apellidosPat,
                    fechaNacimientoPat: me.fechaNacimientoPat,
                    idPaisPat: me.idPaisPat,
                    idDepartamentoPat: me.idDepartamentoPat,
                    idMunicipioPat: me.idMunicipioPat,
                    idEstadoCivilPat: me.idEstadoCivilPat,
                    idgrupoSanguineoPat: me.idgrupoSanguineoPat,
                    direccionPat: me.direccionPat,
                    telefonoPat: me.telefonoPat,
                    combs: me.combs,
                    habito: me.habito,
                    nEmbarazo: me.nEmbarazo,
                    pTermino: me.pTermino,
                    pPrematuro: me.pPrematuro,
                    cesarea: me.cesarea,
                    aborto: me.aborto,
                    nVivos: me.nVivos,
                    mortinatos: me.mortinatos,
                    hVivo: me.hVivo,
                    fum: me.fum,
                    fpp: me.fpp,
                    idControlPrenatal: me.idControlPrenatal,
                    edadGestacional: me.edadGestacional,
                    lugarControlPren: me.lugarControlPren,
                    numeroControl: me.numeroControl,
                    idCultRectoVaginal: me.idCultRectoVaginal,
                    resultadoCul: me.resultadoCul,
                    taxoplasma: me.taxoplasma,
                    sifilis: me.sifilis,
                    vih: me.vih,
                    estreptococo: me.estreptococo,
                    oSerologias: me.oSerologias,
                    idMaduracionFetal: me.idMaduracionFetal,
                    dosis: me.dosis,
                    idRiesgoGestacion: me.idRiesgoGestacion,
                    fechaMaduracion: me.fechaMaduracion,
                    medicacion: me.medicacion,
                    patologiaMat: me.patologiaMat,
                    observacion: me.observacion,
                    idhospitalario: me.idhospitalario,
                    idextraHospitalario: me.idextraHospitalario,
                    lParto: me.lParto,
                    idTParto: me.idTParto,
                    mCesarea: me.mCesarea,
                    medicacionCesarea: me.medicacionCesarea,
                    idinstrumentado: me.idinstrumentado,
                    cualInstr: me.cualInstr,
                    idAmniorrexis: me.idAmniorrexis,
                    idRpm: me.idRpm,
                    horaParto: me.horaParto,
                    diasParto: me.diasParto,
                    idCantAmniorrexis: me.idCantAmniorrexis,
                    idAspecto: me.idAspecto,
                    observacionAmn: me.observacionAmn,
                    complicacion: me.complicacion,
                    idanestecia: me.idanestecia,
                    tipoAnestecia: me.tipoAnestecia,
                    dParto: me.dParto,
                    situacion: me.situacion,
                    presentacion: me.presentacion,
                    eutocico: me.eutocico,
                    distocico: me.distocico,
                    idPizamiento: me.idPizamiento,
                    idCircularCordon: me.idCircularCordon,
                    tCircular: me.tCircular,
                    idMedicamentoIntrap: me.idMedicamentoIntrap,
                    cMedicamento: me.cMedicamento,
                    idEstadoFetal: me.idEstadoFetal,
                    idTipoEstadoFetal: me.idTipoEstadoFetal,
                    idPielaPiel: me.idPielaPiel,
                    mPielaPiel: me.mPielaPiel,
                    idPMadre: me.idPMadre,
                    mPmadre: me.mPmadre,
                    placenta: me.placenta,
                    idLactanciaM: me.idLactanciaM,
                    mLactanciaM: me.mLactanciaM,
                    mSigno: me.mSigno,
                    mSigno5: me.mSigno5,
                    mSigno10: me.mSigno10,
                    mSigno15: me.mSigno15,
                    dNormal: me.dNormal,
                    peg: me.peg,
                    aeg: me.aeg,
                    geg: me.geg,
                    idCabeza: me.idCabeza,
                    idPiel: me.idPiel,
                    idFontanela: me.idFontanela,
                    tamañox: me.tamañox,
                    idFacie: me.idFacie,
                    idOjo: me.idOjo,
                    idBocaOrl: me.idBocaOrl,
                    idPermacibilidadExo: me.idPermacibilidadExo,
                    idClavicula: me.idClavicula,
                    idCuello: me.idCuello,
                    idRespiratorio: me.idRespiratorio,
                    idCirculatorio: me.idCirculatorio,
                    idRitmo: me.idRitmo,
                    caracteristicaRitmo: me.caracteristicaRitmo,
                    idPulsoFemoral: me.idPulsoFemoral,
                    cualPulso: me.cualPulso,
                    idAcustica: me.idAcustica,
                    idAbdomen: me.idAbdomen,
                    miemSupIzquierdo: me.miemSupIzquierdo,
                    miemSupDerecho: me.miemSupDerecho,
                    hepatomegalia: me.hepatomegalia,
                    masas: me.masas,
                    nArteria: me.nArteria,
                    esplenomegalia: me.esplenomegalia,
                    neflomegalia: me.neflomegalia,
                    idRuido: me.idRuido,
                    idDiuresis: me.idDiuresis,
                    idAnoPermeable: me.idAnoPermeable,
                    configuracion: me.configuracion,
                    hemCodo: me.hemCodo,
                    vdr: me.vdr,
                    profOcular: me.profOcular,
                    profUmbilica: me.profUmbilica,
                    profHemorragica: me.profHemorragica,
                    idMSDerecho: me.idMSDerecho,
                    idMSIzquierdo: me.idMSIzquierdo,
                    idCadera: me.idCadera,
                    caractCadera: me.caractCadera,
                    idLocomotor: me.idLocomotor,
                    caractLocomoto: me.caractLocomoto,
                    idActividad: me.idActividad,
                    idTono: me.idTono,
                    idRMoro: me.idRMoro,
                    idRSuccion: me.idRSuccion,
                    idRBusqueda: me.idRBusqueda,
                    idRMarcha: me.idRMarcha,
                    idRPalmar: me.idRPalmar,
                    idRPlantar: me.idRPlantar,
                    idREnderezamiento: me.idREnderezamiento,
                    idEdadGestacional: me.idEdadGestacional,
                    idPeso: me.idPeso,
                    idDestino: me.idDestino,
                    identManilla: me.identManilla,
                    porqueManilla: me.porqueManilla,
                    observacionManilla: me.observacionManilla,
                    idtamMetabolico: me.idtamMetabolico,
                    idTamAuditivo: me.idTamAuditivo,
                    idTamCardi: me.idTamCardi,
                    idTamVisual: me.idTamVisual,
                    idMuestrade: me.idMuestrade,
                    cualMuestra: me.cualMuestra,
                    emisiones: me.emisiones,
                    rtaEncefalico: me.rtaEncefalico,
                    horaTamizaje: me.horaTamizaje,
                    idBGG: me.idBGG,
                    porqueBGG: me.porqueBGG,
                    idHepatitisB: me.idHepatitisB,
                    porqueHepatitis: me.porqueHepatitis
                })
                .then(() => {
                    
                })
                .catch(err => {
                    console.error(err);
                });
        }
    },
    mounted() {
        this.cargarComboTipoIdent();
        this.cargarComboEstado();
        this.cargarComboPais();
        this.inicio();
    }
};

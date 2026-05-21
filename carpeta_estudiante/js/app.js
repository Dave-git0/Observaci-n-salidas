// Semana 10 - Observación de resultados y salidas

const objetivoSistema = "Validar registros de producción rural y mostrar una salida clara de error, advertencia o éxito.";

const casosPrueba = [
  {
    id: 1,
    descripcion: "Datos normales",
    entrada: { dia: "Lunes", leche: "10", maiz: "20", responsable: "Ana" },
    esperadoTipo: "exito"
  },
  {
    id: 2,
    descripcion: "Campo obligatorio vacío",
    entrada: { dia: "", leche: "10", maiz: "20", responsable: "Ana" },
    esperadoTipo: "error"
  },
  {
    id: 3,
    descripcion: "Dato no numérico",
    entrada: { dia: "Martes", leche: "abc", maiz: "20", responsable: "Luis" },
    esperadoTipo: "error"
  },
  {
    id: 4,
    descripcion: "Cantidad negativa",
    entrada: { dia: "Miércoles", leche: "-5", maiz: "15", responsable: "Marta" },
    esperadoTipo: "error"
  },
  {
    id: 5,
    descripcion: "Cantidad en cero",
    entrada: { dia: "Jueves", leche: "0", maiz: "12", responsable: "Pedro" },
    esperadoTipo: "advertencia"
  },
  {
    id: 6,
    descripcion: "Producción baja",
    entrada: { dia: "Viernes", leche: "3", maiz: "8", responsable: "Sofía" },
    esperadoTipo: "advertencia"
  },
  {
    id: 7,
    descripcion: "Cantidad inusualmente alta",
    entrada: { dia: "Sábado", leche: "99999", maiz: "2000", responsable: "Elena" },
    esperadoTipo: "advertencia"
  }
];

const elementos = {
  dia: document.getElementById("dia"),
  leche: document.getElementById("leche"),
  maiz: document.getElementById("maiz"),
  responsable: document.getElementById("responsable"),
  salidaSistema: document.getElementById("salidaSistema"),
  interpretacion: document.getElementById("interpretacion"),
  validacionObjetivo: document.getElementById("validacionObjetivo"),
  tablaPruebas: document.getElementById("tablaPruebas"),
  btnValidar: document.getElementById("btnValidar"),
  btnCasos: document.getElementById("btnCasos"),
  btnLimpiar: document.getElementById("btnLimpiar")
};

function obtenerDatosFormulario() {
  return {
    dia: elementos.dia.value.trim(),
    leche: elementos.leche.value.trim(),
    maiz: elementos.maiz.value.trim(),
    responsable: elementos.responsable.value.trim()
  };
}

function procesarRegistro(datos) {

  if (
    datos.dia === "" ||
    datos.leche === "" ||
    datos.maiz === "" ||
    datos.responsable === ""
  ) {
    return {
      tipo: "error",
      mensaje: "Todos los campos son obligatorios.",
      entrada: datos
    };
  }

  const leche = Number(datos.leche);
  const maiz = Number(datos.maiz);

  if (isNaN(leche) || isNaN(maiz)) {
    return {
      tipo: "error",
      mensaje: "Las cantidades deben ser números válidos.",
      entrada: datos
    };
  }

  if (leche < 0 || maiz < 0) {
    return {
      tipo: "error",
      mensaje: "No se permiten cantidades negativas.",
      entrada: datos
    };
  }

  if (leche === 0 || maiz === 0) {
    return {
      tipo: "advertencia",
      mensaje: "La producción contiene valores en cero.",
      entrada: datos
    };
  }

  if (leche < 5 || maiz < 10) {
    return {
      tipo: "advertencia",
      mensaje: "La producción es demasiado baja.",
      entrada: datos
    };
  }

  if (leche > 1000 || maiz > 1000) {
    return {
      tipo: "advertencia",
      mensaje: "Cantidad inusualmente alta, revise el dato.",
      entrada: datos
    };
  }

  const total = leche + maiz;

  return {
    tipo: "exito",
    mensaje: `Registro procesado correctamente. Total reportado: ${total}`,
    entrada: datos,
    total
  };
}

function interpretarMensaje(resultado) {

  if (resultado.tipo === "error") {
    return "El sistema detectó un problema que impide procesar el registro.";
  }

  if (resultado.tipo === "advertencia") {
    return "El sistema procesó el registro, pero encontró datos que deben revisarse.";
  }

  return "El registro fue procesado correctamente y cumple las validaciones.";
}

function validarObjetivo(resultado, esperadoTipo) {

  const cumple = resultado.tipo === esperadoTipo;

  return {
    cumple,
    detalle: cumple
      ? "El resultado obtenido coincide con el esperado."
      : `El sistema esperaba un resultado tipo "${esperadoTipo}" pero obtuvo "${resultado.tipo}".`
  };
}

function mostrarSalida(resultado, esperadoTipo = null) {

  elementos.salidaSistema.textContent = resultado.mensaje;
  elementos.salidaSistema.className = `salida ${resultado.tipo}`;

  elementos.interpretacion.textContent = interpretarMensaje(resultado);

  if (esperadoTipo) {
    const validacion = validarObjetivo(resultado, esperadoTipo);
    elementos.validacionObjetivo.textContent = validacion.detalle;
  } else {
    elementos.validacionObjetivo.textContent =
      "Validación manual realizada correctamente.";
  }

  console.log("Salida generada:", resultado);
}

function validarFormulario() {
  const datos = obtenerDatosFormulario();
  const resultado = procesarRegistro(datos);
  mostrarSalida(resultado);
}

function ejecutarCasosPrueba() {

  elementos.tablaPruebas.innerHTML = "";

  casosPrueba.forEach((caso) => {

    const resultado = procesarRegistro(caso.entrada);

    const validacion = validarObjetivo(
      resultado,
      caso.esperadoTipo
    );

    const interpretacion = interpretarMensaje(resultado);

    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${caso.id}. ${caso.descripcion}</td>

      <td>
        Día: ${caso.entrada.dia || "(vacío)"}<br>
        Leche: ${caso.entrada.leche}<br>
        Maíz: ${caso.entrada.maiz}<br>
        Responsable: ${caso.entrada.responsable}
      </td>

      <td>${caso.esperadoTipo}</td>

      <td>${resultado.tipo}</td>

      <td>${validacion.cumple ? "Sí" : "No"}</td>

      <td>${interpretacion}</td>
    `;

    elementos.tablaPruebas.appendChild(fila);

  });

}

function limpiar() {

  elementos.dia.value = "";
  elementos.leche.value = "";
  elementos.maiz.value = "";
  elementos.responsable.value = "";

  elementos.salidaSistema.textContent =
    "Aún no se ha ejecutado ninguna prueba.";

  elementos.salidaSistema.className = "salida";

  elementos.interpretacion.textContent =
    "Pendiente por analizar.";

  elementos.validacionObjetivo.textContent =
    "Pendiente por validar.";

  elementos.tablaPruebas.innerHTML =
    '<tr><td colspan="6">Sin pruebas ejecutadas.</td></tr>';
}

elementos.btnValidar.addEventListener("click", validarFormulario);
elementos.btnCasos.addEventListener("click", ejecutarCasosPrueba);
elementos.btnLimpiar.addEventListener("click", limpiar);

console.info("Validador de Salidas Rurales iniciado.");
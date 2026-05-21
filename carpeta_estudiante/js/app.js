const CASOS_GUIADOS = [
  {
    id: 'S10-01',
    nombre: 'Registro valido',
    datos: { producto: 'Leche', cantidad: '12', unidad: 'litros', responsable: 'Ana', fecha: '2026-05-13' },
    esperado: { tipo: 'exito', textoClave: 'registro valido' }
  },
  {
    id: 'S10-02',
    nombre: 'Campo obligatorio vacio',
    datos: { producto: '', cantidad: '8', unidad: 'kilos', responsable: 'Luis', fecha: '2026-05-13' },
    esperado: { tipo: 'error', textoClave: 'completar todos los campos' }
  },
  {
    id: 'S10-03',
    nombre: 'Cantidad no numerica',
    datos: { producto: 'Cafe', cantidad: 'abc', unidad: 'arrobas', responsable: 'Marta', fecha: '2026-05-13' },
    esperado: { tipo: 'error', textoClave: 'numero valido' }
  },
  {
    id: 'S10-04',
    nombre: 'Cantidad negativa',
    datos: { producto: 'Maiz', cantidad: '-5', unidad: 'kilos', responsable: 'Jorge', fecha: '2026-05-13' },
    esperado: { tipo: 'error', textoClave: 'no puede ser negativa' }
  },
  {
    id: 'S10-05',
    nombre: 'Cantidad en cero',
    datos: { producto: 'Huevos', cantidad: '0', unidad: 'unidades', responsable: 'Diana', fecha: '2026-05-13' },
    esperado: { tipo: 'advertencia', textoClave: 'cantidad registrada es cero' }
  },
  {
    id: 'S10-06',
    nombre: 'Produccion baja',
    datos: { producto: 'Leche', cantidad: '2', unidad: 'litros', responsable: 'Carlos', fecha: '2026-05-13' },
    esperado: { tipo: 'advertencia', textoClave: 'produccion baja' }
  },
  {
    id: 'S10-07',
    nombre: 'Cantidad inusualmente alta',
    datos: { producto: 'Yuca', cantidad: '99999', unidad: 'kilos', responsable: 'Sofia', fecha: '2026-05-13' },
    esperado: { tipo: 'advertencia', textoClave: 'inusualmente alta' }
  },
  {
    id: 'S10-08',
    nombre: 'Responsable vacio',
    datos: { producto: 'Maiz', cantidad: '35', unidad: 'kilos', responsable: '', fecha: '2026-05-13' },
    esperado: { tipo: 'error', textoClave: 'completar todos los campos' }
  }
];

const STORAGE_KEY = 'agrosalida_s10_historial';
let historial = cargarHistorial();

document.addEventListener('DOMContentLoaded', iniciarAplicacion);

function iniciarAplicacion() {
  document.getElementById('formRegistro').addEventListener('submit', manejarEnvioFormulario);
  document.getElementById('btnEjemplo').addEventListener('click', cargarEjemplo);
  document.getElementById('btnEjecutarCasos').addEventListener('click', ejecutarCasosGuiados);
  document.getElementById('btnLimpiarHistorial').addEventListener('click', limpiarHistorial);

  renderHistorial();

  console.info('AgroSalida S10 cargado correctamente.');
}

function manejarEnvioFormulario(event) {
  event.preventDefault();

  const datos = leerFormulario();
  const resultado = evaluarRegistro(datos);

  mostrarSalida(resultado, datos);
  agregarHistorial('Prueba manual', datos, resultado);
}

function leerFormulario() {
  return {
    producto: document.getElementById('producto').value.trim(),
    cantidad: document.getElementById('cantidad').value.trim(),
    unidad: document.getElementById('unidad').value.trim(),
    responsable: document.getElementById('responsable').value.trim(),
    fecha: document.getElementById('fecha').value
  };
}

function cargarEjemplo() {
  document.getElementById('producto').value = 'Leche';
  document.getElementById('cantidad').value = '12';
  document.getElementById('unidad').value = 'litros';
  document.getElementById('responsable').value = 'Ana';
  document.getElementById('fecha').value = new Date().toISOString().slice(0, 10);
}

function evaluarRegistro(datos) {
  const camposVacios = Object.values(datos).some(
    valor => String(valor).trim() === ''
  );

  if (camposVacios) {
    return crearResultado(
      'error',
      'Debe completar todos los campos obligatorios.',
      'El sistema detecto informacion faltante y no puede continuar.',
      false
    );
  }

  const cantidad = Number(datos.cantidad);

  if (isNaN(cantidad)) {
    return crearResultado(
      'error',
      'La cantidad debe ser un numero valido.',
      'El sistema detecto letras o valores invalidos en la cantidad.',
      false
    );
  }

  if (cantidad < 0) {
    return crearResultado(
      'error',
      'La cantidad no puede ser negativa.',
      'El sistema bloquea cantidades negativas porque no representan un registro valido.',
      false
    );
  }

  if (cantidad === 0) {
    return crearResultado(
      'advertencia',
      'La cantidad registrada es cero.',
      'El sistema permite el registro, pero recomienda revisar el dato.',
      true
    );
  }

  if (cantidad <= 3) {
    return crearResultado(
      'advertencia',
      'La produccion baja debe revisarse.',
      'La cantidad ingresada es menor a la esperada.',
      true
    );
  }

  if (cantidad > 50000) {
    return crearResultado(
      'advertencia',
      'Cantidad inusualmente alta, revise el registro.',
      'El sistema detecto una cantidad fuera del rango normal.',
      true
    );
  }

  return crearResultado(
    'exito',
    'Registro valido procesado correctamente.',
    'El sistema valido el registro y cumple el objetivo funcional.',
    true
  );
}

function crearResultado(tipo, mensaje, interpretacion, objetivoCumplido) {
  return {
    tipo,
    mensaje,
    interpretacion,
    objetivoCumplido,
    fechaEvaluacion: new Date().toLocaleString('es-CO')
  };
}

function validarObjetivo(esperado, resultado) {
  const coincideTipo =
    esperado.tipo.toLowerCase() === resultado.tipo.toLowerCase();

  const coincideTexto =
    resultado.mensaje.toLowerCase().includes(
      esperado.textoClave.toLowerCase()
    );

  return coincideTipo && coincideTexto;
}

function mostrarSalida(resultado, datos) {
  const panel = document.getElementById('panelSalida');

  panel.className = 'result-panel';

  panel.innerHTML = `
    <span class="badge ${resultado.tipo}">${resultado.tipo}</span>

    <p class="result-message">${resultado.mensaje}</p>

    <p>${resultado.interpretacion}</p>

    <div class="meta-grid">
      <div class="meta-box">
        <span>Producto</span>
        <strong>${datos.producto || 'No registrado'}</strong>
      </div>

      <div class="meta-box">
        <span>Cantidad</span>
        <strong>${datos.cantidad || 'No registrada'} ${datos.unidad || ''}</strong>
      </div>

      <div class="meta-box">
        <span>Responsable</span>
        <strong>${datos.responsable || 'No registrado'}</strong>
      </div>

      <div class="meta-box">
        <span>Objetivo</span>
        <strong>${resultado.objetivoCumplido ? 'Cumple' : 'No cumple'}</strong>
      </div>
    </div>
  `;
}

function ejecutarCasosGuiados() {
  const tbody = document.getElementById('tablaCasos');

  const filas = CASOS_GUIADOS.map(caso => {
    const resultado = evaluarRegistro(caso.datos);

    const cumple = validarObjetivo(caso.esperado, resultado);

    agregarHistorial(caso.id, caso.datos, resultado, cumple);

    return `
      <tr>
        <td>
          <strong>${caso.id}</strong><br>
          <span class="muted">${caso.nombre}</span>
        </td>

        <td>${formatearDatos(caso.datos)}</td>

        <td>
          <strong>${caso.esperado.tipo}</strong><br>
          ${caso.esperado.textoClave}
        </td>

        <td>
          <strong>${resultado.tipo}</strong><br>
          ${resultado.mensaje}
        </td>

        <td class="${cumple ? 'status-pass' : 'status-fail'}">
          ${cumple ? 'Cumple' : 'No cumple'}
        </td>
      </tr>
    `;
  }).join('');

  tbody.innerHTML = filas;

  renderHistorial();
}

function formatearDatos(datos) {
  return `
    Producto: ${datos.producto || '(vacio)'}<br>
    Cantidad: ${datos.cantidad || '(vacio)'} ${datos.unidad || ''}<br>
    Responsable: ${datos.responsable || '(vacio)'}<br>
    Fecha: ${datos.fecha || '(vacia)'}
  `;
}

function agregarHistorial(origen, datos, resultado, cumple = null) {
  historial.unshift({
    origen,
    datos,
    resultado,
    cumple,
    fecha: new Date().toLocaleTimeString('es-CO')
  });

  historial = historial.slice(0, 12);

  guardarHistorial();

  renderHistorial();
}

function renderHistorial() {
  const contenedor = document.getElementById('historial');

  if (!historial.length) {
    contenedor.className = 'history-list empty-state';
    contenedor.textContent = 'Aun no hay acciones registradas.';
    return;
  }

  contenedor.className = 'history-list';

  contenedor.innerHTML = historial.map(item => `
    <div class="history-item">
      <strong>${item.origen} · ${item.resultado.tipo}</strong>
      <span class="muted">${item.fecha} · ${item.resultado.mensaje}</span>
    </div>
  `).join('');
}

function cargarHistorial() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    console.warn('No fue posible cargar el historial local.', error);
    return [];
  }
}

function guardarHistorial() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(historial));
}

function limpiarHistorial() {
  historial = [];

  guardarHistorial();

  renderHistorial();

  document.getElementById('tablaCasos').innerHTML = `
    <tr>
      <td colspan="5" class="muted">
        Historial limpio. Ejecuta los casos guiados para comenzar de nuevo.
      </td>
    </tr>
  `;
}
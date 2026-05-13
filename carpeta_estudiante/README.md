

# Semana 10 - Practica guiada en el entorno

## Actividad
**Observacion de resultados y salidas; interpretacion de mensajes; validacion de objetivos**

## Nombre del sistema
**AgroSalida S10: Observador de resultados rurales**

## Que haras en esta practica
Vas a abrir una aplicacion web en VS Code, ejecutar pruebas guiadas, observar los mensajes del sistema y validar si las salidas obtenidas cumplen el objetivo funcional.

La aplicacion base funciona, pero algunas salidas son demasiado generales o no cumplen completamente lo esperado. Tu tarea es observar, registrar, interpretar y mejorar siguiendo las indicaciones del docente.

---

## Objetivo funcional del sistema
El sistema debe validar registros de produccion rural y mostrar mensajes claros de:

- **Error**, cuando el dato impide continuar.
- **Advertencia**, cuando el dato puede aceptarse pero debe revisarse.
- **Exito**, cuando el registro es valido.

Tambien debe permitir comparar el **resultado esperado** con el **resultado obtenido**.

---

## Estructura del proyecto

```text
carpeta_estudiante/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── data/
│   └── casos_prueba.json
└── evidencias/
    ├── bitacora_practica_semana10.md
    └── registro_capturas.md
```

---

## Paso a paso

### 1. Abrir en VS Code
Abre la carpeta `carpeta_estudiante/` en Visual Studio Code.

Verifica que existan estos archivos:

- `index.html`
- `css/styles.css`
- `js/app.js`
- `data/casos_prueba.json`
- `evidencias/bitacora_practica_semana10.md`

Registra este paso en la bitacora.

---

### 2. Ejecutar la pagina
Abre `index.html` con Live Server o directamente en el navegador.

Si usas Live Server:

1. Clic derecho sobre `index.html`.
2. Selecciona **Open with Live Server**.

Captura sugerida: pagina inicial cargada en el navegador.

---

### 3. Revisar la consola
Abre la consola del navegador:

- `F12`, o
- `Ctrl + Shift + I`, pestaña **Console**.

Verifica si aparecen errores en rojo.

Registra en la bitacora:

- Si hay errores tecnicos.
- Que mensaje aparece.
- Si la pagina puede continuar funcionando.

---

### 4. Probar un caso manual
Usa el formulario principal con estos datos:

```text
Producto: Leche
Cantidad: 12
Unidad: litros
Responsable: Ana
Fecha: selecciona la fecha actual
```

Presiona **Evaluar registro**.

Registra:

- Resultado esperado.
- Resultado obtenido.
- Interpretacion del mensaje.

---

### 5. Ejecutar casos guiados
En la seccion **Casos guiados de salida**, presiona el boton:

```text
Ejecutar casos guiados
```

Observa la tabla generada.

Debes identificar:

- Que casos cumplen.
- Que casos no cumplen.
- Cual es el mensaje esperado.
- Cual fue el mensaje obtenido.

---

### 6. Completar la bitacora
Abre el archivo:

```text
evidencias/bitacora_practica_semana10.md
```

Completa la tabla con minimo 8 acciones.

---

### 7. Perfeccionar el sistema
Con ayuda del docente, abre:

```text
js/app.js
```

Busca los bloques marcados como:

```javascript
TODO-S10
```

El docente indicara que bloques debes modificar para mejorar las salidas, interpretar mensajes y validar objetivos.

---

### 8. Repetir las pruebas
Despues de modificar el codigo:

1. Guarda los cambios.
2. Recarga el navegador.
3. Ejecuta nuevamente los casos guiados.
4. Compara si ahora cumplen mas casos.

---

### 9. Entregar evidencias
Debes entregar:

- Carpeta del proyecto.
- Bitacora diligenciada.
- Registro de capturas.
- Conclusion breve sobre si el sistema cumple su objetivo.

---

## Capturas sugeridas

1. VS Code con el proyecto abierto.
2. Pagina inicial en el navegador.
3. Consola del navegador sin errores o con el error observado.
4. Tabla de casos guiados antes de mejorar.
5. Codigo modificado en `app.js`.
6. Tabla de casos guiados despues de mejorar.

---

## Criterios de revision

| Criterio | Evidencia |
|---|---|
| Ejecuta el proyecto en VS Code | Captura del entorno |
| Observa salidas del sistema | Tabla de casos o bitacora |
| Interpreta mensajes | Explicaciones en la bitacora |
| Valida objetivos | Comparacion esperado vs obtenido |
| Aplica mejoras | Cambios en `app.js` |
| Documenta el proceso | Bitacora y capturas |

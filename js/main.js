/* =========================================================
   Libros para tu Kindle: control de la intro animada
   - Se muestra solo la primera vez que alguien entra.
   - Se puede saltar con el botón «Saltar», con «Entrar» o con Esc.
   - El pie de página permite verla otra vez.
   - Añadir ?intro a la dirección también la fuerza (útil para probar).
   ========================================================= */
(function () {
  'use strict';

  var CLAVE = 'libros-intro-vista';
  var DURACION_AUTO = 8000;      // ms hasta pasar sola al sitio
  var DURACION_REDUCIDA = 2200;  // ms si la persona pidió menos movimiento

  var raiz = document.documentElement;
  var intro = document.getElementById('intro');
  if (!intro) return;

  var botonEntrar = document.getElementById('intro-entrar');
  var botonSaltar = document.getElementById('intro-saltar');
  var botonRepetir = document.getElementById('intro-repetir');
  var titulo = document.querySelector('.portada h1');
  var bloques = [
    document.getElementById('cabecera'),
    document.getElementById('contenido'),
    document.getElementById('pie')
  ];

  var movimientoReducido = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var temporizador = null;
  var cerrando = false;

  function bloquearSitio(bloquear) {
    bloques.forEach(function (el) {
      if (!el) return;
      if (bloquear) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
    document.body.classList.toggle('sin-scroll', bloquear);
  }

  function recordarVisita() {
    try { localStorage.setItem(CLAVE, '1'); } catch (e) { /* modo privado: no pasa nada */ }
  }

  function iniciar() {
    cerrando = false;
    clearTimeout(temporizador);
    raiz.classList.add('con-intro');
    intro.classList.remove('saliendo', 'is-playing');
    void intro.offsetWidth;               // reinicia las animaciones CSS
    intro.classList.add('is-playing');
    bloquearSitio(true);
    window.scrollTo(0, 0);
    intro.focus({ preventScroll: true });
    temporizador = setTimeout(cerrar, movimientoReducido ? DURACION_REDUCIDA : DURACION_AUTO);
  }

  function terminar() {
    raiz.classList.remove('con-intro');
    intro.classList.remove('saliendo', 'is-playing');
    bloquearSitio(false);
    if (titulo) {
      titulo.setAttribute('tabindex', '-1');
      titulo.focus({ preventScroll: true });
    }
  }

  function cerrar() {
    if (cerrando) return;
    cerrando = true;
    clearTimeout(temporizador);
    recordarVisita();

    if (movimientoReducido) { terminar(); return; }

    intro.classList.add('saliendo');
    var listo = false;
    function fin() { if (listo) return; listo = true; terminar(); }
    intro.addEventListener('transitionend', function (e) {
      if (e.target === intro && e.propertyName === 'opacity') fin();
    });
    setTimeout(fin, 900);                  // respaldo por si no llega transitionend
  }

  // ---- Eventos ----
  botonEntrar.addEventListener('click', cerrar);
  botonSaltar.addEventListener('click', cerrar);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && raiz.classList.contains('con-intro')) cerrar();
  });

  if (botonRepetir) {
    botonRepetir.addEventListener('click', iniciar);
  }

  // ---- Arranque ----
  if (raiz.classList.contains('con-intro')) iniciar();
})();

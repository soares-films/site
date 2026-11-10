// O fantasma segue o rato de longe. Só em ecrãs com rato e sem pedido de menos movimento.
var title = document.querySelector('.title__ghost');
var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (title && !calm && window.matchMedia('(hover: hover)').matches) {
  var frameId = 0;
  window.addEventListener('pointermove', function (event) {
    if (frameId) return;
    frameId = requestAnimationFrame(function () {
      var x = event.clientX / window.innerWidth - 0.5;
      var y = event.clientY / window.innerHeight - 0.5;
      title.style.setProperty('--gx', (x * 26).toFixed(1) + 'px');
      title.style.setProperty('--gy', (y * 14).toFixed(1) + 'px');
      frameId = 0;
    });
  }, { passive: true });
}

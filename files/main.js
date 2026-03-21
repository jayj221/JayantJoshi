/* ============================================
   JAYANT JOSHI — PORTFOLIO
   js/main.js — Shared Scripts
   ============================================ */

// ── CURSOR ──
const cur = document.getElementById('cur');
const curR = document.getElementById('cur-r');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = (mx - 4) + 'px';
  cur.style.top  = (my - 4) + 'px';
});

(function animR() {
  rx += (mx - rx) * .1;
  ry += (my - ry) * .1;
  curR.style.left = (rx - 16) + 'px';
  curR.style.top  = (ry - 16) + 'px';
  requestAnimationFrame(animR);
})();

document.querySelectorAll('a, .build-card, .stat-tile, .ach-pill, .skill-col, .exp-company-header, .comp-card, .acad-card, .cert-card, .extra-card').forEach(el => {
  el.addEventListener('mouseenter', () => curR.classList.add('cur-big'));
  el.addEventListener('mouseleave', () => curR.classList.remove('cur-big'));
});

// ── SCROLL REVEAL ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

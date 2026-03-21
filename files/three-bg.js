/* ============================================
   JAYANT JOSHI — PORTFOLIO
   js/three-bg.js — Three.js 3D Background
   Used only on index.html
   ============================================ */

(function initThree() {
  const canvas = document.getElementById('bgc');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, .1, 1000);
  camera.position.z = 6;

  // Grid floor
  const grid = new THREE.GridHelper(40, 40, 0x0a0a18, 0x0a0a18);
  grid.position.y = -3;
  grid.material.transparent = true;
  grid.material.opacity = 0.6;
  scene.add(grid);

  // Particle field
  const N   = 2800;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);

  for (let i = 0; i < N; i++) {
    pos[i*3]   = (Math.random() - .5) * 32;
    pos[i*3+1] = (Math.random() - .5) * 20;
    pos[i*3+2] = (Math.random() - .5) * 18;
    const r = Math.random();
    if      (r < .12) { col[i*3]=0;    col[i*3+1]=1;   col[i*3+2]=.53; } // accent green
    else if (r < .18) { col[i*3]=.96;  col[i*3+1]=.65; col[i*3+2]=.14; } // amber
    else              { col[i*3]=.12;  col[i*3+1]=.12; col[i*3+2]=.22; } // dim
  }

  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({
    size: .03, vertexColors: true, transparent: true, opacity: .85, sizeAttenuation: true
  }));
  scene.add(pts);

  // Wireframe octahedron
  const oct = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.6, 2),
    new THREE.MeshBasicMaterial({ color: 0x0d1a0d, wireframe: true, transparent: true, opacity: .15 })
  );
  oct.position.set(5, 1, -4);
  scene.add(oct);

  // Torus knot
  const tk = new THREE.Mesh(
    new THREE.TorusKnotGeometry(.8, .2, 60, 8),
    new THREE.MeshBasicMaterial({ color: 0x0a180a, wireframe: true, transparent: true, opacity: .12 })
  );
  tk.position.set(-5.5, 0, -3);
  scene.add(tk);

  // Mouse parallax
  let tx = 0, ty = 0, t = 0;
  document.addEventListener('mousemove', e => {
    tx = (e.clientX / innerWidth  - .5) *  .5;
    ty = (e.clientY / innerHeight - .5) * -.35;
  });

  (function anim() {
    requestAnimationFrame(anim);
    t += .003;
    pts.rotation.y += .0003;
    oct.rotation.x = t * .3; oct.rotation.y = t * .5;
    tk.rotation.x  = t * .4; tk.rotation.z  = t * .2;
    grid.rotation.y = t * .02;
    camera.position.x += (tx - camera.position.x) * .035;
    camera.position.y += (ty - camera.position.y) * .035;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  })();

  window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
})();

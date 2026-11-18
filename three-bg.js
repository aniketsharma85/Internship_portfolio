/**
 * Professional Interactive 3D Background Engine with Three.js
 * Author: Aniket Sharma
 * Clean, subtle, high-performance ambient WebGL canvas.
 * Unobtrusive particle constellation with gentle cursor-reactive depth.
 * Zero distracting roaming shapes/icons.
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded. Falling back to CSS ambient effects.');
    return;
  }

  const container = document.getElementById('webgl-container');
  if (!container) return;

  // ---------------- Scene, Camera, Renderer ----------------
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x060810, 0.0015);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 450;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    console.warn('WebGL not supported:', e);
    return;
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  // ---------------- Subtle Ambient & Point Lights ----------------
  const ambientLight = new THREE.AmbientLight(0x0f172a, 1.5);
  scene.add(ambientLight);

  // Soft, calming accent lights (Cyan & Indigo)
  const lightPrimary = new THREE.PointLight(0x06b6d4, 1.8, 800);
  lightPrimary.position.set(100, 100, 200);
  scene.add(lightPrimary);

  const lightSecondary = new THREE.PointLight(0x6366f1, 1.4, 800);
  lightSecondary.position.set(-100, -100, 150);
  scene.add(lightSecondary);

  // ---------------- Subtle 3D Star/Particle Field ----------------
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 600 : 1200;

  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  // Professional corporate tech palette: slate blue, electric cyan, soft indigo
  const colorPalette = [
    new THREE.Color(0x38bdf8), // Sky blue
    new THREE.Color(0x818cf8), // Soft indigo
    new THREE.Color(0x06b6d4), // Cyan
    new THREE.Color(0x94a3b8)  // Slate
  ];

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    // Elegant uniform 3D volume distribution
    positions[i3] = (Math.random() - 0.5) * 1400;
    positions[i3 + 1] = (Math.random() - 0.5) * 1200;
    positions[i3 + 2] = (Math.random() - 0.5) * 800;

    const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i3] = chosenColor.r;
    colors[i3 + 1] = chosenColor.g;
    colors[i3 + 2] = chosenColor.b;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Soft round particle texture
  function createSoftParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    grad.addColorStop(0.35, 'rgba(125, 211, 252, 0.6)');
    grad.addColorStop(0.8, 'rgba(99, 102, 241, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
  }

  const particleMaterial = new THREE.PointsMaterial({
    size: 4,
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    map: createSoftParticleTexture(),
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  // ---------------- Subtle 3D Geometric Plane Wave (Clean Architectural Grid) ----------------
  const gridGeometry = new THREE.PlaneGeometry(1600, 1600, 36, 36);
  const gridMaterial = new THREE.MeshBasicMaterial({
    color: 0x1e293b,
    wireframe: true,
    transparent: true,
    opacity: 0.14
  });
  const gridPlane = new THREE.Mesh(gridGeometry, gridMaterial);
  gridPlane.rotation.x = -Math.PI / 2.3;
  gridPlane.position.y = -260;
  gridPlane.position.z = -150;
  scene.add(gridPlane);

  // ---------------- Mouse Parallax Tracking ----------------
  const mouse = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  };

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.targetX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
    }
  }, { passive: true });

  // ---------------- Scroll Tracking ----------------
  let scrollProgress = 0;
  window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  }, { passive: true });

  // ---------------- Resize Handling ----------------
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // ---------------- Animation Loop ----------------
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth subtle mouse interpolation (calm damping)
    mouse.x += (mouse.targetX - mouse.x) * 0.03;
    mouse.y += (mouse.targetY - mouse.y) * 0.03;

    // Slow, serene particle drift
    particleSystem.rotation.y = elapsedTime * 0.012 + mouse.x * 0.08;
    particleSystem.rotation.x = elapsedTime * 0.006 + mouse.y * 0.05;

    // Subtle gentle wave motion on background architectural grid
    const posAttr = gridGeometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const u = posAttr.getX(i);
      const v = posAttr.getY(i);
      const zWave = Math.sin(u * 0.005 + elapsedTime * 0.8) * Math.cos(v * 0.005 + elapsedTime * 0.8) * 12;
      posAttr.setZ(i, zWave);
    }
    posAttr.needsUpdate = true;

    // Subtle lighting motion
    lightPrimary.position.x = mouse.x * 180 + 100;
    lightPrimary.position.y = mouse.y * 120 + 80;

    lightSecondary.position.x = -mouse.x * 180 - 100;
    lightSecondary.position.y = -mouse.y * 120 - 80;

    // Subtle, calm camera parallax without excessive tilt
    const targetCamX = mouse.x * 35;
    const targetCamY = mouse.y * 25 - scrollProgress * 60;
    const targetCamZ = 450 + scrollProgress * 100;

    camera.position.x += (targetCamX - camera.position.x) * 0.03;
    camera.position.y += (targetCamY - camera.position.y) * 0.03;
    camera.position.z += (targetCamZ - camera.position.z) * 0.03;
    camera.lookAt(0, -scrollProgress * 40, 0);

    renderer.render(scene, camera);
  }

  animate();
})();

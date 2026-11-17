"use client";

import { useEffect, useRef } from "react";

type ThreeNS = typeof import("three");

// Footer scene: a glowing wireframe ocean rolling under the giant wordmark,
// with a small container ship riding the swell across the screen. Big,
// visible motion — trade by sea, drawn as light.
//
// three.js loads lazily on first approach of the footer; without WebGL the
// footer simply stays as it is.

const SEA_COLS = 96;
const SEA_ROWS = 26;
const SEA_WIDTH = 34;
const SEA_DEPTH = 17;
const SHIP_LOOP_SECONDS = 46;
const SHIP_Z = -3.4;

const SEA_COLOR = 0x7f97ff;
const HULL_COLOR = 0x0a1030;
const BRIDGE_COLOR = 0xe8ecff;
const EDGE_COLOR = 0xa8bcff;
const CONTAINER_COLORS = [0xf2b13f, 0xffffff, 0x2f53cf, 0xf2b13f, 0x9db4ff];
const FALLBACK_BG = 0x12106b;

function cssColorToHex(css: string): number | null {
  const probe = document.createElement("canvas");
  probe.width = 1;
  probe.height = 1;
  const ctx = probe.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.fillStyle = "#000";
  ctx.fillStyle = css; // Invalid values silently keep the previous fill.
  ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return ((d[0]! << 16) | (d[1]! << 8) | d[2]!) >>> 0;
}

// Three superimposed swells; amplitude eases off toward the horizon so the
// far rows read as calm distance.
function waveHeight(x: number, z: number, t: number) {
  const depthEase = 1 - Math.min(1, -z / SEA_DEPTH) * 0.55;
  return (
    (Math.sin(x * 0.5 + t * 1.05 + z * 0.55) * 0.34 +
      Math.sin(x * 0.27 - t * 0.62 + z * 0.31) * 0.22 +
      Math.sin(x * 1.25 + t * 1.65) * 0.07) *
    depthEase
  );
}

function buildScene(
  container: HTMLDivElement,
  THREE: ThreeNS
): (() => void) | null {
  let renderer: InstanceType<ThreeNS["WebGLRenderer"]>;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  } catch {
    return null; // No WebGL: the footer stays static.
  }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  const canvas = renderer.domElement;
  container.appendChild(canvas);

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const fogHex =
    cssColorToHex(
      getComputedStyle(container.parentElement ?? container).backgroundColor
    ) ?? FALLBACK_BG;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(fogHex, 7, SEA_DEPTH + 6);

  const camera = new THREE.PerspectiveCamera(38, 2, 0.1, 50);
  camera.position.set(0, 2.7, 9.4);
  camera.lookAt(0, 0.2, -5);

  const disposables: Array<{ dispose: () => void }> = [];

  // The sea: one polyline per row, brighter near the camera.
  type SeaRow = {
    z: number;
    geometry: InstanceType<ThreeNS["BufferGeometry"]>;
    positions: Float32Array;
  };
  const seaRows: SeaRow[] = [];

  for (let row = 0; row < SEA_ROWS; row++) {
    const z = -(row / (SEA_ROWS - 1)) * SEA_DEPTH;
    const positions = new Float32Array(SEA_COLS * 3);
    for (let col = 0; col < SEA_COLS; col++) {
      positions[col * 3] = (col / (SEA_COLS - 1) - 0.5) * SEA_WIDTH;
      positions[col * 3 + 1] = 0;
      positions[col * 3 + 2] = z;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.LineBasicMaterial({
      color: SEA_COLOR,
      transparent: true,
      opacity: 0.62 * (1 - (row / (SEA_ROWS - 1)) * 0.8) + 0.06,
      depthWrite: false,
    });
    disposables.push(geometry, material);
    scene.add(new THREE.Line(geometry, material));
    seaRows.push({ z, geometry, positions });
  }

  // The ship: dark hull, lit bridge, stacked containers, glowing edges.
  const ship = new THREE.Group();
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: EDGE_COLOR,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  disposables.push(edgeMaterial);

  const addBlock = (
    width: number,
    height: number,
    depth: number,
    color: number,
    x: number,
    y: number
  ) => {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color });
    disposables.push(geometry, material);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, 0);
    ship.add(mesh);

    const edges = new THREE.EdgesGeometry(geometry);
    disposables.push(edges);
    const outline = new THREE.LineSegments(edges, edgeMaterial);
    outline.position.copy(mesh.position);
    ship.add(outline);
  };

  // Sails right to left: bow on the left, bridge aft on the right.
  addBlock(2.6, 0.34, 0.66, HULL_COLOR, 0, 0.17); // hull
  addBlock(0.3, 0.52, 0.56, BRIDGE_COLOR, 1.0, 0.6); // bridge
  for (let i = 0; i < 5; i++) {
    addBlock(0.36, 0.24, 0.58, CONTAINER_COLORS[i]!, -1.0 + i * 0.4, 0.46);
  }
  for (let i = 0; i < 3; i++) {
    addBlock(0.36, 0.24, 0.58, CONTAINER_COLORS[(i + 2) % 5]!, -0.6 + i * 0.4, 0.7);
  }
  ship.scale.setScalar(1.18);
  scene.add(ship);

  const timer = new THREE.Timer();

  function tick() {
    timer.update();
    const t = reducedMotion ? 2.4 : timer.getElapsed();

    for (const row of seaRows) {
      const positions = row.positions;
      for (let col = 0; col < SEA_COLS; col++) {
        positions[col * 3 + 1] = waveHeight(positions[col * 3]!, row.z, t);
      }
      row.geometry.attributes.position!.needsUpdate = true;
    }

    // Sail right to left, wrap around, ride and pitch with the swell.
    const span = SEA_WIDTH * 0.78;
    const shipX = reducedMotion
      ? 1.6
      : span / 2 - ((t * (span / SHIP_LOOP_SECONDS)) % span);
    const yHere = waveHeight(shipX, SHIP_Z, t);
    const yAhead = waveHeight(shipX - 0.9, SHIP_Z, t);
    ship.position.set(shipX, yHere + 0.04, SHIP_Z);
    ship.rotation.z = (yAhead - yHere) * 0.55;
    ship.rotation.x = Math.sin(t * 0.9) * 0.025;

    renderer.render(scene, camera);
  }

  let rafId = 0;
  let running = false;
  function loop() {
    rafId = requestAnimationFrame(loop);
    tick();
  }

  const visibility = new IntersectionObserver(
    ([entry]) => {
      const visible = entry?.isIntersecting ?? false;
      if (visible && !running && !reducedMotion) {
        running = true;
        timer.update(); // Drop the time spent off-screen.
        loop();
      } else if (!visible && running) {
        running = false;
        cancelAnimationFrame(rafId);
      }
    },
    { rootMargin: "120px" }
  );
  visibility.observe(container);

  const resize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (!running) tick();
  };
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  return () => {
    running = false;
    cancelAnimationFrame(rafId);
    visibility.disconnect();
    resizeObserver.disconnect();
    for (const disposable of disposables) disposable.dispose();
    renderer.dispose();
    canvas.remove();
  };
}

export function TradeOcean() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    // Defer three.js until the footer comes close.
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        loader.disconnect();
        void (async () => {
          const THREE = await import("three");
          if (disposed) return;
          cleanup = buildScene(container, THREE);
        })();
      },
      { rootMargin: "400px" }
    );
    loader.observe(container);

    return () => {
      disposed = true;
      loader.disconnect();
      cleanup?.();
    };
  }, []);

  return <div aria-hidden="true" className="lp-foot-scene" ref={containerRef} />;
}

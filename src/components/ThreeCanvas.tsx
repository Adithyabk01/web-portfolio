import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Maximize2, Minimize2, Eye, Cpu, Compass, RotateCcw, Sparkles } from 'lucide-react';

interface ThreeCanvasProps {
  onNodeSelect?: (nodeId: string) => void;
  className?: string;
  heroPhotoUrl?: string;
}

export type SceneMode = 'neural' | 'hologram' | 'constellation';

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  onNodeSelect,
  className = '',
  heroPhotoUrl = '/assets/aistudio/IMG_20261026_111239_c388cae6.jpg'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const fallbackCanvasRef = useRef<HTMLCanvasElement>(null);
  const [activeMode, setActiveMode] = useState<SceneMode>('neural');
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [webGlAvailable, setWebGlAvailable] = useState<boolean>(true);

  // Mutable refs to control 3D scene from React state without re-mounting
  const sceneStateRef = useRef({
    mode: 'neural' as SceneMode,
    wireframe: false,
    rotating: true,
    pointerX: 0,
    pointerY: 0,
    targetPointerX: 0,
    targetPointerY: 0,
  });

  useEffect(() => {
    sceneStateRef.current.mode = activeMode;
  }, [activeMode]);

  useEffect(() => {
    sceneStateRef.current.wireframe = isWireframe;
  }, [isWireframe]);

  useEffect(() => {
    sceneStateRef.current.rotating = isRotating;
  }, [isRotating]);

  // Main WebGL Scene Effect
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId = 0;
    let isDisposed = false;

    try {
      // 1. Detect WebGL support safely without calling loseContext()
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      if (!gl) {
        setWebGlAvailable(false);
        return;
      }

      const width = container.clientWidth || 600;
      const height = container.clientHeight || 500;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x07090e, 0.035);

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 8.5);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);

      // Studio Environment lighting via RoomEnvironment
      try {
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
        pmremGenerator.dispose();
      } catch (e) {
        // Fallback lighting if PMREM fails in constrained environment
        console.warn('RoomEnvironment fallback active');
      }

      // 3-Point Lighting Rig
      const ambientLight = new THREE.AmbientLight(0x0a1628, 1.6);
      scene.add(ambientLight);

      const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 1.8);
      scene.add(hemiLight);

      const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
      keyLight.position.set(5, 6, 7);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0x818cf8, 2.0);
      rimLight.position.set(-6, -4, -5);
      scene.add(rimLight);

      // Root Group
      const rootGroup = new THREE.Group();
      scene.add(rootGroup);

      // --- SUB-ASSEMBLY 1: Neural Core Mesh (3-part compound) ---
      const neuralGroup = new THREE.Group();
      rootGroup.add(neuralGroup);

      // Part A: Inner crystalline nucleus
      const innerGeom = new THREE.IcosahedronGeometry(1.4, 1);
      const innerMat = new THREE.MeshPhysicalMaterial({
        color: 0x0284c7,
        emissive: 0x0369a1,
        emissiveIntensity: 0.45,
        metalness: 0.85,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        wireframe: false,
      });
      const innerCore = new THREE.Mesh(innerGeom, innerMat);
      neuralGroup.add(innerCore);

      // Part B: Outer geodesic quantum cage
      const cageGeom = new THREE.IcosahedronGeometry(2.1, 1);
      const cageMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        wireframe: true,
        roughness: 0.3,
        metalness: 0.9,
      });
      const outerCage = new THREE.Mesh(cageGeom, cageMat);
      neuralGroup.add(outerCage);

      // Part C: Orbital Rings
      const ringMat1 = new THREE.MeshStandardMaterial({
        color: 0x60a5fa,
        metalness: 0.9,
        roughness: 0.2,
        side: THREE.DoubleSide
      });
      const ringGeom1 = new THREE.TorusGeometry(2.7, 0.025, 16, 100);
      const ringMesh1 = new THREE.Mesh(ringGeom1, ringMat1);
      ringMesh1.rotation.x = Math.PI / 3;
      neuralGroup.add(ringMesh1);

      const ringMat2 = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        metalness: 0.9,
        roughness: 0.2,
        side: THREE.DoubleSide
      });
      const ringGeom2 = new THREE.TorusGeometry(3.1, 0.02, 16, 100);
      const ringMesh2 = new THREE.Mesh(ringGeom2, ringMat2);
      ringMesh2.rotation.y = Math.PI / 4;
      ringMesh2.rotation.x = -Math.PI / 6;
      neuralGroup.add(ringMesh2);

      // Part D: Orbiting satellite beads
      const beadGeom = new THREE.SphereGeometry(0.12, 16, 16);
      const beadMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.8,
        metalness: 0.7,
        roughness: 0.2
      });

      const satellites: THREE.Mesh[] = [];
      const satelliteCount = 4;
      for (let i = 0; i < satelliteCount; i++) {
        const bead = new THREE.Mesh(beadGeom, beadMat);
        satellites.push(bead);
        neuralGroup.add(bead);
      }

      // --- SUB-ASSEMBLY 2: Floating Holographic Photo Prism ---
      const hologramGroup = new THREE.Group();
      hologramGroup.visible = false;
      rootGroup.add(hologramGroup);

      const textureLoader = new THREE.TextureLoader();
      const photoTexture = textureLoader.load(
        heroPhotoUrl,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          if (renderer) tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        },
        undefined,
        () => {
          console.warn('Hero photo texture loading fallback');
        }
      );

      const cardGeom = new THREE.PlaneGeometry(2.8, 3.8);
      const cardMat = new THREE.MeshStandardMaterial({
        map: photoTexture,
        roughness: 0.25,
        metalness: 0.1,
        side: THREE.DoubleSide,
      });
      const photoPlane = new THREE.Mesh(cardGeom, cardMat);
      hologramGroup.add(photoPlane);

      const bezelGeom = new THREE.BoxGeometry(2.95, 3.95, 0.06);
      const bezelMat = new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        metalness: 0.95,
        roughness: 0.15,
        transparent: true,
        opacity: 0.7,
        clearcoat: 1.0,
      });
      const bezel = new THREE.Mesh(bezelGeom, bezelMat);
      bezel.position.z = -0.04;
      hologramGroup.add(bezel);

      const bracketGeom = new THREE.TorusGeometry(2.4, 0.03, 8, 4);
      const bracketMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        wireframe: true,
        metalness: 0.9,
      });
      const bracketMesh = new THREE.Mesh(bracketGeom, bracketMat);
      bracketMesh.rotation.z = Math.PI / 4;
      hologramGroup.add(bracketMesh);

      // --- SUB-ASSEMBLY 3: Project Constellation Nodes ---
      const constellationGroup = new THREE.Group();
      const projectNodePositions = [
        { id: 'kisan-sethu', label: 'Kisan Sethu', pos: new THREE.Vector3(-2.6, 1.2, 0.5), color: 0x10b981 },
        { id: 'mediread', label: 'MediRead AI', pos: new THREE.Vector3(2.6, 1.1, -0.4), color: 0x38bdf8 },
        { id: 'startup-trends', label: 'Startup Trends BI', pos: new THREE.Vector3(-1.8, -1.8, 0.6), color: 0xf59e0b },
        { id: 'typing-arena', label: 'Typing Arena', pos: new THREE.Vector3(2.0, -1.7, 0.3), color: 0xec4899 },
      ];

      const projectMeshes: THREE.Mesh[] = [];
      projectNodePositions.forEach((node) => {
        const pGeom = new THREE.DodecahedronGeometry(0.4, 0);
        const pMat = new THREE.MeshPhysicalMaterial({
          color: node.color,
          emissive: node.color,
          emissiveIntensity: 0.4,
          metalness: 0.7,
          roughness: 0.25,
          clearcoat: 0.8
        });
        const pMesh = new THREE.Mesh(pGeom, pMat);
        pMesh.position.copy(node.pos);
        pMesh.userData = { id: node.id, label: node.label };

        const wire = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.55, 0),
          new THREE.MeshBasicMaterial({ color: node.color, wireframe: true, transparent: true, opacity: 0.4 })
        );
        pMesh.add(wire);

        const lineGeom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          node.pos
        ]);
        const lineMat = new THREE.LineBasicMaterial({
          color: node.color,
          transparent: true,
          opacity: 0.35
        });
        const line = new THREE.Line(lineGeom, lineMat);
        constellationGroup.add(line);

        projectMeshes.push(pMesh);
        constellationGroup.add(pMesh);
      });
      constellationGroup.visible = false;
      rootGroup.add(constellationGroup);

      // --- PARTICLE FIELD: Neural Synapse Points ---
      const particleCount = 450;
      const particleGeom = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);

      const c1 = new THREE.Color(0x38bdf8);
      const c2 = new THREE.Color(0x818cf8);
      const c3 = new THREE.Color(0x06b6d4);

      for (let i = 0; i < particleCount; i++) {
        const radius = 3.2 + Math.random() * 3.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i * 3 + 2] = radius * Math.cos(phi);

        const pick = Math.random();
        const col = pick < 0.4 ? c1 : pick < 0.8 ? c2 : c3;
        particleColors[i * 3] = col.r;
        particleColors[i * 3 + 1] = col.g;
        particleColors[i * 3 + 2] = col.b;
      }

      particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(particleGeom, particleMat);
      rootGroup.add(particles);

      // Contact shadow plane
      const shadowGeom = new THREE.PlaneGeometry(6, 6);
      const shadowCanvas = document.createElement('canvas');
      shadowCanvas.width = 128;
      shadowCanvas.height = 128;
      const shadowCtx = shadowCanvas.getContext('2d');
      if (shadowCtx) {
        const grad = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
        grad.addColorStop(0.5, 'rgba(14, 165, 233, 0.08)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        shadowCtx.fillStyle = grad;
        shadowCtx.fillRect(0, 0, 128, 128);
      }
      const shadowTex = new THREE.CanvasTexture(shadowCanvas);
      const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
        opacity: 0.75
      });
      const contactShadow = new THREE.Mesh(shadowGeom, shadowMat);
      contactShadow.rotation.x = -Math.PI / 2;
      contactShadow.position.y = -2.8;
      rootGroup.add(contactShadow);

      // Pointer event listener
      const handlePointerMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        sceneStateRef.current.targetPointerX = x * 0.8;
        sceneStateRef.current.targetPointerY = y * 0.6;
      };

      container.addEventListener('mousemove', handlePointerMove);

      // Animation Loop
      const clock = new THREE.Clock();

      function tick() {
        if (isDisposed) return;

        const dt = Math.min(clock.getDelta(), 0.1);
        const elapsedTime = clock.getElapsedTime();

        // Exponential damping
        sceneStateRef.current.pointerX = THREE.MathUtils.damp(
          sceneStateRef.current.pointerX,
          sceneStateRef.current.targetPointerX,
          5.0,
          dt
        );
        sceneStateRef.current.pointerY = THREE.MathUtils.damp(
          sceneStateRef.current.pointerY,
          sceneStateRef.current.targetPointerY,
          5.0,
          dt
        );

        camera.position.x = sceneStateRef.current.pointerX * 1.2;
        camera.position.y = sceneStateRef.current.pointerY * 0.8;
        camera.lookAt(0, 0, 0);

        const currentMode = sceneStateRef.current.mode;
        neuralGroup.visible = currentMode === 'neural';
        hologramGroup.visible = currentMode === 'hologram';
        constellationGroup.visible = currentMode === 'constellation';

        innerMat.wireframe = sceneStateRef.current.wireframe;

        if (sceneStateRef.current.rotating) {
          if (currentMode === 'neural') {
            innerCore.rotation.x += dt * 0.35;
            innerCore.rotation.y += dt * 0.5;
            outerCage.rotation.x -= dt * 0.2;
            outerCage.rotation.y -= dt * 0.25;
            ringMesh1.rotation.z += dt * 0.3;
            ringMesh2.rotation.z -= dt * 0.25;

            satellites.forEach((sat, i) => {
              const angle = elapsedTime * 0.8 + (i * Math.PI * 2) / satelliteCount;
              const radius = 2.7;
              sat.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * (i % 2 === 0 ? 0.9 : -0.9),
                Math.sin(angle) * radius * 0.7
              );
            });
          } else if (currentMode === 'hologram') {
            photoPlane.rotation.y = Math.sin(elapsedTime * 0.8) * 0.15;
            photoPlane.rotation.x = Math.cos(elapsedTime * 0.6) * 0.08;
            bezel.rotation.copy(photoPlane.rotation);
            bracketMesh.rotation.z += dt * 0.15;
          } else if (currentMode === 'constellation') {
            constellationGroup.rotation.y += dt * 0.2;
            projectMeshes.forEach((mesh, idx) => {
              mesh.rotation.x += dt * 0.5 * (idx % 2 === 0 ? 1 : -1);
              mesh.rotation.y += dt * 0.4;
            });
          }

          particles.rotation.y += dt * 0.05;
          particles.rotation.x += dt * 0.02;
        }

        if (renderer) {
          renderer.render(scene, camera);
        }

        animationFrameId = requestAnimationFrame(tick);
      }

      animationFrameId = requestAnimationFrame(tick);

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        isDisposed = true;
        cancelAnimationFrame(animationFrameId);
        container.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('resize', handleResize);

        [innerGeom, cageGeom, ringGeom1, ringGeom2, beadGeom, cardGeom, bezelGeom, bracketGeom, particleGeom, shadowGeom].forEach(g => g.dispose());
        [innerMat, cageMat, ringMat1, ringMat2, beadMat, cardMat, bezelMat, bracketMat, particleMat, shadowMat].forEach(m => m.dispose());
        photoTexture.dispose();
        shadowTex.dispose();

        if (renderer) {
          renderer.dispose();
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        }
      };
    } catch (err) {
      console.warn('WebGL initialization caught error, switching to interactive fallback:', err);
      setWebGlAvailable(false);
    }
  }, [heroPhotoUrl]);

  return (
    <div className={`relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#0c121e]/90 to-[#07090e] border border-cyan-500/20 shadow-2xl ${className}`}>
      {/* 3D WebGL Canvas Mount Container */}
      {webGlAvailable ? (
        <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />
      ) : (
        /* Seamless interactive 2D Canvas Fallback */
        <div className="w-full h-full absolute inset-0 flex items-center justify-center p-6 bg-slate-950">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 rounded-full border-2 border-cyan-400/50 flex items-center justify-center mx-auto bg-cyan-950/30 animate-pulse">
              <Cpu className="w-10 h-10 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Quantum Neural Core Matrix</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Interactive architecture simulation active across AI/ML and Full-Stack nodes.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Optimized 2.5D Mode Active</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Left Minimal Spec Badge */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 text-xs font-mono text-cyan-400/90 bg-slate-950/80 px-3 py-1.5 rounded-md border border-cyan-500/30">
        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
        <span>INTERACTIVE 3D {activeMode.toUpperCase()} VIEWPORT</span>
      </div>

      {/* Top Right Quick Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => {
            sceneStateRef.current.targetPointerX = 0;
            sceneStateRef.current.targetPointerY = 0;
          }}
          title="Reset View"
          className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Collapsible Bottom Control Dock */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[560px]">
        {/* Toggle Bar */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="px-3 py-1 text-[11px] font-mono tracking-wider text-slate-400 hover:text-cyan-300 bg-slate-950/90 hover:bg-slate-900 rounded-t-md border-t border-x border-slate-800 transition-colors flex items-center gap-1.5 shadow-md"
          >
            {isDockCollapsed ? (
              <>
                <Maximize2 className="w-3 h-3 text-cyan-400" />
                <span>EXPAND 3D CONTROLS</span>
              </>
            ) : (
              <>
                <Minimize2 className="w-3 h-3 text-cyan-400" />
                <span>COLLAPSE DOCK</span>
              </>
            )}
          </button>
        </div>

        {/* Control Dock Panel */}
        {!isDockCollapsed && (
          <div className="p-2.5 rounded-xl bg-slate-950/95 border border-cyan-500/30 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
            {/* View Mode Selector Tabs */}
            <div className="flex items-center gap-1 p-0.5 bg-slate-900/90 rounded-lg border border-slate-800 w-full sm:w-auto">
              <button
                onClick={() => setActiveMode('neural')}
                className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded-md flex items-center justify-center gap-1.5 font-medium transition-all ${
                  activeMode === 'neural'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Neural Core</span>
              </button>
              <button
                onClick={() => setActiveMode('hologram')}
                className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded-md flex items-center justify-center gap-1.5 font-medium transition-all ${
                  activeMode === 'hologram'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Hologram</span>
              </button>
              <button
                onClick={() => setActiveMode('constellation')}
                className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded-md flex items-center justify-center gap-1.5 font-medium transition-all ${
                  activeMode === 'constellation'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Projects</span>
              </button>
            </div>

            {/* Quick Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsWireframe(!isWireframe)}
                className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-mono transition-colors ${
                  isWireframe
                    ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/50'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                Wireframe {isWireframe ? 'ON' : 'OFF'}
              </button>

              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-mono transition-colors ${
                  isRotating
                    ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/50'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                Orbit {isRotating ? 'ON' : 'PAUSED'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-2 right-3 z-10 pointer-events-none hidden lg:block text-[10px] font-mono text-slate-500">
        DRAG / HOVER TO ROTATE
      </div>
    </div>
  );
};

"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Play, Pause, Disc, Sparkles } from "lucide-react";

interface VinylScene3DProps {
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  albumTitle?: string;
  trackName?: string;
}

export function VinylScene3D({
  isPlaying = false,
  onTogglePlay,
  albumTitle = "MASTAWESHA",
  trackName = "Gena Gena",
}: VinylScene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const isPlayingRef = useRef(isPlaying);
  const [internalPlaying, setInternalPlaying] = useState(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    setInternalPlaying(isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    
    // Locked high-angle top-down perspective for optimal mechanical and vinyl visibility
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 1000);
    camera.position.set(0.1, 5.6, 5.0);
    camera.lookAt(-0.1, -0.1, 0.15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Root Group
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // -------------------------------------------------------------
    // 2. PROCEDURAL VINTAGE TEXTURES
    // -------------------------------------------------------------
    // A. Rich Teak / Walnut Acoustic Credenza Wood Texture
    const woodCanvas = document.createElement("canvas");
    woodCanvas.width = 1024;
    woodCanvas.height = 1024;
    const wCtx = woodCanvas.getContext("2d")!;
    
    // Base warm walnut tone
    wCtx.fillStyle = "#1e1611";
    wCtx.fillRect(0, 0, 1024, 1024);
    
    // Subtle wood grain lines
    for (let i = 0; i < 1024; i += 3) {
      const alpha = 0.04 + Math.sin(i * 0.08) * 0.03;
      wCtx.strokeStyle = `rgba(80, 50, 30, ${alpha})`;
      wCtx.lineWidth = 2 + Math.sin(i * 0.15);
      wCtx.beginPath();
      wCtx.moveTo(0, i);
      wCtx.bezierCurveTo(300, i + Math.sin(i * 0.02) * 20, 700, i - Math.cos(i * 0.02) * 25, 1024, i);
      wCtx.stroke();
    }
    
    // Radial warm studio light reflection on wood
    const woodGlow = wCtx.createRadialGradient(512, 512, 50, 512, 512, 600);
    woodGlow.addColorStop(0, "rgba(229, 168, 66, 0.12)");
    woodGlow.addColorStop(1, "rgba(0, 0, 0, 0.6)");
    wCtx.fillStyle = woodGlow;
    wCtx.fillRect(0, 0, 1024, 1024);

    const woodTexture = new THREE.CanvasTexture(woodCanvas);
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.wrapT = THREE.RepeatWrapping;

    // B. Vintage Mastawesha Album Sleeve Cover Texture
    const sleeveCanvas = document.createElement("canvas");
    sleeveCanvas.width = 1024;
    sleeveCanvas.height = 1024;
    const sCtx = sleeveCanvas.getContext("2d")!;

    // Vintage matte black & deep gold border
    sCtx.fillStyle = "#0c0b0a";
    sCtx.fillRect(0, 0, 1024, 1024);

    // Warm inner gradient
    const sGrad = sCtx.createRadialGradient(512, 450, 100, 512, 512, 650);
    sGrad.addColorStop(0, "#2a1a0e");
    sGrad.addColorStop(0.7, "#14100c");
    sGrad.addColorStop(1, "#070605");
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(20, 20, 984, 984);

    // Gold foil double border
    sCtx.strokeStyle = "#E5A842";
    sCtx.lineWidth = 6;
    sCtx.strokeRect(40, 40, 944, 944);
    sCtx.lineWidth = 1.5;
    sCtx.strokeStyle = "rgba(243, 211, 137, 0.6)";
    sCtx.strokeRect(55, 55, 914, 914);

    // Studio Master Heading
    sCtx.fillStyle = "#FAF5EE";
    sCtx.font = "bold 44px sans-serif";
    sCtx.letterSpacing = "8px";
    sCtx.textAlign = "center";
    sCtx.fillText("STUDIO RECORDING", 512, 280);

    // English Album Title
    sCtx.fillStyle = "#E5A842";
    sCtx.font = "bold 64px sans-serif";
    sCtx.letterSpacing = "10px";
    sCtx.fillText("MASTAWESHA", 512, 360);

    // Decorative Ethiopian cross emblem motif
    sCtx.fillStyle = "rgba(229, 168, 66, 0.25)";
    sCtx.beginPath();
    sCtx.arc(512, 550, 130, 0, Math.PI * 2);
    sCtx.fill();
    sCtx.strokeStyle = "#E5A842";
    sCtx.lineWidth = 2;
    sCtx.stroke();

    // Artist name
    sCtx.fillStyle = "#FFFFFF";
    sCtx.font = "bold 44px serif";
    sCtx.fillText("ADDISU LEGESSE", 512, 780);

    // Subtitle
    sCtx.fillStyle = "rgba(250, 245, 238, 0.7)";
    sCtx.font = "24px monospace";
    sCtx.fillText("14 ORIGINAL COMPOSITIONS • 2025", 512, 840);

    const sleeveTexture = new THREE.CanvasTexture(sleeveCanvas);

    // -------------------------------------------------------------
    // 3. MATERIALS
    // -------------------------------------------------------------
    // Luxury dark walnut plinth
    const plinthMaterial = new THREE.MeshStandardMaterial({
      color: 0x221812,
      roughness: 0.35,
      metalness: 0.15,
    });

    // Brushed anodized dark titanium deck faceplate
    const topPlateMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f0f12,
      roughness: 0.25,
      metalness: 0.88,
    });

    // Polished aluminum / chrome
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0f0f4,
      roughness: 0.1,
      metalness: 0.96,
    });

    // Warm champagne gold hardware accents
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xdeb841,
      roughness: 0.2,
      metalness: 0.92,
    });

    // Tabletop Credenza Material
    const tabletopMaterial = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.45,
      metalness: 0.1,
    });

    // Album Sleeve Material
    const sleeveMaterial = new THREE.MeshStandardMaterial({
      map: sleeveTexture,
      roughness: 0.4,
      metalness: 0.2,
    });

    // -------------------------------------------------------------
    // 4. VINTAGE ACOUSTIC BACKGROUND & TABLETOP
    // -------------------------------------------------------------
    // Solid Wood Credenza Tabletop (Sits right beneath feet at Y = -0.48)
    const tableGeo = new THREE.PlaneGeometry(16, 16);
    const tabletop = new THREE.Mesh(tableGeo, tabletopMaterial);
    tabletop.rotation.x = -Math.PI / 2;
    tabletop.position.y = -0.48;
    tabletop.receiveShadow = true;
    sceneGroup.add(tabletop);

    // Standing Mastawesha Album Sleeve leaning in background
    const sleeveGeo = new THREE.BoxGeometry(1.85, 1.85, 0.05);
    const sleeveMesh = new THREE.Mesh(sleeveGeo, sleeveMaterial);
    sleeveMesh.position.set(-1.15, 0.58, -1.55);
    sleeveMesh.rotation.y = 0.22; // angled slightly towards viewer
    sleeveMesh.rotation.x = -0.12; // tilted back naturally
    sleeveMesh.castShadow = true;
    sleeveMesh.receiveShadow = true;
    sceneGroup.add(sleeveMesh);

    // 45-RPM Solid Brass Adapter Puck sitting on deck
    const puckGeo = new THREE.CylinderGeometry(0.2, 0.24, 0.1, 24);
    const brassPuck = new THREE.Mesh(puckGeo, goldMaterial);
    brassPuck.position.set(-1.6, 0.06, -1.15);
    brassPuck.castShadow = true;
    sceneGroup.add(brassPuck);

    // -------------------------------------------------------------
    // 5. TURNTABLE BASE / CHASSIS
    // -------------------------------------------------------------
    const playerDeckGroup = new THREE.Group();
    playerDeckGroup.position.set(0, -0.15, 0);
    sceneGroup.add(playerDeckGroup);

    // Wood Plinth Chassis
    const plinthGeo = new THREE.BoxGeometry(4.2, 0.32, 3.4);
    const plinth = new THREE.Mesh(plinthGeo, plinthMaterial);
    plinth.position.y = 0.0;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    playerDeckGroup.add(plinth);

    // Top Brushed Metal Plate
    const topPlateGeo = new THREE.BoxGeometry(4.04, 0.03, 3.24);
    const topPlate = new THREE.Mesh(topPlateGeo, topPlateMaterial);
    topPlate.position.y = 0.175;
    topPlate.receiveShadow = true;
    playerDeckGroup.add(topPlate);

    // Gold Beveled Trim Accent
    const trimGeo = new THREE.BoxGeometry(4.08, 0.015, 3.28);
    const trim = new THREE.Mesh(trimGeo, goldMaterial);
    trim.position.y = 0.165;
    playerDeckGroup.add(trim);

    // 4 Machined Corner Isolation Feet (Touch table at Y = -0.48)
    const footGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.2, 20);
    const footPositions = [
      [-1.8, -0.22, -1.4],
      [1.8, -0.22, -1.4],
      [-1.8, -0.22, 1.4],
      [1.8, -0.22, 1.4],
    ];
    footPositions.forEach(([x, y, z]) => {
      const foot = new THREE.Mesh(footGeo, chromeMaterial);
      foot.position.set(x, y, z);
      foot.castShadow = true;
      playerDeckGroup.add(foot);
    });

    // Glowing Pilot LED (Green/Amber)
    const ledGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.04, 16);
    const ledMaterial = new THREE.MeshStandardMaterial({
      color: 0xffaa33,
      emissive: 0xff8800,
      emissiveIntensity: 0.9,
      roughness: 0.2,
    });
    const led = new THREE.Mesh(ledGeo, ledMaterial);
    led.position.set(-1.75, 0.2, 1.35);
    playerDeckGroup.add(led);

    // 33 / 45 RPM Speed Buttons
    const btnGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 20);
    const btn33 = new THREE.Mesh(btnGeo, chromeMaterial);
    btn33.position.set(-1.42, 0.2, 1.35);
    playerDeckGroup.add(btn33);

    const btn45 = new THREE.Mesh(btnGeo, chromeMaterial);
    btn45.position.set(-1.2, 0.2, 1.35);
    playerDeckGroup.add(btn45);

    // Pitch control slider plate (Right side)
    const pitchPlateGeo = new THREE.BoxGeometry(0.2, 0.02, 0.85);
    const pitchPlate = new THREE.Mesh(pitchPlateGeo, plinthMaterial);
    pitchPlate.position.set(1.72, 0.19, 0.2);
    playerDeckGroup.add(pitchPlate);

    const pitchKnobGeo = new THREE.BoxGeometry(0.1, 0.05, 0.05);
    const pitchKnob = new THREE.Mesh(pitchKnobGeo, chromeMaterial);
    pitchKnob.position.set(1.72, 0.22, 0.2);
    playerDeckGroup.add(pitchKnob);

    // -------------------------------------------------------------
    // 6. PLATTER & SPINNING VINYL RECORD
    // -------------------------------------------------------------
    const platterX = -0.48;
    const platterZ = 0.04;

    // Platter
    const platterGeo = new THREE.CylinderGeometry(1.42, 1.42, 0.1, 64);
    const platter = new THREE.Mesh(platterGeo, chromeMaterial);
    platter.position.set(platterX, 0.23, platterZ);
    platter.castShadow = true;
    platter.receiveShadow = true;
    playerDeckGroup.add(platter);

    // Rubber Slipmat
    const slipmatGeo = new THREE.CylinderGeometry(1.36, 1.36, 0.015, 64);
    const slipmatMaterial = new THREE.MeshStandardMaterial({
      color: 0x141416,
      roughness: 0.85,
    });
    const slipmat = new THREE.Mesh(slipmatGeo, slipmatMaterial);
    slipmat.position.set(platterX, 0.285, platterZ);
    playerDeckGroup.add(slipmat);

    // Center Spindle Pin
    const spindleGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.25, 16);
    const spindle = new THREE.Mesh(spindleGeo, chromeMaterial);
    spindle.position.set(platterX, 0.38, platterZ);
    playerDeckGroup.add(spindle);

    // Procedural Vinyl Disc Texture
    const discCanvas = document.createElement("canvas");
    discCanvas.width = 1024;
    discCanvas.height = 1024;
    const dCtx = discCanvas.getContext("2d")!;

    // Black vinyl substrate
    dCtx.fillStyle = "#09090b";
    dCtx.fillRect(0, 0, 1024, 1024);

    // Micro-grooves
    dCtx.lineWidth = 1.2;
    for (let r = 195; r < 480; r += 2.6) {
      const alpha = 0.06 + Math.sin(r * 0.45) * 0.04;
      dCtx.strokeStyle = `rgba(245, 230, 200, ${alpha})`;
      dCtx.beginPath();
      dCtx.arc(512, 512, r, 0, Math.PI * 2);
      dCtx.stroke();
    }

    // Run-out groove
    dCtx.lineWidth = 3;
    dCtx.strokeStyle = "rgba(45, 40, 36, 0.9)";
    dCtx.beginPath();
    dCtx.arc(512, 512, 188, 0, Math.PI * 2);
    dCtx.stroke();

    // Center Label: Warm Amber with Amharic Ge'ez Typography
    dCtx.fillStyle = "#8c3a0d";
    dCtx.beginPath();
    dCtx.arc(512, 512, 172, 0, Math.PI * 2);
    dCtx.fill();

    // Gold inner foil ring
    dCtx.lineWidth = 4;
    dCtx.strokeStyle = "#E5A842";
    dCtx.beginPath();
    dCtx.arc(512, 512, 164, 0, Math.PI * 2);
    dCtx.stroke();

    dCtx.textAlign = "center";
    dCtx.textBaseline = "middle";

    dCtx.fillStyle = "#FAF5EE";
    dCtx.font = "bold 24px sans-serif";
    dCtx.fillText("OFFICIAL MASTER", 512, 425);

    dCtx.fillStyle = "#F3D389";
    dCtx.font = "bold 28px sans-serif";
    dCtx.fillText(albumTitle, 512, 465);

    dCtx.fillStyle = "#FAF5EE";
    dCtx.font = "500 20px serif";
    dCtx.fillText("ADDISU LEGESSE", 512, 565);

    dCtx.fillStyle = "rgba(250, 245, 238, 0.75)";
    dCtx.font = "14px monospace";
    dCtx.fillText("33 ⅓ RPM • ETHIO-SOUL • 2025", 512, 605);

    // Spindle Hole
    dCtx.fillStyle = "#000000";
    dCtx.beginPath();
    dCtx.arc(512, 512, 22, 0, Math.PI * 2);
    dCtx.fill();

    const discTexture = new THREE.CanvasTexture(discCanvas);

    // Vinyl Disc Mesh
    const discGeo = new THREE.CylinderGeometry(1.34, 1.34, 0.02, 64);
    const discMaterial = new THREE.MeshStandardMaterial({
      map: discTexture,
      roughness: 0.28,
      metalness: 0.85,
    });
    const edgeDiscMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.5,
      metalness: 0.8,
    });

    const discMesh = new THREE.Mesh(discGeo, [
      edgeDiscMaterial,
      discMaterial,
      discMaterial,
    ]);
    discMesh.position.set(platterX, 0.305, platterZ);
    discMesh.castShadow = true;
    discMesh.receiveShadow = true;
    playerDeckGroup.add(discMesh);

    // -------------------------------------------------------------
    // 7. MECHANICAL TONEARM & NEEDLE POINTER
    // -------------------------------------------------------------
    const armPivotX = 1.35;
    const armPivotZ = -0.7;
    const armBaseY = 0.18;

    // Gimbal Tower Pillar
    const towerGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.28, 24);
    const tower = new THREE.Mesh(towerGeo, chromeMaterial);
    tower.position.set(armPivotX, armBaseY + 0.14, armPivotZ);
    tower.castShadow = true;
    playerDeckGroup.add(tower);

    // Anti-skate dial
    const dialGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.08, 16);
    const dial = new THREE.Mesh(dialGeo, goldMaterial);
    dial.position.set(armPivotX + 0.16, armBaseY + 0.2, armPivotZ);
    playerDeckGroup.add(dial);

    // Tonearm Rest Cradle (Where arm parks safely when idle)
    const cradleBaseGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.24, 16);
    const cradleBase = new THREE.Mesh(cradleBaseGeo, chromeMaterial);
    cradleBase.position.set(armPivotX + 0.02, armBaseY + 0.12, 0.3);
    playerDeckGroup.add(cradleBase);

    const cradleClipGeo = new THREE.BoxGeometry(0.12, 0.04, 0.08);
    const cradleClip = new THREE.Mesh(cradleClipGeo, plinthMaterial);
    cradleClip.position.set(armPivotX + 0.02, armBaseY + 0.24, 0.3);
    playerDeckGroup.add(cradleClip);

    // Cueing Lever
    const leverGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.18, 12);
    const cueLever = new THREE.Mesh(leverGeo, goldMaterial);
    cueLever.position.set(armPivotX - 0.15, armBaseY + 0.2, armPivotZ + 0.12);
    cueLever.rotation.x = -0.3;
    playerDeckGroup.add(cueLever);

    // --- SWIVEL GROUP: Controls horizontal swing around pivot ---
    const armSwivelGroup = new THREE.Group();
    armSwivelGroup.position.set(armPivotX, armBaseY + 0.26, armPivotZ);
    playerDeckGroup.add(armSwivelGroup);

    // Gimbal Horizontal Ring
    const collarGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.14, 20);
    const collar = new THREE.Mesh(collarGeo, goldMaterial);
    collar.rotation.x = Math.PI / 2;
    armSwivelGroup.add(collar);

    // --- TILT GROUP: Controls vertical needle lift / drop ---
    const armTiltGroup = new THREE.Group();
    armSwivelGroup.add(armTiltGroup);

    // Rear Chrome Counterweight
    const weightGeo = new THREE.CylinderGeometry(0.17, 0.17, 0.22, 24);
    const counterweight = new THREE.Mesh(weightGeo, chromeMaterial);
    counterweight.rotation.x = Math.PI / 2;
    counterweight.position.set(0, 0, -0.4);
    armTiltGroup.add(counterweight);

    // Stub shaft
    const stubGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.45, 16);
    const stub = new THREE.Mesh(stubGeo, chromeMaterial);
    stub.rotation.x = Math.PI / 2;
    stub.position.set(0, 0, -0.18);
    armTiltGroup.add(stub);

    // Main Curved S-Tube Tonearm Wand
    const armTubeLength = 1.9;
    const armCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.06, 0.02, 0.45),
      new THREE.Vector3(0.08, 0.01, 1.05),
      new THREE.Vector3(-0.16, -0.02, armTubeLength),
    ]);
    const armTubeGeo = new THREE.TubeGeometry(armCurve, 32, 0.032, 12, false);
    const armTube = new THREE.Mesh(armTubeGeo, chromeMaterial);
    armTube.castShadow = true;
    armTiltGroup.add(armTube);

    // Headshell (Angled cartridge mount)
    const headshellGroup = new THREE.Group();
    headshellGroup.position.set(-0.16, -0.02, armTubeLength);
    headshellGroup.rotation.y = 0.15; // aligns tangent to the groove
    armTiltGroup.add(headshellGroup);

    const headshellGeo = new THREE.BoxGeometry(0.12, 0.04, 0.3);
    const headshell = new THREE.Mesh(headshellGeo, plinthMaterial);
    headshell.position.set(0, 0, 0.15);
    headshellGroup.add(headshell);

    // Finger lift tab
    const tabGeo = new THREE.BoxGeometry(0.02, 0.015, 0.09);
    const fingerTab = new THREE.Mesh(tabGeo, goldMaterial);
    fingerTab.position.set(0.07, 0.02, 0.17);
    fingerTab.rotation.y = 0.4;
    headshellGroup.add(fingerTab);

    // Cartridge Body (Luxury Gold)
    const cartridgeGeo = new THREE.BoxGeometry(0.09, 0.08, 0.17);
    const cartridge = new THREE.Mesh(cartridgeGeo, goldMaterial);
    cartridge.position.set(0, -0.05, 0.14);
    headshellGroup.add(cartridge);

    // STYLUS / NEEDLE POINTER (Points downward directly into the record groove)
    const stylusGeo = new THREE.ConeGeometry(0.016, 0.07, 12);
    const stylus = new THREE.Mesh(stylusGeo, chromeMaterial);
    stylus.position.set(0, -0.11, 0.16);
    stylus.rotation.x = Math.PI; // points down
    headshellGroup.add(stylus);

    // -------------------------------------------------------------
    // 8. WARM VINTAGE LIGHTING
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.8);
    scene.add(ambientLight);

    // Warm Key Tungsten Studio Lamp
    const keyLight = new THREE.DirectionalLight(0xffd59e, 3.2);
    keyLight.position.set(3.5, 6.0, 4.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Soft Rim Light from behind
    const rimLight = new THREE.DirectionalLight(0xbad2ff, 1.4);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // Warm table accent glow
    const tableLight = new THREE.PointLight(0xff9922, 1.8, 8);
    tableLight.position.set(-1.2, 1.5, -1.2);
    scene.add(tableLight);

    // -------------------------------------------------------------
    // 9. CORRECTED MECHANICAL KINEMATICS & MOTION (LOCKED POSITION)
    // -------------------------------------------------------------
    // The player position is locked in the optimal audiophile high-angle view.
    // Swivel Kinematics:
    // When IDLE: swivelAngle = 0.03 (parked neatly in the cradle clip).
    // When PLAYING: swivelAngle swings LEFT (-0.46 rad) onto record grooves.
    // As it plays, it tracks slightly further inward from -0.46 to -0.55 rad.

    let currentSwivel = 0.03;
    let targetSwivel = 0.03;
    let currentTilt = 0.0;
    let targetTilt = 0.0;
    let discRotationSpeed = 0;
    let targetDiscSpeed = 0;

    // -------------------------------------------------------------
    // 10. ANIMATION LOOP
    // -------------------------------------------------------------
    let animationId: number;
    let needleTrackProgress = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const playing = isPlayingRef.current;

      // Pilot LED pulse
      if (playing) {
        ledMaterial.emissiveIntensity = 1.3 + Math.sin(Date.now() * 0.006) * 0.25;
      } else {
        ledMaterial.emissiveIntensity = 0.3;
      }

      if (playing) {
        // PLAYING: Arm swings LEFT (NEGATIVE swivel) onto record grooves
        needleTrackProgress = (needleTrackProgress + 0.00012) % 0.1;
        targetSwivel = -0.46 - needleTrackProgress; // Corrected: NEGATIVE moves left towards the disc!
        
        // Once arm has swung over the record groove, drop the needle
        if (Math.abs(currentSwivel - targetSwivel) < 0.12) {
          targetTilt = -0.065; // needle lowered on vinyl surface
        } else {
          targetTilt = 0.07; // lifted up while swinging
        }

        targetDiscSpeed = 0.045; // 33 1/3 RPM spin
        cueLever.rotation.x = 0.2;
      } else {
        // STOPPED: First lift the needle up, then swing back to rest cradle
        needleTrackProgress = 0;
        targetTilt = 0.07; // lift needle up
        
        // Swing arm back to the right toward cradle once needle is lifted
        if (currentTilt > 0.01) {
          targetSwivel = 0.03; // parked in cradle
        }
        
        // Lower to rest cradle once over it
        if (Math.abs(currentSwivel - 0.03) < 0.04) {
          targetTilt = 0.0;
        }

        targetDiscSpeed = 0.0; // gradual stop
        cueLever.rotation.x = -0.3;
      }

      // Smooth mechanical damping / interpolation
      currentSwivel += (targetSwivel - currentSwivel) * 0.045;
      currentTilt += (targetTilt - currentTilt) * 0.055;
      discRotationSpeed += (targetDiscSpeed - discRotationSpeed) * 0.035;

      armSwivelGroup.rotation.y = currentSwivel;
      armTiltGroup.rotation.x = currentTilt;

      // Spin the vinyl & platter
      discMesh.rotation.y += discRotationSpeed;
      platter.rotation.y += discRotationSpeed;

      // Render scene with locked optimal high-angle view
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [albumTitle]);

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* 3D Canvas Mount - Locked Position */}
      <div
        ref={mountRef}
        onClick={onTogglePlay}
        className="w-full aspect-[4/3] max-w-[440px] sm:max-w-[480px] mx-auto cursor-pointer relative rounded-2xl overflow-hidden hover:opacity-95 transition-opacity"
        title={internalPlaying ? "Click turntable to stop needle" : "Click turntable to drop needle & play"}
      />

      {/* Turntable Status Bar */}
      <div className="w-full max-w-sm mt-2 px-4 py-2.5 rounded-2xl bg-[#141210]/90 border border-white/[0.08] backdrop-blur-md flex items-center justify-between text-xs shadow-lg">
        <div className="flex items-center gap-2.5">
          <span
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              internalPlaying ? "bg-[#E5A842] shadow-[0_0_8px_#E5A842] animate-pulse" : "bg-neutral-600"
            }`}
          />
          <div className="flex flex-col text-left">
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
              {internalPlaying ? "Needle On Disc • Playing" : "Tonearm Parked • Idle"}
            </span>
            <span className="font-medium text-white truncate max-w-[160px]">
              {trackName}
            </span>
          </div>
        </div>

        {/* Quick Trigger Button */}
        <button
          onClick={onTogglePlay}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-transform active:scale-95 shadow-sm"
        >
          {internalPlaying ? (
            <>
              <Pause className="h-3 w-3 fill-black" />
              <span>Stop</span>
            </>
          ) : (
            <>
              <Play className="h-3 w-3 fill-black ml-0.5" />
              <span>Start</span>
            </>
          )}
        </button>
      </div>

      <span className="text-[10px] font-mono text-neutral-400 mt-2 tracking-wider flex items-center gap-1.5">
        <Sparkles className="h-3 w-3 text-[#E5A842]" />
        <span>Click turntable to cue mechanical tonearm • 33 ⅓ RPM Direct Drive</span>
      </span>
    </div>
  );
}

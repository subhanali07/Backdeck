import Cursor from "./things/cursor";
import { TrailingCursor } from "./things/cursor";
import { Scene2 } from "./things/cursor";
'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface InteractiveSphereProps {
  /** Canvas height/width styling or classes */
  className?: string;
}

export function InteractiveSphere({ className = 'w-full h-[500px]' }: InteractiveSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    // Lighting
    const keyLight = new THREE.DirectionalLight(0x91cdcf, 2.2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    scene.add(new THREE.AmbientLight(0x11221f, 1.2));

    // Glass Icosahedron Geometry & Material
    const geo = new THREE.IcosahedronGeometry(1.9, 4);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x0c1a1a,
      metalness: 0.15,
      roughness: 0.15,
      transmission: 0.85,
      thickness: 1.4,
      ior: 1.3,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Track mouse position on hover over container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 0.8,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 0.8,
      };
    };

    const handleMouseLeave = () => {
      // Smoothly return to center when mouse leaves
      mouseRef.current = { x: 0, y: 0 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    let animationId: number;
    let targetX = 0;
    let targetY = 0;

    const animate = () => {
      const t = Date.now() * 0.0002;

      // Smoothly lerp mouse target
      targetX += (mouseRef.current.x - targetX) * 0.05;
      targetY += (mouseRef.current.y - targetY) * 0.05;

      // Continuous rotation combined with mouse hover offset
      mesh.rotation.y = t + targetX * 2;
      mesh.rotation.x = t * 0.6 + targetY * 2;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center bg-[#050505] ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />
    </div>
  );
}
export default function Home(){
  
 
  return (
    <>
     <Scene2/>
     <TrailingCursor/>

     <Cursor/>
     <div className="h-full w-full border-t-2"></div>
     </>
  )
}
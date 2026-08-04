'use client'
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function BlurryCursor() {
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });
  const circle = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const size = 30;

  const larp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const moveCircle = (x: number, y: number) => {
    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.current = { x: clientX, y: clientY };
  };

  const animate = () => {
    const { x, y } = delayedMouse.current;
    delayedMouse.current = {
      x: larp(x, mouse.current.x, 0.15),
      y: larp(y, mouse.current.y, 0.15),
    };
    moveCircle(delayedMouse.current.x, delayedMouse.current.y);
    rafId.current = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    rafId.current = window.requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className='relative h-screen bg-black'>
      <div
        ref={circle}
        style={{
          backgroundColor: "#BCE4F2",
          width: size,
          height: size,
        }}
        className='top-0 left-0 fixed rounded-full pointer-events-none'
      />
    </div>
  );
}
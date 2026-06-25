import { useEffect, useRef } from 'react';

const NODE_COUNT = 70;
const MAX_DIST = 150;
const MOUSE_RADIUS = 120;

function rand(min, max) { return Math.random() * (max - min) + min; }

export default function NeuralBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const nodes = useRef([]);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    nodes.current = Array.from({ length: NODE_COUNT }, () => ({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      vx: rand(-0.3, 0.3),
      vy: rand(-0.3, 0.3),
      r: rand(1.5, 3),
    }));

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ns = nodes.current;

      for (let i = 0; i < ns.length; i++) {
        const n = ns[i];
        const dx = mouse.current.x - n.x;
        const dy = mouse.current.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.015;
          n.vx -= dx * force;
          n.vy -= dy * force;
        }
        n.vx *= 0.99;
        n.vy *= 0.99;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        for (let j = i + 1; j < ns.length; j++) {
          const m = ns[j];
          const ex = n.x - m.x;
          const ey = n.y - m.y;
          const d = Math.sqrt(ex * ex + ey * ey);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.35;
            const isNearMouse = dist < MOUSE_RADIUS;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = isNearMouse
              ? `rgba(0, 212, 255, ${alpha})`
              : `rgba(124, 58, 237, ${alpha * 0.6})`;
            ctx.lineWidth = isNearMouse ? 1 : 0.5;
            ctx.stroke();
          }
        }
      }

      for (const n of ns) {
        const dx = mouse.current.x - n.x;
        const dy = mouse.current.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isNear = dist < MOUSE_RADIUS;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (isNear ? 1.6 : 1), 0, Math.PI * 2);
        ctx.fillStyle = isNear ? 'rgba(0, 212, 255, 0.9)' : 'rgba(124, 58, 237, 0.5)';
        ctx.fill();
        if (isNear) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00d4ff';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      raf.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.6,
      }}
    />
  );
}

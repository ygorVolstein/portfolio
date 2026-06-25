import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const rafRef  = useRef(null);
  const hovering = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => { hovering.current = true;  };
    const onLeave = () => { hovering.current = false; };

    const targets = 'a, button, [data-magnetic]';

    const addListeners = () => {
      document.querySelectorAll(targets).forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    // Re-scan on DOM changes (SPA navigation)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    addListeners();

    window.addEventListener('mousemove', onMove);

    const loop = () => {
      const { x, y } = pos.current;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      }

      // Ring follows with lerp
      ring.current.x += (x - ring.current.x) * 0.12;
      ring.current.y += (y - ring.current.y) * 0.12;

      if (ringRef.current) {
        const scale = hovering.current ? 2.2 : 1;
        const opacity = hovering.current ? 0.6 : 0.35;
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px) scale(${scale})`;
        ringRef.current.style.opacity = opacity;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

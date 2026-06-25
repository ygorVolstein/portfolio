import { useEffect, useRef } from 'react';

export default function Grain() {
  const turbRef = useRef(null);

  useEffect(() => {
    let frame;
    let count = 0;
    const tick = () => {
      count++;
      if (count % 4 === 0 && turbRef.current) {
        turbRef.current.setAttribute('seed', Math.floor(Math.random() * 500));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9998,
        opacity: 0.038,
        mixBlendMode: 'overlay',
      }}
    >
      <filter id="grain">
        <feTurbulence
          ref={turbRef}
          type="fractalNoise"
          baseFrequency="0.72"
          numOctaves="4"
          seed="0"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

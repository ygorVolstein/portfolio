import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Magnetic({ children, strength = 0.38 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  };

  const onMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={pos}
      transition={{ type: 'spring', stiffness: 180, damping: 18, mass: 0.6 }}
      style={{ display: 'inline-flex' }}
    >
      {children}
    </motion.div>
  );
}

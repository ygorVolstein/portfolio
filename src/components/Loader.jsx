import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

const FIRST  = 'YGOR';
const SECOND = 'VOLSTEIN';

export default function Loader({ onDone }) {
  const [phase, setPhase] = useState('in'); // in | hold | out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 2400);
    const t2 = setTimeout(() => setPhase('out'),  3200);
    const t3 = setTimeout(() => onDone(),          4000);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onDone]);

  const letterVariants = {
    hidden: { y: '110%', opacity: 0 },
    show:   (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.3 + i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const secondVariants = {
    hidden: { y: '110%', opacity: 0 },
    show:   (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.72 + i * 0.055, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <AnimatePresence>
      {phase !== 'out' && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        >
          <div className="loader-content">
            <div className="loader-line">
              {FIRST.split('').map((ch, i) => (
                <div className="loader-clip" key={i}>
                  <motion.span
                    className="loader-letter first"
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {ch}
                  </motion.span>
                </div>
              ))}
            </div>

            <div className="loader-line">
              {SECOND.split('').map((ch, i) => (
                <div className="loader-clip" key={i}>
                  <motion.span
                    className="loader-letter second"
                    custom={i}
                    variants={secondVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {ch}
                  </motion.span>
                </div>
              ))}
            </div>

            <motion.div
              className="loader-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.p
              className="loader-sub"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              Desenvolvedor Full-Stack
            </motion.p>
          </div>

          <motion.div
            className="loader-corner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.4 }}
          >
            Brusque, SC — BR
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

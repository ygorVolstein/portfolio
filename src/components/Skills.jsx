import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { skills } from '../data';
import './Skills.css';

export default function Skills() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <motion.div ref={ref} className="section-header" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <span className="section-label mono">{t('skills.label')}</span>
          <h2 className="section-title">{t('skills.title_1')}<br />{t('skills.title_2')}</h2>
        </motion.div>

        <div className="skills-cloud">
          {skills.map((item, i) => (
            <motion.span
              key={item}
              className="skill-pill"
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.08 + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {item}
            </motion.span>
          ))}
        </div>

        <motion.div className="skills-note" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}>
          <span className="mono">{t('skills.always_learning')}</span>
          <span className="note-cursor" />
        </motion.div>
      </div>
    </section>
  );
}

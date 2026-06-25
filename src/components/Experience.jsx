import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { experiences, education } from '../data';
import './Experience.css';

export default function Experience() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="exp-section" id="experience">
      <div className="container">
        <motion.div
          ref={ref}
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label mono">{t('experience.label')}</span>
          <h2 className="section-title">
            {t('experience.title_1')}<br />{t('experience.title_2')}
          </h2>
        </motion.div>

        <div className="exp-grid">
          <div className="exp-col">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.slug}
                className={`exp-card${exp.current ? ' exp-current' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              >
                <div className="exp-card-top">
                  <div>
                    <span className="exp-role">{t(`experience.${exp.slug}_role`)}</span>
                    {exp.companyUrl ? (
                      <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="exp-company">
                        {exp.company} ↗
                      </a>
                    ) : (
                      <span className="exp-company">{exp.company}</span>
                    )}
                  </div>
                  <span className="exp-period mono">{exp.period}</span>
                </div>
                <p className="exp-desc">{t(`experience.${exp.slug}_desc`)}</p>
                <div className="exp-tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="exp-tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="edu-col"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <h3 className="edu-heading mono">formação</h3>
            {education.map((edu) => (
              <div key={edu.nameKey} className="edu-card">
                <span className="edu-name">{t(`experience.${edu.nameKey}`)}</span>
                <span className="edu-degree">{t(`experience.${edu.degreeKey}`)}</span>
                <span className="edu-period mono">{edu.period}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { projects } from '../data';
import './Projects.css';

function ProjectCard({ project, index }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      className="project-card"
      style={{ '--accent': project.color }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="card-top">
        <div className="card-number mono">0{project.id}</div>
        <span className={`card-status ${project.status === 'dev' ? 'status-active' : 'status-done'}`}>
          {project.status === 'dev' ? t('projects.status_dev') : t('projects.status_academic')}
        </span>
      </div>

      <h3 className="card-title">{project.title}</h3>
      <p className="card-tagline">{t(`projects.${project.slug}.tagline`)}</p>
      <p className="card-desc">{t(`projects.${project.slug}.description`)}</p>

      {project.gallery && (
        <div className="card-gallery" role="list">
          {project.gallery.shots.map((n) => (
            <div className="card-shot" role="listitem" key={n}>
              <img
                src={`${import.meta.env.BASE_URL}${project.gallery.base}${n}.jpg`}
                alt={`${project.title} — tela ${n}`}
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      )}

      <div className="card-tech">
        {project.tech.map((tech) => <span key={`tech-${tech}`} className="tech-tag">{tech}</span>)}
      </div>

      <div className="card-accent-bar" />
    </motion.article>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <motion.div ref={ref} className="section-header" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <span className="section-label mono">{t('projects.label')}</span>
          <h2 className="section-title">{t('projects.title_1')}<br />{t('projects.title_2')}</h2>
        </motion.div>
        <div className="projects-grid">
          {projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
        </div>
      </div>
    </section>
  );
}

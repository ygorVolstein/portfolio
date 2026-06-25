import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { notes } from '../data';
import './Notes.css';

export default function Notes() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="notes-section" id="notes">
      <div className="container">
        <motion.div
          ref={ref}
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label mono">{t('notes.label')}</span>
          <h2 className="section-title">
            {t('notes.title_1')}<br />{t('notes.title_2')}
          </h2>
        </motion.div>

        <div className="notes-grid">
          {notes.map((note, i) => {
            const Tag = note.url ? 'a' : 'article';
            const linkProps = note.url
              ? { href: note.url, target: '_blank', rel: 'noopener noreferrer' }
              : {};
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tag className={`note-card${note.url ? ' note-card-link' : ''}`} {...linkProps}>
                  <div className="note-top">
                    <span className="note-tag mono">{note.tag}</span>
                    <span className="note-date mono">{note.date}</span>
                  </div>
                  <h3 className="note-title">{note.title}</h3>
                  <p className="note-excerpt">{note.excerpt}</p>
                  <span className="note-cta mono">
                    {note.url ? `${t('notes.read')} ↗` : t('notes.soon')}
                  </span>
                </Tag>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

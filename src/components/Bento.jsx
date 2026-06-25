import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { links } from '../data';
import './Bento.css';

const card = (delay) => ({
  initial: { opacity: 0, y: 20, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: '-40px' },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
});

export default function Bento() {
  const { t } = useTranslation();

  return (
    <section className="bento-section" id="about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label mono">{t('about.label')}</span>
          <h2 className="section-title">
            {t('about.title_1')}<br />{t('about.title_2')}
          </h2>
        </motion.div>

        <div className="bento-grid">

          {/* Card — Story */}
          <motion.div className="bento-card card-story" {...card(0.05)}>
            <span className="story-label mono">{t('about.story_label')}</span>
            <p className="story-text">{t('about.p1')}</p>
          </motion.div>

          {/* Card — Location */}
          <motion.div className="bento-card card-location" {...card(0.1)}>
            <div className="location-pin">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <p className="location-city">Brusque</p>
            <p className="location-country mono">Santa Catarina — BR</p>
          </motion.div>

          {/* Card 3 — Anos */}
          <motion.div className="bento-card card-years" {...card(0.15)}>
            <span className="years-num">4<span className="years-plus">+</span></span>
            <span className="years-label">{t('about.stat_years')}</span>
          </motion.div>

          {/* Card — Pessoal */}
          <motion.div className="bento-card card-personal" {...card(0.18)}>
            <p className="personal-title mono">{t('about.off_duty')}</p>
            <div className="personal-items">
              <div className="personal-item">
                <span className="personal-emoji">⚽</span>
                <span>{t('about.hobby_football')}</span>
              </div>
              <div className="personal-item">
                <span className="personal-emoji">👨‍👩‍👧‍👦</span>
                <span>{t('about.hobby_family')}</span>
              </div>
            </div>
          </motion.div>

          {/* Card — LinkedIn */}
          <motion.div className="bento-card card-github" {...card(0.22)}>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link-inner"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <div>
                <span className="github-handle">LinkedIn</span>
                <span className="github-sub mono">{t('about.linkedin_sub')}</span>
              </div>
              <svg className="github-arrow" width="16" height="16" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

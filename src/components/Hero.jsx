import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { links } from '../data';
import Magnetic from './Magnetic';
import './Hero.css';

const reveal = (delay = 0) => ({
  initial: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
  animate: { clipPath: 'inset(0% 0 0 0)',   opacity: 1 },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
});

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0  },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
});

const avatarUrl = `${import.meta.env.BASE_URL}avatar.jpg`;

export default function Hero() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const avatarY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY   = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="hero-glow" />
      <div className="container hero-inner">

        <motion.div className="hero-text" style={{ y: textY }}>
          <div className="hero-eyebrow-wrap">
            <motion.div className="hero-eyebrow" {...fade(0.1)}>
              <span className="eyebrow-dot" />
              <span className="mono">Brusque, SC</span>
            </motion.div>
          </div>

          <h1 className="hero-name">
            <div className="name-row">
              <motion.span {...reveal(0.15)}>Ygor</motion.span>
            </div>
            <div className="name-row">
              <motion.span className="name-last" {...reveal(0.28)}>Volstein</motion.span>
            </div>
          </h1>

          <motion.p className="hero-role" {...fade(0.5)}>
            {t('hero.role')}
          </motion.p>

          <motion.p className="hero-bio" {...fade(0.65)}>
            {t('hero.bio')}
          </motion.p>

          <motion.div className="hero-actions" {...fade(0.8)}>
            <Magnetic>
              <a href="#projects" className="btn-primary">
                {t('hero.cta_projects')}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                {t('hero.cta_linkedin')} ↗
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a href={`${import.meta.env.BASE_URL}cv.pdf`} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                {t('hero.cta_cv')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </a>
            </Magnetic>
          </motion.div>

          <motion.div className="hero-tags" {...fade(0.95)}>
            {['Python', 'Node.js', 'Flutter', 'PHP / Laravel', 'AWS'].map((tag) => (
              <span key={tag} className="hero-tag">{tag}</span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="hero-visual" style={{ y: avatarY }}>
          <motion.div
            className="avatar-wrap"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={avatarUrl} alt="Ygor Volstein" className="avatar-img" />
            <div className="avatar-ring" />
          </motion.div>
        </motion.div>

      </div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="scroll-line" />
        <span className="mono">scroll</span>
      </motion.div>
    </section>
  );
}

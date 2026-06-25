import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { links } from '../data';
import './Navbar.css';

const LANGS = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'de', label: 'DE' },
  { code: 'zh', label: '中文' },
];

export default function Navbar({ theme, onToggleTheme }) {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  const navItems = [
    { label: t('nav.about'),      href: '#about'      },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.projects'),   href: '#projects'   },
    { label: t('nav.stack'),      href: '#skills'     },
    { label: t('nav.notes'),      href: '#notes'      },
    { label: t('nav.contact'),    href: '#contact'    },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const currentLang = LANGS.find((l) => l.code === i18n.language) || LANGS[0];

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner container">
        <a href="#hero" className="nav-logo">
          <span className="logo-bracket">[</span>yv<span className="logo-bracket">]</span>
        </a>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="nav-link">{item.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-controls">
          {/* Language picker */}
          <div className="lang-picker" ref={langRef}>
            <button className="lang-btn" onClick={() => setLangOpen((o) => !o)}>
              {currentLang.label}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  className="lang-dropdown"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                >
                  {LANGS.map((lang) => (
                    <li key={lang.code}>
                      <button
                        className={`lang-option${i18n.language === lang.code ? ' active' : ''}`}
                        onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false); }}
                      >
                        {lang.label}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="nav-cta">
            LinkedIn
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="nav-mobile" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="mobile-link" onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="mobile-link" onClick={() => setMenuOpen(false)}>LinkedIn ↗</a>
            <div className="mobile-controls">
              {LANGS.map((lang) => (
                <button key={lang.code} className={`lang-option${i18n.language === lang.code ? ' active' : ''}`} onClick={() => i18n.changeLanguage(lang.code)}>
                  {lang.label}
                </button>
              ))}
              <button className="theme-toggle" onClick={onToggleTheme}>{theme === 'dark' ? '☀️' : '🌙'}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

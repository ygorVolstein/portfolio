import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useTheme from './useTheme';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Bento from './components/Bento';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Notes from './components/Notes';
import Contact from './components/Contact';
import './App.css';

export default function App() {
  const { theme, toggle } = useTheme();
  const [loaded, setLoaded] = useState(false);
  const onDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Loader onDone={onDone} />}
      </AnimatePresence>

      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar theme={theme} onToggleTheme={toggle} />
            <main>
              <Hero />
              <Bento />
              <Experience />
              <Projects />
              <Skills />
              <Notes />
              <Contact />
            </main>
            <footer className="footer">
              <div className="container">
                <span className="footer-mono">ygor.volstein</span>
                <span className="footer-sep">·</span>
                <span>Brusque, SC — {new Date().getFullYear()}</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { links } from '../data';
import './Contact.css';

const EMAILJS_SERVICE_ID  = 'SEU_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'SEU_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'SUA_PUBLIC_KEY';

const STATUS = { idle: 'idle', sending: 'sending', ok: 'ok', err: 'err' };

export default function Contact() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const formRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [status, setStatus] = useState(STATUS.idle);
  const [fields, setFields] = useState({ name: '', email: '', message: '' });

  function onChange(e) {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (status === STATUS.sending) return;
    setStatus(STATUS.sending);
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus(STATUS.ok);
      setFields({ name: '', email: '', message: '' });
    } catch {
      setStatus(STATUS.err);
    }
  }

  const sending = status === STATUS.sending;

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <span className="section-label mono">{t('contact.label')}</span>
          <h2 className="section-title contact-title">
            {t('contact.title_1')}<br />
            <span className="title-faded">{t('contact.title_2')}</span>
          </h2>
        </motion.div>

        <div className="contact-grid">
          <motion.form ref={formRef} className="contact-form" onSubmit={onSubmit} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 0.5 }}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name" className="field-label">{t('contact.name_label')}</label>
                <input id="name" name="name" type="text" required placeholder={t('contact.name_placeholder')} className="field-input" value={fields.name} onChange={onChange} disabled={sending} />
              </div>
              <div className="form-field">
                <label htmlFor="email" className="field-label">{t('contact.email_label')}</label>
                <input id="email" name="email" type="email" required placeholder="seu@email.com" className="field-input" value={fields.email} onChange={onChange} disabled={sending} />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="message" className="field-label">{t('contact.message_label')}</label>
              <textarea id="message" name="message" required rows={5} placeholder={t('contact.message_placeholder')} className="field-input field-textarea" value={fields.message} onChange={onChange} disabled={sending} />
            </div>
            <div className="form-footer">
              <button type="submit" className="btn-send" disabled={sending}>
                {sending ? <><span className="spinner" />{t('contact.sending')}</> : t('contact.send')}
              </button>
              {status === STATUS.ok && <motion.span className="form-feedback ok" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>{t('contact.success')}</motion.span>}
              {status === STATUS.err && <motion.span className="form-feedback err" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>{t('contact.error')}</motion.span>}
            </div>
          </motion.form>

          <motion.div className="contact-side" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.28, duration: 0.5 }}>
            <p className="side-label">{t('contact.or')}</p>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="side-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href={`mailto:${links.email}`} className="side-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>
              E-mail
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

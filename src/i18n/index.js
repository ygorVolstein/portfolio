import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './locales/pt.json';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import zh from './locales/zh.json';

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
    es: { translation: es },
    de: { translation: de },
    zh: { translation: zh },
  },
  lng: localStorage.getItem('lang') || 'pt',
  fallbackLng: 'pt',
  initImmediate: false,
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => localStorage.setItem('lang', lng));

export default i18n;

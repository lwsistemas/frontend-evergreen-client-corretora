import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookies from 'universal-cookie'
import pt from './locales/pt';
import en from './locales/en';
import es from './locales/es';

const resources = { pt, en, es };

const cookies = new Cookies();
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: cookies.get('lgs') === undefined ? 'pt' : cookies.get('lgs'),
    interpolation: { escapeValue: false }
  });

export default i18n;
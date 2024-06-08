/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

import { createSignal } from 'solid-js';
import type { Translation } from './locale/en';

export const languages = {
  az: 'Azərbaycanca',
  be: 'Беларуская',
  cz: 'Čeština',
  en: 'English',
  fi: 'Suomi',
  ru: 'Русский',
  ua: 'Українська',
  standardgalactic: 'Ench. Table',
} as const;

export type LangCode = keyof typeof languages;

export const detectLanguage = (): LangCode => {
  let path = location.pathname.slice(1);
  if (path.endsWith('/')) path = path.slice(0, -1);
  if (path in languages) return path as LangCode;
  const savedLang = localStorage.getItem('language');
  if (savedLang && savedLang in languages) return savedLang as LangCode;
  for (const lang of navigator.languages)
    if (lang in languages) return lang as LangCode;
  return 'en';
};

const [i18n, setTranslations] = createSignal<Translation>(null!);

const [currentLanguage, setCurrentLanguage] = createSignal<LangCode>('en');

export { currentLanguage };

export const setLanguage = async (lang: LangCode) => {
  const translations = await import(`./locale/${lang}.ts`);
  setTranslations(translations.default);
  document.documentElement.lang = lang;
  history.pushState(null, '', `/${lang}/${location.hash}`);
  setCurrentLanguage(lang);
  const altLinks = document.querySelectorAll('link[rel="alternate"]');
  for (const link of altLinks) document.head.removeChild(link);
  for (const langCode of Object.keys(languages)) {
    if (langCode === lang) continue;
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = langCode;
    link.href = `https://unopack.net/${langCode}/${location.hash}`;
    document.head.appendChild(link);
  }
  const oldCanonicalLink = document.querySelector('link[rel="canonical"]');
  if (oldCanonicalLink) document.head.removeChild(oldCanonicalLink);
  const canonicalLink = document.createElement('link');
  canonicalLink.rel = 'canonical';
  canonicalLink.href = `https://unopack.net/${lang}/${location.hash}`;
  document.head.appendChild(canonicalLink);
  document.title = `UnoPack - ${translations.default.tagline}`;
  localStorage.setItem('language', lang);
};

setLanguage(detectLanguage());

export default i18n;

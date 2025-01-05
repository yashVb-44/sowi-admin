import EN from './en.json';
import FA from './fa.json';

const translations = {
  EN,
  FA
};

export function getTranslation(key, lang) {
    // Check if translations for the selected language exist, otherwise fallback to English
    const selectedTranslations = translations[lang] || translations['EN'];
    // Split the key by '.' and iterate through the parts to access nested values
    const keys = key.split('.');
    return keys.reduce((obj, currentKey) => {
      if (obj) {
        return obj[currentKey];
      }
      return undefined;
    }, selectedTranslations);
  }

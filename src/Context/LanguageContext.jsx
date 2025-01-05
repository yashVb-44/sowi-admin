import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import US from '../Assets/US.webp'
import IR from '../Assets/IR.png'
import { fetchTranslations } from '../Lib/ApiCaller';
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [translatedText, setTranslatedText] = useState('Loading...');

  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [selectedFlagCode, setSelectedFlagCode] = useState(US);
  const [selectedLangaugeName, setSelectedLanguageName] = useState('Persian (Farsi)-FA');
  const languageList = [
    { name: 'English-EN', code: 'EN', flag: US },
    { name: 'Persian (Farsi)-FA', code: 'FA', flag: IR },
  ];

  const handleChangeLanguage = (language) => {
    let lanData = JSON.stringify(language)
    localStorage.setItem('language', lanData)
    setSelectedLanguage(language.code);
    setSelectedFlagCode(language.flag);
    setSelectedLanguageName(language.name);
  };

  useEffect(() => {
    let data = localStorage.getItem('language');
    if (data) {
      let dat = JSON.parse(data);
      handleChangeLanguage(dat);
    }
  }, [US, IR]);

  const getTranslation = async (text) => {
    try {
      // const translation = await fetchTranslations(text, selectedLanguage);
      const translation = ""
      setTranslatedText(translation);
    } catch (error) {
      setTranslatedText(text);
    }
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, languageList, selectedFlagCode, setSelectedFlagCode, selectedLangaugeName, setSelectedLanguageName, getTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
};

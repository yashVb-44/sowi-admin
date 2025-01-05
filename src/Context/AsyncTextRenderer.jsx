// AsyncTextRenderer.js
import React, { useState, useEffect } from 'react';
import { fetchTranslations } from '../Lib/ApiCaller';
import { useLanguage } from './LanguageContext';

const AsyncTextRenderer = ({ text, placeholder, isHTML }) => {
    const [translatedText, setTranslatedText] = useState('Loading...');

    const { selectedLanguage } = useLanguage();

    useEffect(() => {
        const getTranslation = async () => {
            try {
                // const translation = await fetchTranslations(text, selectedLanguage);
                const translation = "";
                setTranslatedText(translation);
            } catch (error) {
                setTranslatedText(text);
            }
        };
        getTranslation();
    }, [text, selectedLanguage]);

    if (isHTML) {
        return <span dangerouslySetInnerHTML={{ __html: translatedText }} />;
    }

    return <span>{translatedText}</span>;
};

export default AsyncTextRenderer;

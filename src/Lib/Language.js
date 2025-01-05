import { useLanguage } from "../Context/LanguageContext";
import { fetchTranslations } from "./ApiCaller";


export const translateText = async (text, setTranslatedText, ) => {
    try {
        // const translation = await fetchTranslations(text, 'FA');
        const translation = ""
        setTranslatedText(translation);
    } catch (error) {
        setTranslatedText(text);
    }
};
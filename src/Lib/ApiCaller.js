import axios from "axios";
import { Alert } from "../Common/Alert";
import he from "he";
import { useLanguage } from "../Context/LanguageContext";

export const postApiCaller = async (endPoint, data, header) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  try {
    const url = baseUrl + endPoint;
    const response = await axios.post(url, data, header);
    return response?.data;
  } catch (error) {
    return error?.response?.data
    // Alert('Info', `${error.message}`, 'info');
  }
};

export const putApiCaller = async (endPoint, data, header) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  try {
    let url = baseUrl + endPoint;
    const response = await axios.put(url, data, header);
    return response?.data;
  } catch (error) {
    return error?.response?.data
    // Alert('Info', `Unable to process your request, Please try later`, 'info');
  }
};
export const getApiCaller = async (endPoint, header) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  try {
    let url = baseUrl + endPoint;
    const response = await axios.get(url, header);
    return response?.data;
  } catch (error) {
    return error?.response?.data
    // Alert('Info', `Unable to process your request, Please try later`, 'info');
  }
};
export const deleteApiCaller = async (endPoint, header) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  try {
    let url = baseUrl + endPoint;
    const response = await axios.delete(url, header);
    return response?.data;
  } catch (error) {
    return error?.response?.data
    // Alert('Info', `Unable to process your request, Please try later`, 'info');
  }
};
export const getUrlCaller = async (endPoint) => {
  try {
    const response = await axios.get(endPoint);
    return response?.data;
  } catch (error) {
    // Alert('Info', `Unable to process your request, Please try later`, 'info');
  }
};

export const extractDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (+1 because months are zero-indexed) and pad with leading zero if necessary
  const year = date.getFullYear(); // Get full year

  // Return date in ddmmyyyy format
  return `${day}-${month}-${year}`;
};

export const dateMonth = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

// Function to decode HTML entities
export const decodeHtmlEntities = (htmlContent) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = htmlContent;
  return txt.value;
};

export const fetchTranslations = async (text, selectedLanguage) => {
  const API_KEY = process.env.REACT_APP_GOOGLE_KEY;
  const API_URL = process.env.REACT_APP_GOOGLE_URL;

  try {
    const response = await axios.post(
      API_URL,
      {},
      {
        params: {
          q: text,
          target: selectedLanguage,
          key: API_KEY,
        },
      }
    );
    let translatedText = response?.data.data.translations[0].translatedText;
    return translatedText;
  } catch (error) {
    console.error("Error fetching translations:", error);
    throw error;
  }
};

export const dashboardInfo = async () => {
  let headers = {
    "Content-Type": "application/json",
  };

  let response = await getApiCaller("dashboard/count", { headers });
  return response;
};


export const formatNumber = (number) => {
  if (isNaN(number) || number == null) {
    return '0';
  }

  // Convert the number to a string and split into integer and decimal parts
  const [integerPart, decimalPart] = number.toString().split('.');

  // Process the integer part
  let result = '';
  let counter = 0;

  // Handle the first group (up to 3 digits)
  for (let i = integerPart.length - 1; i >= 0; i--) {
    result = integerPart[i] + result;
    counter++;

    // Add comma after the first group of 3 digits
    if (counter === 3 && i > 0) {
      result = ',' + result;
      counter = 0;
    } else if (counter === 2 && i > 0 && (integerPart.length - i) > 3) {
      // Add comma after every subsequent group of 2 digits
      result = ',' + result;
      counter = 0;
    }
  }

  // Add the decimal part if it exists
  if (decimalPart) {
    result += '.' + decimalPart;
  }

  return result;
}

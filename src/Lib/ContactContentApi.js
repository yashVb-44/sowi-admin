import { getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";

export const getContactContent = async () => {
  let headers = {
    "Content-Type": "application/json",
  };

  let response = await getApiCaller("contactContent/getAll", { headers });
  return response;
};

export const createContactContent = async (country, pinCode, address, countryFarsi, addressFarsi) => {
  let adminToken = sessionStorage?.getItem("adminToken");

  let headers = {
    Authorization: `Bearer ${adminToken}`,
  };

  let body = {
    countryName: country.label,
    countryCode: country.value,
    address: address,
    pinCode: pinCode,
    countryNameFarsi : countryFarsi,
    addressFarsi : addressFarsi
  };
  let response = await postApiCaller(`contactContent/add`, body, { headers });
  return response;
};

export const updateContactContent = async (country, pinCode, address,  countryFarsi, addressFarsi, id) => {
  let adminToken = sessionStorage?.getItem("adminToken");

  let headers = {
    Authorization: `Bearer ${adminToken}`,
  };

  let body = {
    countryName: country.label,
    countryCode: country.value,
    address: address,
    pinCode: pinCode,
    countryNameFarsi : countryFarsi,
    addressFarsi : addressFarsi
  };
  let response = await putApiCaller(`contactContent/update/${id}`, body, { headers });
  return response;
};

export const deleteContactContent = async (id) => {
  let adminToken = sessionStorage?.getItem("adminToken");

  let headers = {
    Authorization: `Bearer ${adminToken}`,
  };

  let body = {

  };
  let response = await postApiCaller(`contactContent/delete/${id}`, body, { headers });
  return response;
};

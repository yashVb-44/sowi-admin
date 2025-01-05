import { getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";

export const getTermsPrivacy = async () => {
  let headers = {
    "Content-Type": "application/json",
  };

  let response = await getApiCaller("privacyTerms/getAll", { headers });
  return response;
};

export const updatePrivacyContent = async (titlePriv, subTitlePriv, contentPriv, titleFarsi, title2Farsi, contentFarsi, id) => {
  let adminToken = sessionStorage?.getItem("adminToken");

  let headers = {
    Authorization: `Bearer ${adminToken}`,
  };

  let body = {
    titlePriv: titlePriv,
    subTitlePriv: subTitlePriv,
    contentPriv: contentPriv,
    //farsi
    titlePrivFarsi: titleFarsi,
    subTitlePrivFarsi: title2Farsi,
    contentPrivFarsi: contentFarsi,
  };

  let response = await putApiCaller(`privacyTerms/update/${id}`, body, { headers });
  return response;
};

export const updateTermsContent = async (title, title2, content, titleFarsi, title2Farsi, contentFarsi, id) => {
  let adminToken = sessionStorage?.getItem("adminToken");

  let headers = {
    Authorization: `Bearer ${adminToken}`,
  };

  let body = {
    titleTerm: title,
    subTitleTerm: title2,
    contentTerm: content,
    // farsi
    titleTermFarsi: titleFarsi,
    subTitleTermFarsi: title2Farsi,
    contentTermFarsi: contentFarsi
  };

  let response = await putApiCaller(`privacyTerms/update/${id}`, body, { headers });
  return response;
};

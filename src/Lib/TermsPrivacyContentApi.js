import { getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";

let adminToken = localStorage.getItem('adminToken')
let headers = {
  // 'Content-Type': 'application/json',
  Authorization: adminToken
}

export const getTermsPrivacy = async () => {
  let headers = {
    "Content-Type": "application/json",
  };

  let response = await getApiCaller("privacyTerms/getAll", { headers });
  return response;
};

export const updateSubscriptionPlan = async (id, updatedPlan) => {
  let response = await putApiCaller(`subscription/plan/update/${id}`, updatedPlan, { headers });
  return response;
};

export const updateFAQContent = async ({ faqs }) => {

  let body = {
    faqs
  };

  let response = await putApiCaller(`settings/update`, body, { headers });
  return response;
};

export const updateAboutContent = async ({ about }) => {

  let body = {
    about
  };

  let response = await putApiCaller(`settings/update`, body, { headers });
  return response;
};

export const updatePrivacyContent = async ({ privacy }) => {

  let body = {
    privacy
  };

  let response = await putApiCaller(`settings/update`, body, { headers });
  return response;
};

export const updateTermsContent = async ({ terms, invoiceTerms }) => {

  let body = {
    terms,
    invoiceTerms
  };

  let response = await putApiCaller(`settings/update`, body, { headers });
  return response;
};

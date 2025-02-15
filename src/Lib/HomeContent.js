import { getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";
let adminToken = localStorage.getItem('adminToken')
let headers = {
    // 'Content-Type': 'application/json',
    Authorization: adminToken
}

export const getSettingContent = async () => {

  let response = await getApiCaller("settings", { headers });
  return response;
};

export const getSubScriptionPlans = async () => {

  let response = await getApiCaller("subscription/plan", { headers });
  return response;
};

export const getHomeContent = async () => {
  let headers = {
    "Content-Type": "application/json",
  };

  let response = await getApiCaller("home/getAll", { headers });
  return response;
};

export const getSupportContent = async () => {
  let headers = {
    "Content-Type": "application/json",
  };

  let response = await getApiCaller("support/getAll", { headers });
  return response;
};
export const getMissionContent = async () => {
  let headers = {
    "Content-Type": "application/json",
  };

  let response = await getApiCaller("mission/getAll", { headers });
  return response;
};


export const updateHomeContent = async (file, heroBanner, part1, part2, part3, heroBannerFa, part1Fa, part2Fa, part3Fa, id, part0, part0Fa) => {
  let adminToken = sessionStorage?.getItem('adminToken');

  let headers = {
    Authorization: `Bearer ${adminToken}`
  };

  let formData = new FormData();
  formData.append("subTitle1", heroBanner.subTitle1);
  formData.append("title", heroBanner.title);
  formData.append("subTitle2", heroBanner.subTitle2);
  formData.append("heroBannerImg", file);

  formData.append("part0title", part0.title);
  formData.append("part0description", part0.description);
  formData.append("part1title", part1.title);
  formData.append("part1description", part1.description);
  formData.append("part2title", part2.title);
  formData.append("part2description", part2.description);
  formData.append("part3title", part3.title);
  formData.append("part3description", part3.description);
  // farsi
  formData.append("subTitle1Farsi", heroBannerFa.subTitle1);
  formData.append("titleFarsi", heroBannerFa.title);
  formData.append("subTitle2Farsi", heroBannerFa.subTitle2);

  formData.append("part0titleFarsi", part0Fa.title);
  formData.append("part0descriptionFarsi", part0Fa.description);
  formData.append("part1titleFarsi", part1Fa.title);
  formData.append("part1descriptionFarsi", part1Fa.description);
  formData.append("part2titleFarsi", part2Fa.title);
  formData.append("part2descriptionFarsi", part2Fa.description);
  formData.append("part3titleFarsi", part3Fa.title);
  formData.append("part3descriptionFarsi", part3Fa.description);

  let response = await putApiCaller(`home/update/${id}`, formData, { headers });
  return response;
};

export const updateSupportContent = async (supportTitle, supportDescription, supportFile, supportTitle2, supportDescription2, supportFile2, supportTitle3, supportDescription3, supportFile3, supportTitle4, supportDescription4, supportFile4, supportTitleFarsi, supportDescriptionFarsi, supportTitle2Farsi, supportDescription2Farsi, supportTitle3Farsi, supportDescription3Farsi, supportTitle4Farsi, supportDescription4Farsi, id, supportHeading, supportPara, supportHeadingFarsi, supportParaFarsi) => {
  let adminToken = sessionStorage?.getItem('adminToken');

  let headers = {
    Authorization: `Bearer ${adminToken}`
  };

  let formData = new FormData();
  formData.append("heading", supportHeading);
  formData.append("para", supportPara);
  formData.append("title1", supportTitle);
  formData.append("description1", supportDescription);
  formData.append("icon1", supportFile);
  formData.append("title2", supportTitle2);
  formData.append("description2", supportDescription2);
  formData.append("icon2", supportFile2);
  formData.append("title3", supportTitle3);
  formData.append("description3", supportDescription3);
  formData.append("icon3", supportFile3);
  formData.append("title4", supportTitle4);
  formData.append("description4", supportDescription4);
  formData.append("icon4", supportFile4);
  // farsi
  formData.append("headingFarsi", supportHeadingFarsi);
  formData.append("paraFarsi", supportParaFarsi);
  formData.append("title1Farsi", supportTitleFarsi);
  formData.append("description1Farsi", supportDescriptionFarsi);
  formData.append("title2Farsi", supportTitle2Farsi);
  formData.append("description2Farsi", supportDescription2Farsi);
  formData.append("title3Farsi", supportTitle3Farsi);
  formData.append("description3Farsi", supportDescription3Farsi);
  formData.append("title4Farsi", supportTitle4Farsi);
  formData.append("description4Farsi", supportDescription4Farsi);

  let response = await putApiCaller(`support/update/${id}`, formData, { headers });
  return response;
};
export const updateMissionContent = async (missionHeading, missionPara, missionHeadingFarsi, missionParaFarsi, missionNumber, missionDescription, missionFile, missionNumber2, missionDescription2, missionFile2, missionNumber3, missionDescription3, missionFile3, missionNumber4, missionDescription4, missionFile4, missionNumberFarsi, missionDescriptionFarsi, missionNumber2Farsi, missionDescription2Farsi, missionNumber3Farsi, missionDescription3Farsi, missionNumber4Farsi, missionDescription4Farsi, id) => {
  let adminToken = sessionStorage?.getItem('adminToken');

  let headers = {
    Authorization: `Bearer ${adminToken}`
  };

  let formData = new FormData();
  formData.append("heading", missionHeading);
  formData.append("para", missionPara);
  formData.append("number1", missionNumber);
  formData.append("description1", missionDescription);
  formData.append("icon1", missionFile);
  formData.append("number2", missionNumber2);
  formData.append("description2", missionDescription2);
  formData.append("icon2", missionFile2);
  formData.append("number3", missionNumber3);
  formData.append("description3", missionDescription3);
  formData.append("icon3", missionFile3);
  formData.append("number4", missionNumber4);
  formData.append("description4", missionDescription4);
  formData.append("icon4", missionFile4);
  // farsi
  formData.append("headingFarsi", missionHeadingFarsi);
  formData.append("paraFarsi", missionParaFarsi);
  formData.append("number1Farsi", missionNumberFarsi);
  formData.append("description1Farsi", missionDescriptionFarsi);
  formData.append("number2Farsi", missionNumber2Farsi);
  formData.append("description2Farsi", missionDescription2Farsi);
  formData.append("number3Farsi", missionNumber3Farsi);
  formData.append("description3Farsi", missionDescription3Farsi);
  formData.append("number4Farsi", missionNumber4Farsi);
  formData.append("description4Farsi", missionDescription4Farsi);

  let response = await putApiCaller(`mission/update/${id}`, formData, { headers });
  return response;
};


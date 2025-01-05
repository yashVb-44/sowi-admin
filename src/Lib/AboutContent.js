import { getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";

export const getAboutContent = async () => {
  let headers = {
    "Content-Type": "application/json",
  };

  let response = await getApiCaller("about/getAll", { headers });
  return response;
};

export const getAboutJourney = async () => {
  let headers = {
    "Content-Type": "application/json",
  };

  let response = await getApiCaller("aboutJourney/getAll", { headers });
  return response;
};
export const getTeam = async () => {
  let headers = {
    "Content-Type": "application/json",
  };

  let response = await getApiCaller("team/getAll", { headers });
  return response;
};


export const updateAboutContent = async (file, heroBanner, part1, part2, heroBannerFa, part1Fa, part2Fa, id) => {
    let adminToken = sessionStorage?.getItem('adminToken');

  let headers = {
    Authorization: `Bearer ${adminToken}`
  };

  let formData = new FormData();
  formData.append("subTitle1", heroBanner.subTitle1);
  formData.append("title", heroBanner.title);
  formData.append("subTitle2", heroBanner.subTitle2);
  formData.append("heroBannerImg", file);

  formData.append("part1Heading",  part1.heading);
  formData.append("part1SubHeading",  part1.subHeading);
  formData.append("part1title",  part1.title);
  formData.append("part1description",  part1.description);
  formData.append("part1title2",  part1.title2);
  formData.append("part1description2",  part1.description2);
  formData.append("part1title3",  part1.title3);
  formData.append("part1description3",  part1.description3);

  formData.append("part2title",  part2.title);
  formData.append("part2description",  part2.description);
  formData.append("part2title2",  part2.title2);
  formData.append("part2description2",  part2.description2);
  formData.append("part2title3",  part2.title3);
  formData.append("part2description3",  part2.description3);

  // farsi
  formData.append("subTitle1Farsi", heroBannerFa.subTitle1);
  formData.append("titleFarsi", heroBannerFa.title);
  formData.append("subTitle2Farsi", heroBannerFa.subTitle2);

  formData.append("part1HeadingFarsi",  part1Fa.heading);
  formData.append("part1SubHeadingFarsi",  part1Fa.subHeading);
  formData.append("part1titleFarsi",  part1Fa.title);
  formData.append("part1descriptionFarsi",  part1Fa.description);
  formData.append("part1title2Farsi",  part1Fa.title2);
  formData.append("part1description2Farsi",  part1Fa.description2);
  formData.append("part1title3Farsi",  part1Fa.title3);
  formData.append("part1description3Farsi",  part1Fa.description3);

  formData.append("part2titleFarsi",  part2Fa.title);
  formData.append("part2descriptionFarsi",  part2Fa.description);
  formData.append("part2title2Farsi",  part2Fa.title2);
  formData.append("part2description2Farsi",  part2Fa.description2);
  formData.append("part2title3Farsi",  part2Fa.title3);
  formData.append("part2description3Farsi",  part2Fa.description3);

  let response = await putApiCaller(`about/update/${id}`, formData, { headers });
  return response;
};

export const updateJourneyContent = async ( part1Title, part1Desc, part1Year, supportFile, part2Title, part2Desc, part2Year, supportFile2, part3Title, part3Desc, part3Year, supportFile3, part4Title, part4Desc, part4Year, supportFile4,  part1TitleFarsi, part1DescFarsi, part2TitleFarsi, part2DescFarsi, part3TitleFarsi, part3DescFarsi, part4TitleFarsi, part4DescFarsi, id) => {
    let adminToken = sessionStorage?.getItem('adminToken');

  let headers = {
    Authorization: `Bearer ${adminToken}`
  };

  let formData = new FormData();
  formData.append("title1", part1Title);
  formData.append("description1", part1Desc);
  formData.append("year1", part1Year);
  formData.append("icon1", supportFile);
  formData.append("title2", part2Title);
  formData.append("description2",  part2Desc);
  formData.append("year2",  part2Year);
  formData.append("icon2",  supportFile2);
  formData.append("title3",  part3Title);
  formData.append("description3",  part3Desc);
  formData.append("year3",  part3Year);
  formData.append("icon3",  supportFile3);
  formData.append("title4",  part4Title);
  formData.append("description4",  part4Desc);
  formData.append("year4",  part4Year);
  formData.append("icon4",  supportFile4);
  // farsi
  formData.append("title1Farsi",  part1TitleFarsi);
  formData.append("description1Farsi",  part1DescFarsi);
  formData.append("year1Farsi",  part1Year);
  formData.append("title2Farsi",  part2TitleFarsi);
  formData.append("description2Farsi",  part2DescFarsi);
  formData.append("year2Farsi",  part2Year);
  formData.append("title3Farsi",  part3TitleFarsi);
  formData.append("description3Farsi",  part3DescFarsi);
  formData.append("year3Farsi",  part3Year);
  formData.append("title4Farsi",  part4TitleFarsi);
  formData.append("description4Farsi",  part4DescFarsi);
  formData.append("year4Farsi",  part4Year);


  let response = await putApiCaller(`aboutJourney/update/${id}`, formData, { headers });
  return response;
};

export const updateTeam = async (name, designation, description, fileData,  nameFarsi, designationFarsi, descriptionFarsi, id) => {
    let adminToken = sessionStorage?.getItem('adminToken');

  let headers = {
    Authorization: `Bearer ${adminToken}`
  };

  let formData = new FormData();
  formData.append("name", name);
  formData.append("designation", designation);
  formData.append("description", description);
  formData.append("image", fileData);
  formData.append("nameFarsi", nameFarsi);
  formData.append("designationFarsi", designationFarsi);
  formData.append("descriptionFarsi", descriptionFarsi);

  let response = await putApiCaller(`team/update/${id}`, formData, { headers });
  return response;
};

export const addTeamMember = async (name, designation, description, fileData,  nameFarsi, designationFarsi, descriptionFarsi) => {
    let adminToken = sessionStorage?.getItem('adminToken');

  let headers = {
    Authorization: `Bearer ${adminToken}`
  };

  let formData = new FormData();
  formData.append("name", name);
  formData.append("designation", designation);
  formData.append("description", description);
  formData.append("image", fileData);
  formData.append("nameFarsi", nameFarsi);
  formData.append("designationFarsi", designationFarsi);
  formData.append("descriptionFarsi", descriptionFarsi);

  let response = await postApiCaller(`team/add`, formData, { headers });
  return response;
};




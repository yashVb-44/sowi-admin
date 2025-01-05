import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAboutContent, getAboutJourney, getTeam } from '../Lib/AboutContent';
import { getContactContent } from '../Lib/ContactContentApi';
import { getTermsPrivacy } from '../Lib/TermsPrivacyContentApi';
import { getHomeContent, getMissionContent, getSupportContent } from '../Lib/HomeContent';
import { useLanguage } from './LanguageContext';

// Create a context
const ContentContext = createContext();

// Create a custom hook to access the context
export const useContent = () => {
  return useContext(ContentContext);
};

// Create a provider component
export const ContentProvider = ({ children }) => {
  const { selectedLanguage } = useLanguage()
  
  // home
  const [homeContent, setHomeContent] = useState([]);
  const [homeContentAdmin, setHomeContentAdmin] = useState([]);
  const [editHomeContent, setEditHomeContent] = useState([]);
  
  // support
  const [supportContent, setSupportContent] = useState([])
  const [supportContentEn, setSupportContentEn] = useState([])
  const [supportContentFa, setSupportContentFa] = useState([])
  const [editSupportContent, setEditSupportContent] = useState([]);
  
  // misison
  const [missionContent, setMissionContent] = useState([])
  const [missionContentEn, setMissionContentEn] = useState([])
  const [missionContentFa, setMissionContentFa] = useState([])
  const [editMissionContent, setEditMissionContent] = useState([]);

  // about
  const [aboutContent, setAboutContent] = useState([]);
  const [aboutContentAdmin, setAboutContentAdmin] = useState([]);
  const [editAboutContent, setEditAboutContent] = useState([]);

  // about journey
  const [aboutJourney, setAboutJourney] = useState([]);
  const [aboutJourneyEn, setAboutJourneyEn] = useState([]);
  const [aboutJourneyFa, setAboutJourneyFa] = useState([]);
  const [editJourneyContent, setEditJourneyContent] = useState([]);

  // team
  const [teamData, setTeamData] = useState([]);
  const [teamDataAdmin, setTeamDataAdmin] = useState([]);
  const [editteamData, setEditTeamData] = useState([]);
  const [editTeamMember, setEditTeamMember] = useState([]);

  // contact
  const [contactData, setContactData] = useState([])
  const [contactDataAdmin, setContactDataAdmin] = useState([])
  const [editContactData, setEditContactData] = useState([])

  // terms & privacy
  const [termPrivacyData, setTermPrivacyData] = useState([])
  const [termPrivacyDataAdmin, setTermPrivacyDataAdmin] = useState([])
  const [editTermPrivacyData, setEditTermPrivacyData] = useState([])

  // category by id data 
  const [categoryIdData, setCategoryIdData] = useState();

  const fetchHomeContent = async () => {
    let response = await getHomeContent()
    const enData = response?.data[0]?.en;
    const faData = response?.data[0]?.fa;
    if (selectedLanguage === 'EN') {
      setHomeContent(enData);
    } else {
      setHomeContent(faData);
    }
    setHomeContentAdmin(response?.data[0])
    setEditHomeContent(response?.data[0])
  }
  const fetchSupportContent = async () => {
    let response = await getSupportContent()
    if (selectedLanguage === 'EN') {
      setSupportContent(response?.data[0]?.en)
    } else {
      setSupportContent(response?.data[0]?.fa)
    }
    setSupportContentEn(response?.data[0]?.en)
    setSupportContentFa(response?.data[0]?.fa)
    setEditSupportContent(response?.data[0])
  }

  const fetchMissionContent = async () => {
    let response = await getMissionContent()
    if (selectedLanguage === 'EN') {
      setMissionContent(response?.data[0]?.en)
    } else {
      setMissionContent(response?.data[0]?.fa)
    }
    setMissionContentEn(response?.data[0]?.en)
    setMissionContentFa(response?.data[0]?.fa)
    setEditMissionContent(response?.data[0])
  }

  const fetchAboutContent = async () => {
    let response = await getAboutContent()
    try {
      if (selectedLanguage === 'EN') {
        setAboutContent(response?.data[0]?.en)
      } else {
        setAboutContent(response?.data[0]?.fa)
      }
      setAboutContentAdmin(response?.data[0])
      setEditAboutContent(response?.data[0])
    } catch (error) {

    }
  }
  const fetchAboutJourney = async () => {
    let response = await getAboutJourney()
    try {
      if (selectedLanguage === 'EN') {
        setAboutJourney(response?.data[0]?.en)
      } else {
        setAboutJourney(response?.data[0]?.fa)
      }
      setAboutJourneyEn(response?.data[0]?.en)
      setAboutJourneyFa(response?.data[0]?.fa)
      setEditJourneyContent(response?.data[0])
    } catch (error) {

    }
  }
  const fetchTeam = async () => {
    let response = await getTeam()
    try {
      if (selectedLanguage === 'EN') {
        setTeamData(response?.data?.map(cat => cat?.en))
      } else {
        setTeamData(response?.data?.map(cat => cat?.fa))
      }
      setTeamDataAdmin(response?.data)
      setEditTeamData(response?.data)
    } catch (error) {

    }
  }
  const fetchContactContent = async () => {
    let response = await getContactContent()
    try {
      if (selectedLanguage === 'EN') {
        setContactData(response?.data?.map(cat => cat?.en))
      } else {
        setContactData(response?.data?.map(cat => cat?.fa))
      }
      setContactDataAdmin(response?.data)
    } catch (error) {

    }
  }
  const fetchTermPrivacyContent = async () => {
    let response = await getTermsPrivacy()
    try {
      if (selectedLanguage === 'EN') {
        setTermPrivacyData(response?.data[0].en)
      } else {
        setTermPrivacyData(response?.data[0].fa)
      }
      setEditTermPrivacyData(response?.data[0])
      setTermPrivacyDataAdmin(response?.data[0])
    } catch (error) {
    }
  }

  useEffect(() => {
    fetchHomeContent()
    fetchSupportContent()
    fetchAboutContent()
    fetchAboutJourney()
    fetchTeam()
    fetchContactContent()
    fetchTermPrivacyContent()
    fetchMissionContent()
  }, [selectedLanguage])


  return (
    <ContentContext.Provider value={{
      homeContent, setHomeContent, homeContentAdmin, setHomeContentAdmin, editHomeContent, setEditHomeContent, editSupportContent, setEditSupportContent, supportContent, setSupportContent, supportContentEn, setSupportContentEn, supportContentFa, setSupportContentFa,
      aboutContent, setAboutContent, aboutContentAdmin, setAboutContentAdmin, aboutJourney, setAboutJourney, aboutJourneyEn, setAboutJourneyEn, aboutJourneyFa, setAboutJourneyFa, teamData, setTeamData, teamDataAdmin, setTeamDataAdmin, editAboutContent, setEditAboutContent, editJourneyContent, setEditJourneyContent, editteamData, setEditTeamData, editTeamMember, setEditTeamMember
     , missionContent, setMissionContent, missionContentEn, setMissionContentEn, missionContentFa, setMissionContentFa, editMissionContent, setEditMissionContent
      , categoryIdData, setCategoryIdData, termPrivacyDataAdmin, setTermPrivacyDataAdmin
      , contactData, setContactData, contactDataAdmin, setContactDataAdmin, editContactData, setEditContactData, termPrivacyData, setTermPrivacyData, editTermPrivacyData, setEditTermPrivacyData
      , fetchAboutContent, fetchMissionContent, fetchAboutJourney, fetchTeam, fetchContactContent, fetchTermPrivacyContent, fetchHomeContent, fetchSupportContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};

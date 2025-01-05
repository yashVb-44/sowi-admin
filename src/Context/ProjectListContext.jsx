import React, { createContext, useContext, useState } from 'react';

// Create a context
const ProjectListContext = createContext();

// Create a custom hook to access the context
export const useProjectList = () => {
  return useContext(ProjectListContext);
};

// Create a provider component
export const ProjectListProvider = ({ children }) => {
  // Define your state and functions here
  const [projectListData, setProjectListData] = useState();
  const [projectViewData, setProjectViewData] = useState();
  const verificationData = [
    {
        name : 'Green',
        code : '01'
    },
    {
        name : 'Red',
        code : '02'
    },
    {
        name : 'Yellow',
        code : '03'
    },
]
  const verificationDataFarsi = [
    {
        name : 'سبز',
        code : '01'
    },
    {
        name : 'قرمز',
        code : '02'
    },
    {
        name : 'رنگ زرد',
        code : '03'
    },
]

  return (
    <ProjectListContext.Provider value={{ projectListData, setProjectListData, projectViewData, setProjectViewData, verificationData, verificationDataFarsi }}>
      {children}
    </ProjectListContext.Provider>
  );
};

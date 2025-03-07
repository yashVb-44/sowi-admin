import React, { createContext, useContext, useState } from "react";

// Create a context
const VehicleSectionContext = createContext();

// Create a custom hook to access the context
export const useVehicleSection = () => {
  return useContext(VehicleSectionContext);
};

// Create a provider component
export const VehicleDetailProvider = ({ children }) => {
  const [vehicleData, setVehicleData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <VehicleSectionContext.Provider
      value={{
        setVehicleData,
        vehicleData,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </VehicleSectionContext.Provider>
  );
};

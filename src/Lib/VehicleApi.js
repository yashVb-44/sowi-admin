import {
  deleteApiCaller,
  getApiCaller,
  postApiCaller,
  putApiCaller,
} from "./ApiCaller";
let adminToken = localStorage.getItem("adminToken");
let headers = {
  //   "Content-Type": "application/json",
  Authorization: adminToken,
};

export const addVehicle = async ({
  serviceType,
  vehicleName,
  vehicleImage,
  company,
}) => {
  try {
    const formData = new FormData();
    formData.append("serviceType", serviceType);
    formData.append("company", company);
    formData.append("vehicleName", vehicleName);
    formData.append("vehicleImage", vehicleImage);

    const response = await postApiCaller(`vehicle/add`, formData, { headers });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateVehicle = async ({
  serviceType,
  company,
  vehicleName,
  vehicleImage,
  isDeleted,
  isActive,
  vehicleId,
}) => {
  try {
    const formData = new FormData();
    formData.append("vehicleImage", vehicleImage);
    formData.append("serviceType", serviceType);
    formData.append("company", company);
    formData.append("vehicleName", vehicleName);
    formData.append("isDeleted", isDeleted);
    formData.append("isActive", isActive);

    const response = await putApiCaller(
      `vehicle/update/${vehicleId}`,
      formData,
      { headers }
    );
    return response;
  } catch (error) {
    return;
  }
};

export const getAllVehicle = async ({ search = "", page = 1, limit = 10 }) => {
  page = page + 1;
  try {
    const params = new URLSearchParams({
      search,
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await getApiCaller(`vehicle/list/forAdmin?${params}`, {
      headers,
    });
    return response;
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    return { vehicles: [], totalPages: 0, currentPage: 0, totalvehicles: 0 };
  }
};

export const deleteVehicle = async (id) => {
  try {
    const response = await deleteApiCaller(`vehicle/${id}`, { headers });
    return response;
  } catch (error) {
    console.error("Error delet vehicle :", error);
    return error;
  }
};

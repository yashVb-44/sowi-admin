import { deleteApiCaller, getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";
let adminToken = localStorage.getItem('adminToken')
let headers = {
    'Content-Type': 'application/json',
    Authorization: adminToken
}

export const addEmergencyService = async ({
    name,
    serviceType,
}) => {
    try {
        const formData = {
            name,
            serviceType
        }

        const response = await postApiCaller(`emergencyService/create`, formData, { headers });
        return response;
    } catch (error) {
        return error
    }
};

export const updateEmergencyService = async ({
    name,
    isShow,
    serviceType,
    // isDeleted,
    emergencyServiceId
}) => {
    try {
        const formData = {
            name,
            isShow,
            serviceType
            // isDeleted,
        }

        const response = await putApiCaller(`emergencyService/update/${emergencyServiceId}`, formData, { headers });
        return response;
    } catch (error) {
        return
    }
};


export const getAllEmergencyService = async ({ search = '', page = 1, limit = 10 }) => {
    page = page + 1
    try {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString(),
        });

        const response = await getApiCaller(`emergencyService/list/forAdmin?${params}`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching emergencyService data:', error);
        return { emergencyServices: [], totalPages: 0, currentPage: 0, totalEmergencyServices: 0 };
    }
};

export const deleteEmergencyService = async (id) => {

    try {
        const response = await deleteApiCaller(`emergencyService/byAdmin/${id}`, { headers });
        return response;
    } catch (error) {
        console.error('Error delet emergencyService :', error);
        return error;
    }
};
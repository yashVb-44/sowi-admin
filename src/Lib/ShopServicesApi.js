import { deleteApiCaller, getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";
let adminToken = localStorage.getItem('adminToken')
let headers = {
    'Content-Type': 'application/json',
    Authorization: adminToken
}

export const addShopService = async ({
    name,
    serviceType,
}) => {
    try {
        const formData = {
            name,
            serviceType
        }

        const response = await postApiCaller(`shopService/create`, formData, { headers });
        return response;
    } catch (error) {
        return error
    }
};

export const updateShopService = async ({
    name,
    isShow,
    serviceType,
    // isDeleted,
    shopServiceId
}) => {
    try {
        const formData = {
            name,
            isShow,
            serviceType
            // isDeleted,
        }

        const response = await putApiCaller(`shopService/update/${shopServiceId}`, formData, { headers });
        return response;
    } catch (error) {
        return
    }
};


export const getAllShopService = async ({ search = '', page = 1, limit = 10 }) => {
    page = page + 1
    try {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString(),
        });

        const response = await getApiCaller(`shopService/list/forAdmin?${params}`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching shopService data:', error);
        return { shopServices: [], totalPages: 0, currentPage: 0, totalShopServices: 0 };
    }
};

export const deleteShopService = async (id) => {

    try {
        const response = await deleteApiCaller(`shopService/byAdmin/${id}`, { headers });
        return response;
    } catch (error) {
        console.error('Error delet shopService :', error);
        return error;
    }
};
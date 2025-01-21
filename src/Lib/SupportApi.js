import { deleteApiCaller, getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";
let adminToken = localStorage.getItem('adminToken')
let headers = {
    'Content-Type': 'application/json',
    Authorization: adminToken
}

export const updateSupport = async ({
    response,
    status,
    supportId
}) => {
    try {
        const formData = {
            response,
            status,
        }

        const apiResponse = await putApiCaller(`contactUs/update/${supportId}`, formData, { headers });
        return apiResponse;
    } catch (error) {
        return
    }
};


export const getAllSupport = async ({ search = '', page = 1, limit = 10 }) => {
    page = page + 1
    try {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString(),
        });

        const response = await getApiCaller(`contactUs/list/forAdmin?${params}`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching support data:', error);
        return { supports: [], totalPages: 0, currentPage: 0, totalSupports: 0 };
    }
};
import { deleteApiCaller, getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";
let adminToken = localStorage.getItem('adminToken')
let headers = {
    'Content-Type': 'application/json',
    Authorization: adminToken
}

export const addCompany = async ({
    name,
    serviceType,
    companyName
}) => {
    try {
        const formData = {
            name,
            serviceType,
            companyName
        }

        const response = await postApiCaller(`company/add`, formData, { headers });
        return response;
    } catch (error) {
        return error
    }
};

export const updateCompany = async ({
    name,
    serviceType,
    companyName,
    isDeleted,
    companyId
}) => {
    try {
        const formData = {
            name,
            serviceType,
            companyName,
            isDeleted,
        }

        const response = await putApiCaller(`company/update/${companyId}`, formData, { headers });
        return response;
    } catch (error) {
        return
    }
};


export const getAllCompany = async ({ search = '', page = 1, limit = 10 }) => {
    page = page + 1
    try {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString(),
        });

        const response = await getApiCaller(`company/list/forAdmin?${params}`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching company data:', error);
        return { companys: [], totalPages: 0, currentPage: 0, totalCompanys: 0 };
    }
};

export const deleteCompany = async (id) => {

    try {
        const response = await deleteApiCaller(`company/${id}`, { headers });
        return response;
    } catch (error) {
        console.error('Error delet company :', error);
        return error;
    }
};
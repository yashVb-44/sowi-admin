import { deleteApiCaller, getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";
let adminToken = localStorage.getItem('adminToken')
let headers = {
    'Content-Type': 'application/json',
    Authorization: adminToken
}

export const addCategory = async ({
    name,
}) => {
    try {
        const formData = {
            name,
        }

        const response = await postApiCaller(`category/add`, formData, { headers });
        return response;
    } catch (error) {
        return error
    }
};

export const updateCategory = async ({
    name,
    isActive,
    isDeleted,
    categoryId
}) => {
    try {
        const formData = {
            name,
            isActive,
            isDeleted,
        }

        const response = await putApiCaller(`category/update/${categoryId}`, formData, { headers });
        return response;
    } catch (error) {
        return
    }
};


export const getAllCategory = async ({ search = '', page = 1, limit = 10 }) => {
    page = page + 1
    try {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString(),
        });

        const response = await getApiCaller(`category/list/forAdmin?${params}`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching category data:', error);
        return { categorys: [], totalPages: 0, currentPage: 0, totalCategorys: 0 };
    }
};

export const deleteCategory = async (id) => {

    try {
        const response = await deleteApiCaller(`category/${id}`, { headers });
        return response;
    } catch (error) {
        console.error('Error delet category :', error);
        return error;
    }
};
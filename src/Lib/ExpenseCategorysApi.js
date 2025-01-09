import { deleteApiCaller, getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";
let adminToken = localStorage.getItem('adminToken')
let headers = {
    'Content-Type': 'application/json',
    Authorization: adminToken
}

export const addExpenseCategory = async ({
    name,
}) => {
    try {
        const formData = {
            name,
        }

        const response = await postApiCaller(`expense/category/add`, formData, { headers });
        return response;
    } catch (error) {
        return error
    }
};

export const updateExpenseCategory = async ({
    name,
    isActive,
    isDeleted,
    expenseCategoryId
}) => {
    try {
        const formData = {
            name,
            isActive,
            isDeleted,
        }

        const response = await putApiCaller(`expense/category/update/${expenseCategoryId}`, formData, { headers });
        return response;
    } catch (error) {
        return
    }
};


export const getAllExpenseCategory = async ({ search = '', page = 1, limit = 10 }) => {
    page = page + 1
    try {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString(),
        });

        const response = await getApiCaller(`expense/category/list/forAdmin?${params}`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching expenseCategory data:', error);
        return { expenseCategorys: [], totalPages: 0, currentPage: 0, totalExpenseCategorys: 0 };
    }
};

export const deleteExpenseCategory = async (id) => {

    try {
        const response = await deleteApiCaller(`expense/category/${id}`, { headers });
        return response;
    } catch (error) {
        console.error('Error delet expenseCategory :', error);
        return error;
    }
};
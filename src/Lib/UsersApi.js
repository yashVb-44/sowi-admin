import { getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";
let adminToken = localStorage.getItem('adminToken')
let headers = {
    'Content-Type': 'application/json',
    Authorization: adminToken
}

export const addUser = async (paymentMethod, amount, projectId, txnId, userName, userEmail, checkBox, coin, coinVal,) => {

    let body = {
        paymentMethod: paymentMethod,
        amount: amount,
        projectId: projectId,
        transectionId: txnId,
        coin: coin,
        coinValue: coinVal,
        name: userName,
        email: userEmail,
        checkBox: checkBox
    }

    let response = await postApiCaller('donation/add', body, { headers })
    return response;
}

export const updateUser = async ({
    name,
    email,
    mobileNo,
    isBlocked,
    isVerified,
    isActive,
    isDeleted,
    country,
    language,
    gender,
    role,
    file,
    dateOfBirth,
    userId,
}) => {
    const formData = new FormData();

    // Append all data to the formData object
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobileNo', mobileNo);
    formData.append('isBlocked', isBlocked);
    formData.append('isVerified', isVerified);
    formData.append('isActive', isActive);
    formData.append('isDeleted', isDeleted);
    formData.append('country', country);
    formData.append('language', language);
    formData.append('gender', gender);
    formData.append('role', role);
    formData.append('dateOfBirth', dateOfBirth);

    // Add file if present
    if (file) {
        formData.append('file', file);
    }

    const response = await putApiCaller(`user/profile/${userId}`, formData, { headers });
    return response;
};


export const getAllUser = async ({ search = '', page = 1, limit = 10 }) => {
    page = page + 1
    try {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString(),
        });

        const response = await getApiCaller(`user/list/forAdmin?${params}`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { users: [], totalPages: 0, currentPage: 0, totalUsers: 0 };
    }
};
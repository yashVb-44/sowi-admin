import { deleteApiCaller, getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";
let adminToken = localStorage.getItem('adminToken')
let headers = {
    'Content-Type': 'application/json',
    Authorization: adminToken
}

export const addVendor = async (paymentMethod, amount, projectId, txnId, vendorName, vendorEmail, checkBox, coin, coinVal,) => {

    let body = {
        paymentMethod: paymentMethod,
        amount: amount,
        projectId: projectId,
        transectionId: txnId,
        coin: coin,
        coinValue: coinVal,
        name: vendorName,
        email: vendorEmail,
        checkBox: checkBox
    }

    let response = await postApiCaller('donation/add', body, { headers })
    return response;
}

export const updateVendor = async ({
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
    serviceType,
    vendorId,
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
    formData.append('serviceType', serviceType);
    formData.append('dateOfBirth', dateOfBirth);

    // Add file if present
    if (file) {
        formData.append('file', file);
    }
    const response = await putApiCaller(`vendor/profile/${vendorId}`, formData, { headers });
    return response;
};


export const getAllVendor = async ({ search = '', page = 1, limit = 10 }) => {
    page = page + 1
    try {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString(),
        });

        const response = await getApiCaller(`vendor/list/forAdmin?${params}`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching vendor data:', error);
        return { vendors: [], totalPages: 0, currentPage: 0, totalVendors: 0 };
    }
};

export const deleteVendor = async (id) => {

    try {
        const response = await deleteApiCaller(`vendor/byAdmin/${id}`, { headers });
        return response;
    } catch (error) {
        console.error('Error delet vendor :', error);
        return error;
    }
};
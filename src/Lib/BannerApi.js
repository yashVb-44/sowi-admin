import { deleteApiCaller, getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";
let adminToken = localStorage.getItem('adminToken')
let headers = {
    // 'Content-Type': 'application/json',
    Authorization: adminToken
}

export const addBanner = async ({
    name,
    bannerImage,
    type
}) => {
    try {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("bannerImage", bannerImage)
        formData.append("type", type)
        const response = await postApiCaller(`banner/add`, formData, { headers });
        return response;
    } catch (error) {
        return error
    }
};

export const updateBanner = async ({
    name,
    isActive,
    isDeleted,
    bannerId,
    bannerImage,
    type

}) => {
    try {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("isActive", isActive)
        formData.append("isDeleted", isDeleted)
        formData.append("bannerImage", bannerImage)
        formData.append("type", type)

        const response = await putApiCaller(`banner/update/${bannerId}`, formData, { headers });
        return response;
    } catch (error) {
        return
    }
};


export const getAllBanner = async ({ search = '', page = 1, limit = 10 }) => {
    page = page + 1
    try {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString(),
        });

        const response = await getApiCaller(`banner/list/forAdmin?${params}`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching banner data:', error);
        return { banners: [], totalPages: 0, currentPage: 0, totalBanners: 0 };
    }
};

export const deleteBanner = async (id) => {

    try {
        const response = await deleteApiCaller(`banner/delete/${id}`, { headers });
        return response;
    } catch (error) {
        console.error('Error delet banner :', error);
        return error;
    }
};
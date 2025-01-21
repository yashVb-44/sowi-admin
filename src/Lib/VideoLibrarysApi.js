import { deleteApiCaller, getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";
let adminToken = localStorage.getItem('adminToken')
let headers = {
    'Content-Type': 'application/json',
    Authorization: adminToken
}

export const addVideoLibrary = async ({
    title,
    text,
    link
}) => {
    try {
        const formData = {
            title,
            text,
            link
        }

        const response = await postApiCaller(`youtube/video/add`, formData, { headers });
        return response;
    } catch (error) {
        return error
    }
};

export const updateVideoLibrary = async ({
    name,
    isActive,
    title,
    text,
    link,
    videoLibraryId
}) => {
    try {
        const formData = {
            name,
            isActive,
            title,
            text,
            link,
        }

        const response = await putApiCaller(`youtube/video/update/${videoLibraryId}`, formData, { headers });
        return response;
    } catch (error) {
        return
    }
};


export const getAllVideoLibrary = async ({ search = '', page = 1, limit = 10 }) => {
    page = page + 1
    try {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString(),
        });

        const response = await getApiCaller(`youtube/video/list/forAdmin?${params}`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching video Library data:', error);
        return { videoLibrarys: [], totalPages: 0, currentPage: 0, totalVideoLibrarys: 0 };
    }
};

export const deleteVideoLibrary = async (id) => {

    try {
        const response = await deleteApiCaller(`youtube/video/${id}`, { headers });
        return response;
    } catch (error) {
        console.error('Error delet video Library :', error);
        return error;
    }
};
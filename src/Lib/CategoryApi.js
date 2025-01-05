import { getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";

export const createCategory = async (title, catImage, categoryTitle, categoryDescription, titleFarsi, categoryTitleFarsi, categoryDescriptionFarsi) => {
    let adminToken = sessionStorage.getItem('adminToken')
    let headers = {
        Authorization: `Bearer ${adminToken}`
    };

    let formData = new FormData();
    formData.append('title', title);
    formData.append('image', catImage);
    formData.append('categoryTitle', categoryTitle);
    formData.append('categoryDescription', categoryDescription);
    formData.append('titleFarsi', titleFarsi);
    formData.append('categoryTitleFarsi', categoryTitleFarsi);
    formData.append('categoryDescriptionFarsi', categoryDescriptionFarsi);

    try {
        let response = await postApiCaller('category/create', formData, { headers });
        return response;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};




export const getCategory = async () => {
    let headers = {
        'Content-Type': 'application/json',
    }

    let response = await getApiCaller('category/getAll', { headers })
    return response;
}
export const getCategoryById = async (id) => {
    let headers = {
        'Content-Type': 'application/json',
    }

    let response = await getApiCaller(`category/details/${id}`, { headers })
    return response;
}
export const deleteCategory = async (projectId) => {
    let adminToken = sessionStorage.getItem('adminToken')
    let headers = {
        Authorization: `Bearer ${adminToken}`
    };

    let response = await getApiCaller(`category/delete/${projectId}`, { headers })
    return response;
}

export const updateCategory = async (categoryId, categoryName, categoryImage, categoryTitle, categoryDescription, categoryNameFarsi, catTitleFarsi, catDescFarsi) => {
    let adminToken = sessionStorage.getItem('adminToken')
    let headers = {
        Authorization: `Bearer ${adminToken}`
    };


    let formData = new FormData();
    formData.append('image', categoryImage);
    formData.append('title', categoryName);
    formData.append('categoryTitle', categoryTitle);
    formData.append('categoryDescription', categoryDescription);
    formData.append('categoryNameFarsi', categoryNameFarsi);
    formData.append('catTitleFarsi', catTitleFarsi);
    formData.append('catDescFarsi', catDescFarsi);

    let response = await putApiCaller(`category/update/${categoryId}`, formData, { headers });
    return response;
};



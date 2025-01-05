import { getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";
export const createBlog = async (title, author, content, blogImage, titleFarsi, authorFarsi, contentFarsi ) => {
    let adminToken = sessionStorage.getItem('adminToken')
    try {
        // Construct headers
        let headers = {
            Authorization: `Bearer ${adminToken}`
        };

        // Construct FormData
        let formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('content', content);
        formData.append('featuredImage', blogImage);
        formData.append('titleFaris', titleFarsi);
        formData.append('authorFarsi', authorFarsi);
        formData.append('contentFarsi', contentFarsi);

        // Make the POST request
        let response = await postApiCaller('blog/create', formData, { headers });

        return response;
    } catch (error) {
        // console.error("Error creating blog:", error);
        // throw error;
    }
};


export const updateBlog = async (title, author, content, blogImage, blogId,  blogTitleFarsi, createrNameFarsi, contentFarsi) => {
    
    let adminToken = sessionStorage.getItem('adminToken')

    let headers = {
        Authorization: `Bearer ${adminToken}`
    };

    let formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('content', content);
    formData.append('featuredImage', blogImage);
    formData.append('titleFaris', blogTitleFarsi);
    formData.append('authorFarsi', createrNameFarsi);
    formData.append('contentFarsi', contentFarsi);

    let response = await putApiCaller(`blog/update/${blogId}`, formData, { headers });
    return response;
};

export const deleteBlog = async (blogId) => {
    let adminToken = sessionStorage.getItem('adminToken')
    let headers = {
        Authorization: `Bearer ${adminToken}`
    };

    let response = await getApiCaller(`blog/delete/${blogId}`, { headers })
    return response;
}

export const getAllBlog = async () => {
    let headers = {
        'Content-Type': 'application/json',
    }

    let response = await getApiCaller('blog/getAll', { headers })
    return response;
}

export const getBlogByID = async (blogId) => {
    let headers = {
        'Content-Type': 'application/json',
    }

    let response = await getApiCaller(`blog/getById/${blogId}`, { headers })
    return response;
}



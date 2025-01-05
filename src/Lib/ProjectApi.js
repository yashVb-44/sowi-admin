import { getApiCaller, postApiCaller, putApiCaller } from "./ApiCaller";
import green from '../Assets/green.png'
import Yellow from '../Assets/yellow.png'
import red from '../Assets/red.png'


export const createProject = async (projectName, projectNameFarsi, amount, category, description, descriptionFarsi, organisationName, organisationNameFarsi, organiserName, organiserNameFarsi, email, emailFarsi, file, verificationId ) => {
    let adminToken = sessionStorage?.getItem('adminToken');

    let headers = {
        Authorization: `Bearer ${adminToken}`
    };
    
    let formData = new FormData();
    formData.append('title', projectName);
    formData.append('titleFarsi', projectNameFarsi);
    formData.append('description', description);
    formData.append('descriptionFarsi', descriptionFarsi);
    formData.append('goalAmount', amount);
    formData.append('organisationName', organisationName);
    formData.append('organisationNameFarsi', organisationNameFarsi);
    formData.append('organiserName', organiserName);
    formData.append('organiserNameFarsi', organiserNameFarsi);
    formData.append('email', email);
    formData.append('emailFarsi', emailFarsi);
    formData.append('categoryId', JSON.stringify(category));
    formData.append('attachments', file);
    formData.append('verificationId', verificationId);


    let response = await postApiCaller('project/create', formData, { headers });
    return response;
};



export const editProject = async (projectName, projectNameFarsi, amount, category, description, descriptionFarsi, organisationName, organisationNameFarsi, organiserName, organiserNameFarsi, email, emailFarsi, file, projectId, verificationId, status) => {
    let adminToken = sessionStorage?.getItem('adminToken');

    let formData = new FormData();
    formData.append('title', projectName);
    formData.append('titleFarsi', projectNameFarsi);
    formData.append('description', description);
    formData.append('descriptionFarsi', descriptionFarsi);
    formData.append('goalAmount', amount);
    formData.append('organisationName', organisationName);
    formData.append('organisationNameFarsi', organisationNameFarsi);
    formData.append('organiserName', organiserName);
    formData.append('organiserNameFarsi', organiserNameFarsi);
    formData.append('email', email);
    formData.append('emailFarsi', emailFarsi);
    formData.append('categoryId', JSON.stringify(category));
    if (file) {
        formData.append('attachments', file);
    }
    formData.append('verificationId', verificationId);
    formData.append('status', status);

    let headers = {
        Authorization: `Bearer ${adminToken}`
        // 'Content-Type' is automatically set to 'multipart/form-data' by the browser for FormData
    };
    console.log(...formData)

    let response = await putApiCaller(`project/update/${projectId}`, formData, { headers });
    return response;
}

export const getAllProject = async () => {
    let headers = {
        'Content-Type': 'application/json',
    }

    let response = await getApiCaller('project/getall', { headers })
    return response;
}

export const deleteProject = async (projectId) => {
    let headers = {
        'Content-Type': 'application/json',
    }

    let response = await getApiCaller(`project/delete/${projectId}`, { headers })
    return response;
}

export const getProjectCategory = async (categoryId) => {
    let headers = {
        'Content-Type': 'application/json',
    }
    try {
        let response = await getApiCaller(`project/category/${categoryId}`, { headers })
        return response;
        
    } catch (error) {
        
    }
}
export const getProjectId = async (projectId) => {
    let headers = {
        'Content-Type': 'application/json',
    }
    try {
        let response = await getApiCaller(`project/${projectId}`, { headers })
        return response;
        
    } catch (error) {
        
    }
}


export const getImageSrc = (projectListData) => {
    switch (projectListData?.verification) {
        case '01':
            return green; 
        case '02':
            return red; 
        case '03':
            return Yellow;
        default:
            return ''; 
    }
};
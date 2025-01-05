import { getApiCaller, postApiCaller } from "./ApiCaller"

export const getSupport = async (id) => {
    
    let headers = {
        'Content-Type': 'application/json',
    }

    let response = await getApiCaller(`words-of-support/${id}`, {headers})
    return response;
}

export const createSupport = async (projectId, name, message, donatedAmt) => {
    
    let headers = {
        'Content-Type': 'application/json',
    }

    let body = {
        projectId : projectId,
        name : name,
        description : message,
        donatedAmount : donatedAmt
    }

    let response = await postApiCaller(`words-of-support/create`, body, {headers})
    return response;
}

import { getApiCaller, postApiCaller } from "./ApiCaller"
let adminToken = localStorage.getItem('adminToken')
let headers = {
    'Content-Type': 'application/json',
    Authorization: adminToken
}
export const userRegister = async (userName, email, password) => {

    let body = {
        'username': userName,
        'email': email,
        'password': password,
        'role': 'user'
    }

    let response = await postApiCaller('user/register', body, { headers })
    return response;
}

export const adminLogin = async (email, password) => {

    let body = {
        'name': email,
        'password': password
    }

    let response = await postApiCaller('admin/login', body, { headers })
    return response;
}

export const sendOtp = async (email) => {

    let body = {
        'email': email,
    }

    let response = await postApiCaller('user/send-otp', body, { headers })
    return response;
}

export const verifyOtp = async (email, otp) => {

    let body = {
        'email': email,
        'otp': otp
    }

    let response = await postApiCaller('user/verify-otp', body, { headers })
    return response;
}


export const updatePassword = async (email, newPassword, confirmPassword) => {

    let body = {
        'email': email,
        'newPassword': newPassword,
        'confirmPassword': confirmPassword
    }

    let response = await postApiCaller('user/reset-password', body, { headers })
    return response;
}


export const userInfo = async (adminToken) => {


    let response = await getApiCaller('user/getdetail', { headers })
    return response;
}


export const adminPasswordLink = async (email) => {

    let body = {
        email: email
    }
    let response = await postApiCaller('user/admin-reset-password', body, { headers })
    return response;
}

export const adminUpdatePassword = async (email, newPassword, confirmPassword) => {

    let body = {
        email: email,
        newPassword: newPassword,
        confirmPassword, confirmPassword
    }
    let response = await postApiCaller('user/admin-password-update', body, { headers })
    return response;
}

export const dashboardInfo = async () => {

    let response = await getApiCaller("homePage/dashboard/stats", { headers });
    return response;
};
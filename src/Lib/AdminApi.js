import { getApiCaller, postApiCaller } from "./ApiCaller"
let adminToken = sessionStorage.getItem('adminToken')
export const userRegister = async (userName, email, password) => {
    let headers = {
        'Content-Type': 'application/json',
    }

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
    let headers = {
        'Content-Type': 'application/json',
    }

    let body = {
        'name': email,
        'password': password
    }

    let response = await postApiCaller('admin/login', body, { headers })
    return response;
}

export const sendOtp = async (email) => {
    let headers = {
        'Content-Type': 'application/json',
    }

    let body = {
        'email': email,
    }

    let response = await postApiCaller('user/send-otp', body, { headers })
    return response;
}

export const verifyOtp = async (email, otp) => {
    let headers = {
        'Content-Type': 'application/json',
    }

    let body = {
        'email': email,
        'otp': otp
    }

    let response = await postApiCaller('user/verify-otp', body, { headers })
    return response;
}


export const updatePassword = async (email, newPassword, confirmPassword) => {
    let headers = {
        'Content-Type': 'application/json',
    }

    let body = {
        'email': email,
        'newPassword': newPassword,
        'confirmPassword': confirmPassword
    }

    let response = await postApiCaller('user/reset-password', body, { headers })
    return response;
}


export const userInfo = async (adminToken) => {

    let headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
    }


    let response = await getApiCaller('user/getdetail', { headers })
    return response;
}


export const adminPasswordLink = async (email) => {
    let headers = {
        'Content-Type': 'application/json',
    }
    let body = {
        email: email
    }
    let response = await postApiCaller('user/admin-reset-password', body, { headers })
    return response;
}

export const adminUpdatePassword = async (email, newPassword, confirmPassword) => {
    let headers = {
        'Content-Type': 'application/json',
    }
    let body = {
        email: email,
        newPassword: newPassword,
        confirmPassword, confirmPassword
    }
    let response = await postApiCaller('user/admin-password-update', body, { headers })
    return response;
}
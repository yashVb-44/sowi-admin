import { getApiCaller, postApiCaller } from "./ApiCaller"

// export const userRegister = async (userName, email, password) => {
//     let headers = {
//         'Content-Type': 'application/json',
//     }

//     let body = {
//         'username': userName,
//         'email' : email,
//         'password' : password,
//         'role': 'user'
//     }

//     let response = await postApiCaller('user/register', body, {headers})
//     return response;
// }


export const getBank = async () => {
    
    let headers = {
        'Content-Type': 'application/json',
    }


    let response = await getApiCaller('bank/bankdetails', {headers})
    return response;
}
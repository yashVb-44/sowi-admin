import { postApiCaller } from "./ApiCaller";

export const contactus = async (fullName, phoneNumber, subject, message) => {
    const headers = {
        "Content-Type": "application/json"
    };

    let body = {
        fullName: fullName,
        phoneNumber: phoneNumber,
        subject: subject,
        message: message
    }


    try {
        let response = await postApiCaller('contact/admin', body, { headers });
        return response;
    } catch (error) {

    }
};

import { getApiCaller, postApiCaller } from "./ApiCaller"

export const stripeRes = async (sessionUrl, projectId) => {

    let headers = {
        'Content-Type': 'application/json',
    }


    let response = await getApiCaller(`payment/stripe/${sessionUrl}`, { headers })
    return response;
}

export const paymentRes = async (projectId, gateWay, status, txnId, currency, amount, txnTime, userName, userEmail, checkBox) => {

    let headers = {
        'Content-Type': 'application/json',
    }

    let body = {
        projectId: projectId,
        paymentGateway: gateWay,
        status: status,
        txn_id: txnId,
        currency: currency,
        amount: amount,
        txn_time: txnTime,
        name : userName,
        email : userEmail,
        checkBox : checkBox
    }

    let response = await postApiCaller(`payment/payment-res`, body, { headers })
    return response;
}

export const cryptoPayment = async (amount, coin) => {

    let headers = {
        'Content-Type': 'application/json',
    }

    let body = {
        amount: amount,
        currency: coin
    }
    let response = await postApiCaller(`payment/crypto`, body, { headers })
    return response;
}

export const cryptoPaymentRes = async (txnId) => {

    let headers = {
        'Content-Type': 'application/json',
    }

    let body = {
        ipn_type: "api",
        ipn_mode: "hmac",
        ipn_id: txnId,
        otherField: "otherValue"
    }

    let response = await postApiCaller(`payment/crypto-process`, body, { headers })
    return response;
}

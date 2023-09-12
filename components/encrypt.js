import CryptoJS from 'crypto-js';

// Encryption function
export default function encryptString(text) {
    // const encryptedData = CryptoJS.AES.encrypt(text, 'MySecretKey123').toString();
    // const sanitizedEncryptedData = encryptedData.replace(/\//g, ''); // Remove '/'
    // return sanitizedEncryptedData;
    // const encryptedData = CryptoJS.AES.encrypt(text, 'MySecretKey123').toString(CryptoJS.format.Base64URL);

    // // Remove '/' characters
    // const sanitizedEncryptedData = encryptedData.replace(/\//g, '_');

    // return sanitizedEncryptedData;
    const encode = base64EncodeWithoutPadding(text);
    return urlEncode(encode);

}


function base64EncodeWithoutPadding(text) {
    const base64 = btoa(text); // Encode to Base64
    return base64.replace(/=/g, ''); // Remove padding
}
function urlEncode(text) {
    return encodeURIComponent(text);
}


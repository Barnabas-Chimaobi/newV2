import CryptoJS from 'crypto-js';


export default function decryptString(ciphertext) {
    try {
        var decode = urlDecode(ciphertext);
        return base64Decode(decode);
    } catch (error) {
        console.error('Decryption Error:', error);
        return null; // Handle the error or return an appropriate value
    }
}

// Decode the text from Base64
function base64Decode(text) {
    return atob(text); // Decode from Base64
}



// Function to URL-decode a string
function urlDecode(text) {
    return decodeURIComponent(text);
}

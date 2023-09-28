// Encryption function
export default function encryptString(text) {
	const encode = base64EncodeWithoutPadding(text);
	return urlEncode(encode);
}

function base64EncodeWithoutPadding(text) {
	const base64 = btoa(text); // Encode to Base64
	return base64.replace(/=/g, ""); // Remove padding
}
function urlEncode(text) {
	return encodeURIComponent(text);
}

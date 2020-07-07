export const compareEncryptedPasswords = async (password1: string, password2) => {
    const md5 = require('md5');
    return md5(password1) == password2;
}
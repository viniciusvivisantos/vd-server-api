export const encryptPassword = async (password: string) => {
    const md5 = require('md5');
    return await md5(password);
}
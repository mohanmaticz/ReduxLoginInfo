const path = require("path")
require('dotenv').config({path: path.join(__dirname, '..', 'env', '.env')})
const CryptoJS = require("crypto-js")

const decryptData = (req, res, next) => {
    const {encryptedData} = req.body
    if (!encryptedData) {
        res.status(404).json({
            message: 'No Data is provided'
        })
    }

    try {
        console.log("Data before decrypt", encryptedData);

        const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.CRYPTO_KEY);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        console.log("Data after decrypt", decryptedData);
        req.decryptedData = decryptedData;

        next()
    } catch (error) { 'Failed to decrypt data'
        console.log(error);
        return res.status(400).json({ message: 'Failed to decrypt data', error });
    }
}

module.exports = decryptData
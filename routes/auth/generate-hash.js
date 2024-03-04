const crypto = require('node:cypto')
const util = require('node:util')

const pbkdf2 = util.promisify(crypto.pbkdf2)

module.exports = async function generateHash (password, salt) {
    if(!salt) {
        salt = crypto.randomBytes(16).toString('hex')
    }

    const hash = (await pbkdf2(password, salt, 1000, 64, 'sha256')).toString('hex')
    return { salt, hash }
}
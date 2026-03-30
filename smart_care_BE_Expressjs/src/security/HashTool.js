const argon = require("argon2");
const crypto = require('crypto');
const {roleMapping} = require("../mapping/mapping");
require('dotenv').config()

class Hashtool{

    async Hash(pass){
        return await argon.hash(pass);
    }

    async CompareHash(haspass ,pass){
        return await argon.verify(haspass, pass);
    }

}

module.exports = Hashtool;
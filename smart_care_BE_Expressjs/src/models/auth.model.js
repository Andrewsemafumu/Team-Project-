const Hashtool = require("../security/HashTool")
const { prisma } = require("../config/connectSql");

class authModel{
    async login(loginData){
        try{
            const valid_phone = await prisma.user.findFirst(
                {
                    where: {phone   : loginData.email_phone},
                }) || null;
            
            const valid_email = await prisma.user.findFirst(
                {
                    where: {mail    : loginData.email_phone},
                }) || null;

            if(valid_phone){
                if(await new Hashtool().CompareHash(valid_phone.pass, loginData.pass)){
                    return valid_phone;
                }
            }

            if(valid_email){
                if(await new Hashtool().CompareHash(valid_email.pass , loginData.pass)){
                    return valid_email;
                }
            }

            return null;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async register(registerData){ 
        try{
            const u = await prisma.user.create({
                data:{
                    role            : 3,
                    ava             : 'defaultimg.jpg',
                    sex             : 1,
                    mail            : registerData.mail,
                    name            : registerData.name,
                    pass            : registerData.pass,
                    phone           : registerData.phone,
                }
            })
            delete u.pass;
            return u;
        }catch(error){
            console.log(error)
            return null;
        }
        
    }

    async checkExist(registerData){
        try{
            const valid_phone = await prisma.user.findUnique(
                {
                    where: {phone   : registerData.phone},
                }) || null;
            
            const valid_email = await prisma.user.findUnique(
                {
                    where: {mail    : registerData.mail},
                }) || null;

            if(valid_phone){
                return true;
            }

            if(valid_email){
                return true;
            }

            return false;
        }catch(error){
            console.log(error);
            return true;
        }
    }
}

module.exports = authModel;

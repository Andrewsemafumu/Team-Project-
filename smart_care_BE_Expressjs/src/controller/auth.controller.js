const loginModel = require("../models/auth.model")
const {roleMapping, roleMappingRaw} = require("../mapping/mapping");
const { LoginDTO } = require("../DTO/auth/LoginDTO");
const { RegisterDTO } = require("../DTO/auth/RegisterDTO");
const authModel = require("../models/auth.model");
const Hashtool = require("../security/HashTool");

class authController{
    async login(req, res){
        try{
            const loginData = LoginDTO(req);
            const userdata = await new loginModel().login(loginData);
            if(userdata){
                if(userdata.role !== null){
                    const token = JSON.stringify({"id" : userdata.id, "role": roleMapping(`${userdata.role}`)})
                    delete userdata.pass
                    res.status(200).send({
                        "message": "Login success!",
                        "userdata" : userdata,
                        "tokenizer" : token,
                        "role" : roleMapping(`${userdata.role}`)
                    });
                }else{
                    res.status(401).send({
                        "message":"Unauthorized!"
                    })
                }
            }else{
                res.status(401).send({
                    "message":"Unauthorized!"
                })
            }
        }catch(error){
            console.log(error)
            res.status(500).send({
                "message":"Server error!"
            })
        }
        
    }

    async register(req, res){
        try{
            const registerData = RegisterDTO(req);
            if(!await new authModel().checkExist(registerData)){
                registerData.pass = await new Hashtool().Hash(registerData.pass);
                const data = await new authModel().register(registerData);
                if(data){
                    res.status(200).send({
                        "message":"Success"
                    })
                }else{
                    res.status(500).send({
                        "message":"Server error!"
                    })
                }
            }else{
                res.status(409).send({
                    "message": "User existed!"
                });
            }
        }catch(error){
            res.status(500).send({
                "message":"Server error!"
            })
            console.log(error)
        }
    }
}


module.exports = authController;

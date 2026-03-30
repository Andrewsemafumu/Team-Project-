const { prisma } = require("../config/connectSql");
const loginModel = require("../models/auth.model");
const Hashtool = require("../security/HashTool");
const { roleMappingRaw } = require("../mapping/mapping");

class middelware{

    checkRole(roles){
        return async (req, res, next)=>{
            try{
                if(roles.length !== 0){
                    const tok_ = req.get("tokenizer");
                    if(tok_ !== 'null' && tok_ !== null && tok_ !== undefined){
                        try{
                            var tok = JSON.parse(req.get("tokenizer"));
                            if(tok === null){
                                return res.status(401).send({
                                    "message":"Unauthorized!"
                                })
                            }else{
                                if(!tok.role || !tok.id){
                                    return res.status(401).send({
                                        "message":"Unauthorized!"
                                    })
                                }else{
                                    const c = await prisma.user.count({
                                        where: {
                                            id: tok.id*1,
                                            role : roleMappingRaw(tok.role)
                                        }
                                    });

                                    if(c === 0)
                                        return res.status(401).send({
                                            "message":"Unauthorized!"
                                        })

                                    req.u = {
                                        BASEROLE : tok.role,
                                        BASEID : tok.id
                                    };
                                    next();
                                }
                            }
                        }catch(e){
                            return res.status(401).send({
                                "message":"Unauthorized!"
                            })
                        }
                    }else{
                        return res.status(401).send({
                            "message":"Unauthorized!"
                        })
                    }
                }else{
                    next();
                }
            }catch(err){
                console.log(err)
                res.status(401).send({
                    "message":"Unauthorized!"
                })
            }
        }
    }
}

const mw = new middelware();
module.exports = mw
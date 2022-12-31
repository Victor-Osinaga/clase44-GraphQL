import { adminBoolean } from "../../middlewares/auth.js"

// redireccionamiento a sus respectivos HOME
const getHome = async function (req,res) {
    if(await adminBoolean(req)){
        res.send({status: "ok", data: `bienvenido ADMIN ${req.user.username} tienes acceso a /api/v1/admin/home`})
    }else{
        res.send({status: "ok", data: `bienvenido USER ${req.user.username} tienes acceso a /api/v1/user/home`})
    }
}

export {getHome}
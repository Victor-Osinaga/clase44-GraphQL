import {usersDAO} from '../DAO/usersDAO.js'

function requiredAutentication(req, res, next){
    if(req.isAuthenticated()){
        next()
    }else{
        // res.status(401).redirect('/api/v1/auth/login')
        res.status(401).send({status: "failed", data: "Porfavor, logueate en /api/v1/auth/login o /api/v1/auth/register"})
        
    }
}

function isLoged(req,res,next){
    if(req.isAuthenticated()){
        console.log("estás logeado, vas al home de admin o user");
        // res.status(200).redirect('/api/v1/admin/home')
        res.status(200).send({status: "failed", data: "ya estás logeado porfavor ve a /api/v1/home"})
    }else{
        next()
    }
}

async function isAdmin(req,res,next){
    let user = await usersDAO.getUserbyUsername(req.user.username)
    if(user.admin){
        console.log("desde auth middleware, es admin:", user.admin)
        next()
    }else{
        res.send({status: "failed", data: "No eres Admin", info: "Ve a: '/api/v1/user/home'"})
    }
}

async function adminBoolean(req){
    let user = await usersDAO.getUserbyUsername(req.user.username)
    return user.admin
}

export {
    requiredAutentication,
    isLoged,
    isAdmin,
    adminBoolean
}
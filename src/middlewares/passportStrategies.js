import { Strategy } from 'passport-local'

import { userServices } from '../services/usersServices/factoryUser.js'

export const registroLocal = new Strategy({
    passReqToCallback: true,
},
    async(req,username,password,done)=> {
        try {
            const usuario = await userServices.registerUser(req.body)
            console.log("passport-strategies, usuario registrado", usuario);
            done(null, usuario)
        } catch (error) {
            console.log("error en register", error);
            done(null, false, error)
        }
    }
)

export const loginLocal = new Strategy(
    async (username, password, done)=> {
        try {
            const usuario = await userServices.autenticarUsuario(username, password)
            done(null, usuario)
        } catch (error) {
            console.log("error en logeo", error);
            done(null, false, error)
        }
    }
)
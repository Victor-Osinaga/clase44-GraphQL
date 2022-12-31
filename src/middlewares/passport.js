import passport from 'passport';

import * as strategies from './passportStrategies.js'
import { userServices } from '../services/usersServices/factoryUser.js';

passport.use('registro', strategies.registroLocal)
passport.use('login', strategies.loginLocal)

export const passportMiddleware = passport.initialize()

passport.serializeUser((user, done) => {
    done(null, user.id)
    console.log("desde passport middleware, id:", user.id);
})

passport.deserializeUser( async (id, done) => {
    try {
        const user = await userServices.getById(id)
        // console.log(user);
        if(!user){
            done(null, false)
        }
        done(null, user)
    } catch (error) {
        console.log("desde passport", error);
        done(error)
    }
})

export const passportSessionHandler = passport.session()
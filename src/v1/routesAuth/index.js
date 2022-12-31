import Router from 'express'
import * as auth from '../../middlewares/auth.js'

import * as authControllers from '../../controllers/authControllers/index.js';

const v1RouterAuth = new Router()

// register
v1RouterAuth.get('/register', auth.isLoged, authControllers.getRegisterController)
v1RouterAuth.post('/register', auth.isLoged, authControllers.registerController)

// login
v1RouterAuth.get('/login', auth.isLoged, authControllers.getLoginController)
v1RouterAuth.post('/login', auth.isLoged, authControllers.loginController)

v1RouterAuth.get('/logout', auth.requiredAutentication, authControllers.logoutController)

export {v1RouterAuth}
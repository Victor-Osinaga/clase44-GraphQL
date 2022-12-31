import Router from 'express'

import * as homeAdminControllers from '../../controllers/getAdminHomeControllers/index.js'
import { requiredAutentication, isAdmin, isLoged } from '../../middlewares/auth.js';

const v1RouterAdminHome = new Router()

// views ADMIN
v1RouterAdminHome.get('/home', requiredAutentication, isAdmin, homeAdminControllers.getAdminHome);
v1RouterAdminHome.get('/info', requiredAutentication, isAdmin, homeAdminControllers.processInfo);

export {v1RouterAdminHome}
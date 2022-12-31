import Router from 'express'

import * as homeUserControllers from '../../controllers/getUserHomeControllers/index.js'
import { requiredAutentication } from '../../middlewares/auth.js';

const v1RouterUserHome = new Router()

v1RouterUserHome.get('/home', requiredAutentication, homeUserControllers.getUserHome);


export {v1RouterUserHome}
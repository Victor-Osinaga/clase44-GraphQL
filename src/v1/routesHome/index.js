import Router from "express";
import * as homeControllers from '../../controllers/homeControllers/index.js';
import { requiredAutentication } from '../../middlewares/auth.js'

const v1RouterHome = new Router()

v1RouterHome.get('/', requiredAutentication, homeControllers.getHome)

export {v1RouterHome}
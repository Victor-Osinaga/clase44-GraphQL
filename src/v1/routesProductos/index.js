import Router from 'express'
import * as productsControllers from '../../controllers/productsControllers/index.js'
import {isAdmin, requiredAutentication} from '../../middlewares/auth.js';

const v1RouterProductos = new Router()

v1RouterProductos.get('/', requiredAutentication, productsControllers.getAllProductsController);
v1RouterProductos.post('/', requiredAutentication, isAdmin, productsControllers.createProductController);
v1RouterProductos.get('/:id', requiredAutentication, productsControllers.getProductByIdController);
v1RouterProductos.delete('/:id', requiredAutentication, isAdmin, productsControllers.deleteByIdController);
v1RouterProductos.put('/:id', requiredAutentication, isAdmin, productsControllers.updateByIdController);

export {v1RouterProductos}
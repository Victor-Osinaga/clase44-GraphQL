import Router from 'express'
import * as cartsControllers from '../../controllers/cartsControllers/index.js'
import { requiredAutentication } from '../../middlewares/auth.js';

const v1RouterCarritos = new Router()

v1RouterCarritos.post('/', requiredAutentication, cartsControllers.createCartController)
v1RouterCarritos.get('/:carritoId/productos', requiredAutentication, cartsControllers.getProductsCartController);
v1RouterCarritos.post('/:carritoId/productos', requiredAutentication, cartsControllers.createProductToCartController);
v1RouterCarritos.delete('/:carritoId/productos', requiredAutentication, cartsControllers.deleteProductFromCartController);
v1RouterCarritos.delete('/:carritoId', requiredAutentication, cartsControllers.deleteAllProductsFromCartController);

export {v1RouterCarritos}
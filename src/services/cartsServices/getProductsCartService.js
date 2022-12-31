import {cartsDAO} from '../../DAO/cartsDAO.js';

const getProductsCartService = async (cartId) => {
    try {
        const carritoId = Number(cartId)
        if (carritoId <= 0 || isNaN(carritoId) /*|| carritoId !== Number*/){
            throw {msg : "the cart's id is malformed, please enter an integer", data:`cart id: ${cartId}`}
        }
        
        const cart = await cartsDAO.getCartById(carritoId)
        if(!cart){
            throw {msg: "the cart's id is not register", data: `cart id: ${carritoId}`}
        }

        const productsCart = await cartsDAO.getProductsCart(carritoId)
        return productsCart
        
    } catch (error) {
        console.log("info error", error)
        throw error
    }
}

export {getProductsCartService}

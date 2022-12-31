import {cartsDAO} from '../../DAO/cartsDAO.js';

const deleteAllProductsFromCartService = async (params) => {
    try {
        const idCart = Number(params.carritoId)
        if (idCart <= 0 || isNaN(idCart)){
            throw {msg:"the cart's id is malformed, please enter an integer", data: `cart id: ${params.carritoId}`}
        }

        const cart = await cartsDAO.getCartById(idCart)
        if(!cart){
            throw {msg: "the cart's id not is register", data: `cart id: ${idCart}`}
        }

        const result = await cartsDAO.deleteAllProductsFromCart(idCart)
        return result
    } catch (error) {
        console.log("info error", error);
        throw error
    }
}

export {deleteAllProductsFromCartService}
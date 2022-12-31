import {cartsDAO} from '../../DAO/cartsDAO.js';

const deleteProductFromCartService = async (params, body)=>{
    try {
        if(Object.entries(body).length === 0){
            throw {msg: "the request's body is empty"}
        }else if(!body.id){
            throw {msg: "the body's id is required"}
        }

        let idCart = Number(params.carritoId)
        let idProduct = Number(body.id)
        if ((idProduct <= 0) || (idCart <= 0) || (isNaN(idProduct)) || (isNaN(idCart))){
            throw {msg:"the product's or cart's id is malformed, please enter an integer", data: `product id: ${body.id}, cart id: ${params.carritoId}`}
        }

        const allCarts = await cartsDAO.getAllCarts()
        const cart = await allCarts.find(e=>e.id == idCart)
        if (!cart){
            throw {msg: "the cart's id is not register", data: `id: ${idCart}`}
        }

        let productsCart = await cart.products
        if(!productsCart){
            throw {msg: "this cart is empty"}
        }

        let productIndex = await productsCart.findIndex((prod) => prod.id == idProduct);
        if(productIndex > -1){
            productsCart = productsCart.slice(0, productIndex).concat(productsCart.slice(productIndex + 1));
            const result = await cartsDAO.deleteProductFromCart(idProduct, idCart, productsCart)
            return result
        }else{
            throw {msg: "the product's id is not register in this cart", data: `id: ${idProduct}`}
        }
    } catch (error) {
        console.log("info error", error);
        throw error
    }
}

export {deleteProductFromCartService}
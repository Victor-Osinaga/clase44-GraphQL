import {cartsDAO} from '../../DAO/cartsDAO.js';

const createProductToCartService = async (params, body) => {
    try {
        if(Object.entries(body).length === 0){
            throw {msg: "the request's body is empty"}
        }else if(!body.id){
            throw {msg: "the body's id is required"}
        }

        let idProduct = Number(body.id)
        let idCart = Number(params.carritoId)
        if ((idProduct <= 0) || (idCart <= 0) || (isNaN(idProduct)) || (isNaN(idCart))){
            throw {msg:"the product's or cart's id is malformed, please enter an integer", data: `product id: ${body.id}, cart id: ${params.carritoId}`}
        }

        const allCarts = await cartsDAO.getAllCarts()
        const cart = await allCarts.find(e=>e.id == idCart)
        if (!cart){
            throw {msg: "the cart's id is not register", data: `id: ${idCart}`}
        }

        const allProducts = await cartsDAO.getAllProducts()
        if(!allProducts) throw {msg: "The product's database is empty"}

        const productToAdd = allProducts.find(e=>e.id == idProduct)
        if(!productToAdd) throw {msg: "The product's id is not register", data: `id: ${idProduct}`}

        const result = await cartsDAO.createProductToCart(idCart, idProduct)
        return result 
    } catch (error) {
        console.log("info error", error)
        throw error
    }
}

export {createProductToCartService}
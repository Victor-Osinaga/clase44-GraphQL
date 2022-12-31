import {cartsDAO} from '../../DAO/cartsDAO.js';

const createCartService = async (req, res) => {
    try {
        const allCarts = await cartsDAO.getAllCarts()
        const lastCartId = await allCarts[allCarts.length - 1].id
        const newData = (i)=>{ return {id: i,products: []}}
        
        if (allCarts == 0){
            const result = await cartsDAO.createCart(newData(1))
            return result
        }else{
            const newId = lastCartId + 1
            const result = await cartsDAO.createCart(newData(newId))
            return result
        }
    } catch (error) {
        console.log("info error", error);
        throw {msg: "server error", data: error.code}
    }
}

export {createCartService}
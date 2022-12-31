import {productsDAO} from '../../DAO/productsDAO.js';

const getProductByIdService = async (id) => {
    try {
        const idProduct = Number(id)
        if (idProduct <= 0 || isNaN(idProduct) /*|| carritoId !== Number*/){
            console.log("desde services", id);
            throw {msg:"the product's id is malformed, please enter an integer", data: `${id}`}
        }
        const allProducts = await productsDAO.getAll()
        const deletedProduct = await allProducts.find(e=>e.id == id)
        if(!deletedProduct){
            throw {msg: "the product's id is not register", data: idProduct}
        }
        
        const productById = await productsDAO.getProductById(Number(id));
        return productById
        
    } catch (error) {
        console.log("info error", error);
        throw error
    }
}

export {getProductByIdService}
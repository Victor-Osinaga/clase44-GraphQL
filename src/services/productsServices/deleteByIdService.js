import {productsDAO} from '../../DAO/productsDAO.js';

const deleteByIdService = async (id) => {
    try {
        const idProduct = Number(id)
        if (idProduct <= 0 || isNaN(idProduct)){
            throw {msg:"the product id is malformed, please enter an integer", data: `${id}`}
        }

        
        const allProducts = await productsDAO.getAll()
        const deletedProduct = await allProducts.find(e=>e.id == id)
        if(!deletedProduct){
            throw {msg: "the product's id is not register", data: id}
        }
        const result = await productsDAO.deleteById(Number(id));
        return deletedProduct
    } catch (error) {
        console.log("info error", error);
        throw error
    }
}

export {deleteByIdService}
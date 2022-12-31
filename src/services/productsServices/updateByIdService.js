import {productsDAO} from '../../DAO/productsDAO.js';

const updateByIdService = async (id, body) => {
    try {
        if(Object.entries(body).length === 0){
            throw {msg: "the request's body is empty"}
        }
        let idProduct = Number(id)
        if (idProduct <= 0 || isNaN(idProduct)){
            throw {msg:"the product's id is malformed, please enter an integer", data: `${id}`}
        }

        const allProducts = await productsDAO.getAll()
        const productToUpdate = await allProducts.find(e=>e.id == idProduct)
        const alreadyProductName = allProducts.find(e=>e.name == body?.name?.toLowerCase())
        if(!productToUpdate){
            throw {msg: "the product's id is not register", data: `${idProduct}`}
        }else if(alreadyProductName){
            throw {msg: "the product's name is already register", data: `${body.name}`}
        }

        const updatedProduct = await productsDAO.updateById(idProduct, body, productToUpdate);
        return updatedProduct
    } catch (error) {
        console.log("error info", error);
        throw error
    }
}

export {updateByIdService}

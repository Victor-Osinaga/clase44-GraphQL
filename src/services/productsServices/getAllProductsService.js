import {productsDAO} from '../../DAO/productsDAO.js';

const getAllProductsService = async () => {
    try {
        const allProductos = await productsDAO.getAll();
        return allProductos
    } catch (error) {
        console.log("info error", error);
        throw error
    }
}

export {getAllProductsService}
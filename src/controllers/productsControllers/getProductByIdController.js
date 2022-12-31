import * as productsServices from '../../services/productsServices/index.js'

const getProductByIdController = async (id)=> {
    try {
        const productById = await productsServices.getProductByIdService(id);
        if (productById){
            // res.send({ staus: 'OK', data: productById })
            return productById
        }else{
            // res.send({ staus: 'OK', data: `El producto con el id ${req.params.id} no existe` })
            return { staus: 'OK', data: `El producto con el id ${id} no existe` }
        }
    } catch (error) {
        if(error.msg == "the product's id is malformed, please enter an integer"){
            return {status: "failed", data: {error: `${error.msg}: ${error.data}`}}
        }else if(error.msg == "the product's id is not register"){
            return{status: "failed", data: {error: `${error.msg}: ${error.data}`}}
        }
    }
}

export {getProductByIdController}
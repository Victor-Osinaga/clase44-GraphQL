import * as productsServices from '../../services/productsServices/index.js'

const createProductController = async (data) => {
    try {
        const savedProduct = await productsServices.createProductService(data)
        return savedProduct
        // res.status(200).send({ status: 'OK', data: savedProduct })
    } catch (error) {
        if(error.msg == "the request's body is empty"){
            res.status(400).send({status: "failed", data: {error: error.msg, info: error.data}})
        }else if(error.msg == "the request's data is missing"){
            res.status(400).send({status: "failed", data: {error: error.msg, info: error.data}})
        }else if(error.msg == "the product's name is already register"){
            res.status(400).send({status: "failed", data: {error: error.msg, info: error.data}})
        }
    }
}

export {createProductController}
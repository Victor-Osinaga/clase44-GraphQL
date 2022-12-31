import * as cartsServices from '../../services/cartsServices/index.js'

const createProductToCartController = async (req, res) =>{
    try {
        const params = req.params
        const body = req.body
        const result = await cartsServices.createProductToCartService(params, body)
        res.status(200).send({status: "OK", data: result})
    } catch (error) {
        if(
            error.msg === "the request's body is empty" || 
            error.msg === "the body's id is required" || 
            error.msg === "The product's database is empty"
        ){
            res.status(400).send({status: "failed", data: {error: `${error.msg}`}})
        }else if(
            error.msg === "the product's or cart's id is malformed, please enter an integer" || 
            error.msg === "the cart's id is not register" || 
            error.msg === "The product's id is not register"
        ){
            res.status(400).send({status: "failed", data: {error: `${error.msg}: ${error.data}`}})
        }
    }
}

export {createProductToCartController}
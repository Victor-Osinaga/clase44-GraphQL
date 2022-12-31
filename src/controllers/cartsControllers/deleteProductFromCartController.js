import * as cartsServices from '../../services/cartsServices/index.js'

const deleteProductFromCartController = async (req, res) => {
    try {
        const params = req.params
        const body = req.body
        const result = await cartsServices.deleteProductFromCartService(params, body)
        res.status(200).send({status: "ok", data: result})
    } catch (error) {
        if(
            error.msg === "the body's id is required" || 
            error.msg === "the request's body is empty" || 
            error.msg === "this cart is empty"
        ){
            res.status(400).send({status: "failed", data: {error: `${error.msg}`}})
        }else if(
            error.msg === "the product's or cart's id is malformed, please enter an integer" || 
            error.msg === "the cart's id is not register" || 
            error.msg === "the product's id is not register in this cart"
        ){
            res.status(400).send({status: "failed", data: {error: `${error.msg}: ${error.data}`}})
        }
    }
}

export {deleteProductFromCartController}
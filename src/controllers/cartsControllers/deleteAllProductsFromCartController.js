import * as cartsServices from '../../services/cartsServices/index.js'

const deleteAllProductsFromCartController = async(req, res) => {
    try {
        const params = req.params
        const result = await cartsServices.deleteAllProductsFromCartService(params)
        res.status(200).send({status: "ok", data: result})
    } catch (error) {
        if(
            error.msg === "the cart's id is malformed, please enter an integer" || 
            error.msg === "the cart's id not is register"
        ){
            res.status(400).send({status: "failed", data: {error: `${error.msg}: ${error.data}`}})
        }
    }
}

export {deleteAllProductsFromCartController}
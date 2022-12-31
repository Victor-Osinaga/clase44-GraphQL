import * as cartsServices from '../../services/cartsServices/index.js'

const getProductsCartController = async (req, res) => {
    try {
        const {carritoId} = req.params
        const productsCart = await cartsServices.getProductsCartService(carritoId)
        res.send({status: "OK", data: productsCart})
    } catch (error) {
        if(
            error.msg === "the cart's id is malformed, please enter an integer" || 
            error.msg === "the cart's id is not register"
        ){
            res.status(400).send({status: "failed", data: {error: `${error.msg}: ${error.data}`}})
        }
    }
}

export {getProductsCartController}
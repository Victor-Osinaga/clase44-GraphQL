import * as cartsServices from '../../services/cartsServices/index.js'

const createCartController = async (req, res) => {
    try {
        const result = await cartsServices.createCartService()
        res.send({status: "OK", data: result})
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "failed", data: {error: `${error.msg}: ${error.data}`}})
    }
}

export {createCartController}
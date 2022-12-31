import CartsMONGO from '../container/CartsMONGO.js'
import cartSchema from '../models/cartSchema.js'
import parseArgs from 'minimist'

const options = { default: {PORT: 8080, DAO: "mongoAtlas"}, alias: {p: "PORT", d: "DAO"}}
const DAO = parseArgs(process.argv.slice(2), options).DAO

let cartsDAO;
switch (DAO) {
    case 'mongoAtlas':
        cartsDAO = new CartsMONGO('carts', cartSchema)
    break;

    default:
        cartsDAO = new CartsMONGO('carts', cartSchema)
    break;
}

export {
    cartsDAO,
}


// const cartsDAO = new CartsMONGO('carts', cartSchema)

// export {
//     cartsDAO
// }

// const cartsExtend = class cartsDAO extends CartsMONGO{}
// export const cartDAO = new cartsExtend('carts', cartSchema)
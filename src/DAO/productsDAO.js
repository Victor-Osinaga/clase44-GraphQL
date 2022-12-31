import ProductsMONGO from '../container/ProductsMONGO.js'
import productSchema from '../models/productSchema.js'
import parseArgs from 'minimist'

const options = { default: {PORT: 8080, DAO: "mongoAtlas"}, alias: {p: "PORT", d: "DAO"}}
const DAO = parseArgs(process.argv.slice(2), options).DAO

let productsDAO;
switch (DAO) {
    case 'mongoAtlas':
        productsDAO = new ProductsMONGO('products', productSchema);
    break;

    default:
        productsDAO = new ProductsMONGO('products', productSchema);
    break;
}

export {
    productsDAO,
}

// const productsDAO = new ProductsMONGO('products', productSchema)

// export {
//     productsDAO,
// }

// const productExtend = class productsDAO extends ProductsMONGO{}
// export const productsDAO = new productExtend('products', productSchema)
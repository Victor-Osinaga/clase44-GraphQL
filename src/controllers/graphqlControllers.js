import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import * as productsControllers from './productsControllers/index.js'

const productSchemaGraphQL = buildSchema(`
    type Producto {
        id: ID!
        name : String
        description: String
        photo: String
        price: Int
        code: String
        stock: Int
        timestamp: String
    }
    input ProductoUpdateInput {
        name: String
        description: String
        photo: String
        price: Int
        stock: Int
    }
    input ProductoCreateInput {
        name: String!
        description: String!
        photo: String!
        price: Int!
        stock: Int!
    }
    type Query {
        getProducts: [Producto],
        getProductById(id: ID!): Producto
    }
    type Mutation{
        deleteProductById(id: ID!): Producto,
        updateProductById(id: ID!, data: ProductoUpdateInput): Producto,
        createProduct(data: ProductoCreateInput): Producto
    }
`)

class ControllersApi{
    constructor(){}
    async getProducts(){
        const p = await productsControllers.getAllProductsController()
        return p
    }
    async getProductById({id}){
        return await productsControllers.getProductByIdController(id)
    }
    async deleteProductById({id}){
        return await productsControllers.deleteByIdController(id)
    }
    async updateProductById({id, data}){
        return await productsControllers.updateByIdController(id, data)
    }
    async createProduct({data}){
        const createdProduct = await productsControllers.createProductController(data)
        return createdProduct
    }
}

class v1GraphqlControllers {
    constructor(){
        const api = new ControllersApi()
        return graphqlHTTP((
            async (request, response, graphQLParams) => ({
                schema: productSchemaGraphQL,
                rootValue: {
                    getProducts: api.getProducts,
                    getProductById: api.getProductById,
                    deleteProductById: api.deleteProductById,
                    updateProductById: api.updateProductById,
                    createProduct: api.createProduct
                },
                graphiql: true,
            }))
        )
    }
}

export {
    v1GraphqlControllers,
}
import mongoose from 'mongoose'
import {config} from '../../config.js'

// nuevo cambio en mongoose 7
mongoose.set('strictQuery', false);

await mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: false
})

export default class CartsMONGO {
  constructor(collection, schema){
    this.collection = mongoose.model(collection, schema);
  }
  
  async getAllCarts(){
    const carts = await this.collection.find({}).lean()
    return carts
  }

  async createCart(data) {
      const cart = new this.collection(data)
      const savedCart = await cart.save(data)
      return await this.collection.find({id : data.id}, { _id: 0, __v: 0 }).lean();
  }
  async getCartById(i) {
    return await this.collection.findOne({ id: i }, { _id: 0, __v: 0 }).lean();
  }
  
  async createProductToCart(idCart, idProduct){
    const productsCollection = mongoose.model('products')
    const productToAdd = await productsCollection.findOne({ id: idProduct }, { _id: 0, __v: 0, timestamp: 0 }).lean();
    
    const cart = await this.getCartById(idCart)
    const products = await cart.products
    const productExist = await cart.products.find(e=>e.id == idProduct)

    let newObject;
    if(!productExist){
      let newObject = {...productToAdd, quantity: 1}
      // console.log(newObject);
      cart.products.push(newObject)
      await this.collection.updateOne(
        { id: idCart },
        {
          $set: {
            products: cart.products,
          },
        }
      )
      return newObject
    }else{
      const productIndex = cart.products.findIndex((prod) => prod.id == idProduct);
      // console.log("index", productIndex);
      cart.products = cart.products.slice(0, productIndex).concat(cart.products.slice(productIndex + 1));
      // console.log("after cartProducts", cart.products);
      let newObject = {...productToAdd, quantity: (productExist.quantity + 1)}
      // console.log("productExist", productExist.quantity + 1);
      // console.log(newObject);
      cart.products.push(newObject)
      // console.log("before products", cart.products)
      await this.collection.updateOne(
        { id: idCart },
        {
          $set: {
            products: cart.products,
          },
        }
      )
      return newObject
    }
  }
  
  async getProductsCart(i){
      const cart = await this.getCartById(i)
      const products = await cart.products
      return products
  }

  async getAllProducts(){
    const productsCollection = mongoose.model('products')
    const products = await productsCollection.find({}, { _id: 0, __v: 0 }).lean()
    return products
  }

  async deleteProductFromCart(productoId, carritoId, productsCart){
    const result = await this.collection.updateOne(
      { id: carritoId },
      {
        $set: {
          products: productsCart,
        },
      }
    );
    const cart = await this.getCartById(carritoId)
    const prod = cart.products
    return prod
  }

  async deleteAllProductsFromCart(carritoId){
    await this.collection.updateOne(
      { id: carritoId },
      {
        $set: {
          products: [],
        },
      }
    );
    const cart = await this.getCartById(carritoId)
    const prod = cart.products
    return prod
  }
}
import mongoose from 'mongoose'
import {config} from '../../config.js'

// nuevo cambio en mongoose 7
mongoose.set('strictQuery', false);

await mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: false
})

export default class ProductsMONGO {
    constructor(collection, schema){
        this.collection = mongoose.model(collection, schema);
    }

    async getAll() {
        return await this.collection.find({}, { _id: 0, __v: 0 }).lean();
    }

    async createProduct(data) {
        const product = new this.collection(data)
        const savedProduct = await product.save(data) //savedProduct Con _id y __v
        const findProduct = await this.collection.findOne({id : data.id}, { _id: 0, __v: 0 }).lean();
        return findProduct
    }

    async getProductById(i) {
        return await this.collection.findOne({ id: i }, { _id: 0, __v: 0 }).lean();
    }

    async deleteById(i) {
        await this.collection.deleteOne({ id: i });
    }

    async updateById(i, body, productToUpdate) {
      const update = await this.collection.updateOne(
        { id: i },
        {
          $set: {
            id: i,
            name: body.name?.toLowerCase() || productToUpdate.name,
            description: body.description?.toLowerCase() || productToUpdate.description,
            photo: body.photo || productToUpdate.photo,
            price: body.price || productToUpdate.price,
            code: productToUpdate.code,
            stock: body.stock || productToUpdate.stock,
            timestamp: productToUpdate.timestamp
          },
        }
      );
      const newProduct = await this.getProductById(i)
      return newProduct
    }
}
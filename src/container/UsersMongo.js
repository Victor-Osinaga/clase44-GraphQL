import mongoose from 'mongoose'
import {config} from '../../config.js'

// nuevo cambio en mongoose 7
mongoose.set('strictQuery', false);

await mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: false
})

export default class UsersMONGO {
  constructor(collection, schema){
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
        return await this.collection.find({}, { _id: 0, __v: 0 }).lean();
    } catch (error) {
      throw new Error(error)
    }
  };

  async getUserbyUsername(username){
    try {
      const user = await this.collection.findOne({username}, { _id: 0, __v: 0 }).lean();

      // si no encuentra ese dato mongoose devuelve null
      if (!user) return null
      return user
    } catch (error) {
      console.log(error)
    }
  }

  async getUserById(i){
    try {
        const user = await this.collection.findOne({ id: i }, { _id: 0, __v: 0 }).lean();
        if(!user) throw new Error('datos incorrectos')
        return user
    } catch (error) {
        console.log(error);
    }
  }

  async save(obj) {
    try{
      // const allObjs = await this.getAll()
      // console.log(allObjs);
      // const id = !allObjs.length ? 1 : parseInt(allObjs[allObjs.length - 1].id) + 1
      // if (isNaN(id)) throw new Error('ID_ERR: No se pudo asignar id al documento.')
      // obj.id = id.toString()
      const obje = new this.collection(obj)
      const saved = obje.save()
      // await this.collection.insertOne(obj);
    }catch(error){
      console.log(error)
    }
  };
}
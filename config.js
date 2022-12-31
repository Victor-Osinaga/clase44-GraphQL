import fs from 'fs'
import MongoStore from 'connect-mongo'
import { config as dotenv } from 'dotenv';
dotenv()

// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// const mongoUrl = JSON.parse(await fs.promises.readFile(__dirname + '/mongodb.json', 'utf-8'))
const mongoUrl = process.env.MONGO_URI
// const PERS = process.env.PERS || "mongoAtlas"
const config = {
    mongoUrl,
    sessionConfig: {
        store: MongoStore.create({mongoUrl, ttl: 600}),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }
}

export {
    config,
    // PERS
}
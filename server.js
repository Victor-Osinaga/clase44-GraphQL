import {app} from './app.js';
import parseArgs from 'minimist'

const options = { default: {PORT: 8080, DAO: "mongoAtlas"}, alias: {p: "PORT", d: "DAO"}}
const PORT = parseArgs(process.argv.slice(2), options).PORT

// const PORT = process.env.PORT || 8080

const connectServer = app.listen(PORT, ()=>{
    console.log(`Listening server on PORT ${connectServer.address().port}`);
})

connectServer.on('error', (error)=>{
    console.log(`Server error ${error}`);
})
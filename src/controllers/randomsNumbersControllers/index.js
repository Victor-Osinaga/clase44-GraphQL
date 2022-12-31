import { fork } from 'child_process'

const getRandomsNumbers = async (req, res) => {
        let cantidad = req.query.cant ?? 100000
        const forking = fork('src/utils/randomsNumbers.js')

        forking.on('message', (mensaje)=> {
            if (mensaje === 'okey'){
                forking.send(cantidad)
            } else {
                res.json(mensaje)
            }
        })
}

export {getRandomsNumbers}
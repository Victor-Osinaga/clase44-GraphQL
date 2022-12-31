import Router from 'express'
import * as randomsNumbersControllers from '../../controllers/randomsNumbersControllers/index.js';

const v1RouterRandomsNumbers = new Router()

v1RouterRandomsNumbers.get('/', randomsNumbersControllers.getRandomsNumbers)

export {
    v1RouterRandomsNumbers,
}
import session from 'express-session'
import {config} from '../../config.js'

export const sessionHandler = session(config.sessionConfig)
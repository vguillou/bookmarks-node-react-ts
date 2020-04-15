import os from 'os'
import { Router } from 'express'

const healthcheckRouter = Router()

healthcheckRouter.get('/', (_req, res) =>
    res.send({
        status: 'OK',
        uptime: process.uptime(),
        host: os.hostname(),
    })
)

export default healthcheckRouter

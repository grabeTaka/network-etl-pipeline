import express from 'express'
import mongoose from 'mongoose'

import { join, resolve } from 'path'
import { addAliases } from 'module-alias'

import config from '@/config/database/index'

const app = express()

async function startServer() {
    await mongoose.connect(config.mongoURI)

    const bodyParser = require('body-parser')

    const srcDir = join(__dirname, '..')
    addAliases({ '@': resolve(srcDir) })

    app.use(bodyParser.json())

    app.get('/healthcheck', (req, res) => {
        res.status(200).json({
            status: 'ok',
            message: 'API is running',
            timestamp: new Date(),
        })
    })

    app.listen(3000, () => {
        console.log(`Server is running on port ${3000} 🚀`)
    })
}

startServer()

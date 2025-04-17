import { join, resolve } from 'path'
import { addAliases } from 'module-alias'

const srcDir = join(__dirname, '..')
addAliases({ '@': resolve(srcDir) })

import mongoose from 'mongoose'
import express from 'express'
import config from '@/config/database/index'
import '@/modules/jobs/service/index'
import { SourceExtractorBoxesQueue } from '@/modules/queue/SourceExtractorBoxesQueue'
import { SourceExtractorWorker } from '@/modules/worker/SourceExtractorWorker/service'

const app = express()

async function startServer() {
    const bodyParser = require('body-parser')

    await mongoose.connect(config.mongoURI)

    app.use(bodyParser.json())

    app.get('/healthcheck', (req, res) => {
        res.status(200).json({
            status: 'ok',
            message: 'API is running',
            timestamp: new Date(),
        })
    })

    app.listen(3000, () => {
        console.log(`Server is running on port 3000 🚀`)
    })

    const sourceExtractorBoxesQueue = new SourceExtractorBoxesQueue()
    sourceExtractorBoxesQueue.scheduleRecurringJob()
    await sourceExtractorBoxesQueue.checkJobs()

    new SourceExtractorWorker()
}

startServer()

import { join, resolve } from 'path'
import { addAliases } from 'module-alias'

const srcDir = join(__dirname, '..')
addAliases({ '@': resolve(srcDir) })

import mongoose from 'mongoose'
import express from 'express'
import config from '@/config/database/index'
import '@/modules/orchestrator/job/service'
import { WorkerOrchestrator } from '@/modules/orchestrator/worker/worker-orchestrator'
import { errorHandler } from '@/middleware/index'
import manualFlowRoutes from '@/modules/orchestrator/manual-flow/routes/index'

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

    app.use('/api/manual-flow', manualFlowRoutes)
    app.use(errorHandler)

    app.listen(3000, () => {
        console.log(`Server is running on port 3000 🚀`)
    })

    new WorkerOrchestrator()
}

startServer()

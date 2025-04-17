import { rateLimiter } from '@/utils/rate-limiter'
import axios from 'axios'
import cron from 'node-cron'
const callEndpoint = rateLimiter.wrap(async () => {
    try {
        const response = await axios.get('http://json-server:4000/boxes')
        console.log('Dados recebidos do endpoint:', response.data)
    } catch (error) {
        console.error('Erro ao chamar o endpoint:', error)
    }
})

async function executeJob() {
    try {
        if ((await rateLimiter.incrementReservoir(0)) > 0) {
            console.log('Start job!!!!!!!!!')
            await callEndpoint()
        } else {
            console.log(
                'Rate limit atingido, enfileirando requisição com redis futuramente hehe TODO!!',
            )
        }
    } catch (error) {
        console.error('Erro durante a execução do job:', error)
    }
}

cron.schedule('*/1 * * * *', executeJob)

executeJob()

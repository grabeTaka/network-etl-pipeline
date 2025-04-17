import { rateLimiter } from '@/utils/rate-limiter'
import axios from 'axios'
import cron from 'node-cron'
import { IJobService } from './type'

class JobService implements IJobService {
    private async callEndpoint(): Promise<void> {
        try {
            const response = await axios.get('http://json-server:4000/boxes')
            console.log('Dados recebidos do endpoint:', response.data)
        } catch (error) {
            console.error('Erro ao chamar o endpoint:', error)
        }
    }

    private async executeJob(): Promise<void> {
        try {
            const reservoir = await rateLimiter.incrementReservoir(0)
            if (reservoir > 0) {
                console.log('Iniciando job...')
                await this.callEndpoint()
            } else {
                console.log(
                    'Limite de requisições atingido. Enfileirando requisição com Redis futuramente...',
                )
                // Aqui você pode adicionar a lógica de enfileiramento no Redis
            }
        } catch (error) {
            console.error('Erro durante a execução do job:', error)
        }
    }

    public startJobScheduler(): void {
        cron.schedule('*/1 * * * *', () => {
            console.log('Agendamento do job iniciado...')
            this.executeJob()
        })
    }

    public extractDataFromSourceDatabase(): void {
        this.startJobScheduler()
        this.executeJob()
    }
}

const jobService = new JobService()
jobService.extractDataFromSourceDatabase()
export default jobService

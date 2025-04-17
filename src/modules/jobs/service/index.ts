import { rateLimiter } from '@/utils/rate-limiter'
import axios from 'axios'
import cron from 'node-cron'
import { IJobService } from './type'
import Bull from 'bull'

type JobType = 'extract-boxes' | 'extract-users' | 'extract-orders'

class JobService implements IJobService {
    private requestQueue = new Bull('request-queue', {
        redis: { host: 'redis', port: 6379 },
    })

    private async callEndpoint(endpoint: string): Promise<void> {
        await rateLimiter.schedule(async () => {
            try {
                const response = await axios.get(
                    `http://json-server:4000/${endpoint}`,
                )
                console.log(`Dados de ${endpoint}:`, response.data)
            } catch (error) {
                console.error(`Erro ao chamar o endpoint ${endpoint}:`, error)
            }
        })
    }

    private async addJobIfNotExists(
        jobName: JobType,
        endpoint: string,
    ): Promise<void> {
        const waiting = await this.requestQueue.getWaiting()
        const delayed = await this.requestQueue.getDelayed()

        const alreadyExists = [...waiting, ...delayed].some(
            (job) => job.name === jobName,
        )

        if (!alreadyExists) {
            console.log(`Adicionando job ${jobName} à fila com delay`)
            await this.requestQueue.add(jobName, { endpoint }, { delay: 30000 })
        } else {
            console.log(
                `Job ${jobName} já está na fila, ignorando novo agendamento.`,
            )
        }
    }

    private async processQueue(): Promise<void> {
        const endpoints: JobType[] = [
            'extract-boxes',
            'extract-users',
            'extract-orders',
        ]

        for (const jobName of endpoints) {
            this.requestQueue.process(jobName, async (job) => {
                const { endpoint } = job.data

                const reservoir = await rateLimiter.incrementReservoir(0)
                if (reservoir > 0) {
                    console.log(`Processando job ${jobName} para ${endpoint}`)
                    await this.callEndpoint(endpoint)
                    console.log(`Job ${jobName} concluído`)
                } else {
                    console.log(
                        `Rate limit atingido para ${endpoint}, reagendando...`,
                    )
                    await this.addJobIfNotExists(jobName, endpoint)
                }
            })
        }
    }

    private async executeJob(
        endpoint: string,
        jobName: JobType,
    ): Promise<void> {
        const reservoir = await rateLimiter.incrementReservoir(0)

        if (reservoir > 0) {
            console.log(`Executando diretamente ${endpoint}`)
            await this.callEndpoint(endpoint)
        } else {
            console.log(
                `Limite de requisições atingido para ${endpoint}, enfileirando...`,
            )
            await this.addJobIfNotExists(jobName, endpoint)
        }
    }

    public startJobScheduler(): void {
        cron.schedule('*/1 * * * *', async () => {
            console.log('⏰ Agendamento iniciado...')
            await this.executeJob('boxes', 'extract-boxes')
        })
    }

    public extractDataFromSourceDatabase(): void {
        this.startJobScheduler()
        this.processQueue()
        this.executeJob('boxes', 'extract-boxes')
    }
}

const jobService = new JobService()
jobService.extractDataFromSourceDatabase()
export default jobService

//TODO refatorar parar separar lógica do redis com o node-cron
//TODO ao retornar erro da api deve adicionar a request na fila para evitar erros do tipo "time out"

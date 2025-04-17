import { JobsOptions } from 'bullmq'

export const jobsDefaultOptions = {
    jobId: 'boxes-recurring-job',
    attempts: process.env.JOB_MAX_ATTEMPTS || 5,
    backoff: {
        type: 'exponential',
        delay: process.env.JOB_BACKOFF_DELAY_SECONDS
            ? Number(process.env.JOB_BACKOFF_DELAY_SECONDS) * 1000
            : 3000,
    },
    removeOnComplete: true,
    removeOnFail: false,
    repeat: {
        cron: process.env.JOB_REPEAT_EVERY_MINUTES
            ? `*/${process.env.JOB_REPEAT_EVERY_MINUTES} * * * *`
            : '*/1 * * * *',
    },
} as unknown as JobsOptions

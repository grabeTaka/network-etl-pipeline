import { JobsOptions } from 'bullmq'

export const queueDefaultOptions = {
    attempts: process.env.JOB_MAX_ATTEMPTS || 5,
    backoff: {
        type: 'fixed',
        delay: process.env.JOB_BACKOFF_DELAY_SECONDS
            ? Number(process.env.JOB_BACKOFF_DELAY_SECONDS) * 1000
            : 60 * 1000,
    },
    removeOnComplete: false,
} as unknown as JobsOptions

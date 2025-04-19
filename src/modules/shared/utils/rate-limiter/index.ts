import Bottleneck from 'bottleneck'

export const rateLimiter = new Bottleneck({
    reservoir: 50,
    reservoirRefreshInterval: 60 * 1000,
})

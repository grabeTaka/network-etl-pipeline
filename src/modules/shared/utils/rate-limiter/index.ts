import Bottleneck from 'bottleneck'

export const rateLimiter = new Bottleneck({
    reservoir: 50,
    reservoirRefreshInterval: 60 * 1000,
    reservoirRefreshAmount: 50,
    maxConcurrent: 1,
    rejectOnDrop: true,
    highWater: 0,
    strategy: Bottleneck.strategy.LEAK,
})

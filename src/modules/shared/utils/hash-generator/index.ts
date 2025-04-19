import crypto from 'crypto'

export const hashGenerator = (type: string): string => {
    return crypto.createHash('sha256').update(type).digest('hex')
}

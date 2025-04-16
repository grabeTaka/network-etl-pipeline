import { IConfig } from '@/config/database/type'

const config: IConfig = {
    mongoURI: process.env.DB_URI || 'mongodb://localhost:27017',
    dbName: process.env.DB_NAME || 'ozmap_isp',
}

export default config

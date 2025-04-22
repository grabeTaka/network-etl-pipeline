import { IConfig } from '@/config/database/type'

const config: IConfig = {
    mongoURI: process.env.DB_URI || 'mongodb://database:27017/ozmap_isp',
    dbName: process.env.DB_NAME || 'ozmap_isp',
}

export default config

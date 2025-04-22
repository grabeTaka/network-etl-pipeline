import { addAliases } from 'module-alias'
import { join } from 'path'
require('dotenv').config({ path: '.env.test' })

addAliases({
    '@': join(__dirname, '../src'),
})

import baseSettings from './base'
import devSettings from './development'
import prodSettings from './production'

const env = process.env.NODE_ENV || 'development'
console.log(`Environment set to: ${env}`)

export default Object.assign(baseSettings, env == 'development' ? devSettings : prodSettings)

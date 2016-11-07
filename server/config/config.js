// access to the root directory. /../../ = 2 folders back
let path = require('path')
let rootPath = path.normalize(path.join(__dirname, '/../../'))


module.exports = {
  developement: {
    port: 1337,
    db: 'mongodb://localhost:27017/homework3DB',
    rootPath: rootPath
  },
  production: {
    port: process.env.port,
    db: process.env.MONGO_DB_CONNECT_STRING,
    rootPath: rootPath
  }
}

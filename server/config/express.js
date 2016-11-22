const express = require('express')

module.exports = (config, app) => {
  // enable pug
  app.set('view engine', 'pug')
  app.set('views', config.rootPath + 'server/views')

  // enable static files from folder public
  app.use(express.static(config.rootPath + 'public'))
}

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

module.exports = (config, app) => {
  // enable pug
  app.set('view engine', 'pug')
  app.set('views', config.rootPath + 'server/views')

  // enable static files from folder public
  app.use(express.static(config.rootPath + 'public'))

  // enable body,cookie parsers and passport
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({
    secret: 'taina',
    resave: false,
    saveIninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.sesstion())
}

const controllers = require('../controllers')
const auth = require('../config/auth')

module.exports = (app) => {
  // get request
  /* app.get('/', (req, res) => {
    // render pug template
    res.render('index')
  })*/

  app.get('/', controllers.home.index)

  app.get('/about', controllers.home.about)

  app.get('/users/register', controllers.users.register)

  app.post('/users/create', controllers.users.create)

  app.get('/users/login', controllers.users.login)

  app.post('/users/authenticate', controllers.users.authenticate)

  app.post('/users/logout', controllers.users.logout)

  app.get('/articles/create', auth.isInRole('Admin'), auth.isAuthenticated, controllers.articles.create)

  app.post('/articles/upload', auth.isInRole('Admin'), controllers.articles.upload)

  app.get('/articles/review', controllers.articles.review)


  app.all('*', (req, res) => {
    res.status(404)
    res.send('NOT FOUND')
    res.end()
  })
}

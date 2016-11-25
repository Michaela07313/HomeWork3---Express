let controllers = require('../controllers')

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


  app.all('*', (req, res) => {
    res.status(404)
    res.send('NOT FOUND')
    res.end()
  })
}

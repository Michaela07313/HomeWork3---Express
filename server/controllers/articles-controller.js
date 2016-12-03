let Article = require('mongoose').model('Article')
let mongoose = require('mongoose')

module.exports = {
  create: (req, res) => {
    res.render('articles/create')
  },
  upload: (req, res) => {
    let createdArticle = req.body

    Article
      .create(createdArticle)
      .then(createdArticle => {
        res.redirect('/')
      })
  },
  review: (req, res) => {
    Article.find({}).then(articles => {
      res.render('articles/review', {data: articles})
    })
  },
  details: (req, res, next) => {
    let articleID = req.param('id')
    let query = Article.findById(articleID)
    Article.find(query, function (err, article) {
      if (err) return next(err)
      console.log('Results: ' + article)
      query.exec(function (err, get) {
        if (err) return next(err)
        if (!get) return next()
        res.render('articles/details', { get: get, article: article })
      })
    })
  }
}
Article.find({ author: 'meme' }).exec().then(art => { console.log(art) })


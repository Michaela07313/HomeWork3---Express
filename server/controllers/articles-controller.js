let Article = require('mongoose').model('Article')
const auth = require('../config/auth')

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
    // Article.find({}).then(articles => {
    //   res.render('articles/review', {data: articles})
    // })
    let perPage = 5
    let page = req.query.page > 0 ? req.query.page : 0

    Article
      .find()
      .select('title')
      .limit(perPage)
      .skip(perPage * page)
      .sort({ date: 'asc' })
      .exec((err, articles) => {
        if (err) console.log(err)
        Article.count().exec((err, count) => {
          if (err) console.log(err)
          res.render('articles/review', {
            articles: articles,
            page: page,
            pages: count / perPage
          })
        })
      })
  },
  details: (req, res, next) => {
    let articleID = req.params.id
    let query = Article.findById(articleID)
    Article.find(query, function (err, article) {
      if (err) return next(err)
      query.exec(function (err, get) {
        if (err) return next(err)
        if (!get) return next()
        res.render('articles/details', { get: get, article: article })
      })
    })
  },
  edit: (req, res, next) => {
    let articleID = req.params.id
    let query = Article.findById(articleID)

    Article.find(query, function (err, articleSelected) {
      if (err) return next(err)
      query.exec(function (err, get) {
        if (err) return next(err)
        if (!get) return next()
        if (articleSelected[0].author === res.locals.currentUser.username || auth.isAdmin(req, res)) {
          res.render('articles/edit', { get: get, articles: articleSelected })
        } else {
          res.redirect('/articles/details/' + articleID)
          return
        }
      })
    })
  },
  update: (req, res, next) => {
    let articleID = req.query.id
    let updatedArticle = req.body

    Article.findByIdAndUpdate(articleID, {
      $set: {
        title: updatedArticle.title,
        description: updatedArticle.description,
        content: updatedArticle.content
      },
      new: true
    })
    .exec()
    .then(updatedArticle => {
      res.redirect('/')
    })
  }
}
Article.find({ author: 'meme' }).exec().then(art => { console.log(art) })


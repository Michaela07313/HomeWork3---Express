let Article = require('mongoose').model('Article')
let User = require('mongoose').model('User')

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
  }
}
Article.find({ author: 'meme' }).exec().then(art => { console.log(art) })

module.exports = (req, res) => {
  res.locals.createPagination = (pages, page) => {
    let url = require('url')
    let qs = require('querystring')
    let params = qs.parse(url.parse(req.url).query)
    let str = ''

    params.page = 0
    let clas = page === 0 ? 'active' : 'no'
    str += `<li class="'+ clas +'"><a href="?'+qs.stringify(params)+'">First</a></li>`
    for (var p = 1; p < pages; p++) {
      params.page = p
      clas = page === p ? 'active' : 'no'
      str += `<li class="'+clas+'"><a href="?'+qs.stringify(params)+'">'+ p +'</a></li>`
    }
    params.page = --p
    clas = page === params.page ? 'active' : 'no'
    str += `<li class="'+clas+'"><a href="?'+qs.stringify(params)+'">Last</a></li>`

    return str
  }
}

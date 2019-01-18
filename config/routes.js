const Index = require('../app/controllers/index')
const User = require('../app/controllers/user')
const Movie = require('../app/controllers/movie')
const Comment = require('../app/controllers/comment')
const Category = require('../app/controllers/category')

module.exports = (app) => {
  // pre handle user
  app.use((req, res, next) => {
    console.log(req.session.user)
    let _user = req.session.user
    app.locals.user = _user ? _user : ''
    next()
  })

  // index page
  app.get('/', Index.index)

  // user
  app.post('/user/signin', User.signin)
  app.post('/user/signup', User.signup)
  app.get('/signin', User.showSignin)
  app.get('/signup', User.showSignup)
  app.get('/logout', User.logout)
  app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)


  // movie page
  app.get('/movie/:id', Movie.detail)               // 详情播放页
  app.post('/admin/movie', Movie.save)              // 保存
  app.get('/admin/movie/new', Movie.new)            // 新建
  app.get('/admin/movie/update/:id', Movie.update)  // 编辑
  app.get('/admin/movie/list', Movie.list)          // 后台视频列表
  app.delete('/admin/movie/list', Movie.del)        // 视频删除

  // 分类
  app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new)
  app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save)
  app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list)

  //results
  app.get('/results', Index.search)

}

  


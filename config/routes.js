const Index = require('../app/controllers/index')
const User = require('../app/controllers/user')
const Movie = require('../app/controllers/movie')
const Comment = require('../app/controllers/comment')
const Category = require('../app/controllers/category')

module.exports = (app) => {
  // pre handle user
  app.use((req, res, next) => {
    next();
  })

  // index page
  app.get('/', Index.index)

  // user
  app.get('/user/signup', User.signup)
  app.get('/user/signin', User.signin)


  // movie page
  app.get('/movie/:id', Movie.detail)               // 详情播放页
  app.post('/admin/movie', Movie.save)              // 保存
  app.get('/admin/movie/new', Movie.new)            // 新建
  app.get('/admin/movie/update/:id', Movie.update)  // 编辑
  app.get('/admin/movie/list', Movie.list)          // 后台视频列表
  app.delete('/admin/movie/list', Movie.del)        // 视频删除

}

  


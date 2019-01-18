const Category = require('../models/category')

exports.new = (req, res) => {
  res.render('category_admin', {
    title: 'imooc 后台分类录入页',
    category:{}
  })
}

exports.save = (req, res) => {
  let _category = req.body.category
  let category = new Category(_category)

  console.log(123);

  category.save((err, category) => {
      if (err) {
        console.log(err)
      }
      res.redirect('/admin/category/list')
    })
}

exports.list = (req, res) => {
  Category.fetch((err, categories) => {
    if (err) {
      console.log(err)
    }
    res.render('categorylist', {
      title: 'imooc 分类列表页',
      categories
    })
  })
}

exports.del = (req, res) => {
  let id = req.query.id
  
  if (id) {
    Movie.deleteOne({ _id: id }, (err, movie) => {
      if (err) {
        console(err)
      }
      else {
        res.json({ success: 1 })
      }
    })
  }
}
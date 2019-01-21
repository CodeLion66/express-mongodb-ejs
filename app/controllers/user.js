const User = require('../models/user')

exports.showSignup = (req, res) => {
  res.render('signup', {
    title: '注册页面'
  })
}
exports.showSignin = (req, res) => {
  res.render('signin', {
    title: '登录页面'
  })
}

// 注册请求
exports.signup = (req, res) => {
  let _user = req.body.user

  User.findOne({ name: _user.name }, (err, user) => {
    if (err) console.log(err)

    if (user) {
      return res.redirect('/signin')
    } else {
      let user = new User(_user)

      user.save((err, user) => {
        if (err) console.log(err)

        res.redirect('/')
      })
    }
  })
}

// 登录请求
exports.signin = (req, res) => {
  let _user = req.body.user
  let name = _user.name
  let password = _user.password

  User.findOne({ name: name }, (err, user) => {
    if (err) console.log(err)

    if (!user) {
      return res.redirect('/signup')
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) console.log(err)

      if (isMatch) {
        console.log("Password is matched!")
        req.session.user = user
        return res.redirect('/')
      } else {
        console.log("Password is not matched!")
        return res.redirect('/signin')
      }
    })
  })
}

// 用户列表页面
exports.list = (req, res) => {
  User.fetch((err, users) => {
    if (err) console.log(err)

    res.render('userList', {
      title: 'imooc',
      users
    })
  })
}

// 退出
exports.logout = (req, res) => {
  req.session.destroy()

  res.redirect('/')
}

// 检测用户是否登录，没有登录退出到登录页，相当于中间件
exports.signinRequired = (req, res, next) => {
  let user = req.session.user

  if (!user) {
    return res.redirect('/signin')
  }

  next()
} 

// 管理员权限
exports.adminRequired = (req, res, next) => {
  let user = req.session.user

  if (user.role <= 10) {
    return res.redirect('/signin')
  }

  next()
}

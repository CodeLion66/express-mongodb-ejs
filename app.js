var express = require('express')
var path = require("path")
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views/pages')
app.set('view engine', 'ejs')


console.log('server start')
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)

// index page
app.get('/', function(req, res) {
	res.render('index', {
		title: '首页',
		movies: [{
			title: '机械战警',
			_id: 1,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		}, {
			title: '机械战警',
			_id: 2,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		}, {
			title: '机械战警',
			_id: 3,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		}, {
			title: '机械战警',
			_id: 4,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		}]
	})
})

// detail page
app.get('/movie/:id', function(req, res) {
	res.render('detail', {
		title: '详情页',
		movie: {
			doctor: 'wudi',
			country: '美国',
			title: 'jixiezhanjing',
			year: 2014,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language: '英语',
			flash: 'http://player.youku.com/player.php/sid/XNjA1Njc)NTUy/v.swf',
			summary: '俺还是饥渴的飞机喀什打开了发挥空间地方哀伤的歌看了哈顺利度过卢卡斯的建立工会按时的韩国卡号圣诞快乐更何况乐山大佛'
		}
	})
})

// admin page
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: '后台录入页',
		movie: {
			doctor: '',
			country: '',
			title: '',
			year: '',
			poster: '',
			language: '',
			flash: '',
			summary: ''
		}
	})
})

// list page
app.get('/admin/list', function(req, res) {
	res.render('list', {
		title: '后台列表',
		movie: [{
			doctor: 'wudi',
			country: '美国',
			title: 'jixiezhanjing',
			year: 2014,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language: '英语',
			flash: 'http://player.youku.com/player.php/sid/XNjA1Njc)NTUy/v.swf',
			summary: '俺还是饥渴的飞机喀什打开了发挥空间地方哀伤的歌看了哈顺利度过卢卡斯的建立工会按时的韩国卡号圣诞快乐更何况乐山大佛'
		}, {
			doctor: 'wudi',
			country: '美国',
			title: 'jixiezhanjing',
			year: 2014,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language: '英语',
			flash: 'http://player.youku.com/player.php/sid/XNjA1Njc)NTUy/v.swf',
			summary: '俺还是饥渴的飞机喀什打开了发挥空间地方哀伤的歌看了哈顺利度过卢卡斯的建立工会按时的韩国卡号圣诞快乐更何况乐山大佛'
		}, {
			doctor: 'wudi',
			country: '美国',
			title: 'jixiezhanjing',
			year: 2014,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language: '英语',
			flash: 'http://player.youku.com/player.php/sid/XNjA1Njc)NTUy/v.swf',
			summary: '俺还是饥渴的飞机喀什打开了发挥空间地方哀伤的歌看了哈顺利度过卢卡斯的建立工会按时的韩国卡号圣诞快乐更何况乐山大佛'
		}]
	})
})
https://github.com/liziqi7/movie.git
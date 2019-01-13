var express = require('express')
var path = require("path")

var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')

var port = process.env.PORT || 3000
var app = express()

mongoose.connection.openUri('mongodb://localhost/movie')

app.set('views', './views/pages')
app.set('view engine', 'ejs')


app.use(express.static(path.join(__dirname, 'public')))
console.log('imooc started on port ' + port)

// index page
app.get('/', function(req, res) {
	Movie.fetch(function(err, movies) {
		if (err) console.log(err)
		
		res.render('index', {
			title: '首页',
			movies: movies
		})
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

const Movie = require('../models/movie')

exports.index = (req, res) => {
	Movie.fetch(function(err, movies) {
		if (err) console.log(err)
		
		res.render('index', {
			title: '首页',
			movies: movies
		})
	})
}
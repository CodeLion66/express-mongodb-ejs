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

exports.search = (req, res) => {
	let catId = req.query.cat
	let q = req.query.q
	let page = parseInt(req.query.p, 10) || 0
	let count = 2
	let index = page * 2

	if (catId) {
	    Category
	      .find({ _id: catId })
	      .populate({
	        path: 'movies',
	        select: 'title poster'
	      })
	      .exec((err, categories) => {
	        if (err) {
	          console.log(err)
	        }
	        let category = categories[0] || {}
	        let movies = category.movies || []
	        let results = movies.slice(index, index + count)
	        res.render('results', {
	          title: '?????',
	          keyword: category.name,
	          currentPage: (page + 1),
	          totalPage: Math.ceil(movies.length / count),
	          movies: results,
	          query: 'cat=' + catId
	        })
	      })
	} else {
	    Movie
	      .find({title: new RegExp(q+ '.*', 'i')})
	      .exec((err, movies) => {
	        if (err) {
	          console.log(err)
	        }
	        let results = movies.slice(index, index + count)
	        res.render('results', {
	          title: '?????',
	          keyword: q,
	          currentPage: (page + 1),
	          totalPage: Math.ceil(movies.length / count),
	          movies: results,
	          query: 'q=' + q
	        })
	   	})
  	}
}
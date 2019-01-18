const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const categorySchema = new Schema({
	name: String,
	movies: [{
		type: ObjectId,
		ref: 'Movie'
	}],
    // 更新或者录入时间
    meta: {
    	createAt: {
    		type: Date,
    		default: Date.now()
    	},
    	updateAt: {
    		type: Date,
    		default: Date.now()
    	}
    }
});

categorySchema.pre('save', function(next) {
	console.log(this);
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
});

categorySchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = categorySchema;

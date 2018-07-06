var productSchema = require('./schema/ProductSchema');
var Mongo = require('../libraries/Mongo');


var ProductModel = {
    save: function (data, callback) {
				var product = productSchema(data);
				Mongo._save(product, function (state) {
						if (state.error){
								return callback(state);
						}else {
								return callback(state);
						}
				});
    },

    update: function (data,condition,callback){
				Mongo.update(productSchema,condition,data,function(state){
						return callback(state);
				});
    },

    findAll: function (param, callback) {
				Mongo._get_bulk(productSchema, param, function (data) {
						return callback(data);
				});
    },

    findOne: function (param, callback) {
				Mongo._get(productSchema, param, function (data) {
						return callback(data);
				});
	},
	
	delete: function (param, callback){
		Mongo._delete(productSchema, param, function(data){
			return callback(data);
		})
	}
};

module.exports = ProductModel;
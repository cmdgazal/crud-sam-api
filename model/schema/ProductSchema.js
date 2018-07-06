var mongoose = require('mongoose');
var _config = require('../../config/config');
var _collection = _config.mongodb.collections;

var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: {type: String, unique: true},
    price:{type:String, unique: true},
    date_added: {type: Date, default: Date.now}
});

var ProductModel = mongoose.model(_collection.products, productSchema);

module.exports = ProductModel;
var Config = {
    query_limit: 200,
	api_query_limit: 200,
	
	mongodb: {
		"mongo_uri":"mongodb://serverless:funmilayo33@ds127851.mlab.com:27851/products_serverless",
		"collections":{
			"products": "products"
		}
	}
};

module.exports = Config;

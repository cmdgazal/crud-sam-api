console.log('Loading function');
var util = require('./libraries/utility')

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    var id =  (event.pathParameters || {}).productid || false;
    console.log('ID ', event.httpMethod)
    var productModel = require('./model/ProductModel');
    switch(event.httpMethod){
        case "GET":
            if(id) {
                productModel.findOne({"_id": id}, function(resp){
                    if(resp){
                        callback(null, {headers: {"content-type": "application/json"}, body: JSON.stringify(util.handleResponse({err: false, message:"Product with ID found successfully", data: resp}))});
                    }else{
                        callback(null, {headers: {"content-type": "application/json"}, body: JSON.stringify(util.handleResponse({err: true, message: "Product with ID not found", data: null}))});
                    }
                    return;
                });
            }
            productModel.findAll({conditions:{}}, function(products){
                return callback(null, {headers: {"content-type": "application/json"}, body: JSON.stringify(util.handleResponse({err: false, message:"Products found successfully", data: products}))});
            });
            break;

        case "POST":
            var errors = util.checkRequestBody(JSON.parse(event.body), ['name', 'price']);
            if(errors){
                callback(null, {headers: {"content-type": "application/json"}, body: JSON.stringify(util.handleResponse({err: true, message: "Invalid Parameters", data: errors}))})
            }else{
                productModel.save(JSON.parse(event.body), function(state){
                    if(state){
                        callback(null, {headers: {"content-type": "application/json"}, body: JSON.stringify(util.handleResponse({err: false, message:"Product has been saved successfully", data: null}))}); 
                    }
                })
            }            
            break;

        case "PUT":  
            productModel.update(JSON.parse(event.body),{"_id": id}, function(state){
                if(state){
                    callback(null, {headers: {"content-type": "application/json"}, body: JSON.stringify(util.handleResponse({err: false, message:"Product has been updated successfully", data: null}))}); 
                }
            })         
            break;

        case "DELETE": 
            productModel.delete({"_id": id}, function(state){
                if(state){
                    callback(null, {headers: {"content-type": "application/json"}, body: JSON.stringify(util.handleResponse({err: false, message:"Product has been deleted successfully", data: null}))}); 
                }
            })
            break; 

        default:
            // Send HTTP 501: Not Implemented
            console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
            callback(null, { statusCode: 501 })

    }
};
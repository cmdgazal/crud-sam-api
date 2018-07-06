var conn = require('./Connector');
var _config = require('../config/config');


var Mongo = {

    _client: conn,

    _get: function(model,param,callback){
        model.findOne(param, function (err, model_data) {
            if(err) return callback(Mongo.handleError(err));
            else return callback(model_data);
	    });
    },

    _get_bulk: function(model,params,callback){
        if(!params.limit)
            params.limit = _config.query_limit;

        var query = model.find(params.conditions).limit(params.limit);

        if(params.sort)
            query.sort(params.sort);

        if(params.fields)
            query.select(params.fields);


        query.exec(function(err,model_data){
            if(err) return callback(Mongo.handleError(err));
            else
                return callback(model_data);
        });
    },

    _save: function(model,callback){
        model.save(function(err,data){
            if (err != null)
                return callback(Mongo.handleError(err));
            else
                return callback(data);
        });
    },

    _update: function(model,condition,data,callback){
        model.findOneAndUpdate(condition,{$set:data},{new:true},function(err,resp){//{multi: true},
            if (err)
                return callback(Mongo.handleError(err));
            else
                return callback(resp);
        });
    },

    _delete: function(model, condition, callback){
        model.deleteOne(condition, function(err, resp){
            if (err)
                return callback(Mongo.handleError(err));
            else
                return callback(resp);
        })
    },

    update: function(model,condition,data,callback){
        model.update(condition,data,function(err,resp){
            if (err)
                return callback(Mongo.handleError(err));
            else
                return callback(resp);
        });
    },

    close: function() {
        this._client.close();
    },

    handleError: function(report){
        return {"error":true,"message":report};
    }
};

module.exports = Mongo;
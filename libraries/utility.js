var _ = require('lodash');
var Utility = {
    handleResponse: function (returnData) {
				var status = false, data = null;
				if(returnData.err) status = true;
				if(returnData.data) data = returnData.data;
				return {
						"error": status,
						"message": returnData.message,
						"response": data
				};
    },

    checkRequestBody: function (params, requiredFields) {
				var errors = {};
				for (var i = 0; i < requiredFields.length; i++) {
						if (!params[requiredFields[i]]) {
							errors[requiredFields[i]] = 'is required';
						}
				}
				if(_.isEmpty(errors)) {
						return null;
				}
				else {
						return errors;
				}

    },
    
};

module.exports = Utility;
var _config = require('../config/config');
var mongoose = require('mongoose');  
mongoose.connect(_config.mongodb.mongo_uri);
var conn = mongoose.connection;             
 
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
    console.log("Connected ")
  // Wait for the database connection to establish, then start the app.                         
});
module.exports = conn;
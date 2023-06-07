const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userName:String,
    pass:String,
    address:String,
    phoneNumber:String

})

const usersdb = mongoose.model('usersdb',schema);

module.exports = usersdb;
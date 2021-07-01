const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    device: String,
    os: String,
    manufacturer: String,
    lastcheckedoutdate: Date,
    lastcheckedoutby: String,
    ischeckedout: Boolean
})


module.exports = mongoose.model('devices', deviceSchema)
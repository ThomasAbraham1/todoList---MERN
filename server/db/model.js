const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/necromancers');
const usersSchema = new mongoose.Schema({
    item: String,
})

const itemsModel = new mongoose.model('item', usersSchema);

module.exports = {
    itemsModel
}
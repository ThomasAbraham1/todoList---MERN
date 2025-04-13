const mongoose = require('mongoose');


// mongoose.connect('mongodb://127.0.0.1:27017/necromancers');
mongoose.connect("mongodb+srv://Thomas:0ktPEdzdt6HdDqiH@cluster0.qesx1ag.mongodb.net/todoList-MERN");
const usersSchema = new mongoose.Schema({
    item: String,
})

const itemsModel = new mongoose.model('item', usersSchema);

module.exports = {
    itemsModel
}
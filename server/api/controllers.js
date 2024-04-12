const { Router } = require('express');
const crudRouter = Router();
const bodyParser = require('body-parser');
const { itemsModel } = require('../db');

crudRouter.use(bodyParser.urlencoded({
    extended: true
}));

crudRouter.use(bodyParser.json());

crudRouter.post('/update', (req, res) => {
    async function updateData() {
        var key = req.body.key;
        var itemName = req.body.itemName;
        const result = await itemsModel.findOneAndUpdate({ _id: key }, { item: itemName }, {
            new: true
        }).then((result) => {
            res.send(result);
            return result;
        });

        console.log(result);
    }
    updateData();
})


// const users = new itemsModel();
crudRouter.post('/delete', (req, res) => {
    async function deleteData() {
        var key = req.body.key;
        const result = await itemsModel.deleteOne({ _id: key }).then((result) => {
            res.send(result);
            return result;
        });

        console.log(result);
    }
    deleteData();
})


crudRouter.get('/getData', (req, res) => {

    async function run() {
        itemsModel.find({}).then((result) => {
            res.send(result)
            console.log(result)
        })
    }
    run();
});

crudRouter.post("/addData", async (req, res) => {
    // console.log('POST message received', req.params);
    async function addData() {
        console.log(req.body.item);
        var item = req.body.item;
        // const userInsert = new itemsModel({ item: item });
        // await userInsert.save();
        itemsModel.create({ item: item }).then((data) => {
            console.log("Added Successfully");
            console.log(data);
            res.send(data);
        });
    }
    addData();
    res.status(200);
    // res.status(400).end();
})


module.exports = {
    crudRouter,
};
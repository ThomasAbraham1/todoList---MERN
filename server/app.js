const express = require('express');
const app = express();
const cors = require('cors');
const { apiRouter } = require('./api');

app.use(cors());
app.use('/', apiRouter);
app.listen(3000, () => {
    console.log("App listening to port 3000");
})





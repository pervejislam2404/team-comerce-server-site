const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());



app.listen(port, () => {
    console.log('server running at port' + port);
});
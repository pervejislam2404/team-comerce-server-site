const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const { MongoClient } = require("mongodb");


app.use(express.json());
app.use(cors());
dotenv.config();
const port = process.env.PORT || 4000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.id3ci.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db("teamCommerce");
        const productsCollection = database.collection("products");

        app.get('/trail', async(req, res) => {
            res.json('response came here')
        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log('server running at port' + port);
});
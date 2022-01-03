const express = require('express');
const app = express();
const dotenv = require('dotenv');
var admin = require("firebase-admin");
const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;
const { MongoClient } = require("mongodb");


app.use(express.json());
app.use(cors());
dotenv.config();
const port = process.env.PORT || 4000;


// jwt
const serviceAccount = require("./team-commerce-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// jwt


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.id3ci.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);


// jwt

async function verifyToken(req,res,next){
    if(req?.headers?.authorization?.startsWith('Bearer ')){
        const token = req.headers?.authorization.split(' ')[1];   
        try{
           const decodedUser = await admin.auth().verifyIdToken(token);
           req.decodedEmail= decodedUser.email;
        }
        catch{
    
        }
        }
        next()
    }
// jwt


async function run() {
    try {
        await client.connect();
        const database = client.db("teamCommerce");
        const productsCollection = database.collection("products");

        const allProductsCollection = database.collection("mainProducts");


        const usersCollection = database.collection("users");
        const orderCollection = database.collection("order");

        app.get('/products', async(req, res) => {
            const query = {};
            const result = await productsCollection.find(query).toArray();
            res.json(result);
        })


        app.get('/singleProductDetail/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectID(id) };
            const result = await productsCollection.findOne(query);
            res.json(result);
        })

        // saving - user - to - database

        app.post('/saveUser', async(req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.json(result);
        })


        // app.get('/tokenTest',verifyToken, async(req, res) => {
        //     if(req?.decodedEmail){
        //         res.json("got token")
        //     }else{

        //         res.json("token no found")
        //     }
        // })


        ///////////////////////// orders /////////////////////////////
    app.post("/order", async (req, res) => {
        const result = await orderCollection.insertOne(req.body);
        res.json(result);
      });
      app.put("/order", async (req, res) => {
        const find = await orderCollection.findOne({
          _id: ObjectID(req?.body?._id),
        });
        const updateDoc = {
          $set: {
            orderName: req.body.orderName,
            orderEmail: req.body.orderEmail,
            orderPhone: req.body.orderPhone,
            orderAddress: req.body.orderAddress,
            orderCity: req.body.orderCity,
            orderPostalCode: req.body.orderPostalCode,
            totalShoppingCost: req.body.totalShoppingCost,
          },
        };
        const result = await orderCollection.updateOne(find, updateDoc);
        res.json(result);
      });
  
      app.get("/order/:id", async (req, res) => {
        const result = await orderCollection.findOne({
          _id: ObjectID(req.params.id),
        });
        res.json(result);
      });
      app.get("/orders/:email", async (req, res) => {
        const result = await orderCollection
          .find({ email: req.params.email })
          .toArray();
        res.json(result);
      });
  
      app.delete("/order/:id", async (req, res) => {
        const result = await orderCollection.deleteOne({
          _id: ObjectID(req.params.id),
        });
        res.json(result);
      });
  
      app.get("/allOrders", async (req, res) => {
        const result = await orderCollection.find({}).toArray();
        res.json(result);
      });
      /////////////////// orders /////////////////////////////


      app.post('/setProducts', async(req, res)=>{
        const products = "";
        const result = await allProductsCollection.insertMany(products);
        res.json(result);
      })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/trail', async(req, res) => {
    res.json('response came here')
})

app.listen(port, () => {
    console.log('server running at port' + port);
});
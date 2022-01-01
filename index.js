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

        app.get('/mongo', async(req, res) => {
            const query = {};
            const result = productsCollection.find(query);
            res.json(result);
        })


        app.post('/insertProducts', async(req, res) => {
            const docs = [{
                    "name": "mango",
                    "ratting": "5",
                    "price": "40",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzs32SWUTyuz1rK7Wn1m5UlzyosT7c4MQtcA&usqp=CAU",
                    "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8ANk8Qj_YRkFMrTuanRvohklKC16bpA7EAw&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8ANk8Qj_YRkFMrTuanRvohklKC16bpA7EAw&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyCAuuL-NZVLbGeAveU3PWr6gHIeFAGOndRQ&usqp=CAU"
                    ]
                },
                {
                    "name": "Apple",
                    "ratting": "4",
                    "price": "37",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxRWVKmgC4cGb-dxwSvQaLVHXDL-Jfw3KOZQ&usqp=CAU",
                    "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsmVvvGnGl-yBrLVDqL5LZ0vr83qi42YU8XA&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPUVXIfiRJD_HSYfnOEC-n_0jeZ8VAKobMUA&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR45Y-D-QBAZd4joifuchw9B4sCZ030WV6FkQ&usqp=CAU"
                    ]
                },
                {
                    "name": "Orange",
                    "ratting": "3",
                    "price": "120",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyec8yHZI4AVsecsE-qWYfB5s8heOrxcWGdQ&usqp=CAU",
                    "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-w7ivxdFMWymwq1lRQxYUTcpfy3bHk8EutQ&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqzxK03P7hzD14vgUlBuKPWVHr1iJXdkC2Wg&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4LXkbxSexq9mf-Ks4HO05Iwfhnu1VkuuJQg&usqp=CAU"
                    ]
                },
                {
                    "name": "Jackfruit",
                    "ratting": "4",
                    "price": "43",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2rAjSgqB8bsiAcixQHaMmRqWHPVG2Yy_ONA&usqp=CAU",
                    "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCl-CP-PYJ_X2tR6fvzLjISDdBuIzC0vX0JQ&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFbyFGt8xOPJQFYpE2htVeHK114HSu-peZYg&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiN4PM6c8ij-WQgChydI6cXJAxxqrK6GoPiQ&usqp=CAU"
                    ]
                },
                {
                    "name": "Goava",
                    "ratting": "4.5",
                    "price": "80",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbTke5MmeG3o6wZX-UewTBpDyuXCLcYnO2Vw&usqp=CAU",
                    "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKzW5zO6JQBoDmEc-Ks_yyFccELOe7x6jIA&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvjPoCYwQ1hMnzqIPYhd8BFlSNYYnTrqANJw&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXliNIewav6aEf2-K0vLyJotxB3fJQjSvjyw&usqp=CAU"
                    ]
                }
            ]


            const options = { ordered: true };
            const result = await productsCollection.insertMany(docs, options);
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
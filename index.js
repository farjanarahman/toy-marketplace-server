// const express = require('express');
// const app = express();
// var cors = require('cors');
// const port = process.env.PORT || 5000;
// const toy = require("./data/category.json")
// app.use(cors())

// app.get('/', (req, res) => {
//     res.send('Hello World! This is Farjana')
//   });
//   app.get('/toys', (req, res)=> {
//       res.send(toy);
//   })

// app.get('/toys/:id',(req,res)=>{
//     const id = req.params.id;
//     console.log(id)
//     const selectedToys = toy.find(res=>res.id == id)
//     res.send(selectedToys);
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//   })

const express = require('express');
const app = express();
require('dotenv').config();
var cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zvmk2.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const toyCollection = client.db('toyDB').collection('toy');

    app.get('/toy', async(req, res) => {
      const cursor = toyCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

  app.post('/toy', async(req, res) => {
    const newToy = req.body;
    console.log(newToy);
    const result = await toyCollection.insertOne(newToy);
    res.send(result);
  })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Robotic Play Ground is running')
  });

  app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })


      // puBwQd9cRCJ0Juk7
      // robo_playground
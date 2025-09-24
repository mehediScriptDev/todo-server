require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000;

// middlewares
app.use(cors());
app.use(express.json());

// 
// 



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wld9ndi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    
    
    const listCollections = client.db("todo").collection("lists");


    app.get('/todo-lists', async(req,res)=>{
        const email = req.query.email;
        const result = await listCollections.find({email}).toArray();
        res.send(result);
    })


    app.post('/todo-lists',async(req,res)=>{
        const list = req.body;
        const result = await listCollections.insertOne(list);
        res.send(result);
    })

    app.delete('/todo-lists/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await listCollections.deleteOne(query);
      res.send(result);
    });






    await client.connect();
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
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
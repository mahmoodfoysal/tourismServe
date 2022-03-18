const express = require('express')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000;

// mongoDB connection 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qwkqk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const database = client.db("tourismSite");
      const serviceCollection = database.collection("serviceCollection");
      const bookingCollection = database.collection("bookingCollection")
      // create a document to insert
      
    //   post method for add products 
      app.post('/services', async(req, res) => {
          const services = req.body;
          console.log('req data', services)
          const result = await serviceCollection.insertOne(services)
          res.json(result)
      })

      // get method for services 
      app.get('/services', async(req, res) => {
        const cursor = serviceCollection.find({})
        const result = await cursor.toArray();
        res.send(result)
      })

      app.get('/services/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)}
        const service = await serviceCollection.findOne(query)
        res.json(service);
      })

      // booking post data 
      app.post('/booking', async(req, res) => {
        const service = req.body;
        console.log(service)
        const result = await bookingCollection.insertOne(service)
        res.json(result)
      })

      //orders get data
      app.get('/booking', async(req, res) => {
        const cursor = bookingCollection.find({})
        const result = await cursor.toArray()
        res.send(result)
      })

      // my order get by email id 
      

    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.use(cors());
app.use(express.json());







app.get('/', (req, res) => {
  res.send('Express Running!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
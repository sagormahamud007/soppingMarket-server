const express=require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors=require('cors')
const port=process.env.PORT|5000;
require('dotenv').config()

const app = express()



//middleware
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uuzniqz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



app.get('/', (req, res) => {
    res.send('shopping market running')
})

async function run(){
    try{
        const bannerDataCollection = client.db('shoppingMarket').collection('bannerData')

app.get("/bannerProduct", async(req,res) => {
const query={};
const bannerData=await bannerDataCollection.find(query).toArray();
res.send(bannerData)
})




    }
    finally{

    }
}run().catch(err => console.error(err))




app.listen(port, (req, res) => {
    console.log(`shopping market running the port number ${port}`);
})
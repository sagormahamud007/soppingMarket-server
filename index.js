const express=require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const CartCollection = client.db('shoppingMarket').collection('cartCollection')
        const feturesCollection = client.db('shoppingMarket').collection('feturesData')

app.get("/bannerProduct", async(req,res) => {
const query={};
const bannerData=await bannerDataCollection.find(query).toArray();
res.send(bannerData)
})

app.get("/features",async (req,res)=>{
    const query={}
    const result=await feturesCollection.find(query).toArray();
    res.send(result)
})

app.get("/features/:id",async (req,res)=>{
    const query=(req.params.id);
    console.log(query)
    const id={_id: ObjectId(query)}
    const result=await feturesCollection.findOne(id);
    res.send(result)
})

app.post("/cartData",async(req,res)=>{
const cartData=req.body;
const result=await CartCollection.insertOne(cartData);
res.send(result)
})

app.get("/cartData", async(req,res) => {
    const email=req.query.email;
    const query={email:email};
    const cartData=await CartCollection.find(query).toArray();
    res.send(cartData)
    })

}
    finally{

    }
}run().catch(err => console.error(err))




app.listen(port, (req, res) => {
    console.log(`shopping market running the port number ${port}`);
})
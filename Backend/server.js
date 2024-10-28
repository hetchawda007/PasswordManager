import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ObjectId } from 'mongodb';
dotenv.config();

const app = express()
const port = 3000
console.log('hey');
const dbName = 'Taskmanager';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

app.use(cors())
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.send(findResult)
})

app.post('/', async (req, res) => {
    await client.connect();
    let data = req.body
    console.log(data);
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(data);
    res.send({success : true, result : findResult})
})


app.delete('/', async (req, res) => {
    await client.connect();
    let data = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(data);
    res.send({success : true, result : findResult})
})

app.put('/', async (req, res) => {
    await client.connect();
    let data = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.updateOne({_id :new ObjectId(data._id)} ,{$set:{site : data.site,username: data.username, password : data.password}});
    res.send({success : true, result : findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
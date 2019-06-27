const MongoClient = require('mongodb').MongoClient;
const {uri,db}= require('./config');

const addNote = async id => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const usersCollection = await client.db(db).collection("notes");
    await usersCollection.insertOne(id);
    console.log("1 document inserted");
    client.close();
};
const getNotes  = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const usersCollection = await client.db(db).collection("notes");
    const data = await usersCollection.find({}).toArray();
    client.close();
    return data;
};
// const deleteNote = async id => {
//     const client = new MongoClient(uri, { useNewUrlParser: true });
//     await client.connect();
//     const usersCollection = await client.db(db).collection("notes");
//     // id = id.split('/');
//     // id = id[2];
//     // console.log(id);
//     await usersCollection.deleteOne(id);
//     console.log('deleted one user');
//     client.close();
//     // return "ddd"
// };

const deleteNote = async id => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const usersCollection = await client.db(db).collection("notes");
    const data = await getNotes();
    const title = await  data.find(item=>item['_id']==id)['Title'].toString();
    const content = await  data.find(item=>item['_id']==id)['Content'].toString();
    await usersCollection.deleteOne( {Title:title,Content:content});
    client.close();
};

const addList = async user => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const usersCollection = await client.db(db).collection("lists");
    await usersCollection.insertOne(user);
    console.log("1 document inserted");
    client.close();
};
const getLists  = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const usersCollection = await client.db(db).collection("lists");
    const data = await usersCollection.find({}).toArray();
    client.close();
    return data;
};
const deleteList = async id => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const usersCollection = await client.db(db).collection("lists");
    await usersCollection.deleteOne(id);
    console.log('deleted one user');
    client.close();
};

module.exports = {
    addList,
    addNote,
    getLists,
    getNotes,
    deleteList,
    deleteNote
};
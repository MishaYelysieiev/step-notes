const express = require('express');

const app = express();

const db = require('./db/');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.set('view engine','ejs');

app.get('/notes/create',(req,res)=>{
    res.render('pages/notes/create');
});

app.post('/notes/create',(req,res)=>{
    console.log(req.body);
    db.addNote(req.body);
    res.json(req.body.request == "true")
});

app.get('/lists/create',(req,res)=>{
    res.render('pages/lists/create');
});

app.get(`/notes/edit`,(req,res)=>{
    res.render('pages/notes/edit');
});

app.get('/lists/edit',(req,res)=>{
    res.render('pages/lists/edit');
});

app.delete('/notes/:id', async (req,res)=>{
    console.log(req.params.id);
    await db.deleteNote(req.params.id);
    res.send("id");
});

app.get('/',async (req,res)=>{
    const notes = await db.getNotes();
    const lists = await db.getLists();
    res.render('pages/index',{
        notes,
        lists
    });
});


app.listen(3000);

console.log('everything is OK');
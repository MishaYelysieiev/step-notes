const express = require('express');

const app = express();

const db = require('./db/');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.set('view engine','ejs');

app.get('/',async (req,res)=>{
    const notes = await db.getNotes();
    const lists = await db.getLists();
    res.render('pages/index',{
        notes,
        lists
    });
});

app.get('/notes/create',(req,res)=>{
    res.render('pages/notes/create');
});

app.get('/lists/create',(req,res)=>{
    res.render('pages/lists/create');
});

app.get('/notes/id:',(req,res)=>{
    res.render('pages/notes/edit');
});

app.get('/lists/edit',(req,res)=>{
    res.render('pages/lists/edit');
});

app.delete('/notes/:id', async (req,res)=>{
    await db.deleteNote(req.params.id);
    res.send("id");
});

app.delete('/lists/:id', async (req,res)=>{
    await db.deleteList(req.params.id);
    res.send("id");
});

app.post('/notes/create',(req,res)=>{
    db.addNote(req.body);
    res.json(req.body.request == "true")
});

app.post('/lists/:id',async (req,res)=>{
    await db.updateCheckListItem(req.params.id,req.body.data);
    res.end()
});

app.post(`/notes/:id`,async (req,res)=>{
    const data = await db.showNoteData(req.params.id);
    console.log(data);
    res.render('pages/notes/edit', {
        data
    });
});



app.listen(3000);

console.log('everything is OK');
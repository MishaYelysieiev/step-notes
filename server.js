const express = require('express');
const app = express();
const db = require('./db/');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));

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

app.get('/notes/:id',async (req,res)=>{
    try {
        console.log(req.params.id);
        const data = await db.showNoteData(req.params.id);
        res.render('pages/notes/edit', {
            title: data.Title,
            content: data.Content
        });
    } catch (e) {
        console.log(e);
    }
});

app.get('/lists/edit',(req,res)=>{
    res.render('pages/lists/edit');
});

app.delete('/api/notes/:id', async (req,res)=>{
    await db.deleteNote(req.params.id);
    res.send("id");
});

app.delete('/api/lists/:id', async (req,res)=>{
    await db.deleteList(req.params.id);
    res.send("id");
});

app.post('/notes/create',(req,res)=>{
    db.addNote(req.body);
    res.json(req.body.request == "true")
});

app.post('/lists/:id',async (req,res)=>{
    await db.updateCheckListItem(req.params.id,req.body.data);
});

// app.post(`/notes/edit`,async (req,res)=>{
//     const data = await db.showNoteData(req.body.id);
//     console.log(data);
//     console.log(data.Title);
//     res.redirect('/notes/:id');
//
//     res.render('pages/notes/edit', {
//         title: data.Title,
//         content: data.Content
//     });
// });



app.listen(3000);

console.log('everything is OK');
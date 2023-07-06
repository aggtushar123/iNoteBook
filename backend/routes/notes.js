const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');



router.get('/fetchallnotes', fetchUser, async (req,res)=>{
    try {
        const note = await Notes.find({user: req.user.id});
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error")
    }
    
})

router.post('/addnote', fetchUser, [
    body('title', 'Please enter a valid title').isLength({min: 3}),
    body('description','Description must be atleast 5 characters').isLength({min:5}),
], async (req,res) => {
    try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()});
    }

    const {title,description,tag} = req.body;
    const note = new Notes({
        title, description, tag, user: req.user.id
    })

    const savedNote = await note.save()
    res.json(savedNote)
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error")
    }
    
})

router.put('/updatenote/:id', fetchUser, async(req,res) =>{
    const {title, description, tag} = req.body

    //Create a new note object
    const newNote ={};
    if(title){newNote.title =title}
    if(description){newNote.description=description}
    if(tag){newNote.tag = tag}

    // Find the id to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){
       return res.status(404).send("Not found")
    }

    if(note.user.toString() !== req.user.id){
        return res.status(404).send("Not allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});

})

router.delete('/deletenote/:id', fetchUser, async(req,res)=>{
try{
    let note = await Notes.findById(req.params.id)
    if(!note){
        return res.status(400).send("Not Found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(404).send("Not allowed")
    }
    note = await Notes.findOneAndDelete(req.params.id)
    return res.json({"Success": "Note has been deleted"});
}
catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server error")
}
})

module.exports = router
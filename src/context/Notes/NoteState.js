
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{

    const notesInitial = [
        {
        "_id": "64a59412edfd24a4e79ed23b9",
        "user": "64a553bf188ca0deb9cf099b",
        "title": "Tushar",
        "description": "I am Tushar",
        "tag": "Personal",
        "date": "2023-07-05T16:02:26.838Z",
        "__v": 0
      },
      {
        "_id": "64a59412edf2d24ae79ed23b9",
        "user": "64a553bf188ca0deb9cf099b",
        "title": "Tushar",
        "description": "I am Tushar",
        "tag": "Personal",
        "date": "2023-07-05T16:02:26.838Z",
        "__v": 0
      },
      {
        "_id": "64a59412edfd24ae79ed123b9",
        "user": "64a553bf188ca0deb9cf099b",
        "title": "Tushar",
        "description": "I am Tushar",
        "tag": "Personal",
        "date": "2023-07-05T16:02:26.838Z",
        "__v": 0
      },
      {
        "_id": "64a59412edfd24ae79ed233b9",
        "user": "64a553bf188ca0deb9cf099b",
        "title": "Tushar",
        "description": "I am Tushar",
        "tag": "Personal",
        "date": "2023-07-05T16:02:26.838Z",
        "__v": 0
      },
      {
        "_id": "64a59412edfd243ae79ed23b9",
        "user": "64a553bf188ca0deb9cf099b",
        "title": "Tushar",
        "description": "I am Tushar",
        "tag": "Personal",
        "date": "2023-07-05T16:02:26.838Z",
        "__v": 0
      },
      
      {
        "_id": "64a59412edfd324ae79ed23b9",
        "user": "64a553bf188ca0deb9cf099b",
        "title": "Tushar",
        "description": "I am Tushar",
        "tag": "Personal",
        "date": "2023-07-05T16:02:26.838Z",
        "__v": 0
      },
      
      {
        "_id": "64a859546e058baf38cb3e7aa",
        "user": "64a553bf188ca0deb9cf099b",
        "title": "Tushar Aggarwal",
        "description": "I am Tushar Aggarwal",
        "tag": "Personal",
        "date": "2023-07-07T18:28:36.526Z",
        "__v": 0
      }
    ]
    const [notes,setNotes] = useState(notesInitial);

    //Add a note
    const addNote = (title, description, tag) =>{
        const note = {
            "_id": "64a59412edfd24a4e79ed23b9",
            "user": "64a553bf188ca0deb9cf099b",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-07-05T16:02:26.838Z",
            "__v": 0
          };
        setNotes(notes.concat(note))
    }
    //Delete a note 
    const deleteNote =(id) =>{
        console.log("Deleting note with id" + id);
        const newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote)
    }
    //Edit a note
    const editNote = (id, title, description, tag) =>{

    }
    return (
        <noteContext.Provider value ={{notes, setNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState
import NoteContext from './noteContext';
import { useState } from "react";


const NoteState = (props) =>{
    const notesInitial = [
        {
          "_id": "6336ca46f91bb5a965285481b",
          "user": "6332bb0aeddd87ed551dd0c10",
          "title": "My first note",
          "description": "My name is vivek, i'm a coder",
          "tag": "personal",
          "date": "2022-09-30T10:51:50.288Z",
          "__v": 0
        },
        {
          "_id": "633ff78aaabeac70e20d4d022",
          "user": "6332bb0aeddd87ed551dd0c20",
          "title": "My first note3",
          "description": "My name is vivek, i'm a coder also a gamer",
          "tag": "personal",
          "date": "2022-10-07T09:55:22.612Z",
          "__v": 0
        },
        {
            "_id": "6336ca46f91bb5a965285483b",
            "user": "6332bb0aeddd87ed551dd0c30",
            "title": "My first note",
            "description": "My name is vivek, i'm a coder",
            "tag": "personal",
            "date": "2022-09-30T10:51:50.288Z",
            "__v": 0
          },
          {
            "_id": "633ff78aaabeac70e20d4d042",
            "user": "6332bb0aeddd87ed551dd0c40",
            "title": "My first note3",
            "description": "My name is vivek, i'm a coder also a gamer",
            "tag": "personal",
            "date": "2022-10-07T09:55:22.612Z",
            "__v": 0
          },
          {
            "_id": "6336ca46f91bb5a965285485b",
            "user": "6332bb0aeddd87ed551dd0c50",
            "title": "My first note",
            "description": "My name is vivek, i'm a coder",
            "tag": "personal",
            "date": "2022-09-30T10:51:50.288Z",
            "__v": 0
          },
          {
            "_id": "633ff78aaabeac70e20d4d062",
            "user": "6332bb0aeddd87ed551dd0c60",
            "title": "My first note3",
            "description": "My name is vivek, i'm a coder also a gamer",
            "tag": "personal",
            "date": "2022-10-07T09:55:22.612Z",
            "__v": 0
          },
        
      ]
      const [notes, setNotes] = useState(notesInitial)

      //Add a note
      const addNote = (title,description,tag) => {
        //TODO: Call APi
        console.log("Adding a new note")
        const note = {
          "_id": "6336ca46f91bb5a96528548b",
          "user": "6332bb0aeddd87ed551dd0c0",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-09-30T10:51:50.288Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }

      //delete a note
      const deleteNote = (id)=>{
        
      }
      //Edit a note
      const editNote = (id)=>{  
        
      }


    return(
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
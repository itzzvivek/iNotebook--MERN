const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route1 : fetch all Note using: GET "/api/auth/getuser". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
try {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured")
}
});

//Route2 : Add a new Note using: POST "/api/auth/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors, return Bad request and the errors
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Some Error Occured")
    }
  }
);

//Route:3 Update an  exixting note by using: PUT"api/notes/updatenote". login required

router.put("/updatenote/:id",fetchuser,async (req, res) => {
  const{title,description,tag} = req.body;
  //create a newnNote object
  const newNote = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};

  //find the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if(!note){res.status(404).send("NOt Found")}

  if(note.user.toString() !== req.user.id){
    return res.status(401).send("NOt Allowed");
  }

  note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
  res.json({note});

  })
  

//Route:3 Delete an exixting note by using: DELETE"api/notes/deletenote". login required

  router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    const{title,description,tag} = req.body;

    //find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")}

    //Allow deletion only if user own this note
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
    }
  
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been Deleted", note: note});
  
    })
module.exports = router;
 
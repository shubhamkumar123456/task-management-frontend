
const Notes = require("../models/Tasks")

//Route 1: get all the Notes  using : GET "/api/notes/getuser". Login required
const fetchAllTasks=async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }

}
// ROUTE2: Add a new Note using : POST "/api/notes/addnote"  . login required
const createTask= async (req, res) => {
    try {
        const { title, description,markAsComplete } = req.body;
      
        const note = new Notes({
            title, description, markAsComplete, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
}

// ROUTE3: update an existing Note using PUT "/api/notes/updatenote"  .login required
const deleteTask= async (req, res) => {
    try {
        //find the note to be delete and delete it
        let note = await Notes.findById(req.params.id)
        console.log(req.params.id)
        console.log(note)
        if (!note) { return res.status(404).send("Not Found") }
        // allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Seccess":"Note has been deleted",note:note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
}

// ROUTE4: delete an existing Note using DELETE "/api/notes/updatenote"  .login required
const updateTask = async (req, res) => {
    const { title, description, markAsComleted } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (markAsComleted) { newNote.markAsComleted = markAsComleted };

        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        console.log(req.params.id)
        console.log(note)
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
}

module.exports = {
    fetchAllTasks,
    createTask,
    deleteTask,
    updateTask
}
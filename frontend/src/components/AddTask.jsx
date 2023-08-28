
import TaskContext from '../context/TaskContext';
import './AddTask.css'
import React, { useContext, useState } from 'react'

const AddTask = (props) => {
    const context = useContext(TaskContext)
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", Description: "", markAsComleted: "" });
    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title, note.Description, note.markAsComleted);
        setnote({ title: "", Description: "", markAsComleted: "" })
        props.showAlert("Added successfully", "success")
    }
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClose=()=>{
        props.setclicked(!props.clicked)
    }
    return (
        <div className='addTask' style={{width:"700px",margin:"auto",background:"black",color:"white",borderRadius:"30px",padding:"30px",marginTop:"30px"}}>
            <div className="container my-3">
                <h2 style={{textAlign:"center"}}> Add a Task</h2>
                <i onClick={handleClose} className='fas fa-xmark'></i>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" name='title' value={note.title} id="title" aria-describedby="emailHelp" onChange={onchange} placeholder={"must be atleast 5 character"} required/>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="form-label">Description</label>
                        <textarea type="text" className="form-control" name='Description' value={note.Description} id="Description" onChange={onchange} placeholder={"must be atleast 5 character"}  required/>
                    </div>
            
                    <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>
            </div>

        </div>
    )
}

export default AddTask

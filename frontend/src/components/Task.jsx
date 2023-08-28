import React, { useContext, useState,} from 'react'
import TaskContext from '../context/TaskContext';
import AddTask from './AddTask'
import './Task.css'

const Task = (props) => {
const ctx = useContext(TaskContext)
  console.log(ctx.notes)
const [clicked, setclicked] = useState(false);
  const handleCross=(note)=>{
    console.log("clicked",note)
    let markAsComleted=true
    ctx.editNote(note._id,note.title,note.description,markAsComleted)
  }

  const handleClick =()=>{
setclicked(!clicked)
  }
  return (
    <div className='task'>
      <div className='addTaskContainer'>
       {!clicked && <button style={{marginTop:"10px",padding:"10px"}} className='btn btn-success' onClick={handleClick}>Clich here to add Task</button>}
      {clicked && <AddTask showAlert={props.showAlert} clicked={clicked} setclicked={setclicked}/>}
      </div>
    <div className='taskContent'>
      <div className='taskNames'>
        <p className='taskNamesTitle'>Title</p>
        <p className='taskNamesTitle'>Description</p>
        <p className='taskNamesTitle'>Completed</p>
      </div>
  {
    ctx.notes.map((note)=>{
      return <div className='taskNotes' key={note._id}>
        <p className={`${!note.markAsComleted?"taskNotesTitle":"taskNotesTitle green"}`}>{note.title}</p>
        <p className={`${!note.markAsComleted?"taskNotesDesc":"taskNotesDesc green"}`}>{note.description}</p>
        <p className={`${!note.markAsComleted?"taskNotesTitleCross":"taskNotesTitleCross green"}`}>{!note.markAsComleted ?<i style={{cursor:"pointer"}} className='fas fa-xmark' onClick={()=>{handleCross(note)}}></i>:<i className='fas fa-check'></i>}</p>
      </div>
    })
  }
  </div>
    </div>
   
  )
}

export default Task


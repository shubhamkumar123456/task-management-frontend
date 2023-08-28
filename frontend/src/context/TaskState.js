
import { useEffect, useState } from "react";
import TaskContext from "./TaskContext";

const TaskState = (props) => {
  const token =localStorage.getItem('token');
  const host = "https://task-management-api-taupe.vercel.app"
  const notesInitial = [{}];
  const [notes, setnotes] = useState(notesInitial);
  // get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/task/fetchAllTask`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':  localStorage.getItem('token')
      }
    });
    const allnotes = await response.json()
    setnotes(allnotes)
  }


  // add a note
  const addNote = async (title, description, markAsComleted) => {
    const response = await fetch(`${host}/api/task/createTask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, markAsComleted })
    });
    const note = await response.json()
    // console.log(note)
    setnotes(notes.concat(note))

  }
  // delete a note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/task/deleteTask/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = response.json();
    // console.log(json)
    // console.log("deleting the note id ", id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)
  }

  //edit a note
  const editNote = async (id, title, description, markAsComleted) => {
    const response = await fetch(`${host}/api/task/updateTask/${id}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },

      body: JSON.stringify({ title, description, markAsComleted})
    });
    const json = response.json();
    let newNotes= notes.slice()
    // let newNotes = JSON.parse(json.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].markAsComleted = markAsComleted;
        break;
      }
    }
    setnotes(newNotes);
  }
  return (
    <TaskContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes,token }}>
      {props.children}
    </TaskContext.Provider>
  )
}
export default TaskState;
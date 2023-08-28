import React from 'react'
import Task from '../components/Task'
import './Home.css'

const Home = (props) => {
  return (
    <div className='home'>
      <center><Task showAlert={props.showAlert}/></center>
    </div>
  )
}

export default Home

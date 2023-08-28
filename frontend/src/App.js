
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Home from './pages/Home';

import { useContext, useState } from 'react';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import TaskContext from './context/TaskContext';

function App() {
const ctx = useContext(TaskContext)

  const [alert, setalert] = useState(null);
  const showAlert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null)
    },1500);
  }
  return (
    <div className="App">
  
      <BrowserRouter>
      <Navbar/>
      <Alert alert={alert}/>

      <Routes>
   {ctx.token && <Route path='/' element={<Home showAlert={showAlert}/>}/>}
   {!ctx.token && <Route path='/' element={<Login showAlert={showAlert}/>}/>}
   
 
   

        <Route path='/signup' element={<Signup showAlert={showAlert}/>}/>
      <Route path='/login' element={<Login showAlert={showAlert}/>}/>
      {!ctx.token && <Route path="/" element={ <Navigate to="/login" /> } />}
      {/* {token && <Route path="/login" element={ <Navigate to="/" /> } />} */}
  
        
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

const connectToMongo = require("./db")
const express = require('express');
const app = express(); 
var cors = require('cors')
connectToMongo()
const userRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/task');
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 3001;


// available routes;
app.use('/api/auth',userRoutes)
app.use('/api/task',tasksRoutes)


app.listen(PORT,()=>{
    console.log(`iNotebook server is running at ${PORT} port`)
})

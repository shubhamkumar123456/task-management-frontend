const mongoose =require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user' //this is the name of model collection
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    markAsComleted:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    },
    
});
module.exports = mongoose.model('tasks', taskSchema);
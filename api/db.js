const mongoose=require('mongoose');

const connectToMongo = async () => {
    try {
      await mongoose.connect('mongodb+srv://clboy768:vw9aBkvigar5JYKH@cluster0.jbmjxmn.mongodb.net/taskMangement?retryWrites=true&w=majority');
      console.log("connected to mongoDB");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


  module.exports =connectToMongo;
const mongoose = require("mongoose");
const URL = process.env.MONGODBURL;
mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully");
    const currentDatabase = mongoose.connection.db.databaseName;
    console.log("Currently connected to database:", currentDatabase);
  })
  .catch((error) => {

    console.error("Error connecting to MongoDB Atlas:", error.message);
  });


  
  // async function listCollections() {
  //   try {
  //     // Access the default database
  //     const db = mongoose.connection.db;
  
  //     // Get the list of collections
  //     const collections = await db.listCollections().toArray();
  
  //     // Log the collections
  //     console.log('Collections:', collections);
  //     console.log('Number of collections:', collections.length);
  //   } catch (err) {
  //     console.error('Error listing collections:', err);
  //   }
  // }



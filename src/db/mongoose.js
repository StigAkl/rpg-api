const mongoose = require('mongoose'); 

const connectionUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/rpg-adventures";

 mongoose.connect(connectionUrl, {
     useNewUrlParser: true,
     useCreateIndex: true,
     useFindAndModify: false  //To avoid deprecation warnings...
 });
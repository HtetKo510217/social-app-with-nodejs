const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin123@cluster0.esusvey.mongodb.net/socialApp?retryWrites=true&w=majority";

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 },(err,client)=>{
    if (err) {
        return console.log("Connection failed for some reason");
      }
    module.exports = client.db()
    const app = require('./app')
   
    app.listen(3000,()=> {
        console.log('server is running port 3000');
    })

})

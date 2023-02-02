const dotenv = require('dotenv')
dotenv.config()
const { MongoClient, ServerApiVersion } = require('mongodb');

MongoClient.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 },(err,client)=>{
    if (err) {
        return console.log("Connection failed for some reason");
      }
    module.exports = client
    const app = require('./app')
   
    app.listen(process.env.PORT,()=> {
        console.log('server is running port',process.env.PORT);
    })

})

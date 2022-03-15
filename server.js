const http = require('http')
const app = require('./app')
require('dotenv').config();

const server = http.createServer(app)
const port = process.env.PORT || 4000

server.listen(port, (err)=>{
    if(err){
        console.error(err, "couldn't connect to", port)
    }
    console.clear();
    console.log("Server is running at", port)
    // console.log(new  Date().toISOString())
})

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./firebase')
const app = express()


app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


const snapshot = await db.collection('users').get();
snapshot.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
});index.js

// app.use(identifyError,handleError)

function identifyError(req,res,next){
    const err = new Error("Endpoint Not Found")
    err.status = 404
    next(err)
}
function handleError(err,req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.status(err.status || 500).json({
       error: {
            message: err.message || "endpoint not found",
            statusCode: err.status || 500,
            redirect: true,
            to: process.env.HOST
       }
    })
}


module.exports = app;

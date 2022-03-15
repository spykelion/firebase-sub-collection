const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./firebase-config");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* 
async function getRoomDocs(id) {
  const snapshot = await db.collection("rooms").get();
  const messages = await getMessages(id);
  let messageArray = [];
  messages.forEach((doc) => {
    console.log(doc.data());
    messageArray = [...messageArray, { id: doc.id, ...doc.data() }];
  });
  return messageArray;
} */

async function getMessages(roomID) {
  const messageRef2 = db.collection("rooms").doc(roomID).collection("messages");
  const messageSnapshot = await messageRef2.get();
  let messageArray = [];
  messageSnapshot.forEach((doc) => {
    console.log(doc.data());
    messageArray = [...messageArray, { id: doc.id, ...doc.data() }];
  });
  return messageArray
}

app.get("/:roomId", async (req, res) => {
  // const id = req.params.id
  if(req.params.roomId){
     await getMessages(req.params.roomId)
    .then((result) => {
      console.log("result", result);
      res.status(200).send(result);
    })
    .catch((err) => res.status(503).send(err));  
  }

  return res.status(301).send({
      message: "No id supplied"
  })
 
  // return res.status(200).send(docs)
});

// app.use(identifyError,handleError)

function identifyError(req, res, next) {
  const err = new Error("Endpoint Not Found");
  err.status = 404;
  next(err);
}
function handleError(err, req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(err.status || 500).json({
    error: {
      message: err.message || "endpoint not found",
      statusCode: err.status || 500,
      redirect: true,
      to: process.env.HOST,
    },
  });
}

module.exports = app;

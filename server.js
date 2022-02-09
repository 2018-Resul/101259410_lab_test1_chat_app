var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var cors = require('cors')
const path = require('path')

const userRouter = require('./routes/UserRoutes')


var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, { cors: { origin: "*" } });

app.use(express.static(path.join(__dirname, '/')))
app.use(cors())
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.get("/", (req, res) => {
  res.send("Server running...")
})

app.get("/index.html", (req, res) => {
  res.sendFile(__dirname + '/index.html')
})



var Message = mongoose.model('Message', {
  username: String,
  message: String,
  room: String
})


var dbUrl = "mongodb+srv://resul:resulpassword@comp3123resul.xubgo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" 

var message;

app.post('/messages', (req, res) => {

  message = new Message(req.body);

  message.save((err) => {
    if (err) {
      console.log(err)
    }

    res.sendStatus(200);
  })
})


app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  })
})


const users = [];

io.on('connection', (socket) => {

  console.log(`New user Connected`)

  socket.broadcast.emit("goChatRoom", ({ username: `User Connected `, message: '' }))

  socket.on('userInfo', ({ username, room, message }) => {
    users.push(username)

    socket.join(room)

    socket.broadcast.to(room).emit("goChatRoom", ({ username, room, message }))

    socket.emit("goChatRoom", ({ username, room, message }))


  });

  socket.on("disconnect", () => {
    io.emit("message", ({ username: '', message: `User left channel` }))
  })

})




mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('connected');
  } else {
    console.log('Successfully connected');
  }
})



app.use(userRouter);


server.listen(3333, () => {
  console.log('running ', server.address().port);
});



const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const toDo = ['clean your rum']
const complete = ['wash the dog']

app.set('view engine', 'mustache')
app.engine('mustache', mustache())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, function() {
  console.log("Working!");
})

app.get('/', function(request, response){
  response.render("index", {
    todos: toDo,
    complete: complete
  })
})

app.post('/', function(request, response) {
  const task = request.body.task
  const completed = request.body.complete
  if (task) {
    toDo.push(task)
  } else if (completed) {
    complete.push(completed)
    const deleteIndex = toDo.indexOf(completed)
    toDo.splice(deleteIndex, 1)
  }
  response.redirect('/')
})

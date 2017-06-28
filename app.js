const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const models = require('./models')


app.set('view engine', 'mustache')
app.engine('mustache', mustache())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false
}));

app.listen(3000, function() {
  console.log("Working!");
})

app.get('/', function(request, response) {
  models.Todo.findAll({
    order: ['createdAt']
  }).then(function(task) {
    response.render("index", {
      todos: task
    })
  })
})

app.post('/', function(request, response) {
  const task = request.body.task
  const completed = request.body.complete
  const deleted = request.body.delete
  const edit = request.body.edit
  if (task) {
    const todo = models.Todo.build({
      task: task,
      completed: false
    });
    todo.save().then(function(newTodo) {})
  } else if (completed) {
    models.Todo.update({
      completed: true
    }, {
      where: {
        id: completed
      }
    }).then(function(todo) {})
  } else if (deleted) {
    models.Todo.destroy({
      where: {
        id: deleted
      }
    }).then(function(task) {

    })
  }
  response.redirect('/')
})

app.post('/delete', function(request, response) {
  models.Todo.destroy({
    where: {
      completed: true
    }
  }).then(function(tasks) {})
  response.redirect('/')
})


app.get('/edit/:id', function(request, response) {
  const id = request.params.id
  models.Todo.findById(id).then(function(task) {
    response.render('edit', {
      task: task.task,
      id: id
    })
  })
})

app.post('/edit', function(request, response) {
  const taskUpdate = request.body.edit
  const id = request.body.submit
  models.Todo.update({
    task: taskUpdate
  }, {
    where: {
      id: id
    }
  }).then(function(tasks) {
    response.redirect('/')
  })
})

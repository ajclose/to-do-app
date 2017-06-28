const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
// const toDo = ['clean your room']
// const complete = ['wash the dog']
const models = require('./models')


app.set('view engine', 'mustache')
app.engine('mustache', mustache())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, function() {
  console.log("Working!");
})

app.get('/', function(request, response){
  models.Todo.findAll({order: ['createdAt']}).then(function(task) {
    response.render("index", {
      todos: task
      // complete: complete
    })
  })

})

app.post('/', function(request, response) {
  const task = request.body.task
  console.log('task', task);
  const completed = request.body.complete
  console.log('completed', completed);
  if (task) {
    const todo = models.Todo.build({
      task: task,
      completed: false
  });
  todo.save().then(function (newTodo) {
})
  } else if (completed){
    models.Todo.update({
      completed: true
    }, {
      where: {
        id: completed
      }

    }).then(function(todo) {
    })

    }

  response.redirect('/')
})

app.post('/delete', function(request, response) {
  console.log('clicked!');
  models.Todo.destroy({
    where: {
      completed: true
    }
  }).then(function(tasks) {
    console.log(tasks)
  })
  response.redirect('/')
})

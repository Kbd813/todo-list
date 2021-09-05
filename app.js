
const form = document.getElementById("form")
const taskList = document.getElementById("tasks-list")
const taskTemplate = document.getElementById("template-task").content
const fragment = document.createDocumentFragment()
let tasks = {

}

form.addEventListener('submit', e => {
  e.preventDefault()
  setTask(e)
})

const setTask = e => {
  if(e.target.querySelector('#task').value.trim() === '')
    return

  let task = {
    id: Object.keys(tasks).length + 1,
    name: e.target.querySelector('#task').value,
    status: false,
  }

  tasks[task.id] = task
  form.reset()
  updateTasks()
}

taskList.addEventListener('click', e => {
  btnAction(e)
})

const updateTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))

  if(Object.keys(tasks).length === 0){
    taskList.innerHTML = 
    `<div class="alert alert-dark"> 
    There are no tasks 
    </div>`
    return
  }
    
  taskList.innerHTML = null
  Object.values(tasks).forEach(task => {
    const clone = taskTemplate.cloneNode(true)

    if(task.status){
      clone.querySelector('.alert').classList.replace('alert-warning', 'alert-success')
      clone.querySelector('#task-name').classList.add('text-decoration-line-through')
      clone.querySelector('#action-button').classList.replace('fa-check-circle', 'fa-undo-alt')
      clone.querySelector('#action-button').classList.replace('text-success','text-dark')
    }

    clone.querySelector('#task-name').textContent = task.name
    clone.querySelectorAll('.fas')[0].dataset.id = task.id
    clone.querySelectorAll('.fas')[1].dataset.id = task.id
    fragment.appendChild(clone)
  })
  taskList.appendChild(fragment)
}

const btnAction = e => {
  if (e.target.classList.contains('fa-check-circle')){
    tasks[e.target.dataset.id].status = true
    updateTasks()
  }
  if (e.target.classList.contains('fa-minus-circle')){
    delete tasks[e.target.dataset.id]
    updateTasks()
  }
  if (e.target.classList.contains('fa-undo-alt')){
    tasks[e.target.dataset.id].status = false
    updateTasks()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('tasks')){
    tasks =  JSON.parse(localStorage.getItem('tasks'))
  }
  updateTasks()
})
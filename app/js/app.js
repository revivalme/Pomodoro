// Init UI
const ui = new UI;
// Init timer
const timer = new Timer;

// DOM Elements
const startBtn = document.querySelector('#btnStart');
const stopBtn = document.querySelector('#btnStop');
const form = document.querySelector('#form');

// Events
document.addEventListener('DOMContentLoaded', () => {
  ui.updateTime(`${timer.getTime('default')}`);
})
startBtn.addEventListener('click', () => timer.start());
stopBtn.addEventListener('click', () => timer.stop());
form.addEventListener('submit', (e) => addTask(e));

// Add task
function addTask(e) {
  const taskCategory = form.querySelector('#input-category');
  const taskDescr = form.querySelector('#input-descr');

  if(taskCategory.value !== '' && taskDescr.value !== '') {
    // Get table element
    const table = document.querySelector('#todoTable');
    // Create task obj
    const task = new Task(taskCategory.value, taskDescr.value);
    // Put new task to todoTable
    ui.putTask(ui.createTask(task), table);
    // Clear inputs
    taskCategory.value = '';
    taskDescr.value = '';
  } else {
    // Show alert
  }

  // Prevent default event
  e.preventDefault();
}
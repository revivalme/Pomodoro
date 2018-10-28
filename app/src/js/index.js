import '../sass/main.sass';
import Task from './task';
import Timer from  './timer';
import UI from './ui';

// Init UI
const ui = new UI;
// Init timer
const timer = new Timer;
// DOM Elements
const startBtn = document.querySelector('#btnStart');
const stopBtn = document.querySelector('#btnStop');
const form = document.querySelector('#form');
const todoTable = document.querySelector('#todoTable');

// Events
document.addEventListener('DOMContentLoaded', () => {
  ui.updateTime(`${timer.getTime('default')}`);
})
startBtn.addEventListener('click', () => timer.start());
stopBtn.addEventListener('click', () => timer.stop());
form.addEventListener('submit', (e) => addTask(e));
todoTable.addEventListener('click', (e) => {
  // If target click is trash icon
  if(e.target.classList.contains('fa-trash-alt')) {
    ui.deleteTask(e.target.parentElement.parentElement);
  }
});

// Drag n drop task events
todoTable.querySelector('tbody').addEventListener('mousedown', (e) => {
  // If event on TR element, then add attribute
  if(e.target.parentElement.tagName === 'TR') {
    e.target.parentElement.setAttribute('draggable', 'true');
  }
});
todoTable.querySelector('tbody').addEventListener('mouseup', (e) => {
  // If user mouseup instead drag, then remove attribute
  if(e.target.parentElement.tagName === 'TR') {;
    e.target.parentElement.removeAttribute('draggable');
  }
});
todoTable.querySelector('tbody').addEventListener('dragenter', (e) => {
  const currentTask = e.target.parentElement;
  const dragEl = document.querySelector('tr[draggable=true');
  if(currentTask.tagName === 'TR' && currentTask !== dragEl) {
    // Compare offsetTop for good styling
    dragEl.offsetTop < currentTask.offsetTop ? 
    currentTask.style.borderBottom = '2px dotted #141414' :
    currentTask.style.borderTop = '2px dotted #141414';
  }
});
todoTable.querySelector('tbody').addEventListener('dragleave', (e) => e.target.parentElement.style.border = 0);
todoTable.querySelector('tbody').addEventListener('dragover', (e) => e.preventDefault());
todoTable.querySelector('tbody').addEventListener('drop', (e) => {
  const currentTask = e.target.parentElement;
  const dragEl = document.querySelector('tr[draggable=true');
  if(currentTask.tagName === 'TR' && currentTask !== dragEl) {
    currentTask.style.border = 0;
    dragEl.removeAttribute('draggable');

    const clone = dragEl.cloneNode(true);
    dragEl.offsetTop < currentTask.offsetTop ? 
    currentTask.after(clone) :
    currentTask.before(clone);

    dragEl.remove();
  }
});

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
    // Show alert
    ui.showAlert('Task added', 'alert-success');
  } else {
    // Show alert
    ui.showAlert('Task must contain info', 'alert-danger')
  }

  // Prevent default event
  e.preventDefault();
}
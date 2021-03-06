import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tab';
import '../sass/main.sass';
import { startBtn, stopBtn, form, todoTable, pomodoroDuration, shortBreakDuration, longBreakDuration, volumeValue, settingsModalSaveBtn } from './domVars';
import Task from './task';
import Timer from  './timer';
import UI from './ui';
import Store from './store';
import { audio } from './audio';

// Init Local Storage
const store = new Store;
// Settings config destruction
const { timerSettings: { duration, shortBreak, longBreak }, notificationSettings: { volume } } = store.getConfig();
// Init UI
const ui = new UI;
// Init timer
const timer = new Timer(timerCallback, duration, shortBreak, longBreak);

// Events
document.addEventListener('DOMContentLoaded', () => {
  ui.updateTime(`${timer.getTime('default')}`);

  // Update tasks
  const tasks = store.getConfig().tasks;
  tasks.forEach(task => ui.putTask(ui.createTask(task), todoTable));
  if (tasks.length > 0) {
    ui.showHide(todoTable);
  }

  // Put right settings values to UI
  pomodoroDuration.value = duration / 60;
  shortBreakDuration.value = shortBreak / 60;
  longBreakDuration.value = longBreak / 60;

  for (let i = 0; i < volumeValue.options.length; i++) {
    if (volumeValue.options[i].value == volume) {
      volumeValue.options[i].selected = true;
      return;
    }
  }
});
settingsModalSaveBtn.addEventListener('click', () => {
  const config = store.getConfig();
  config.timerSettings.duration = pomodoroDuration.value * 60;
  config.timerSettings.shortBreak = shortBreakDuration.value * 60;
  config.timerSettings.longBreak = longBreakDuration.value * 60;
  config.notificationSettings.volume = volumeValue.value;

  store.updateConfig(config);
  location.reload();
});
startBtn.addEventListener('click', () => timer.start());
stopBtn.addEventListener('click', () => timer.stop());
form.addEventListener('submit', (e) => addTask(e));
todoTable.addEventListener('click', (e) => {
  if(e.target.classList.contains('fa-check')) {
    const taskEl = e.target.parentElement.parentElement;
    deleteTask(taskEl);

    audio.play();
    ui.showAlert('Take a short break', 'alert-info', 5000);

    timer.reset();
    store.incrementCompleted();
    timer.start(store.getConfig().completed % 4 !== 0 ? 2 : 3);
  }
  // If target click is trash icon
  if(e.target.classList.contains('fa-trash-alt')) {
    const taskEl = e.target.parentElement.parentElement;
    deleteTask(taskEl);
  }
  // If target click is edit icon
  if(e.target.classList.contains('fa-edit')) {
    const taskEl = e.target.parentElement.parentElement;
    const task = store.getTask(taskEl.id);
    const editTaskEl = ui.createEditTask(task);
    taskEl.parentNode.replaceChild(editTaskEl, taskEl);
  }
  // If target click is save button
  if(e.target.classList.contains('save')) {
    const taskEl = e.target.parentElement.parentElement;
    const taskCategory = taskEl.querySelector('.edit-category').value;
    const taskDescr = taskEl.querySelector('.edit-description').value;
    // Update data in Local Storage
    store.updateTask(taskEl.id, taskCategory, taskDescr);
    // Change UI
    const newTaskEl = ui.createTask(store.getTask(taskEl.id));
    taskEl.parentNode.replaceChild(newTaskEl, taskEl);
    // Show alert
    ui.showAlert('Task edited', 'alert-success');
  }
  // If target click is cancel button
  if(e.target.classList.contains('cancel')) {
    const taskEl = e.target.parentElement.parentElement;
    // Change UI
    const newTaskEl = ui.createTask(store.getTask(taskEl.id));
    taskEl.parentNode.replaceChild(newTaskEl, taskEl);
    // Show alert
    ui.showAlert('Edit task cancelled', 'alert-info');
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
    // Create task obj
    const task = new Task(taskCategory.value, taskDescr.value);
    // Put new task to UI
    ui.putTask(ui.createTask(task), todoTable);
    if (store.getConfig().tasks.length === 0) {
      ui.showHide(todoTable);
    }
    // Put new task to Local Storage
    store.addTask(task);
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

function timerCallback() {
  // If we have tasks
  if(store.getConfig().tasks.length > 0) {
    const taskEl = todoTable.querySelector('tbody > tr');
    deleteTask(taskEl);
  }
  ui.showAlert('Take a short break', 'alert-info', 5000);
}

function deleteTask(taskEl) {
  // Delete from Local Storage
  store.deleteTask(taskEl.id);
  if (store.getConfig().tasks.length === 0) {
    ui.showHide(todoTable);
  }
  // Delete from UI
  ui.deleteTask(taskEl);
}
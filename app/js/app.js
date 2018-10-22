// Init UI
const ui = new UI;
// Init timer
const timer = new Timer;

// DOM Elements
const startBtn = document.querySelector('#btnStart');
const stopBtn = document.querySelector('#btnStop');

// Events
document.addEventListener('DOMContentLoaded', () => {
  ui.updateTime(`${timer.getTime('default')}`);
})
startBtn.addEventListener('click', () => timer.start());
stopBtn.addEventListener('click', () => timer.stop());
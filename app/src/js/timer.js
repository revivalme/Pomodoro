import { startBtn, stopBtn } from './domVars';
import UI from './ui';
import { audio } from './audio';
import Store from './store';

// Init UI object
const ui = new UI;
// Init Store object
const store = new Store;

export default class Timer {
  // Default time = 25min
  constructor(callback, ms, shortBreak, longBreak) {
    this.isActive = false;
    this.mode = 1;
    this.callback = callback;
    this.default = new Date(ms * 1000);
    this.shortBreak = new Date(shortBreak * 1000);
    this.longBreak = new Date(longBreak * 1000);
    this.diff = null;
    this.end = null;
  }

  getTime(type) {
    return `${this.zeroBase(this[type].getMinutes())} : ${this.zeroBase(this[type].getSeconds())}`;
  }

  setDefaultTime(ms) {
    this.default = new Date(ms * 1000);
  }

  /*
    mode 1 - start default timer
    mode 2 - start shortBreak timer
    mode 3 - start longBreak timer
  */
  start(mode) {
    this.mode = mode || this.mode;
    // If timer isn't active
    if(!this.isActive) {
      // Change isActive
      this.isActive = true;
      // Change buttons text
      startBtn.textContent = 'Pause';
      stopBtn.textContent = (this.mode === 1) ? 'Stop' : 'Skip';
      stopBtn.disabled = false;

      if(this.diff === null) {
        this.diff = (this.mode === 1) ? this.default : (this.mode === 2) ? this.shortBreak : this.longBreak;
      }
      // Set end time
      this.end = new Date(new Date().getTime() + this.diff.getTime());

      // Declare this for async func
      const self = this;
      function step() {
        // If timer is active
        if(self.isActive) {
          // Difference between end and now
          self.diff = new Date(self.end.getTime() - new Date().getTime());
          if(self.diff.getTime() > 0) {
            ui.updateTime(`${self.getTime('diff')}`);
          } else {
            // Time left - clear interval
            clearInterval(timerId);

            if (self.mode === 1) {
              self.reset();
              self.callback();
              audio.play();

              store.incrementCompleted();
              self.start(store.getConfig().completed % 4 !== 0 ? 2 : 3);
            } else {
              self.reset();
            }
          }
        } else {
          clearInterval(timerId);
        }
      }
      
      const timerId = setInterval(step, 100);
    } else {
      // Change isActive
      this.isActive = false;
      // Change buttons text
      startBtn.textContent = 'Resume';
      stopBtn.textContent = (this.mode === 1) ? 'Done' : 'Skip';
    }
  }

  stop() {
    if (stopBtn.textContent === 'Done') {
      this.reset();
      this.callback();
      audio.play();
      
      store.incrementCompleted();
      this.start(store.getConfig().completed % 4 !== 0 ? 2 : 3);
    } else {
      this.reset();
    }
  }

  reset() {
    // Change settings
    this.isActive = false;
    this.diff = null;
    this.end = null;
    this.mode = 1;

    // Change buttons text
    startBtn.textContent = 'Start';
    stopBtn.textContent = 'Stop';
    stopBtn.disabled = true;

    // Update UI
    ui.updateTime(`${this.getTime('default')}`);
  }

  // Pass minutes or seconds val
  zeroBase(val) {
    return val < 10 ? '0' + val : val;
  }
}
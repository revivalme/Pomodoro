import { startBtn, stopBtn } from './domVars';
import UI from './ui';
import { audio } from './audio';

// Init UI object
const ui = new UI;

export default class Timer {
  // Default time = 25min
  constructor(callback, ms = 1500 * 1000) {
    this.isActive = false;
    this.callback = callback;
    this.default = new Date(ms);
    this.diff;
    this.end;
  }

  getTime(type) {
    return `${this.zeroBase(this[type].getMinutes())} : ${this.zeroBase(this[type].getSeconds())}`;
  }

  setDefaultTime(ms) {
    this.default = new Date(ms);
  }

  start() {
    // If timer isn't active
    if(!this.isActive) {
      // Change isActive
      this.isActive = true;
      // Change buttons text
      startBtn.textContent = 'Pause';
      stopBtn.textContent = 'Stop';
      stopBtn.disabled = false;

      if(this.diff === undefined) {
        this.diff = this.default;
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
            // Time left - clear interval and reset
            clearInterval(timerId);            
            self.reset();

            self.callback();
            audio.play();
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
      stopBtn.textContent = 'Done';
    }
  }

  stop() {
    if (stopBtn.textContent === 'Done') {
      this.callback();
      audio.play();
    }
    // Reset
    this.reset();
  }

  reset() {
    // Change isActive
    this.isActive = false;
    // Change buttons text
    startBtn.textContent = 'Start';
    stopBtn.textContent = 'Stop';
    stopBtn.disabled = true;
    // Change timer value to default
    this.diff = new Date(this.default);
    // Update UI
    ui.updateTime(`${this.getTime('default')}`);
  }

  // Pass minutes or seconds val
  zeroBase(val) {
    return val < 10 ? '0' + val : val;
  }
}
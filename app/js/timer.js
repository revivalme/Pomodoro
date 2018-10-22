class Timer {
  // Default time = 25min
  constructor(ms = 1500 * 1000) {
    this.default = new Date(ms);
    this.diff;
    this.end;
    this.status = 0;
  }

  getTime(type) {
    return `${this.zeroBase(this[type].getMinutes())} : ${this.zeroBase(this[type].getSeconds())}`;
  }

  setDefaultTime(ms) {
    this.default = new Date(ms);
  }

  start() {
    // If timer isn't active
    if(!this.status) {
      // Change status
      this.status = 1;
      // Change buttons text
      startBtn.textContent = 'Pause';
      stopBtn.textContent = 'Stop';

      if(this.diff === undefined) {
        this.diff = this.default;
      }
      // Set end time
      this.end = new Date(new Date().getTime() + this.diff.getTime());

      // Declare this for async func
      const self = this;
      function step() {
        // If timer is active
        if(self.status) {
          // Difference between end and now
          self.diff = new Date(self.end.getTime() - new Date().getTime());
          if(self.diff.getTime() > 0) {
            ui.updateTime(`${self.getTime('diff')}`);
          } else {
            // Time left - clear interval and reset
            clearInterval(timerId);            
            self.reset();
          }
        } else {
          clearInterval(timerId);
        }
      }
      
      const timerId = setInterval(step, 100);
    } else {
      // Change status
      this.status = 0;
      // Change buttons text
      startBtn.textContent = 'Resume';
      stopBtn.textContent = 'Done';
    }
  }

  stop() {
    // Reset
    this.reset();
  }

  reset() {
    // Change status
    this.status = 0;
    // Change buttons text
    startBtn.textContent = 'Start';
    stopBtn.textContent = 'Stop';
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
class Timer {
  // Default time = 25min
  constructor(ms = 1500 * 1000) {
    this.value = new Date(ms);
    this.status = 0;
    this.default = ms;
  }

  getTime() {
    return `${this.zeroBase(this.value.getMinutes())} : ${this.zeroBase(this.value.getSeconds())}`;
  }

  setDefaultTime(ms) {
    this.value = new Date(ms);
    this.default = ms;
  }

  cutTime(sec) {
    this.value = new Date(this.value.getTime() - sec * 1000);
  }

  start() {
    // If timer isn't active
    if(!this.status) {
      // Change status
      this.status = 1;
      // Change buttons text
      startBtn.textContent = 'Pause';
      stopBtn.textContent = 'Stop';

      // Declare this for async func
      const self = this;

      // Async recursion func
      setTimeout(function timerCycle() {
        // If timer active
        if(self.status) {
          // If timer milliseconds > 0
          if(self.value.getTime() > 0) {
            // Subtract 1 second
            self.cutTime(1);

            // Update UI
            ui.updateTimer(`${self.getTime()}`);
            setTimeout(timerCycle, 1000);
          } else {
            // Time left - reset
            self.reset();
          }
        }
      }, 0);
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
    this.value = new Date(this.default);
    // Update UI
    ui.updateTimer(`${this.getTime()}`);
  }

  // Pass minutes or seconds val
  zeroBase(val) {
    return val < 10 ? '0' + val : val;
  }
}
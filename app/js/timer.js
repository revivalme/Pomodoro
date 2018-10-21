class Timer {
  // Default ms = 25min
  constructor(ms = 1500 * 1000) {
    this.value = new Date(ms);
    this.status = 0;
  }

  getTime() {
    return {
      minutes: this.value.getMinutes(),
      seconds: this.value.getSeconds()
    }
  }

  setTime(ms) {
    this.value = new Date(ms);
  }

  cutTime(sec) {
    this.value = new Date(this.getTime - sec * 1000);
  }
}
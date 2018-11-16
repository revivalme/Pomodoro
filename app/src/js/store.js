export default class Store {
  getConfig() {
    const defaultConfig = {
      tasks: [],
      timerSettings: {
        duration: 1500
      },
      notificationSettings: {
        volume: 0.5
      }
    }
    return JSON.parse(localStorage.getItem('config')) || defaultConfig;
  }
  
  updateConfig(config) {
    localStorage.setItem('config', JSON.stringify(config));
  }

  getTask(id) {
    const config = this.getConfig();
    // Find task with equal id
    const task = config.tasks.filter(task => task.id == id);
    // If task have smthing, then return first array element or -1
    return task.length > 0 ? task[0] : -1;
  }

  addTask(taskObj) {
    const config = this.getConfig();
    // Add new task
    config.tasks.push(taskObj);

    this.updateConfig(config);
  }

  updateTask(id, category, description, done = 0) {
    const config = this.getConfig();
    // Find task with equal id and change data
    config.tasks.forEach(task => {
      if(task.id == id) {
        task.category = category;
        task.description = description;
        task.done = done;
      }
    });

    this.updateConfig(config);
  }

  deleteTask(id) {
    const config = this.getConfig();
    // Find equal task and delete it
    config.tasks = config.tasks.filter(task => task.id != id);

    this.updateConfig(config);    
  }
}
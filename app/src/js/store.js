export default class Store {
  getTasks() {
    // Return array of objects or empty array
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }

  getTask(id) {
    // Get tasks, find task with equal id
    const task = this.getTasks().filter(task => task.id == id);
    // If task have smthing, then return first array element or -1
    return task.length > 0 ? task[0] : -1;
  }

  addTask(taskObj) {
    // Get tasks
    const tasks = this.getTasks();
    // Add new task
    tasks.push(taskObj);
    // Save all tasks
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  updateTask(id, category, description, done = 0) {
    // Get tasks, find task with equal id and change data
    const tasks = this.getTasks();
    tasks.forEach(task => {
      if(task.id == id) {
        task.category = category;
        task.description = description;
        task.done = done;
      }
    });
    // Save all tasks
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  deleteTask(id) {
    // Get tasks, find equal task and delete it
    const tasks = this.getTasks().filter(task => task.id != id);
    // Save all tasks
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
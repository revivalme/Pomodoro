class UI {
  updateTimer(val) {
    document.querySelector('#timer').textContent = val;
  }

  createTask(task) {
    // Create elements
    const taskContainer = document.createElement('tr'),
    taskCategory = document.createElement('td'),
    taskDescription = document.createElement('td'),
    taskOptions = document.createElement('td');

    taskCategory.textContent = task.category;
    taskDescription.textContent = task.description;
    taskOptions.className = 'd-flex justify-content-end align-items-center';

    // Get time in AM PM format
    let time = new Date().toLocaleString('en-US', { 
      hour: '2-digit',
      minute: '2-digit'
    });

    // If hour < 10, then add zero at begin
    if(time.split(':')[0] < 10) {
      time = '0' + time;
    }


    taskOptions.innerHTML = `
      <i class="far fa-star mr-3"></i>
      <i class="fas fa-check mr-3 text-success"></i>
      <i class="fas fa-minus mr-3 text-danger"></i>
      <i class="fas fa-edit mr-4 text-dark"></i>
      <span>${time}</span>
    `;

    taskContainer.appendChild(taskCategory);
    taskContainer.appendChild(taskDescription);
    taskContainer.appendChild(taskOptions);

    return taskContainer;
  }

  deleteTask(taskElement) {
    taskElement.remove();
  }

  putTask(taskElement, tableElement) {
    const table = tableElement.querySelector('tbody');
    table.appendChild(taskElement);
  }
}
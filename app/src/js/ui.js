export default class UI {
  updateTime(val) {
    document.querySelector('#timer').textContent = val;
  }
 
  showHide(tableElement) {
    tableElement.classList.toggle('d-none');
  }

  createTask(task) {
    // Create elements
    const taskContainer = document.createElement('tr');
    const taskCategory = document.createElement('td');
    const taskDescription = document.createElement('td');
    const taskOptions = document.createElement('td');

    taskContainer.id = task.id;
    taskCategory.textContent = task.category;
    taskDescription.textContent = task.description;
    taskOptions.className = 'd-flex justify-content-end align-items-center';

    // Get time in AM PM format
    let time = new Date(task.addTime).toLocaleString('en-US', { 
      hour: '2-digit',
      minute: '2-digit'
    });

    // If hour < 10, then add zero at begin
    if(time.split(':')[0] < 10) {
      time = '0' + time;
    }


    taskOptions.innerHTML = `
      <i class="far fa-star"></i>
      <i class="fas fa-check text-success"></i>
      <i class="fas fa-trash-alt text-danger"></i>
      <span>${time}</span>
      <i class="fas fa-edit ml-3 text-dark"></i>
    `;

    taskContainer.appendChild(taskCategory);
    taskContainer.appendChild(taskDescription);
    taskContainer.appendChild(taskOptions);

    return taskContainer;
  }

  createEditTask(task) {
    // Create elements
    const editContainer = document.createElement('tr');
    editContainer.id = task.id;
    editContainer.innerHTML = `
      <td>
        <input class="form-control edit-category" value="${task.category}">
      </td>
      <td>
        <input class="form-control edit-description" value="${task.description}">
      </td>
      <td>
        <button class="btn btn-success save" style="width: calc(48%); margin-right: 2%;">Save</button>
        <button class="btn btn-danger cancel" style="width: calc(48%);">Cancel</button>
      </td>
    `;

    return editContainer;
  }

  deleteTask(taskElement) {
    taskElement.style.opacity = 0;

    setTimeout(() => {
      taskElement.remove();
    }, 500);
  }

  putTask(taskElement, tableElement) {
    const table = tableElement.querySelector('tbody');
    table.appendChild(taskElement);
  }

  showAlert(text, className, hideTime = 1500) {
    // create alert
    const alert = document.createElement('div');
    alert.textContent = text;
    alert.className = `alert ${className}`;
    // Get alerts NodeElement
    const alerts = document.querySelector('#alerts');
    alerts.appendChild(alert);
    // Clear alert after 1.5s
    setTimeout(this.clearAlert, hideTime);
  }

  clearAlert() {
    const alertEl = document.querySelector('.alert');
    // If alert exist - remove it
    if(alertEl) {
      alertEl.remove();
    }
  }
}
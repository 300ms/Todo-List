import tasks from './storage';
import Project from './project';
import Todos from './todo';

class UI {
  static listProjects() {
    const content = document.querySelector('.content');
    const ul = document.querySelector('.project-ul');

    tasks.forEach(task => {
      const li = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <h4 class="project-title">${task.projectName}</h4>
          <span class="badge badge-primary badge-pill">14</span>
        </li>
      `;
      ul.innerHTML += li;
    });

    content.appendChild(ul);
  }

  static showProject(title) {
    const parent = document.querySelector('.todos');
    const proj = Project.getProject(title);

    const template = `
    <div class="card text-white bg-primary mb-3" style="width: 20rem;">
      <form class="my-2 my-lg-0" id = "todo-form" autocomplete="off">
        <div class="card-header">Add Task</div>
        <div class="cardBody">
          <input type="hidden" id="current-project" name="currentProject" value="${title}"> 
          <input class="form-control mr-sm-2 my-2 todo-name" type="text" placeholder="Task Name" name = 'name'>
          <input class="form-control mr-sm-2 my-2 todo-desc" type="text" placeholder="Task Description" name = 'desc'>
          <input class="form-control mr-sm-2 my-2 todo-due-date" type="text" placeholder="Due date" name = 'dueDate'>
          <input class="form-control mr-sm-2 my-2 todo-priority" type="text" placeholder="Task Priority" name = 'priority'>
        </div>
        <div class="card-footer"><input class="btn btn-success float-right" type="submit" /></div>
      </form>
    </div>
    `;

    parent.innerHTML += template;

    if (proj) {
      proj.projectTodos.forEach(todo => {
        const div = `
        <div class="card text-white bg-primary mb-3" style="width: 20rem;">
          <div class="card-header">buttons</div>
          <div class="cardBody">
            <h4 class="card-title">${todo.title}</h4>
            <p class="card-text">${todo.description}</p>
          </div>
          <div class="card-footer"><span>${todo.dueDate}</span><span>${todo.priority}</span></div>
        </div>
        `;

        parent.innerHTML += div;
      });
    }
  }

  static clearTodos() {
    const content = document.querySelector('.todos');
    content.innerHTML = '';
  }

  static addProject(title) {
    const ul = document.querySelector('.project-ul');
    const li = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <h4 class="project-title">${title}</h4>
          <span class="badge badge-primary badge-pill">14</span>
        </li>
      `;
    ul.innerHTML += li;
    Project.createProject(title);
    
  }

  static addTodo(projectTitle, todoTitle, desc, dueDate, priority){
    const parent = document.querySelector('.todos');
    const div = `
        <div class="card text-white bg-primary mb-3" style="width: 20rem;">
          <div class="card-header">buttons</div>
          <div class="cardBody">
            <h4 class="card-title">${todoTitle}</h4>
            <p class="card-text">${desc}</p>
          </div>
          <div class="card-footer"><span>${dueDate}</span><span>${priority}</span></div>
        </div>
        `;

    parent.innerHTML += div;

    Todos.addTodos(projectTitle, todoTitle, desc, dueDate, priority)
  }

  static todosFormReset() {
    document.querySelector('.todo-name').value = '';
    document.querySelector('.todo-desc').value = '';
    document.querySelector('.todo-due-date').value = '';
    document.querySelector('.todo-priority').value = '';
  }
}

export { UI as default };

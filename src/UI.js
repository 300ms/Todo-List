import Project from './project';
import Todos from './todo';
import Store from './store';

class UI {
  static listProjects() {
    const content = document.querySelector('.content');
    const ul = document.querySelector('.project-ul');
    const projects = Store.getProjectsFromLocal();
    projects.forEach(project => {
      const li = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div class="justify-content-between d-flex" id="projectInfo" style="width: 100%;">
          <div class="d-inline-block">
            <h4 class="project-title">${project.projectName}</h4>
          </div>
          <div class="d-inline-block">
            <span class="badge badge-primary badge-pill">14</span>
            <button class="badge badge-warning badge-pill editProject">Edit</button>
            <button class="badge badge-danger badge-pill deleteProject">Delete</button>
          </div>
        </div>
        
        <div class="d-none" id="showEditFrom" style="width: 100%;">
          <form class="form-inline my-2 my-lg-0 justify-content-between" id ="project-name-form" autocomplete="off" style="width: 100%;">
            <input class="form-control mr-sm-2" type="text" placeholder="New Project Name" name = 'title' style="width: 10rem;" required />
            <button class="btn btn-success text-center px-0 mx-1 saveProject" type="button" style="width: 4rem;">save</button>
            <button class="btn btn-danger text-center px-0 mx-1 cancelProject" type="button" style="width: 4rem;">cancel</button>
          </form>
        </div>
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
    <div class="card text-white bg-secondary mb-3 mx-3" style="width: 20rem;">
      <form class="my-2 my-lg-0" id = "todo-form" autocomplete="off">
        <div class="card-header">Add Task</div>
        <div class="cardBody">
          <input type="hidden" id="current-project" name="currentProject" value="${title}"> 
          <input class="form-control mr-sm-2 my-2 todo-name" type="text" placeholder="Task Name" name = 'name' required />
          <input class="form-control mr-sm-2 my-2 todo-desc" type="text" placeholder="Task Description" name = 'desc' />
          <input class="form-control mr-sm-2 my-2 todo-due-date" type="date" placeholder="Due date" name = 'dueDate' />
          <label for="priority">Priority:</label>

          <select name="priority" id="priority" class="form-control mr-sm-2 my-2 todo-priority">
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
        </div>
        <button class="btn btn-success float-right mx-3" type="submit">Submit</button>
      </form>
    </div>
    `;

    parent.innerHTML += template;

    if (proj.projectTodos) {
      proj.projectTodos.forEach(todo => {
        let bool;
        if (todo.complete) {
          bool = 'checked';
        }
        let cardClass = 'bg-primary';
        if (todo.priority === 'high') {
          cardClass = 'bg-warning';
        }
        const div = `
        <div class="card text-white ${cardClass} mb-3 mx-3" style="width: 20rem;">
          <div class="card-header">
            <label for="todo-status">Completed: </label>
            <input type="checkbox" id="todo-status" class="checkBox" name="complete" ${bool}>
            <button class="badge badge-danger badge-pill deleteTodo float-right">Delete</button>
          </div>
          <div class="cardBody">
            <h4 class="card-title">${todo.title}</h4>
            <p class="card-text">${todo.description}</p>
          </div>
          <div class="card-footer"><span>${todo.dueDate}</span><span class="float-right">${todo.priority}</span></div>
        </div>
        `;

        parent.innerHTML += div;
      });
    }
    UI.addTodoListeners();
  }

  static clearTodos() {
    const content = document.querySelector('.todos');
    content.innerHTML = '';
  }

  static refreshProjectList() {
    const ul = document.querySelector('.project-ul');
    ul.innerHTML = `
      <li>
        <form class="my-2 my-lg-0" id="project-form" autocomplete="off">
          <input class="form-control mr-sm-2 project-form-title" type="text" placeholder="New Project" name = 'title' required>
          <button class="btn btn-success float-right my-3 mx-3" type="submit">Submit</button>
        </form>
      </li>
    `;
    UI.listProjects();
    UI.addListeners();
  }

  static refreshTodoList(title) {
    const parent = document.querySelector('.todos');
    parent.innerHTML = '';
    UI.showProject(title);
  }

  static addProject(title) {
    Project.createProject(title);
    UI.refreshProjectList();
  }

  static addTodo(projectTitle, todoTitle, desc, dueDate, priority) {
    Todos.addTodos(projectTitle, todoTitle, desc, dueDate, priority);
    UI.refreshTodoList(projectTitle);
  }

  static editProject(e) {
    const { children } = e.target.parentElement.parentElement.previousElementSibling;
    const currentTitle = children[0].children[0].innerHTML;
    const newTitle = e.target.parentElement.title.value;
    Project.edit(currentTitle, newTitle);
    UI.refreshProjectList();
  }

  static deleteProject(e) {
    const title = e.target.parentElement.previousElementSibling.children[0].innerHTML;
    Project.delete(title);

    UI.refreshProjectList();
  }

  static todosFormReset() {
    document.querySelector('.todo-name').value = '';
    document.querySelector('.todo-desc').value = '';
    document.querySelector('.todo-due-date').value = '';
    document.querySelector('.todo-priority').value = '';
  }

  static toggleProjectForm(e) {
    let projectInfo;
    let editForm;
    if (e.target.classList.contains('saveProject') || e.target.classList.contains('cancelProject')) {
      projectInfo = e.target.parentElement.parentElement.previousElementSibling;
      editForm = e.target.parentElement.parentElement;
    } else if (e.target.classList.contains('editProject') || e.target.classList.contains('deleteProject')) {
      projectInfo = e.target.parentElement.parentElement;
      editForm = e.target.parentElement.parentElement.nextElementSibling;
    }

    if (projectInfo && editForm) {
      projectInfo.classList.toggle('d-flex');
      projectInfo.classList.toggle('d-none');
      editForm.classList.toggle('d-flex');
      editForm.classList.toggle('d-none');
      editForm.children[0].reset();
    }
  }

  static addTodoListeners() {
    document.querySelector('#todo-form').addEventListener('submit', (e) => {
      e.preventDefault();

      const projectTitle = e.target.currentProject.value;
      const todoTitle = e.target.name.value;
      const desc = e.target.desc.value;
      const dueDate = e.target.dueDate.value;
      const priority = e.target.priority.value;
      // const complete = (e.target.complete.checked) ? 1 : 0

      UI.addTodo(projectTitle, todoTitle, desc, dueDate, priority);
      UI.todosFormReset();
    });

    document.querySelectorAll('.deleteTodo').forEach(button => {
      button.addEventListener('click', e => {
        const currentProject = document.querySelector('#current-project').value;
        const todoTitle = e.target.parentElement.nextElementSibling.children[0].innerHTML;

        e.target.parentElement.parentElement.remove();
        Todos.delete(currentProject, todoTitle);
      });
    });

    document.querySelectorAll('.checkBox').forEach(button => {
      button.addEventListener('click', e => {
        const projectTitle = document.getElementById('current-project').value;
        const todoTitle = e.target.parentElement.nextElementSibling.children[0].innerHTML;
        const complete = (e.target.checked) ? 1 : 0;

        Todos.editTodoCheck(projectTitle, todoTitle, complete);
        console.log(projectTitle);
        console.log(todoTitle);
        console.log(complete);
      });
    });
  }

  static addListeners() {
    document.querySelectorAll('.editProject').forEach(button => {
      button.addEventListener('click', e => {
        UI.toggleProjectForm(e);
      });
    });

    document.querySelectorAll('.saveProject').forEach(button => {
      button.addEventListener('click', e => {
        UI.editProject(e);
        UI.toggleProjectForm(e);
      });
    });

    document.querySelectorAll('.cancelProject').forEach(button => {
      button.addEventListener('click', e => {
        UI.toggleProjectForm(e);
      });
    });

    document.querySelectorAll('.deleteProject').forEach(button => {
      button.addEventListener('click', e => {
        UI.deleteProject(e);
      });
    });
  }
}

export { UI as default };
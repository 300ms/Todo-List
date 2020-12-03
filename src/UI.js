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
        <div class="justify-content-between d-flex flex-nowrap" id="projectInfo" style="width: 100%;">
          <div class="d-inline-block">
            <h4 class="project-title">${project.projectName}</h4>
          </div>
          <div class="d-inline-block">
            <span class="badge badge-primary badge-pill">${project.projectTodos.length}</span>
            <button class="badge badge-warning badge-pill editProject">Edit</button>
            <button class="badge badge-danger badge-pill deleteProject">Delete</button>
          </div>
        </div>
        
        <div class="d-none" id="showEditFrom" style="width: 100%;">
          <form class="form-inline my-2 my-lg-0 justify-content-between flex-nowrap" id ="project-name-form" autocomplete="off" style="width: 100%;">
            <input class="form-control mr-sm-2" type="text" placeholder="New Project Name" name = 'title' style="width: 10rem;" required />
            <button class="btn btn-success text-center px-0 mx-1 saveProject" type="button" style="width: 4rem;">save</button>
            <button class="btn btn-danger text-center px-0 mx-1 cancelProject" type="button" style="width: 4rem;">cancel</button>
          </form>
        </div>
      </li>
    `;
      ul.innerHTML += li;
    });
    ul.children[1].style.backgroundColor = 'gray';
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
        let options;
        if (todo.priority === 'high') {
          options = '<option value="high" selected>High</option><option value="low">Low</option>';
        } else {
          options = '<option value="high">High</option><option value="low" selected>Low</option>';
        }
        const div = `
        <div class="card text-white ${cardClass} mb-3 mx-3" style="width: 20rem;">
          <div class="card-header">
            <label for="todo-status">Completed: </label>
            <input type="checkbox" id="todo-status" class="checkBox" name="complete" ${bool}>
            <button class="badge badge-danger badge-pill deleteTodo float-right">Delete</button>
          </div>
          <div class="cardBody" style="height: 100%;">
            <h4 class="card-title todo-headers">${todo.title}</h4>
            <div class="d-none" id="editTitle" style="width: 100%;">
              <form class="form-inline my-3 my-1 justify-content-between flex-nowrap" id="todo-name-form" autocomplete="off" style="width: 100%;">
                <input class="form-control mr-sm-2" type="text" placeholder="New Todo Name" name = 'title' style="width: 10rem;" required />
                <button class="btn btn-success text-center px-0 mx-1 saveTodo" type="button" style="width: 4rem;">save</button>
                <button class="btn btn-danger text-center px-0 mx-1 cancelTodo" type="button" style="width: 4rem;">cancel</button>
              </form>
            </div>
            <p class="card-text todo-description">${todo.description}</p>
            <div class="d-none" id="editDescription" style="width: 100%;">
              <form class="form-inline my-3 my-1 justify-content-between flex-nowrap" id="todo-description-form" autocomplete="off" style="width: 100%;">
                <input class="form-control mr-sm-2" type="text" placeholder="New Description" name="description" style="width: 10rem;" required />
                <button class="btn btn-success text-center px-0 mx-1 saveDescription" type="button" style="width: 4rem;">save</button>
                <button class="btn btn-danger text-center px-0 mx-1 cancelDescription" type="button" style="width: 4rem;">cancel</button>
              </form>
            </div>
          </div>
          <div class="card-footer"><span>Due Date: ${todo.dueDate}</span>
            <select name="priority" class="form-control mr-sm-2 my-2 todo-priorities">
              ${options}
            </select>
          </div>
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
    UI.refreshProjectList();
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
    const bool = Project.delete(title);
    if (bool) {
      UI.refreshProjectList();
      UI.showMsg('The project has removed.', 'success');
    } else {
      UI.showMsg('This project contains incomplete tasks', 'warning');
    }
  }

  static todosFormReset() {
    document.querySelector('.todo-name').value = '';
    document.querySelector('.todo-desc').value = '';
    document.querySelector('.todo-due-date').value = '';
    document.querySelector('.todo-priority').value = '';
  }

  static showMsg(msg, className) {
    const div = document.createElement('div');
    div.className = `text-center alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));

    const body = document.querySelector('body');
    const content = document.querySelector('.content');

    body.insertBefore(div, content);

    setTimeout(() => document.querySelector('.alert').remove(), 4000);
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

  static toggleTodoForm(e) {
    let header;
    let form;

    if (e.target.classList.contains('todo-headers')) {
      header = e.target;
      form = e.target.nextElementSibling;
    } else if (e.target.classList.contains('saveTodo') || e.target.classList.contains('cancelTodo')) {
      header = e.target.parentElement.parentElement.previousElementSibling;
      form = e.target.parentElement.parentElement;
    }

    if (header && form) {
      header.classList.toggle('d-none');
      form.classList.toggle('d-none');
      form.classList.toggle('d-flex');
      form.children[0].reset();
    }
  }

  static toggleDescriptionForm(e) {
    let p;
    let form;

    if (e.target.classList.contains('todo-description')) {
      p = e.target;
      form = e.target.nextElementSibling;
    } else if (e.target.classList.contains('saveDescription') || e.target.classList.contains('cancelDescription')) {
      p = e.target.parentElement.parentElement.previousElementSibling;
      form = e.target.parentElement.parentElement;
    }

    if (p && form) {
      p.classList.toggle('d-none');
      form.classList.toggle('d-none');
      form.classList.toggle('d-flex');
      form.children[0].reset();
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

      UI.addTodo(projectTitle, todoTitle, desc, dueDate, priority);
      UI.todosFormReset();
    });

    document.querySelectorAll('.deleteTodo').forEach(button => {
      button.addEventListener('click', e => {
        const currentProject = document.querySelector('#current-project').value;
        const todoTitle = e.target.parentElement.nextElementSibling.children[0].innerHTML;

        e.target.parentElement.parentElement.remove();
        Todos.delete(currentProject, todoTitle);
        UI.refreshProjectList();
      });
    });

    document.querySelectorAll('.checkBox').forEach(button => {
      button.addEventListener('click', e => {
        const projectTitle = document.getElementById('current-project').value;
        const todoTitle = e.target.parentElement.nextElementSibling.children[0].innerHTML;
        const complete = (e.target.checked) ? 1 : 0;

        Todos.editTodoStatus(projectTitle, todoTitle, complete);
      });
    });

    document.querySelectorAll('.todo-headers').forEach(header => {
      header.addEventListener('click', e => {
        UI.toggleTodoForm(e);
      });
    });

    document.querySelectorAll('.todo-priorities').forEach(priority => {
      priority.addEventListener('change', e => {
        const projectTitle = document.getElementById('current-project').value;
        const todoTitle = e.target.parentElement.previousElementSibling.children[0].innerHTML;
        const newPriority = e.target.value;
        Todos.editTodoPriority(projectTitle, todoTitle, newPriority);
        UI.refreshTodoList(projectTitle);
      });
    });

    document.querySelectorAll('.saveTodo').forEach(button => {
      button.addEventListener('click', e => {
        const projectTitle = document.getElementById('current-project').value;
        const todoTitle = e.target.parentElement.parentElement.previousElementSibling.innerHTML;
        const newTitle = e.target.parentElement.title.value;
        Todos.editTodoTitle(projectTitle, todoTitle, newTitle);
        UI.toggleTodoForm(e);
        UI.refreshTodoList(projectTitle);
      });
    });

    document.querySelectorAll('.cancelTodo').forEach(button => {
      button.addEventListener('click', e => {
        UI.toggleTodoForm(e);
      });
    });

    document.querySelectorAll('.todo-description').forEach(p => {
      p.addEventListener('click', e => {
        UI.toggleDescriptionForm(e);
      });
    });

    document.querySelectorAll('.saveDescription').forEach(button => {
      button.addEventListener('click', e => {
        const projectTitle = document.getElementById('current-project').value;
        const todoTitle = e.target.parentElement.parentElement
          .previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        const newDescription = e.target.parentElement.description.value;
        Todos.editTodoDescription(projectTitle, todoTitle, newDescription);
        UI.toggleDescriptionForm(e);
        UI.refreshTodoList(projectTitle);
      });
    });

    document.querySelectorAll('.cancelDescription').forEach(button => {
      button.addEventListener('click', e => {
        UI.toggleDescriptionForm(e);
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

import tasks from './storage';
import Project from './project';

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

    if (proj) {
      proj.projectTodos.forEach(todo => {
        const div = `
        <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
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
}

export { UI as default };

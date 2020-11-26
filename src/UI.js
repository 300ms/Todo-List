import tasks from './todos';

class UI {
  static listProjects() {
    const content = document.querySelector('.content');
    const ul = document.querySelector('.project-ul');

    tasks.forEach(task => {
      const li = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <h4>${task.projectName}</h4>
          <span class="badge badge-primary badge-pill">14</span>
        </li>
      `;
      ul.innerHTML += li;
    });

    content.appendChild(ul);
  }

  static showProject() {
    const parent = document.querySelector('.todos');
    const proj = tasks[0];/* .forEach(project => {
      if (project.projectName === title);
      return project;
    }); */

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

export { UI as default };

class Store {
  static getProjectsFromLocal() {
    let projects;
    if (localStorage.getItem('projects') === null || localStorage.getItem('projects') === '[]') {
      projects = [{ projectName: 'Default Project', projectTodos: [] }];
      localStorage.setItem('projects', JSON.stringify(projects));
    } else {
      projects = JSON.parse(localStorage.getItem('projects'));
    }

    return projects;
  }

  static addProjectToLocal(project) {
    const projects = Store.getProjectsFromLocal();
    projects.push(project);

    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static editProjectOnLocal(currentTitle, newTitle) {
    const projects = Store.getProjectsFromLocal();

    projects.forEach(p => {
      if (p.projectName === currentTitle) {
        p.projectName = newTitle;
      }
    });

    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static removeProjectFromLocal(title) {
    const projects = Store.getProjectsFromLocal();

    projects.forEach((p, index) => {
      if (p.projectName === title) {
        projects.splice(index, 1);
      }
    });

    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static addTodoToLocal(projectTitle, todo) {
    const proj = Store.getProjectsFromLocal();

    let project;

    proj.forEach(p => {
      if (p.projectName === projectTitle) {
        project = p;
      }
    });

    if (project) {
      project.projectTodos.push(todo);
    }

    localStorage.setItem('projects', JSON.stringify(proj));
  }

  static removeTodoFromLocal(projectTitle, todo) {
    const projects = Store.getProjectsFromLocal();
    let proj;
    projects.forEach((p) => {
      if (p.projectName === projectTitle) {
        proj = p
      }
    });

    if(proj) {
      proj.projectTodos.forEach((t, index) => {
        if (t.title === todo.title) {
          proj.projectTodos.splice(index, 1);
        }
      });
    }
    

    localStorage.setItem('projects', JSON.stringify(projects));
  }

}

export { Store as default };

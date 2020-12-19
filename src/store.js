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

  static editProj(projects, currentTitle, newTitle) {
    projects.forEach(p => {
      if (p.projectName === currentTitle) {
        p.projectName = newTitle;
      }
    });
  }

  static editProjectOnLocal(currentTitle, newTitle) {
    const projects = Store.getProjectsFromLocal();
    Store.editProj(projects, currentTitle, newTitle);

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
    const project = Store.findProject(proj, projectTitle);

    if (project) {
      project.projectTodos.push(todo);
    }

    localStorage.setItem('projects', JSON.stringify(proj));
  }

  static removeTodoFromLocal(projectTitle, todoTitle) {
    const projects = Store.getProjectsFromLocal();
    const proj = Store.findProject(projects, projectTitle);

    if (proj) {
      proj.projectTodos.forEach((t, index) => {
        if (t.title === todoTitle) {
          proj.projectTodos.splice(index, 1);
        }
      });
    }


    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static findProject(projects, projectTitle) {
    let proj;
    projects.forEach((p) => {
      if (p.projectName === projectTitle) {
        proj = p;
      }
    });
    return proj;
  }

  static findTodo(project, todoTitle) {
    let todo;
    if (project) {
      project.projectTodos.forEach(t => {
        if (t.title === todoTitle) {
          todo = t;
        }
      });
    }

    return todo;
  }

  static editTodoStatusOnLocal(projectTitle, todoTitle, complete) {
    const projects = Store.getProjectsFromLocal();
    const project = Store.findProject(projects, projectTitle);
    const todo = Store.findTodo(project, todoTitle);

    if (todo) {
      todo.complete = complete;
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }

  static editTodoTitleOnLocal(projectTitle, todoTitle, newTitle) {
    const projects = Store.getProjectsFromLocal();
    const project = Store.findProject(projects, projectTitle);
    const todo = Store.findTodo(project, todoTitle);

    if (todo) {
      todo.title = newTitle;
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }

  static editTodoDescriptionOnLocal(projectTitle, todoTitle, newDescription) {
    const projects = Store.getProjectsFromLocal();
    const project = Store.findProject(projects, projectTitle);
    const todo = Store.findTodo(project, todoTitle);

    if (todo) {
      todo.description = newDescription;
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }

  static editTodoPriorityOnLocal(projectTitle, todoTitle, newPriority) {
    const projects = Store.getProjectsFromLocal();
    const project = Store.findProject(projects, projectTitle);
    const todo = Store.findTodo(project, todoTitle);

    if (todo) {
      todo.priority = newPriority;
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }
}

export { Store as default };

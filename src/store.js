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

  static removeProjectFromLocal(title) {
    const projects = Store.getProjectsFromLocal();

    projects.forEach((p, index) => {
      if (p.projectName === title) {
        projects.splice(index, 1);
      }
    });

    localStorage.setItem('projects', JSON.stringify(projects));
  }
}

export { Store as default };

class Store {
  static getProjectsFromLocal() {
    let projects;
    if (localStorage.getItem('projects') === null) {
      projects = [];
    } else {
      projects = JSON.parse(localStorage.getItem('projects'));
    }

    return projects;
  }

  static addProjectToLocal(project) {
    const projects = Store.getBooksFromLocal();
    projects.push(project);

    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static removeProjectFromLocal(title) {
    const projects = Store.getProjectsFromLocal();

    projects.forEach((p, index) => {
      if (p.title === title) {
        projects.splice(index, 1);
      }
    });

    localStorage.setItem('projects', JSON.stringify(projects));
  }
}

export { Store as default };

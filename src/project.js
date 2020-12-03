import Store from './store';

class Project {
  constructor(projectName, projectTodos) {
    this.projectName = projectName;
    this.projectTodos = projectTodos;
  }

  static getProject(title) {
    const projects = Store.getProjectsFromLocal();

    let proj = {};
    projects.forEach(project => {
      if (project.projectName === title) {
        proj = project;
      }
    });
    return proj;
  }

  static createProject(title) {
    Store.addProjectToLocal(new Project(title, []));
  }

  static edit(currentTitle, newTitle) {
    Store.editProjectOnLocal(currentTitle, newTitle);
  }

  static delete(title) {
    if (Project.getProject(title)) {
      if (Project.getProject(title).projectTodos.length < 1) {
        Store.removeProjectFromLocal(title);
        return true;
      }
    }
    return false;
  }
}

export { Project as default };

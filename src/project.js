import tasks from './storage';

class Project {
  constructor(projectName, projectTodos) {
    this.projectName = projectName;
    this.projectTodos = projectTodos;
  }

  get() {
    return this.projectName;
  }

  set(title) {
    this.projectName = title;
  }

  static getProject(title) {
    let proj = {};
    tasks.forEach(project => {
      if (project.projectName === title) {
        proj = project;
      }
    });
    return proj;
  }

  static createProject(title) {
    tasks.push(new Project(title, []));
  }

  static edit(currentTitle, newTitle) {
    if (Project.getProject(currentTitle)) {
      Project.getProject(currentTitle).projectName = newTitle;
    }
    /*
    tasks.forEach((proj, index) => {
      if (proj.projectName === currentTitle) {
        return { proj, index };
      }
      return {};
    }); */
  }
}

export { Project as default };

import tasks from './storage';

class Project {
  static getProject(title) {
    let proj = {};
    tasks.forEach(project => {
      if (project.projectName === title) {
        proj = project;
      }
    });
    return proj;
  }

  static createProject(title){
    const proj = { projectName: 'project one', projectTodos:[] }
    tasks.push(proj)
  }
}

export { Project as default };

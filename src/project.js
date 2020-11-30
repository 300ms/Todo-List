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

  static createProject(title) {
    const proj = { projectName: title, projectTodos: [] };
    tasks.push(proj);
  }

  static edit(currentTitle, newTitle){
    tasks.forEach((proj, index) => {
      if(proj.projectName === currentTitle){
        return {proj, index}
      }
      return {}
    })



  }
}

export { Project as default };

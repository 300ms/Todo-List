import Project from './project'

class Todos {
  static addTodos(projectTitle, todoTitle, desc, dueDate, priority){
    const project = Project.getProject(projectTitle)

    if(project){
      const todo = {
        title: todoTitle,
        description: desc,
        dueDate: dueDate,
        priority: priority
      }

      project.projectTodos.push(todo);
    }
  }
}

export {Todos as default}
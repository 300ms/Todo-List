import Project from './project';
import Store from './store';

class Todos {
  static addTodos(projectTitle, todoTitle, desc, dueDate, priority) {
    const project = Project.getProject(projectTitle);

    if (project) {
      const todo = {
        title: todoTitle,
        description: desc,
        dueDate,
        priority,
      };

      Store.addTodoToLocal(projectTitle, todo);
    }
  }

  static delete(projectTitle, todo){
    const project = Project.getProject(projectTitle);

    if(project) {
      const projTodo = project.projectTodos;

      if(projTodo){
        Store.removeTodoFromLocal(projectTitle, todo) ;
      }
    }
  }
}

export { Todos as default };

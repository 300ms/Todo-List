import Project from './project';
import Store from './store';

class Todos {
  static addTodos(projectTitle, todoTitle, desc, dueDate, priority, complete = 0) {
    const project = Project.getProject(projectTitle);

    if (project) {
      const todo = {
        title: todoTitle,
        description: desc,
        dueDate,
        priority,
        complete,
      };

      Store.addTodoToLocal(projectTitle, todo);
    }
  }

  static delete(projectTitle, todo) {
    const project = Project.getProject(projectTitle);

    if (project) {
      const projTodo = project.projectTodos;

      if (projTodo) {
        Store.removeTodoFromLocal(projectTitle, todo);
      }
    }
  }

  static editTodoCheck(projectTitle, todoTitle, complete) {
    Store.editTodoOnLocal(projectTitle, todoTitle, complete);
  }
}

export { Todos as default };

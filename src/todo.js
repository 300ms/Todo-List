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

  static editTodoStatus(projectTitle, todoTitle, complete) {
    Store.editTodoStatusOnLocal(projectTitle, todoTitle, complete);
  }

  static editTodoTitle(projectTitle, todoTitle, newTitle) {
    Store.editTodoTitleOnLocal(projectTitle, todoTitle, newTitle);
  }

  static editTodoDescription(projectTitle, todoTitle, newDescription) {
    Store.editTodoDescriptionOnLocal(projectTitle, todoTitle, newDescription);
  }

  static editTodoPriority(projectTitle, todoTitle, newPriority) {
    Store.editTodoPriorityOnLocal(projectTitle, todoTitle, newPriority);
  }
}

export { Todos as default };

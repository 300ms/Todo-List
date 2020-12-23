import Todo from '../todo';
import Project from '../project';

test('add todo', () => {
  const project = Project.getProject('default project');
  const add = Todo.addTodos('default project', 'todoTitle', 'desc', 'dueDate', 'priority', 0);

  if (project) {
    expect(add).toBeTruthy();
  }
});
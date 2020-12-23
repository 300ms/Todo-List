import Store from '../store';
import Project from '../project';
import tasks from '../storage';

test('getProjectFromLocal', () => {
  expect(Store.getProjectsFromLocal()).toMatchObject([{ projectName: 'Default Project', projectTodos: [] }]);
});

test('add project to localstorage', () => {
  const proj = new Project('test project', []);
  const store = Store.getProjectsFromLocal();
  store.push(proj);
  expect(Store.addProjectToLocal(proj)).toBe(localStorage.setItem('projects', JSON.stringify(proj)));
});

test('edit project', () => {
  expect(Store.editProj(tasks, 'project one', 'newTitle')).toBeUndefined();
});

test('Find project', () => {
  const proj = [{ projectName: 'project one' }, { projectName: 'project two' }];

  expect(Store.findProject(proj, 'project one')).toEqual({ projectName: 'project one' });
});

test('Find todo', () => {
  const proj = [
    {
      projectName: 'project one',
      projectTodos: [{ title: 'one' }, { title: 'two' }],
    },
  ];

  expect(Store.findTodo(proj[0], 'one')).toEqual({ title: 'one' });
});
import Project from '../project';

test('Find project', () => {
  const proj = [{ projectName: 'project one' }, { projectName: 'project two' }];

  expect(Project.returnProj(proj, 'project one')).toEqual({ projectName: 'project one' });
});

test('delete project', () => {
  const project = Project.getProject('default project');

  if (project) {
    if (Project.getProject('default project').projectTodos.length < 1) {
      expect(Project.delete('default project')).toBeTruthy();
    }
  }
});
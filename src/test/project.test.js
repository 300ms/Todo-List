import Project from '../project';

test('Find project', () => {
  const proj = [{ projectName: 'project one' }, { projectName: 'project two' }];

  expect(Project.returnProj(proj, 'project one')).toEqual({ projectName: 'project one' });
});
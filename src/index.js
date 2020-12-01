import './style.css';
import 'bootstrap';
import 'bootswatch/dist/pulse/bootstrap.min.css';
import UI from './UI';
import Project from './project';
import tasks from './storage';

document.addEventListener('DOMContentLoaded', UI.listProjects());
document.addEventListener('DOMContentLoaded', UI.showProject('project one'));

document.querySelector('.project-ul').addEventListener('click', (event) => {
  if (event.target.classList.contains('project-title')) {
    UI.clearTodos();
    UI.showProject(event.target.innerHTML);
  }
});

document.getElementById('project-form').addEventListener('submit', (e) => {
  const title = e.target.title.value;
  UI.addProject(title);
});

document.querySelector('#todo-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const projectTitle = e.target.currentProject.value;
  const todoTitle = e.target.name.value;
  const desc = e.target.desc.value;
  const dueDate = e.target.dueDate.value;
  const priority = e.target.priority.value;

  UI.addTodo(projectTitle, todoTitle, desc, dueDate, priority);
  UI.todosFormReset();
});

document.querySelectorAll('.editProject').forEach(button => {
  button.addEventListener('click', e => { UI.toggleProjectForm(e); });
});

document.querySelectorAll('.saveProject').forEach(button => {
  button.addEventListener('click', e => {
    UI.toggleProjectForm(e);
    const { children } = e.target.parentElement.parentElement.previousElementSibling;
    const currentTitle = children[0].children[0].innerHTML;
    const newTitle = e.target.parentElement.title.value;
    Project.edit(currentTitle, newTitle);
  });
});

document.querySelectorAll('.cancelProject').forEach(button => {
  button.addEventListener('click', e => { UI.toggleProjectForm(e); });
});

document.querySelectorAll('.deleteProject').forEach(button => {
  button.addEventListener('click', e => {
    const title = e.target.parentElement.previousElementSibling.children[0].innerHTML
    Project.delete(title)
  })
})



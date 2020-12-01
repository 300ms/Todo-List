import './style.css';
import 'bootstrap';
import 'bootswatch/dist/pulse/bootstrap.min.css';
import UI from './UI';

document.addEventListener('DOMContentLoaded', UI.listProjects());
document.addEventListener('DOMContentLoaded', UI.showProject('project one'));

document.querySelector('.project-ul').addEventListener('click', (event) => {
  if (event.target.classList.contains('project-title')) {
    UI.clearTodos();
    UI.showProject(event.target.innerHTML);
  }
});

document.getElementById('project-form').addEventListener('submit', (e) => {
  e.preventDefault();
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

document.querySelector('.project-ul').addEventListener('click', (e) => {
  const element = e.target;
  // const projectFrom = document.querySelector('.project-form-title');

  if (element.id === 'editProject') {
    UI.toggleProjectForm();
    // const currentProject = e.target.parentElement.previousElementSibling.innerHTML
    // projectFrom.value = currentProject
  }
});

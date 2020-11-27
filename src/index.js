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

document.addEventListener('submit', e => {
  e.preventDefault();
  const title = e.target.title.value;
  UI.addProject(title);
});

import './style.css';
import 'bootstrap';
import 'bootswatch/dist/pulse/bootstrap.min.css';
import UI from './UI';
import Store from './store';

document.addEventListener('DOMContentLoaded', UI.listProjects());
document.addEventListener('DOMContentLoaded', UI.showProject(Store.getProjectsFromLocal()[0].projectName));

document.querySelector('.project-ul').addEventListener('click', (event) => {
  if (event.target.classList.contains('project-title')) {
    UI.clearTodos();
    UI.showProject(event.target.innerHTML);
  }
});

document.getElementById('project-form').addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('xxx');
  const title = e.target.title.value;
  UI.addProject(title);
});

UI.addListeners();

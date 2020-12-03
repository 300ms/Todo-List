import './style.css';
import 'bootstrap';
import 'bootswatch/dist/pulse/bootstrap.min.css';
import UI from './UI';
import Store from './store';

document.addEventListener('DOMContentLoaded', UI.listProjects());
document.addEventListener('DOMContentLoaded', UI.showProject(Store.getProjectsFromLocal()[0].projectName));
const projectList = document.querySelector('.project-ul');
projectList.addEventListener('click', (event) => {
  if (event.target.classList.contains('project-title')) {
    UI.clearTodos();
    UI.showProject(event.target.innerHTML);
    for (let i = 1; i < projectList.children.length; i += 1) {
      projectList.children[i].style.backgroundColor = '#17141f';
    }
    event.target.parentElement.parentElement.parentElement.style.backgroundColor = 'gray';
  }
});

document.getElementById('project-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  UI.addProject(title);
});

UI.addListeners();

import tasks from './todos';

class UI {
  static showProject(){
    const content = document.querySelector('.content');
    const ul = document.querySelector('.project-ul');  

    tasks.forEach(task => {
      const li = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <h4>${task.projectName}</h4>
          <span class="badge badge-primary badge-pill">14</span>
        </li>
      `
      ul.innerHTML += li;

    })

    content.appendChild(ul);
  }

}

export { UI as default }
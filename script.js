document.addEventListener("DOMContentLoaded", function () {
    fetchTask();

    const addTaskButton = document.getElementById('addTaskButton')
    addTaskButton.addEventListener('click',addTask)
  });
  
  function fetchTask() {
    fetch("https://657ad086394ca9e4af12b9e0.mockapi.io/todos")
      .then((response) => response.json())
      .then((data) => {
        showTask(data);
      })
      .catch((error) => console.log("Error fetching todos:", error));
  }
  
  function showTask(todos) {
    const todoContainer = document.getElementById('taskList');
    todoContainer.innerHTML = '';
  
    todos.forEach((todo) => {
      const todoText = document.createElement('div');
      todoText.classList.add('todo-text');
  
      
      // checkbox.type = 'checkbox';
      // checkbox.className = 'completeBtn';
  
      const label = document.createElement('label');
      label.innerHTML = `${todo.task} `

      const action = document.createElement('div')
      action.innerHTML= `<input class="completeBtn" type="checkbox">
      <button class ="delBtn">Delete</button> 
      <button class ="editBtn">Edit</button>`
  
      todoText.appendChild(label);
      todoText.appendChild(action)
      const checkbox = todoText.querySelector('.completeBtn');
  
      const deleteButton = todoText.querySelector('.delBtn');
      // deleteButton.className = 'delBtn';
      // deleteButton.innerHTML = 'Delete';
  
      deleteButton.addEventListener('click', () => {
        deleteFromApi(todo.id);
        todoText.remove();
      });
  
      todoText.appendChild(deleteButton);
  
      const editButton = todoText.querySelector('.editBtn');
      // editButton.className = 'editBtn';
      // editButton.innerHTML = 'Edit';
  
      editButton.addEventListener('click', () => {
        editTask(todo.id, label, checkbox);
      });
  
      todoText.appendChild(editButton);
  
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          label.style.textDecoration = 'line-through';
  
          SaveToLocalStorage(todo);
          deleteButton.disabled = true;
          editButton.disabled = true;
        } else {
          label.style.textDecoration = 'none';
        }
      });
  
      todoContainer.appendChild(todoText);
    });
  }
  
  function deleteFromApi(todoId) {
    fetch(`https://657ad086394ca9e4af12b9e0.mockapi.io/todos/${todoId}`, {
      method: 'DELETE',
    })
      .then(() => {
        alert('Deleted Successfully!');
        fetchTask();
      })
      .catch((error) => console.log('Error deleting todo:', error));
  }
  
  function SaveToLocalStorage(todo) {
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    completedTasks.push(todo);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }
  
  function editTask(todoId, label, checkbox) {
    const checkboxState = checkbox.checked;
  
    const newText = prompt('Enter the new task text:', label.textContent);
  
    if (newText !== null) {
      label.textContent = newText;
      fetch(`https://657ad086394ca9e4af12b9e0.mockapi.io/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: newText,
          completed: checkboxState,
        }),
      })
        .then((response) => response.json())
        .then((updatedTodo) => {
          checkbox.checked = updatedTodo.completed;
        })
        .catch((error) => console.log('Error updating todo:', error));
    }
  }
  
  
  
  function deleteFromApi(todoId) {
    fetch(`https://657ad086394ca9e4af12b9e0.mockapi.io/todos/${todoId}`, {
      method: 'DELETE',
    })
      .then(() => {
        alert('Deleted Successfully!');
        fetchTask();
      })
      .catch((error) => console.log('Error deleting todo:', error));
  }
  
  function SaveToLocalStorage(todo) {
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    completedTasks.push(todo);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }
  

  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTaskText = taskInput.value;
  
    if (newTaskText.trim() === '') {
      alert('Please enter a task.');
      return;
    }
  
    fetch('https://657ad086394ca9e4af12b9e0.mockapi.io/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: newTaskText,
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then((newTodo) => {
        const todoContainer = document.getElementById('taskList');
  
        const todoText = document.createElement('div');
        todoText.classList.add('todo-text');
  
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'completeBtn';
  
        const label = document.createElement('label');
        label.innerHTML = `${newTodo.id} ${newTodo.task}`;
        label.appendChild(checkbox);
  
        todoText.appendChild(label);
  
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delBtn';
        deleteButton.innerHTML = 'Delete';
  
        deleteButton.addEventListener('click', () => {
          deleteFromApi(newTodo.id);
          todoText.remove();
        });
  
        todoText.appendChild(deleteButton);
  
        const editButton = document.createElement('button');
        editButton.className = 'editBtn';
        editButton.innerHTML = 'Edit';
  
        editButton.addEventListener('click', () => {
          editTask(newTodo.id, label, checkbox);
        });
  
        todoText.appendChild(editButton);
  
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) {
            label.style.textDecoration = 'line-through';
            SaveToLocalStorage(newTodo);
          } else {
            label.style.textDecoration = 'none';
          }
        });
  
        todoContainer.appendChild(todoText);
      })
      .catch((error) => console.log('Error adding todo:', error));

    taskInput.value = '';
  }
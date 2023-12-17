document.addEventListener("DOMContentLoaded", function () {
    fetchTask();
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
    const completedTaskContainer = document.getElementById('completedTaskList');
  
    todoContainer.innerHTML = '';
    completedTaskContainer.innerHTML = '';
  
    todos.forEach((todo) => {
      console.log(todo);
  
      const todoText = document.createElement('div');
      todoText.classList.add('todo-text');
      todoText.innerHTML = `${todo.id}
          ${todo.task} 
          <button class="editBtn">Edit</button> 
          <button class="delBtn">Delete</button> 
          <button class="completeBtn">Completed</button>`;
  
      const deleteButton = todoText.querySelector(".delBtn");
      deleteButton.addEventListener("click", () => {
        deleteFromApi(todo.id);
        todoText.remove();
      });
  
      const completeButton = todoText.querySelector(".completeBtn");
      completeButton.addEventListener("click", () => {
        // moveCompletedTask(todo);
        todoText.remove();
      });
  
      todoContainer.appendChild(todoText);
    });
  }
  
  function deleteFromApi(todoId) {
    fetch(`https://657ad086394ca9e4af12b9e0.mockapi.io/todos/${todoId}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Deleted Successfully!");
        fetchTask();
      })
      .catch((error) => console.log("Error deleting todo:", error));
  }
  
//   function moveCompletedTask(todo) {
//     saveCompletedTaskToLocalStorage(todo); 
//     const completedTaskContainer = document.getElementById('completedTaskList');
  
//     const completedTaskText = document.createElement('div');
//     completedTaskText.classList.add('completed-task-text');
//     completedTaskText.innerHTML = `${todo.id} ${todo.task} <button class="removeBtn">Remove</button>`;
  
//     const removeButton = completedTaskText.querySelector(".removeBtn");
//     removeButton.addEventListener("click", () => {
//       completedTaskText.remove();
//     });
  
//     completedTaskContainer.appendChild(completedTaskText);
//   }
  

  function saveCompletedTaskToLocalStorage(todo) {
    const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    completedTasks.push(todo);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }
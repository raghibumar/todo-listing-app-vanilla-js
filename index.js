const url = "https://jsonplaceholder.typicode.com/todos";

// Fetching data from API
async function getData() {
  const res = await fetch(url);
  const data = await res.json();

  // Grouping data based on userId
  const users = {};

  data.forEach((todo) => {
    if (!users[todo.userId]) {
      users[todo.userId] = [];
    }
    users[todo.userId].push(todo);
  });
  displayTodo(users);
}

// Displaying data on UI
function displayTodo(userDetails) {
  const todoContainer = document.createElement("div");
  todoContainer.setAttribute("class", "todo-container");

  Object.keys(userDetails).forEach((userId) => {
    const todos = userDetails[userId];
    const userCard = document.createElement("div");
    userCard.setAttribute("class", "user-card");

    const userTitle = document.createElement("h3");
    userTitle.setAttribute("class", "user-title");
    userTitle.innerText = `User ${userId}`;

    userCard.addEventListener("click", () => {
      displayIndividualUserTodos(todos);
    });

    userCard.appendChild(userTitle);
    todoContainer.appendChild(userCard);
  });

  document.querySelector(".container").appendChild(todoContainer);
}

// Displaying individual user's todos
function displayIndividualUserTodos(todos) {
  console.log("todos:", todos);
  // Make a modal to show todos
  const modal = document.createElement("div");
  modal.setAttribute("class", "modal");

  const modalContent = document.createElement("div");
  modalContent.setAttribute("class", "modal-content");

  const firstDiv = document.createElement("div");
  firstDiv.setAttribute("class", "first-div");

  const user = document.createElement("h2");
  user.setAttribute("class", "user-title");
  user.innerText = `User: ${todos[0].userId}`;

  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("class", "close-btn");
  closeBtn.innerText = "Close";
  closeBtn.addEventListener("click", () => {
    document.querySelector(".container").removeChild(modal);
  });
  firstDiv.append(user, closeBtn);

  const secondDiv = document.createElement("div");
  secondDiv.setAttribute("class", "second-div");

  const thirdDiv = document.createElement("div");
  thirdDiv.classList.add("third-div");

  // Making a tab for completed and pending todos
  const tab = document.createElement("div");
  tab.setAttribute("class", "tab");

  const completedTab = document.createElement("div");
  completedTab.setAttribute("class", "tab-option active"); // Start with Completed tab as active
  completedTab.innerText = "Completed";

  const pendingTab = document.createElement("div");
  pendingTab.setAttribute("class", "tab-option");
  pendingTab.innerText = "Pending";

  tab.append(completedTab, pendingTab);
  secondDiv.appendChild(tab);

  // A section to display the todos based on the tab selected
  const todoList = document.createElement("ul");
  todoList.setAttribute("class", "todo-list");
  thirdDiv.appendChild(todoList);

  // Event listeners for tab switching
  completedTab.addEventListener("click", () => {
    completedTab.classList.add("active");
    pendingTab.classList.remove("active");
    displayTodos(
      todos.filter((todo) => todo.completed),
      todoList
    ); // Show only completed todos
  });

  pendingTab.addEventListener("click", () => {
    pendingTab.classList.add("active");
    completedTab.classList.remove("active");
    displayTodos(
      todos.filter((todo) => !todo.completed),
      todoList
    ); // Show only pending todos
  });

  modalContent.append(firstDiv, secondDiv, thirdDiv);
  modal.appendChild(modalContent);
  document.querySelector(".container").appendChild(modal);

  // Display initial todos (completed ones)
  displayTodos(
    todos.filter((todo) => todo.completed),
    todoList
  );
}

// Function to display todos inside the modal
function displayTodos(filteredTodos, todoList) {
  todoList.innerHTML = ""; // Clear previous todos
  filteredTodos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.innerText = todo.title;
    todoList.appendChild(todoItem);
  });
}

getData();

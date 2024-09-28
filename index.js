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
  // Making a modal to show todos
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
    modal.style.display = "none"; // Hide the modal
  });
  firstDiv.append(user, closeBtn);

  const secondDiv = document.createElement("div");
  secondDiv.setAttribute("class", "second-div");

  const thirdDiv = document.createElement("div");
  thirdDiv.classList.add("third-div");

  // Creating tabs for All Todos, Completed, and Pending
  const tab = document.createElement("div");
  tab.setAttribute("class", "tab");

  const allTab = document.createElement("div");
  allTab.setAttribute("class", "tab-option active"); // Start with All Todos tab as active
  allTab.innerText = "All Todos";

  const completedTab = document.createElement("div");
  completedTab.setAttribute("class", "tab-option");
  completedTab.innerText = "Completed";

  const pendingTab = document.createElement("div");
  pendingTab.setAttribute("class", "tab-option");
  pendingTab.innerText = "Pending";

  tab.append(allTab, completedTab, pendingTab);
  secondDiv.appendChild(tab);

  // A section to display the todos based on the tab selected
  const todoList = document.createElement("ul");
  todoList.setAttribute("class", "todo-list");
  thirdDiv.appendChild(todoList);

  // Event listeners for tab switching
  allTab.addEventListener("click", () => {
    allTab.classList.add("active");
    completedTab.classList.remove("active");
    pendingTab.classList.remove("active");

    // Show all todos
    displayTodos(todos, todoList, "all");
  });

  completedTab.addEventListener("click", () => {
    completedTab.classList.add("active");
    allTab.classList.remove("active");
    pendingTab.classList.remove("active");

    // Show only completed todos
    displayTodos(
      todos.filter((todo) => todo.completed),
      todoList,
      "completed"
    );
  });

  pendingTab.addEventListener("click", () => {
    pendingTab.classList.add("active");
    allTab.classList.remove("active");
    completedTab.classList.remove("active");

    // Show only pending todos
    displayTodos(
      todos.filter((todo) => !todo.completed),
      todoList,
      "pending"
    );
  });

  modalContent.append(firstDiv, secondDiv, thirdDiv);
  modal.appendChild(modalContent);
  document.querySelector(".container").appendChild(modal);

  // Display initial todos (all todos)
  displayTodos(todos, todoList, "all");
}

// Function to display todos inside the modal
function displayTodos(filteredTodos, todoList, selectedTab = "all") {
  todoList.innerHTML = ""; // Clear previous todos

  filteredTodos.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");

    const todoTitle = document.createElement("span");
    todoTitle.setAttribute("class", "todo-title");
    if (index + 1 > 9) {
      todoTitle.innerText = `(${index + 1}) ${todo.title}`;
    } else {
      todoTitle.innerText = `(0${index + 1}) ${todo.title}`;
    }

    const status = document.createElement("span");
    status.setAttribute("class", "todo-status");

    if (selectedTab === "all") {
      if (todo.completed) {
        status.innerText = "Completed";
        status.style.color = "green";
      } else {
        status.innerText = "Pending";
        status.style.color = "red";
      }
      todoItem.append(todoTitle, status);
    } else if (selectedTab === "completed") {
      todoTitle.style.textDecoration = "line-through";
      todoItem.append(todoTitle);
    } else {
      todoItem.append(todoTitle);
    }

    todoList.append(todoItem);
  });
}

getData();

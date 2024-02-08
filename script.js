const input = document.getElementById("input");
const add = document.getElementById("add");
const del = document.getElementById("delete");
const deleteElement = document.getElementById("deleteElement");
const box = document.getElementById("box");
const listEleman = document.querySelector(".listEleman");
add.addEventListener("click", function () {
  const isEmpy = (str) => !str.trim().length;
  if (isEmpy(input.value)) {
    Swal.fire("Lütfen Todo'yu boş bırakmayınız!!");
  } else {
    saveLocal(input.value);

    let li = document.createElement("li");
    li.classList.add("listEleman");
    box.appendChild(li);
    li.innerHTML = input.value;
    input.value = "";
    let deleteButton = document.createElement("i");
    deleteButton.innerHTML = "<i class='fas fa-times'></i>";
    deleteButton.classList.add("fa-solid");
    li.appendChild(deleteButton);


    

    deleteButton.addEventListener("click", function () {
      li.remove();
      removeLocalStorage(li)
    });

    li.addEventListener("click", function () {
      li.style.textDecoration = "line-through";
    });

    del.addEventListener("click", function () {
      li.remove();
    });
    box.style.backgroundColor = "aliceblue";
  }

 
});
let todos;
let todo;

function saveLocal(todo) {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}



function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

function displayTodos() {
  const todos = getTodos();

  todos.forEach((todo) => {
    let li = document.createElement("li");
    li.classList.add("listEleman");
    box.appendChild(li);
    li.innerHTML = todo;
    let deleteButton = document.createElement("i");
    deleteButton.innerHTML = "<i class='fas fa-times'></i>";
    deleteButton.classList.add("fa-solid");
    li.appendChild(deleteButton);

    deleteButton.addEventListener("click", function () {
      li.remove();
      removeLocalStorage(li);
    });

    li.addEventListener("click", function () {
      li.style.textDecoration = "line-through";
    });

    del.addEventListener("click", function () {
      li.remove();
    });

    box.style.backgroundColor = "aliceblue";
  });
}

displayTodos();  // Sayfa yüklendiğinde mevcut todos'u göster



function removeLocalStorage(li) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoText = li.innerText; // li öğesinin metin içeriğini al
  const indexToRemove = todos.indexOf(todoText);

  if (indexToRemove !== -1) {
    todos.splice(indexToRemove, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}


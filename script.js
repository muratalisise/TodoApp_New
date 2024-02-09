const input = document.getElementById("input");
const add = document.getElementById("add");
const del = document.getElementById("deleteButton");
const deleteElement = document.getElementById("deleteElement");
const box = document.getElementById("box");
const listEleman = document.querySelector(".listEleman");

add.addEventListener("click", function () {
//  const isEmpy = (str) => !str.trim().length;
//isEmpy(input.value
  if ((input.value).trim().length === 0) {
    Swal.fire("Lütfen Todo'yu boş bırakmayınız!!");
  } else {
    save(input.value);
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
		Swal.fire({
			title: "Emin misin?",
			text: "Bunu geri döndüremezsiniz!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Evet, silin!"
		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire({
				title: "Silindi!",
				text: "Todonuz silindi.",
				icon: "success"
				
			  });
			  li.remove();
				removeLocalStorage(li)
			}
		  });
    });

    li.addEventListener("click", function () {
      li.style.textDecoration = "line-through";
    });
    box.style.backgroundColor = "aliceblue";
  }
});

let todos;
let todo;
function save(todo) {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  del.addEventListener("click", function () {
	box.innerHTML = ""; // Todo listesini temizle
	removeAllTodos();
  });
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
  
	  box.style.backgroundColor = "aliceblue";
	});
  }
  displayTodos();  // Sayfa yüklendiğinde mevcut todos'u göster
  
  del.addEventListener("click", function () {
	Swal.fire({
	  title: "Emin misin?",
	  text: "Bunu geri döndüremezsiniz!",
	  icon: "warning",
	  showCancelButton: true,
	  confirmButtonColor: "#3085d6",
	  cancelButtonColor: "#d33",
	  confirmButtonText: "Evet, silin!"
	}).then((result) => {
	  if (result.isConfirmed) {
		Swal.fire({
		  title: "Silindi!",
		  text: "Tüm todolarınız silindi.",
		  icon: "success"
		}).then(() => {
		  removeAllTodos(); // Tüm todoları ve localStorage'daki veriyi sil
		  box.innerHTML = ""; // Todo listesini temizle
		});
	  }
	});
  });

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

function removeAllTodos() {
	localStorage.removeItem("todos");
	box.innerHTML = ""; // Todo listesini temizle
  }

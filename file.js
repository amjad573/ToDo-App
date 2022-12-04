const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);

function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value)
    //CHECk MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
     //CHECk TRASH BUTTON
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<i class="fas fa-trash"></i>'
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);
     //APPEND TO LIST
     todoList.appendChild(todoDiv);
     //CLEAR TODO INPUT VALUE
     todoInput.value ="";

}
function deleteCheck(e){
const item = e.target;
//DELETE TODO
if(item.classList[0] === "trash-btn"){
    const todo = item.parentElement;
    //Animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function (){
    todo.remove();   
    }) ;
}
if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
}
}
function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}



function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
         //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //CHECk MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
     //CHECk TRASH BUTTON
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<i class="fas fa-trash"></i>'
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);
     //APPEND TO LIST
     todoList.appendChild(todoDiv);
        
    });
}
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos' , JSON.stringify(todos));
}
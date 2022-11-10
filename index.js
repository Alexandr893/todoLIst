// получить данные
let addMessage = document.querySelector(".message");
let addBtn = document.querySelector(".add");

let todo = document.querySelector(".todo");

// в массив будет записан объект каждой задачи
let todoList = [];

if (localStorage.getItem('todo')){
    // возвращаем данные в массив из localstorage
    // (для localstorage ключем является свойство todo)
    todoList = JSON.parse(localStorage.getItem('todo'))
    displayMessages();
}


// добавить
addBtn.addEventListener('click',function(){
    
    // объект для задач,их будет хранить массив
    let newTodo = {
        todo:addMessage.value,
        checked: false,
        important: false
    }

    
    todoList.push(newTodo);
    displayMessages();
    // сохранение
    localStorage.setItem('todo',JSON.stringify(todoList));
    addMessage.value = '';
    addMessage.focus();

    
});




// перебор массива и вывод объектов с тегом li (рендер)
function displayMessages(){
    if(todoList.length === 0){
        todo.innerHTML = '';
    }
    let displayMessage = '';
    todoList.forEach(function(item,i){
        // создание верстки
         displayMessage  += `
        <li>
            <input class='input__add' type="checkbox"  id='item_${i}' ${item.checked?'checked':null}>
            <label for = 'item_${i}' class="${item.important? 'important' : null}">${item.todo}</label>
        </li>
        `;

        todo.innerHTML = displayMessage;
    });
}


// реализуем поиск выполненных задач через id
todo.addEventListener('change',(event)=>{
  let idInput =  event.target.getAttribute('id');
  let forLable = todo.querySelector('[for=' + idInput + ']');
  let valuelabel = forLable.innerHTML;
  
  todoList.forEach(item => {
    if(item.todo = valuelabel){
        item.checked = !item.checked;
        // сохраним 
    localStorage.setItem('todo',JSON.stringify(todoList));
    }
  });
});

// важные сообщения,реализуем импортант
todo.addEventListener('contextmenu',function(event){
    event.preventDefault();
    // перебор индексов лейблов
    todoList.forEach(function(item,i){
        if(item.todo === event.target.innerHTML){
            if(event.ctrlKey || event.metaKey){
                todoList.splice(i,1);
            }
            // пока не зажат ctrl меняем параметр импортант
            else {
                item.important = !item.important;
            }
            
            displayMessages();
            localStorage.setItem('todo',JSON.stringify(todoList));
        }
    });
});



    
       
      
   
     





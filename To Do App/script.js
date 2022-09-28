const form = document.getElementById('form'),
      input = document.getElementById('input'),
      todoList = document.getElementById('todo-list'),
      todoEls = document.querySelectorAll('li');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    todoList.style.display = 'flex';
    let todoEls = document.querySelectorAll('li');

    const todoText = input.value;

    if(todoText) {
        const todoEl = document.createElement('li')
        const hr = document.createElement('hr')


        todoEl.innerHTML = `
            <input type="checkbox" name="todo${todoEls.length}" id="todo${todoEls.length}">
            <label for="todo${todoEls.length}">${todoText}</label>
            <i class="fa-solid fa-xmark"></i>
        `;

        
        todoList.appendChild(todoEl)
        todoList.appendChild(hr)

        input.value = "";

        let todoItems = document.querySelectorAll('input[type="checkbox"]'),
            todoLabel = document.querySelectorAll('label');
            todoCloseIcons = document.querySelectorAll('.fa-xmark');

        todoItems.forEach((todoItem, i) => {
            todoLabel[i].addEventListener('click', () => {

                if (todoItem.checked){
                    todoLabel[i].style.textDecoration = 'none';
                } else{
                    todoLabel[i].style.textDecoration = 'line-through';
                }
            })
        })

        todoCloseIcons.forEach((todoCloseIcon) => {
            todoCloseIcon.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(todoEl);
                todoEl.remove();
                hr.remove();
                
                if (todoList.childElementCount === 0) {
                    todoList.style.display = 'none';
                }
                 
            })
        })

    }
})


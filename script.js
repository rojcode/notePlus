const $ = document;

let lang = localStorage.getItem('lang');




//Array
let todos = [];


const createObjectArray = (name)=>{
    try{
        const idGenerator = todos.length + 1;
        const newObject = {
            id:idGenerator,
            name:name,
            status:'undone',
        };
        todos.push(newObject)
        return true;
    }catch(error){
        console.log('Error in createObjectArray:',error.message)
        return false
    }
};

const getFromLocalStorage = ()=>{
    try{
        const get = localStorage.getItem('todos');
        if(get){
            const parse = JSON.parse(get);
            todos = parse;
        }
    }catch(error){
        console.log('Error in getFromLocalStorage:',error.message);
    };
};


const sendToLocalStorage = (array)=>{
    try{
        const todosToJson = JSON.stringify(todos);
        localStorage.setItem('todos',todosToJson);
        return true;
    }catch(error){
        console.log('Error in sendToLocalStorage:',error.message)
        return false;
    }
}


// Toast
const toast = $.querySelector('#toast');

const toastShow = (message, status) => {
    toast.style.visibility = 'visible';
    toast.textContent = message;
    toast.style.backgroundColor = status;
    setTimeout(() => {
        toast.style.visibility = 'hidden';
    }, 4000);
};

// Modal
let modal = $.querySelector('.modal');
const modalContent = $.querySelector('.modal-content');
const modalTitle = $.createElement('h2');
const bodyModal = $.createElement('p');
const deleteButton  = $.createElement('button');
deleteButton.classList.add('btn','btn-red');
if(lang=='fa'){
    deleteButton.innerHTML = 'حذف';
}else{
    deleteButton.innerHTML = 'Delete';
}

const cancelButton = $.createElement('button');
cancelButton.classList.add('btn','btn-gray');
if(lang=='fa'){
    cancelButton.innerHTML = 'کنسل';
}else{
    cancelButton.innerHTML = 'Cancel';
}

modalContent.append(modalTitle,bodyModal,deleteButton,cancelButton);

// Element undone - done - delete
const undoneElement = $.querySelector('#undone');
if(lang == 'fa'){
    undoneElement.textContent = 'انجام نشده';
}else{
    undoneElement.textContent = 'undone';
}

const doneElement = $.querySelector('#done');
if(lang=='fa'){
    doneElement.textContent = 'انجام شده';
}else{
    doneElement.textContent = 'Done';
}

const deleteElement = $.querySelector('#delete');
if(lang=='fa'){
    deleteElement.textContent = 'حذف';
}else{
    deleteElement.textContent = 'Delete';
}



const showModal = (title,message,delButton,canButton)=>{

    modalTitle.textContent = title;
    bodyModal.textContent = message;

    deleteButton.addEventListener('click',(e)=>{
        delButton(e,modal);
    });
    cancelButton.addEventListener('click',(e)=>{
        canButton(e,modal);
    });
    modal.style.display = 'flex';
}


// Title Element
const header = $.querySelector('header h1');

if(lang=='fa'){
    header.textContent = 'نوت +'; 
}else{
    header.textContent = 'Note +'; 
}




// Create Images
const flagContainer = $.querySelector('.flag-container');

// Iran Flag
let  iranFlag = $.createElement('img');
 iranFlag.src = 'img/Flag_of_Iran.svg.png';
 iranFlag.alt = 'Iran Flag';
 iranFlag.className = 'flag';

 iranFlag.addEventListener('click',()=>{
    const lang = localStorage.setItem('lang','fa');
    window.location.reload();
 })


// UK Flag
let ukFlag = $.createElement('img');
ukFlag.src = 'img/Flag_of_the_United_Kingdom_(1-2).svg.png';
ukFlag.alt = 'UK Flag';
ukFlag.className = 'flag';

ukFlag.addEventListener('click',()=>{
    const lang = localStorage.setItem('lang','en');
    window.location.reload();
    
})

flagContainer.append( iranFlag, ukFlag);

// Todo Title
const todoTitle = $.querySelector('.title h2');
if(lang=='fa'){
    todoTitle.textContent = `کاری رو کە می خواهی انجام بدی رو وارد کن`;

}else{
    todoTitle.textContent = `Enter your todo`;
}


// Create Buttons
const buttonContainer = $.querySelector('.btn-container');

// Clear Button
let clearButton = $.createElement('button');
clearButton.className = 'btn btn-red';
if(lang=='fa'){
    clearButton.textContent = 'پاک کردن';
}else{
    clearButton.textContent = 'Clear';
}
buttonContainer.append(clearButton);

// Add Button
let addButton = $.createElement('button');
addButton.className = 'btn btn-green';
if(lang=='fa'){
    addButton.textContent = 'اضافه کردن';
}else{
    addButton.textContent = 'Add';
}

buttonContainer.append(addButton);

// Create Input
const formContainer = $.querySelector('#input-text');
let inputText = $.createElement('input');
inputText.type = 'text';
if(lang == 'fa'){
    inputText.placeholder = 'چیزی رو تایپ کن ...';
}else{
    inputText.placeholder = 'Enter something...';
}

formContainer.appendChild(inputText);

const createItemTodo = (value) => {
    try {
        const item = $.querySelector('#item-info');
        const text = $.createElement('div');
         
        text.className = 'info-text';
        text.textContent = value;
        text.draggable = true;
        text.setAttribute('data-name', value);

        item.appendChild(text);
        text.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.name);
        });
        return true;
    } catch (error) {
        console.log('Error', error.message);
    }
};

const createItemDone = (value)=>{
    try{
        const itemInfo = $.querySelector('#item-drop-done');
        const text = $.createElement('div');
         
        text.classList.add('info-text');
        text.textContent = value;
        text.draggable = true;
        text.setAttribute('data-name',value);
        itemInfo.appendChild(text);
        text.addEventListener('dragstart',(e)=>{
            e.dataTransfer.setData('text/plain',e.target.dataset.name)
        })
        return true
    }catch(error){
        console.log('Error',error.message)
    }
}




// Add Button Event Listener
addButton.addEventListener('click', (e) => {
    const add = createObjectArray(inputText.value);
    const addElement = createItemTodo(inputText.value);
    if (add && addElement) {
        if(lang=='fa'){
            toastShow('آیتم با موفقیت اضافه شد', 'green');
        }else{
            toastShow('Item added successfully.', 'green');
        }
        
        const send = sendToLocalStorage(todos);
    } else {
        if(lang=='fa'){
            toastShow('خطایی رخ دادە است', 'red');
        }else{
            toastShow('An error occurred.', 'red');
        }
        
    }
});


inputText.addEventListener('keydown',(e)=>{
    if(e.key=='Enter'){
        if(e.target.value == ''){
            if(lang == 'fa'){
                toastShow('لطفا مقداری رو وارد نمایید','red');
            }else{
                toastShow('Please enter a value','red')
            }
        }else{
            const add = createObjectArray(e.target.value);
            const addElement = createItemTodo(e.target.value);
            const send = sendToLocalStorage(todos);
            if(lang=='fa'){
                toastShow('خطایی رخ دادە است', 'red');
            }else{
                toastShow('An error occurred.', 'red');
            }
        }
    }
})



// Clear Button Event Listener
clearButton.addEventListener('click',(e)=>{
    inputText.value = '';
});

// Drop to Done
const dropToDone = $.querySelector('#item-drop-done');

dropToDone.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dropToDone.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const getElement = $.querySelector(`[data-name='${data}']`);
    const op = e.target.appendChild(getElement);

    todos = todos.map(todo=>{
        if(todo){
            if(todo.name == getElement.dataset.name){
                todo.status = 'done';
                sendToLocalStorage(todos)
            };
        }
    });
    
    if (op) {
        if(lang=='fa'){
            toastShow('تغییر وضعیت با موفقیت انجام شد.', 'green');
        }else{
            toastShow('Status changed successfully.', 'green');
        }
        
    }
});



// Drop to Undone
const dropToUnDone = $.querySelector('#item-drop-undone');

dropToUnDone.addEventListener('dragover',(e)=>{
    e.preventDefault();
});

dropToUnDone.addEventListener('drop',(e)=>{
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const getElement = $.querySelector(`[data-name='${data}']`);
    const op = e.target.appendChild(getElement);
    todos = todos.map(todo=>{
        if(todo.name == getElement.dataset.name){
            todo.status = 'undone';
            sendToLocalStorage(todos);
        }
    })
    if (op) {
        if(lang=='fa'){
            toastShow('تغییر وضعیت با موفقیت انجام شد.', 'green');
        }else{
            toastShow('Status changed successfully.', 'green');
        }
    }
});

// Drop to delete
const dropToDelete = $.querySelector('#item-drop-delete');

dropToDelete.addEventListener('dragover',(e)=>{
    e.preventDefault();
})

dropToDelete.addEventListener('drop',(e)=>{
    e.preventDefault();
    const dataDrop = e.dataTransfer.getData('text/plain');
    const getElement = $.querySelector(`[data-name='${dataDrop}']`);

    let modalLangChange = {};

    if(lang == 'fa'){
        modalLangChange = {title:'هشدار',body:'آیا از حذف آیتم اطمینان دارید ؟'}
    }else{
        modalLangChange = {title:'Warning',body:'Are you sure to delete the item'};
    }

    showModal(modalLangChange.title,modalLangChange.body,(e,data)=>{
        
       todos = todos.filter(item=>item&&item.name !== dataDrop);
       sendToLocalStorage(todos);
       data.style.display = 'none';
       if(lang=='fa'){
        toastShow('با موفقیت حذف شد','red');
       }else{
        toastShow('Removed successfully','red');
       }
       
       getElement.remove(); 
    },(e,data)=>{
        data.style.display = 'none';
    });
    
    
});


const showDoneTodos = ()=>{
    todos.forEach(function (todo) {
        if(todo){
            if(todo.status=='undone'){
                createItemTodo(todo.name)
            }else if(todo.status == 'done'){
                createItemDone(todo.name)
            }
        }
    })
}

getFromLocalStorage();
showDoneTodos();


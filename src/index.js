var todos = JSON.parse(localStorage.getItem('todos')) || [];
var idEdite = -1;
render(todos);
document.querySelector('#form').addEventListener('submit', function (e) {
    e.preventDefault();
    var button = document.querySelector('#form button');
    if (button.innerHTML === 'Adicionar') {
        takeData(false);
    }
    else {
        takeData(true);
    }
});
function takeData(isEditable) {
    var nome = document.getElementById('nome');
    var data = document.getElementsByClassName('hora')[0];
    var desc = document.getElementById('desc');
    var button = document.querySelector('#form button');
    if (idEdite === -1) {
        if (verify(nome.value)) {
            nome.style.borderColor = 'gray';
            if (verify(data.value)) {
                data.style.borderColor = 'gray';
                if (verify(desc.value)) {
                    desc.style.borderColor = 'gray';
                    var todo = {
                        id: todos.length,
                        nome: nome.value,
                        data: data.value,
                        desc: desc.value
                    };
                    todos.push(todo);
                    nome.value = '';
                    data.value = '';
                    desc.value = '';
                    save('todos', todos);
                }
                else
                    desc.style.borderColor = 'red';
            }
            else {
                data.style.borderColor = 'red';
            }
        }
        else {
            nome.style.borderColor = 'red';
        }
    }
    else {
        if (verify(nome.value)) {
            nome.style.borderColor = 'gray';
            if (verify(data.value)) {
                data.style.borderColor = 'gray';
                if (verify(desc.value)) {
                    desc.style.borderColor = 'gray';
                    todos[idEdite].nome = nome.value;
                    todos[idEdite].data = data.value;
                    todos[idEdite].desc = desc.value;
                    nome.value = '';
                    data.value = '';
                    desc.value = '';
                    idEdite = -1;
                    save('todos', todos);
                }
                else
                    desc.style.borderColor = 'red';
            }
            else {
                data.style.borderColor = 'red';
            }
        }
        else {
            nome.style.borderColor = 'red';
        }
    }
    if (isEditable)
        button.innerHTML = 'Adicionar';
}
function verify(value) {
    return value.trim() !== '';
}
function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    render(data);
}
function render(data) {
    var ul = document.getElementsByClassName('tarefas')[0];
    ul.innerHTML = '';
    data.map(function (todo, index) {
        ul.innerHTML += " <li class=\"relative flex justify-between items-center items-cente pl-8r mb-4 p-2 pl-8 bg-gray-200  w-full \">\n        <span class=\"absolute -top-4 -left-2 bg-white shadow flex justify-center items-center w-[2rem] h-[2rem] rounded-full bg-gray-500\">".concat(index + 1, "</span>\n        <p>").concat(todo.nome, "</p>\n        <div class=\"flex flex-wrap\">\n        <button onclick = editar(").concat(index, ") class ='p-2 mx-2 border hover:border-green-500 hover:rounded border-b-green-500'>Editar</button>\n        <button onclick = detail(").concat(index, ") class ='p-2 mx-2 border hover:border-green-500 hover:rounded border-b-green-500'>Ver Mais...</button>\n        <button onclick = deleteTodo(").concat(index, ") class ='p-2 mx-2 border hover:border-red-500 hover:rounded border-b-red-500'>Eliminar</button>\n        </div>\n    </li>");
    });
}
function deleteTodo(id) {
    var newTodos = todos.splice(id, 1);
    save('todos', todos);
}
function detail(id) {
    var detail = document.querySelector('.detail_content');
    detail.style.display = 'flex';
    detail.innerHTML = "<div class=\"detail  m-auto bg-gray-100 rounded p-4 w-[95%] md:w-[32rem] z-20\">\n                        <div class='flex justify-between items-center'>\n                            <h2 class ='text-green-400'>Ver com mais Detalhes</h2>\n                            <button onclick = closeDetail() class=\"text-2xl text-red-400\">x</button>\n                        </div>\n                        <div class=\"body\">\n                            <h3 class=\"mb-2\">".concat(todos[id].nome, "</h3>\n                            <p class=\"italic text-xs mb-4\">Hora : ").concat(todos[id].data, "</p>\n                            <p>").concat(todos[id].desc, "</p>\n                        </div>\n                    </div>");
}
function editar(id) {
    var nome = document.getElementById('nome');
    var data = document.getElementsByClassName('hora')[0];
    var desc = document.getElementById('desc');
    var button = document.querySelector('#form button');
    button.innerHTML = 'Salvar';
    nome.value = todos[id].nome;
    data.value = todos[id].data;
    desc.value = todos[id].desc;
    idEdite = id;
}
function closeDetail() {
    var detail = document.querySelector('.detail_content');
    detail.style.display = 'none';
}

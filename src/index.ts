interface Todo {
    id : number;
    nome:string;
    data:string;
    desc?:string;
}

const todos : Todo[] = JSON.parse(localStorage.getItem('todos')) || [];
let idEdite:number = -1;

render( todos )
document.querySelector('#form').addEventListener( 'submit' , ( e:Event ) => {
    e.preventDefault();

    const button = document.querySelector('#form button') as HTMLButtonElement;
    
    if(button.innerHTML === 'Adicionar' ){
        takeData(false);
    }else {
        takeData(true);
    }
})

function takeData( isEditable : boolean ):void{
    const nome = document.getElementById('nome') as HTMLInputElement;
    const data = document.getElementsByClassName('hora')[0] as HTMLInputElement;
    const desc = document.getElementById('desc')as HTMLTextAreaElement;
    const button = document.querySelector('#form button') as HTMLButtonElement;

    if(idEdite ===-1){
        if( verify( nome.value )){
            nome.style.borderColor = 'gray';
    
            if( verify(data.value )){
                data.style.borderColor = 'gray'
    
                if( verify(desc.value)){
                    desc.style.borderColor='gray'
                    const todo:Todo ={
                        id : todos.length,
                        nome :nome.value,
                        data : data.value,
                        desc : desc.value
                    }
        
                    todos.push(todo);
                    nome.value='';
                    data.value = ''
                    desc.value =''
            
                    save( 'todos' , todos)
                }else desc.style.borderColor='red'
                
            }else {
                data.style.borderColor = 'red'
            }
        } else {
            nome.style.borderColor = 'red';
        }
    }else {
        if( verify( nome.value )){
            nome.style.borderColor = 'gray';
    
            if( verify(data.value )){
                data.style.borderColor = 'gray'
    
                if( verify(desc.value)){
                    desc.style.borderColor='gray'
                    todos[idEdite].nome = nome.value
                    todos[idEdite].data = data.value
                    todos[idEdite].desc = desc.value
                    nome.value='';
                    data.value = ''
                    desc.value =''
                    idEdite = -1;
            
                    save( 'todos' , todos)
                }else desc.style.borderColor='red'
                
            }else {
                data.style.borderColor = 'red'
            }
        } else {
            nome.style.borderColor = 'red';
        }
    }

    if(isEditable) button.innerHTML ='Adicionar'
}
function verify( value : string):boolean{
    return value.trim() !== '';
}

function save( key:string ,data:Todo[]):void{
    localStorage.setItem(key , JSON.stringify(data));
    render(data)
}

function render( data : Todo[]){
    const ul = <HTMLDListElement>document.getElementsByClassName('tarefas')[0];

    ul.innerHTML = '';
    data.map( ( todo , index) => {
        ul.innerHTML +=` <li class="relative flex justify-between items-center items-cente pl-8r mb-4 p-2 pl-8 bg-gray-200  w-full ">
        <span class="absolute -top-4 -left-2 bg-white shadow flex justify-center items-center w-[2rem] h-[2rem] rounded-full bg-gray-500">${index+1}</span>
        <p>${todo.nome}</p>
        <div class="flex flex-wrap">
        <button onclick = editar(${index}) class ='p-2 mx-2 border hover:border-green-500 hover:rounded border-b-green-500'>Editar</button>
        <button onclick = detail(${index}) class ='p-2 mx-2 border hover:border-green-500 hover:rounded border-b-green-500'>Ver Mais...</button>
        <button onclick = deleteTodo(${index}) class ='p-2 mx-2 border hover:border-red-500 hover:rounded border-b-red-500'>Eliminar</button>
        </div>
    </li>`
    })

}

function deleteTodo(id:number){
    const newTodos = todos.splice(id,1);
    
    save('todos' , todos);
}

function detail(id : number){
    const detail = <HTMLDivElement>document.querySelector('.detail_content');
    detail.style.display='flex';
    
    detail.innerHTML= `<div class="detail  m-auto bg-gray-100 rounded p-4 w-[95%] md:w-[32rem] z-20">
                        <div class='flex justify-between items-center'>
                            <h2 class ='text-green-400'>Ver com mais Detalhes</h2>
                            <button onclick = closeDetail() class="text-2xl text-red-400">x</button>
                        </div>
                        <div class="body">
                            <h3 class="mb-2">${todos[id].nome}</h3>
                            <p class="italic text-xs mb-4">Hora : ${todos[id].data}</p>
                            <p>${todos[id].desc}</p>
                        </div>
                    </div>`
}

function  editar( id : number){
    const nome = document.getElementById('nome') as HTMLInputElement;
    const data = document.getElementsByClassName('hora')[0] as HTMLInputElement;
    const desc = document.getElementById('desc')as HTMLTextAreaElement;
    const button = document.querySelector('#form button') as HTMLButtonElement;  

    button.innerHTML = 'Salvar';
    nome.value = todos[id].nome 
    data.value = todos[id].data
    desc.value = todos[id].desc;

    idEdite = id;
}

function closeDetail(){
    const detail = <HTMLDivElement>document.querySelector('.detail_content');
    detail.style.display = 'none';
}
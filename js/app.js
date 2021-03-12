
//Selecionando os Elementos
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")

// Classe Nomes
const CHECK = "fa-check-circle";
const UNCHECK ="fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variaveis (Feito / Não Feito)
let LIST =[]
        , id=0;

// Mostrando a data do dia
const options = {weekday: "long", day:"numeric", month:"short", year: "numeric"};
const today = new Date();
const locale = 'pt-br'

dateElement.innerHTML = today.toLocaleDateString('pt-br', options);

// Função da Lista de Tarefas

function addToDo(toDo, id, done, trash){
    
    if(trash){ return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
                    <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                    
                    ` ;
    const positon = "beforeend";

    list.insertAdjacentHTML(positon, item);
}
//addToDo(" Escovar ");

// Adicionando item na lista usando o Enter

document.addEventListener("keyup", function(even){
    if(event.keyCode ==13){
        const toDo = input.value;
        
        // Se o inserir não tiver vazio
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            id++

        }
        input.value = "";
    }

});

//addToDo("Acordar", 1 , true, false);

// Tarefa Completa
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Remover tarefa
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;

}

// Direcinar itens criados Dinamicamente

list.addEventListener("click", function(event){
    const element = event.target; // retorna elemtno clicado na lista
    const elementJob = element.attributes.job.value; // completa ou deletar
    if (elementJob == "complete"){
        completeToDo(element);

    }else if(elementJob == "delete"){
        removeToDo(element);

    }

});
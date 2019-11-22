$(document).ready(onReady);

function onReady(){
    getTasks();
    $(`#add-task-btn`).on(`click`, addTask);
}

function addTask(){
    let objectToSend = {
        task: $(`#task-in`).val()
    }
    $.ajax({
        method: `POST`,
        url: `/task`,
        data: objectToSend
    }).then(function(response){
        getTasks();
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}

function getTasks(){
    $.ajax({
        method: `GET`,
        url: `/task`
    }).then(function(response){
        console.log('in /task GET', response);
        renderTask(response);
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}

function renderTask(tasks){
    $(`#task-out`).empty();
    for(let i=0; i<tasks.length; i++) {
        let task = tasks[i]
        let $tr = $(`<tr></tr>`);
        $tr.data(`task`, task);
        $tr.append(`<td>${task.task}</td>`);
        $tr.append(`<td>${task.completed}</td>`);
        $tr.append(`<td><button class="completed">Completed?</button></td>`);
        $tr.append(`<td><button class="delete">Remove</button></td>`);
        $('#task-out').append($tr);
        $tr.data(`id`, task.id);
    }
}
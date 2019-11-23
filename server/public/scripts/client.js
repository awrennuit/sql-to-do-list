$(document).ready(onReady);

function onReady(){
    getTasks();
    $(`#add-task-btn`).on(`click`, addTask);
    $(`#task-out`).on(`click`, `.completed`, updateTask);
    $(`#task-out`).on(`click`, `.delete`, removeTask);

    $(`#task-out`).on(`click`, `.completed`, function(){
        let selected = $(this).closest(`tr`).hasClass(`highlight`);
        $(`#task-out`).removeClass(`highlight`);
        if(!selected){
            $(this).closest(`tr`).addClass(`highlight`);
        }
    });
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
        // sortTasks();
        renderTask(response);
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}

function removeTask(){
    let id = $(this).closest(`tr`).data(`id`);
    $.ajax({
        method: `DELETE`,
        url: `/task/${id}`
    }).then(function(response){
        console.log('in /task DELETE');
        getTasks();
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
        console.log('task.completed.textContent', task.completed);
        $tr.data(`task`, task);
        $tr.append(`<td>${task.task}</td>`);
        $tr.append(`<td>${task.completed}</td>`);
        if(task.completed === `Y`){
            console.log('in loop');
            $tr.addClass(`active`);
        }
        $tr.append(`<td><button class="completed">Completed?</button></td>`);
        $tr.append(`<td><button class="delete">Remove</button></td>`);
        $('#task-out').append($tr);
        $tr.data(`id`, task.id);
    }
    $(`#task-in`).val(``);
}

// function sortTasks(){
//     $.ajax({
//         method: `PUT`,
//         url: `/task`
//     }).then(function(response){
//         console.log('in /task PUT sort table');
//     }).catch(function(error){
//     alert(`something went wrong`);
//     console.log(error)
//     });
// }

function updateTask(){
    let id = $(this).closest(`tr`).data(`id`);
    $.ajax({
        method: `PUT`,
        url: `/task/${id}`
    }).then(function(response){
        getTasks();
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}
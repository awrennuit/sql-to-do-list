$(document).ready(onReady);

function onReady(){
    getTasks();
    $(`#add-task-btn`).on(`click`, addTask);
    $(`#task-out`).on(`click`, `.completed`, updateTask);
    $(`#task-out`).on(`click`, `.delete`, removeTask);
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
        renderTask(response);
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}

function removeTask(){
    let id = $(this).closest(`tr`).data(`id`);
    let popup = confirm(`Are you sure you want to delete this task?`)
    if(popup == true){
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
    else{    }
}

function renderTask(tasks){
    $(`#task-out`).empty();
    for(let i=0; i<tasks.length; i++) {
        let task = tasks[i]
        let $tr = $(`<tr></tr>`);
        $tr.data(`task`, task);
        $tr.append(`<td>${task.task}</td>`);
        $tr.append(`<td>${task.completed}</td>`);
        if(task.completed === `Y`){
            $tr.addClass(`done`);
        }
        if(task.completed === `N`){
            $tr.append(`<td><button class="completed">Completed?</button></td>`);
        }
        else{
            $tr.append(`<td><button class="completed">Undo?</button></td>`);
        }
        $tr.append(`<td><button class="delete">Remove</button></td>`);
        $('#task-out').append($tr);
        $tr.data(`id`, task.id);
    }
    $(`#task-in`).val(``);
}

function updateTask(){
    let id = $(this).closest(`tr`).data(`id`);
    let toggle = {
        toggle: $(this).text()
    }
    $.ajax({
        method: `PUT`,
        url: `/task/${id}`,
        data: toggle
    }).then(function(response){
        getTasks();
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}
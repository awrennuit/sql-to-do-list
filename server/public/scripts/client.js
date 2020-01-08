$(function(){
    getTasks();
    $(`#add-task-btn`).on(`click`, addTask);
    $(`#task-out`).on(`click`, `.completed`, updateTask);
    $(`#task-out`).on(`click`, `.delete`, removeTask);
});

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
    alert(`error adding task`);
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
    alert(`error grabbing task list`);
    console.log(error)
    });
}

function removeTask(){
    let task = $(this).closest(`tr`).data(`task`);
    let popup = confirm(`Are you sure you want to delete ${task.task}?`)
    
    if(popup == true){
        $.ajax({
            method: `DELETE`,
            url: `/task/${task.id}`
        }).then(function(response){
            getTasks();
        }).catch(function(error){
        alert(`error removing task`);
        console.log(error);
        });
    }
}

function renderTask(tasks){
    $(`#task-out`).empty();

    for(let task of tasks) {
        let $tr = $(`<tr></tr>`);

        $tr.data(`task`, task);
        $tr.append(`<td>${task.task}</td>`);
        $tr.append(`<td>${task.completed}</td>`);

        task.completed ? 
            ($tr.addClass(`done`),
            $tr.append(`<td><button class="completed">Undo?</button></td>`))
            : 
            $tr.append(`<td><button class="completed">Finished?</button></td>`);

        $tr.append(`<td><button class="delete">Remove</button></td>`);
        $('#task-out').append($tr);
    }
    $(`#task-in`).val(``);
}

function updateTask(){
    let task = $(this).closest(`tr`).data(`task`);
    let toggle = {toggle: $(this).text()}
    $.ajax({
        method: `PUT`,
        url: `/task/${task.id}`,
        data: toggle
    }).then(function(response){
        getTasks();
    }).catch(function(error){
    alert(`error updating task`);
    console.log(error)
    });
}
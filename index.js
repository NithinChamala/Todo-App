var xhr = new XMLHttpRequest();


insertData = () => {
    "use strict";
    const date = new Date();

    const timestamp = date.getTime();
    const x = document.getElementById('myForm').elements.namedItem('fname').value;
    if (!allLetter(x)) {
        alert('only alphabetical characters !!');
        return;
    }
    xhr.onload =function() {
        if(this.readyState == XMLHttpRequest.DONE && this.status ==200) {
        }
    }
    status ="todo";
    xhr.open("post", "http://localhost:3000/tasks",true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("task=" + x + "&timestamp=" + timestamp + "&status=" + status);

    printData1('todo');
};

allLetter = (inputtxt) => {
    const letters = /^[A-Za-z ]+$/;
    if (inputtxt.match(letters)) {
        return true;
    }
    return false;
};
getData = i => localStorage.getItem(localStorage.key(i));

printData1 = (flag) => {
    var promise1 = new Promise(function(resolve, reject) {
        xhr.onload =function() {
            if (this.readyState == 4 && this.status == 200) {
                tasks = JSON.parse(xhr.responseText);
                resolve(tasks);
            }
        }

        xhr.open("get", "http://localhost:3000/tasks",false);
        xhr.send();



    });
    promise1.then(function(tasks) {
        let data = "<div class ='flex-container' >";
        if (flag === 'todo') {
            document.getElementById('title').innerHTML = flag;
            document.getElementById('description').innerHTML = '<i>......  Here you add the taskname that you need to complete .....</i>';
        }
        if (flag === 'inprogress') {
            document.getElementById('title').innerHTML = flag;
            document.getElementById('description').innerHTML = '<i>......the following tabs indicates the  tasks in progress .....</i>';
        }

        if (flag === 'done') {
            document.getElementById('title').innerHTML = flag;
            document.getElementById('description').innerHTML = '<i>......these are the tasks that were accomplished .....</i>';
        }

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].status === flag) {
                data += `<div class ="altcolor" ><span class="a">${tasks[i].id}</span><div class="textBox"><span class="c">`;
                data += `${tasks[i].task}</span></div><span class="d">`;
                data += '<input style="color:black ;" type ="button" value="X" onclick ="someDeleteRowFunction(this)"></span><br>';
                if (flag === 'todo') {
                    data += '<input type="checkbox" id="check1"   checked disabled > <span class="b">Todo</span>';
                } else {
                    data += '<input type="checkbox" id="check1"  onclick="update_task(this,1)" > <span class="b">Todo</span>';
                }
                if (flag === 'inprogress') {
                    data += '<input type="checkbox" id="check2"   checked disabled> <span class="b">Pending</span>';
                } else {
                    data += '<input type="checkbox" id="check2"  onclick="update_task(this,2)"> <span class="b">Pending</span>';
                }
                if (flag === 'done') {
                    data += '<input type="checkbox" id="check3"   checked disabled><span class="b"> Done </span>';
                } else {
                    data += '<input type="checkbox" id="check3"  onclick="update_task(this,3)"><span class="b"> Done </span>';
                }
                data += '</div>';
            }
        }
        data += '</div>';
        document.getElementById('printing').innerHTML = data;

    });
}
update_task =(obj,flag) => {
    const parent_node = obj.parentNode;
    const class_array = parent_node.getElementsByClassName('a');
    const key = class_array[0].innerHTML;
    var promise = new Promise(function(resolve,reject){
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                const task = JSON.parse(xhr.responseText);
                if (flag == 1) {
                    task.status = "todo";
                } else if (flag == 2) {
                    task.status = "inprogress";

                } else {
                    task.status = "done";
                }
                resolve(task,flag);
            }
        }

        url = "http://localhost:3000/tasks/" + key;
        xhr.open("get", url, false);
        xhr.send();


    })
    //delete task
    promise.then(function(data,flag) {
        xhr.onload =function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status ==200) {
                return data;
            }
        }
        let url= "http://localhost:3000/tasks/";
        xhr.open("delete", url+data.id ,false);
        xhr.send(null);

    })
    // updata data
    promise.then(function(data,flag){
        xhr.onload =function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status ==200) {
                console.log("update done successfully");
                resolve(flag);
            }
        }

        xhr.open("post", "http://localhost:3000/tasks",false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("task=" +data.task+ "&timestamp=" + data.timestamp + "&status=" + data.status);

    })
    promise.finally(function(task,flag){
        console.log(flag);
        console.log(task);
        printData1('todo');
    })


};
const header = document.getElementById('myDIV');
const btns = header.getElementsByClassName('btn');
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
        const current = document.getElementsByClassName('active');
        if (current.length > 0) {
            current[0].className = current[0].className.replace(' active', '');
        }
        this.className += ' active';
    });
}
someDeleteRowFunction = (taskToBeDeleted) => {
    const row = taskToBeDeleted.parentNode.parentNode;
    const node = row.childNodes[0].childNodes[0].nodeValue;
    let promise = new Promise(function(resolve,reject) {
        xhr.onload =function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status ==200) {
                resolve("done");
            }
        }
        url= "http://localhost:3000/tasks/";
        xhr.open("delete", url+node ,false);
        xhr.send(null);

    })
    promise.then(function(value) {
        printData1('todo');
    })
};

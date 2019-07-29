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
        if(this.readyState === XMLHttpRequest.DONE && this.status ===200) {
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
                // const task = JSON.parse(xhr.responseText);
                console.log("carem board");
                if (flag == 1) {
                    printData1("todo");
                } else if (flag == 2) {
                    printData1("inprogress");

                } else {
                    printData1("done");
                }
            }
        }
        let stat ='';
        if (flag == 1) {
            stat = "todo";
        } else if (flag == 2) {
            stat = "inprogress";
        } else {
            stat = "done";
        }
        console.log(stat);
        let url = "http://localhost:3000/tasks/" + key;
        xhr.open("PATCH", url, false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`status=${stat}`);
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
    const temp =row.childNodes[1].childNodes[0].childNodes[0].nodeValue;
    console.log(temp);
    let promise = new Promise(function(resolve,reject) {
        xhr.onload =function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status ==200) {
                // resolve(node);
                printData1("todo");
                // document.location.reload();
            }
        }
        url= "http://localhost:3000/tasks/";
        xhr.open("delete", url+node ,false);
        xhr.send(null);

    })
};

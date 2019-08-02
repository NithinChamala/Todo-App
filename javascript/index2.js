const xhr = new XMLHttpRequest();

// function getAllData(flag) {
//     return new Promise(function(resolve, reject) {
//         xhr.onload =function() {
//             if (this.readyState === 4 && this.status === 200) {
//                 tasks = JSON.parse(xhr.responseText);
//                 resolve(tasks);
//             }
//         }
//         xhr.open("get", `http://localhost:3000/tasks?status=${flag}`,false);
//         xhr.send();
//     });
// }
//
// deleteAllData = flag => {
//
//      let promise = getAllData(flag);
//      promise.then(function (tasks) {
//          tasks.forEach( (item) => {
//              deleteEach(item);
//          });
//      })
//
// }
// deleteEach = (item) => {
//     xhr.onload =function() {
//         if(this.readyState === XMLHttpRequest.DONE && this.status ===200) {
//             // printData1(stat);
//             printData1('todo');
//         }
//     }
//     url= "http://localhost:3000/tasks/";
//     xhr.open("delete", url+item.id ,false);
//     xhr.send(null);
//
// }


// Getting all the tasks based on flag ( todo, inprogress or done)
function getAllData1(flag) {
    return new Promise(((resolve, reject) => {
        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                const tasks = JSON.parse(xhr.responseText);
                resolve(tasks);
            }
        };
        xhr.open('get', `http://localhost:3000/tasks?status=${flag}`, false);
        xhr.send();
    }));
}


//Deleting all tasks based on flag(todo, inprogress or done)
deleteAllData1 = (flag) => {
    const promise = getAllData1(flag);
    promise.then((tasks) => {
        const arr = [];
        arr.push(tasks);
        arr.push(tasks.length);
        arr.push(flag);
        return (arr);
    }).then((arr) => {
        //
        // console.log(arr[0]);
        // console.log(arr[1]);
        // let i=0;

        // let prom =new Promise(function(resolve,reject) {
        //     resolve(arr);
        // });
        // for (i =0;i<arr[1];i++) {
        //     console.log(arr[0][i].id);
        //     console.log("donneee");
        //
        //     prom = prom.then((arr) =>
        //     {
        //         xhr.onload =function() {
        //             if(this.readyState === XMLHttpRequest.DONE && this.status ===200) {
        //                 let arr1 =[];
        //                 arr1.push(arr[0]);
        //                 arr1.push(arr[1]);
        //                 return arr1;
        //             }
        //         }
        //         let url= "http://localhost:3000/tasks/";
        //         xhr.open("delete", url+arr[0][0].id ,false);
        //         xhr.send();
        //     })
        //
        //
        //    }


        // promises looping to delete all data
        for (let i = 0, p = Promise.resolve(); i < arr[1] + 1; i++) {
            if (i === arr[1]) {
                setTimeout(() => { printData1(arr[2]); });
                // console.log(arr[2]);
                // printData1(arr[2]);
                break;
            }
            p = p.then(() => new Promise((resolve) => {
                xhr.onload = function () {
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                        resolve('todo');
                    }
                };
                const url = 'http://localhost:3000/tasks/';
                xhr.open('delete', url + arr[0][i].id, false);
                xhr.send();
            }));
            // if(i ===arr[1]-1) {
            //     console.log('todo care free');
            //     console.log(arr[2]);
            //     printData1(arr[2]);
            // }
        }
        // return arr[2];


        // p.then((flag) => {
        // console.log("flag",flag);
        // printData1(flag);
    });


    // })
    //  promise.then(function (tasks) {
    //      console.log("hereeeee")
    //      console.log(tasks);
    //      return tasks.length;
    //
    // }).then((len) => {
    //     console.log(len);
    //     return len;
    //
    //  }).then ((len) => {
    //      let proms = new Promise(function(resolve,reject) {
    //          resolve();
    //      } )
    //
    //      console.log(len+"if comes happy");
    //      for(let i =0 ;i<len ;i++) {
    //          proms =proms.then(function(resolve,reject) {
    //
    //      }
    // printData1('todo');
};


//To insert task by default all tasks have status type "todo" using fetch
insertData = () => {
    const date = new Date();

    const timestamp = date.getTime();
    const x = document.getElementById('myForm').elements.namedItem('fname').value;
    if (!allLetter(x)) {
        alert('only alphabetical characters !!');
        return;
    }
    // fetch("http://localhost:3000/tasks",{
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({task: x, timestamp: timestamp, status: 'todo'})
    // }).then(() => {
    //     printData1('todo');
    // }).catch(() => {
    //     console.log("Insert Failed with status code" + status);
    // });

    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ task: x, timestamp, status: 'todo' }),
    }).then(() => {
        printData1('todo');
    }).catch((error) => {
        console.log(error);
    });
};
// const insertJson = (data) => {
//
// };


//validating for only valid names

allLetter = (inputtxt) => {
    const letters = /^[A-Za-z ]+$/;
    if (inputtxt.match(letters)) {
        return true;
    }
    return false;
};
// getData = i => localStorage.getItem(localStorage.key(i));
// chaining to be implemented

// to print the data
printData1 = (flag) => {
    fetch('http://localhost:3000/tasks').then(data => (data.json())).then((tasks) => {
        let data = "<div class ='flex-container' >";
        if (flag === 'todo') {
            document.getElementById('title').innerHTML = flag;
            document.getElementById('description').innerHTML = '<i>......  Here you add the taskname that you need to complete .....</i>';
            document.getElementById("todo_active").style.backgroundColor ="#C0C0C0";
            document.getElementById("inprogress_active").style.backgroundColor ="black";
            document.getElementById("done_active").style.backgroundColor ="black";
        }

        if (flag === 'inprogress') {
            document.getElementById('title').innerHTML = flag;
            document.getElementById('description').innerHTML = '<i>......the following tabs indicates the  tasks in progress .....</i>';
            document.getElementById("inprogress_active").style.backgroundColor ="#C0C0C0";
            document.getElementById("todo_active").style.backgroundColor ="black";
            document.getElementById("done_active").style.backgroundColor ="black";
        }

        if (flag === 'done') {
            document.getElementById('title').innerHTML = flag;
            document.getElementById('description').innerHTML = '<i>......these are the tasks that were accomplished .....</i>';
            document.getElementById("done_active").style.backgroundColor ="#C0C0C0";

            document.getElementById("inprogress_active").style.backgroundColor ="black";
            document.getElementById("todo_active").style.backgroundColor ="black";
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
    // var promise1 = new Promise(function(resolve, reject) {
    //     xhr.onload =function() {
    //         if (this.readyState === 4 && this.status === 200) {
    //             tasks = JSON.parse(xhr.responseText);
    //             resolve(tasks);
    //         }
    //     }
    //
    //     xhr.open("get", "http://localhost:3000/tasks",false);
    //     xhr.send();
    // });
    // promise1.then(function(tasks) {
};
// let data = "<div class ='flex-container' >";
// if (flag === 'todo') {
//     document.getElementById('title').innerHTML = flag;
//     document.getElementById('description').innerHTML = '<i>......  Here you add the taskname that you need to complete .....</i>';
// }
// if (flag === 'inprogress') {
//     document.getElementById('title').innerHTML = flag;
//     document.getElementById('description').innerHTML = '<i>......the following tabs indicates the  tasks in progress .....</i>';
// }
//
// if (flag === 'done') {
//     document.getElementById('title').innerHTML = flag;
//     document.getElementById('description').innerHTML = '<i>......these are the tasks that were accomplished .....</i>';
// }
//
// for (let i = 0; i < tasks.length; i++) {
//     if (tasks[i].status === flag) {
//         data += `<div class ="altcolor" ><span class="a">${tasks[i].id}</span><div class="textBox"><span class="c">`;
//         data += `${tasks[i].task}</span></div><span class="d">`;
//         data += '<input style="color:black ;" type ="button" value="X" onclick ="someDeleteRowFunction(this)"></span><br>';
//         if (flag === 'todo') {
//             data += '<input type="checkbox" id="check1"   checked disabled > <span class="b">Todo</span>';
//         } else {
//             data += '<input type="checkbox" id="check1"  onclick="update_task(this,1)" > <span class="b">Todo</span>';
//         }
//         if (flag === 'inprogress') {
//             data += '<input type="checkbox" id="check2"   checked disabled> <span class="b">Pending</span>';
//         } else {
//             data += '<input type="checkbox" id="check2"  onclick="update_task(this,2)"> <span class="b">Pending</span>';
//         }
//         if (flag === 'done') {
//             data += '<input type="checkbox" id="check3"   checked disabled><span class="b"> Done </span>';
//         } else {
//             data += '<input type="checkbox" id="check3"  onclick="update_task(this,3)"><span class="b"> Done </span>';
//         }
//         data += '</div>';
//     }
// }
// data += '</div>';
// document.getElementById('printing').innerHTML = data;

// });
// }


//Updating the task
update_task = (obj, flag) => {
    const parent_node = obj.parentNode;
    const class_array = parent_node.getElementsByClassName('a');
    const key = class_array[0].innerHTML;

    let stat = '';
    if (flag === 1) {
        stat = 'todo';
    } else if (flag === 2) {
        stat = 'inprogress';
    } else {
        stat = 'done';
    }

    fetch(`http://localhost:3000/tasks/${key}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: stat }),
    }).then(() => {
        if (flag === 1) {
            printData1('todo');
        } else if (flag === 2) {
            printData1('inprogress');
        } else {
            printData1('done');
        }
        // printData1(flag);
    }).catch(() => {
        // eslint-disable-next-line no-undef
        console.log('Insert Failed with status code');
    });
    // var promise = new Promise(function(resolve,reject){
    //     xhr.onload = function () {
    //         if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    //             // const task = JSON.parse(xhr.responseText);
    //             console.log("carem board");
    //             if (flag == 1) {
    //                 printData1("todo");
    //             } else if (flag == 2) {
    //                 printData1("inprogress");
    //
    //             } else {
    //                 printData1("done");
    //             }
    //         }
    //     }
    //     let stat ='';
    //     if (flag == 1) {
    //         stat = "todo";
    //     } else if (flag == 2) {
    //         stat = "inprogress";
    //     } else {
    //         stat = "done";
    //     }
    //     console.log(stat);
    //     let url = "http://localhost:3000/tasks/" + key;
    //     xhr.open("PATCH", url, false);
    //     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //     xhr.send(`status=${stat}`);
    // })
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

// To delete the task
someDeleteRowFunction = (taskToBeDeleted) => {
    const row = taskToBeDeleted.parentNode.parentNode;
    const node = row.childNodes[0].childNodes[0].nodeValue;
    // const temp =row.childNodes[1].childNodes[0].childNodes[0].nodeValue;
    fetch(`http://localhost:3000/tasks/${node}`)
        .then(data => (data.json())).then((task) => {
        const stat = task.status;
        fetch(`http://localhost:3000/tasks/${node}`, {
            method: 'delete',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({})
        }).then(() => {
            printData1(stat);
        }).catch(() => {
            console.log('delete Failed with status code');
        });
    });
    // let promise1 = new Promise(function(resolve, reject) {
    //     xhr.onload =function() {
    //         if (this.readyState === 4 && this.status === 200) {
    //             let task = JSON.parse(xhr.responseText);
    //             resolve(task);
    //         }
    //     }
    //
    //     xhr.open("get", "http://localhost:3000/tasks/"+node,false);
    //     xhr.send();
    // });
    //
    //  promise1.then(function(task) {
    //      let stat = task.status ;
    //     xhr.onload =function() {
    //         if(this.readyState == XMLHttpRequest.DONE && this.status ==200) {
    //             printData1(stat);
    //         }
    //     }
    //     url= "http://localhost:3000/tasks/";
    //     xhr.open("delete", url+task.id ,false);
    //     xhr.send(null);
    //
    // })
};

const xhr = new XMLHttpRequest();

$(document).ready(function(){

// Insert task into db.json using fetch
    $("#insertId").click(function() {

        const date = new Date();

        const timestamp = date.getTime();

       let x= $("#taskvalue").val();

        fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({ task: x, timestamp, status: "todo" }),
        }).then(() => {
            window.printData1("todo");
        }).catch((error) => {
            console.log(error);
        });
    })
});

window.create_Text_Element = (id,task) => {
    let div = $("<div>");
    div.addClass("altcolor");
    let spana = $("<span>");
    spana.text(id);
    spana.addClass("a");
    $(div).append(spana);
    let div1 = $("<div>");
    div1.addClass("textBox");
    let spanc = $("<span>");
    spanc.addClass("c");
    spanc.text(task);
    div1.append(spanc);
    div.append(div1);
    let spand = $("<span>");
    spand.addClass("d");
    let btn = $("<button>");
    btn.addClass("closebtn");
    btn.text("X");
    spand.append(btn);
    div.append(spand);
    return div;
};
window.create_checkbox1 = (flag,div) => {
    let input = $("<input>");
    input.addClass("checked");
    input.attr("type","checkbox");
    input.attr("checked","true");
    input.attr("disabled","true");
    let spanb = $("<span>");
    spanb.addClass("b");
    spanb.text(flag);
    div.append(input);
    div.append(spanb);
    return div;

};
window.create_checkbox2 = (flag, div) => {
    let input = $("<input>");
    if(flag === "inprogress") {
        input.addClass("update_task2");

    }
    if(flag === "Todo") {
        input.addClass("update_task1");
    }
    if (flag === "Done") {
        input.addClass("update_task3");
    }
    input.attr("type","checkbox");
    let spanb = $("<span>");
    spanb.addClass("b");
    spanb.text(flag);
    div.append(input);
    div.append(spanb);
    return div;
};
// Printing data based on the selected flag say todo or inprogress or done
window.printData1 = (flag) => {
    fetch("http://localhost:3000/tasks").then(data => (data.json())).then((tasks) => {
        // let data = "<div class ='flex-container'>";
        let data = $("<div>");
        // data.addClass('flex-container');
        data.attr("class","flex-container");
        if (flag === "todo") {
            $("#title").html(flag);
            $("#description").html("<i>......  Here you add the taskname that you need to complete .....</i>");
        }
        if (flag === "inprogress") {
            $("#title").html(flag);
            $("#description").html("<i>......the following tabs indicates the  tasks in progress .....</i>");
        }
        if (flag === "done") {
            $("#title").html(flag);
            $("#description").html("<i>......these are the tasks that were accomplished .....</i>");
        }
        for (let i = 0; i < tasks.length; i++) {
            //creating task by DOM
            if (tasks[i].status === flag) {
                let div = create_Text_Element(tasks[i].id,tasks[i].task);
                (data).append(div);
                // data += `<div class ="altcolor" ><span class="a">${tasks[i].id}</span><div class="textBox"><span class="c">`;
                // data += `${tasks[i].task}</span></div><span class="d">`;
                // data += '<button style="color:black ;" class="closebtn" type ="button" > X </button></span><br>';
                if (flag === "todo") {
                    div =window.create_checkbox1("Todo",div);
                } else {
                    div = window.create_checkbox2("Todo",div);

                }
                if (flag === "inprogress") {

                    div =window.create_checkbox1("inprogress",div);
                } else {
                    div = window.create_checkbox2("inprogress",div);
                }
                if (flag === "done") {
                    div =window.create_checkbox1("Done",div);
                } else {
                    div = window.create_checkbox2("Done",div);
                }
                data.append(div);

            }
        }

        $("#printing").html(data);

        $(".update_task1").click(function() {
            const parent_node = this.parentNode;
            const class_array = parent_node.getElementsByClassName('a');
            const key = class_array[0].innerHTML;

            let stat = 'todo';
            fetch(`http://localhost:3000/tasks/${key}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({status: stat}),
            }).then(() => {
                window.printData1(stat);
            }).catch(() => {
                console.log('Insert Failed with status code');
            });
        });

        $(".update_task2").click(function() {
            const parent_node = this.parentNode;
            const class_array = parent_node.getElementsByClassName('a');
            const key = class_array[0].innerHTML;

            let stat = 'inprogress';
            fetch(`http://localhost:3000/tasks/${key}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({status: stat}),
            }).then(() => {
                window.printData1(stat);
            }).catch(() => {
                console.log('Insert Failed with status code');
            });
        });

        $(".update_task3").click(function() {
            const parent_node = this.parentNode;
            const class_array = parent_node.getElementsByClassName('a');
            const key = class_array[0].innerHTML;

            let stat = 'done';
            fetch(`http://localhost:3000/tasks/${key}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({status: stat}),
            }).then(() => {
                window.printData1(stat);
            }).catch(() => {
                console.log('Insert Failed with status code');
            });
        });

        const btns = document.getElementsByClassName('closebtn');
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function () {
                const row = this.parentNode.parentNode;
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
                    }).then(() => {
                        printData1(stat);
                    }).catch(() => {
                        console.log('delete Failed with status code');
                    });
                });

            });
        }
        // document.getElementById('printing').innerHTML = data;
    }).catch((error) => {
        console.log(error);
    });


};
// window.printData1 = (flag) => {
//     fetch('http://localhost:3000/tasks').then(data => (data.json())).then((tasks) => {
//         let data = "<div class ='flex-container'>";
//         if (flag === 'todo') {
//             $('#title').html(flag);
//             $('#description').html('<i>......  Here you add the taskname that you need to complete .....</i>');
//         }
//         if (flag === 'inprogress') {
//             $('#title').html(flag);
//             $('#description').html('<i>......the following tabs indicates the  tasks in progress .....</i>');
//         }
//
//         if (flag === 'done') {
//             $('#title').html(flag);
//             $('#description').html('<i>......these are the tasks that were accomplished .....</i>');
//         }
//         for (let i = 0; i < tasks.length; i++) {
//             if (tasks[i].status === flag) {
//                 data += `<div class ="altcolor" ><span class="a">${tasks[i].id}</span><div class="textBox"><span class="c">`;
//                 data += `${tasks[i].task}</span></div><span class="d">`;
//                 data += '<button style="color:black ;" class="closebtn" type ="button" > X </button></span><br>';
//                 if (flag === 'todo') {
//                     data += '<input type="checkbox" id="check1"   checked disabled > <span class="b">Todo</span>';
//                 } else {
//                     data += '<input type="checkbox" id="check1" class="update_task1"> <span class="b">Todo</span>';
//                 }
//                 if (flag === 'inprogress') {
//                     data += '<input type="checkbox" id="check2"   checked disabled> <span class="b">Pending</span>';
//                 } else {
//                     data += '<input type="checkbox" id="check2" class="update_task2" > <span class="b">Pending</span>';
//                 }
//                 if (flag === 'done') {
//                     data += '<input type="checkbox" id="check3"   checked disabled><span class="b"> Done </span>';
//                 } else {
//                     data += '<input type="checkbox" id="check3" class="update_task3" ><span class="b"> Done </span>';
//                 }
//                 data += '</div>';
//             }
//         }
//         data += '</div>';
//         document.getElementById('printing').innerHTML = data;
//         $(".update_task1").click(function() {
//             const parent_node = this.parentNode;
//             const class_array = parent_node.getElementsByClassName('a');
//             const key = class_array[0].innerHTML;
//
//             let stat = 'todo';
//             fetch(`http://localhost:3000/tasks/${key}`, {
//                 method: 'PATCH',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({status: stat}),
//             }).then(() => {
//                window.printData1(stat);
//             }).catch(() => {
//                 console.log('Insert Failed with status code');
//             });
//         });
//         $(".update_task2").click(function() {
//             const parent_node = this.parentNode;
//             const class_array = parent_node.getElementsByClassName('a');
//             const key = class_array[0].innerHTML;
//
//             let stat = 'inprogress';
//             fetch(`http://localhost:3000/tasks/${key}`, {
//                 method: 'PATCH',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({status: stat}),
//             }).then(() => {
//                 window.printData1(stat);
//             }).catch(() => {
//                 console.log('Insert Failed with status code');
//             });
//         });
//         $(".update_task3").click(function() {
//             const parent_node = this.parentNode;
//             const class_array = parent_node.getElementsByClassName('a');
//             const key = class_array[0].innerHTML;
//
//             let stat = 'done';
//             fetch(`http://localhost:3000/tasks/${key}`, {
//                 method: 'PATCH',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({status: stat}),
//             }).then(() => {
//                 window.printData1(stat);
//             }).catch(() => {
//                 console.log('Insert Failed with status code');
//             });
//         });
//         const btns = document.getElementsByClassName('closebtn');
//         for (let i = 0; i < btns.length; i++) {
//             btns[i].addEventListener('click', function () {
//                 const row = this.parentNode.parentNode;
//                 const node = row.childNodes[0].childNodes[0].nodeValue;
//                 // const temp =row.childNodes[1].childNodes[0].childNodes[0].nodeValue;
//                 fetch(`http://localhost:3000/tasks/${node}`)
//                     .then(data => (data.json())).then((task) => {
//                     const stat = task.status;
//                     fetch(`http://localhost:3000/tasks/${node}`, {
//                         method: 'delete',
//                         headers: {
//                             Accept: 'application/json',
//                             'Content-Type': 'application/json',
//                         },
//                     }).then(() => {
//                         printData1(stat);
//                     }).catch(() => {
//                         console.log('delete Failed with status code');
//                     });
//                 });
//
//             });
//         }
//     });
//
//
//    }
// window.update_task = (obj, flag) => {
//
//     const parent_node = obj.parentNode;
//     const class_array = parent_node.getElementsByClassName('a');
//     const key = class_array[0].innerHTML;
//
//     let stat = '';
//     if (flag === 1) {
//         stat = 'todo';
//     } else if (flag === 2) {
//         stat = 'inprogress';
//     } else {
//         stat = 'done';
//     }
//
//     fetch(`http://localhost:3000/tasks/${key}`, {
//         method: 'PATCH',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({status: stat}),
//     }).then(() => {
//         if (flag === 1) {
//             window.printData1('todo');
//         } else if (flag === 2) {
//             window.printData1('inprogress');
//         } else {
//             window.printData1('done');
//         }
//         // printData1(flag);
//     }).catch(() => {
//         // eslint-disable-next-line no-undef
//         console.log('Insert Failed with status code');
//     });
// }


//temporary



//
// $('.closebtn').click(function() {
//     alert(this);
//     alert("hey");
        // alert(this.val());
        // const row = taskToBeDeleted.parentNode.parentNode;
        // const node = row.childNodes[0].childNodes[0].nodeValue;
        // // const temp =row.childNodes[1].childNodes[0].childNodes[0].nodeValue;
        // fetch(`http://localhost:3000/tasks/${node}`)
        //     .then(data => (data.json())).then((task) => {
        //     const stat = task.status;
        //     fetch(`http://localhost:3000/tasks/${node}`, {
        //         method: 'delete',
        //         headers: {
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //         // body: JSON.stringify({})
        //     }).then(() => {
        //         printData1(stat);
        //     }).catch(() => {
        //         console.log('delete Failed with status code');
        //     });
        // });

// });

// someDeleteRowFunction = (taskToBeDeleted) => {
//     const row = taskToBeDeleted.parentNode.parentNode;
//     const node = row.childNodes[0].childNodes[0].nodeValue;
//     // const temp =row.childNodes[1].childNodes[0].childNodes[0].nodeValue;
//     fetch(`http://localhost:3000/tasks/${node}`)
//         .then(data => (data.json())).then((task) => {
//         const stat = task.status;
//         fetch(`http://localhost:3000/tasks/${node}`, {
//             method: 'delete',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             // body: JSON.stringify({})
//         }).then(() => {
//             printData1(stat);
//         }).catch(() => {
//             console.log('delete Failed with status code');
//         });
//     });
// }

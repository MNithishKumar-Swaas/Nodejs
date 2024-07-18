//Problem-4: To-do List
let tasks=[];
/* Logic Implementation Function */
function addTask(task) {
    /* Your Logic here*/
    tasks.push(task)
}


function displayTasks() {
    console.log("Today Activities List:");
    /* Write your logic here --- Start */
    tasks.forEach((element,index) => {      
       // console.log(task)
        console.log(`${index+1}.${element}`);
    });
    //console.log(tasks);
    // task.push("Buy groceries");
    // task.push("Clean the house");
    // task.push("Finish today homework");
    // task.push("Study for Annual Exam")
    // task.push("Go to Sleep")

    // console.log(task)

    /* Write your logic here --- End */
}
/* Logic Implementation Function */


/* Function Call */
/* Inputs */
addTask("Buy groceries");
addTask("Clean the house");
addTask("Finish today homework");
addTask("Study for Annual Exam");
addTask("Go to Sleep");
/* Inputs */

displayTasks();
/* Function Call */


/* Expected Output */
// Today Activities List:
// 1. Buy groceries
// 2. Clean the house
// 3. Finish today's homework
// 4. Study for Annual Exam
// 5. Go to Sleep
/* Expected Output */

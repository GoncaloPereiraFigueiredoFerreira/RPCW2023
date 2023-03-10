exports.todoPage = function(todos, completed, edit){
    let todoTR=""
    let completedTR=""
    for (let i in todos){
        if ( edit.includes(todos[i]["id"])){
            
            todoTR+=`
            <form action="http://localhost:7777/edit${todos[i]["id"]}" method="post" id="edit"></form>
            <tr class="w3-hover-light-blue" >
                <td> <input class="w3-input w3-round" type="datetime-local" name="deadline" form="edit" required/></td>
                <td> <input class="w3-input w3-round" type="text" name="task" form="edit" required/></td>
                <td> <input class="w3-input w3-round" type="text" name="worker" form="edit" required/></td>
                <td> <select class="w3-select" name="type"  form="edit" required>
                        <option value="" disabled selected>Choose your option</option>
                        <option value="Family">Family</option>
                        <option value="House">House</option>
                        <option value="Work">Work</option>
                        <option value="Friends">Friends</option>
                        <option value="Fun">Fun</option>
                        <option value="Other">Other</option>
            </select>  </td>
                <td>
                    <button type="submit" form="edit" class="w3-btn w3-teal w3-mb-2 w3-small">Confirm</button>
                </td>
            </tr>
            `
        }
        else{
        
        todoTR+=`
        <tr class="w3-hover-light-blue" >
            <td data-href="http://localhost:7777/complete${todos[i]["id"]}">${todos[i]["deadline"]}</td>
            <td data-href="http://localhost:7777/complete${todos[i]["id"]}">${todos[i]["task"]}</td>
            <td data-href="http://localhost:7777/complete${todos[i]["id"]}">${todos[i]["worker"]}</td>
            <td data-href="http://localhost:7777/complete${todos[i]["id"]}">${todos[i]["type"]}</td>
            <td>
            <form action="http://localhost:7777/edit${todos[i]["id"]}" method="post" id="myForm">
                <button type="submit" class="w3-btn w3-teal w3-mb-2 w3-small">Edit</button>
            </form>
            <form action="http://localhost:7777/removeTD${todos[i]["id"]}" method="post" id="myForm">
                <button type="submit" class="w3-btn w3-teal w3-mb-2 w3-small">Remove</button>
            </form>
            </td>
        </tr>
        `
        }
    }
    for (let i in completed){
        completedTR+=`
        <tr class="w3-hover-light-blue">
            <td>${completed[i]["deadline"]}</td>
            <td>${completed[i]["task"]}</td>
            <td>${completed[i]["worker"]}</td>
            <td>${completed[i]["type"]}</td>
            <td>${completed[i]["completion"]}</td>
            <td>
            <form action="http://localhost:7777/removeCM${completed[i]["id"]}" method="post" id="myForm">
                <button type="submit" class="w3-btn w3-teal w3-mb-2 w3-small">Remove</button>
            </form>
            </td>
        </tr>
        `
    }
    
    return `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title> To Do List</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> 
    </head>
    <body>
        <body class="w3-light-grey">
            <!-- Page Container -->
            <div class="w3-content w3-margin-top" style="max-width:1700px;">
                <!-- The Grid -->
                <div class="w3-row-padding">
                    <div class="w3-container w3-indigo">
                        <h1 class="w3-serif">TODO List</h1>
                    </div>
                    <div class="w3-container w3-light-blue w3-display-container w3-row">
                        <br></br>
                                <form  action="/add" class="w3-container" method="POST"  style="padding: 0px 30px;">
                                    <div class="w3-twothird"> 
                                    <fieldset style="border:none" >
                                        <legend style="font-size: 24px;">New Task</legend>
                                        <label>DeadLine</label>
                                        <input class="w3-input w3-round" type="datetime-local" name="deadline" required>
                                
                                        
                                        <label>Who should do it?</label>
                                        <input class="w3-input w3-round" type="text" name="worker" required>
                                
                                        
                                        <label>What should be done?</label>
                                        <input class="w3-input w3-round" type="text" name="task" required>

                                        
                                        <label>What's the type of the task?</label>
                                        
                                        <select class="w3-select" name="type" required>
                                            <option value="" disabled selected>Choose your option</option>
                                            <option value="Family">Family</option>
                                            <option value="House">House</option>
                                            <option value="Work">Work</option>
                                            <option value="Friends">Friends</option>
                                            <option value="Fun">Fun</option>
                                            <option value="Other">Other</option>
                                        </select> 

                                </fieldset>
                                </div>
                                    <div class="w3-display-bottomright w3-margin-bottom w3-margin-right">
                                        <button class="w3-btn w3-teal w3-mb-2" style="font-size: 24px; padding: 12px 24px;" onClick="window.location.reload();" type="submit">Add task</button>
                                    </div>      
                                </form>
                                <br></br>
                </div>
                    
                    <div class="w3-cell-row">
                        <div class="w3-container w3-red w3-cell w3-responsive w3-half w3-margin-bottom w3-text-black" style="padding: 0px 30px;">
                            <h3>Tasks </h3>
                           
                            <table border=1 class="w3-table w3-blue-gray w3-centered w3-hoverable">                
                                <tr class="w3-teal" >
                                <th>DeadLine</th>
                                <th>Task</th>
                                <th>Tasker</th>
                                <th>Type</th>
                                <th></th>
                                </tr>
                                ${todoTR}
                            </table>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                        </div>
                        
                        <div class="w3-container w3-green w3-cell w3-responsive w3-margin-bottom w3-half w3-text-black" style="padding: 0px 30px;">
                            <h3>Tasks Completed </h3>
                                <table border=1 class="w3-table w3-blue-gray w3-centered w3-hoverable">                
                                    <tr class="w3-teal">
                                        <th>DeadLine</th>
                                        <th>Task</th>
                                        <th>Tasker</th>
                                        <th>Type</th>
                                        <th>Completed</th>
                                        <th></th>
                                        </tr>
                                        ${completedTR}
                                </table>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                        </div>
                    </div>
                </div>
            </div>
            <script>
            document.addEventListener("DOMContentLoaded", ()=>{
                const rows = document.querySelectorAll("td[data-href]");
                console.log(rows);
                rows.forEach( row=>{
                    row.addEventListener("click",()=>{
                        if (confirm("Do you wish to complete this task?") == true) {
                            window.location.href=row.dataset.href;
                          } 
                        
                    });
                });
            });
        </script>
    </body>


</html>

    `
}
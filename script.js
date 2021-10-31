// Clock start
function updateClock(){
    // Creates new date
    var now = new Date();
    // Gets current date and time
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear();
        hou = now.getHours(),
        min = now.getMinutes(),
        pe = "AM";
    
    // 12-hour format
    if(hou == 0){
        hou = 12;
    }
    if(hou > 12){
        hou = hou - 12;
        pe = "PM";
    }
    
    // Numerical padding
    Number.prototype.pad = function(digits){
        for(var n = this.toString(); n.length < digits; n = 0 + n);
        return n;
    }
    
    // Arrays
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Displays current date and time in HTML
    var ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "period"];
    var values = [week[dname], months[mo], dnum, yr, hou, min.pad(2), pe];
    for(var i = 0; i < ids.length; i++)
    document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

// Initiate clock when window loads
function initClock(){
    updateClock();
    window.setInterval("updateClock()", 1);
}
// Clock end





// Elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".deleteAll");
const theme = document.getElementById('theme');

// Theme changer
theme.addEventListener('click', () => {
    document.querySelector('body').classList = [theme.checked ? 'theme-dark' : 'theme-light'];
});

// Inputbox Onkeyup event
inputBox.onkeyup = ()=>{
    let userData = inputBox.value; // getting user entered value
    let getLocalStorage = localStorage.getItem("OneDay | To Do"); // getting localStorage
    if(getLocalStorage == null){ // if localStorage has no data
        listArr = []; // create a blank array
    }else{
        listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    }
    
    // (CSS: addBtn)
    if(userData.length > 0){ // if user values aren't only spaces
        addBtn.classList.add("active"); // active the add button
    }else{
        addBtn.classList.remove("active"); // unactive the add button
    }
    
    // if enter key is pressed & user entered value is greater than 0
    if (event.keyCode == 13 && userData.length > 0) {
        listArr.push(userData); // pushing or adding new value in array
        localStorage.setItem("OneDay | To Do", JSON.stringify(listArr)); // transforming js object into a json string
        showTasks(); // calling showTasks function
        addBtn.classList.remove("active"); // unactive the add button once the task added
    }
}

showTasks(); // calling showTasks function

// Add Task function
function showTasks(){
    let getLocalStorage = localStorage.getItem("OneDay | To Do"); // getting localStorage
    if(getLocalStorage == null){ // if localStorage has no data
        listArr = []; // create a blank array
    }else{
        listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    }
    
    // Show '# tasks left'
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; // passing the array length value in pendingNumb

    // (CSS: deleteAllBtn)
    if(listArr.length > 0){ // if array length is greater than 0
        deleteAllBtn.classList.add("active"); // active the delete all button
    }else{
        deleteAllBtn.classList.remove("active"); // unactive the delete all button
    }

    // adding new li tag inside ul tag
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = ""; // once task added leave the input field blank
}

// Delete Task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("OneDay | To Do"); // getting localStorage
    listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    listArr.splice(index, 1); // delete or remove the particular indexed li

    // after remove the li again update the local storage
    localStorage.setItem("OneDay | To Do", JSON.stringify(listArr)); // transforming js object into a json string
    showTasks(); // calling showTasks function
}

// Delete All Tasks function
deleteAllBtn.onclick = ()=>{
    let getLocalStorageData = localStorage.getItem("OneDay | To Do"); // getting localStorage
    if(getLocalStorageData == null){ // if localStorage has no data
        listArr = []; // create a blank array
    }else{
        listArr = JSON.parse(getLocalStorageData); // transforming json string into a js object
        listArr = []; // create a blank array
    }

    // after delete all task again update the local storage
    localStorage.setItem("OneDay | To Do", JSON.stringify(listArr)); // set the item in localStorage
    showTasks(); // calling showTasks function
}



function notepad() {
    var userNotes = 'OneDay | Notes';
    var notepad = document.getElementById('notepad');
    var cache = localStorage.getItem(userNotes);

    if (cache) {
        notepad.innerHTML = cache;
    }

    function autosave() {
        var newValue = notepad.innerHTML;
        if (cache != newValue) {
            cache = newValue;
            localStorage.setItem(userNotes, cache);
        }
    }

    notepad.addEventListener('input', autosave);
}

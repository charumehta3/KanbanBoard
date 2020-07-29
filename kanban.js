(function () {
    let response = data;
    let taskIdCounter = 1;
    let selectedCategorytype = '';
    registerEventListeners();
    renderUI();

    function renderUI() {
        let conatiner = document.getElementById("conatiner");
        conatiner.innerHTML = '';
        for (let category of response.categories) {
            conatiner.appendChild(createCategory(category));
        }
    };

    function registerEventListeners() {
        let conatiner = document.getElementById("conatiner");
        conatiner.addEventListener('click', addTask);
        conatiner.addEventListener('dblclick', editTask);

        fillCategoryDD();

        let saveBtn = document.getElementById("addTask");
        saveBtn.addEventListener('click', saveTask);

        let cancelBtn = document.getElementById("cancelTask");
        cancelBtn.addEventListener('click', closeModal);

        var closeBtn = document.getElementById("closeTask");


        // When the user clicks on <span> (x), close the modal
        closeBtn.onclick = closeModal;
    }

    function createCategory(categoryName) {
        let category = document.createElement("div");
        category.innerHTML = `<section>
    <header>${categoryName}</header>
    <div class="task-cnt">
    <div id=${categoryName}>
    ${createTasks(categoryName)}
    </div>
    <button class="add" data-categoryType=${categoryName}>+ Add another task</button>
    </div>
    </section>`;
        return category;
    }

    function createTasks(categoryName) {
        let taskIds = response[categoryName];
        let returnHtml = '';
        for (let taskId of taskIds) {
            if (response.taskList[taskId]) {
                returnHtml += `<div class='cardContainer'  data-categoryType=${categoryName} id=${taskId}>
            <div class='cardTitle'>
            ${response.taskList[taskId].title}
            </div>
            <div class='cardDate'>
            ${response.taskList[taskId].duedate}
            </div>
            <div class='cardAssignee'>
            ${response.taskList[taskId].name}
            </div>
            </div>`
            }
        }
        return returnHtml;
    }

    function removeTaskfromCategory(taskId) {
        //filter taskid from array

        response[selectedCategorytype] = response[selectedCategorytype].filter((val) => {
            return val != taskId
        })
    }


    function saveTask() {
        getCardFormvalue();
        let {
            title,
            duedate,
            category,
            taskId
        } = getCardFormvalue();
        response.taskList[taskId] = {
            title,
            duedate,
            name: "james"
        };
        if (selectedCategorytype && selectedCategorytype !== category) {
            removeTaskfromCategory(taskId);
            response[category].push(taskId);
            taskIdCounter++;
        } else if (selectedCategorytype == '') {
            response[category].push(taskId);
            taskIdCounter++;
        }

        closeModal();
        renderUI();
    }


    function getCardFormvalue() {
        let formValue = {
            title: document.getElementById("addTaskInput").value,
            category: document.getElementById("categoryDD").value,
            duedate: document.getElementById("addTaskdate").value,
            taskId: document.getElementById("taskIdInput").value || "td_" + taskIdCounter
        }
        return formValue;
    }

    function showModal() {
        resetModal();
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    function closeModal() {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }


    function resetModal() {
        document.getElementById("modalTitle").innerHTML = "Add Task";

        document.getElementById("addTaskInput").value = '';
        document.getElementById("categoryDD").value = response.categories[0];
        document.getElementById("addTaskdate").value = '';
        document.getElementById("taskIdInput").value = '';
        selectedCategorytype = '';
    }

    function fillCategoryDD() {
        var dd = document.getElementById('categoryDD');
        if (!dd.value) {
            for (var i = 0; i < response.categories.length; i++) {
                var opt = document.createElement('option');
                opt.innerHTML = response.categories[i];
                opt.value = response.categories[i];
                dd.appendChild(opt);
            }
        }
    }

    function fillAssigneeDD() {
        var dd = document.getElementById('assignees');
        if (!dd.value) {
            let assignees = getContactList();
            for (var i = 0; i < assignees.length; i++) {
                var opt = document.createElement('option');
                opt.innerHTML = assignees[i];
                opt.value = assignees[i];
                dd.appendChild(opt);
            }
        }
    }

    function addTask(e) {
        console.log(e);

        if (e.target.dataset.categorytype) {
            showModal();
        }

    }

    function editTask(e) {
        console.log(e);
        showModal();
        document.getElementById("modalTitle").innerHTML = "Edit Task";
        //document.getElementById("addTaskInput").value
        let cardContainer = e.target.closest(".cardContainer")
        let taskId = cardContainer.id;
        selectedCategorytype = cardContainer.dataset.categorytype;
        let taskObj = response.taskList[taskId];
        document.getElementById("addTaskInput").value = taskObj.title;
        document.getElementById("addTaskdate").value = taskObj.duedate;
        document.getElementById("categoryDD").value = selectedCategorytype;
        document.getElementById("taskIdInput").value = taskId;

    }


    function addNewTask() {
        let modal = document.getElementById("myModal");
        let span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        fillStatesDD();
        fillAssigneeDD();
        let duedate = document.getElementById("date");
        duedate.value = obj.dued;
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
        document.getElementById("cancel").onclick = function (obj) {
            let modal = document.getElementById("myModal");
            modal.style.display = "none";
        }
    }

})()
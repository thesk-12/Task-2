/* =========================
   TODO LIST
========================= */

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const taskMessage = document.getElementById("taskMessage");

let tasks = [];


/* Add Task */

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {

        taskMessage.textContent =
            "Please enter a task first.";

        return;
    }

    tasks.push({
        id: Date.now(),
        text: taskText,
        completed: false
    });

    taskInput.value = "";

    taskMessage.textContent = "";

    renderTasks();
}


/* Render Tasks */

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        const li = document.createElement("li");

        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }


        const leftDiv = document.createElement("div");

        leftDiv.className = "task-left";


        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;


        checkbox.addEventListener(
            "change",
            function () {

                task.completed = checkbox.checked;

                renderTasks();
            }
        );


        const text = document.createElement("span");

        text.className = "task-text";

        text.textContent = task.text;


        leftDiv.appendChild(checkbox);

        leftDiv.appendChild(text);


        const deleteButton =
            document.createElement("button");

        deleteButton.className = "delete-button";

        deleteButton.textContent = "Delete";


        deleteButton.addEventListener(
            "click",
            function () {

                tasks = tasks.filter(
                    function (item) {
                        return item.id !== task.id;
                    }
                );

                renderTasks();
            }
        );


        li.appendChild(leftDiv);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });


    updateTaskStats();
}


/* Update Statistics */

function updateTaskStats() {

    const total = tasks.length;

    const completed =
        tasks.filter(
            function (task) {
                return task.completed;
            }
        ).length;

    const pending = total - completed;

    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;
}


/* Button */

addTaskButton.addEventListener(
    "click",
    addTask
);


/* Enter Key */

taskInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            addTask();
        }

    }
);


/* =========================
   CONTACT FORM VALIDATION
========================= */

const contactForm =
    document.getElementById("contactForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const subjectInput =
    document.getElementById("subject");

const messageInput =
    document.getElementById("message");

const nameError =
    document.getElementById("nameError");

const emailError =
    document.getElementById("emailError");

const subjectError =
    document.getElementById("subjectError");

const messageError =
    document.getElementById("messageError");

const formSuccess =
    document.getElementById("formSuccess");


/* Email Pattern */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


/* Clear Errors */

function clearErrors() {

    nameError.textContent = "";

    emailError.textContent = "";

    subjectError.textContent = "";

    messageError.textContent = "";

    formSuccess.textContent = "";

    nameInput.classList.remove("error");

    emailInput.classList.remove("error");

    subjectInput.classList.remove("error");

    messageInput.classList.remove("error");
}


/* Form Submit */

contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        clearErrors();

        let isValid = true;


        /* Name */

        if (nameInput.value.trim() === "") {

            nameError.textContent =
                "Name is required.";

            nameInput.classList.add("error");

            isValid = false;
        }


        /* Email */

        if (emailInput.value.trim() === "") {

            emailError.textContent =
                "Email is required.";

            emailInput.classList.add("error");

            isValid = false;

        } else if (
            !isValidEmail(emailInput.value.trim())
        ) {

            emailError.textContent =
                "Please enter a valid email.";

            emailInput.classList.add("error");

            isValid = false;
        }


        /* Subject */

        if (subjectInput.value.trim() === "") {

            subjectError.textContent =
                "Subject is required.";

            subjectInput.classList.add("error");

            isValid = false;
        }


        /* Message */

        if (messageInput.value.trim() === "") {

            messageError.textContent =
                "Message is required.";

            messageInput.classList.add("error");

            isValid = false;
        }


        /* Success */

        if (isValid) {

            formSuccess.textContent =
                "Message submitted successfully!";

            contactForm.reset();

        }

    }
);


/* Initial Render */

renderTasks();
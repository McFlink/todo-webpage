let formElement = document.querySelector("#add-item-form");
let selectAllItemsElement = document.querySelector("#choose-all-items");
let inputElement = document.querySelector("#todo-input");
let itemList = document.querySelector("#item-list");
let todoFooterElement = document.querySelector(".todo-footer"); // antar vi ska ha en till footer, därav namnet
let itemsLeft = document.querySelector("#item-count");
let clearButton = document.querySelector("#clear-button");

let itemsArray = [];

formElement.onsubmit = function (event) {
    event.preventDefault();

    selectAllItemsElement.style.display = "flex";
    selectAllItemsElement.textContent = "🔽";

    let inputValue = inputElement.value.trim();
    if (inputValue !== '') {
        let newItem = document.createElement("li");
        let checkbox = document.createElement("input");
        let itemText = document.createElement("p");
        let removeButton = document.createElement("button");

        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        itemText.textContent = inputValue;

        removeButton.className = 'remove-button';
        removeButton.textContent = '❌';

        newItem.append(checkbox);
        newItem.append(itemText);
        newItem.append(removeButton);
        itemList.append(newItem);

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                itemText.style.textDecoration = "line-through";
                itemText.style.color = "#949494";
            }
            else {
                itemText.style.textDecoration = "none";
                itemText.style.color = "";
            }
            itemCount();
        });

        removeButton.addEventListener("click", () => {
            itemsArray.splice(itemsArray.indexOf(newItem), 1);
            newItem.remove();
            itemCount();
        });

        itemsArray.push(newItem);
        itemCount();
        labelBehaviour();

        inputElement.value = '';
    }
};

function itemCount() {
    let count = 0;
    let anyChecked = false;

    itemsArray.forEach(item => {
        let checkBox = item.querySelector(".checkbox");
        if (checkBox.checked) {
            anyChecked = true;
        }
        else{
            count++;
        }
    })
    
    if(anyChecked){
        clearButton.style.visibility = "visible";
    }
    else{
        clearButton.style.visibility = "hidden";
    }

    if (count === 1) {
        itemsLeft.textContent = `${count} item left`;
    }
    else {
        itemsLeft.textContent = `${count} items left`;
    }

    if (itemsArray.length > 0) {
        todoFooterElement.style.display = "flex";
    }
    else {
        todoFooterElement.style.display = "none";
        selectAllItemsElement.style.display = "none";
    }
};

// Check or uncheck all
let selectAllChecked = false;

selectAllItemsElement.addEventListener("click", () => {
    selectAllChecked = !selectAllChecked;

    selectAllItemsElement.style.boxShadow = "0 0 2px 2px #CF7D7D";

    itemsArray.forEach(item => {
        let checkbox = item.querySelector(".checkbox");
        checkbox.checked = selectAllChecked;

        let itemText = item.querySelector("p");
        if (selectAllChecked) {
            itemText.style.textDecoration = "line-through";
            itemText.style.color = "#949494";
        }
        else {
            itemText.style.textDecoration = "none";
            itemText.style.color = "";
        }
    });

    itemCount();
});

// Remove connection label => input when items in array
function labelBehaviour() {
    if (itemsArray.length > 0) {
        selectAllItemsElement.removeAttribute("for");
    }
    else {
        selectAllItemsElement.setAttribute("for", "todo-input");
        selectAllItemsElement.style.display = "none";
    }
};

// Remove label "border" when focus on input field
inputElement.addEventListener("focus", () => {
    selectAllItemsElement.style.boxShadow = "none";
});

document.querySelector("#all-button").addEventListener("click", DisplayAll);
document.querySelector("#active-button").addEventListener("click", DisplayActive);
document.querySelector("#completed-button").addEventListener("click", DisplayCompleted);
clearButton.addEventListener("click", ClearCompleted);

function DisplayAll() {
    itemsArray.forEach(item => {
        item.style.display = "flex";
    })
}

function DisplayActive() {
    itemsArray.forEach(item => {
        let checkBox = item.querySelector(".checkbox");
        if (checkBox.checked) {
            item.style.display = "none";
        }
        else {
            item.style.display = "flex";
        }
    })
}

function DisplayCompleted() {
    itemsArray.forEach(item => {
        let checkBox = item.querySelector(".checkbox");
        if (checkBox.checked) {
            item.style.display = "flex";
        }
        else {
            item.style.display = "none";
        }
    })
}

function ClearCompleted() {
    itemsArray = itemsArray.filter(item => {
        let checkBox = item.querySelector(".checkbox");
        if (checkBox.checked) {
            item.remove();
            return false; // Ta bort item från array
        }
        return true; // behåll item i array
    });
    itemCount();
}
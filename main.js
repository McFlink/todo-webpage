let formElement = document.querySelector("#add-item-form");
let selectAllItemsElement = document.querySelector("#choose-all-items");
let inputElement = document.querySelector("#todo-input");
let itemList = document.querySelector("#item-list");
let todoFooterElement = document.querySelector(".todo-footer"); // antar vi ska ha en till footer, därav namnet
let itemsLeft = document.querySelector("#item-count");

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
    if (itemsArray.length === 1) {
        itemsLeft.textContent = `${itemsArray.length} item left`;
    }
    else {
        itemsLeft.textContent = `${itemsArray.length} items left`;
    }

    if (itemsArray.length > 0) {
        todoFooterElement.style.display = "flex";
    }
    else {
        todoFooterElement.style.display = "none";
    }

    labelBehaviour();
};

// Check or uncheck all
let selectAllChecked = false;

selectAllItemsElement.addEventListener("click", () => {
    selectAllChecked = !selectAllChecked;

    selectAllItemsElement.style.boxShadow = "0 0 2px 2px #CF7D7D";

    itemsArray.forEach(item => {
        let checkbox = item.querySelector(".checkbox");
        checkbox.checked = selectAllChecked;
    });
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
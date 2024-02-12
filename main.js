let formElement = document.querySelector("#add-item-form");
let selectAllItemsElement = document.querySelector("#choose-all-items");
let inputElement = document.querySelector("#todo-input");
let itemList = document.querySelector("#item-list");
let todoFooterElement = document.querySelector(".todo-footer"); // antar vi ska ha en till footer, därav namnet

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

        inputElement.value = '';
    }
};

// Footer
let itemsLeft = document.createElement("span");
itemsLeft.classList.add("item-count");
todoFooterElement.append(itemsLeft);

function itemCount() {
    if (itemsArray.length === 1) {
        itemsLeft.textContent = `${itemsArray.length} item left`;
    }
    else {
        itemsLeft.textContent = `${itemsArray.length} items left`;
    }

    if (itemsArray.length > 0) {
        todoFooterElement.style.display = "block";
    }
    else {
        todoFooterElement.style.display = "none";
    }
}

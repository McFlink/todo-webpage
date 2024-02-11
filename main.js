let formElement = document.querySelector("#add-item-form");
let selectAllItemsElement = document.querySelector("#choose-all-items");
let inputElement = document.querySelector("#todo-input");
let itemList = document.querySelector("#item-list");


formElement.onsubmit = function(event) {
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
            newItem.remove();
        })

        inputElement.value = '';
    }
};

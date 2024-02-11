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
        let newItem = document.createElement("div"); // div or li??
        newItem.textContent = inputValue;
        itemList.append(newItem);

        inputElement.value = '';
    }

};
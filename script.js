let items = [];

const itemsDiv = document.getElementById("listWindow");
const input = document.getElementById("taskInput");
const storageKey = "items";

function loadItems() {
    const oldItems = localStorage.getItem(storageKey);
    if (oldItems) {
        items = JSON.parse(oldItems);
    }

    renderItems();
}

function renderItems() {
    itemsDiv.innerHTML = null;

    for (const [idx, item] of Object.entries(items)) {
        const container = document.createElement("div");
        container.style.marginBottom = "10px"
        
        const text = document.createElement("p");
        text.style.display = "inline";
        text.style.marginRight = "10px";
        text.textContent = item;

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.onclick = () => removeItem(idx);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.style.marginRight = "10px";
        editButton.onclick = () => editItem(idx);

        container.appendChild(editButton);
        container.appendChild(text);
        container.appendChild(button);

        itemsDiv.appendChild(container);
    }
}

function saveItems() {
    const stringItems = JSON.stringify(items);
    localStorage.setItem(storageKey, stringItems);
}

function addItem() {
    const value = input.value;

    if (!value) {
        alert("You cannot add an empty item");
        return;
    }

    items.push(value);
    renderItems();
    input.value = "";
    saveItems();
}

function removeItem(idx) {
    items.splice(idx, 1);
    renderItems();
    saveItems();
}

function editItem(idx) {
    const newValue = prompt("Edit your item: ", items[idx]);

    if (newValue !== null && newValue !== "") {
        items[idx] = newValue;
        renderItems();
        saveItems();
    } else {
        alert("Item cannot be empty");
    }
}

document.addEventListener("DOMContentLoaded", loadItems);
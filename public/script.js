"use strict";
let shoppingList = [];
let storeInput = document.querySelector(".store__input");
const storeBtn = document.querySelector(".store__btn");
let storeForm = document.querySelector(".store");
let shoppingInput = document.querySelector(".shopping-item__input");
const shoppingBtn = document.querySelector(".shopping-item__btn");
const deleteBtn = document.querySelector(".btn-delete");
const ulElement = document.querySelector(".list");
let subheading = document.querySelector(".main__subheading");
//* Store zum 1.Mal eingeben *************************************************************************************************** */
storeInput.focus();
storeBtn.addEventListener("click", (event) => {
    event.preventDefault;
    storeForm.style.display = "none";
    subheading.innerText = storeInput.value.toUpperCase();
    shoppingInput.parentElement?.classList.add("search");
    shoppingList = JSON.parse(localStorage.getItem(subheading.innerText) || "");
    render(shoppingList);
});
//*Store wechseln ************************************************************************************ */
subheading.addEventListener("click", (event) => {
    event.preventDefault;
    storeForm.style.display = "flex";
    storeInput.value = "";
    storeInput.focus();
    render([]);
    subheading.innerText = storeInput.value.toUpperCase();
    shoppingList = JSON.parse(localStorage.getItem(subheading.innerText) || "");
    render(shoppingList);
});
//***Ware abgreifen******************************************************************************************************* */
shoppingBtn.addEventListener("click", (event) => {
    event.preventDefault;
    let storeValue = subheading.innerText;
    if (shoppingInput.value !== "") {
        let shoppingItem = {
            item: shoppingInput.value,
            isShopped: false,
            id: getId(),
        };
        shoppingList.push(shoppingItem);
        localStorage.setItem(storeValue, JSON.stringify(shoppingList));
        render(shoppingList);
    }
    shoppingInput.value = "";
    shoppingInput.focus();
});
shoppingInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        let storeValue = subheading.innerText;
        if (shoppingInput.value !== "") {
            let shoppingItem = {
                item: shoppingInput.value,
                isShopped: false,
                id: getId(),
            };
            shoppingList.push(shoppingItem);
            localStorage.setItem(storeValue, JSON.stringify(shoppingList));
            render(shoppingList);
        }
        shoppingInput.value = "";
        shoppingInput.focus();
    }
});
//*gekaufte Dinge löschen********************************************************************************************************* */
deleteBtn.addEventListener("click", () => {
    let storeValue = subheading.innerText.toUpperCase();
    let newShoppingList = shoppingList.filter((element) => element.isShopped === false);
    shoppingList = newShoppingList;
    render(shoppingList);
    localStorage.setItem(storeValue, JSON.stringify(shoppingList));
});
/* ********************************************************************************************************** */
function render(array) {
    ulElement.innerText = "";
    for (let element of array) {
        const listItem = document.createElement("li");
        const listCheckbox = document.createElement("input");
        const label = document.createElement("label");
        label.innerText = element.item;
        label.classList.add("list__label");
        label.setAttribute("for", element.id);
        listItem.classList.add("list__item");
        listCheckbox.setAttribute("type", "checkbox");
        listCheckbox.setAttribute("id", element.id);
        listCheckbox.setAttribute("class", "checkbox");
        listCheckbox.checked = element.isShopped;
        listItem.append(label);
        listItem.prepend(listCheckbox);
        ulElement.appendChild(listItem);
        listCheckbox.addEventListener("change", (event) => {
            let index = array.findIndex((element) => element.id === listCheckbox.id);
            array[index].isShopped = !array[index].isShopped;
        });
    }
}
//*********************************************************************************************************************** */
function getId() {
    let id = shoppingInput.value.replaceAll(" ", "");
    return id;
}

"use strict";
let shoppingList = [];
let storeText = document.querySelector(".choose__store");
const storeBtn = document.querySelector(".btn-store");
let storeForm = document.querySelector(".store");
let shoppingText = document.querySelector(".search__text");
const addBtn = document.querySelector(".btn-add");
const deleteBtn = document.querySelector(".btn-delete");
const ulElement = document.querySelector(".list");
const selectBtn = document.querySelector(".btn-selection");
const allBtn = document.querySelector(".btn-all");
let subheading = document.querySelector(".main__subheading");
//* Store zum 1.Mal eingeben *************************************************************************************************** */
storeText.focus();
storeBtn.addEventListener("click", (event) => {
    event.preventDefault;
    storeForm.style.display = "none";
    subheading.innerText = storeText.value;
    shoppingText.parentElement?.classList.add("search");
    shoppingList = JSON.parse(localStorage.getItem(subheading.innerText) || "");
    render(shoppingList);
});
//*Store wechseln ************************************************************************************ */
subheading.addEventListener("click", (event) => {
    event.preventDefault;
    storeForm.style.display = "flex";
    storeText.value = "";
    storeText.focus();
    render([]);
    subheading.innerText = storeText.value;
    shoppingList = JSON.parse(localStorage.getItem(subheading.innerText) || "");
    render(shoppingList);
});
//***Ware abgreifen******************************************************************************************************* */
addBtn.addEventListener("click", (event) => {
    event.preventDefault;
    let storeValue = subheading.innerText;
    if (shoppingText.value !== "") {
        let shoppingItem = {
            item: shoppingText.value,
            isShopped: false,
            id: getId(),
        };
        shoppingList.push(shoppingItem);
        localStorage.setItem(storeValue, JSON.stringify(shoppingList));
        render(shoppingList);
    }
    shoppingText.value = "";
    shoppingText.focus();
});
shoppingText.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        let storeValue = subheading.innerText;
        if (shoppingText.value !== "") {
            let shoppingItem = {
                item: shoppingText.value,
                isShopped: false,
                id: getId(),
            };
            shoppingList.push(shoppingItem);
            localStorage.setItem(storeValue, JSON.stringify(shoppingList));
            render(shoppingList);
        }
        shoppingText.value = "";
        shoppingText.focus();
    }
});
//*gekaufte Dinge löschen********************************************************************************************************* */
deleteBtn.addEventListener("click", () => {
    let storeValue = subheading.innerText;
    let newShoppingList = shoppingList.filter((element) => element.isShopped === false);
    shoppingList = newShoppingList;
    render(shoppingList);
    localStorage.setItem(storeValue, JSON.stringify(shoppingList));
});
//*Anzeige********************************************************************************************************** */
//selected
selectBtn.addEventListener("click", (event) => {
    event.preventDefault;
    let filteredShoppingList = shoppingList.filter((element) => element.isShopped === false);
    render(filteredShoppingList);
});
//all
allBtn.addEventListener("click", (event) => {
    event.preventDefault;
    render(shoppingList);
});
//********************************************************************************************************** */
function render(array) {
    ulElement.innerText = "";
    for (let element of array) {
        const liElement = document.createElement("li");
        const checkbox = document.createElement("input");
        const label = document.createElement("label");
        label.innerText = element.item;
        label.classList.add("list__new");
        label.setAttribute("for", element.id);
        liElement.classList.add("list__item");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", element.id);
        checkbox.setAttribute("class", "checkbox");
        checkbox.checked = element.isShopped;
        liElement.append(label);
        liElement.prepend(checkbox);
        ulElement.appendChild(liElement);
        checkbox.addEventListener("change", (event) => {
            let index = array.findIndex((element) => element.id === checkbox.id);
            array[index].isShopped = !array[index].isShopped;
        });
    }
}
//*********************************************************************************************************************** */
function getId() {
    if (shoppingText.value !== "") {
        let id = shoppingText.value.replaceAll(" ", "");
        return id;
    }
}

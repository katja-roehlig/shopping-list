let shoppingList: any[] = [];

let shoppingText = document.querySelector(".search__text") as HTMLInputElement;
const addBtn = document.querySelector(".btn-add") as HTMLButtonElement;
const deleteBtn = document.querySelector(".btn-delete") as HTMLButtonElement;
const ulElement = document.querySelector(".list") as HTMLUListElement;
const selectBtn = document.querySelector(".btn-selection") as HTMLButtonElement;
const allBtn = document.querySelector(".btn-all") as HTMLButtonElement;
//********************************************************************************************************** */
addBtn.addEventListener("click", (event) => {
  event.preventDefault;
  if (shoppingText.value !== "") {
    let shoppingItem = {
      item: shoppingText.value,
      isShopped: false,
      id: getId(),
    };
    shoppingList.push(shoppingItem);
    render(shoppingList);
  }
  shoppingText.value = "";
  shoppingText.focus();
});
//********************************************************************************************************** */
deleteBtn.addEventListener("click", () => {
  let newShoppingList = shoppingList.filter(
    (element) => element.isShopped === false
  );
  shoppingList = newShoppingList;
  render(shoppingList);
});
//*Anzeige********************************************************************************************************** */
//selected
selectBtn.addEventListener("click", (event) => {
  event.preventDefault;
  let filteredShoppingList = shoppingList.filter(
    (element) => element.isShopped === false
  );
  render(filteredShoppingList);
});

//all
allBtn.addEventListener("click", (event) => {
  event.preventDefault;
  render(shoppingList);
});

//********************************************************************************************************** */
function render(array: any[]) {
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
    let id: string = shoppingText.value.replaceAll(" ", "");
    return id;
  }
}

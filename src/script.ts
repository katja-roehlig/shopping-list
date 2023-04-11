type ShoppingItem = { item: string; isShopped: boolean; id: string };

let shoppingList: ShoppingItem[] = [];

let storeInput = document.querySelector(".store__input") as HTMLInputElement;
const storeBtn = document.querySelector(".store__btn") as HTMLButtonElement;
let storeForm = document.querySelector(".store") as HTMLFormElement;
let shoppingInput = document.querySelector(
  ".shopping-item__input"
) as HTMLInputElement;
const shoppingBtn = document.querySelector(
  ".shopping-item__btn"
) as HTMLButtonElement;
const deleteBtn = document.querySelector(".btn-delete") as HTMLButtonElement;
const ulElement = document.querySelector(".list") as HTMLUListElement;
let subheading = document.querySelector(
  ".main__subheading"
) as HTMLHeadingElement;

//* Store zum 1.Mal eingeben *************************************************************************************************** */
storeInput.focus();
storeBtn.addEventListener("click", (event) => {
  event.preventDefault;
  storeForm.style.display = "none";
  subheading.innerText = storeInput.value.toUpperCase();
  shoppingInput.parentElement?.classList.add("shopping-item-flex");
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
    let shoppingItem: ShoppingItem = {
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
  let newShoppingList = shoppingList.filter(
    (element) => element.isShopped === false
  );
  shoppingList = newShoppingList;
  render(shoppingList);
  localStorage.setItem(storeValue, JSON.stringify(shoppingList));
});

/* ********************************************************************************************************** */

function render(array: ShoppingItem[]) {
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

function getId(): string {
  let id: string = shoppingInput.value.replaceAll(" ", "");
  return id;
}

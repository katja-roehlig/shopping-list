type ShoppingItem = { item: string; isShopped: boolean; id: string };

let shoppingList: ShoppingItem[] = [];

let storeText = document.querySelector(".choose__store") as HTMLInputElement;
const storeBtn = document.querySelector(".btn-store") as HTMLButtonElement;
let storeForm = document.querySelector(".store") as HTMLFormElement;
let shoppingText = document.querySelector(".search__text") as HTMLInputElement;
const addBtn = document.querySelector(".btn-add") as HTMLButtonElement;
const deleteBtn = document.querySelector(".btn-delete") as HTMLButtonElement;
const ulElement = document.querySelector(".list") as HTMLUListElement;
const selectBtn = document.querySelector(".btn-selection") as HTMLButtonElement;
const allBtn = document.querySelector(".btn-all") as HTMLButtonElement;
let subheading = document.querySelector(
  ".main__subheading"
) as HTMLHeadingElement;
//* Store zum 1.Mal eingeben *************************************************************************************************** */
storeText.focus();
storeBtn.addEventListener("click", (event) => {
  event.preventDefault;
  storeForm.style.display = "none";
  subheading.innerText = storeText.value.toUpperCase();
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
  subheading.innerText = storeText.value.toUpperCase();

  shoppingList = JSON.parse(localStorage.getItem(subheading.innerText) || "");
  render(shoppingList);
});
//***Ware abgreifen******************************************************************************************************* */
addBtn.addEventListener("click", (event) => {
  event.preventDefault;
  let storeValue = subheading.innerText;
  if (shoppingText.value !== "") {
    let shoppingItem: ShoppingItem = {
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
function getId(): string {
  let id: string = shoppingText.value.replaceAll(" ", "");
  return id;
}

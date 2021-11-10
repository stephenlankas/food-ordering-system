//variables
const itemList = document.querySelector(".items");
const modalTitle = document.querySelector(".modal-title");
const modalPrice = document.querySelector(".modal-price");
const modalImage = document.querySelector(".modal-body-img");
const addtocart = document.querySelector(".add-to-cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartDOM = document.querySelector(".cart");
const closeCartBtn = document.querySelector(".close-cart");
const cartContent = document.querySelector(".cart-content");
const clearItem = document.querySelector(".clear-cart");
const addedItems = document.querySelector(".added-items");
// const confirmOrder = document.querySelector(".confirmOrder");
const savingorder = document.querySelector(".savingorder");
const orderconfirmModal = document.querySelector(".mymodal");
const checkoutBtn = document.querySelector(".checkout-btn");
const cartTotal = document.querySelector(".cart-total");
let items = [];
let totalAmount = 0;
//const  firebase = require('firebase');
db.collection("items")
  .get()
  .then(snapshot => {
    let item = "";
    snapshot.docs.forEach(doc => {
      let { title, price, img } = doc.data();
      item += ` <div class="col-10 mx-auto col-sm-6 col-lg-4 my-3">
       <h5 class="shreya">${title.toUpperCase()}</h5>
       <img src=./img/${img} alt=${title} class="img-fluid img-thumbnail item-img"/>
       <div class="col-footer mt-4 ">
       <h4 class="pt-2 baidya">Rs. ${price}</h4>
       <button type="button" class="btnStyle1 btnStyle" data-toggle="modal"
        data-target="#exampleModalCenter" class="item-btn"
        onclick=" renderItemModal(\`${title}\`,\`${price}\`,\`${img}\`)">Add to cart</button>
       </div>
      </div>`;
      itemList.innerHTML = item;
    });
  });
function addTocart(seletedItem) {
  cartOverlay.classList.add("transparentBcg");
  cartDOM.classList.add("showCart");
  console.log(items);
  let result = "";
  if (items.length > 0) {
    items.map((item, index) => {
      console.log(item.title);
      result += `<div class="cart-item">
    <div class="col-sm">${item.title}</div>
    <div class="col-sm">Rs. ${item.price}</div>
    <div class="remove-item" onclick="removeCartItem(\`${
      item.title
    }\`)">&times;</div>
    </div>
   `;
    });
  } else {
    result += `<h1>no items in the cart</h1>`;
  }

  cartContent.innerHTML = result;
}
function removeCartItem(id) {
  let filterItem = items.filter(item => item.title !== id);
  let itemPrice = items.filter(item => item.title === id)[0];
  console.log(itemPrice);
  items = filterItem;
  addTocart();
  caltotalAmount(-itemPrice.price);
}

function hideCart(params) {
  cartOverlay.classList.remove("transparentBcg");
  cartDOM.classList.remove("showCart");
}

//create element and render item list into the dom
function renderItemModal(title, price, img) {
  if (title === undefined && price === undefined && img === undefined) {
  } else {
    let seletedItem = { title, price, img };
    modalTitle.innerHTML = title;
    modalPrice.innerHTML = `Rs. ${price}`;
    modalImage.setAttribute("src", `./img/${img}`);
    let lists = document.querySelector(".ingredient-list");
    lists.innerHTML = `<ul style="list-style-type:circle">
    <li>Cheese</li>
    <li>Bacon</li>
    <li>pickle</li>
    </ul>`;
    items.push(seletedItem);
    caltotalAmount(price);
  }
}

function caltotalAmount(price) {
  if (price) {
    totalAmount = parseInt(totalAmount) + parseInt(price);
  } else {
    totalAmount = 0;
  }
  cartTotal.innerHTML = totalAmount;
  console.log("total", totalAmount, price);
}
let d = items.map(i => `<div>${i.title}</div>`);
addedItems.innerHTML = d;
addtocart.addEventListener("click", () => addTocart());
closeCartBtn.addEventListener("click", () => hideCart());

  

//form
savingorder.addEventListener("submit", e => {
  e.preventDefault();
  console.log("confirm order");
  db.collection("orders")
                .add({
                  name: savingorder.name.value,
                  address: savingorder.address.value,
                  phone: savingorder.phone.value,
                  orderItems: items,
                  //uid : user.uid
                })
                .then(function(docRef) {

                  (savingorder.name.value = ""),
                    (savingorder.address.value = ""),
                    (savingorder.phone.value = "");
                  items = [];
                  addTocart();
                  caltotalAmount(null);
                  $(".mymodal").modal("hide");
                  hideCart();
                  alert("order successfull");
                })
                .catch(function(error) {
                  console.error("Error adding document: ", error);
                });
  
});

const addToCart = async (id) => {
  const data = await fetch(`ROOMS.json`);
  const result = await data.json();
  const {
    name,
    summary,
    property_type,
    images,
    number_of_reviews,
    price,
    _id,
  } = result.find((item) => item._id == id);
  let cartItems = getItemsFromStorage();
  if (cartItems.length !== 0) {
    cartItems = JSON.parse(cartItems);
  }

  const isStored = cartItems.find((item) => item._id == id);
  if (!isStored) {
    cartItems.push({
      name,
      summary,
      property_type,
      images,
      number_of_reviews,
      price,
      _id,
    });
    localStorage.setItem("savedCart", JSON.stringify(cartItems));
  }

  displayCartItems();
};

const getItemsFromStorage = () => {
  let itemsArray = [];
  const cartItems = localStorage.getItem("savedCart");
  if (cartItems) {
    itemsArray = cartItems;
  }
  return itemsArray;
};

const displayCartItems = () => {
  const cartItemsContainer = document.getElementById("cart-items");
  let cartItems = getItemsFromStorage();
  if (cartItems.length !== 0) {
    cartItems = JSON.parse(cartItems);
  }

  cartItemsContainer.innerHTML = "";
  cartItems?.forEach((item) => {
    const { name, property_type, images, number_of_reviews, price, _id } = item;
    cartItemsContainer.innerHTML += `
        <tr>
        <th scope="row">${name.slice(0, 26)}</th>
        <td><span> <i onclick='deleteItemFromCart(${_id})' class="mx-2 bi bi-trash3 text-danger"></i>
        </span> 
        <span> 
        <i class="text-success bi bi-credit-card-fill" onclick='handlePaymentInfo(${_id})' data-bs-toggle="modal" data-bs-target="#paymentModal" ></i> 
        </span></td>
        </tr>
        `;
  });
};

displayCartItems();

const deleteItemFromCart = (id) => {
  const cartItems = JSON.parse(getItemsFromStorage());
  const filteredItems = cartItems.filter((item) => item._id != id);
  localStorage.setItem("savedCart", JSON.stringify(filteredItems));
  displayCartItems();
};

// let product = document.querySelectorAll(".product")
// let cart = document.querySelectorAll(".cart")
let item_name = document.querySelectorAll(".item_name")
let price = document.querySelectorAll(".price")
let add_to_cart = document.querySelectorAll(".add_to_cart")
// let product_in_cart = document.querySelectorAll(".product_in_cart")
let cardItems = []


let products = getCookieObject('product')
console.log(products)
// function add_to_cart1(){
//     product_in_cart = document.createAttribute("li") in cart
// product_in_cart = document.textContent(`${item_name} - ${price}`)
// }
// add_to_cart = document.addEventListener("click",add_to_cart1)

const cart = document.getElementById('cart');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

function setCookieObject(name, obj, days) {
    const json = JSON.stringify(obj);
    // Закодуємо JSON, щоб уникнути проблем із спецсимволами
    const value = encodeURIComponent(json);
    let cookieStr = `${name}=${value}; path=/`;
    if (days) {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      cookieStr += `; expires=${expires}`;
    }
    console.log(cookieStr)
    document.cookie = cookieStr;
  }

  // Функція для читання об’єкта з cookie
  function getCookieObject(name) {
    // Шуканий ключ із закінченням "="
    const prefix = name + "=";
    const cookies = document.cookie.split('; ');
    for (let c of cookies) {
      if (c.indexOf(prefix) === 0) {
        const value = c.substring(prefix.length);
        try {
          // Розкодуємо та розпарсимо JSON
          const json = decodeURIComponent(value);
          return JSON.parse(json);
        } catch (e) {
          console.error('Не вдалося розпарсити cookie:', e);
          return null;
        }
      }
    }
    return null; // якщо cookie не знайдено
  }


function updateCart() {
    cartItemsList.innerHTML = '';
    let total = 0;
    cardItems.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">₴${item.price}</span>
        <button class="remove-item-btn" data-id="${item.name}" aria-label="Видалити товар">&times;</button>
      `;
      cartItemsList.appendChild(li);
      total += +item.price;
    });
    cartTotal.textContent = `₴${total}`;
    cart.style.display = 'block';
  }

  
  // Видалити товар з кошика
  cartItemsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item-btn')){
    for (let i = 0; i < cardItems.length; i++) {
      if (cardItems[i].name === e.target.dataset.id) {
        delete cardItems[i]
        break
      }
    }
      updateCart();
    }})

  
  // Відкриття/закриття кошика
  openCartBtn.addEventListener('click', () => {
    // cart.classList.remove('hidden');
    cart.style.display = 'block';
  });
  
  closeCartBtn.addEventListener('click', () => {
    // cart.classList.add('hidden');
    cart.style.display = 'none';
  });
  
  // Додавання товарів із каталогу та слайдшоу
for (let i = 0; i < add_to_cart.length; i++) {
    add_to_cart[i].addEventListener("click", function() {
      name = item_name[i].textContent;
      suma = price[i].textContent;
    if (name != "" && suma != "") {
      const product = {
        name: name,
        price: suma,
      };
      cardItems.push(product);
      setCookieObject('product', product, 2);
      products = getCookieObject('product')
        console.log(products)
      updateCart();
    }})}

  // --- Кнопка Сплатити ---
  checkoutBtn.addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });



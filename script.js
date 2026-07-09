const products = [

{
    id:1,
    name:"Designer Rakhi",
    price:299,
    image:"images/products/rakhi1.jpg",
    description:"Premium handmade Designer Rakhi with elegant design."
},

{
    id:2,
    name:"Premium Rakhi",
    price:499,
    image:"images/products/rakhi2.jpg",
    description:"Premium quality Rakhi with beautiful stones and thread."
},

{
    id:3,
    name:"Luxury Rakhi",
    price:699,
    image:"images/products/rakhi3.jpg",
    description:"Luxury Rakhi with premium finishing and festive gift packing."
}

];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {

    let product = cart.find(item => item.name === name);

    if(product){
        product.quantity++;
    }else{
        cart.push({
            name:name,
            price:price,
            quantity:1
        });
    }

    saveCart();
updateCartCount();
    alert(name + " Cart me add ho gayi!");
}

function loadCart(){

    let cartItems=document.getElementById("cart-items");
    let totalPrice=document.getElementById("total-price");

    if(!cartItems || !totalPrice) return;

    cartItems.innerHTML="";

    let total=0;

    cart.forEach((item,index)=>{

        total += item.price * item.quantity;

        cartItems.innerHTML += `
        <div class="cart-item">

        <div>

        <h3>${item.name}</h3>

        <p>₹${item.price}</p>

        </div>

        <div>

        <button onclick="decreaseQty(${index})">−</button>

        <span style="padding:10px">${item.quantity}</span>

        <button onclick="increaseQty(${index})">+</button>

        </div>

        <button onclick="removeItem(${index})">
        Remove
        </button>

        </div>
        `;

    });

    totalPrice.innerText=total;

}

function increaseQty(index){

    cart[index].quantity++;

    saveCart();

    loadCart();

}

function decreaseQty(index){

    if(cart[index].quantity>1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    saveCart();

    loadCart();

}

function removeItem(index){

    cart.splice(index,1);

    saveCart();

    loadCart();

}

function toggleMenu(){

    let menu=document.getElementById("menu");

    if(menu){

        menu.classList.toggle("active");

    }

}

window.onload = function () {

    updateCartCount();

    if (document.getElementById("cart-items")) {
        loadCart();
    }

    if (document.getElementById("product-image")) {
        loadProduct();
    }

};
function updateCartCount() {
    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
    });

    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = count;
    }
}
function sendWhatsAppOrder(){

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let pincode = document.getElementById("pincode").value;

    if(name == "" || phone == "" || address == ""){
        alert("Please fill all required details.");
        return;
    }

    let message = "🛍️ *New Rakhi Order*%0A%0A";

    message += "👤 Name: " + name + "%0A";
    message += "📞 Phone: " + phone + "%0A";
    message += "📍 Address: " + address + "%0A";
    message += "🏙️ City: " + city + "%0A";
    message += "📮 PIN Code: " + pincode + "%0A%0A";

    message += "📦 *Products:*%0A";

    let total = 0;

    cart.forEach(item => {
        message += "• " + item.name + " x" + item.quantity + " = ₹" + (item.price * item.quantity) + "%0A";
        total += item.price * item.quantity;
    });

    message += "%0A💰 *Total Amount:* ₹" + total;

    window.open(
        "https://wa.me/919462311500?text=" + message,
        "_blank"
);

window.location.href = "success.html";
}
        
function loadProduct() {

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    if (!id) return;

    const product = products.find(p => p.id === id);

    if (!product) return;

    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").innerText = product.name;
    document.getElementById("product-price").innerText = "₹" + product.price;
    document.getElementById("product-description").innerText = product.description;

    document.getElementById("add-cart-btn").onclick = function () {
        addToCart(product.name, product.price);
    };
}
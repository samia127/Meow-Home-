//cart
let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector(".cart")
let closeCart = document.querySelector("#close-cart")
//open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};
//close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};



//cart working js
if(document.readyState='loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

//making fucntionb
function ready(){
    //remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for(var i=0; i<removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    //qunatity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(var i=0; i<quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    //add to cart
    var addCart = document.getElementsByClassName('add-cart');
    for(var i=0; i<addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    //buy button work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

function buyButtonClicked(){
    alert('Your Selection is being Processed')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();

}

//remove items from cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

//quanity changes
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value<=0){
        input.value=1;
    }
    updateTotal();
}

//add to cart
function addCartClicked(event){
    var button = event.target
    var shopProd = button.parentElement
    var title = shopProd.getElementsByClassName('product-title')[0].innerText;
    var price = shopProd.getElementsByClassName('price')[0].innerText;
    var productImg = shopProd.getElementsByClassName('product-img')[0].src
    addProductToCart(title,price,productImg);
    updateTotal();

}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-product-title');
    for(var i=0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText==title){
        alert('You have already added this item to cart');
        return;
        }
    }
    var cartBoxcontent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!--Remove cart-->
                        <i class='bx bx-trash cart-remove' ></i>`;
    cartShopBox.innerHTML = cartBoxcontent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);


}

//update total
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i=0; i<cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = document.getElementsByClassName('cart-price')[0];
        var quantityElement = document.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value; 
        total = total + (price * quantity);  
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;

}

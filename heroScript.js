// Initialize cart image elements and cart display elements
let cartImg = document.getElementsByClassName('cart');
let cartisempty = document.getElementById('cartisempty');
let cartitemcontainer = document.querySelector('.cartitemadded');

// Set up event listeners for each cart image
for (let i = 0; i < cartImg.length; i++) {
    cartImg[i].addEventListener('click', addToCartClicked);
}

// Function to handle adding/removing items to/from the cart
function addToCartClicked(event) {
    let clickedCartImg = event.currentTarget;
    let shopItem = clickedCartImg.closest('.sneakimages');
    let imageSrc = shopItem.querySelector('.image').src;
    let priceElement = shopItem.querySelector('.priceofitem');
    let price = priceElement.querySelector('s') ?
        priceElement.innerText.replace(priceElement.querySelector('s').innerText, '').trim() :
        priceElement.innerText.trim();

    if (clickedCartImg.src.includes('blankcart.png')) {
        clickedCartImg.src = 'filledcart.png';
        clickedCartImg.closest('.addtocart').dataset.tooltip = 'Added To Cart';
        addItemToCart(price, imageSrc, clickedCartImg);
    }
}

// Function to add item details to the cart container
function addItemToCart(price, imageSrc, cartImg) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('row');

    cartRow.innerHTML = `
        <div>
            <img src="${imageSrc}" alt="Item Image" class="cart-item-image">
            <div class="price">
                <p class="priceNum">${price}</p>
            </div>
            <div class="quantity">
                <input type="number" value="1">
            </div>
            <div class="del-icon">
                <i class="fa-solid fa-trash"></i>
            </div>
        </div>`;

    cartitemcontainer.append(cartRow);
    cartisempty.style.display = 'none';

    let delIcon = cartRow.querySelector('.fa-trash');
    delIcon.addEventListener('click', () => removeItemFromCart(cartRow, cartImg));

    let quantityInput = cartRow.querySelector('.quantity input');
    quantityInput.addEventListener("change", quantityChanged);

    updateCartTotal();
}

function quantityChanged(e){
    let input = e.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
}

function formatNumber(number) {
    let numStr = Math.floor(number).toString();
    let lastThree = numStr.slice(-3);
    let rest = numStr.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return rest + (rest ? ',' : '') + lastThree;
}

function updateCartTotal() {
    let total = Array.from(document.querySelectorAll('.row')).reduce((sum, row) => {
        let price = parseFloat(row.querySelector('.priceNum').innerText.replace('Rs', '').replace(',', '').trim());
        let quantity = parseInt(row.querySelector('.quantity input').value);
        return sum + price * quantity;
    }, 0);
    document.querySelector('#total').innerText = 'Rs ' + formatNumber(total);
}

// Function to handle item removal from the cart
function removeItemFromCart(cartRow, cartImg) {
    cartRow.remove();
    cartImg.src = 'blankcart.png';
    cartImg.closest('.addtocart').dataset.tooltip = 'Add To Cart';

    if (!cartitemcontainer.querySelector('.row')) {
        cartisempty.style.display = 'block';
    }

    updateCartTotal();
}

// Functions to control the display of the side cart menu
function openmysidecart() {
    
    if (window.matchMedia("(max-width: 1200px)").matches) {
        mysidecart.style.width = "100%";
    }
    else{
        mysidecart.style.width = "35%";
    }
    
}

function closemysidecart() {
    mysidecart.style.width = "0";
}

// Side Navigation

document.querySelectorAll('.landingPages').forEach(item => {
    const arrowIcon = item.querySelector('i');
    const subList = item.querySelector('.subLandingPages');

    item.addEventListener('click', () => {
        const isVisible = subList.classList.contains('show');

        // Hide all sub-lists
        document.querySelectorAll('.subLandingPages').forEach(sub => {
            sub.classList.remove('show');
            sub.style.maxHeight = null;
        });
        document.querySelectorAll('.landingPages i').forEach(icon => {
            icon.classList.remove('fa-angle-down');
            icon.classList.add('fa-angle-right');
        });

        // Toggle the clicked sub-list and arrow icon
        if (!isVisible) {
            subList.classList.add('show');
            subList.style.maxHeight = subList.scrollHeight + 'px';
            arrowIcon.classList.remove('fa-angle-right');
            arrowIcon.classList.add('fa-angle-down');
        }
    });
});

const closeButton = document.querySelector('.fa-circle-xmark');
const sideNavContainer = document.querySelector('.sideNavContainer');

closeButton.addEventListener('click', () => {
    sideNavContainer.style.width = '0';
    sideNavContainer.style.padding = '0';
});

const menuButton = document.querySelector('.fa-bars');

// Add event listener to the menu button
menuButton.addEventListener('click', () => {
        sideNavContainer.style.width = '100%';  
        sideNavContainer.style.padding = '20px'; 
        sideNavContainer.style.paddingLeft = '30px'
    }
);
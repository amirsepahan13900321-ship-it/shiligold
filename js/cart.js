/* =========================================================
   SHAYLI GOLD - CART
   js/cart.js
========================================================= */


/* =========================================================
   CART STORAGE KEY
========================================================= */

const SHAILY_CART_STORAGE_KEY = "shailyCart";


/* =========================================================
   LOAD CART
========================================================= */

let shailyCart = [];

try {

    const savedCart =
        localStorage.getItem(
            SHAILY_CART_STORAGE_KEY
        );

    shailyCart =
        savedCart
            ? JSON.parse(savedCart)
            : [];

    if (!Array.isArray(shailyCart)) {
        shailyCart = [];
    }

} catch (error) {

    console.error(
        "خطا در خواندن سبد خرید:",
        error
    );

    shailyCart = [];

}


/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

    try {

        localStorage.setItem(
            SHAILY_CART_STORAGE_KEY,
            JSON.stringify(shailyCart)
        );

        window.shailyCart = shailyCart;

    } catch (error) {

        console.error(
            "خطا در ذخیره سبد خرید:",
            error
        );

    }

}


/* =========================================================
   GET CART
========================================================= */

function getCart() {

    return shailyCart;

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(
    productId,
    quantity = 1,
    size = ""
) {

    const product =
        getProductById(productId);


    /* محصول وجود ندارد */

    if (!product) {

        alert("محصول پیدا نشد.");

        return false;

    }


    /* محصول غیرفعال است */

    if (product.active === false) {

        alert("این محصول در حال حاضر قابل خرید نیست.");

        return false;

    }


    /* موجودی */

    const stock =
        Number(product.stock);


    if (!stock || stock <= 0) {

        alert("این محصول در حال حاضر ناموجود است.");

        return false;

    }


    /* تعداد */

    let requestedQuantity =
        Number(quantity);


    if (
        Number.isNaN(requestedQuantity) ||
        requestedQuantity < 1
    ) {

        requestedQuantity = 1;

    }


    requestedQuantity =
        Math.floor(requestedQuantity);


    /* پیدا کردن محصول موجود در سبد */

    const existingItem =
        shailyCart.find(
            item =>

                Number(item.productId) ===
                    Number(productId)

                &&

                String(item.size || "") ===
                    String(size || "")
        );


    /* اگر قبلاً داخل سبد بوده */

    if (existingItem) {

        let newQuantity =
            Number(existingItem.quantity) +
            requestedQuantity;


        if (newQuantity > stock) {

            newQuantity = stock;

            alert(
                `حداکثر موجودی این محصول ${stock} عدد است.`
            );

        }


        existingItem.quantity =
            newQuantity;

    }

    /* محصول جدید */

    else {

        if (requestedQuantity > stock) {

            requestedQuantity = stock;

        }


        shailyCart.push({

            productId:
                Number(productId),

            quantity:
                requestedQuantity,

            size:
                size || "",

            addedAt:
                new Date().toISOString()

        });

    }


    saveCart();

    updateCartCount();

    renderCart();

    return true;

}


/* =========================================================
   REMOVE FROM CART
========================================================= */

function removeFromCart(
    productId,
    size = ""
) {

    shailyCart =
        shailyCart.filter(
            item =>

                !(
                    Number(item.productId) ===
                        Number(productId)

                    &&

                    String(item.size || "") ===
                        String(size || "")
                )
        );


    saveCart();

    updateCartCount();

    renderCart();

}


/* =========================================================
   UPDATE QUANTITY
========================================================= */

function updateCartQuantity(
    productId,
    quantity,
    size = ""
) {

    const item =
        shailyCart.find(
            item =>

                Number(item.productId) ===
                    Number(productId)

                &&

                String(item.size || "") ===
                    String(size || "")
        );


    if (!item) {

        return;

    }


    const product =
        getProductById(productId);


    if (!product) {

        return;

    }


    let newQuantity =
        Number(quantity);


    if (
        Number.isNaN(newQuantity) ||
        newQuantity < 1
    ) {

        newQuantity = 1;

    }


    newQuantity =
        Math.floor(newQuantity);


    const stock =
        Number(product.stock);


    if (
        stock > 0 &&
        newQuantity > stock
    ) {

        newQuantity = stock;

    }


    item.quantity =
        newQuantity;


    saveCart();

    updateCartCount();

    renderCart();

}


/* =========================================================
   CLEAR CART
========================================================= */

function clearCart() {

    shailyCart = [];

    saveCart();

    updateCartCount();

    renderCart();

}


/* =========================================================
   CART COUNT
========================================================= */

function getCartCount() {

    return shailyCart.reduce(
        (total, item) => {

            const quantity =
                Number(item.quantity);

            return total +
                (
                    Number.isFinite(quantity)
                        ? quantity
                        : 0
                );

        },
        0
    );

}


/* =========================================================
   UPDATE CART COUNT
========================================================= */

function updateCartCount() {

    const count =
        getCartCount();


    const formattedCount =
        count.toLocaleString("fa-IR");


    document
        .querySelectorAll(
            "[data-cart-count]"
        )
        .forEach(element => {

            element.textContent =
                formattedCount;

        });


    document
        .querySelectorAll(
            ".cart-count"
        )
        .forEach(element => {

            element.textContent =
                formattedCount;

        });

}


/* =========================================================
   GET CART DETAILS
========================================================= */

function getCartDetails() {

    return shailyCart
        .map(item => {

            const product =
                getProductById(
                    item.productId
                );


            if (!product) {

                return null;

            }


            const quantity =
                Number(item.quantity);


            const unitPrice =
                calculateProductPrice(
                    product
                );


            return {

                productId:
                    product.id,

                product:
                    product,

                quantity:
                    quantity,

                size:
                    item.size || "",

                unitPrice:
                    unitPrice,

                totalPrice:
                    unitPrice *
                    quantity

            };

        })
        .filter(Boolean);

}


/* =========================================================
   CART SUBTOTAL
========================================================= */

function getCartSubtotal() {

    return getCartDetails()
        .reduce(
            (total, item) =>

                total +
                Number(item.totalPrice),

            0
        );

}


/* =========================================================
   SHIPPING
========================================================= */

function getShippingCost() {

    const subtotal =
        getCartSubtotal();


    if (subtotal <= 0) {

        return 0;

    }


    /*
        فعلاً ارسال رایگان است.
        بعداً می‌توانیم هزینه ارسال
        را بر اساس شهر تعیین کنیم.
    */

    return 0;

}


/* =========================================================
   CART TOTAL
========================================================= */

function getCartTotal() {

    return (
        getCartSubtotal() +
        getShippingCost()
    );

}


/* =========================================================
   CART ITEM
========================================================= */

function createCartItem(item) {

    const product =
        item.product;


    const image =
        getProductImage(product);


    return `

        <div
            class="cart-item"
            data-cart-product="${product.id}"
        >

            <!-- IMAGE -->

            <div class="cart-item-image">

                <img
                    src="${image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="
                        this.onerror=null;
                        this.src='assets/images/image10.jpg';
                    "
                >

            </div>


            <!-- INFO -->

            <div class="cart-item-info">

                <h3>
                    ${product.name}
                </h3>


                <p>
                    وزن:
                    ${product.weight}
                    گرم
                </p>


                <p>
                    عیار:
                    ${product.purity}
                </p>


                ${
                    item.size
                        ? `
                            <p>
                                سایز:
                                ${item.size}
                            </p>
                        `
                        : ""
                }


                <p class="cart-item-price">

                    ${formatPrice(item.unitPrice)}

                </p>

            </div>


            <!-- QUANTITY -->

            <div class="cart-item-quantity">

                <button
                    type="button"
                    class="quantity-btn"
                    data-cart-minus
                    data-product-id="${product.id}"
                    data-size="${item.size}"
                    aria-label="کاهش تعداد"
                >
                    −
                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    type="button"
                    class="quantity-btn"
                    data-cart-plus
                    data-product-id="${product.id}"
                    data-size="${item.size}"
                    aria-label="افزایش تعداد"
                >
                    +
                </button>

            </div>


            <!-- TOTAL -->

            <div class="cart-item-total">

                ${formatPrice(item.totalPrice)}

            </div>


            <!-- REMOVE -->

            <button
                type="button"
                class="remove-cart-item"
                data-remove-cart
                data-product-id="${product.id}"
                data-size="${item.size}"
                aria-label="حذف محصول"
            >
                ×
            </button>

        </div>

    `;

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    const container =
        document.querySelector(
            "[data-cart-container]"
        );


    if (!container) {

        return;

    }


    const details =
        getCartDetails();


    if (details.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    🛒
                </div>

                <h3>
                    سبد خرید شما خالی است
                </h3>

                <p>
                    هنوز محصولی به سبد خرید اضافه نکرده‌اید.
                </p>

                <a
                    href="shop.html"
                    class="btn btn-gold"
                >
                    مشاهده فروشگاه
                </a>

            </div>

        `;


        updateCartSummary();

        return;

    }


    container.innerHTML =
        details
            .map(createCartItem)
            .join("");


    updateCartSummary();

}


/* =========================================================
   UPDATE CART SUMMARY
========================================================= */

function updateCartSummary() {

    const subtotal =
        getCartSubtotal();


    const shipping =
        getShippingCost();


    const total =
        subtotal +
        shipping;


    document
        .querySelectorAll(
            "[data-cart-subtotal]"
        )
        .forEach(element => {

            element.textContent =
                formatPrice(subtotal);

        });


    document
        .querySelectorAll(
            "[data-cart-shipping]"
        )
        .forEach(element => {

            element.textContent =
                shipping > 0
                    ? formatPrice(shipping)
                    : "رایگان";

        });


    document
        .querySelectorAll(
            "[data-cart-total]"
        )
        .forEach(element => {

            element.textContent =
                formatPrice(total);

        });

}


/* =========================================================
   CART EVENTS
========================================================= */

let cartEventsReady = false;


function setupCartEvents() {

    if (cartEventsReady) {

        return;

    }


    cartEventsReady = true;


    document.addEventListener(
        "click",
        function(event) {


            /* =================================================
               ADD TO CART
            ================================================= */

            const addButton =
                event.target.closest(
                    "[data-add-to-cart]"
                );


            if (addButton) {

                const productId =
                    Number(
                        addButton.dataset.addToCart
                    );


                const success =
                    addToCart(
                        productId,
                        1
                    );


                if (success) {

                    addButton.classList.add(
                        "added"
                    );


                    const oldText =
                        addButton.textContent;


                    addButton.textContent =
                        "✓ اضافه شد";


                    setTimeout(
                        () => {

                            addButton.textContent =
                                oldText;

                            addButton.classList.remove(
                                "added"
                            );

                        },
                        1200
                    );

                }


                return;

            }


            /* =================================================
               REMOVE
            ================================================= */

            const removeButton =
                event.target.closest(
                    "[data-remove-cart]"
                );


            if (removeButton) {

                removeFromCart(

                    Number(
                        removeButton.dataset.productId
                    ),

                    removeButton.dataset.size || ""

                );


                return;

            }


            /* =================================================
               MINUS
            ================================================= */

            const minusButton =
                event.target.closest(
                    "[data-cart-minus]"
                );


            if (minusButton) {

                const productId =
                    Number(
                        minusButton.dataset.productId
                    );


                const size =
                    minusButton.dataset.size || "";


                const item =
                    shailyCart.find(
                        item =>

                            Number(item.productId) ===
                                productId

                            &&

                            String(item.size || "") ===
                                String(size)
                    );


                if (item) {

                    updateCartQuantity(

                        productId,

                        Number(item.quantity) - 1,

                        size

                    );

                }


                return;

            }


            /* =================================================
               PLUS
            ================================================= */

            const plusButton =
                event.target.closest(
                    "[data-cart-plus]"
                );


            if (plusButton) {

                const productId =
                    Number(
                        plusButton.dataset.productId
                    );


                const size =
                    plusButton.dataset.size || "";


                const item =
                    shailyCart.find(
                        item =>

                            Number(item.productId) ===
                                productId

                            &&

                            String(item.size || "") ===
                                String(size)
                    );


                if (item) {

                    updateCartQuantity(

                        productId,

                        Number(item.quantity) + 1,

                        size

                    );

                }


                return;

            }


            /* =================================================
               CLEAR
            ================================================= */

            const clearButton =
                event.target.closest(
                    "[data-clear-cart]"
                );


            if (clearButton) {

                clearCart();

                return;

            }

        }
    );

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        renderCart();

        setupCartEvents();

    }
);


/* =========================================================
   GLOBAL
========================================================= */

window.shailyCart =
    shailyCart;


window.getCart =
    getCart;


window.addToCart =
    addToCart;


window.removeFromCart =
    removeFromCart;


window.updateCartQuantity =
    updateCartQuantity;


window.clearCart =
    clearCart;


window.getCartCount =
    getCartCount;


window.updateCartCount =
    updateCartCount;


window.getCartDetails =
    getCartDetails;


window.getCartSubtotal =
    getCartSubtotal;


window.getShippingCost =
    getShippingCost;


window.getCartTotal =
    getCartTotal;


window.createCartItem =
    createCartItem;


window.renderCart =
    renderCart;


window.updateCartSummary =
    updateCartSummary;
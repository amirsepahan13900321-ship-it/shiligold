/* =========================================================
   SHAILY GOLD & JEWELRY
   CHECKOUT.JS
   مدیریت صفحه ثبت سفارش
========================================================= */


/* =========================================================
   1. کلید سفارش‌ها
========================================================= */

const SHAILY_ORDERS_KEY = "shailyOrders";


/* =========================================================
   2. دریافت سفارش‌ها
========================================================= */

function getOrders() {

    try {

        const saved =
            localStorage.getItem(
                SHAILY_ORDERS_KEY
            );

        const orders =
            saved
                ? JSON.parse(saved)
                : [];

        return Array.isArray(orders)
            ? orders
            : [];

    } catch (error) {

        console.error(
            "خطا در دریافت سفارش‌ها:",
            error
        );

        return [];

    }

}


/* =========================================================
   3. ذخیره سفارش‌ها
========================================================= */

function saveOrders(orders) {

    localStorage.setItem(
        SHAILY_ORDERS_KEY,
        JSON.stringify(orders)
    );

}


/* =========================================================
   4. دریافت اطلاعات کاربر
========================================================= */

function getCheckoutUser() {

    if (
        typeof getCurrentUser !==
        "function"
    ) {
        return null;
    }

    return getCurrentUser();

}


/* =========================================================
   5. نمایش اطلاعات خلاصه سبد
========================================================= */

function renderCheckoutItems() {

    const container =
        document.getElementById(
            "checkoutItems"
        );


    if (!container) {
        return;
    }


    if (
        typeof shailyCart ===
        "undefined" ||
        !Array.isArray(shailyCart)
    ) {

        container.innerHTML = `
            <p>
                سبد خرید قابل دسترسی نیست.
            </p>
        `;

        return;

    }


    if (shailyCart.length === 0) {

        container.innerHTML = `

            <div class="empty-checkout">

                <h3>
                    سبد خرید خالی است
                </h3>

                <a
                    href="shop.html"
                    class="btn btn-primary"
                >
                    بازگشت به فروشگاه
                </a>

            </div>

        `;

        return;

    }


    container.innerHTML =
        shailyCart
            .map(
                item => {

                    const product =
                        getProductById(
                            item.productId
                        );


                    if (!product) {
                        return "";
                    }


                    const price =
                        calculateProductPrice(
                            product
                        );


                    const total =
                        price *
                        Number(item.quantity);


                    return `

                        <div
                            class="checkout-item"
                        >

                            <div class="checkout-item-image">

                                <img
                                    src="${product.image}"
                                    alt="${product.name}"
                                >

                            </div>


                            <div class="checkout-item-info">

                                <h4>
                                    ${product.name}
                                </h4>

                                <span>
                                    تعداد:
                                    ${item.quantity}
                                </span>

                                ${
                                    item.size
                                        ? `
                                            <span>
                                                سایز:
                                                ${item.size}
                                            </span>
                                        `
                                        : ""
                                }

                            </div>


                            <div class="checkout-item-price">

                                ${
                                    total > 0
                                        ? formatPrice(total)
                                        : "قیمت در حال دریافت..."
                                }

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   6. خلاصه مبلغ سفارش
========================================================= */

function renderCheckoutSummary() {

    const subtotal =
        typeof getCartSubtotal ===
        "function"
            ? getCartSubtotal()
            : 0;


    const shipping =
        typeof getShippingCost ===
        "function"
            ? getShippingCost()
            : 0;


    const total =
        subtotal +
        shipping;


    const subtotalElement =
        document.getElementById(
            "checkoutSubtotal"
        );


    const shippingElement =
        document.getElementById(
            "checkoutShipping"
        );


    const totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            formatPrice(subtotal);

    }


    if (shippingElement) {

        shippingElement.textContent =
            shipping > 0
                ? formatPrice(shipping)
                : "رایگان";

    }


    if (totalElement) {

        totalElement.textContent =
            formatPrice(total);

    }

}


/* =========================================================
   7. پر کردن اطلاعات کاربر
========================================================= */

function fillCheckoutUserInfo() {

    const user =
        getCheckoutUser();


    if (!user) {
        return;
    }


    const nameInput =
        document.getElementById(
            "checkoutName"
        );


    const emailInput =
        document.getElementById(
            "checkoutEmail"
        );


    const phoneInput =
        document.getElementById(
            "checkoutPhone"
        );


    if (nameInput) {

        nameInput.value =
            user.name || "";

    }


    if (emailInput) {

        emailInput.value =
            user.email || "";

    }


    if (phoneInput) {

        phoneInput.value =
            user.phone || "";

    }

}


/* =========================================================
   8. اعتبارسنجی فرم سفارش
========================================================= */

function validateCheckoutForm() {

    const name =
        document.getElementById(
            "checkoutName"
        )?.value.trim();


    const email =
        document.getElementById(
            "checkoutEmail"
        )?.value.trim();


    const phone =
        document.getElementById(
            "checkoutPhone"
        )?.value.trim();


    const province =
        document.getElementById(
            "checkoutProvince"
        )?.value.trim();


    const city =
        document.getElementById(
            "checkoutCity"
        )?.value.trim();


    const address =
        document.getElementById(
            "checkoutAddress"
        )?.value.trim();


    const postalCode =
        document.getElementById(
            "checkoutPostalCode"
        )?.value.trim();


    if (!name) {

        return {
            valid: false,
            message:
                "لطفاً نام و نام خانوادگی را وارد کنید."
        };

    }


    if (!email) {

        return {
            valid: false,
            message:
                "لطفاً ایمیل را وارد کنید."
        };

    }


    if (!phone) {

        return {
            valid: false,
            message:
                "لطفاً شماره تلفن را وارد کنید."
        };

    }


    if (!province) {

        return {
            valid: false,
            message:
                "لطفاً استان را وارد کنید."
        };

    }


    if (!city) {

        return {
            valid: false,
            message:
                "لطفاً شهر را وارد کنید."
        };

    }


    if (!address) {

        return {
            valid: false,
            message:
                "لطفاً آدرس کامل را وارد کنید."
        };

    }


    if (!postalCode) {

        return {
            valid: false,
            message:
                "لطفاً کد پستی را وارد کنید."
        };

    }


    if (
        postalCode.length !== 10 ||
        !/^\d+$/.test(postalCode)
    ) {

        return {
            valid: false,
            message:
                "کد پستی باید ۱۰ رقم باشد."
        };

    }


    return {
        valid: true
    };

}


/* =========================================================
   9. ساخت شماره سفارش
========================================================= */

function generateOrderNumber() {

    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        String(
            now.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            now.getDate()
        ).padStart(2, "0");


    const random =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return (
        `SH-${year}${month}${day}-${random}`
    );

}


/* =========================================================
   10. ساخت سفارش
========================================================= */

function createOrder() {

    const validation =
        validateCheckoutForm();


    if (!validation.valid) {

        showCheckoutMessage(
            validation.message,
            "error"
        );

        return null;

    }


    if (
        typeof shailyCart ===
            "undefined" ||
        shailyCart.length === 0
    ) {

        showCheckoutMessage(
            "سبد خرید شما خالی است.",
            "error"
        );

        return null;

    }


    const user =
        getCheckoutUser();


    const orderItems =
        shailyCart
            .map(
                item => {

                    const product =
                        getProductById(
                            item.productId
                        );


                    if (!product) {
                        return null;
                    }


                    const unitPrice =
                        calculateProductPrice(
                            product
                        );


                    return {

                        productId:
                            product.id,

                        name:
                            product.name,

                        image:
                            product.image,

                        weight:
                            product.weight,

                        purity:
                            product.purity,

                        quantity:
                            Number(
                                item.quantity
                            ),

                        size:
                            item.size || null,

                        unitPrice:
                            unitPrice,

                        totalPrice:
                            unitPrice *
                            Number(item.quantity)

                    };

                }
            )
            .filter(
                item => item !== null
            );


    if (orderItems.length === 0) {

        showCheckoutMessage(
            "محصول معتبری در سبد خرید وجود ندارد.",
            "error"
        );

        return null;

    }


    const subtotal =
        orderItems.reduce(
            (
                total,
                item
            ) =>
                total +
                item.totalPrice,
            0
        );


    const shipping =
        typeof getShippingCost ===
        "function"
            ? getShippingCost()
            : 0;


    const total =
        subtotal +
        shipping;


    const order = {

        id:
            Date.now(),

        orderNumber:
            generateOrderNumber(),

        userId:
            user?.id || null,

        customer: {

            name:
                document.getElementById(
                    "checkoutName"
                )?.value.trim() || "",

            email:
                document.getElementById(
                    "checkoutEmail"
                )?.value.trim() || "",

            phone:
                document.getElementById(
                    "checkoutPhone"
                )?.value.trim() || ""

        },

        shippingAddress: {

            province:
                document.getElementById(
                    "checkoutProvince"
                )?.value.trim() || "",

            city:
                document.getElementById(
                    "checkoutCity"
                )?.value.trim() || "",

            address:
                document.getElementById(
                    "checkoutAddress"
                )?.value.trim() || "",

            postalCode:
                document.getElementById(
                    "checkoutPostalCode"
                )?.value.trim() || "",

            notes:
                document.getElementById(
                    "checkoutNotes"
                )?.value.trim() || ""

        },

        items:
            orderItems,

        subtotal:
            subtotal,

        shipping:
            shipping,

        total:
            total,

        status:
            "pending",

        paymentStatus:
            "unpaid",

        createdAt:
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString()

    };


    return order;

}


/* =========================================================
   11. ثبت سفارش
========================================================= */

function submitOrder() {

    const order =
        createOrder();


    if (!order) {
        return;
    }


    const orders =
        getOrders();


    orders.push(
        order
    );


    saveOrders(
        orders
    );


    /*
       فعلاً سفارش در سیستم ثبت می‌شود.
       در مرحله بعدی Node.js و درگاه پرداخت
       به این قسمت متصل خواهند شد.
    */

    if (
        typeof clearCart ===
        "function"
    ) {

        clearCart();

    }


    /*
       ذخیره آخرین سفارش برای صفحه نتیجه
    */

    sessionStorage.setItem(
        "shailyLastOrder",
        JSON.stringify(order)
    );


    showCheckoutMessage(
        "سفارش شما با موفقیت ثبت شد.",
        "success"
    );


    setTimeout(
        () => {

            window.location.href =
                "orders.html";

        },
        900
    );

}


/* =========================================================
   12. نمایش پیام checkout
========================================================= */

function showCheckoutMessage(
    message,
    type = "error"
) {

    let box =
        document.getElementById(
            "checkoutMessage"
        );


    if (!box) {

        box =
            document.createElement(
                "div"
            );

        box.id =
            "checkoutMessage";

        box.className =
            "checkout-message";


        const form =
            document.getElementById(
                "checkoutForm"
            );


        if (form) {

            form.prepend(
                box
            );

        } else {

            document.body.prepend(
                box
            );

        }

    }


    box.textContent =
        message;


    box.className =
        `checkout-message ${type}`;


    box.style.display =
        "block";

}


/* =========================================================
   13. مدیریت فرم Checkout
========================================================= */

function initCheckoutForm() {

    const form =
        document.getElementById(
            "checkoutForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            submitOrder();

        }
    );

}


/* =========================================================
   14. بررسی وضعیت صفحه Checkout
========================================================= */

function protectCheckoutPage() {

    const page =
        document.body?.dataset
            ?.checkoutPage;


    if (
        page !== "true"
    ) {

        return;

    }


    if (
        typeof isLoggedIn ===
        "function" &&
        !isLoggedIn()
    ) {

        window.location.href =
            "login.html";

        return;

    }


    if (
        typeof shailyCart !==
            "undefined" &&
        shailyCart.length === 0
    ) {

        window.location.href =
            "cart.html";

    }

}


/* =========================================================
   15. راه‌اندازی Checkout
========================================================= */

function initCheckout() {

    protectCheckoutPage();

    renderCheckoutItems();

    renderCheckoutSummary();

    fillCheckoutUserInfo();

    initCheckoutForm();

}


/* =========================================================
   16. عمومی کردن توابع
========================================================= */

window.getOrders =
    getOrders;

window.saveOrders =
    saveOrders;

window.generateOrderNumber =
    generateOrderNumber;

window.validateCheckoutForm =
    validateCheckoutForm;

window.createOrder =
    createOrder;

window.submitOrder =
    submitOrder;

window.renderCheckoutItems =
    renderCheckoutItems;

window.renderCheckoutSummary =
    renderCheckoutSummary;

window.fillCheckoutUserInfo =
    fillCheckoutUserInfo;

window.showCheckoutMessage =
    showCheckoutMessage;


/* =========================================================
   17. اجرای اولیه
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initCheckout();

    }
);
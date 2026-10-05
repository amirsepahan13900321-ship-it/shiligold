/* =========================================================
   SHAILY GOLD & JEWELRY
   FAVORITES.JS
   مدیریت علاقه‌مندی‌ها
========================================================= */


/* =========================================================
   1. تنظیمات
========================================================= */

const SHAILY_FAVORITES_KEY =
    "shailyFavorites";


/* =========================================================
   2. دریافت علاقه‌مندی‌ها
========================================================= */

let shailyFavorites = [];


function loadFavorites() {

    try {

        const saved =
            localStorage.getItem(
                SHAILY_FAVORITES_KEY
            );


        shailyFavorites =
            saved
                ? JSON.parse(saved)
                : [];


        if (!Array.isArray(shailyFavorites)) {

            shailyFavorites = [];

        }

    } catch (error) {

        console.error(
            "خطا در دریافت علاقه‌مندی‌ها:",
            error
        );

        shailyFavorites = [];

    }

}


/* =========================================================
   3. ذخیره علاقه‌مندی‌ها
========================================================= */

function saveFavorites() {

    localStorage.setItem(
        SHAILY_FAVORITES_KEY,
        JSON.stringify(shailyFavorites)
    );

}


/* =========================================================
   4. بررسی علاقه‌مندی
========================================================= */

function isFavorite(productId) {

    return shailyFavorites.some(
        id =>
            Number(id) ===
            Number(productId)
    );

}


/* =========================================================
   5. افزودن / حذف علاقه‌مندی
========================================================= */

function toggleFavorite(productId) {

    const id =
        Number(productId);


    const product =
        typeof getProductById === "function"
            ? getProductById(id)
            : null;


    if (!product) {

        console.error(
            "محصول موردنظر پیدا نشد."
        );

        return false;

    }


    if (isFavorite(id)) {

        shailyFavorites =
            shailyFavorites.filter(
                favoriteId =>
                    Number(favoriteId) !== id
            );


        showFavoriteMessage(
            "محصول از علاقه‌مندی‌ها حذف شد."
        );


    } else {

        shailyFavorites.push(id);


        showFavoriteMessage(
            "محصول به علاقه‌مندی‌ها اضافه شد."
        );

    }


    saveFavorites();

    updateFavoriteUI();

    renderFavoritesPage();


    return true;

}


/* =========================================================
   6. افزودن مستقیم
========================================================= */

function addToFavorites(productId) {

    const id =
        Number(productId);


    if (!isFavorite(id)) {

        toggleFavorite(id);

    }

}


/* =========================================================
   7. حذف مستقیم
========================================================= */

function removeFromFavorites(productId) {

    const id =
        Number(productId);


    if (isFavorite(id)) {

        toggleFavorite(id);

    }

}


/* =========================================================
   8. تعداد علاقه‌مندی‌ها
========================================================= */

function getFavoritesCount() {

    return shailyFavorites.length;

}


/* =========================================================
   9. بروزرسانی شمارنده
========================================================= */

function updateFavoriteCount() {

    const count =
        getFavoritesCount();


    const elements =
        document.querySelectorAll(
            "[data-favorites-count]"
        );


    elements.forEach(
        element => {

            element.textContent =
                count;

            element.classList.toggle(
                "has-items",
                count > 0
            );

        }
    );


    /*
       پشتیبانی از ID موجود در بعضی صفحات
    */

    const oldCounter =
        document.getElementById(
            "favoritesCount"
        );


    if (oldCounter) {

        oldCounter.textContent =
            count;

    }

}


/* =========================================================
   10. بروزرسانی وضعیت دکمه‌های قلب
========================================================= */

function updateFavoriteButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-favorite-id]"
        );


    buttons.forEach(
        button => {

            const id =
                Number(
                    button.dataset.favoriteId
                );


            const active =
                isFavorite(id);


            button.classList.toggle(
                "active",
                active
            );


            button.setAttribute(
                "aria-pressed",
                String(active)
            );


            const icon =
                button.querySelector(
                    ".favorite-icon"
                );


            if (icon) {

                icon.textContent =
                    active
                        ? "♥"
                        : "♡";

            } else {

                /*
                   اگر داخل دکمه فقط متن باشد
                   و آیکون جداگانه نداشته باشد.
                */

                if (
                    button.children.length === 0
                ) {

                    button.textContent =
                        active
                            ? "♥"
                            : "♡";

                }

            }

        }
    );

}


/* =========================================================
   11. بروزرسانی کامل رابط کاربری
========================================================= */

function updateFavoriteUI() {

    updateFavoriteCount();

    updateFavoriteButtons();

}


/* =========================================================
   12. پیام علاقه‌مندی
========================================================= */

function showFavoriteMessage(
    message
) {

    let box =
        document.getElementById(
            "favoriteMessage"
        );


    if (!box) {

        box =
            document.createElement(
                "div"
            );

        box.id =
            "favoriteMessage";

        box.className =
            "favorite-message";


        document.body.appendChild(
            box
        );

    }


    box.textContent =
        message;


    box.classList.add(
        "show"
    );


    setTimeout(
        () => {

            box.classList.remove(
                "show"
            );

        },
        2200
    );

}


/* =========================================================
   13. ساخت کارت علاقه‌مندی
========================================================= */

function createFavoriteCard(
    product
) {

    if (!product) {
        return "";
    }


    const price =
        typeof calculateProductPrice === "function"
            ? calculateProductPrice(product)
            : 0;


    return `

        <article
            class="product-card favorite-card"
            data-product-id="${product.id}"
        >

            <div class="favorite-card-image">

                <a
                    href="product.html?id=${product.id}"
                    class="product-image"
                >

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="this.style.display='none';"
                    >

                </a>


                <button
                    type="button"
                    class="favorite-remove-btn active"
                    onclick="removeFromFavorites(${product.id})"
                    aria-label="حذف از علاقه‌مندی‌ها"
                >
                    ♥
                </button>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.categoryName}
                </span>


                <h3 class="product-title">

                    <a
                        href="product.html?id=${product.id}"
                    >
                        ${product.name}
                    </a>

                </h3>


                <div class="product-meta">

                    <span>
                        وزن:
                        ${product.weight}
                        گرم
                    </span>

                    <span>
                        عیار:
                        ${product.purity}
                    </span>

                </div>


                <div class="product-bottom">

                    <div class="product-price">

                        ${
                            price > 0
                                ? formatPrice(price)
                                : "قیمت در حال دریافت..."
                        }

                    </div>

                </div>


                <a
                    href="product.html?id=${product.id}"
                    class="btn btn-primary product-view-btn"
                >
                    مشاهده محصول
                </a>

            </div>

        </article>

    `;

}


/* =========================================================
   14. نمایش صفحه علاقه‌مندی‌ها
========================================================= */

function renderFavoritesPage() {

    const container =
        document.getElementById(
            "favoritesProducts"
        );


    if (!container) {
        return;
    }


    if (
        shailyFavorites.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-favorites">

                <div class="empty-favorites-icon">
                    ♡
                </div>

                <h3>
                    لیست علاقه‌مندی‌های شما خالی است
                </h3>

                <p>
                    محصولاتی را که دوست دارید
                    به علاقه‌مندی‌ها اضافه کنید.
                </p>

                <a
                    href="shop.html"
                    class="btn btn-primary"
                >
                    مشاهده فروشگاه
                </a>

            </div>

        `;

        return;

    }


    const products =
        shailyFavorites
            .map(
                id =>
                    typeof getProductById === "function"
                        ? getProductById(id)
                        : null
            )
            .filter(
                product =>
                    product &&
                    product.active
            );


    if (products.length === 0) {

        container.innerHTML = `

            <div class="empty-favorites">

                <h3>
                    محصولی در لیست علاقه‌مندی‌ها وجود ندارد.
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
        products
            .map(createFavoriteCard)
            .join("");

}


/* =========================================================
   15. تغییر وضعیت قلب‌ها با کلیک
========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-favorite-id]"
            );


        if (!button) {
            return;
        }


        event.preventDefault();


        const productId =
            button.dataset.favoriteId;


        toggleFavorite(
            productId
        );

    }
);


/* =========================================================
   16. راه‌اندازی
========================================================= */

function initFavorites() {

    loadFavorites();

    updateFavoriteUI();

    renderFavoritesPage();

}


/* =========================================================
   17. عمومی کردن توابع
========================================================= */

window.shailyFavorites =
    shailyFavorites;

window.loadFavorites =
    loadFavorites;

window.saveFavorites =
    saveFavorites;

window.isFavorite =
    isFavorite;

window.toggleFavorite =
    toggleFavorite;

window.addToFavorites =
    addToFavorites;

window.removeFromFavorites =
    removeFromFavorites;

window.getFavoritesCount =
    getFavoritesCount;

window.updateFavoriteCount =
    updateFavoriteCount;

window.updateFavoriteButtons =
    updateFavoriteButtons;

window.updateFavoriteUI =
    updateFavoriteUI;

window.renderFavoritesPage =
    renderFavoritesPage;


/* =========================================================
   18. اجرای اولیه
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initFavorites();

    }
);
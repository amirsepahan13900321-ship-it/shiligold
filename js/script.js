/* =========================================================
   SHAILY GOLD & JEWELRY
   SCRIPT.JS
   اسکریپت اصلی سایت
========================================================= */


/* =========================================================
   1. ابزارهای عمومی
========================================================= */

function shailyQuery(selector) {

    return document.querySelector(selector);

}


function shailyQueryAll(selector) {

    return document.querySelectorAll(selector);

}


/* =========================================================
   2. منوی موبایل
========================================================= */

function initMobileMenu() {

    const menuButton =
        document.querySelector(
            "[data-mobile-menu]"
        );


    const nav =
        document.querySelector(
            "[data-main-nav]"
        );


    if (!menuButton || !nav) {

        return;

    }


    menuButton.addEventListener(
        "click",
        () => {

            nav.classList.toggle(
                "mobile-open"
            );

            menuButton.classList.toggle(
                "active"
            );

        }
    );


    const navLinks =
        nav.querySelectorAll("a");


    navLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove(
                        "mobile-open"
                    );

                    menuButton.classList.remove(
                        "active"
                    );

                }
            );

        }
    );

}


/* =========================================================
   3. جستجوی سایت
========================================================= */

function initSearch() {

    const searchInputs =
        document.querySelectorAll(
            "[data-search-input]"
        );


    searchInputs.forEach(
        input => {

            input.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key !== "Enter"
                    ) {

                        return;

                    }


                    const query =
                        input.value.trim();


                    if (!query) {

                        return;

                    }


                    window.location.href =
                        "search.html?q=" +
                        encodeURIComponent(
                            query
                        );

                }
            );

        }
    );


    const searchButtons =
        document.querySelectorAll(
            "[data-search-button]"
        );


    searchButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const input =
                        document.querySelector(
                            "[data-search-input]"
                        );


                    if (!input) {

                        return;

                    }


                    const query =
                        input.value.trim();


                    if (!query) {

                        input.focus();

                        return;

                    }


                    window.location.href =
                        "search.html?q=" +
                        encodeURIComponent(
                            query
                        );

                }
            );

        }
    );

}


/* =========================================================
   4. خواندن پارامتر جستجو از URL
========================================================= */

function getUrlSearchQuery() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return (
        params.get("q") || ""
    ).trim();

}


/* =========================================================
   5. فعال کردن جستجو در صفحه
========================================================= */

function initSearchPage() {

    const query =
        getUrlSearchQuery();


    if (!query) {

        return;

    }


    const input =
        document.querySelector(
            "[data-search-input]"
        );


    if (input) {

        input.value =
            query;

    }


    if (
        typeof searchProducts ===
        "function"
    ) {

        const results =
            searchProducts(
                query
            );


        if (
            typeof renderProducts ===
            "function"
        ) {

            renderProducts(
                results,
                "#searchResults"
            );

        }

    }

}


/* =========================================================
   6. اسکرول نرم
========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );

}


/* =========================================================
   7. لینک‌های علاقه‌مندی
========================================================= */

function initFavoriteButtons() {

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


            const productId =
                Number(
                    button.dataset.favoriteId
                );


            if (
                !productId ||
                typeof toggleFavorite !==
                "function"
            ) {

                return;

            }


            toggleFavorite(
                productId
            );


            if (
                typeof updateFavoriteButtons ===
                "function"
            ) {

                updateFavoriteButtons();

            }

        }
    );

}


/* =========================================================
   8. لینک‌های افزودن به سبد
========================================================= */

function initAddToCartButtons() {

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-add-to-cart]"
                );


            if (!button) {

                return;

            }


            event.preventDefault();


            const productId =
                Number(
                    button.dataset.addToCart
                );


            if (
                !productId ||
                typeof addToCart !==
                "function"
            ) {

                return;

            }


            const quantity =
                Number(
                    button.dataset.quantity ||
                    1
                );


            const size =
                button.dataset.size ||
                null;


            const result =
                addToCart(
                    productId,
                    quantity,
                    size
                );


            if (
                result &&
                result.success &&
                typeof showCartMessage ===
                "function"
            ) {

                showCartMessage(
                    "محصول با موفقیت به سبد خرید اضافه شد."
                );

            }

        }
    );

}


/* =========================================================
   9. بروزرسانی شمارنده‌ها
========================================================= */

function updateGlobalCounters() {

    if (
        typeof updateCartCount ===
        "function"
    ) {

        updateCartCount();

    }


    if (
        typeof updateFavoriteCount ===
        "function"
    ) {

        updateFavoriteCount();

    }


    if (
        typeof updateAuthUI ===
        "function"
    ) {

        updateAuthUI();

    }

}


/* =========================================================
   10. سال فعلی فوتر
========================================================= */

function updateCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    if (!yearElements.length) {

        return;

    }


    const currentYear =
        new Intl.DateTimeFormat(
            "fa-IR",
            {
                year: "numeric"
            }
        ).format(
            new Date()
        );


    yearElements.forEach(
        element => {

            element.textContent =
                currentYear;

        }
    );

}


/* =========================================================
   11. دکمه بازگشت به بالا
========================================================= */

function initBackToTop() {

    const button =
        document.querySelector(
            "[data-back-to-top]"
        );


    if (!button) {

        return;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 500
            ) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   12. انیمیشن ورود بخش‌ها
========================================================= */

function initRevealAnimation() {

    const elements =
        document.querySelectorAll(
            "[data-reveal]"
        );


    if (
        !elements.length ||
        !("IntersectionObserver" in window)
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   13. مدیریت لینک حساب کاربری
========================================================= */

function initAccountLinks() {

    const accountLinks =
        document.querySelectorAll(
            "[data-account-link]"
        );


    accountLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    if (
                        typeof isLoggedIn !==
                        "function"
                    ) {

                        return;

                    }


                    if (isLoggedIn()) {

                        link.href =
                            "account.html";

                    } else {

                        event.preventDefault();

                        window.location.href =
                            "login.html";

                    }

                }
            );

        }
    );

}


/* =========================================================
   14. خروج از حساب
========================================================= */

function initLogoutButtons() {

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-logout]"
                );


            if (!button) {

                return;

            }


            event.preventDefault();


            if (
                typeof logoutUser ===
                "function"
            ) {

                logoutUser();

            }


            window.location.href =
                "index.html";

        }
    );

}


/* =========================================================
   15. پیام عمومی سایت
========================================================= */

function showShailyMessage(
    message,
    type = "info"
) {

    let box =
        document.getElementById(
            "shailyGlobalMessage"
        );


    if (!box) {

        box =
            document.createElement(
                "div"
            );


        box.id =
            "shailyGlobalMessage";


        document.body.appendChild(
            box
        );

    }


    box.textContent =
        message;


    box.className =
        `shaily-global-message ${type}`;


    box.classList.add(
        "show"
    );


    setTimeout(
        () => {

            box.classList.remove(
                "show"
            );

        },
        3000
    );

}


/* =========================================================
   16. بررسی صفحه فعلی
========================================================= */

function getCurrentPage() {

    const path =
        window.location.pathname;


    const fileName =
        path
            .split("/")
            .pop();


    return fileName ||
        "index.html";

}


/* =========================================================
   17. اجرای اسکریپت‌های عمومی
========================================================= */

function initShailySite() {

    initMobileMenu();

    initSearch();

    initSearchPage();

    initSmoothScroll();

    initFavoriteButtons();

    initAddToCartButtons();

    updateGlobalCounters();

    updateCurrentYear();

    initBackToTop();

    initRevealAnimation();

    initAccountLinks();

    initLogoutButtons();


    console.log(
        "Shaily Gold website initialized:",
        getCurrentPage()
    );

}


/* =========================================================
   18. اجرای اصلی
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initShailySite();

    }
);


/* =========================================================
   19. عمومی کردن توابع
========================================================= */

window.shailyQuery =
    shailyQuery;

window.shailyQueryAll =
    shailyQueryAll;

window.getUrlSearchQuery =
    getUrlSearchQuery;

window.getCurrentPage =
    getCurrentPage;

window.showShailyMessage =
    showShailyMessage;

window.initShailySite =
    initShailySite;
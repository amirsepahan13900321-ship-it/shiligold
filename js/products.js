/* =========================================================
   SHAYLI GOLD - PRODUCTS
   js/products.js
========================================================= */


/* =========================================================
   STORE CONFIG
========================================================= */

const SHAILY_CONFIG = {

    storeName: "شایلی طلا و جواهرات",

    currency: "تومان",

    defaultGold18Price: 0,

    shippingCost: 0

};


/* =========================================================
   IMAGE PATH
========================================================= */

const SHAILY_IMAGE_BASE = "assets/images/";


function getProductImage(product) {

    if (!product || !product.image) {

        return `${SHAILY_IMAGE_BASE}image10.jpg`;

    }


    const image =
        String(product.image).trim();


    if (
        image.startsWith("http://") ||
        image.startsWith("https://") ||
        image.startsWith("/")
    ) {

        return image;

    }


    if (image.startsWith("assets/")) {

        return image;

    }


    return `${SHAILY_IMAGE_BASE}${image}`;

}


/* =========================================================
   CATEGORIES
========================================================= */

const SHAILY_CATEGORIES = [

    {
        id: "ring",
        name: "انگشتر",
        icon: "💍"
    },

    {
        id: "anklet",
        name: "پابند",
        icon: "✨"
    },

    {
        id: "bracelet",
        name: "دستبند",
        icon: "📿"
    },

    {
        id: "necklace",
        name: "گردنبند",
        icon: "📿"
    },

    {
        id: "earring",
        name: "گوشواره",
        icon: "💎"
    },

    {
        id: "set",
        name: "ست طلا",
        icon: "👑"
    },

    {
        id: "watch",
        name: "ساعت طلا",
        icon: "⌚"
    }

];


/* =========================================================
   PRODUCTS
========================================================= */

const SHAILY_PRODUCTS = [

    /* =====================================================
       1. RING
    ===================================================== */

    {
        id: 1,

        name: "انگشتر طلا",

        category: "ring",

        categoryName: "انگشتر",

        image: "image10.jpg",

        weight: 3.2,

        purity: 18,

        wagePercent: 10,

        profitPercent: 7,

        taxPercent: 10,

        stock: 1,

        featured: true,

        isNew: true,

        active: true,

        description:
            "انگشتر طلای زیبا با طراحی ظریف و شیک.",

        sizes: [
            "52",
            "54",
            "56",
            "58"
        ]

    },


    /* =====================================================
       2. ANKLET
    ===================================================== */

    {
        id: 2,

        name: "پابند طلا",

        category: "anklet",

        categoryName: "پابند",

        image: "image9.jpg",

        weight: 5.2,

        purity: 18,

        wagePercent: 12,

        profitPercent: 7,

        taxPercent: 10,

        stock: 1,

        featured: true,

        isNew: true,

        active: true,

        description:
            "پابند طلای ظریف و زیبا با طراحی جذاب.",

        sizes: [
            "22",
            "23",
            "24",
            "25"
        ]

    },


    /* =====================================================
       3. BRACELET
    ===================================================== */

    {
        id: 3,

        name: "دستبند طلا مدل ۱",

        category: "bracelet",

        categoryName: "دستبند",

        image: "image2.jpg",

        weight: 6.5,

        purity: 18,

        wagePercent: 10,

        profitPercent: 7,

        taxPercent: 10,

        stock: 1,

        featured: true,

        isNew: true,

        active: true,

        description:
            "دستبند طلای شیک و ظریف.",

        sizes: [
            "16",
            "17",
            "18",
            "19",
            "20"
        ]

    },


    /* =====================================================
       4. BRACELET
    ===================================================== */

    {
        id: 4,

        name: "دستبند طلا مدل ۲",

        category: "bracelet",

        categoryName: "دستبند",

        image: "image8.jpg",

        weight: 7.4,

        purity: 18,

        wagePercent: 11,

        profitPercent: 7,

        taxPercent: 10,

        stock: 1,

        featured: true,

        isNew: true,

        active: true,

        description:
            "دستبند طلای زیبا با طراحی مدرن.",

        sizes: [
            "16",
            "17",
            "18",
            "19",
            "20"
        ]

    },


    /* =====================================================
       5. BRACELET
    ===================================================== */

    {
        id: 5,

        name: "دستبند طلا مدل ۳",

        category: "bracelet",

        categoryName: "دستبند",

        image: "image14.jpg",

        weight: 8.2,

        purity: 18,

        wagePercent: 12,

        profitPercent: 7,

        taxPercent: 10,

        stock: 1,

        featured: true,

        isNew: false,

        active: true,

        description:
            "دستبند طلای خاص و لوکس.",

        sizes: [
            "16",
            "17",
            "18",
            "19",
            "20"
        ]

    },


    /* =====================================================
       6. NECKLACE
    ===================================================== */

    {
        id: 6,

        name: "گردنبند طلا",

        category: "necklace",

        categoryName: "گردنبند",

        image: "image1.jpg",

        weight: 7.8,

        purity: 18,

        wagePercent: 12,

        profitPercent: 7,

        taxPercent: 10,

        stock: 1,

        featured: true,

        isNew: true,

        active: true,

        description:
            "گردنبند طلای ظریف و زیبا.",

        sizes: [
            "40",
            "45",
            "50"
        ]

    },


    /* =====================================================
       7. EARRING
    ===================================================== */

    {
        id: 7,

        name: "گوشواره طلا",

        category: "earring",

        categoryName: "گوشواره",

        image: "image4.jpg",

        weight: 3.5,

        purity: 18,

        wagePercent: 11,

        profitPercent: 7,

        taxPercent: 10,

        stock: 1,

        featured: true,

        isNew: true,

        active: true,

        description:
            "گوشواره طلای ظریف و شیک.",

        sizes: []

    },


    /* =====================================================
       8. GOLD SET
    ===================================================== */

    {
        id: 8,

        name: "ست طلا مدل ۱",

        category: "set",

        categoryName: "ست طلا",

        image: "image3.jpg",

        weight: 12.5,

        purity: 18,

        wagePercent: 13,

        profitPercent: 7,

        taxPercent: 10,

        stock: 1,

        featured: true,

        isNew: true,

        active: true,

        description:
            "ست طلای زیبا و هماهنگ.",

        sizes: []

    },


    /* =====================================================
       9. GOLD SET
    ===================================================== */

    {
        id: 9,

        name: "ست طلا مدل ۲",

        category: "set",

        categoryName: "ست طلا",

        image: "image5.jpg",

        weight: 15.2,

        purity: 18,

        wagePercent: 14,

        profitPercent: 7,

        taxPercent: 10,

        stock: 1,

        featured: true,

        isNew: false,

        active: true,

        description:
            "ست طلای لوکس مناسب مناسبت‌های خاص.",

        sizes: []

    },


    /* =====================================================
       10. WATCH
    ===================================================== */

    {
        id: 10,

        name: "ساعت طلا",

        category: "watch",

        categoryName: "ساعت طلا",

        image: "image11.jpg",

        weight: 18.5,

        purity: 18,

        wagePercent: 15,

        profitPercent: 7,

        taxPercent: 10,

        stock: 1,

        featured: true,

        isNew: true,

        active: true,

        description:
            "ساعت طلای لوکس با طراحی کلاسیک.",

        sizes: []

    }

];


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(price) {

    if (
        price === null ||
        price === undefined ||
        Number.isNaN(Number(price))
    ) {

        return "قیمت نامشخص";

    }


    return (
        Number(price).toLocaleString("fa-IR")
        + " تومان"
    );

}


/* =========================================================
   CURRENT GOLD PRICE
========================================================= */

function getCurrentGoldPrice() {

    if (
        window.SHAILY_MARKET &&
        Number(
            window.SHAILY_MARKET.gold18Price
        ) > 0
    ) {

        return Number(
            window.SHAILY_MARKET.gold18Price
        );

    }


    const savedPrice =
        localStorage.getItem(
            "shailyGold18Price"
        );


    if (
        savedPrice &&
        Number(savedPrice) > 0
    ) {

        return Number(savedPrice);

    }


    return 0;

}


/* =========================================================
   CALCULATE PRODUCT PRICE
========================================================= */

function calculateProductPrice(product) {

    const goldPrice =
        getCurrentGoldPrice();


    if (
        !goldPrice ||
        goldPrice <= 0
    ) {

        return 0;

    }


    const goldValue =
        goldPrice *
        Number(product.weight);


    const wage =
        goldValue *
        (
            Number(product.wagePercent)
            / 100
        );


    const profitBase =
        goldValue +
        wage;


    const profit =
        profitBase *
        (
            Number(product.profitPercent)
            / 100
        );


    const beforeTax =
        goldValue +
        wage +
        profit;


    const tax =
        beforeTax *
        (
            Number(product.taxPercent)
            / 100
        );


    return Math.round(
        beforeTax + tax
    );

}


/* =========================================================
   GET PRODUCT BY ID
========================================================= */

function getProductById(id) {

    return SHAILY_PRODUCTS.find(
        product =>
            Number(product.id) ===
            Number(id)
    );

}


/* =========================================================
   CATEGORY PRODUCTS
========================================================= */

function getProductsByCategory(category) {

    return SHAILY_PRODUCTS.filter(
        product =>
            product.active &&
            product.category === category
    );

}


/* =========================================================
   FEATURED PRODUCTS
========================================================= */

function getFeaturedProducts() {

    return SHAILY_PRODUCTS.filter(
        product =>
            product.active &&
            product.featured
    );

}


/* =========================================================
   NEW PRODUCTS
========================================================= */

function getNewProducts() {

    return SHAILY_PRODUCTS.filter(
        product =>
            product.active &&
            product.isNew
    );

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const price =
        calculateProductPrice(product);


    const priceHTML =
        price > 0
            ? formatPrice(price)
            : "قیمت در حال دریافت...";


    const stockHTML =
        product.stock > 0
            ? `موجودی: ${product.stock}`
            : "ناموجود";


    const image =
        getProductImage(product);


    return `

        <article
            class="product-card"
            data-product-id="${product.id}"
        >

            <a
                href="product.html?id=${product.id}"
                class="product-image"
            >

                <img
                    src="${image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="
                        this.onerror=null;
                        this.src='assets/images/image10.jpg';
                    "
                >

            </a>


            <div class="product-card-content">

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


                <div class="product-price">

                    ${priceHTML}

                </div>


                <div class="product-stock">

                    ${stockHTML}

                </div>


                <div class="product-actions">


                    <a
                        href="product.html?id=${product.id}"
                        class="btn btn-outline"
                    >
                        مشاهده
                    </a>


                    <button
                        type="button"
                        class="btn btn-gold"
                        data-add-to-cart="${product.id}"
                        ${
                            product.stock <= 0
                                ? "disabled"
                                : ""
                        }
                    >
                        افزودن به سبد
                    </button>


                    <button
                        type="button"
                        class="favorite-btn"
                        data-favorite-id="${product.id}"
                        aria-label="افزودن به علاقه‌مندی‌ها"
                    >
                        ♡
                    </button>


                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(
    container,
    products = SHAILY_PRODUCTS
) {

    if (!container) {

        return;

    }


    const activeProducts =
        products.filter(
            product =>
                product.active
        );


    if (
        activeProducts.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    محصولی پیدا نشد
                </h3>

                <p>
                    محصولی با این مشخصات وجود ندارد.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        activeProducts
            .map(createProductCard)
            .join("");

}


/* =========================================================
   RENDER FEATURED PRODUCTS
========================================================= */

function renderFeaturedProducts(
    container
) {

    renderProducts(
        container,
        getFeaturedProducts()
    );

}


/* =========================================================
   SEARCH PRODUCTS
========================================================= */

function searchProducts(query) {

    const search =
        String(query || "")
            .trim()
            .toLowerCase();


    if (!search) {

        return SHAILY_PRODUCTS.filter(
            product =>
                product.active
        );

    }


    return SHAILY_PRODUCTS.filter(
        product =>

            product.active &&

            (

                product.name
                    .toLowerCase()
                    .includes(search)

                ||

                product.categoryName
                    .toLowerCase()
                    .includes(search)

                ||

                product.description
                    .toLowerCase()
                    .includes(search)

            )
    );

}


/* =========================================================
   PRICE FILTER
========================================================= */

function filterProductsByPrice(
    products,
    minPrice = 0,
    maxPrice = Infinity
) {

    return products.filter(
        product => {

            const price =
                calculateProductPrice(
                    product
                );


            return (

                price >=
                Number(minPrice)

                &&

                price <=
                Number(maxPrice)

            );

        }
    );

}


/* =========================================================
   SORT PRODUCTS
========================================================= */

function sortProducts(
    products,
    sortType = "default"
) {

    const result =
        [...products];


    switch (sortType) {


        case "price-low":

            result.sort(
                (a, b) =>
                    calculateProductPrice(a) -
                    calculateProductPrice(b)
            );

            break;


        case "price-high":

            result.sort(
                (a, b) =>
                    calculateProductPrice(b) -
                    calculateProductPrice(a)
            );

            break;


        case "weight-low":

            result.sort(
                (a, b) =>
                    Number(a.weight) -
                    Number(b.weight)
            );

            break;


        case "weight-high":

            result.sort(
                (a, b) =>
                    Number(b.weight) -
                    Number(a.weight)
            );

            break;


        case "newest":

            result.sort(
                (a, b) =>
                    Number(b.isNew) -
                    Number(a.isNew)
            );

            break;

    }


    return result;

}


/* =========================================================
   REFRESH PRODUCT PRICES
========================================================= */

function refreshProductPrices() {

    const productCards =
        document.querySelectorAll(
            "[data-product-id]"
        );


    productCards.forEach(
        card => {

            const productId =
                Number(
                    card.dataset.productId
                );


            const product =
                getProductById(
                    productId
                );


            if (!product) {

                return;

            }


            const price =
                calculateProductPrice(
                    product
                );


            const priceElement =
                card.querySelector(
                    ".product-price"
                );


            if (!priceElement) {

                return;

            }


            priceElement.textContent =
                price > 0
                    ? formatPrice(price)
                    : "قیمت در حال دریافت...";

        }
    );

}


/* =========================================================
   GLOBAL
========================================================= */

window.SHAILY_CONFIG =
    SHAILY_CONFIG;


window.SHAILY_IMAGE_BASE =
    SHAILY_IMAGE_BASE;


window.SHAILY_CATEGORIES =
    SHAILY_CATEGORIES;


window.SHAILY_PRODUCTS =
    SHAILY_PRODUCTS;


window.getProductImage =
    getProductImage;


window.formatPrice =
    formatPrice;


window.getCurrentGoldPrice =
    getCurrentGoldPrice;


window.calculateProductPrice =
    calculateProductPrice;


window.getProductById =
    getProductById;


window.getProductsByCategory =
    getProductsByCategory;


window.getFeaturedProducts =
    getFeaturedProducts;


window.getNewProducts =
    getNewProducts;


window.createProductCard =
    createProductCard;


window.renderProducts =
    renderProducts;


window.renderFeaturedProducts =
    renderFeaturedProducts;


window.searchProducts =
    searchProducts;


window.filterProductsByPrice =
    filterProductsByPrice;


window.sortProducts =
    sortProducts;


window.refreshProductPrices =
    refreshProductPrices;
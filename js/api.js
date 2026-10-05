/* =========================================================
   SHAILY GOLD & JEWELRY
   API.JS
   مدیریت قیمت بازار طلا و دلار
========================================================= */


/* =========================================================
   1. تنظیمات API
========================================================= */

const SHAILY_API_CONFIG = {

    /*
       در آینده آدرس API واقعی را اینجا قرار می‌دهیم.
       فعلاً خالی است تا سایت بدون API هم اجرا شود.
    */

    goldApiUrl: "",

    currencyApiUrl: "",

    /*
       مدت اعتبار کش قیمت‌ها
       5 دقیقه
    */

    cacheTime: 5 * 60 * 1000

};


/* =========================================================
   2. کلیدهای LocalStorage
========================================================= */

const SHAILY_MARKET_KEY =
    "shailyMarketData";

const SHAILY_GOLD_PRICE_KEY =
    "shailyGold18Price";


/* =========================================================
   3. مقدار پیش‌فرض بازار
========================================================= */

const DEFAULT_MARKET_DATA = {

    gold18Price: 0,

    gold24Price: 0,

    dollarPrice: 0,

    updatedAt: null,

    source: "none"

};


/* =========================================================
   4. دریافت اطلاعات ذخیره‌شده
========================================================= */

function getStoredMarketData() {

    try {

        const stored =
            localStorage.getItem(
                SHAILY_MARKET_KEY
            );


        if (!stored) {

            return {
                ...DEFAULT_MARKET_DATA
            };

        }


        const data =
            JSON.parse(stored);


        return {

            ...DEFAULT_MARKET_DATA,

            ...data

        };

    } catch (error) {

        console.error(
            "خطا در خواندن اطلاعات بازار:",
            error
        );


        return {
            ...DEFAULT_MARKET_DATA
        };

    }

}


/* =========================================================
   5. ذخیره اطلاعات بازار
========================================================= */

function saveMarketData(data) {

    try {

        localStorage.setItem(

            SHAILY_MARKET_KEY,

            JSON.stringify(data)

        );


        /*
           قیمت طلای 18 عیار را جداگانه هم ذخیره می‌کنیم
           تا products.js بتواند از آن استفاده کند.
        */

        if (
            data.gold18Price &&
            Number(data.gold18Price) > 0
        ) {

            localStorage.setItem(

                SHAILY_GOLD_PRICE_KEY,

                String(
                    data.gold18Price
                )

            );

        }

    } catch (error) {

        console.error(
            "خطا در ذخیره اطلاعات بازار:",
            error
        );

    }

}


/* =========================================================
   6. دریافت قیمت فعلی طلا
========================================================= */

function getApiGold18Price() {

    const market =
        getStoredMarketData();


    const price =
        Number(
            market.gold18Price
        );


    return price > 0
        ? price
        : 0;

}


/* =========================================================
   7. دریافت قیمت دلار
========================================================= */

function getApiDollarPrice() {

    const market =
        getStoredMarketData();


    const price =
        Number(
            market.dollarPrice
        );


    return price > 0
        ? price
        : 0;

}


/* =========================================================
   8. تبدیل پاسخ API به اطلاعات استاندارد
========================================================= */

function normalizeMarketData(data) {

    if (!data || typeof data !== "object") {

        return null;

    }


    /*
       این بخش طوری نوشته شده که بعداً بتوانیم
       APIهای مختلف را راحت‌تر به سایت وصل کنیم.
    */

    const gold18 =
        Number(
            data.gold18Price ??
            data.gold18 ??
            data.gold_18 ??
            data.gold ??
            0
        );


    const gold24 =
        Number(
            data.gold24Price ??
            data.gold24 ??
            data.gold_24 ??
            0
        );


    const dollar =
        Number(
            data.dollarPrice ??
            data.dollar ??
            data.usd ??
            data.usdPrice ??
            0
        );


    return {

        gold18Price:
            gold18 > 0
                ? gold18
                : 0,

        gold24Price:
            gold24 > 0
                ? gold24
                : 0,

        dollarPrice:
            dollar > 0
                ? dollar
                : 0,

        updatedAt:
            new Date().toISOString(),

        source: "api"

    };

}


/* =========================================================
   9. درخواست به API
========================================================= */

async function fetchMarketFromApi() {

    if (
        !SHAILY_API_CONFIG.goldApiUrl
    ) {

        return null;

    }


    try {

        const response =
            await fetch(
                SHAILY_API_CONFIG.goldApiUrl,
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                `API Error: ${response.status}`
            );

        }


        const data =
            await response.json();


        return normalizeMarketData(
            data
        );

    } catch (error) {

        console.error(
            "خطا در دریافت قیمت بازار:",
            error
        );


        return null;

    }

}


/* =========================================================
   10. نمایش قیمت بازار
========================================================= */

function formatMarketPrice(
    price
) {

    const numericPrice =
        Number(price);


    if (
        !numericPrice ||
        numericPrice <= 0
    ) {

        return "در حال دریافت...";

    }


    return (
        new Intl.NumberFormat(
            "fa-IR"
        ).format(
            Math.round(
                numericPrice
            )
        )
        + " تومان"
    );

}


/* =========================================================
   11. بروزرسانی کارت‌های بازار
========================================================= */

function renderMarketPrices(
    marketData
) {

    if (!marketData) {
        return;
    }


    const gold18 =
        document.getElementById(
            "gold18Price"
        );


    const gold24 =
        document.getElementById(
            "gold24Price"
        );


    const dollar =
        document.getElementById(
            "dollarPrice"
        );


    if (gold18) {

        gold18.textContent =
            formatMarketPrice(
                marketData.gold18Price
            );

    }


    if (gold24) {

        gold24.textContent =
            formatMarketPrice(
                marketData.gold24Price
            );

    }


    if (dollar) {

        dollar.textContent =
            formatMarketPrice(
                marketData.dollarPrice
            );

    }


    /*
       بروزرسانی حسابگر
    */

    if (
        typeof setCalculatorGoldPrice ===
        "function" &&
        Number(
            marketData.gold18Price
        ) > 0
    ) {

        setCalculatorGoldPrice(
            marketData.gold18Price
        );

    }

}


/* =========================================================
   12. بروزرسانی کامل بازار
========================================================= */

async function updateMarketPrices() {

    /*
       ابتدا اطلاعات ذخیره‌شده را نمایش می‌دهیم
       تا صفحه خالی نباشد.
    */

    const storedData =
        getStoredMarketData();


    renderMarketPrices(
        storedData
    );


    /*
       سپس اگر API واقعی تنظیم شده باشد،
       اطلاعات جدید دریافت می‌شود.
    */

    const freshData =
        await fetchMarketFromApi();


    if (freshData) {

        saveMarketData(
            freshData
        );


        renderMarketPrices(
            freshData
        );


        /*
           اگر محصولات در صفحه باشند،
           قیمت آنها هم محاسبه مجدد می‌شود.
        */

        if (
            typeof refreshProductPrices ===
            "function"
        ) {

            refreshProductPrices();

        }

        return freshData;

    }


    return storedData;

}


/* =========================================================
   13. قرار دادن قیمت دستی
========================================================= */

function setManualMarketPrice(
    gold18Price,
    gold24Price = 0,
    dollarPrice = 0
) {

    const data = {

        gold18Price:
            Number(gold18Price) || 0,

        gold24Price:
            Number(gold24Price) || 0,

        dollarPrice:
            Number(dollarPrice) || 0,

        updatedAt:
            new Date().toISOString(),

        source: "manual"

    };


    saveMarketData(
        data
    );


    renderMarketPrices(
        data
    );


    if (
        typeof refreshProductPrices ===
        "function"
    ) {

        refreshProductPrices();

    }


    return data;

}


/* =========================================================
   14. زمان آخرین بروزرسانی
========================================================= */

function getMarketUpdateTime() {

    const market =
        getStoredMarketData();


    if (!market.updatedAt) {

        return "بروزرسانی نشده";

    }


    const date =
        new Date(
            market.updatedAt
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "بروزرسانی نشده";

    }


    return date.toLocaleString(
        "fa-IR"
    );

}


/* =========================================================
   15. وضعیت API
========================================================= */

function isMarketApiConnected() {

    return Boolean(
        SHAILY_API_CONFIG.goldApiUrl
    );

}


/* =========================================================
   16. عمومی کردن توابع
========================================================= */

window.SHAILY_API_CONFIG =
    SHAILY_API_CONFIG;

window.getStoredMarketData =
    getStoredMarketData;

window.saveMarketData =
    saveMarketData;

window.getApiGold18Price =
    getApiGold18Price;

window.getApiDollarPrice =
    getApiDollarPrice;

window.normalizeMarketData =
    normalizeMarketData;

window.fetchMarketFromApi =
    fetchMarketFromApi;

window.formatMarketPrice =
    formatMarketPrice;

window.renderMarketPrices =
    renderMarketPrices;

window.updateMarketPrices =
    updateMarketPrices;

window.setManualMarketPrice =
    setManualMarketPrice;

window.getMarketUpdateTime =
    getMarketUpdateTime;

window.isMarketApiConnected =
    isMarketApiConnected;


/* =========================================================
   17. اجرای اولیه
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateMarketPrices();

    }
);
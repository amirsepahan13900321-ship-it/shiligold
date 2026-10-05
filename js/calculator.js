/* =========================================================
   SHAILY GOLD & JEWELRY
   CALCULATOR.JS
   حسابگر قیمت طلا
========================================================= */


/* =========================================================
   1. فرمت عدد
========================================================= */

function formatCalculatorNumber(number) {

    if (
        number === null ||
        number === undefined ||
        Number.isNaN(Number(number))
    ) {
        return "۰";
    }

    return new Intl.NumberFormat(
        "fa-IR"
    ).format(
        Math.round(Number(number))
    );

}


/* =========================================================
   2. دریافت مقدار فیلد
========================================================= */

function getCalculatorValue(id) {

    const element =
        document.getElementById(id);


    if (!element) {
        return 0;
    }


    const value =
        String(element.value || "")
            .replace(/,/g, "")
            .replace(/[۰-۹]/g, digit => {

                return String(
                    "۰۱۲۳۴۵۶۷۸۹".indexOf(
                        digit
                    )
                );

            });


    return Number(value) || 0;

}


/* =========================================================
   3. محاسبه قیمت طلا
========================================================= */

function calculateGoldPrice() {

    const goldPrice =
        getCalculatorValue(
            "calcGoldPrice"
        );


    const weight =
        getCalculatorValue(
            "calcWeight"
        );


    const wage =
        getCalculatorValue(
            "calcWage"
        );


    const profit =
        getCalculatorValue(
            "calcProfit"
        );


    const tax =
        getCalculatorValue(
            "calcTax"
        );


    /*
       اگر قیمت یا وزن وارد نشده باشد
    */

    if (
        goldPrice <= 0 ||
        weight <= 0
    ) {

        return {

            success: false,

            message:
                "لطفاً قیمت هر گرم طلا و وزن را وارد کنید."

        };

    }


    /* =====================================================
       ارزش طلای خام
    ===================================================== */

    const goldValue =
        goldPrice *
        weight;


    /* =====================================================
       اجرت ساخت
    ===================================================== */

    const wageValue =
        goldValue *
        (wage / 100);


    /* =====================================================
       پایه محاسبه سود
    ===================================================== */

    const profitBase =
        goldValue +
        wageValue;


    /* =====================================================
       سود
    ===================================================== */

    const profitValue =
        profitBase *
        (profit / 100);


    /* =====================================================
       مبلغ قبل از مالیات
    ===================================================== */

    const beforeTax =
        goldValue +
        wageValue +
        profitValue;


    /* =====================================================
       مالیات
    ===================================================== */

    const taxValue =
        beforeTax *
        (tax / 100);


    /* =====================================================
       قیمت نهایی
    ===================================================== */

    const finalPrice =
        beforeTax +
        taxValue;


    return {

        success: true,

        goldValue:
            goldValue,

        wageValue:
            wageValue,

        profitValue:
            profitValue,

        beforeTax:
            beforeTax,

        taxValue:
            taxValue,

        finalPrice:
            finalPrice

    };

}


/* =========================================================
   4. نمایش نتیجه
========================================================= */

function renderCalculatorResult() {

    const resultBox =
        document.getElementById(
            "calculatorResult"
        );


    if (!resultBox) {
        return;
    }


    const result =
        calculateGoldPrice();


    if (!result.success) {

        resultBox.innerHTML = `

            <div class="calculator-empty">

                ${result.message}

            </div>

        `;

        return;

    }


    resultBox.innerHTML = `

        <div class="calculator-result-content">

            <div class="calculator-row">

                <span>
                    ارزش طلای خام
                </span>

                <strong>
                    ${formatCalculatorNumber(
                        result.goldValue
                    )}
                    تومان
                </strong>

            </div>


            <div class="calculator-row">

                <span>
                    اجرت ساخت
                </span>

                <strong>
                    ${formatCalculatorNumber(
                        result.wageValue
                    )}
                    تومان
                </strong>

            </div>


            <div class="calculator-row">

                <span>
                    سود
                </span>

                <strong>
                    ${formatCalculatorNumber(
                        result.profitValue
                    )}
                    تومان
                </strong>

            </div>


            <div class="calculator-row">

                <span>
                    مالیات
                </span>

                <strong>
                    ${formatCalculatorNumber(
                        result.taxValue
                    )}
                    تومان
                </strong>

            </div>


            <div class="calculator-total">

                <span>
                    قیمت نهایی تقریبی
                </span>

                <strong>
                    ${formatCalculatorNumber(
                        result.finalPrice
                    )}
                    تومان
                </strong>

            </div>

        </div>

    `;

}


/* =========================================================
   5. اتصال به فرم
========================================================= */

function initCalculator() {

    const resultBox =
        document.getElementById(
            "calculatorResult"
        );


    if (!resultBox) {
        return;
    }


    const fields = [

        "calcGoldPrice",

        "calcWeight",

        "calcWage",

        "calcProfit",

        "calcTax"

    ];


    fields.forEach(
        fieldId => {

            const field =
                document.getElementById(
                    fieldId
                );


            if (!field) {
                return;
            }


            field.addEventListener(
                "input",
                () => {

                    renderCalculatorResult();

                }
            );


            field.addEventListener(
                "change",
                () => {

                    renderCalculatorResult();

                }
            );

        }
    );


    /*
       اگر دکمه محاسبه در HTML وجود داشته باشد
    */

    const calculateButton =
        document.getElementById(
            "calculateGoldButton"
        );


    if (calculateButton) {

        calculateButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                renderCalculatorResult();

            }
        );

    }


    renderCalculatorResult();

}


/* =========================================================
   6. قرار دادن قیمت فعلی طلا در حسابگر
========================================================= */

function setCalculatorGoldPrice(
    price
) {

    const input =
        document.getElementById(
            "calcGoldPrice"
        );


    if (!input) {
        return;
    }


    const numericPrice =
        Number(price);


    if (
        Number.isNaN(numericPrice) ||
        numericPrice <= 0
    ) {

        return;

    }


    input.value =
        Math.round(
            numericPrice
        );


    renderCalculatorResult();

}


/* =========================================================
   7. دریافت قیمت از سیستم بازار
========================================================= */

function syncCalculatorWithMarket() {

    if (
        typeof getCurrentGoldPrice !==
        "function"
    ) {

        return;

    }


    const price =
        getCurrentGoldPrice();


    if (price > 0) {

        setCalculatorGoldPrice(
            price
        );

    }

}


/* =========================================================
   8. عمومی کردن توابع
========================================================= */

window.formatCalculatorNumber =
    formatCalculatorNumber;

window.getCalculatorValue =
    getCalculatorValue;

window.calculateGoldPrice =
    calculateGoldPrice;

window.renderCalculatorResult =
    renderCalculatorResult;

window.setCalculatorGoldPrice =
    setCalculatorGoldPrice;

window.syncCalculatorWithMarket =
    syncCalculatorWithMarket;


/* =========================================================
   9. اجرای اولیه
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initCalculator();

        syncCalculatorWithMarket();

    }
);
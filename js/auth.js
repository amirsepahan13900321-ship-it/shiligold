/* =========================================================
   SHAILY GOLD & JEWELRY
   AUTH.JS
   ثبت‌نام، ورود، خروج و مدیریت حساب کاربر
========================================================= */


/* =========================================================
   1. کلیدهای LocalStorage
========================================================= */

const SHAILY_USERS_KEY = "shailyUsers";
const SHAILY_CURRENT_USER_KEY = "shailyCurrentUser";


/* =========================================================
   2. دریافت کاربران
========================================================= */

function getUsers() {

    try {

        const savedUsers =
            localStorage.getItem(
                SHAILY_USERS_KEY
            );

        const users =
            savedUsers
                ? JSON.parse(savedUsers)
                : [];

        return Array.isArray(users)
            ? users
            : [];

    } catch (error) {

        console.error(
            "خطا در دریافت کاربران:",
            error
        );

        return [];

    }

}


/* =========================================================
   3. ذخیره کاربران
========================================================= */

function saveUsers(users) {

    localStorage.setItem(
        SHAILY_USERS_KEY,
        JSON.stringify(users)
    );

}


/* =========================================================
   4. دریافت کاربر فعلی
========================================================= */

function getCurrentUser() {

    try {

        const savedUser =
            localStorage.getItem(
                SHAILY_CURRENT_USER_KEY
            );


        if (!savedUser) {
            return null;
        }


        return JSON.parse(
            savedUser
        );

    } catch (error) {

        console.error(
            "خطا در دریافت کاربر:",
            error
        );

        return null;

    }

}


/* =========================================================
   5. بررسی ورود کاربر
========================================================= */

function isLoggedIn() {

    return getCurrentUser() !== null;

}


/* =========================================================
   6. ذخیره کاربر فعلی
========================================================= */

function setCurrentUser(user) {

    localStorage.setItem(
        SHAILY_CURRENT_USER_KEY,
        JSON.stringify(user)
    );

}


/* =========================================================
   7. خروج از حساب
========================================================= */

function logoutUser() {

    localStorage.removeItem(
        SHAILY_CURRENT_USER_KEY
    );


    updateAuthUI();


    window.location.href =
        "index.html";

}


/* =========================================================
   8. اعتبارسنجی ایمیل
========================================================= */

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(
        String(email).trim()
    );

}


/* =========================================================
   9. اعتبارسنجی رمز عبور
========================================================= */

function isValidPassword(password) {

    return (
        typeof password === "string" &&
        password.length >= 6
    );

}


/* =========================================================
   10. ثبت‌نام
========================================================= */

function registerUser(
    name,
    email,
    password,
    phone = ""
) {

    name =
        String(name || "").trim();

    email =
        String(email || "")
            .trim()
            .toLowerCase();

    password =
        String(password || "");

    phone =
        String(phone || "").trim();


    if (!name) {

        return {
            success: false,
            message:
                "لطفاً نام و نام خانوادگی را وارد کنید."
        };

    }


    if (!isValidEmail(email)) {

        return {
            success: false,
            message:
                "لطفاً یک ایمیل معتبر وارد کنید."
        };

    }


    if (!isValidPassword(password)) {

        return {
            success: false,
            message:
                "رمز عبور باید حداقل ۶ کاراکتر باشد."
        };

    }


    const users =
        getUsers();


    const existingUser =
        users.find(
            user =>
                user.email === email
        );


    if (existingUser) {

        return {
            success: false,
            message:
                "این ایمیل قبلاً ثبت شده است."
        };

    }


    /*
       توجه:
       این سیستم فعلاً برای نسخه
       Front-End و تست پروژه است.
       برای سایت واقعی باید احراز هویت
       روی سرور انجام شود.
    */

    const newUser = {

        id:
            Date.now(),

        name:
            name,

        email:
            email,

        password:
            password,

        phone:
            phone,

        address:
            "",

        createdAt:
            new Date().toISOString(),

        orders:
            []

    };


    users.push(
        newUser
    );


    saveUsers(
        users
    );


    /*
       بعد از ثبت‌نام،
       کاربر وارد حساب می‌شود.
    */

    const sessionUser = {

        id:
            newUser.id,

        name:
            newUser.name,

        email:
            newUser.email,

        phone:
            newUser.phone

    };


    setCurrentUser(
        sessionUser
    );


    return {

        success: true,

        message:
            "ثبت‌نام با موفقیت انجام شد.",

        user:
            sessionUser

    };

}


/* =========================================================
   11. ورود
========================================================= */

function loginUser(
    email,
    password
) {

    email =
        String(email || "")
            .trim()
            .toLowerCase();

    password =
        String(password || "");


    if (!isValidEmail(email)) {

        return {
            success: false,
            message:
                "ایمیل واردشده معتبر نیست."
        };

    }


    if (!password) {

        return {
            success: false,
            message:
                "لطفاً رمز عبور را وارد کنید."
        };

    }


    const users =
        getUsers();


    const user =
        users.find(
            item =>
                item.email === email &&
                item.password === password
        );


    if (!user) {

        return {
            success: false,
            message:
                "ایمیل یا رمز عبور اشتباه است."
        };

    }


    const sessionUser = {

        id:
            user.id,

        name:
            user.name,

        email:
            user.email,

        phone:
            user.phone || ""

    };


    setCurrentUser(
        sessionUser
    );


    return {

        success: true,

        message:
            "ورود با موفقیت انجام شد.",

        user:
            sessionUser

    };

}


/* =========================================================
   12. نمایش پیام احراز هویت
========================================================= */

function showAuthMessage(
    message,
    type = "error"
) {

    let box =
        document.getElementById(
            "authMessage"
        );


    if (!box) {

        box =
            document.createElement(
                "div"
            );

        box.id =
            "authMessage";

        box.className =
            "auth-message";


        const form =
            document.querySelector(
                ".auth-form"
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
        `auth-message ${type}`;


    box.style.display =
        "block";

}


/* =========================================================
   13. مدیریت فرم ثبت‌نام
========================================================= */

function initRegisterForm() {

    const form =
        document.getElementById(
            "registerForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                )?.value;


            const email =
                document.getElementById(
                    "registerEmail"
                )?.value;


            const password =
                document.getElementById(
                    "registerPassword"
                )?.value;


            const confirmPassword =
                document.getElementById(
                    "registerConfirmPassword"
                )?.value;


            const phone =
                document.getElementById(
                    "registerPhone"
                )?.value || "";


            if (
                password !==
                confirmPassword
            ) {

                showAuthMessage(
                    "تکرار رمز عبور با رمز اصلی یکسان نیست.",
                    "error"
                );

                return;

            }


            const result =
                registerUser(
                    name,
                    email,
                    password,
                    phone
                );


            if (!result.success) {

                showAuthMessage(
                    result.message,
                    "error"
                );

                return;

            }


            showAuthMessage(
                result.message,
                "success"
            );


            setTimeout(
                () => {

                    window.location.href =
                        "account.html";

                },
                700
            );

        }
    );

}


/* =========================================================
   14. مدیریت فرم ورود
========================================================= */

function initLoginForm() {

    const form =
        document.getElementById(
            "loginForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                )?.value;


            const password =
                document.getElementById(
                    "loginPassword"
                )?.value;


            const result =
                loginUser(
                    email,
                    password
                );


            if (!result.success) {

                showAuthMessage(
                    result.message,
                    "error"
                );

                return;

            }


            showAuthMessage(
                result.message,
                "success"
            );


            setTimeout(
                () => {

                    window.location.href =
                        "account.html";

                },
                700
            );

        }
    );

}


/* =========================================================
   15. بروزرسانی رابط کاربری
========================================================= */

function updateAuthUI() {

    const user =
        getCurrentUser();


    const loginLinks =
        document.querySelectorAll(
            "[data-auth-login]"
        );


    const accountLinks =
        document.querySelectorAll(
            "[data-auth-account]"
        );


    const logoutButtons =
        document.querySelectorAll(
            "[data-auth-logout]"
        );


    loginLinks.forEach(
        element => {

            element.style.display =
                user
                    ? "none"
                    : "";

        }
    );


    accountLinks.forEach(
        element => {

            element.style.display =
                user
                    ? ""
                    : "none";

        }
    );


    logoutButtons.forEach(
        element => {

            element.style.display =
                user
                    ? ""
                    : "none";

        }
    );


    const userNameElements =
        document.querySelectorAll(
            "[data-user-name]"
        );


    userNameElements.forEach(
        element => {

            element.textContent =
                user
                    ? user.name
                    : "مهمان";

        }
    );

}


/* =========================================================
   16. محافظت از صفحات حساب
========================================================= */

function requireLogin() {

    if (!isLoggedIn()) {

        window.location.href =
            "login.html";

        return false;

    }


    return true;

}


/* =========================================================
   17. اجرای اولیه
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initRegisterForm();

        initLoginForm();

        updateAuthUI();


        document
            .querySelectorAll(
                "[data-auth-logout]"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        event => {

                            event.preventDefault();

                            logoutUser();

                        }
                    );

                }
            );

    }
);


/* =========================================================
   18. عمومی کردن توابع
========================================================= */

window.getUsers =
    getUsers;

window.saveUsers =
    saveUsers;

window.getCurrentUser =
    getCurrentUser;

window.isLoggedIn =
    isLoggedIn;

window.setCurrentUser =
    setCurrentUser;

window.logoutUser =
    logoutUser;

window.registerUser =
    registerUser;

window.loginUser =
    loginUser;

window.showAuthMessage =
    showAuthMessage;

window.updateAuthUI =
    updateAuthUI;

window.requireLogin =
    requireLogin;
/* =========================================================
   SHAILY GOLD & JEWELRY
   ACCOUNT.JS
   مدیریت حساب کاربری
========================================================= */


/* =========================================================
   1. دریافت کاربر فعلی
========================================================= */

function getAccountUser() {

    if (typeof getCurrentUser !== "function") {
        return null;
    }

    return getCurrentUser();

}


/* =========================================================
   2. نمایش اطلاعات کاربر
========================================================= */

function renderAccountInfo() {

    const user =
        getAccountUser();


    if (!user) {
        return;
    }


    const nameElements =
        document.querySelectorAll(
            "[data-account-name]"
        );


    const emailElements =
        document.querySelectorAll(
            "[data-account-email]"
        );


    const phoneElements =
        document.querySelectorAll(
            "[data-account-phone]"
        );


    nameElements.forEach(
        element => {

            element.textContent =
                user.name || "—";

        }
    );


    emailElements.forEach(
        element => {

            element.textContent =
                user.email || "—";

        }
    );


    phoneElements.forEach(
        element => {

            element.textContent =
                user.phone || "ثبت نشده";

        }
    );

}


/* =========================================================
   3. پر کردن فرم اطلاعات حساب
========================================================= */

function fillAccountForm() {

    const user =
        getAccountUser();


    if (!user) {
        return;
    }


    const nameInput =
        document.getElementById(
            "accountName"
        );


    const emailInput =
        document.getElementById(
            "accountEmail"
        );


    const phoneInput =
        document.getElementById(
            "accountPhone"
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
   4. نمایش پیام حساب
========================================================= */

function showAccountMessage(
    message,
    type = "success"
) {

    let box =
        document.getElementById(
            "accountMessage"
        );


    if (!box) {

        box =
            document.createElement(
                "div"
            );

        box.id =
            "accountMessage";

        box.className =
            "account-message";


        const form =
            document.getElementById(
                "accountForm"
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
        `account-message ${type}`;


    box.style.display =
        "block";


    setTimeout(
        () => {

            box.style.display =
                "none";

        },
        3000
    );

}


/* =========================================================
   5. بروزرسانی اطلاعات حساب
========================================================= */

function updateAccountInfo(
    name,
    phone
) {

    const currentUser =
        getAccountUser();


    if (!currentUser) {

        return {
            success: false,
            message:
                "ابتدا وارد حساب کاربری شوید."
        };

    }


    name =
        String(name || "").trim();


    phone =
        String(phone || "").trim();


    if (!name) {

        return {
            success: false,
            message:
                "نام نمی‌تواند خالی باشد."
        };

    }


    const users =
        typeof getUsers === "function"
            ? getUsers()
            : [];


    const userIndex =
        users.findIndex(
            user =>
                Number(user.id) ===
                Number(currentUser.id)
        );


    if (userIndex === -1) {

        return {
            success: false,
            message:
                "کاربر پیدا نشد."
        };

    }


    users[userIndex].name =
        name;


    users[userIndex].phone =
        phone;


    if (
        typeof saveUsers === "function"
    ) {

        saveUsers(users);

    }


    const updatedUser = {

        id:
            users[userIndex].id,

        name:
            users[userIndex].name,

        email:
            users[userIndex].email,

        phone:
            users[userIndex].phone

    };


    if (
        typeof setCurrentUser === "function"
    ) {

        setCurrentUser(
            updatedUser
        );

    }


    renderAccountInfo();


    fillAccountForm();


    if (
        typeof updateAuthUI === "function"
    ) {

        updateAuthUI();

    }


    return {

        success: true,

        message:
            "اطلاعات حساب با موفقیت بروزرسانی شد."

    };

}


/* =========================================================
   6. مدیریت فرم حساب
========================================================= */

function initAccountForm() {

    const form =
        document.getElementById(
            "accountForm"
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
                    "accountName"
                )?.value;


            const phone =
                document.getElementById(
                    "accountPhone"
                )?.value;


            const result =
                updateAccountInfo(
                    name,
                    phone
                );


            showAccountMessage(
                result.message,
                result.success
                    ? "success"
                    : "error"
            );

        }
    );

}


/* =========================================================
   7. مدیریت تغییر رمز عبور
========================================================= */

function changePassword(
    currentPassword,
    newPassword,
    confirmPassword
) {

    const currentUser =
        getAccountUser();


    if (!currentUser) {

        return {
            success: false,
            message:
                "ابتدا وارد حساب کاربری شوید."
        };

    }


    if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
    ) {

        return {
            success: false,
            message:
                "لطفاً همه فیلدها را تکمیل کنید."
        };

    }


    if (
        newPassword.length < 6
    ) {

        return {
            success: false,
            message:
                "رمز جدید باید حداقل ۶ کاراکتر باشد."
        };

    }


    if (
        newPassword !==
        confirmPassword
    ) {

        return {
            success: false,
            message:
                "تکرار رمز جدید یکسان نیست."
        };

    }


    const users =
        typeof getUsers === "function"
            ? getUsers()
            : [];


    const userIndex =
        users.findIndex(
            user =>
                Number(user.id) ===
                Number(currentUser.id)
        );


    if (userIndex === -1) {

        return {
            success: false,
            message:
                "کاربر پیدا نشد."
        };

    }


    if (
        users[userIndex].password !==
        currentPassword
    ) {

        return {
            success: false,
            message:
                "رمز عبور فعلی اشتباه است."
        };

    }


    users[userIndex].password =
        newPassword;


    saveUsers(
        users
    );


    return {

        success: true,

        message:
            "رمز عبور با موفقیت تغییر کرد."

    };

}


/* =========================================================
   8. فرم تغییر رمز
========================================================= */

function initPasswordForm() {

    const form =
        document.getElementById(
            "passwordForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const currentPassword =
                document.getElementById(
                    "currentPassword"
                )?.value;


            const newPassword =
                document.getElementById(
                    "newPassword"
                )?.value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                )?.value;


            const result =
                changePassword(
                    currentPassword,
                    newPassword,
                    confirmPassword
                );


            showAccountMessage(
                result.message,
                result.success
                    ? "success"
                    : "error"
            );


            if (result.success) {

                form.reset();

            }

        }
    );

}


/* =========================================================
   9. خروج از حساب
========================================================= */

function initLogoutButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-account-logout]"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    if (
                        typeof logoutUser ===
                        "function"
                    ) {

                        logoutUser();

                    }

                }
            );

        }
    );

}


/* =========================================================
   10. محافظت از صفحه حساب
========================================================= */

function protectAccountPage() {

    const accountPage =
        document.body?.dataset
            ?.requiresLogin;


    if (
        accountPage !== "true"
    ) {

        return;

    }


    if (
        typeof isLoggedIn !==
        "function"
    ) {

        return;

    }


    if (!isLoggedIn()) {

        window.location.href =
            "login.html";

    }

}


/* =========================================================
   11. مقداردهی اولیه
========================================================= */

function initAccount() {

    protectAccountPage();

    renderAccountInfo();

    fillAccountForm();

    initAccountForm();

    initPasswordForm();

    initLogoutButtons();

}


/* =========================================================
   12. عمومی کردن توابع
========================================================= */

window.getAccountUser =
    getAccountUser;

window.renderAccountInfo =
    renderAccountInfo;

window.fillAccountForm =
    fillAccountForm;

window.updateAccountInfo =
    updateAccountInfo;

window.changePassword =
    changePassword;

window.showAccountMessage =
    showAccountMessage;

window.protectAccountPage =
    protectAccountPage;


/* =========================================================
   13. اجرای اولیه
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initAccount();

    }
);
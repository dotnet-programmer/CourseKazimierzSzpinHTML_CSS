var divForm = document.getElementsByClassName("header__search-form")[0];
var input = document.getElementsByClassName("header__search-input")[0];

input.addEventListener("focusin", (event) => {
    divForm.classList.add("header__search-form--focused");
});

input.addEventListener("focusout", (event) => {
    divForm.classList.remove("header__search-form--focused");
});
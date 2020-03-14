let form = document.getElementById("parameters_form");
let y = document.getElementById("y_coordinate");
let submit = document.getElementById("submit_parameters");
let floatNumberRegex = /^[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?$/;

y.addEventListener("input", function () {
    if (!floatNumberRegex.test(y.value) && y.value.length !== 0 || (y.value < -5 || y.value > 3)) {
        y.className = "invalid";
    } else {
        y.className = "valid";
    }
});

submit.addEventListener("click", function () {
    if (!floatNumberRegex.test(y.value)) {
        y.setCustomValidity("Неверный формат числа.");
    } else if (y.value < -5 || y.value > 3) {
        y.setCustomValidity("Число не лежит в указанном интервале.");
    } else {
        y.setCustomValidity("");
    }
});

form.addEventListener("submit", function (event) {
    if (!floatNumberRegex.test(y.value) || (y.value < -5 || y.value > 3)) {
        y.className = "invalid";
        y.value = "";
        event.preventDefault();
    }
});
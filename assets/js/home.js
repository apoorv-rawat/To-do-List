// color for each category
var colorObj = {
    personal: "blue",
    cleaning: "red",
    work: "#ffa1b1",
    other: "orange",
    school: "darkblue"
};

// coloring each category tile
var col = document.querySelectorAll(".category-tile");
col.forEach(function (ele) {
    ele.style.backgroundColor = colorObj[ele.innerText.toLowerCase()];
});

// deleting todo item
function submitForm() {
    document.getElementById("delete-form").submit();
}

function getTodaysDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    return yyyy + '-' + mm + '-' + dd;
}

document.getElementById("due-date-input").setAttribute("min", getTodaysDate());

// strike through generator
function toggleCheckbox(ele) {
    ele.parentElement.classList.toggle("strike-through");
}

// gray background on focus
(function onFocii(ele) {
    var eles = document.querySelectorAll("#create-form input , select");

    eles.forEach(function (elem) {

        elem.addEventListener('focus', (event) => {
            event.target.parentElement.style.backgroundColor = 'hsl(210deg 17% 93%)';
            event.target.style.backgroundColor = 'hsl(210deg 17% 93%)';
        });

        elem.addEventListener('blur', (event) => {
            event.target.parentElement.style.backgroundColor = 'white';
            event.target.style.backgroundColor = 'white';
        });

    });
})();
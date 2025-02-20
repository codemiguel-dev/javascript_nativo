let menu = document.querySelectorAll(".menu-item");

let firstactive = document.querySelector(".item-is-active");
let activecolor = getComputedStyle(firstactive).color;
document.body.style.backgroundColor = activecolor;

menu.forEach((item) => {
    item.addEventListener("click", function() {

        let accentColor = getComputedStyle(this).color;
        this.children[0].style.borderColor = accentColor;
        if(!this.classList.contains("item-is-active")){
            document.body.style.background = accentColor;
        }

        menu.forEach((item) => {
            item.classList.remove("item-is-active");
            this.classList.add("item-is-active");
        });
    });
});
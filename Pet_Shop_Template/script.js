$(document).ready(function(){
    $(".on").click(function() {
        $('.alert').css({
            'transform': 'translateX(0)',
        });
    });

    $(".close").click(function() {
        $('.alert').css({
            'transform': 'translateX(150%)',
        });
    });

    $(".out").click(function(){
        $('.alert').css({
            'transform': 'translateX(150%)',
        });
    })
})
ScrollReveal({ reset: true });
ScrollReveal().reveal('.banner', { easing:"ease-in", delay: 100});
ScrollReveal().reveal('.shop', { easing: "ease-in", delay: 100});
ScrollReveal().reveal('.about', { easing: "ease-in", delay: 100 });
ScrollReveal().reveal('.review', { easing: "ease-in", delay: 100 });
ScrollReveal().reveal('.contact', { easing: "ease-in", delay: 100 });
ScrollReveal().reveal('.form', { easing: "ease-in", delay: 100 });
ScrollReveal().reveal('.strip', { easing: "ease-in", delay: 100 });
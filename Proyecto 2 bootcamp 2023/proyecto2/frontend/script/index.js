let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,

    breakpoints:{
        0:{
            slidesPerView:1,
        },
        600:{
            slidesPerView:2,
        },
    },
});


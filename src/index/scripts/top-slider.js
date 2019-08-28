import anime from 'animejs' ;
let wrapper = document.querySelector('#top_slider') ;
let btns = wrapper.querySelectorAll('.btn-wrapper button') ;
let slides = wrapper.querySelectorAll('.slides .slide') ;
btns.forEach(btn => {
    btn.addEventListener('click',changeSlide) ;
})
function changeSlide(e){
    let prevSlide = null ;
    let currSlide = null ;
    btns.forEach(btn => {
        if(btn != this) {
            if(btn.classList.contains('active')) prevSlide = slides[btn.getAttribute('data-target')] ;
            btn.classList.remove('active') ;
        }
        else {
            currSlide = slides[btn.getAttribute('data-target')] ;     
            btn.classList.add('active') ;       
        }
    }) ;
    slideAnimation(prevSlide,currSlide) ;
}
function slideAnimation(prevSlide,currSlide){
    let tl = anime.timeline({
        direction: 'normal',
        loop: 1
    });
    tl.add({
        targets: [prevSlide.querySelectorAll('span.border'),prevSlide.querySelector('p'),prevSlide.querySelector('img')],
        easing: 'linear' ,
        duration: 350 ,
        delay: anime.stagger(200),
        opacity: 0 ,
        top: (elm,i,total)=>{if(elm == prevSlide.querySelector('img')) return '55%' ;}
    },0)
    tl.add({
        targets: [currSlide.querySelector('img'),currSlide.querySelector('p'),currSlide.querySelectorAll('span.border')],
        easing: 'linear' ,
        duration: 300 ,
        delay: anime.stagger(150),
        opacity: 1 ,
        top: (elm,i,total)=>{if(elm == currSlide.querySelector('img')) return '20%' ;}
    },950)
}
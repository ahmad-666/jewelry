import anime from 'animejs' ;
let getStyle = (el,prop) => window.getComputedStyle(el,null).getPropertyValue(prop) ;
function Slider(slider){
    this.slider = slider.querySelector('.slider') ;
    this.slide = this.slider.querySelector('.slide') ;
    this.offset = parseInt(getStyle(this.slide,'width')) + parseInt(getStyle(this.slide,'margin-right')) + parseInt(getStyle(this.slide,'margin-left')) ;
    this.movement = 0 ;
    this.slidesNum = this.slider.querySelectorAll('.slide').length ;
    this.slidesInViewport = Math.floor(window.innerWidth / this.offset) ;
    this.currSlideIndex = this.slidesInViewport ; //start from 1
    this.firstSlide = true ;
    this.lastSlide = false ;
    this.prevBtn = slider.querySelector('button.prev') ;
    this.nextBtn = slider.querySelector('button.next') ;
    this.prevBtn.addEventListener('click',this.prevSlide.bind(this));
    this.nextBtn.addEventListener('click',this.nextSlide.bind(this));
}
Slider.prototype.prevSlide = function(e){
    if(this.currSlideIndex == this.slidesInViewport - 1) this.firstSlide = true ;
    else this.firstSlide = false ;
    if(!this.firstSlide){
        this.currSlideIndex-- ;   
        this.movement-=this.offset ;
        this.animation(-this.movement,400) ;
    }
    else{
        this.currSlideIndex = this.slidesNum  ;   
        this.movement = ((this.slidesNum*this.offset)-this.slider.clientWidth>0) ? ((this.slidesNum*this.offset)-this.slider.clientWidth) : (0) ; 
        this.animation(-this.movement,1000) ;
    }   
}
Slider.prototype.nextSlide = function(e){
    if(this.currSlideIndex == this.slidesNum + 1) this.lastSlide = true ;
    else this.lastSlide = false ;
    if(!this.lastSlide){
        this.currSlideIndex++ ;   
        this.movement+=this.offset ;
        this.animation(-this.movement,400) ;
    }
    else{
        this.currSlideIndex = this.slidesInViewport ;   
        this.movement = 0 
        this.animation(this.movement,1000) ;
    }  
}
Slider.prototype.animation = function(val,time){
    anime({
        targets: this.slider ,
        duration: time,
        right: val ,
        easing:'linear',
        direction:'normal',
        loop:1 
    })
}
let sliders = [] ;
document.querySelectorAll('.slider_wrapper').forEach(slider => {
    sliders.push(new Slider(slider))
})


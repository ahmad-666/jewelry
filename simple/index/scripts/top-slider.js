//import util from '../../utilities/utilities' ;
function TopSlider(elm){//with fade effect
    this.elm = elm ;
    this.slidesWrapper = this.elm.querySelector('.slides') ;
    this.slides = this.slidesWrapper.querySelectorAll('.slide') ;
    this.prevBtn = this.elm.querySelector('.btn_wrapper .prev') ;
    this.nextBtn = this.elm.querySelector('.btn_wrapper .next') ;
    this.circlesWrapper = this.elm.querySelector('.circles') ;
    this.circles = this.circlesWrapper.querySelectorAll('.circle') ;
    this.currIndex = 0 ; //index of current .slide
    this.slidesNum = this.slides.length ;
    this.prevBtn.addEventListener('click',this.changSlide.bind(this)) ;
    this.nextBtn.addEventListener('click',this.changSlide.bind(this)) ;
    this.circles.forEach(circle => {
        circle.addEventListener('click',this.changSlide.bind(this)) ;
    })
    this.autoTimer = 4000 ;
    this.clearAutoSlider = null ;
    //this.autoSlider(this.autoTimer) ;
}
TopSlider.prototype.autoSlider = function(time){
    this.clearAutoSlider = setInterval(()=>{
        this.nextBtn.click() ;
    },time)
}
TopSlider.prototype.changSlide = function(e){
    clearInterval(this.clearAutoSlider) ;
    this.autoSlider(this.autoTimer) ;
    if(e.currentTarget == this.prevBtn) this.updateCurrIndex(this.currIndex-1,'prev') ; //prevBtn 
    else if(e.currentTarget == this.nextBtn) this.updateCurrIndex(this.currIndex+1,'next') ;//nextBtn
    else this.updateCurrIndex( getChildIndex(this.circlesWrapper,e.target),"") //click on circles   
    this.updateCircles() ;
    this.updateSlides() ;
}
TopSlider.prototype.updateSlides = function(){
    for(let i=0 ; i<this.slides.length ; i++){//remove current active class 
        let slide = this.slides[i] ;
        if(slide.classList.contains('active')) slide.classList.remove('active') ;
    }  
    this.slides[this.currIndex].classList.add('active') ;
}
TopSlider.prototype.updateCircles = function(){
    for(let i=0 ; i<this.circles.length ; i++){//remove current active class 
        let circle = this.circles[i] ;
        if(circle.classList.contains('active')) circle.classList.remove('active') ;
    }  
    this.circles[this.currIndex].classList.add('active') ;
}
TopSlider.prototype.updateCurrIndex = function(newIndex,dir){
    if(dir=='next') this.currIndex = newIndex%this.slidesNum!=0 ? newIndex : 0 ;  //nextButton
    else if(dir=='prev') this.currIndex = newIndex>=0 ? newIndex : this.slidesNum-1 ; //prevButton
    else this.currIndex = newIndex ; //manually click on cirlce
}
new TopSlider(document.querySelector('#top_slider')) ;
let getStyle = (elm,prop) => window.getComputedStyle(elm,null).getPropertyValue(prop) ;
function Slider(elm){
    this.elm = elm ;
    this.curr = this.elm.querySelector('.curr') ;
    this.slidesWrapper = this.elm.querySelector('.slides') ;
    this.slides = this.elm.querySelectorAll('.slide') ; //small images on bottom
    this.currImgs = this.curr.querySelectorAll('.img') ; //big images on top
    this.slidesNum = this.slides.length ;
    this.firstSlide = this.slides[0] ;
    this.lastSlide = this.slides[this.slidesNum - 1] ;  
    this.currIndex = 0 ;
    this.viewportSlides = this.getViewportSlides() ;//how many slides are visible inside viewport
    this.prevBtn = this.curr.querySelector('.fa-chevron-right') ;
    this.nextBtn = this.curr.querySelector('.fa-chevron-left') ;
    this.prevBtn.addEventListener('click',this.prevSlide.bind(this));
    this.nextBtn.addEventListener('click',this.nextSlide.bind(this));
    this.initSlider() ;
    this.threshold = {
        min:null ,
        max:null
    };
    this.setThresholds() ;
};
Slider.prototype.initSlider = function(){
    this.currImgs[0].classList.add('show') ;
    this.currImgs.forEach(img => {
        img.style.transition = `all 1s ease-in-out` ;
    }) ;
}
Slider.prototype.setThresholds = function(){
    this.threshold.min = 0 ;
    let slideWidth = this.slides[0].clientWidth ;
    let slideMargin = parseFloat(getStyle(this.slides[0],'margin-right')) + parseFloat(getStyle(this.slides[0],'margin-left')) ;
    let slideBorder = parseFloat(getStyle(this.slides[0],'border-right')) + parseFloat(getStyle(this.slides[0],'border-left')) ;
    let offset = (this.slidesNum-this.viewportSlides)*(slideWidth+slideMargin+slideBorder) ;
    this.threshold.max = offset ;
}
Slider.prototype.getViewportSlides = function(){
    let wrapperWidth = this.slidesWrapper.clientWidth ;
    let wrapperPadding = parseFloat(getStyle(this.slidesWrapper,'padding-right')) +  parseFloat(getStyle(this.slidesWrapper,'padding-left')) ; 
    let wrapperBorder = parseFloat(getStyle(this.slidesWrapper,'border-right')) +  parseFloat(getStyle(this.slidesWrapper,'border-left')) ; 
    let slideWidth = this.slides[0].clientWidth ;
    let slideMargin = parseFloat(getStyle(this.slides[0],'margin-right')) +  parseFloat(getStyle(this.slides[0],'margin-left')) ;  
    let slideBorder = parseFloat(getStyle(this.slides[0],'border-right')) +  parseFloat(getStyle(this.slides[0],'border-left')) ;  
    return Math.floor((wrapperWidth - wrapperPadding - wrapperBorder)/(slideWidth + slideMargin + slideBorder)) ; 
}
Slider.prototype.prevSlide = function(e){
    this.viewportSlides = this.getViewportSlides();
    let currSlide = null ;
    let currSlideIndex = null ;
    let prevSlide = null ;
    let prevSlideIndex = null ;
    for(let i=0 ; i<this.slides.length ; i++){
        let slide = this.slides[i] ;
        if(slide.classList.contains('active')){
            currSlideIndex = i ;
            currSlide = slide ;
            prevSlideIndex = (i-1>=0)?i-1:this.slidesNum-1 ;
            this.currIndex = prevSlideIndex
            prevSlide = this.slides[prevSlideIndex];     
            currSlide.classList.remove('active') ;
            prevSlide.classList.add('active') ;     
            break ;
        }
    }
    if(prevSlideIndex == this.slidesNum-1) {
        let slideWidth = this.slides[0].clientWidth ;
        let slideMargin = parseFloat(getStyle(this.slides[0],'margin-right')) + parseFloat(getStyle(this.slides[0],'margin-left')) ;
        let slideBorder = parseFloat(getStyle(this.slides[0],'border-right')) + parseFloat(getStyle(this.slides[0],'border-left')) ;
        let offset = (this.slidesNum-this.viewportSlides)*(slideWidth + slideMargin + slideBorder) ;
        this.slidesWrapper.style.right = `-${offset}px` ;
    }
    else{ 
        let slideWidth = this.slides[0].clientWidth ;
        let slideMargin = parseFloat(getStyle(this.slides[0],'margin-right')) + parseFloat(getStyle(this.slides[0],'margin-left')) ;
        let slideBorder = parseFloat(getStyle(this.slides[0],'border-right')) + parseFloat(getStyle(this.slides[0],'border-left')) ;
        let offset = slideWidth + slideMargin + slideBorder ;
        let currPos = parseFloat(getStyle(this.slidesWrapper,'right'));
        if(currPos+offset<=this.threshold.min) this.slidesWrapper.style.right = `${currPos+offset}px` ;
    }
    this.changeSlide(currSlideIndex,prevSlideIndex);
};
Slider.prototype.nextSlide = function(e){
    this.viewportSlides = this.getViewportSlides();
    let currSlide = null ;
    let currSlideIndex = null ;
    let nextSlide = null ;
    let nextSlideIndex = null ;
    for(let i=0 ; i<this.slides.length ; i++){
        let slide = this.slides[i] ;
        if(slide.classList.contains('active')){
            currSlideIndex = i ;
            currSlide = slide ;
            nextSlideIndex = (i+1)%(this.slidesNum) ;
            this.currIndex = nextSlideIndex
            nextSlide = this.slides[nextSlideIndex];     
            currSlide.classList.remove('active') ;
            nextSlide.classList.add('active') ;     
            break ;
        }
    }
    if(nextSlideIndex>=this.viewportSlides){ 
        let slideWidth = this.slides[0].clientWidth ;
        let slideMargin = parseFloat(getStyle(this.slides[0],'margin-right')) + parseFloat(getStyle(this.slides[0],'margin-left')) ;
        let slideBorder = parseFloat(getStyle(this.slides[0],'border-right')) + parseFloat(getStyle(this.slides[0],'border-left')) ;
        let offset = slideWidth + slideMargin + slideBorder ;
        let currPos = Math.abs(parseFloat(getStyle(this.slidesWrapper,'right'))) ;        
        if(currPos+offset<=this.threshold.max) this.slidesWrapper.style.right = `-${currPos+offset}px` ;
    }
    else if(nextSlideIndex == 0) this.slidesWrapper.style.right = `0px` ;
    this.changeSlide(currSlideIndex,nextSlideIndex);
};
Slider.prototype.changeSlide = function(currSlideIndex,nextSlideIndex){
    this.currImgs[currSlideIndex].classList.remove('show');
    this.currImgs[nextSlideIndex].classList.add('show');
}
new Slider(document.querySelector('#product_info .slider')) ;
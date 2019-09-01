import util from '../../utilities/utilities' ;
function ProductSlider(elm){
    this.elm = elm ;
    this.bgs = this.elm.querySelectorAll('.bg .img') ;
    this.slidesWrapper = this.elm.querySelector('.slides') ;
    this.slides = this.slidesWrapper.querySelectorAll('.slide') ;
    this.currSlideIndex = null ; //slide that has active class
    this.prevSlideIndex = null ;
    this.slidesNum = this.slides.length ;
    this.slideOffset = null ; //width+padding+margin-left+margin-right of each slide
    this.viewportSlides = null ;
    this.prevBtn = this.elm.querySelector('i.fa-chevron-right') ;
    this.nextBtn = this.elm.querySelector('i.fa-chevron-left') ;
    this.prevBtn.addEventListener('click',this.moveSlider.bind(this)) ;
    this.nextBtn.addEventListener('click',this.moveSlider.bind(this)) ;
    this.threshold = {
        min: null,
        max:null
    }
    this.init() ;
}
ProductSlider.prototype.init = function(){
    this.currSlideIndex = util.getActiveIndex(this.slidesWrapper) ;
    this.slideOffset = this.slides[0].offsetWidth + parseFloat(util.getStyle(this.slides[0],'margin-right')) + parseFloat(util.getStyle(this.slides[0],'margin-left'));
    this.viewportSlides = Math.floor(this.slidesWrapper.offsetWidth/this.slideOffset);
    this.threshold.min = 0 ;
    let totalWidth = 0 ;
    this.slides.forEach(slide => totalWidth+=this.slideOffset) ;
    this.threshold.max = totalWidth - this.slidesWrapper.offsetWidth;    
}
ProductSlider.prototype.moveSlider = function(e){
    if(e.currentTarget == this.nextBtn){//nextSlide
        this.setActiveSlide(this.currSlideIndex+1,'next') ;
        this.nextSlide() ;
        this.setActiveBg() ;
    }
    else if(e.currentTarget == this.prevBtn){//prevSlide
        this.setActiveSlide(this.currSlideIndex-1,'prev') ;
        this.prevSlide() ;
        this.setActiveBg() ;
    }
}
ProductSlider.prototype.setActiveSlide = function(newIndex,dir){
    for(let i=0 ; i<this.slides.length ; i++){//remove prev active class
        let slide = this.slides[i] ;
        if(slide.classList.contains('active')){
            slide.classList.remove('active') ;
            this.prevSlideIndex = i ;
            break ;
        }
    }
    //calc new slideIndex
    if(dir == 'next') this.currSlideIndex = newIndex%this.slidesNum!=0 ? newIndex : 0 ; 
    else if(dir=='prev') this.currSlideIndex = newIndex>=0 ? newIndex : this.slidesNum-1 ; 
    this.slides[this.currSlideIndex].classList.add('active') ;//give new slide active class
}
ProductSlider.prototype.nextSlide = function(){
    let currPos = parseFloat(util.getStyle(this.slidesWrapper,'right')) ;//current pos of slidesWrapper
    let move = currPos-this.slideOffset;
    if(Math.abs(move)<=this.threshold.max) this.slidesWrapper.style.right = `${move}px`; 
    else if(Math.abs(move)>this.threshold.max && this.currSlideIndex>=this.slidesNum-this.viewportSlides) ; 
    else this.slidesWrapper.style.right = `${0}px`;
}
ProductSlider.prototype.prevSlide = function(){
    let currPos = parseFloat(util.getStyle(this.slidesWrapper,'right')) ;//current pos of slidesWrapper
    let move = currPos+this.slideOffset;
    if(move<=this.threshold.min) this.slidesWrapper.style.right = `${move}px`; 
    else if(move>this.threshold.min && this.currSlideIndex<=this.viewportSlides-1) ;
    else this.slidesWrapper.style.right = `${-this.threshold.max}px`;
}
ProductSlider.prototype.setActiveBg = function(){
    //remove active class from prev bg
    for(let i=0 ; i<this.bgs.length ; i++){
        let bg = this.bgs[i] ;
        if(bg.classList.contains('active')){
            bg.classList.remove('active') ;
            break ;
        }
    }
    //add active class to new bg 
    this.bgs[this.currSlideIndex].classList.add('active') ;
}
new ProductSlider(document.querySelector('#product_info .slider '))
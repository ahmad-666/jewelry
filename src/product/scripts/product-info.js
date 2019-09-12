import util from '../../utilities/utilities' ;
//Slider------------------------------------------
//Slider------------------------------------------
//Slider------------------------------------------
function ProductSlider(elm){
    this.elm = elm ;
    this.bgs = this.elm.querySelectorAll('.bg .img') ;
    this.bgs.forEach(bg => {
        bg.addEventListener('click',this.bgHandler.bind(this));
    })
    this.slidesWrapper = this.elm.querySelector('.slides') ;
    this.slides = this.slidesWrapper.querySelectorAll('.slide') ;
    this.slides.forEach(slide => {
        slide.addEventListener('click',this.slideHandler.bind(this)) ;
    })
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
    else if(dir=='none') this.currSlideIndex = newIndex ;
    this.slides[this.currSlideIndex].classList.add('active') ;//give new slide active class
}
ProductSlider.prototype.nextSlide = function(){
    let currPos = parseFloat(this.slidesWrapper.style.right) ;//current pos of slidesWrapper
    let move = currPos-this.slideOffset;
    if(Math.abs(move)<=this.threshold.max) this.slidesWrapper.style.right = `${move}px`; 
    else if(Math.abs(move)>this.threshold.max && this.currSlideIndex>=this.slidesNum-this.viewportSlides) ; 
    else this.slidesWrapper.style.right = `${0}px`;
}
ProductSlider.prototype.prevSlide = function(){
    let currPos = parseFloat(this.slidesWrapper.style.right) ;//current pos of slidesWrapper
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
ProductSlider.prototype.slideHandler = function(e){
    let targetSlideIndex = util.getChildIndex(this.slidesWrapper,e.currentTarget) ;
    this.setActiveSlide(targetSlideIndex,'none') ;
    this.setActiveBg() ;
}
ProductSlider.prototype.bgHandler = function(e){
    e.stopPropagation();
    let imgPath = util.getStyle(e.currentTarget,'background-image') ;
    fixImg.style.backgroundImage = `${imgPath}` ;
    blackFilter.classList.add('show');
    fixImgWrapper.classList.add('show') ;
    util.docHandler(fixImgWrapper,[blackFilter]);
}
let blackFilter = document.querySelector('#black_filter') ;
let fixImgWrapper = document.querySelector('#fix_product_img') ;
let fixImg = fixImgWrapper.querySelector('.img');
let fixClose = fixImgWrapper.querySelector('span.close') ;
fixClose.addEventListener('click',e=>{
    blackFilter.classList.remove('show') ;
    fixImgWrapper.classList.remove('show');
})
new ProductSlider(document.querySelector('#product_info .slider '))
//Select------------------------------------------
//Select------------------------------------------
//Select------------------------------------------
function Select(elm){
    this.elm = elm ;
    this.input = this.elm.querySelector('input') ;
    this.ul = this.elm.querySelector('ul') ;
    this.lis = this.ul.querySelectorAll('li') ;
    this.arrow = this.elm.querySelector('i.fa-angle-down') ;
    this.input.addEventListener('click',this.inputHandler.bind(this));
    this.arrow.addEventListener('click',this.inputHandler.bind(this));
}
Select.prototype.inputHandler = function(e){
    e.stopPropagation();
    document.addEventListener('click',this) ;
    this.ul.classList.add('show') ;
    this.lis.forEach(li => {
        li.addEventListener('click',this) ;
    })
    selects.forEach(select => {
        if(select!=this) select.ul.classList.remove('show') ;
    })
}
Select.prototype.handleEvent = function(e){
    e.stopPropagation();
    if(e.currentTarget == document){
        let clickedElm = e.target ;
        if(!this.ul.contains(clickedElm)){
            selects.forEach(select => {
                select.ul.classList.remove('show') ;
                select.lis.forEach(li => {
                    li.removeEventListener('click',this);
                })
            })
            document.removeEventListener('click',this) ;
        }
    }
    else{
        let currLi = e.currentTarget ;
        this.input.value = currLi.textContent ;
        this.ul.classList.remove('show') ;
        document.removeEventListener('click',this) ;
        this.lis.forEach(li => {
            li.removeEventListener('click',this) ;
        })
        if(currLi.textContent == 'طلا') {
            weight.classList.remove('hide') ;
            updatePrice(currLi) ;
        }
        else if(currLi.textContent == 'نقره') {
            weight.classList.add('hide') ;
            updatePrice(currLi) ;
        }
        else if(this.elm.getAttribute('id')=='weight'){
            updatePrice(currLi) ;
        }
    }
}
let selects = [] ;
let product = document.querySelector('#infos') ;
product.querySelectorAll('.inputs .select').forEach(select => {
    selects.push(new Select(select)) ;
})
let weight = product.querySelector('#weight')  ;
let productNum = product.querySelector('.input_wrapper.number') ;
let mainPrice = product.querySelector('.buy .main_price') ;
let discount = product.querySelector('.buy .discount_val') ;
let discountPrice = product.querySelector('.buy .after_discount') ;
let initPrice = parseFloat(mainPrice.textContent) ;
function updatePrice(elm){
    let price = null ;
    //for silver and gold's weights
    if(elm.getAttribute('data-price')){
        productNum.querySelector('input').value = 1 ;
        initPrice = parseFloat(elm.getAttribute('data-price')) ;
        price = parseFloat(elm.getAttribute('data-price')) ;
    }
    //for when we select gold 
    else if(elm.textContent == 'طلا'){
        productNum.querySelector('input').value = 1 ;
        let firstWeight = weight.querySelector('li');
        initPrice = parseFloat(firstWeight.getAttribute('data-price')) ;
        weight.querySelector('input').value = firstWeight.textContent;
        price = parseFloat(firstWeight.getAttribute('data-price')) ;
    }
    //when we change number of product
    else { 
        let howMany = parseInt(elm.value) ;
        price = howMany*initPrice ;
    }
    mainPrice.textContent = `${price} تومان` ;
    if(product.classList.contains('discount')){
        let discountVal = parseFloat(discount.textContent) ; 
        discountPrice.textContent = `${price*(discountVal/100)} تومان` ;
    }
}
//Number------------------------------------------
//Number------------------------------------------
//Number------------------------------------------
function NumberInput(elm){
    this.elm = elm ;
    this.increase = this.elm.querySelector('.increase') ;
    this.decrease = this.elm.querySelector('.decrease') ;
    this.input = this.elm.querySelector('input') ;
    this.increase.addEventListener('click',this.add.bind(this)) ;
    this.decrease.addEventListener('click',this.subtract.bind(this)) ;
}
NumberInput.prototype.add = function(e){
    this.input.value = parseInt(this.input.value) + 1 ;
    updatePrice(this.input) ;
}
NumberInput.prototype.subtract = function(e){
    this.input.value = parseInt(this.input.value)-1>=1? parseInt(this.input.value)-1 : 1 ;
    updatePrice(this.input) ;
}
new NumberInput(productNum) ;
//prevent double click to select anything-----------------
//prevent double click to select anything-----------------
//prevent double click to select anything-----------------
document.addEventListener('mousedown', function (event) {
    if (event.detail > 1) {
      event.preventDefault();
    }
  }, false);

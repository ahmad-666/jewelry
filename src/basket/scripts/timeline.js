let basketForm = document.querySelector('form#basket');
let timeline = basketForm.querySelector("timeline") ;
function TimelineSlider(slider){
    this.slider = slider ;
    this.changeSlideTriggers = this.slider.querySelectorAll('.changeSlide') ;
    this.changeSlideTriggers.forEach(trigger => {
        trigger.addEventListener('click',this.changeSlide.bind(this)) ;
    })
}
TimelineSlider.prototype.changeSlide = function(e){
    let offset = -1 * parseInt(e.currentTarget.getAttribute('data-slide')) ;
    let currPos = parseFloat(this.slider.style.right) ;
    this.slider.style.right = `${currPos + (offset*100)}%` ;
}
new TimelineSlider(basketForm.querySelector('.slider')) ;
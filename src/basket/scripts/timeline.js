import basket from './basket.js' ;
function Progress(wrapper){
    this.wrapper = wrapper ;
    this.line = this.wrapper.querySelector('.line') ;
    this.stages = this.wrapper.querySelectorAll('.stage') ;
    this.currStage = 0 ;
    this.stagesNum = this.stages.length ;
}
Progress.prototype.move = function(dir,slideOffset){
    if(dir == 'forward') {
        //this.currStage = ((this.currStage+slideOffset)%(this.stagesNum))!=0 ? this.currStage+slideOffset : 0 ;
        this.currStage = ((this.currStage+slideOffset)<=(this.stagesNum-1)) ? this.currStage+slideOffset : 0 ;
        this.stages.forEach((stage,i)=>{
            if(i<=this.currStage) stage.classList.add('active') ;
        })
    }
    else if(dir == 'backward') {
        this.currStage = (this.currStage-slideOffset)>=0 ? this.currStage-slideOffset : this.stagesNum-1 ;
        this.stages.forEach((stage,i)=>{
            if(i>this.currStage) stage.classList.remove('active') ;
        })
        this.stages[this.currStage].classList.add('active') ;
    }
    this.line.style.width = `${this.currStage*(100/(this.stagesNum-1))}%` ;
}
function TimelineSlider(slider,progress){
    this.slider = slider ;  
    this.progress = progress ;
    this.changeSlideTriggers = this.slider.querySelectorAll('.changeSlide') ;
    this.changeSlideTriggers.forEach(trigger => {
        trigger.addEventListener('click',this.changeSlide.bind(this)) ;
    })  
}
TimelineSlider.prototype.changeSlide = function(e){
    if(e.currentTarget == basket.addressSubmit){
        if(basket.addressForm.validate){
            let offset = -1 * parseInt(e.currentTarget.getAttribute('data-slide')) ;
            let currPos = parseFloat(this.slider.style.right) ;
            this.slider.style.right = `${currPos + (offset*100)}%` ;
            if(offset<0) this.progress.move('forward',Math.abs(offset)) ;
            else this.progress.move('backward',Math.abs(offset)) ;
        }   
    }
    else {
        let offset = -1 * parseInt(e.currentTarget.getAttribute('data-slide')) ;
        let currPos = parseFloat(this.slider.style.right) ;
        this.slider.style.right = `${currPos + (offset*100)}%` ;
        if(offset<0) this.progress.move('forward',Math.abs(offset)) ;
        else this.progress.move('backward',Math.abs(offset)) ;
    }
}
function Timeline(timeline){
    this.timeline = timeline ;
    this.progressElm = this.timeline.querySelector('#timeline') ;
    this.sliderElm = this.timeline.querySelector('.slider') ;
    this.progress = new Progress(this.progressElm) ;
    this.slider = new TimelineSlider(this.sliderElm,this.progress) ;
}
new Timeline(basket.basketForm) ;

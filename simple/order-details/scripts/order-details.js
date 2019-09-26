function StarScore(wrapper){
    this.wrapper = wrapper ;
    this.stars = this.wrapper.querySelectorAll('.star') ;
    this.hiddenInput = this.wrapper.querySelector('input[type="hidden"]') ;
    this.score = null ;
    this.stars.forEach(star => {
        star.addEventListener('mouseenter',this) ;
    })
    this.stars.forEach(star => {
        star.addEventListener('click',this.setScore.bind(this)) ;
    })
    this.wrapper.addEventListener('mouseleave',this); 
}

StarScore.prototype.setScore = function(e){
    this.score = parseFloat(e.currentTarget.getAttribute('data-score')) ;
    this.hiddenInput.value = this.score ;
    this.stars.forEach((star,i)=>{
        if(i<=this.score-1) star.classList.add('active') ;
        else star.classList.remove('active') ;
    })
    this.stars.forEach(star => {
        star.removeEventListener('mouseenter',this) ;
    })
    this.wrapper.removeEventListener('mouseleave',this); 
}
StarScore.prototype.handleEvent = function(e){
    if(e.type == 'mouseenter'){
        this.score = parseFloat(e.currentTarget.getAttribute('data-score')) ;
        //this.hiddenInput.value = this.score ;
        this.stars.forEach((star,i)=>{
            if(i<=this.score-1) star.classList.add('active') ;
            else star.classList.remove('active') ;
        })
    }
    else if(e.type=='mouseleave'){
        this.score = null ;
        //this.hiddenInput.value = this.score ;
        this.stars.forEach(star => {
            star.classList.remove('active') ;
        })
    }
}
document.querySelectorAll('.starsScore').forEach(starScore => {
    new StarScore(starScore) ;
})

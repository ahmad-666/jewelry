import util from '../../utilities/utilities.js' ;
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
        this.input.setAttribute('value',currLi.textContent)  ;
        this.ul.classList.remove('show') ;
        document.removeEventListener('click',this) ;
        this.lis.forEach(li => {
            li.removeEventListener('click',this) ;
        })
        if(this.elm == sortInput){
            let sortVal = util.getChildIndex(currLi.parentElement,currLi) ;
            hiddenSort.value = sortVal ;
        }    
    }
}
let sort = document.querySelector('#order .sort') ;
let hiddenSort = sort.querySelector('input[type="hidden"]') ;
let sortInput = sort.querySelector('.input_wrapper') ;
let selects = [] ;
let orderWrapper = document.querySelector('#order') ;
orderWrapper.querySelectorAll('.select').forEach(select => {
    selects.push(new Select(select)) ;
})
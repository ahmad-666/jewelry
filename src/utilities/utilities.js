let getStyle = (elm,prop) => window.getComputedStyle(elm,null).getPropertyValue(prop) ;
let getChildIndex = (parent,targetChild) => {
    let index = null ;
    let children = parent.children ;
    children = [...children] ;
    for(let i=0 ; i<children.length ; i++){
        let child = children[i] ;
        if(child == targetChild) {
            index = i ;
            break ;
        }
    }
    return index ;
}
let getActiveIndex = parent => {
    let activeIndex = null ;
    let children = parent.children ;
    children = [...children] ;
    for(let i=0 ; i<children.length ; i++){
        let child = children[i] ;
        if(child.classList.contains('active')){
            activeIndex= i ;
            break ;
        }
    }
    return activeIndex ;
}
function docHandler(container,others){
    //others are elements like BlackFilter,BarsMenu,... that we want to change
    //their css classes if we click outside of container
    document.container = container ;
    document.others = [] ;
    others.forEach(other => {
        document.others.push(other) ;
    });
    document.addEventListener('click',docClick);
}
function docClick(e){
    e.stopPropagation();  
    let container = document.container ;
    let clickedElm = e.target ;
    if(!container.contains(clickedElm)){
        container.classList.remove('show') ;
        document.others.forEach(other => {
            other.classList.remove('show') ;
        })
        document.body.classList.remove('disableScroll') ;
        document.removeEventListener('click',docClick);
    }
}

function FormValidation(form){
    this.form = form ;
    this.inputs = this.form.querySelectorAll('.validate') ;
    this.form.addEventListener('submit',this.submitForm.bind(this)) ;
}
FormValidation.prototype.submitForm = function(e){
    e.preventDefault();
    if(this.formValidate()) this.form.submit() ;    
}
FormValidation.prototype.formValidate = function(){
    let validate = true ;
    for(let i=0 ; i<this.inputs.length ; i++){
        let input = this.inputs[i] ;
        if(!this.inputValidate(input)) {
            validate = false ;
            break ;
        }
    }
    return validate ;
}
FormValidation.prototype.inputValidate = function(input){
    let errorPopup = input.parentElement.querySelector('.error') ;
    if(input.getAttribute('id') == 'mobile'){
        if(input.value.length==11){ 
            whenValid(input) ;   
            return true ;
        }
        else whenNotValid(input) ;      
    }
    else if(input.getAttribute('id') == 'rep_password'){
        let password = this.form.querySelector('#password') ;
        if(password.value == input.value){
            whenValid(input) ;   
            return true ;
        }
        else whenNotValid(input) ;       
    }
    else {
        if(input.checkValidity()){ 
            whenValid(input) ;
            return true ;
        }
        else whenNotValid(input) ;      
    }
    function whenValid(input){
        input.removeEventListener('input',this) ;
        errorPopup.classList.remove('show') ;
    }
    function whenNotValid(input){
        input.addEventListener('input',this) ;
        errorPopup.classList.add('show') ;
        docHandler(errorPopup,[]) ;
    }
}
FormValidation.prototype.handleEvent = function(e){
    if(e.type == 'input'){
        let errorPopup = e.currentTarget.parentElement.querySelector('.error') ;
        errorPopup.classList.remove('show') ;
    }
}
export default{
    getStyle,
    getChildIndex,
    getActiveIndex,
    docHandler,
    FormValidation,
    
}
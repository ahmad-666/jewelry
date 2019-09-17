
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
    if(input.getAttribute('id') == 'rep_password'){
        let password = this.form.querySelector('#password') ;
        if(password.value == input.value){
            input.removeEventListener('input',this) ;
            errorPopup.classList.remove('show') ;
            return true ;
        }
        else {
            input.addEventListener('input',this) ;
            errorPopup.classList.add('show') ;
            docHandler(errorPopup,[]) ;
        }
    }
    else if(input.getAttribute('id') == 'mobile'){
        if(input.value.length==11){ 
            input.removeEventListener('input',this) ;
            errorPopup.classList.remove('show') ;
            return true ;
        }
        else {
            input.addEventListener('input',this) ;
            errorPopup.classList.add('show') ;
            docHandler(errorPopup,[]) ;
        }
    }
    else {
        if(input.checkValidity()){ 
            input.removeEventListener('input',this) ;
            errorPopup.classList.remove('show') ;
            return true ;
        }
        else {
            input.addEventListener('input',this) ;
            errorPopup.classList.add('show') ;
            docHandler(errorPopup,[]) ;
        }
    }
    
}
FormValidation.prototype.handleEvent = function(e){
    if(e.type == 'input'){
        let errorPopup = e.currentTarget.parentElement.querySelector('.error') ;
        errorPopup.classList.remove('show') ;
    }
}
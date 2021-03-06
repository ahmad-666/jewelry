//form validation------------------------------
//form validation------------------------------
//form validation------------------------------
function FormValidate(form,submit,inputs,send){
    this.form = form ;
    this.inputs = inputs ;
    this.submit = submit ;
    this.send = send ;
    this.submit.addEventListener('click',this.formSubmit.bind(this)) ;
    this.validate = false ;
}
FormValidate.prototype.formSubmit = function(e){
    e.preventDefault() ;
    if(this.allValidate())  {
        this.validate = true ;
        if(this.send) this.form.submit() ;
    }
}
FormValidate.prototype.allValidate = function(){
    let validate = true ;
    for(let i=0 ; i<this.inputs.length ; i++){
        let input = this.inputs[i] ;
        if(!this.validateInput(input)){
            this.validate = false ;
            validate = false ;
            break ;
        }
    }
    return validate ;
}
FormValidate.prototype.validateInput = function(input){   
    let msg = input.parentElement.querySelector('.msg') ;
    input.msg = msg ;
    if(input.readOnly){
        if(input.value!=''){
            this.isValid(input) ;
            return true ;
        }
        else this.isNotValid(input) ;      
    }
    else{
        if(input.getAttribute('id')=='passwordRepeat'){//password repeat handler
            let password = this.form.querySelector('input[type="password"]#password') ;
            input.password = password ;
            if(password.value == input.value){
                this.isValid(input) ;
                input.removeEventListener('input',this) ;     
                return true ;
            }
            else{
                this.isNotValid(input) ;
                input.addEventListener('input',this) ;
            }
        }
        else if(input.getAttribute('id')=='mobile'){
            if(input.value.length == 11){
                this.isValid(input) ;
                input.removeEventListener('input',this) ;     
                return true ;
            }
            else{
                this.isNotValid(input) ;
                input.addEventListener('input',this) ;
            }
        }
        else{
            if(input.checkValidity()){
                this.isValid(input) ;
                input.removeEventListener('input',this) ;     
                return true ;
            }
            else{
                this.isNotValid(input) ;
                input.addEventListener('input',this) ;
            }
        }
    }  
}
FormValidate.prototype.isValid = function(input){
    if(input.msg) input.msg.classList.remove('show') ;
    input.classList.remove('error') ;  
}
FormValidate.prototype.isNotValid = function(input){
    if(input.msg) input.msg.classList.add('show') ;
    input.classList.add('error') ;   
}
FormValidate.prototype.handleEvent = function(e){
    if(e.type === 'input'){
        let input = e.currentTarget ;
        if(input.getAttribute('id')=='passwordRepeat'){
            if(input.password.value == input.value) this.isValid(input) ;     
            else this.isNotValid(input) ;        
        }
        else if(input.getAttribute('id')=='mobile'){
            if(input.value.length == 11) this.isValid(input) ;     
            else this.isNotValid(input) ;        
        }
        else{
            if(input.checkValidity()) this.isValid(input) ;       
            else this.isNotValid(input) ;        
        }       
    }
}
//select/option------------------------------------------
//select/option------------------------------------------
//select/option------------------------------------------
function Select(wrapper,otherSelects){
    this.wrapper = wrapper ;
    this.input = this.wrapper.querySelector('input') ;
    this.label = this.wrapper.querySelector('label') ;
    this.ul = this.wrapper.querySelector('ul') ;
    this.lis = this.ul.querySelectorAll('li') ; 
    this.otherSelects = otherSelects ;
    this.input.addEventListener('click',this.openMenu.bind(this)) ;
}
Select.prototype.openMenu = function(e){
    e.stopPropagation() ;
    this.otherSelects.forEach(select => {
        if(select != this.wrapper) select.querySelector('ul').classList.remove('show') ;
    })
    this.ul.classList.add('show') ;
    this.lis.forEach(li => {
        li.addEventListener('click',this) ;
    }) ;
    document.addEventListener('click',this) ;
}
Select.prototype.handleEvent = function(e){
    e.stopPropagation() ;
    if(e.currentTarget != document){ //click on one the 'lis'
        let li = e.currentTarget ;
        this.ul.classList.remove('show') ;
        this.input.value = li.getAttribute('data-value') ;
        this.input.classList.remove('error') ;
        this.label.classList.add('top') ;
        this.lis.forEach(li => {
            li.removeEventListener('click',this) ;
        })
        document.removeEventListener('click',this) ;
    }
    else{//click on document     
        let clickedElm = e.target ;
        if(!this.ul.contains(clickedElm)){
            this.ul.classList.remove('show');
            this.lis.forEach(li => {
                li.removeEventListener('click',this) ;
            })
            document.removeEventListener('click',this) ;
        }
    }
    
}
//label handlers-------------------------------------
//label handlers-------------------------------------
//label handlers-------------------------------------
function LabelHandler(input){
    this.input = input ;
    this.label = this.input.parentElement.querySelector('label') ;
    this.input.addEventListener('blur',this.focusLost.bind(this)) ;
}
LabelHandler.prototype.focusLost = function(e){
    if(this.input.value.length!=0) this.label.classList.add('top');
    else this.label.classList.remove('top');
}
//just number on input[type="number"]---------------
//just number on input[type="number"]---------------
//just number on input[type="number"]---------------
function NumberInput(input){
    this.input = input ;
    this.input.addEventListener('keypress',this.justNumber.bind(this)) ;
}
NumberInput.prototype.justNumber = function(e){
    if(e.key =='e' || e.key=='E') e.preventDefault(); 
}
//export --------------------------------
//export --------------------------------
//export --------------------------------
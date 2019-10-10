function ValidateForm(form){
    this.form = form ;
    this.inputs = form.querySelectorAll('.validate') ;
    this.form.addEventListener('submit',this.submitHandler.bind(this));
}
ValidateForm.prototype.submitHandler = function(e){
    e.preventDefault();
    if(this.validation()) this.form.submit() ;
}
ValidateForm.prototype.validation = function(e){
    let validate = true ;
    for(let i=0 ; i<this.inputs.length ; i++){
        let input = this.inputs[i] ;
        if(!this.validateInput(input)){
            validate = false ;
            break ;
        }
    }
    return validate ;
}
ValidateForm.prototype.validateInput = function(input){
    if(input.checkValidity()){
        input.classList.remove('error') ;
        return true ;
    }
    else {
        input.classList.add('error') ;
        return false ;
    }
}
new ValidateForm(document.querySelector('form#reports')) ;

let numbers = document.querySelectorAll('input[type="number"]') ;
fixInputNumber(numbers) ;
function fixInputNumber(numbers){
    numbers.forEach(number => {
        number.addEventListener('keypress',justAcceptNumber) ;
    })
}
function justAcceptNumber(e){
    if(e.key =='e' || e.key=='E')e.preventDefault(); 
}	
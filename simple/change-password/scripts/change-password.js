//import form from '../../utilities/scripts/form.js'
let changePassForm = document.querySelector('form#changePass') ;
let changePassSubmit = changePassForm.querySelector('button[type="submit"]') ;
let changePassInputs = changePassForm.querySelectorAll('.validate') ;
changePassForm.querySelectorAll('.labelHandler').forEach(labelHandler => {
     new LabelHandler(labelHandler) ;
})
new FormValidate(changePassForm,changePassSubmit,changePassInputs,true) ;


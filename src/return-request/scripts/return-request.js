import form from '../../utilities/scripts/form.js'
let returnForm = document.querySelector('form#returnRequest') ;
let returnSubmit = returnForm.querySelector('button[type="submit"]') ;
let returnInputs = returnForm.querySelectorAll('.validate') ;
returnForm.querySelectorAll('.labelHandler').forEach(labelHandler => {
     new form.LabelHandler(labelHandler) ;
})
new form.FormValidate(returnForm,returnSubmit,returnInputs,true) ;


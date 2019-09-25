import form from '../../utilities/scripts/form.js' ;
let userInfoForm = document.querySelector('form#userInfo') ;
let userInfoSubmit = userInfoForm.querySelector('button[type="submit"]') ;
let userInfoInputs = userInfoForm.querySelectorAll('.validate') ;
let labelHandlers = userInfoForm.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new form.LabelHandler(labelHandler) ;
})
new form.FormValidate(userInfoForm,userInfoSubmit,userInfoInputs,true) ;

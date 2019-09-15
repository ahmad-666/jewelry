import util from '../../utilities/utilities.js' ;
let commentWrapper = document.querySelector('#comments') ;
let addCommentTrigger = commentWrapper.querySelector('#addComment') ;
let addCommentForm = commentWrapper.querySelector('#userComment') ;
let comments = commentWrapper.querySelectorAll('.comment') ;
let replyTriggers = commentWrapper.querySelectorAll('.comment .reply') ;
let replyForms = commentWrapper.querySelectorAll('.comment .replyForm') ;
let autoExpandTextAreas = commentWrapper.querySelectorAll('textarea.autoExpand') ;
let approvePopup = document.querySelector('#adminApprove') ;
let approveClose = approvePopup.querySelector('button') ;
//Form validation -------------------------------------
//Form validation -------------------------------------
//Form validation -------------------------------------
function FormValidation(form){
    this.form = form ;
    this.formElms = this.form.querySelectorAll('.validate') ;
    this.form.addEventListener('submit',this.submitForm.bind(this)) ;
}
FormValidation.prototype.submitForm = function(e){
    e.preventDefault();
    if(this.formValidate()) {
        //this.form.submit() ;
        approvePopup.classList.add('show') ;
        document.addEventListener('click',approveDocHandler) ;
    }
}
FormValidation.prototype.formValidate = function(){
    let validate = true ;
    for(let i=0 ; i<this.formElms.length ; i++){
        let formElm = this.formElms[i] ;
        if(!this.inputValidate(formElm)) {
            validate = false ;
            break ;
        }       
    }
    return validate ;
}
FormValidation.prototype.inputValidate = function(formElm){
    if(formElm.checkValidity())  {
        formElm.classList.remove('error') ;
        formElm.removeEventListener('input',this) ;
        return true ;
    }
    else {
        formElm.classList.add('error') ;
        formElm.addEventListener('input',this) ;
    }
}
FormValidation.prototype.handleEvent = function(e){
    if(e.type == 'input'){
        let formElm = e.currentTarget ;
        if(formElm.checkValidity()) formElm.classList.remove('error') ;
        else formElm.classList.add('error') ;
    }
}
document.querySelectorAll('form.validateForm').forEach(form => {
    new FormValidation(form) ;
})
//label handler -------------------------------------
//label handler -------------------------------------
//label handler -------------------------------------
function LabelHandler(inputWrapper){
    this.inputWrapper = inputWrapper ;
    this.label = this.inputWrapper.querySelector('label') ;
    this.formElm = this.inputWrapper.querySelector('input,textarea') ;
    this.formElm.addEventListener('input',this.inputHandler.bind(this)) ;
}
LabelHandler.prototype.inputHandler = function(e){
    if(this.formElm.value.length!=0) this.formElm.classList.add('labelHandler') ;
    else this.formElm.classList.remove('labelHandler') ;
}
document.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new LabelHandler(labelHandler) ;
})
//autoExpand textarea -----------------------
//autoExpand textarea -----------------------
//autoExpand textarea -----------------------
autoExpandTextAreas.forEach(autoExpand => {
    autoExpand.addEventListener('input',checkExpand) ;
})
function checkExpand(e){
    let formElm = this.parentElement.parentElement ;
    formElm.style.height = 'auto' ;
    formElm.style.height = `${formElm.scrollHeight}px` ;
    this.style.height = 'auto' ;
    let textAreaHeight = null ;
    if(this.value.length != 0){
        textAreaHeight = parseFloat(util.getStyle(this,'border-top')) + 
            this.scrollHeight + 
            parseFloat(util.getStyle(this,'border-bottom')) ;
        this.style.height = `${textAreaHeight}px` ;
        formElm.style.height = `${formElm.scrollHeight}px` ;
    }
    else {
        this.style.height = '3em' ;      
    }
}
//add comment form -------------------------------------
//add comment form -------------------------------------
//add comment form -------------------------------------
addCommentTrigger.addEventListener('click',toggleAddComment) ;
function toggleAddComment(e){
    addCommentForm.classList.toggle('show') ;
    if(addCommentForm.classList.contains('show')) addCommentForm.style.height = `${addCommentForm.scrollHeight}px` ;
    else addCommentForm.style.height = `${0}px` ;
}
//each comment -------------------------------------
//each comment -------------------------------------
//each comment -------------------------------------
function Comment(comment){
    this.comment = comment ;
    this.likeTriggers = this.comment.querySelectorAll('.likeTrigger') ; //comment itself and all its replies
    this.replyTrigger = this.comment.querySelector('.reply') ;
    this.replyForm = this.comment.querySelector('.replyForm') ;
    this.likeTriggers.forEach(like => {
        like.addEventListener('click',this.likeHandler.bind(this)); 
    });
    this.replyTrigger.addEventListener('click',this.toggleReply.bind(this)) ;
}
Comment.prototype.likeHandler = function(e){
    let like = e.currentTarget ;
    let likesNum = like.parentElement.querySelector('.likesNum') ;
    like.classList.toggle('fas') ;
    like.classList.toggle('far') ;
    if(like.classList.contains('fas')) likesNum.textContent = parseInt(likesNum.textContent) + 1 ;
    else likesNum.textContent = parseInt(likesNum.textContent) - 1 ;
}
Comment.prototype.toggleReply = function(e){
    this.replyForm.classList.toggle('show') ;
    if(this.replyForm.classList.contains('show')) this.replyForm.style.height = `${this.replyForm.scrollHeight}px` ;
    else this.replyForm.style.height = `${0}px` ;
}
commentWrapper.querySelectorAll('.comment').forEach(comment => {
    new Comment(comment) ;
}) ;
//approve popup-----------------------------------------------------
//approve popup-----------------------------------------------------
//approve popup-----------------------------------------------------
approveClose.addEventListener('click',closeApprove) ;
function closeApprove(e){
    approvePopup.classList.remove('show') ;
}
function approveDocHandler(e){
    let clickedElm = e.target ;
    if(!approvePopup.contains(clickedElm)) {
        approvePopup.classList.remove('show') ;
        document.removeEventListener('click',approveDocHandler) ;
    }
}
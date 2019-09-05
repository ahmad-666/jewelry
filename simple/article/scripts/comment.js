let wrapper = document.querySelector('#comments') ;
//Show #user_comment
//-----------------------------------------------------------
//-----------------------------------------------------------
let addCommentBtn = wrapper.querySelector('.add_comment') ;
let addComment = wrapper.querySelector('#user_comment') ;
let addCommentHeight = addComment.clientHeight ;
addComment.classList.add('hide') ;
addCommentBtn.addEventListener('click',toggleAddComment) ;
function toggleAddComment(e){
    addComment.classList.add('addTransition') ;
    addComment.classList.toggle('show');
    if(addComment.classList.contains('show')) addComment.style.height = `${addCommentHeight}px` ;
    else addComment.style.height = `${0}px` ;  
}
//likes
//----------------------------------------------------------
//----------------------------------------------------------
let likes = wrapper.querySelectorAll('.comment .content .likes i.fa-heart') ;
likes.forEach(like => {
    like.addEventListener('click',toggleLike) ;
})
function toggleLike(e){
    this.classList.toggle('far') ;
    this.classList.toggle('fas') ;
    this.classList.toggle('red') ;
    let likesNum = this.parentElement.querySelector('p') ;
    if(this.classList.contains('fas')) likesNum.textContent = parseInt(likesNum.textContent) + 1 ; 
    else likesNum.textContent = parseInt(likesNum.textContent) - 1 ; 
}
//reply
//----------------------------------------------------------
//----------------------------------------------------------
let replySample = wrapper.querySelector('.comment > .reply');
let replyHeight = replySample.clientHeight ;
wrapper.querySelectorAll('.comment .reply').forEach(reply => {
    reply.classList.add('hide') ;
})
let replyTriggers = wrapper.querySelectorAll('.comment .content .likes_reply .reply') ;
replyTriggers.forEach(replyTrigger => {
    replyTrigger.addEventListener('click',toggleReply) ;
})
function toggleReply(e){
    let targetID = `#${this.getAttribute('data-target')}` ;
    let target = wrapper.querySelector(targetID) ;
    target.classList.add('addTransition') ;
    target.classList.toggle('show') ;
    if(target.classList.contains('show')) target.style.height = `${replyHeight}px` ;
    else target.style.height = `${0}px` ;
}
//add comment form validation
//----------------------------------------------------------
//----------------------------------------------------------
let addCommentForm = document.forms['user_comment'] ;
let addCommentName = addCommentForm['name'] ;
let addCommentEmail = addCommentForm['email'] ;
let addCommentContent = addCommentForm['comment_content'] ;
addCommentForm.addEventListener('submit',submitAddComment) ;
function submitAddComment(e){
    e.preventDefault();
    if(addCommentValidate()) this.submit() ;
}
function addCommentValidate(){
    return (addCommentNameValidate() && addCommentEmailValidate() && addCommentContentValidate()) ;
}
function addCommentNameValidate(){
    if(addCommentName.checkValidity()){
        addCommentName.classList.remove('error') ;
        addCommentName.removeEventListener('input',monitorAddCommentName) ;
        return true ;
    }
    else if(addCommentName.validity.valueMissing) {
        addCommentName.classList.add('error') ;
        addCommentName.addEventListener('input',monitorAddCommentName) ;
    }
}
function monitorAddCommentName(e){
    if(!this.validity.valueMissing) addCommentName.classList.remove('error') ;
    else addCommentName.classList.add('error') ;
    
}
function addCommentEmailValidate(){
    if(addCommentEmail.checkValidity()){
        addCommentEmail.classList.remove('error') ;
        addCommentEmail.removeEventListener('input',monitorAddCommentEmail) ;
        return true ;
    }
    else if(addCommentEmail.validity.valueMissing || addCommentEmail.validity.typeMismatch) {
        addCommentEmail.classList.add('error') ;
        addCommentEmail.addEventListener('input',monitorAddCommentEmail) ;
    }
}
function monitorAddCommentEmail(e){
    if(!this.validity.valueMissing && !this.validity.typeMismatch){
        this.classList.remove('error') ;
    }
    else {
        this.classList.add('error') ;
    }
}
function addCommentContentValidate(){
    if(addCommentContent.checkValidity()){
        addCommentContent.classList.remove('error') ;
        addCommentContent.removeEventListener('input',monitorAddCommentContent) ;
        return true ;
    }
    else if(addCommentContent.validity.valueMissing) {
        addCommentContent.classList.add('error') ;
        addCommentContent.addEventListener('input',monitorAddCommentContent) ;
    }
}
function monitorAddCommentContent(e){
    if(!this.validity.valueMissing) this.classList.remove('error') ;
    else this.classList.add('error') ;
}
//reply comment form validation
//----------------------------------------------------------
//----------------------------------------------------------
function ReplyForm(elm){
    this.elm = elm ;
    this.replyText = this.elm.querySelector('textarea') ;
    this.elm.addEventListener('submit',this.submitHandler.bind(this)) ;
} 
ReplyForm.prototype.submitHandler = function(e){
    e.preventDefault() ;
    if(this.validate()) this.elm.submit() ;
}
ReplyForm.prototype.validate = function(){
    if(this.replyText.checkValidity()){
        this.replyText.classList.remove('error') ;
        this.replyText.removeEventListener('input',this) ;
        return true ;
    }
    else if(this.replyText.validity.valueMissing) {
        this.replyText.classList.add('error') ;
        this.replyText.addEventListener('input',this) ;
    }
}
ReplyForm.prototype.handleEvent = function(e){
    if(!this.replyText.validity.valueMissing) this.replyText.classList.remove('error') ;
    else this.replyText.classList.add('error') ;
}
wrapper.querySelectorAll('.comment > form').forEach(reply => {
    new ReplyForm(reply) ;
})
import scssVars from '../../variables.scss' ;
let wrapper = document.querySelector('#faq') ;
let questions = wrapper.querySelectorAll('.title') ;
questions.forEach(question => {
    question.addEventListener('click',toggleQuestion) ;
})
function toggleQuestion(e){
    let icon = this.querySelector('i') ;
    let answer = this.parentElement.querySelector('.answer') ;
    questions.forEach(q => {
        if(q!==this){
            q.querySelector('i').classList.remove('fa-times') ;
            q.querySelector('i').classList.add('fa-plus') ;
            q.parentElement.querySelector('.answer').style.height = '0px' ;
            q.parentElement.querySelector('.answer').classList.remove('show');
        }    
    })
    if(!answer.classList.contains('show')){
        icon.classList.remove('fa-plus') ;
        icon.classList.add('fa-times') ; 
        answer.style.height = `${answer.scrollHeight}px` ;
        answer.classList.add('show') ;
    }
    else{
        icon.classList.remove('fa-times') ;
        icon.classList.add('fa-plus') ; 
        answer.style.height = `0px` ;
        answer.classList.remove('show') ;
    }
}
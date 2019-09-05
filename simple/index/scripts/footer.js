let modalsTrigger = document.querySelectorAll('.modal_trigger');
let modals = document.querySelectorAll('.modal') ;
let currOpenModal = null ;
modalsTrigger.forEach(modalTrigger=>{
    modalTrigger.addEventListener('click',toggleModal) ;
})
function toggleModal(e){
    e.stopPropagation();
    modals.forEach(modal => {
        modal.classList.remove('show') ;
    })
    let modalID = `#${this.getAttribute('id')}_modal` ;
    let modal = document.querySelector(modalID) ;
    modal.classList.add('show') ;
    currOpenModal = modal ;
    document.addEventListener('click',docHandler) ;
}
function docHandler(e){
    let clickedElm = e.target ;
    if(!currOpenModal.contains(clickedElm)) {
        currOpenModal.classList.remove('show') ;
        document.removeEventListener('click',docHandler) ;
    }
}
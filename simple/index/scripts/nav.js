let mobileMenu = document.querySelector('#mobileMenu') ;
let mobileMenuBars = document.querySelector('.fa-bars') ;
let mobileMenuUL = mobileMenu.querySelector('ul') ;
let mobileMenuLI = mobileMenu.querySelectorAll('li') ;
let menus = mobileMenu.querySelectorAll('.menu') ;
let currMenu = null ;
mobileMenuBars.addEventListener('click',toggleMobileMenuUL) ;
function toggleMobileMenuUL(e){
    e.stopPropagation();
    mobileMenuUL.classList.toggle('show') ;
    if(!mobileMenuUL.classList.contains('show')){
        if(currMenu) {
            currMenu.classList.remove('show');
        }
    }
    document.addEventListener('click',closeMobileMenuUL);
}
function closeMobileMenuUL(e){
    e.stopPropagation() ;
    let clickedElm = e.target ;
    if(!mobileMenu.contains(clickedElm)){
        mobileMenuUL.classList.remove('show') ;
        if(currMenu) {
            currMenu.classList.remove('show');
        }
        document.removeEventListener('click',closeMobileMenuUL);
    }
}
mobileMenuLI.forEach(li => {
    li.addEventListener('click',toggleMobileMenuLI) ;
})
function toggleMobileMenuLI(e){
    currMenu = this.querySelector('.menu');
    menus.forEach(menu => {
        if(menu!=currMenu) menu.classList.remove('show') ;
    })
    let clickedElm = e.target ;
    if(!currMenu.contains(clickedElm)){
        currMenu.classList.toggle('show') ;
    }
    
}



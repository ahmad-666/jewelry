import FontFaceObserver from 'fontfaceobserver';
let tabTriggers = document.querySelectorAll('.tab') ;
let contentWrapper = document.querySelector('.content') ;
let tabContents = document.querySelectorAll('.tab_content') ;
let font = new FontFaceObserver('iranSans');
font.load().then(function () {
    contentWrapper.style.height = `${tabContents[0].clientHeight}px` ;
});
tabTriggers.forEach(tabTrigger => {
    tabTrigger.addEventListener('click',openTab) ;
});
function openTab(e){
    let targetID = null ;
    tabTriggers.forEach(tabTrigger => {
        if(tabTrigger!=this) tabTrigger.classList.remove('active') ;
        else {
            tabTrigger.classList.add('active') ;
            targetID = `#${tabTrigger.getAttribute('data-target')}` ;
        }
    })
    let targetElm = contentWrapper.querySelector(targetID) ;
    tabContents.forEach(tabContent=>{
        if(tabContent!=targetElm) tabContent.classList.remove('show') ;
        else {
            contentWrapper.style.height = `${targetElm.clientHeight}px` ;
            tabContent.classList.add('show') ;
        }
    })
}
//ellipse 
let ellipses = document.querySelectorAll('.ellipse') ;
ellipses.forEach(ellipse => {
    checkEllipse(ellipse) ;
})
function checkEllipse(elm){
    let parent = elm.parentElement;
    let threshold = parseFloat(window.getComputedStyle(parent,null).getPropertyValue('max-height')) ;
    if(parent.scrollHeight > threshold) elm.style.display = "block" ;
}
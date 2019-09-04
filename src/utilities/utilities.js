let getStyle = (elm,prop) => window.getComputedStyle(elm,null).getPropertyValue(prop) ;
let getChildIndex = (parent,targetChild) => {
    let index = null ;
    let children = parent.children ;
    children = [...children] ;
    for(let i=0 ; i<children.length ; i++){
        let child = children[i] ;
        if(child == targetChild) {
            index = i ;
            break ;
        }
    }
    return index ;
}
let getActiveIndex = parent => {
    let activeIndex = null ;
    let children = parent.children ;
    children = [...children] ;
    for(let i=0 ; i<children.length ; i++){
        let child = children[i] ;
        if(child.classList.contains('active')){
            activeIndex= i ;
            break ;
        }
    }
    return activeIndex ;
}
function docHandler(container,others){
    //others are elements like BlackFilter,BarsMenu,... that we want to change
    //their css classes if we click outside of container
    document.container = container ;
    document.others = [] ;
    others.forEach(other => {
        document.others.push(other) ;
    });
    document.addEventListener('click',docClick);
}
function docClick(e){
    e.stopPropagation();  
    let container = document.container ;
    let clickedElm = e.target ;
    if(!container.contains(clickedElm)){
        container.classList.remove('show') ;
        document.others.forEach(other => {
            other.classList.remove('show') ;
        })
        document.body.classList.remove('disableScroll') ;
        document.removeEventListener('click',docClick);
    }
}
export default{
    getStyle,
    getChildIndex,
    getActiveIndex,
    docHandler,
}
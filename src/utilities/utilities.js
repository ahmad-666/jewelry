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
function docHandler(container,blackFilter){
    document.container = container ;
    document.blackFilter = blackFilter ;
    document.addEventListener('click',docClick);
}
function docClick(e){
    e.stopPropagation();  
    let container = this.container ;
    let blackFilter = this.blackFilter ;
    let clickedElm = e.target ;
    if(!container.contains(clickedElm)){
        container.classList.remove('show') ;
        if(blackFilter) blackFilter.classList.remove('show') ;
        document.removeEventListener('click',docClick);
    }
}
export default{
    getStyle,
    getChildIndex,
    getActiveIndex,
    docHandler,
}
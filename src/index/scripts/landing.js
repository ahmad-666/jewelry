let getStyle = (elm,prop) => window.getComputedStyle(elm,null).getPropertyValue(prop) ;
let colBugs = document.querySelectorAll('.col-bug') ;
colBugs.forEach(colBug => {
    fixColBug(colBug) ;
})
function fixColBug(container){
    let childNum = container.children.length ;
    let containerHeight = container.clientHeight ;
    let childHeight = container.children[0].clientHeight ;
    let childWidth = container.children[0].clientWidth ;
    let containerPadding = {
        top: parseFloat(getStyle(container,'padding-top')),
        bottom: parseFloat(getStyle(container,'padding-bottom')),
        right: parseFloat(getStyle(container,'padding-right')),
        left: parseFloat(getStyle(container,'padding-left')),
    } ;
    let childMargin = {
        top: parseFloat(getStyle(container.children[0],'margin-top')),
        bottom: parseFloat(getStyle(container.children[0],'margin-bottom')),
        right: parseFloat(getStyle(container.children[0],'margin-right')),
        left: parseFloat(getStyle(container.children[0],'margin-left'))
    }
    let rowNum = Math.floor((containerHeight-containerPadding.top-containerPadding.bottom)/(childHeight+childMargin.top+childMargin.bottom)) ;
    let colNum = Math.ceil(childNum/rowNum) ;
    let finalWidth = colNum*(childWidth+childMargin.right+childMargin.left) + childMargin.left + containerPadding.right + containerPadding.left ;
    container.style.width = `${finalWidth}px` ;

}

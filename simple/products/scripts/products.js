//ellipses on each product name
//-----------------------------------------------------------
//-----------------------------------------------------------
let ellipses = document.querySelectorAll('.ellipse') ;
ellipses.forEach(ellipse => {
    let parent = ellipse.parentElement ;
    let threshold = parseInt(window.getComputedStyle(parent,null).getPropertyValue('max-height'));
    if(parent.scrollHeight > threshold) {
        ellipse.style.display = 'block' ;
    }
    else{
        parent.style.textAlign = 'center' ;
    }
})
//set width of each product 
//-----------------------------------------------------------
//-----------------------------------------------------------
//let getStyle = (elm,prop) => window.getComputedStyle(elm,null).getPropertyValue(prop) ;
let productsWrapper = document.querySelector('#products') ;
let products = productsWrapper.querySelectorAll('.product') ;
//setColNum() ;
function setColNum(){
    let colNum = null ;
    if(window.innerWidth>1500) colNum = 5 ;
    else if(window.innerWidth<=1500 && window.innerWidth>1280) colNum = 4 ; 
    else if(window.innerWidth<=1280 && window.innerWidth>1000) colNum = 3 ; 
    else if(window.innerWidth<=1000 && window.innerWidth>800) colNum = 2 ; 
    else colNum = 1 ; 
    setFlexWidth(productsWrapper,products[0],colNum,products) ;
}
function setFlexWidth(container,child,colNum,children){
    //all child should have equal margin/border
    //at the end all child will have equal width
    let containerPadding = {
        right: parseFloat(getStyle(container,'padding-right')) ,
        left: parseFloat(getStyle(container,'padding-left')) 
    };
    let childMargin = {
        right: parseFloat(getStyle(child,'margin-right')) ,
        left: parseFloat(getStyle(child,'margin-left')) 
    };
    let childBorder = {
        right: parseFloat(getStyle(child,'border-right')) ,
        left: parseFloat(getStyle(child,'border-left')) 
    };
    let containerWidth = container.clientWidth-containerPadding.left-containerPadding.right ;
    let childWidth = (containerWidth-(colNum*(childBorder.left+childBorder.right+childMargin.left+childMargin.right)))/colNum ;
    //childWidth = 
    children.forEach(child => child.style.width = `${childWidth}px`)
}
// window.addEventListener('resize',e=>{
//     setColNum() ;
// })
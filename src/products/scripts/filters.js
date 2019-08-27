import wNumb from 'wnumb' ;
import noUiSlider from 'nouislider' ;
//price ranger
//----------------------------------------------------
//----------------------------------------------------
let priceWrapper = document.querySelector('#price') ;
let ranger = priceWrapper.querySelector('#range');
let min = 0 ;
let max = 2000000
noUiSlider.create(ranger,{
    orientation: 'horizontal' ,
    direction: 'rtl',
    animate: true,
    animationDuration: 300,
    behaviour: 'tap', 
    margin: 100000 ,
    range: {
        'min': [min],
        'max': [max]
    },
    start: [min,max],
    connect: [false,true,false],
    step: 100000,
    tooltips: [
        wNumb({
            decimals: 0, 
            thousand: '.', 
            // suffix: ' تومان' 
        }) ,
        wNumb({
            decimals: 0, 
            thousand: '.', 
            // suffix: ' تومان' 
        })      
    ] ,
    format: wNumb({ 
        decimals: 0, 
        thousand: '' 
    })
});
ranger.style.border = "none" ;
let handlers = ranger.querySelectorAll('.noUi-handle') ;
handlers.forEach((handler,i) => {
    handler.classList.add('circle') ;
    switch(i){
        case 0 :
            handler.classList.add('right') ;
            break ;
        case 1 :
            handler.classList.add('left') ;
            break ;
    }
    
})
// let tooltips = ranger.querySelectorAll('.noUi-tooltip') ;
// tooltips.forEach((tooltip,i)=>{
//     tooltip.classList.add('newStyle') ;
//     switch(i) {
//         case 0 :
//             tooltip.classList.add('right') ;
//             break ;
//         case 1 :
//             tooltip.classList.add('left') ;
//             break ;
//     }
// }) 
let minPrice = priceWrapper.querySelector('#min_price') ;
let maxPrice = priceWrapper.querySelector('#max_price') ;
//let price = document.querySelector('#price') ;
// handlers.forEach(handler => {
//     handler.addEventListener('mousedown',e=>{
//         let tooltip = handler.querySelector('.noUi-tooltip') ;
//         tooltip.style.display = "block" ;
//     }) ;
//     //console.log(handler.parentElement)
//     price.addEventListener('mouseup',e=>{
//         tooltips.forEach(tooltip => {
//             tooltip.style.display = 'none' ;
//         })
//     }) ;
// })
// handlers.forEach(handler => {
//     handler.addEventListener('touchstart',e=>{
//         let tooltip = handler.querySelector('.noUi-tooltip') ;
//         tooltip.style.display = "block" ;
//     }) ;
//     price.addEventListener('touchend',e=>{
//         tooltips.forEach(tooltip => {
//             tooltip.style.display = 'none' ;
//         })
//     }) ;
// })
let priceText = ranger.parentElement.querySelector('p') ;
priceText.textContent = `${min}تومان - ${max}تومان` ;
ranger.noUiSlider.on('update',()=>{
    minPrice.value = ranger.noUiSlider.get()[0];
    maxPrice.value = ranger.noUiSlider.get()[1];   
    priceText.textContent = `${minPrice.value}تومان - ${maxPrice.value}تومان` ;
});
//collapse/expand animation
//----------------------------------------------------
//----------------------------------------------------
let filtersWrapper = document.querySelector('#filters') ;
let filtersContents = filtersWrapper.querySelectorAll('.filter:not(#price) .content') ;
let arrows = filtersWrapper.querySelectorAll('.filter .title i') ;
let contentsHeights = [] ;
filtersContents.forEach(content => {
    contentsHeights.push(content.scrollHeight) ;
    content.classList.add('hide') ;
}) ;
arrows.forEach((arrow,i) => {
    arrow.addEventListener('click',function(e){
        let content = this.parentElement.parentElement.querySelector('.content') ;
        content.classList.toggle('hide') ;
        if(!content.classList.contains('hide')) {
            content.classList.remove('fade_out') ;
            content.classList.add('fade_in') ;
            content.style.height = `${contentsHeights[i]}px` ; 
        }
        else {            
            content.classList.remove('fade_in') ;
            content.classList.add('fade_out') ;
            content.style.height = `0px` ;
        }    
    }) ;
});
//checkboxes
//----------------------------------------------------
//----------------------------------------------------
let mainCategories = filtersWrapper.querySelectorAll('.filter .title .main_category') ;
mainCategories.forEach(mainCategory => {
    mainCategory.addEventListener('change',mainCategoryHandler) ;
});
function mainCategoryHandler(e){
    let subCategories = this.parentElement.parentElement.parentElement.querySelectorAll('.sub_category') ;
    if(this.checked){
        subCategories.forEach(subCategory => {
            subCategory.checked = true ;
        })
    }
    else{
        subCategories.forEach(subCategory => {
            subCategory.checked = false ;
        })
    }
}
let subCategories = filtersWrapper.querySelectorAll('.filter .content .sub_category') ;
subCategories.forEach(subCategory => {
    subCategory.addEventListener('change',subCategoryHandler) ;
})
function subCategoryHandler(e){
    let mainCategory = this.parentElement.parentElement.parentElement.querySelector('.title .main_category') ;
    let subCategories = this.parentElement.parentElement.querySelectorAll('.sub_category') ;
    let noSubCategory = true ;
    subCategories.forEach(subCategory => {
        if(subCategory.checked) noSubCategory = false ;
    })
    if(noSubCategory) mainCategory.checked = false ;
    else mainCategory.checked = true ;

}
// let getStyle = (elm,prop) => window.getComputedStyle(elm,null).getPropertyValue(prop) ;
// let colBugs = document.querySelectorAll('.col_bug') ;
// // colBugs.forEach(colBug => {
// //     fixColBug(colBug) ;
// // })
// fixColBug(colBugs[0]) ;

// function fixColBug(container){
//     //height/margin of each flex-item should be equal
//    let containerHeight = container.clientHeight ;
//    let children = [...container.children] ;
//    let childNum = children.length ;
//    let childHeight = children[0].offsetHeight ;
//    let containerPadding = {
//        top: parseFloat(getStyle(container,'padding-top')),
//        bottom: parseFloat(getStyle(container,'padding-bottom')),
//        right: parseFloat(getStyle(container,'padding-right')),
//        left: parseFloat(getStyle(container,'padding-left'))
//    }
//    let childMargin = {
//        top: parseFloat(getStyle(children[0],'margin-top')),
//        bottom: parseFloat(getStyle(children[0],'margin-bottom')),
//        right: parseFloat(getStyle(children[0],'margin-right')),
//        left: parseFloat(getStyle(children[0],'margin-left')),
//    }
//    let rowNum = Math.floor((containerHeight-containerPadding.top-containerPadding.bottom)/childHeight+childMargin.top+childMargin.bottom) ;
//    let colNum = Math.ceil(childNum/rowNum) ;
//    let finalWidth = 0 ;
//    let counter = 0 ;
//    for(let i=0 ; i<children.length ; i+=rowNum){
//        //for each column we get the max width of flex-items that are inside that column
//        let max = -1 ;
//        counter++ ;
//        for(let j=i ; j<rowNum*counter ; j++){
//          if(children[j]){
//              if(children[j].offsetWidth > max) max = children[j].offsetWidth ;
//          }
//        }
//        finalWidth+=(max+childMargin.right+childMargin.left) ;
//    }
//    finalWidth+= (containerPadding.right + containerPadding.left) ;
//    container.style.width = `${finalWidth}px` ;
// }
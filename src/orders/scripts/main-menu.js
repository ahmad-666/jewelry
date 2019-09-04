import util from '../../utilities/utilities' ;
let sideMenu = document.querySelector('aside') ;
let sideMenuTrigger = document.querySelector('body > .fa-bars.main_menu') ;
let blackFilter = document.querySelector('#black_filter') ;
sideMenuTrigger.addEventListener('click',toggleSideMenu) ;
function toggleSideMenu(e){
    e.stopPropagation();
    blackFilter.classList.toggle('show') ;
    sideMenu.classList.toggle('show') ;
    sideMenuTrigger.classList.toggle('show') ;
    document.body.classList.toggle('disableScroll') ;
    util.docHandler(sideMenu,[blackFilter,sideMenuTrigger]) ;
}
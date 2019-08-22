let searchTrigger = document.querySelector('nav .search') ;
let searchContainer = document.querySelector('#search') ;
let closeIcon = searchContainer.querySelector('.fa-times') ;
searchTrigger.addEventListener('click',openSearch) ;
function openSearch(e){
    searchContainer.classList.add('show') ;
}
closeIcon.addEventListener('click',closeSearch) ;
function closeSearch(e){
    searchContainer.classList.remove('show') ;
}
let filtersWrapper = document.querySelector('#filters') ;
let currFiltersWrapper = document.querySelector('#curr_filters .currs') ;
let checkboxes = filtersWrapper.querySelectorAll('input[type="checkbox"]') ;
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change',checkboxHandler) ;
})
function checkboxHandler(e){
    if(this.checked){ //add to curr filters
        if(this.classList.contains('main_category')){
            let subCategories = this.parentElement.parentElement.parentElement.querySelectorAll('.content .sub_category');
            subCategories.forEach(subCategory => createFilterTag(subCategory))
        }
        else createFilterTag(this) ;        
    }
    else{ //remove from curr filters
        if(this.classList.contains('main_category')){
            let subCategories = this.parentElement.parentElement.parentElement.querySelectorAll('.content .sub_category');
            subCategories.forEach(subCategory => removeFilterTag(subCategory))
        }
        else removeFilterTag(this);             
    }
}; 
function createFilterTag(checkbox){
    let currFilter = document.createElement('div') ;
    currFilter.classList.add('curr') ;
    let closeIcon = document.createElement('i') ;
    closeIcon.classList.add('fas','fa-times') ;
    let text = document.createElement('p') ;
    text.textContent = checkbox.parentElement.querySelector('p').textContent ;
    currFilter.appendChild(closeIcon) ;
    currFilter.appendChild(text) ;
    currFiltersWrapper.appendChild(currFilter) ;
}
function removeFilterTag(checkbox){
    let currFilters = currFiltersWrapper.querySelectorAll('.curr') ;
    for(let i=0 ; i<currFilters.length ; i++){
        let currFilter = currFilters[i] ;
        if(currFilter.querySelector('p').textContent == checkbox.parentElement.querySelector('p').textContent) {
            currFilter.parentElement.removeChild(currFilter) ;
            break ;
        }
    }
}
let clearAll = document.querySelector('#curr_filters .clear_filters') ;
clearAll.addEventListener('click',clearAllHandler) ;
function clearAllHandler(e){
    let currFilters = currFiltersWrapper.querySelectorAll('.currs .curr') ;
    currFilters.forEach(curr => {
        curr.parentElement.removeChild(curr) ;
    });
    checkboxes.forEach(checkbox => checkbox.checked = false)
}
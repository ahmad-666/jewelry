let features = document.querySelectorAll('#why_us .feature') ;
features.forEach(feature => {
    feature.addEventListener('mouseenter',activeFeature) ;
})
function activeFeature(e){
    features.forEach(feature => {
        if(this != feature) feature.classList.add('blur') ;
        else feature.classList.add('active') ;
    })
    this.addEventListener('mouseleave',deactivateFeature);
};
function deactivateFeature(e){
    features.forEach(feature => {
        feature.classList.remove('blur') ;
        feature.classList.remove('active') ;
    })
    this.removeEventListener('mouseleave',deactivateFeature);
}
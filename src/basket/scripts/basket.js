import form from '../../utilities/scripts/form.js' ;
let basketForm = document.querySelector('form#basket') ;
let timeline = basketForm.querySelector('#timeline') ;
let slider = basketForm.querySelector('.slider') ;
let buyBasketSlide = slider.querySelector('#buyBasket');
let addressSlide = slider.querySelector('#address');
let checkoutSlide = slider.querySelector('#checkout');
let totalBasket = buyBasketSlide.querySelector('.totalBasket') ;
let addressSubmit = addressSlide.querySelector('button.next') ;
let validateInputs = addressSlide.querySelectorAll('.validate')
let addressForm = new form.FormValidate(basketForm,addressSubmit,validateInputs,false) ;
let selects = document.querySelectorAll('.inputWrapper.select') ;
selects = [...selects] ;
selects.forEach(select => {
    let otherSelects = selects.filter(curr=>{
        return (curr!=select)
    });
    new form.Select(select,otherSelects) ;
})
document.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new form.LabelHandler(labelHandler) ;
})
document.querySelectorAll('input[type="number"]').forEach(numberInput => {
    new form.NumberInput(numberInput) ;
})
export default{
    basketForm,
    timeline, 
    slider,
    buyBasketSlide,
    addressSlide,
    checkoutSlide,
    totalBasket,
    addressForm,
    addressSubmit,
}
//init table/rows from 'buyBasketSlide'-----------------
//init table/rows from 'buyBasketSlide'-----------------
//init table/rows from 'buyBasketSlide'-----------------
function Table(table){
    this.table = table ;
    this.rows = [] ;
    this.table.querySelectorAll('tbody tr').forEach(row => {
        this.rows.push(new Row(row)) ;
    })
}
function Row(row){
    this.row = row ;
    this.price = this.row.getAttribute('data-unit-price') ;
    this.totalPrice = this.row.querySelector('.totalPrice') ;
    this.numberInput = new NumberHandler(this.row.querySelector('.inputWrapper.numberHandler'),this.price,this.totalPrice) ;
    this.removeRow = new RemoveRow(this.row) ;
    this.init() ;
}
Row.prototype.init = function(){
    this.totalPrice.textContent = `${this.price*this.numberInput.input.value}تومان` ; 
}
//input with increase/decrease---------------------
//input with increase/decrease---------------------
//input with increase/decrease---------------------
function NumberHandler(wrapper,price,totalPrice){
    this.wrapper = wrapper ;
    this.increase = this.wrapper.querySelector('.increase') ;
    this.decrease = this.wrapper.querySelector('.decrease') ;
    this.input = this.wrapper.querySelector('input') ;
    this.max = parseFloat(this.input.getAttribute('data-max')) ;
    this.min = parseFloat(this.input.getAttribute('data-min')) ;
    this.step = parseFloat(this.input.getAttribute('data-step')) ;
    this.price = price ;
    this.totalPrice = totalPrice ;
    this.increase.addEventListener('click',this.add.bind(this)) ;
    this.decrease.addEventListener('click',this.minus.bind(this)) ;
}
NumberHandler.prototype.add = function(e){
    let val = parseFloat(this.input.value) ;
    this.input.value = val+this.step<=this.max?val+this.step:val ;
    this.totalPrice.textContent = `${this.input.value*this.price}تومان` ; 
    basketItems = buyBasketSlide.querySelectorAll('table tbody tr') ;
    updateBasket() ;
}
NumberHandler.prototype.minus = function(e){
    let val = parseFloat(this.input.value) ;
    this.input.value = val-this.step>=this.min?val-this.step:val ;
    this.totalPrice.textContent = `${this.input.value*this.price}تومان` ; 
    basketItems = buyBasketSlide.querySelectorAll('table tbody tr') ;
    updateBasket() ;
}
//remove row---------------------
//remove row---------------------
//remove row---------------------
function RemoveRow(row){
    this.row = row ;
    this.closeTrigger = this.row.querySelector('.removeRow') ;
    this.closeTrigger.addEventListener('click',this.removeRow.bind(this)) ;
}
RemoveRow.prototype.removeRow = function(e){
    let parent = this.row.parentElement ;
    parent.removeChild(this.row) ;
    basketItems = buyBasketSlide.querySelectorAll('table tbody tr') ;
    updateBasket() ;
}
//update basket---------------------
//update basket---------------------
//update basket---------------------
function updateBasket(){
    let totalPrice = 0 ;
    basketItems.forEach(item => {
        let price = parseFloat(item.querySelector('.totalPrice').textContent) ;
        //let quantity = parseFloat(item.querySelector('input[type="number"]').value) ;
        totalPrice+=(price) ;
    })
    totalBasket.textContent = `${totalPrice}تومان` ;
}
//create all instances--------------------------
//create all instances--------------------------
//create all instances--------------------------
let table = new Table(buyBasketSlide.querySelector('table')) ;
let basketItems = buyBasketSlide.querySelectorAll('table tbody tr') ;
updateBasket() ;

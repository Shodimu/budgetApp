const budgetInput = document.querySelector('#budget-input');
const budgetForm = document.querySelector('#budget-form');
const expensesInput = document.querySelector('#expenses-input');
const expenseFor = document.querySelector('#expenseFor');
const expenseBill = document.querySelector('#expenseAmount');
const expenseForm = document.querySelector('#expense-form');
const budgetAmount = document.querySelector('#budget-amount');
const expenseAmount = document.querySelector('#expenses-amount');
const balanceAmount = document.querySelector('#balance-amount');
const balanceTotal = document.querySelector('.balance-total')
const feedbackBudget = document.querySelector('.feedbackBudget');
const feedbackExpenses = document.querySelector('.feedbackExpenses');
const tbody = document.querySelector('#tbody');
const loader = document.querySelector('.giffy');
let expenseItem = [];
let expenseId = 0;


class Budget{
    constructor(){}

    successFeedback(feedback,content ){
        feedback.innerHTML = content;
        feedback.classList.add('show','success');
        setTimeout(() => {
            feedback.classList.remove('show','success');
        }, 4000);
    }
    errorFeedback(feedback,content ){
        feedback.textContent = content;
        feedback.classList.add('show','error');
        setTimeout(() => {
            feedback.classList.remove('show','error');
        }, 4000);
    }
}

let budgetFunction = budgetForm.addEventListener('submit', budgetApp);
let expenseFunction = expenseForm.addEventListener('submit', expenseApp);
let tbodyList = tbody.addEventListener('click', tbodyApp);


function budgetApp(e){
    e.preventDefault();
    let budgetClass = new Budget();
    if(budgetInput.value === '' || budgetInput.value < 0){
        budgetClass.errorFeedback(feedbackBudget, 'Enter a valid Budget');
    }else{
        let value = budgetInput.value;
        budgetAmount.textContent = value;
        budgetClass.successFeedback(feedbackBudget, `<b>${value}</b> was budgeted successfully`);
        budgetInput.value = '';
        totalExpenses();

    }
}

function expenseApp(e){
    e.preventDefault();
    let budgetClass = new Budget();
    if(expensesInput.value === '' || expensesInput.value < 0 || expenseFor.value === ''){
        budgetClass.errorFeedback(feedbackExpenses, 'All fields is required');
    }else{
        let value = expensesInput.value;
        let valueFor = expenseFor.value;
        budgetClass.successFeedback(feedbackExpenses, `${value} for ${valueFor} succesfully added to expenses`);
        let expenseLog = {
            id :expenseId,
            title: expenseFor.value,
            amount:expensesInput.value
        }
        expensesInput.value = '';
        expenseFor.value = '';
        expenseId++;
        expenseItem.push(expenseLog);
        addExpense(expenseLog);
        
        console.log(expenseLog);
        
        // let total = expenseItem.map(item=>{
        //     return parseInt(item.amount);
        // });
    
        // let totalExpenses = total.reduce((a, b)=> a + b);
        // console.log(totalExpenses);
        totalExpenses();
        loader.classList.add('show');
      
    }
}

function addExpense(expense){
    let tr = document.createElement('tr');
    tr.innerHTML = `
    <td data-id='${expense.id}'><img src="./img/bullet.PNG"  width="30px"  alt=""></td>
    <td data-title='title'>${expense.title}</td>
    <td data-amount='amount'><span>$ </span>${expense.amount}</td>
    <td>
        <a href="#" data-edit='edit'><img src="./img/edit.png" class="red"></a>
        <a href="#" data-delete='delete'><img src="./img/delete.png" class="red"></a>
    </td>
    `
    // Tbody is a miracle!!! NOTED
    // console.log(tbody);
    
    tbody.appendChild(tr);
    tbody.classList.add('hide');
    setTimeout(()=>{
        tbody.classList.remove('hide');
        loader.classList.remove('show');
    }, 2000)

    
    // console.log(tbody.innerHTML);
}




function totalExpenses(){
    let total
    if(expenseItem.length === 0){
        total = 0;
    }else{
        total = expenseItem.map(item=>{
            return parseInt(item.amount);
        });
        total = total.reduce((a, b)=> a + b);
    }
    console.log(total);

    expenseAmount.textContent = total;
    balanceAmount.textContent = parseInt(budgetAmount.textContent) - total;

    let totalBalance = parseInt(budgetAmount.textContent) - total;
    console.log(totalBalance);
    if(totalBalance < 0){
        balanceTotal.classList.remove('green');
        balanceTotal.classList.add('red');
    }
    else if(totalBalance === 0){
        balanceTotal.classList.remove('green');
        balanceTotal.classList.remove('red');
    }
    else{
        balanceTotal.classList.remove('red');
        balanceTotal.classList.add('green');
    }
   
    return total;


    
}

function tbodyApp(e){
    e.preventDefault();
    console.log(e.target.parentElement);
    if(e.target.parentElement.dataset.edit){
        console.log(e.target.parentElement.parentElement.previousElementSibling.innerText);
        let value = e.target.parentElement.parentElement.previousElementSibling.innerText;
        let item = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.innerHTML;
        let id = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.dataset.id;
        value = parseInt(value.match(/[0-9]/g).join(''));
        console.log(value);
        console.log(typeof(value));
        console.log(item);
        console.log(parseInt(id));
        expenseFor.value = item;
        expensesInput.value = value;
        console.log(expenseItem);
        expenseItem = expenseItem.filter(item=>{
            return item.id != parseInt(id);
        });
        console.log(expenseItem);
        let listChild = e.target.parentElement.parentElement.parentElement;
        tbody.removeChild(listChild);
        tbody.classList.add('hide');
        loader.classList.add('show')
        setTimeout(()=>{
            tbody.classList.remove('hide');
            loader.classList.remove('show');
        }, 1500)
        totalExpenses();

    }
    if(e.target.parentElement.dataset.delete){
        let id = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.dataset.id;
        expenseItem = expenseItem.filter(item=>{
            return item.id != parseInt(id);
        });
        let listChild = e.target.parentElement.parentElement.parentElement;
        tbody.removeChild(listChild );
        tbody.classList.add('hide');
        loader.classList.add('show')
        setTimeout(()=>{
            tbody.classList.remove('hide');
            loader.classList.remove('show');
        }, 1500)
        totalExpenses();

    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    budgetAmount.textContent = 0;
    budgetFunction;
    expenseApp;
 
});


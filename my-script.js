//CRUD 
// adding txn to list  
function addNewTxn(txn){
    let txn_list = listAllTxn()
    txn_list.push(txn)
    localStorage.setItem("txn_list",JSON.stringify(txn_list))
}
// getting all txn from list 
function listAllTxn(){
    let txn_list = localStorage.getItem("txn_list")
    if(!txn_list){ txn_list="[]"}
    return JSON.parse(txn_list)
}
//delete specific txn with given index
function deleteTxn(txn_index){
    let txn_list = JSON.parse(localStorage.getItem("txn_list"))
    if(!txn_list) return
    if(txn_index<0 || txn_index>=txn_list.length){ return }
    txn_list.splice(txn_index,1)
    localStorage.setItem("txn_list",JSON.stringify(txn_list))
}

function loadTxnList(){
    txn_list = listAllTxn()
    html = ""
    for(let i=0;i<txn_list.length;i++){
        const bg_class = (txn_list[i].txn_type=="credit") ? "table-success" : "table-danger";
        html+= `<tr class="${bg_class}">
                <td scope="col">${i+1}</td>
                <td scope="col">${txn_list[i].amount}</td>
                <td scope="col">${txn_list[i].txn_type}</td>
                <td scope="col">${txn_list[i].date}</td>
                <td><button class="btn btn-danger del" id="del-${i}" onclick="handleDelete(event)">delete</button></td>` 
    }
    document.getElementById("txn_list").innerHTML = html
}
function updateBalance(){
    const txn_list = listAllTxn()
    let income = 0 
    let expense = 0 
    txn_list.forEach(txn => {
        if(txn.txn_type=="credit"){
            income += parseInt(txn.amount)
        }
        else{
            expense += parseInt(txn.amount)
        }
    });
    document.getElementById('expense').innerText = expense
    document.getElementById('income').innerText = income
    document.getElementById('balance').innerText = (income - expense)
}
function handleLoad(){
    console.log("DEBUGGING")
    loadTxnList()
    updateBalance()
}
function handleSubmit(event){
    event.preventDefault()
    const amount = event.target.amount.value
    const txn_type = event.target.txn_type.value
    const date = event.target.date.value 
    const txn = {
        amount:amount, 
        txn_type:txn_type,
        date:date
    }
    addNewTxn(txn)
    loadTxnList()
    updateBalance()
}

function handleDelete(event){
    console.log("DEBUGGING")
    ind = parseInt(event.target.id.split("-")[1])
    console.log("index to be deleted",ind)
    deleteTxn(ind)
    loadTxnList()
    updateBalance()
}
// attaching submit listner 

document.addEventListener('DOMContentLoaded', () => {
    handleLoad()
    const form = document.getElementsByTagName("form")[0]
    if(form) form.addEventListener('submit',handleSubmit)
})

let task = document.getElementById('task-adding-form');
let itemList = document.getElementById('itemList');

task.addEventListener('submit', addItem);

let itemBgc;
document.getElementById('order-select').addEventListener('change', function(e) {
    if (e.target.value === "Today") {
        itemBgc = 'bg-primary text-white';
    } else if (e.target.value === "Yesterday") {
        itemBgc = 'bg-success text-white';
    } else if (e.target.value === "Tomorrow") {
        itemBgc = 'bg-warning';
    } else {
        itemBgc = 'bg-light';
    }
});

function addItem(e) {
    e.preventDefault();
    let newItem = document.querySelector('#item').value;
    let li = document.createElement('li');
    li.className = `list-group-item d-flex ${itemBgc}`;



    let textP = document.createElement('p');
    textP.className = 'px-2 flex-grow-1';
    textP.appendChild(document.createTextNode(newItem));
    li.appendChild(textP);

    let liContainer = document.createElement('div');
    liContainer.className = 'btn-group h-25';
    const roleAtt = document.createAttribute('role');
    roleAtt.value = "group";
    liContainer.setAttributeNode(roleAtt);
    liContainer.ariaLabel = 'Button group with nested dropdown';
    li.appendChild(liContainer);

    let checkBtn = document.createElement('button');
    let xBtn = document.createElement('button');
    checkBtn.className = 'btn btn-info text-white';
    xBtn.className = 'btn btn-info text-white';
    checkBtn.type = 'button';
    xBtn.type = 'button';
    const checkMark = document.createElement('i');
    checkMark.className = 'fa-solid fa-check';
    const xMark = document.createElement('i');
    xMark.className = 'fa-solid fa-xmark';
    checkBtn.appendChild(checkMark);
    xBtn.appendChild(xMark);
    liContainer.appendChild(checkBtn);
    liContainer.appendChild(xBtn);
    li.appendChild(liContainer);

    let menuContainer = document.createElement('div');
    menuContainer.className = 'day-selector-menu';
    let formSelect = document.createElement('select');
    formSelect.className = 'form-select bg-info text-white border-info';
    formSelect.ariaLabel = 'Default select example';
    menuContainer.appendChild(formSelect);
    let optionDay = document.createElement('option');
    optionDay.defaultSelected = true;
    optionDay.textContent = 'Day';
    formSelect.appendChild(optionDay);
    let optionYesterday = document.createElement('option');
    optionYesterday.className = 'bg-success';
    optionYesterday.setAttribute('value', 'Yesterday');
    optionYesterday.textContent = 'Yesterday';
    formSelect.appendChild(optionYesterday);
    let optionToday = document.createElement('option');
    optionToday.className = 'bg-primary';
    optionToday.setAttribute('value', 'Today');
    optionToday.textContent = 'Today';
    formSelect.appendChild(optionToday);
    let optionTomorrow = document.createElement('option');
    optionTomorrow.className = 'bg-warning';
    optionTomorrow.setAttribute('value', 'Tomorrow');
    optionTomorrow.textContent = 'Tomorrow';
    formSelect.appendChild(optionTomorrow);
    li.appendChild(menuContainer);
    
    itemList.appendChild(li);
}
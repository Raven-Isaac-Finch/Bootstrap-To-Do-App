//-------------------------------------------------------------
// Adding Tasks To The List
//-------------------------------------------------------------
let task = document.getElementById('task-adding-form');
let itemList = document.getElementById('itemList');

task.addEventListener('submit', addItem);

// COLOR & LABEL Defined Before The Initial Func.
let itemBgc;
let labelDisplay = 'Day';
document.getElementById('order-select').addEventListener('change', function(e) {
    if (e.target.value === "Secondary") {
        itemBgc = 'bg-primary text-white';
        labelDisplay = 'Secondary';
    } else if (e.target.value === "Tertiary") {
        itemBgc = 'bg-success text-white';
        labelDisplay = 'Tertiary';
    } else if (e.target.value === "Primary") {
        itemBgc = 'bg-warning';
        labelDisplay = 'Primary';
    } else {
        itemBgc = 'bg-light';
        labelDisplay = 'Priority';
    }
});

function charCount(str, letter) {
    let letterCount = 0;
    for (let position = 0; position < str.length; position++) {
        if (str.charAt(position) == letter) {
            letterCount += 1;
        }
    }
  return letterCount;
}

function addItem(e) {
    e.preventDefault();

    let newItem = document.querySelector('#item').value;
    let li = document.createElement('li');
    li.className = `list-group-item ${itemBgc}`;

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

    const checkMark = document.createElement('i');
    checkMark.className = 'fa-solid fa-check text-white bg-info done-mark list-check-btn';
    const xMark = document.createElement('i');
    xMark.className = 'fa-solid fa-xmark text-white bg-info delete list-x-btn';
    liContainer.appendChild(checkMark);
    liContainer.appendChild(xMark);
    li.appendChild(liContainer);

    let displayContainer = document.createElement('div');
    displayContainer.className = 'displayer-container bg-info rounded';
    let labelHolder = document.createElement('h6');
    labelHolder.className = 'text-white';
    labelHolder.textContent = `${labelDisplay}`;
    displayContainer.appendChild(labelHolder);
    li.appendChild(displayContainer);
    
    if (newItem.length && charCount(newItem, " ") !== newItem.length) {
        itemList.appendChild(li);
        document.getElementById('item').value ='';
    } else {
        alert('Tasks Cannot Be Empty');
    }
}

//-------------------------------------------------------------
// X Button to Remove Items & Check If User is Sure
//-------------------------------------------------------------
itemList.addEventListener('click', removeItem);
doneList.addEventListener('click', removeItem);

let toastPopup = document.getElementById('popup-toast');

function removeItem(e) {
    if(e.target.classList.contains('delete')){
        let li = e.target.parentElement.parentElement;
        let toast = new bootstrap.Toast(toastPopup);
        toast.show();
        toastPopup.addEventListener('click', youSure);
        // let input = document.getElementsByTagName('i');
        // input.addEventListener("keyup", function(event) {
        //     if (event.keyCode === 13) {
        //         event.preventDefault();
        //         document.getElementByClassName('check-sure').click();
        //     }
        //   });
        
        function youSure(f) {
            if (f.target.classList.contains('check-sure')) {
                if (itemList.contains(li)) {
                    itemList.removeChild(li);
                } else if (doneList.contains(li)) {
                    doneList.removeChild(li);
                }
            }
        }
    }
}

//-------------------------------------------------------------
// Check Button to Move Items to Done-List
//-------------------------------------------------------------
itemList.addEventListener('click', doneItem);

function doneItem(d) {
    if (d.target.classList.contains('done-mark')) {
        let li = d.target.parentElement.parentElement;
        li.className = 'list-group-item d-flex bg-dark bg-gradient text-white';
        li.removeChild(li.lastElementChild);
        li.removeChild(li.lastElementChild);

        let btnContainer = document.createElement('div');
        li.appendChild(btnContainer);

        const xMark = document.createElement('i');
        xMark.className = 'fa-solid fa-xmark delete';
        btnContainer.appendChild(xMark);

        doneList.appendChild(li);
    }
}

//-------------------------------------------------------------
// Search Filter
//-------------------------------------------------------------
let filter = document.getElementById('filter');
filter.addEventListener('keyup', filterItems);

function filterItems(e) {
    let text = e.target.value.toLowerCase();
    let items = itemList.getElementsByTagName('li');

    Array.from(items).forEach(function(item){
        let itemName = item.firstChild.textContent;
        if (itemName.toLowerCase().indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })
}
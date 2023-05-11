// variables
let groupItemNumbers = 0;
let groupDeletedId = 0;
let infoDeletedEl;

// utils
const splitString = (str) => {
    return str.split("_")[0];
}

// functions
const printPDF = (event) => {
    html2canvas(document.getElementById('print'), {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500,
                }],
            };
            pdfMake.createPdf(docDefinition).download("TranLam_20204759.pdf");
        }
    });
}

const switchToInput = (event) => {
    const textEl = event.target;
    const inputEl = textEl.nextElementSibling;
    inputEl.value = splitString(textEl.textContent);
    textEl.style.display = "none";
    inputEl.style.display = "block";
    inputEl.focus(); 
}

const switchToText = (event) => {
    const inputEl = event.target;
    const textEl = inputEl.previousElementSibling;
    textEl.style.display = "block";
    inputEl.style.display = "none";
}

const applyChange = (event) => {
    if (event.keyCode == 13)
    {
        const inputEl = event.target;
        const textEl = inputEl.previousElementSibling;
        textEl.textContent = inputEl.value + '_20204759';
        textEl.style.display = "block";
        inputEl.style.display = "none";
    }
}

const applyChangeNoMSSV = (event) => {
    if (event.keyCode == 13)
    {
        const inputEl = event.target;
        const textEl = inputEl.previousElementSibling;
        if (inputEl.value != "")
            textEl.textContent = inputEl.value;
        textEl.style.display = "block";
        inputEl.style.display = "none";
    }
}

const addGroupItem = (event) => {
    groupItemNumbers++;
    const id = event.target.getAttribute('data-id');
    const newGroup = document.createElement('div');
    newGroup.className = 'group_item';
    newGroup.id = `group_item_${groupItemNumbers}`;
    newGroup.innerHTML = `
    <div class="group_header">
        <div class="group_name" ondblclick="switchToInput(event)">Group Item_20204759</div>
        <input type="text" class="group_name_input" spellcheck="false" onblur="switchToText(event)" onkeypress="applyChange(event)">
        <i class="fa-regular fa-trash-can group_del" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setGroupDeletedId(event)" data-id="${groupItemNumbers}"></i>
        <div class="group_btn">
            <div class="btn-group">
                <button class="btn btn-success btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Add Info Item
                </button>
                <ul class="dropdown-menu">
                    <li class="dropdown-item" onclick="addInfoItem(event)" data-id="${groupItemNumbers}">Text</li>
                    <li class="dropdown-item" onclick="addInfoItemRadio(event)" data-id="${groupItemNumbers}">Radio</li>
                    <li class="dropdown-item" onclick="addInfoItemList(event)" data-id="${groupItemNumbers}">List</li>
                    <li class="dropdown-item" onclick="addInfoItemCheckbox(event)" data-id="${groupItemNumbers}">CheckBox</li>
                </ul>
            </div>
            <button type="button" class="btn btn-primary btn-sm" onclick="addGroupItem(event)" data-id="${groupItemNumbers}">Add Group Item</button>
        </div>
    </div>
    <div class="group_main" id="group_main_${groupItemNumbers}" data-id="${groupItemNumbers}"></div>`;
    const curr = document.getElementById(`group_item_${id}`);
    curr.parentNode.insertBefore(newGroup, curr.nextSibling);
}

const setGroupDeletedId = (event) => {
    groupDeletedId = event.target.getAttribute('data-id');
}

const deleteGroupItem = () => {
    const groupItem = document.getElementById(`group_item_${groupDeletedId}`);
    groupItem.remove();
}

const addInfoItem = (event) => {
    const id = event.target.getAttribute('data-id');
    const groupMainEl = document.getElementById(`group_main_${id}`);
    const newInfoItem = document.createElement('div');
    newInfoItem.className = 'info_item';
    newInfoItem.innerHTML = `
        <div class="info_name" ondblclick="switchToInput(event)">Item Info Name</div>
        <input type="text" class="info_name_input" spellcheck="false" onblur="switchToText(event)" onkeypress="applyChangeNoMSSV(event)">
        <div class="info_value" ondblclick="switchToInput(event)">Item Info Value</div>
        <input type="text" class="info_value_input" spellcheck="false" onblur="switchToText(event)" onkeypress="applyChangeNoMSSV(event)">
        <i class="fa-regular fa-trash-can info_del" data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick="setItemDeletedEl(event)"></i>
    `;
    groupMainEl.appendChild(newInfoItem);
}

const setItemDeletedEl = (event) => {
    const info_item = event.target.parentNode;
    infoDeletedEl = info_item;
}

const deleteInfoItem = () => {
    infoDeletedEl.remove();
}

// Radio
const addInfoItemRadio = (event) => {
    const id = event.target.getAttribute('data-id');
    const groupMainEl = document.getElementById(`group_main_${id}`);
    const newInfoItem = document.createElement('div');
    newInfoItem.className = 'info_item';
    newInfoItem.innerHTML = `
        <div class="info_name" ondblclick="switchToInput(event)">Item Radio Name</div>
        <input type="text" class="info_name_input" spellcheck="false" onblur="switchToText(event)" onkeypress="applyChangeNoMSSV(event)">
        <div class="radio_list"></div>
        <i class="fa-solid fa-circle-plus radio_add" onclick="addRadioItem(event)"></i>
        <i class="fa-regular fa-trash-can radio_del" data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick="setItemDeletedEl(event)"></i>
    `;
    groupMainEl.appendChild(newInfoItem);
}

const addRadioItem = (event) => {
    const btn = event.target;
    const info_item = btn.parentElement;
    const list = btn.previousElementSibling;
    const info_index = [...info_item.parentElement.children].indexOf(info_item);
    const group_index = info_item.parentElement.getAttribute('data-id');
    const total_index = group_index.toString() + '_' + info_index.toString();
    
    const newRadio = document.createElement('div');
    newRadio.className = 'radio_item';
    newRadio.innerHTML = `
    <input type="radio" name="${total_index}" class="radio_input">
    <label class="radio_label" ondblclick="switchToInput(event)">Radio Label</label>
    <input type="text" class="radio_label_input" spellcheck="false" onblur="switchToText(event)" onkeypress="applyChangeNoMSSV(event)">
    <i class="fa-solid fa-circle-minus radio_item_del" onclick="deleteRadioItem(event)"></i>
    `;
    list.appendChild(newRadio);
}

const deleteRadioItem = (event) => {
    const radio_item = event.target.parentNode;
    radio_item.remove();
}

// Checkbox
const addInfoItemCheckbox = (event) => {
    const id = event.target.getAttribute('data-id');
    const groupMainEl = document.getElementById(`group_main_${id}`);
    const newInfoItem = document.createElement('div');
    newInfoItem.className = 'info_item';
    newInfoItem.innerHTML = `
        <div class="info_name" ondblclick="switchToInput(event)">Item Checkbox Name</div>
        <input type="text" class="info_name_input" spellcheck="false" onblur="switchToText(event)" onkeypress="applyChangeNoMSSV(event)">
        <div class="radio_list"></div>
        <i class="fa-solid fa-circle-plus radio_add" onclick="addCheckboxItem(event)"></i>
        <i class="fa-regular fa-trash-can radio_del" data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick="setItemDeletedEl(event)"></i>
    `;
    groupMainEl.appendChild(newInfoItem);
}

const addCheckboxItem = (event) => {
    const btn = event.target;
    const info_item = btn.parentElement;
    const list = btn.previousElementSibling;
    const info_index = [...info_item.parentElement.children].indexOf(info_item);
    const group_index = info_item.parentElement.getAttribute('data-id');
    const total_index = group_index.toString() + '_' + info_index.toString();
    
    const newRadio = document.createElement('div');
    newRadio.className = 'radio_item';
    newRadio.innerHTML = `
    <input type="checkbox" name="${total_index}" class="radio_input">
    <label class="radio_label" ondblclick="switchToInput(event)">Checkbox Label</label>
    <input type="text" class="radio_label_input" spellcheck="false" onblur="switchToText(event)" onkeypress="applyChangeNoMSSV(event)">
    <i class="fa-solid fa-circle-minus radio_item_del" onclick="deleteRadioItem(event)"></i>
    `;
    list.appendChild(newRadio);
}

// List
const addInfoItemList = (event) => {
    const id = event.target.getAttribute('data-id');
    const groupMainEl = document.getElementById(`group_main_${id}`);
    const newInfoItem = document.createElement('div');
    newInfoItem.className = 'info_item';
    newInfoItem.innerHTML = `
        <div class="info_name" ondblclick="switchToInput(event)">Item List Name</div>
        <input type="text" class="info_name_input" spellcheck="false" onblur="switchToText(event)" onkeypress="applyChangeNoMSSV(event)">
        <select class="form-select info_select"></select>
        <input type="text" class="info_select_input" placeholder="Add Option (Enter to confirm)" spellcheck="false" onblur="inputToBtn(event)" onkeypress="addOptionItem(event)">
        <i class="fa-solid fa-circle-plus radio_add" onclick="btnToInput(event)"></i>
        <i class="fa-regular fa-trash-can radio_del" data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick="setItemDeletedEl(event)"></i>
    `;
    groupMainEl.appendChild(newInfoItem);
}

const btnToInput = (event) => {
    const btn = event.target;
    const input = btn.previousElementSibling;
    btn.style.display = 'none';
    input.style.display = 'block';
    input.focus();
}

const inputToBtn = (event) => {
    const input = event.target;
    const btn = input.nextElementSibling;
    btn.style.display = 'block';
    input.style.display = 'none';
}

const addOptionItem = (event) => {
    if (event.keyCode == 13)
    {
        const input = event.target;
        if (input.value != '')
        {
            const btn = input.nextElementSibling;
            const select = input.previousElementSibling;
            const option = document.createElement('option');
            option.innerText = input.value;
            select.appendChild(option);
            btn.style.display = 'block';
            input.style.display = 'none';
        }
    }
}
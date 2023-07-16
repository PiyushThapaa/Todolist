let Arr = [];
let input = document.getElementById('todo');
let content = document.getElementById('mybody');
let add = document.getElementById('add');
let deleteAll = document.getElementById('input');


let storing = () => {
    if (input.value === '') {
        alert('Your Input is empty')
    } else {
        if (localStorage.getItem('itemjson') === null) {
            Arr.push(input.value);
            localStorage.setItem('itemjson', JSON.stringify(Arr));
            // We stringify becoz arr is an default json object in localStorage if stringify there then it will be stored as string but can be used as array 
        } else {
            Arr = JSON.parse(localStorage.getItem('itemjson'));
            // without parse arr not treated as array
            Arr.push(input.value);
            localStorage.setItem('itemjson', JSON.stringify(Arr));
        }
        updateUI();
        input.value = '';
    }
}
let updateUI = () => {
    let str = '';
    Arr.forEach((element, index) => {
        str += `
        <tr>
       <th scope="row">${index + 1}</th>     <td><input type = "checkbox">${element}</td>
       <td><button type="button" class="btn btn-danger" onclick = "deleted(${index})">Delete</button>&nbsp;&nbsp;<button type="button" class="btn btn-primary" onclick = "edited(${index})">Edit</button></td> 
      </tr>
      `
    });
    content.innerHTML = str;
}
let updateStorage = () => {
    if (Arr.length === 0) {
        localStorage.clear();
    }
    else {
        localStorage.clear();
        localStorage.setItem('itemjson', JSON.stringify(Arr));
    }
}
add.addEventListener('click', storing)
let deleted = (index) => {
    Arr.splice(index, 1);
    updateUI();
    updateStorage();
}
let deleteall = () => {
    let surity = confirm('Are you sure you want to delete all items?')
    if (surity) {
        localStorage.clear();
        Arr.splice(0, Arr.length);
        content.innerHTML = ''
    }
}

let pageload = () => {
    if (localStorage.getItem('itemjson') !== null) {
        let arr = JSON.parse(localStorage.getItem('itemjson'));
        Arr = [...arr]
        console.log(Arr);
        updateUI();
    }
}
function edited(index) {
    input.value = Arr[index];
    let editbtn = document.getElementById('editbtn');
    editbtn.innerHTML = `<button class="btn btn-warning" id="edit">Edit</button>`
    let edit = document.getElementById('edit');
    edit.addEventListener('click', () => {
        Arr.splice(index, 1, input.value);
        updateUI();
        updateStorage();
        input.value = '';
        editbtn.innerHTML = ``;
        let edited = document.getElementById('edited');
        edited.innerHTML = `<i>Edit Successfully</i>`;
        edited.style.color = 'green';
        setTimeout(() => edited.innerHTML = ``, 2000)
    });
}
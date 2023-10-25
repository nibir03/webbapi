document.addEventListener('DOMContentLoaded', function() {
    // Din kod här kommer att köra efter att DOM har laddats
    //console.log('DOM fully loaded and parsed');
    
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    const p = document.createElement('p');
    p.textContent = 'Hello from client js and ';
    app.appendChild(p);

    const btn = document.createElement('button');
    btn.textContent = 'Load data';
    btn.addEventListener('click', loadData);
    app.appendChild(btn);

    const btnAddContact = document.createElement('button');
    btnAddContact.textContent = 'Add contact';
    btnAddContact.addEventListener('click', addContact);
    app.appendChild(btnAddContact);


   /* const btnSave = document.createElement('button');
    btnSave.textContent = 'Save contact';
    btnSave.addEventListener('click', saveContact);
    app.appendChild(btnSave);*/

    const datalist = document.createElement('div');
    datalist.id = 'datalist';
    app.appendChild(datalist);
});

const loadData = () => {
    fetch('/contacts')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('contacts', JSON.stringify(data));
            populateData(data);
        })
};

const populateData = (data) => {
    const datalist = document.getElementById('datalist');
    datalist.innerHTML = '';
    const ul = document.createElement('ul');
    data.forEach(contact => {
        const li = document.createElement('li');
        li.innerText = contact.name + " " + contact.email;
        ul.appendChild(li);
    })
    datalist.appendChild(ul);
};

const addContact = () => {
    let name = prompt('Ange namn');
    let email = prompt('Ange email');
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    let newContact = {name: name, email: email};
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    populateData(contacts);
    console.log(newContact);
    updateData(newContact);
};

const updateData = (data) => {
    console.log(data);
    console.log(JSON.stringify(data));
    fetch('/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json',
        },
        body: JSON.stringify(data),
    })
};

/*
const saveContact = () => {
    fetch('/data'), {
        method: "POST",


    }
    */


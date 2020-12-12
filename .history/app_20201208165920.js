window.onload = function() {
    const localKey = 'contactsCollection';
    const form = document.querySelector('form');
    const list = document.getElementById('users');
    const userName = document.getElementById('nameInput');
    const userLname = document.getElementById('lnameInput');
    const userTel = document.getElementById('telInput');
    const userEmail = document.getElementById('emailInput');
    const userBirth = document.getElementById('birthInput');

    let contactsList = getContacts();
    let activeContact = null;

    function getContacts() {
        const res = localStorage.getItem(localKey);
        return res ? JSON.parse(res) : [];
    }

    function setToStorage(data) {
        localStorage.setItem(localKey, data);
    }

    function updateContactList(newList) {
        contactsList = newList;
        setToStorage(newList);
        generateContactList();
    }

    function recordContact(newContact) {
        updateContactList([...contactsList, newContact])
    }

    function updateContact(newData) {
        contactsList = contactsList.map(contact => contact.id === newData.id ? newData : contact);
        updateContactList(contactsList);
    }

    function deleteContact(removeId) {
        contactsList = contactsList.filter(({ id }) => id !== removeId);
        updateContactList(contactsList);
    }

    function setActiveContact(id) {
        const contact = document.getElementById(`contact-${id}`);
        contact.classList.toggle('active');
    }

    function generateContactList() {
        const fragment = document.createDocumentFragment();
        contactsList.forEach((contact) => {
            const { id, name, lastName, phones } = contact;
            const container = document.createElement('div');
            container.onclick = () => activeContact = contact;
            container.id = `contact-${id}`;
            const title = document.createElement('p');
            title.innerText = `${lastName} ${name}`;
            const phonesList = document.createElement('p');
            phonesList.innerText = phones.join(' ');
            container.appendChild(title);
            container.appendChild(phonesList);
            fragment.appendChild(container);
        });
        list.innerHTML = fragment;
    }

    form.onsubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }
}

// const form = document.querySelector('form')
// const list = document.getElementById('users')
// const userName = document.getElementById('nameInput')
// const userLname = document.getElementById('lnameInput')
// const userTel = document.getElementById('telInput')
// const userEmail = document.getElementById('emailInput')
// const userBirth = document.getElementById('birthInput')
// const entry = document.createElement('li')


// function addUser() {
//     const list = document.getElementById('users')
//     const userName = document.getElementById('nameInput')
//     const userLname = document.getElementById('lnameInput')
//     const userTel = document.getElementById('telInput')
//     const userEmail = document.getElementById('emailInput')
//     const userBirth = document.getElementById('birthInput')
//     const entry = document.createElement('li')
//     entry.appendChild(document.createTextNode(userName.value + ' ' + userLname.value + ' '
//     + userTel.value + ' ' + userEmail.value + ' ' + userBirth.value))
//     list.appendChild(entry)
//     return false
    
// }

// let bookContacts = [];

// const addContacts = (ev) => {
//     ev.preventDefault();
//     let contact = {
//         name: document.getElementById('nameInput').value,
//         lname: userLname.value,
//         tel: userTel.value,
//         email: userEmail.value,
//         birthday: userBirth.value
//     }
//     bookContacts.push(contact);
//     document.forms[0].reset();
// }
// document.addEventListener('DomContentLoad', () =>{
//     document.getElementById('btnAdd').addEventListener('click',addContacts)
// })
// console.log(bookContacts);




/*class Person{
    constructor(options){
        this.name = options.name
        this.lname = options.lname
        this.tel = options.tel
        this.email = options.email
        this.birthday = options.birthday
    }
}

class User extends Person{
    static type = "User"
}

const user = new User({
    name: "",
    lname: "",
    tel: "",
    email:"",
    birthday:""
})


localStorage.setItem('userInfo', JSON.stringify(user));




const raw = localStorage.getItem('userInfo')
const userInfo = JSON.parse(raw)
userInfo.name = 'Maxim'

console.log(userInfo);*/
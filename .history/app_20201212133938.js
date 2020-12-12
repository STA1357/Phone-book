

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

    generateContactList();
    //validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            const contact = {
                id: getId(),
                name: userName.value,
                lastName: userLname.value,
                phone: userTel.value,
                mail: userEmail.value,
                birthDay: userBirth.value
            }
            recordContact(contact);
        }
    })

    function setErrorFor (input) {
        const formControl = input.parentElement;
        formControl.classList.add("error");
    }

    function removeError(input) {
        const formControl = input.parentElement;
        formControl.classList.remove("error");
    }

    function isValidField(field) {
        const valid = !!field.value.trim();
        if (!valid) {
            setErrorFor(field);
        } else {
            removeError(field);
        }
        return valid;
    } 

    function validateForm() {
        const validateFields = document.querySelectorAll('.form-input');
        const validFields = [];
        validateFields.forEach(field => validFields.push(isValidField(field)));
        return !validFields.some(valid => !valid);
    }

    function getContacts() {
        const res = localStorage.getItem(localKey);
        return res ? JSON.parse(res) : [];
    }

    function setToStorage(data) {
        localStorage.setItem(localKey, data);
    }

    function updateContactList(newList) {
        const string = JSON.stringify(newList);
        contactsList = newList;
        setToStorage(string);
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

    function setActiveContact({ id, name, lastName, phone, mail, birthDay }) {
        const contacts = document.querySelectorAll('.contact-item');
        contacts.forEach((contact) => {
            if (contact.id === `contact-${id}`) {
                contact.classList.add('active');
            } else {
                contact.classList.remove('active');
            }
        })
        userName.value = name;
        userLname.value = lastName;
        userTel.value = phone;
        userEmail.value = mail;
        userBirth.value = birthDay;
    }

    function generateContactList() {
        const fragment = document.createDocumentFragment();
        contactsList.forEach((contact) => {
            const { id, name, lastName, phone, mail, birthDay } = contact;
            const container = document.createElement('div');
            
            container.onclick = () => setActiveContact(contact);
            container.id = `contact-${id}`;
            container.className = 'contact-item';
            const title = document.createElement('li');
            title.className = 'titleLi'
            title.innerText = `${name} ${lastName}`;
            
            const infoList = document.createElement('b');
            infoList.className = 'infoList'
            infoList.innerText = `${phone} 
            ${mail}
            ${birthDay}`;
            // phonesList.innerText = phones.join(' ');
            container.appendChild(title);
            container.appendChild(infoList);
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'deleteBtn'
            container.appendChild(deleteBtn);
            deleteBtn.addEventListener('mousedown', function (e) {
                e.preventDefault();
            })
            fragment.appendChild(container);
            
            deleteBtn.addEventListener('click', function (e) {
                deleteContact(id);
            })
            document.getElementById('nameInput').value = "";
            document.getElementById('lnameInput').value = "";
            document.getElementById('telInput').value = "";
            document.getElementById('emailInput').value = "";
            document.getElementById('birthInput').value = "";
        });

        
        list.innerHTML = '';
        list.appendChild(fragment);

        
    }

    function getId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
}

function removeAll(){
    if(window.confirm("This action will remove all contacts. Are you sure?")){
        window.localStorage.clear();
        document.location.reload();
    }
}


function newFunction() {
    return document.getElementById('contactsCount');
}
//function move_up() {
//document.getElementById('list-container').scrollTop += 10;
//}

//function move_down() {
//document.getElementById('list-container').scrollTop -= 10;
//}

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
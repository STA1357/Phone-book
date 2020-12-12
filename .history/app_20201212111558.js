

window.onload = function() {
    const localKey = 'contactsCollection';
    const form = document.querySelector('form');
    const list = document.getElementById('users');
    const userName = document.getElementById('nameInput');
    const userLname = document.getElementById('lnameInput');
    const userTel = document.getElementById('telInput');
    const userEmail = document.getElementById('emailInput');
    const userBirth = document.getElementById('birthInput');

    //validation
    /*form.addEventListener('submit', e => {
        e.preventDefault();
    
        checkInputs();
    })*/
    
    function checkInputs() {
        const userNameValue = userName.value.trim();
        const userLnameValue = userLname.value.trim();
        const userTelValue = userTel.value.trim();
        const userEmailValue = userEmail.value.trim();
        const userBirthValue = userBirth.value.trim();

    

    if(userNameValue === ''){
        setErrorFor (userName, 'Can not skip user name')
    } else {
        setSuccessFor (userName);
    }
    if(userLnameValue === ''){
        setErrorFor (userLname, 'Can not skip user last-name')
    } else {
        setSuccessFor (userLname);
    }
    if(userTelValue === ''){
        setErrorFor (userTel, 'Can not skip user phone')
    } else {
        setSuccessFor (userTel);
    }
    if(userEmailValue === ''){
        setErrorFor (userEmail, 'Can not skip email')
    } else {
        setSuccessFor (userEmail);
    }
    if(userBirthValue === ''){
        setErrorFor (userBirth, 'Can not skip user birthday')
    } else {
        setSuccessFor (userBirth);
    }

    function setErrorFor (input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = 'form-control error';
        small.innerText = message;
        }
        
        function setSuccessFor (input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
        }
    }


    let contactsList = getContacts();
    let activeContact = null;

    generateContactList();

    

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

    function setActiveContact(id) {
        const contact = document.getElementById(`contact-${id}`);
        contact.classList.toggle('active');
    }

    function generateContactList() {
        console.log(contactsList);
        const fragment = document.createDocumentFragment();
        contactsList.forEach((contact) => {
            const { id, name, lastName, phone, mail, birthDay } = contact;
            const container = document.createElement('div');
            
            container.onclick = () => setActiveContact(id);
            container.id = `contact-${id}`;
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
            fragment.appendChild(container);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'deleteBtn'
            fragment.appendChild(deleteBtn);
            deleteBtn.addEventListener('mousedown', function (e) {
                e.preventDefault();
            })
            
            deleteBtn.addEventListener('click', function (e) {
                console.log(e);
                container.removeChild(title);
                container.removeChild(infoList);
                deleteBtn.style.display = 'none';

            })
            document.getElementById('nameInput').value = "";
            document.getElementById('lnameInput').value = "";
            document.getElementById('telInput').value = "";
            document.getElementById('emailInput').value = "";
            document.getElementById('birthInput').value = "";

            //const btn = document.createElement('button');
            //btn.onclick = () => !deleteContact(removeId);
            //btn.appendChild(container)
            //window.localStorage.clear();

            container.addEventListener('mousedown', function (e) {
                e.preventDefault();
            })
            
            container.addEventListener('click', function (e) {
                console.log(e);
                
            
                if (e.target == this) {
                    return false;
                    
                }
                if (!e.ctrlKey) {
                    clearSelected(this.children);
                } 
                addSelected(e.target);
            })
            
            function clearSelected(elems) {
                for (let elem of elems) {
                    elem.classList.remove('selected');
                }
            }
            
            function addSelected(target) {
                target.classList.add('selected');
            }
        });

        
        list.innerHTML = '';
        list.appendChild(fragment);

        
    }

    function getId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    form.onsubmit = (event) => {
        event.preventDefault();
        const contact = {
            id: getId(),
            name: userName.value,
            lastName: userLname.value,
            phone: userTel.value,
            mail: userEmail.value,
            birthDay: userBirth.value
        }
        checkInputs();
        recordContact(contact);
        console.log(contact);
    }



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
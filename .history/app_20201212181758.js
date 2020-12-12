// compare dates = new Date(date value from contact).toDateString() === new Date().toDateString()

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
    let activeContact = {};

    generateContactList();
    compareDates();

    function compareDates() {
        const today = new Date().toDateString();
        const todayBirthDays = contactsList.filter(({ birthDay }) => new Date(birthDay).toDateString() === today);
        if (todayBirthDays.length) {
            console.log(todayBirthDays);
        }
    }
    //validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            const contact = {
                id: Object.keys(activeContact).length ? activeContact.id : getId(),
                name: userName.value,
                lastName: userLname.value,
                phone: userTel.value,
                mail: userEmail.value,
                birthDay: userBirth.value
            }
            if (Object.keys(activeContact).length) {
                updateContact(contact);
                setActiveContact({});
            } else {
                recordContact(contact);
            }
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

    function switchButtonTitle(){
        const switchButton = document.getElementById('btnAdd');
        switchButton.innerText = "Update";
    }

    function setActiveContact(contact) {
        activeContact = contact;
        const contacts = document.querySelectorAll('.contact-item');
        const { id = "", name = "", lastName = "", phone = "", mail = "", birthDay = "" } = contact;
            contacts.forEach((contact) => {
                if (contact.id === `contact-${id}`) {
                    contact.classList.add('active');
                } else {
                    contact.classList.remove('active');
                    switchButtonTitle();
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

function restForm(){
    document.location.reload();
}


function newFunction() {
    return document.getElementById('contactsCount');
}

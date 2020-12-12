const form = document.querySelector('form')
const nameInput = document.getElementById('nameInput')
const lnameInput = document.getElementById('lnameInput')
const usersOutput = document.getElementById('users')
const btnAdd = document.getElementById('btnAdd')
const entry = document.createElement('li')

class Person{
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

function addUser(){
    entry.appendChild(document.createTextNode(nameInput.value + ' ' + lnameInput.value));
    usersOutput.appendChild(entry);
    return false;
}


/*const raw = localStorage.getItem('userInfo')
const userInfo = JSON.parse(raw)
userInfo.name = 'Maxim'

console.log(userInfo);*/
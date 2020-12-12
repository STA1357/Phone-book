const form = document.querySelector('form')
const list = document.getElementById('users')
const userName = document.getElementById('nameInput')
const userLname = document.getElementById('lnameInput')
const entry = document.createElement('li')

function addUser (){
    const list = document.getElementById('users')
    const userName = document.getElementById('nameInput')
    const userLname = document.getElementById('lnameInput')
    const entry = document.createElement('li')
    entry.appendChild(document.createTextNode(userName.value + ' ' + userLname.value))
    list.appendChild(entry)
    return false
}


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




/*const raw = localStorage.getItem('userInfo')
const userInfo = JSON.parse(raw)
userInfo.name = 'Maxim'

console.log(userInfo);*/
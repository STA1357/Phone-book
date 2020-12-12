const form = document.querySelector('form')
const nameInput = document.getElementById('nameInput')
const nameOutput = document.getElementById('nameOutput')
const btnAdd = document.getElementById('btnAdd')

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

var p = document.createElement("p");
function addUser(){
    
    document.body.appendChild(p);
}


/*const raw = localStorage.getItem('userInfo')
const userInfo = JSON.parse(raw)
userInfo.name = 'Maxim'

console.log(userInfo);*/
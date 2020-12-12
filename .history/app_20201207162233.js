const form = document.querySelector('form')

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
    name: "Stan",
    lname: "Tarasenko",
    tel: "+380955005050",
    email:"star@gmail.com",
    birthday:"22.01.1991"
})

localStorage.setItem('userInfo', user);

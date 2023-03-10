const bcrypt = require('bcryptjs')
const userCollection = require('../db').db().collection("users")
const validator = require('validator')
let User = function(data) {
    this.data = data
    this.errors = []
}

User.prototype.cleanUp = function () {
    if(typeof(this.data.username) !="string") {this.data.username = ""}
    if(typeof(this.data.email) !="string") {this.data.email = ""}
    if(typeof(this.data.password) !="string") {this.data.password = ""}

    this.data = {
        username : this.data.username.trim().toLowerCase(),
        email : this.data.email.trim().toLowerCase(),
        password : this.data.password
    }
}

User.prototype.validate = function () {
    if(this.data.username == "") {this.errors.push("You must provide a username.")}
    if(this.data.username.length > 0 && this.data.username.length < 3) {
        this.errors.push("Username must be at least 3 characters.")
    }
    if(this.data.username.length > 30) {this.errors.push("Username cannot excedd 30 characters.")}

    if(this.data.username !="" && !validator.isAlphanumeric(this.data.username)) {
        this.errors.push("Username can only contain letters and numbers.")
    }

    if(!validator.isEmail(this.data.email)) {
        this.errors.push("You must provide a vaild email adddress.")
    }

    if(this.data.password == "") {this.errors.push("You must provide a password.")}
    if(this.data.password.length >0 && this.data.password.length <12) {
        this.errors.push("Password must be at least 12 characters.")
    }
    if(this.data.password.length > 100) {this.errors.push("Password cannot excedd 100 characters.")}

}

User.prototype.register = function() {
    this.cleanUp()
    this.validate()

    if(!this.errors.length) {
        let salt = bcrypt.genSaltSync(10)
        this.data.password = bcrypt.hashSync(this.data.password,salt)
        userCollection.insertOne(this.data)
    }
}

User.prototype.login = function () {
   return new Promise((resolve,reject)=> {
        this.cleanUp()
        userCollection.findOne({username:this.data.username})
        .then((loginUser)=> {
            if(loginUser && bcrypt.compareSync(this.data.password,loginUser.password)) {
                resolve("Congrats !!!")
            }else {
                reject("Invalid username / password")
            }
        })
        .catch(()=> {
            reject("Please try again later.")
        })
    })
}

module.exports = User;
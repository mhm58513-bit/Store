//Page Sign in
//import element html 
let UserName = document.querySelector(".UserName")
let Phone = document.querySelector(".Number")
let Address = document.querySelector(".Address")
let Password = document.querySelector(".Password")
let BtnSignIn = document.getElementById("BtnSignIn")


BtnSignIn.addEventListener("click", (e) => {
    e.preventDefault()
    if (UserName.value === "" || Phone.value === "" || Address.value === "" || Password.value === "") {
        alert(" هناك حقل فارغ")
    } else {
        let users = JSON.parse(localStorage.getItem("users") || "[]")

        let id = JSON.parse(localStorage.getItem("id") || "0")

        let newuser = {
            id: id + 1,
            Name: UserName.value,
            phone: Phone.value,
            address: Address.value,
            password: Password.value,
        }

        users.push(newuser)

        localStorage.setItem("users", JSON.stringify(users))
        localStorage.setItem("id", JSON.stringify(id + 1))

        window.location.href = "./Log in.html"
    }
})



//Page profile
//import element html

let massage = document.getElementById("massage")
let Signout = document.getElementById("signout")
let UserName = document.getElementById("UserName")


function Profile() {
    let users = JSON.parse(localStorage.getItem("session"))
    massage.innerHTML = "Welcome my dear " + users.name
    UserName.innerHTML = "Hi " + users.name
}

Profile()

function SignOut() {
    Signout.addEventListener("click", (ee) => {
        ee.preventDefault
        localStorage.removeItem("session")
        window.location.href = "../Login.html"
    })
}

SignOut()

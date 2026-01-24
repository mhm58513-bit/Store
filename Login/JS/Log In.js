//Page log in
//import element html 

let UserNamelog = document.querySelector(".UserNamelog")
let Passwordlog = document.querySelector(".Passwordlog")
let BtnlognIn = document.querySelector("#BtnlognIn")



BtnlognIn.addEventListener("click", (ele) => {

    ele.preventDefault()

    if (UserNamelog.value === "" || Passwordlog.value === "") {
        alert(" هناك حقل فارغ")
    } else {
        let users = JSON.parse(localStorage.getItem("users"))

        users.forEach((user) => {

            // if (UserNamelog.value !== user.Name || Passwordlog.value !== user.password){
            //     alert("اسم المسنخدام او الباسورد غير صحيح")
            // }

            if (UserNamelog.value === user.Name && Passwordlog.value === user.password) {
                localStorage.setItem("session",JSON.stringify({id : user.id , name : user.Name , Phone : user.phone}))
                window.location.href = "./profile.html"
            } 

            
        }
        )
    }
})



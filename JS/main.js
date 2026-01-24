//Page Home

let btnBuyNow = document.getElementById("btn")
let cards = document.querySelector(".items")

function Api() {
    let xhr = new XMLHttpRequest()

    xhr.open("GET", "https://fakestoreapi.com/products", true)

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let Products = JSON.parse(this.responseText)
            cards.innerHTML = "";
            Products.forEach(Product => {
                cards.innerHTML += `
            <div class="card">
                <img src="${Product.image}" alt="${Product.title}" />
                <h2>${Product.title.substring(0, 20)}</h2>
                <p>${Product.description.substring(0, 50)}</p>
                <h3>${Product.price}</h3>
                <button 
 class="btnbuy"
 data-id="${Product.id}"
 data-img="${Product.image}"
 data-title="${Product.title}"
 data-des="${Product.description}"
 data-price="${Product.price}">
 Buy Now
</button>

            </div>
            `
            })
        }
    })

    xhr.send()
}

Api()



let Alog = document.getElementById("Alog")
let user = JSON.parse(localStorage.getItem("session"))

function User() {
    if (user) {
        Alog.innerHTML = "Hi " + user.name
        Alog.href = "./Login/profile.html"
    } else {
        Alog.href = "./Login.html"
    }
}

User()





setTimeout(() => {
    let btnbuy = document.querySelectorAll(".btnbuy")

    btnbuy.forEach((btn) => {
        btn.addEventListener("click", () => {


            let Products = JSON.parse(localStorage.getItem("product") || "[]")

            let newpro = {
                idcust: user?.id,
                idOrder: btn.dataset.id,
                img: btn.dataset.img,
                title: btn.dataset.title,
                des: btn.dataset.des,
                price: btn.dataset.price,
            }

           Products.push(newpro)

            localStorage.setItem("product", JSON.stringify(Products))
        })

    })
}
    , 1000)